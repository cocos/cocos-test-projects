import {
    _decorator,
    Component,
    MeshRenderer,
    utils,
    gfx,
    Vec3,
    Mesh,
    primitives,
} from 'cc';

const { ccclass, property } = _decorator;

/**
 * 动态网格测试组件（createDynamicMesh + customAttributes）
 *
 * 使用 utils.MeshUtils.createDynamicMesh 创建带 customAttributes 的动态网格，
 * 用于复现原生平台下 mesh reset 后 _struct.dynamic 信息丢失的问题。
 *
 * Bug 复现路径：
 *   createDynamicMesh → mesh.reset({ struct, data }) → _struct.dynamic 丢失 → updateSubMesh 报错
 */
@ccclass('DynamicMesh')
export class DynamicMesh extends Component {

    @property({ tooltip: 'X方向分段数' })
    segmentsX: number = 20;

    @property({ tooltip: 'Z方向分段数' })
    segmentsZ: number = 20;

    @property({ tooltip: '网格宽度' })
    meshWidth: number = 10;

    @property({ tooltip: '网格深度' })
    meshDepth: number = 10;

    @property({ tooltip: '波浪振幅' })
    amplitude: number = 1.0;

    @property({ tooltip: '波浪频率' })
    frequency: number = 2.0;

    @property({ tooltip: '波浪速度' })
    speed: number = 3.0;

    @property({ tooltip: '是否模拟蒙皮（启用 customAttributes: a_joints + a_weights）' })
    isSkinned: boolean = true;

    @property({ tooltip: '使用 Uint16 索引（否则 Uint32）' })
    useUint16: boolean = true;

    // ---- 内部变量 ----
    private _meshRenderer: MeshRenderer | null = null;
    private _dynamicMesh: Mesh | null = null;
    private _elapsedTime: number = 0;

    // 几何数据缓冲区（TypedArray，复用避免 GC）
    private _positions: Float32Array = null!;
    private _normals: Float32Array = null!;
    private _uvs: Float32Array = null!;
    private _tangents: Float32Array = null!;
    private _colors: Float32Array = null!;
    private _joints: Uint16Array = null!;    // customAttribute: a_joints (RGBA16UI 每分量 2 字节，必须与 Uint16Array 对齐)
    private _weights: Float32Array = null!;  // customAttribute: a_weights (RGBA32F 每分量 4 字节，保持 Float32Array)
    private _indices16: Uint16Array | null = null;
    private _indices32: Uint32Array | null = null;
    private _vertexCount: number = 0;
    private _indexCount: number = 0;

    start() {
        this._initGeometryData();
        this._createDynamicMesh();
    }

    // ========================================================================
    //  初始化几何数据
    // ========================================================================
    private _initGeometryData() {
        const xSegs = this.segmentsX;
        const zSegs = this.segmentsZ;
        const xVerts = xSegs + 1;
        const zVerts = zSegs + 1;
        this._vertexCount = xVerts * zVerts;
        this._indexCount = xSegs * zSegs * 6;

        // 分配 TypedArray
        this._positions = new Float32Array(this._vertexCount * 3);
        this._normals   = new Float32Array(this._vertexCount * 3);
        this._uvs       = new Float32Array(this._vertexCount * 2);
        this._tangents  = new Float32Array(this._vertexCount * 4);
        this._colors    = new Float32Array(this._vertexCount * 4);
        this._joints    = new Uint16Array(this._vertexCount * 4);
        this._weights   = new Float32Array(this._vertexCount * 4);

        if (this.useUint16) {
            this._indices16 = new Uint16Array(this._indexCount);
        } else {
            this._indices32 = new Uint32Array(this._indexCount);
        }

        const halfW = this.meshWidth / 2;
        const halfD = this.meshDepth / 2;

        for (let iz = 0; iz < zVerts; iz++) {
            for (let ix = 0; ix < xVerts; ix++) {
                const idx = iz * xVerts + ix;

                // 位置
                const x = (ix / xSegs) * this.meshWidth - halfW;
                const z = (iz / zSegs) * this.meshDepth - halfD;
                this._positions[idx * 3 + 0] = x;
                this._positions[idx * 3 + 1] = 0;
                this._positions[idx * 3 + 2] = z;

                // 法线（朝上）
                this._normals[idx * 3 + 0] = 0;
                this._normals[idx * 3 + 1] = 1;
                this._normals[idx * 3 + 2] = 0;

                // UV
                this._uvs[idx * 2 + 0] = ix / xSegs;
                this._uvs[idx * 2 + 1] = iz / zSegs;

                // 切线（沿 X）
                this._tangents[idx * 4 + 0] = 1;
                this._tangents[idx * 4 + 1] = 0;
                this._tangents[idx * 4 + 2] = 0;
                this._tangents[idx * 4 + 3] = 1;

                // 颜色（白）
                this._colors[idx * 4 + 0] = 1;
                this._colors[idx * 4 + 1] = 1;
                this._colors[idx * 4 + 2] = 1;
                this._colors[idx * 4 + 3] = 1;

                // 模拟蒙皮：绑定到骨骼 0 和 1
                this._joints[idx * 4 + 0] = 0;
                this._joints[idx * 4 + 1] = 1;
                this._joints[idx * 4 + 2] = 0;
                this._joints[idx * 4 + 3] = 0;

                const t = ix / xSegs;
                this._weights[idx * 4 + 0] = 1.0 - t;
                this._weights[idx * 4 + 1] = t;
                this._weights[idx * 4 + 2] = 0;
                this._weights[idx * 4 + 3] = 0;
            }
        }

        // 构建索引
        let ti = 0;
        for (let iz = 0; iz < zSegs; iz++) {
            for (let ix = 0; ix < xSegs; ix++) {
                const a = iz * xVerts + ix;
                const b = a + 1;
                const c = a + xVerts;
                const d = c + 1;
                const buf = this.useUint16 ? this._indices16! : this._indices32!;
                buf[ti++] = a; buf[ti++] = c; buf[ti++] = b;
                buf[ti++] = b; buf[ti++] = c; buf[ti++] = d;
            }
        }
    }

