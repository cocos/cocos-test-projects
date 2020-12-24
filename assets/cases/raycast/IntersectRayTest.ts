import { _decorator, Component, Node, Prefab, Camera, systemEvent, SystemEventType, EventTouch, Touch, MeshRenderer, instantiate, Vec3, GFXAttributeName, Vec2, Label, Color, geometry, renderer } from 'cc';
const { ccclass, property } = _decorator;

// const { Model } = renderer.scene

type Map = { [name: string]: number };

const map: Map = {};

@ccclass('IntersectRayTest')
export class IntersectRayTest extends Component {

    @property({ type: Label })
    public tips: Label = null!;

    @property({ type: Prefab })
    public point: Prefab = null!;

    @property({ type: Camera })
    public mainCamera: Camera = null!;

    private _ray: geometry.ray = new geometry.ray();
    private _modelComps: MeshRenderer[] = [];
    private _container!: Node;
    private _points: Node[] = [];

    onLoad () {
        this._container = new Node('_TEST_');
        this.node.scene.addChild(this._container);
        this._points.push(instantiate(this.point)); this._points.push(instantiate(this.point)); this._points.push(instantiate(this.point));
        this._container.addChild(this._points[0]); this._container.addChild(this._points[1]); this._container.addChild(this._points[2]);
        this._points[0].active = false; this._points[1].active = false; this._points[2].active = false;
        this._modelComps = this.getComponentsInChildren(MeshRenderer);
    }

    onEnable () {
        systemEvent.on(SystemEventType.TOUCH_START, this.onTouchStart, this);
    }

    onDisable () {
        systemEvent.off(SystemEventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart (touch: Touch, event: EventTouch) {
        this._points[0].active = false; this._points[1].active = false; this._points[2].active = false;
        const loc = touch.getLocation();
        this.mainCamera.screenPointToRay(loc.x, loc.y, this._ray);
        for (let i = 0; i < this._modelComps.length; i++) {
            const mo = this._modelComps[i].model!;
            const me = this._modelComps[i].mesh!;
            const opt: geometry.IRayModelOptions = {
                'mode': geometry.ERaycastMode.CLOSEST,
                'distance': Infinity,
                'result': [],
                'subIndices': [],
                'doubleSided': false
            }
            const dis = geometry.intersect.rayModel(this._ray, mo, opt);
            if (dis) {
                console.log(mo.node.name, dis);

                if (mo.node.name == 'Cube') {
                    map['Cube'] = dis;
                } else if (mo.node.name == 'Cube-non-uniform-scaled') {
                    map['Cube-non-uniform-scaled'] = dis;
                }

                const r_cube = map['Cube']
                const r_cube_nus = map['Cube-non-uniform-scaled']
                if (r_cube && r_cube_nus) this.testEquals(r_cube, r_cube_nus, 4);


                const r = opt.result!;
                const s = opt.subIndices;

                // test dis is equals result[0]
                this.testEquals(dis, r[0].distance, 0);

                if (me.subMeshCount == 1) {
                    const vertex = new Vec3();
                    const pos = me.renderingSubMeshes[0].geometricInfo.positions;

                    let posIndex = r[0].vertexIndex0 * 3;
                    vertex.set(pos[posIndex], pos[posIndex + 1], pos[posIndex + 2]);
                    Vec3.transformMat4(vertex, vertex, mo.node.worldMatrix);
                    this._points[0].setWorldPosition(vertex);

                    posIndex = r[0].vertexIndex1 * 3;
                    vertex.set(pos[posIndex], pos[posIndex + 1], pos[posIndex + 2]);
                    Vec3.transformMat4(vertex, vertex, mo.node.worldMatrix);
                    this._points[1].setWorldPosition(vertex);

                    posIndex = r[0].vertexIndex2 * 3;
                    vertex.set(pos[posIndex], pos[posIndex + 1], pos[posIndex + 2]);
                    Vec3.transformMat4(vertex, vertex, mo.node.worldMatrix);
                    this._points[2].setWorldPosition(vertex);

                    this._points[0].active = true; this._points[1].active = true; this._points[2].active = true;

                    /**GET UV  */
                    const tex_coord = me.readAttribute(s[0], GFXAttributeName.ATTR_TEX_COORD);
                    if (tex_coord) {
                        const uv = new Vec2();

                        let uvIndex = r[0].vertexIndex0 * 2;
                        uv.set(tex_coord[uvIndex], tex_coord[uvIndex + 1]);
                        console.log(JSON.stringify(uv));

                        uvIndex = r[0].vertexIndex1 * 2;
                        uv.set(tex_coord[uvIndex], tex_coord[uvIndex + 1]);
                        console.log(JSON.stringify(uv));

                        uvIndex = r[0].vertexIndex2 * 2;
                        uv.set(tex_coord[uvIndex], tex_coord[uvIndex + 1]);
                        console.log(JSON.stringify(uv));
                    }

                } else {
                    const hitPoint = new Vec3();
                    this._ray.computeHit(hitPoint, r[0].distance);
                    this._points[0].setWorldPosition(hitPoint);
                    this._points[0].active = true;
                }
            }
        }
    }

    private testEquals (a: number, b: number, precision: number) {
        if (Math.abs(a - b) > precision) {
            this.tips.string = "请建立 issue 并截图。" + `Math.abs(${a.toPrecision(3)} - ${b.toPrecision(3)}) > ${precision}`;
            this.tips.color = Color.RED;
        }
    }
}
