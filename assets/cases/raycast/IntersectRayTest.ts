import { _decorator, Component, Node, Prefab, CameraComponent, systemEvent, SystemEventType, EventTouch, geometry, Touch, ModelComponent, instantiate, Vec3, GFXAttributeName, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('IntersectRayTest')
export class IntersectRayTest extends Component {

    @property({ type: Prefab })
    point: Prefab = null;

    @property({ type: CameraComponent })
    mainCamera: CameraComponent = null;

    private _ray: geometry.ray = new geometry.ray();
    private _modelComs: ModelComponent[] = [];
    private _container: Node;
    private _points: Node[] = [];

    onLoad () {
        this._container = new Node('_TEST_');
        this.node.scene.addChild(this._container);
        this._points.push(instantiate(this.point)); this._points.push(instantiate(this.point)); this._points.push(instantiate(this.point));
        this._container.addChild(this._points[0]); this._container.addChild(this._points[1]); this._container.addChild(this._points[2]);
        this._points[0].active = false; this._points[1].active = false; this._points[2].active = false;
        this._modelComs = this.getComponentsInChildren(ModelComponent);
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
        for (let i = 0; i < this._modelComs.length; i++) {
            const mo = this._modelComs[i].model;
            const me = this._modelComs[i].mesh;
            const opt: geometry.IRayModelOptions = {
                'mode': geometry.ERaycastMode.CLOSEST,
                'distance': Infinity,
                'result': [],
                'subIndices': [],
                'doubleSided': false
            }
            if (geometry.intersect.ray_model(this._ray, mo, opt)) {
                const r = opt.result;
                const s = opt.subIndices;
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
}