    // ========================================================================
    //  用 createDynamicMesh 创建带 customAttributes 的动态网格
    // ========================================================================
    private _createDynamicMesh() {
        this._meshRenderer = this.node.getComponent(MeshRenderer);
        if (!this._meshRenderer) {
            this._meshRenderer = this.node.addComponent(MeshRenderer);
        }

        const maxH = this.amplitude;
        const halfW = this.meshWidth / 2;
        const halfD = this.meshDepth / 2;

        // ---------- 按用户提供的代码模式构造 geometry ----------
        const isSkinned = this.isSkinned;

        const geometry: primitives.IDynamicGeometry = {
            primitiveMode: gfx.PrimitiveMode.TRIANGLE_LIST,
            positions: this._positions,
            normals: this._normals,
            tangents: this._tangents,
            colors: this._colors,
            uvs: this._uvs,
            minPos: new Vec3(-halfW, -maxH, -halfD),
            maxPos: new Vec3(halfW, maxH, halfD),
            indices16: null!,
            indices32: null!,

            // ===== 关键：customAttributes =====
            // 当 isSkinned 为 true 时添加 a_joints 和 a_weights
            // 原生平台下 mesh.reset 后 _struct.dynamic 信息会丢失，导致 updateSubMesh 报错
            customAttributes: isSkinned ? [
                {
                    attr: new gfx.Attribute('a_joints', gfx.Format.RGBA16UI),
                    values: this._joints,
                },
                {
                    attr: new gfx.Attribute('a_weights', gfx.Format.RGBA32F),
                    values: this._weights,
                },
            ] : undefined,
        };

        if (this.useUint16) {
            geometry.indices16 = this._indices16;
        } else {
            geometry.indices32 = this._indices32;
        }

        // ---------- 创建动态网格 ----------
        const options: primitives.ICreateDynamicMeshOptions = {
            maxSubMeshes: 1,
            maxSubMeshVertices: this._vertexCount,
            maxSubMeshIndices: this._indexCount,
        };

        this._dynamicMesh = utils.MeshUtils.createDynamicMesh(0, geometry, undefined, options);
        this._meshRenderer.mesh = this._dynamicMesh;

        // 调试：打印 _struct.dynamic 信息
        this._logDynamicInfo('创建后');
    }

