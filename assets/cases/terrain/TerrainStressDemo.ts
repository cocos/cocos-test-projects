import {
    _decorator,
    Camera,
    Component,
    director,
    HeightField,
    Layers,
    Node,
    Quat,
    Terrain,
    TerrainInfo,
    Vec3,
} from 'cc';

const { ccclass, property } = _decorator;

/**
 * 动态创建地形的同步示例（复用场景中已有的主相机，不新建相机）。
 *
 * 流程要点（全部同步，无异步 / Promise）：
 * 1. 先 addComponent(Terrain)，但节点【不挂到场景】（未激活，onEnable 不会触发）；
 * 2. rebuild(info) 同步创建 block / layerBuffer / 顶点法线 buffer；
 * 3. 填充 HeightField 高度数据，importHeightField 同步重算高度→法线→顶点；
 * 4. 设置 lodEnable 生成 LOD 索引；
 * 5. 根据主相机位置/朝向计算放置点，保证地形整体落在相机视锥内；
 * 6. 最后把节点挂到场景激活，触发 onEnable → _buildImp，上传 GPU。
 */
@ccclass('TerrainStressDemo')
export class TerrainStressDemo extends Component {
    /** 地形块数量（x × z）。每块 32×32 网格 = 33×33 顶点。 */
    @property
    public blockCountX = 4;

    @property
    public blockCountZ = 4;

    /** 是否开启 LOD（生成 4 body + 64 connector 的索引）。 */
    @property
    public lodEnable = true;

    private _terrain: Terrain | null = null;

    public start (): void {
        this._buildTerrain();
    }

    private _buildTerrain (): void {
        const scene = director.getScene()!;

        // Terrain 节点：先不挂到场景（未激活），避免 addComponent 时触发 onEnable → _buildImp()
        const terrainNode = new Node('DynamicTerrain');
        terrainNode.layer = Layers.Enum.DEFAULT;

        // 先挂组件（节点未激活，onEnable 不触发），再在未激活状态下完成构建
        const terrain = terrainNode.addComponent(Terrain);

        // 组装 TerrainInfo
        const bcx = Math.max(1, Math.floor(this.blockCountX));
        const bcz = Math.max(1, Math.floor(this.blockCountZ));
        const info = new TerrainInfo();
        info.blockCount = [bcx, bcz];
        info.tileSize = 1;
        info.weightMapSize = 128;
        info.lightMapSize = 128;

        // 同步重建：创建 block、layerBuffer、顶点/法线 buffer
        terrain.rebuild(info);

        // 同步填充高度图（返回实际高度 min/max）并导入
        const hf = new HeightField(terrain.vertexCount[0], terrain.vertexCount[1]);
        const minMax = this._fillHeightField(hf);
        terrain.importHeightField(hf, 1);

        // LOD 索引生成
        terrain.lodEnable = this.lodEnable;

        // 计算放置点：放在主相机视线正前方，并让地形整体完整落进视锥
        this._placeInFrontOfMainCamera(terrainNode, bcx, bcz, info.tileSize, minMax);

        // 挂到场景激活（触发 onEnable → _buildImp：vertexBuffer/IndexBuffer 上传 GPU）
        scene.addChild(terrainNode);
        this._terrain = terrain;
    }

    /**
     * 查找场景中激活的透视相机，视为“主相机”。找不到则回退到原点附近。
     */
    private _findMainCamera (): Camera | null {
        const scene = director.getScene()!;
        const cameras = scene.getComponentsInChildren(Camera);
        for (let i = 0; i < cameras.length; ++i) {
            const c = cameras[i];
            if (c.enabled && c.node.activeInHierarchy
                && c.projection === Camera.ProjectionType.PERSPECTIVE) {
                return c;
            }
        }
        return null;
    }

    /**
     * 沿主相机视线方向，把地形中心放在某个距离处，使地形包围球完整落在竖直视锥内。
     * 地形高度场中心（min/max 中点）对准视线在该距离处的高度。
     */
    private _placeInFrontOfMainCamera (
        terrainNode: Node,
        bcx: number,
        bcz: number,
        tileSize: number,
        minMax: { min: number, max: number },
    ): void {
        // 地形的局部范围（vertex 间距 = tileSize，每 block 32 格）
        const halfX = bcx * 32 * tileSize * 0.5;
        const halfZ = bcz * 32 * tileSize * 0.5;
        const reliefHalf = (minMax.max - minMax.min) * 0.5;
        const midY = (minMax.max + minMax.min) * 0.5;

        let cx = 0;
        let cy = 0;
        let cz = 0;

        const cam = this._findMainCamera();
        if (cam) {
            const camNode = cam.node;
            // 相机看向自身局部 -Z 轴：用世界旋转把 (0, 0, -1) 转到世界空间
            const q = new Quat();
            camNode.getWorldRotation(q);
            const fwd = new Vec3();
            Vec3.transformQuat(fwd, new Vec3(0, 0, -1), q);
            fwd.normalize();

            // 使地形包围球完整落入垂直 FOV 所需的视线距离
            const radius = Math.sqrt(halfX * halfX + halfZ * halfZ + reliefHalf * reliefHalf);
            const halfVfov = cam.fov * 0.5 * Math.PI / 180;
            const dist = radius / Math.sin(halfVfov);

            const p = camNode.worldPosition;
            cx = p.x + fwd.x * dist;
            cy = p.y + fwd.y * dist;
            cz = p.z + fwd.z * dist;
        }

        // 节点原点对应高度 0（HeightField 32768 基准），水平方向中心对准 (cx, cz)
        terrainNode.setPosition(cx - halfX, cy - midY, cz - halfZ);
    }

    private _fillHeightField (hf: HeightField): { min: number, max: number } {
        const w = hf.w;
        const h = hf.h;
        const cx = w * 0.5;
        const cz = h * 0.5;
        const scale = Math.min(w, h) * 0.15;

        let min = Number.POSITIVE_INFINITY;
        let max = Number.NEGATIVE_INFINITY;

        for (let j = 0; j < h; ++j) {
            for (let i = 0; i < w; ++i) {
                // 复合正弦叠加制造丰富起伏
                const nx = (i - cx) / scale;
                const nz = (j - cz) / scale;
                const v = (
                    Math.sin(nx * 0.5) * Math.cos(nz * 0.5) * 40
                    + Math.sin(nx * 0.2) * 20
                    + Math.cos(nz * 0.3) * 15
                );
                if (v < min) min = v;
                if (v > max) max = v;
                // 高度基准 32768 对应 0，+128 对应 +1
                hf.data[j * w + i] = Math.round(32768 + v * 128);
            }
        }
        return { min, max };
    }

    public onDestroy (): void {
        if (this._terrain) {
            this._terrain.node.destroy();
            this._terrain = null;
        }
    }
}