    // ========================================================================
    //  更新顶点（波浪 + 蒙皮权重随时间变化）
    // ========================================================================
    private _updateVertices(time: number) {
        const xVerts = this.segmentsX + 1;
        const zVerts = this.segmentsZ + 1;

        for (let iz = 0; iz < zVerts; iz++) {
            for (let ix = 0; ix < xVerts; ix++) {
                const idx = iz * xVerts + ix;
                const x = this._positions[idx * 3 + 0];
                const z = this._positions[idx * 3 + 2];

                // 波浪
                const dist = Math.sqrt(x * x + z * z);
                const y = Math.sin(dist * this.frequency - time * this.speed) * this.amplitude;
                this._positions[idx * 3 + 1] = y;

                // 法线（有限差分）
                const eps = 0.1;
                const dXp = Math.sqrt((x + eps) * (x + eps) + z * z);
                const dXn = Math.sqrt((x - eps) * (x - eps) + z * z);
                const dydx = (Math.sin(dXp * this.frequency - time * this.speed) -
                              Math.sin(dXn * this.frequency - time * this.speed)) *
                              this.amplitude / (2 * eps);
                const dZp = Math.sqrt(x * x + (z + eps) * (z + eps));
                const dZn = Math.sqrt(x * x + (z - eps) * (z - eps));
                const dydz = (Math.sin(dZp * this.frequency - time * this.speed) -
                              Math.sin(dZn * this.frequency - time * this.speed)) *
                              this.amplitude / (2 * eps);
                const nx = -dydx, ny = 1.0, nz = -dydz;
                const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
                this._normals[idx * 3 + 0] = nx / len;
                this._normals[idx * 3 + 1] = ny / len;
                this._normals[idx * 3 + 2] = nz / len;

                // 颜色（蓝→绿渐变）
                const nh = (y / this.amplitude + 1) * 0.5;
                this._colors[idx * 4 + 0] = 0.1 + nh * 0.5;
                this._colors[idx * 4 + 1] = 0.4 + nh * 0.5;
                this._colors[idx * 4 + 2] = 0.9 - nh * 0.4;
                this._colors[idx * 4 + 3] = 1.0;

                // 模拟蒙皮权重随时间变化（测试 customAttributes 动态更新）
                if (this.isSkinned) {
                    const w = (Math.sin(time * 0.5 + ix * 0.1) + 1) * 0.5;
                    this._weights[idx * 4 + 0] = 1.0 - w;
                    this._weights[idx * 4 + 1] = w;
                }
            }
        }
    }

    // ========================================================================
    //  每帧通过 updateSubMesh 更新动态网格
    // ========================================================================
    update(dt: number) {
        if (!this._dynamicMesh || !this._meshRenderer) return;

        this._elapsedTime += dt;
        this._updateVertices(this._elapsedTime);

        const maxH = this.amplitude;
        const halfW = this.meshWidth / 2;
        const halfD = this.meshDepth / 2;

        // 构造更新用的几何数据（复用 TypedArray，零 GC）
        const geometry: primitives.IDynamicGeometry = {
            positions: this._positions,
            normals: this._normals,
            uvs: this._uvs,
            tangents: this._tangents,
            colors: this._colors,
            minPos: new Vec3(-halfW, -maxH, -halfD),
            maxPos: new Vec3(halfW, maxH, halfD),
            customAttributes: this.isSkinned ? [
                {
                    attr: new gfx.Attribute('a_joints', gfx.Format.RGBA16UI),
                    values: this._joints,
                },
                {
                    attr: new gfx.Attribute('a_weights', gfx.Format.RGBA32F),
                    values: this._weights,
                },
            ] : undefined,
        };

        if (this.useUint16) {
            geometry.indices16 = this._indices16;
        } else {
            geometry.indices32 = this._indices32;
        }

        // ===== 关键调用 =====
        // 原生平台下，如果 _struct.dynamic 丢失，这里会报错
        try {
            this._dynamicMesh.updateSubMesh(0, geometry);
        } catch (e) {
            console.error('[DynamicMesh] updateSubMesh 失败:', e);
            this._logDynamicInfo('updateSubMesh 失败时');
        }
    }

    // ========================================================================
    //  调试：打印 _struct.dynamic 信息
    // ========================================================================
    private _logDynamicInfo(tag: string) {
        if (!this._dynamicMesh) return;

        const struct = (this._dynamicMesh as any)._struct;
        if (!struct) {
            console.error(`[DynamicMesh][${tag}] _struct 不存在！`);
            return;
        }

        console.log(`[DynamicMesh][${tag}] _struct.dynamic =`, JSON.stringify(struct.dynamic));
        console.log(`[DynamicMesh][${tag}] vertexBundles 数量: ${struct.vertexBundles?.length}`);
        console.log(`[DynamicMesh][${tag}] primitives 数量: ${struct.primitives?.length}`);

        if (!struct.dynamic) {
            console.error(`[DynamicMesh][${tag}] ⚠️ _struct.dynamic 为空！动态网格信息丢失！`);
            console.error(`[DynamicMesh][${tag}] 这会导致 updateSubMesh 无法正常工作。`);
            console.error(`[DynamicMesh][${tag}] 完整 _struct:`, JSON.stringify(struct, null, 2));
        }
    }

    onDestroy() {
        if (this._dynamicMesh) {
            this._dynamicMesh.destroy();
            this._dynamicMesh = null;
        }
    }
}
