import { _decorator, Component, Node, ModelComponent, primitives, utils, Material, Vec4 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('wireFrame')
export class wireFrame extends Component {

    static lineMat: Material = null;

    onEnable () {
        if (wireFrame.lineMat == null) {
            wireFrame.lineMat = new Material();
            wireFrame.lineMat.initialize({
                effectName: 'builtin-unlit',
                states: { primitive: cc.GFXPrimitiveMode.LINE_LIST },
            })

            wireFrame.lineMat.setProperty('mainColor', new Vec4(0, 0, 0, 1));
        }
        const model = this.getComponent(ModelComponent);
        if (model && model.mesh && model.mesh.subMeshCount > 0) {
            const newModel = this.addComponent(ModelComponent);
            const geo = {
                positions: model.mesh.renderingSubMeshes[0].geometricInfo.positions.slice(),
                indices: model.mesh.renderingSubMeshes[0].geometricInfo.indices.slice(),
            }
            const mesh = utils.createMesh(primitives.wireframed(geo as any));
            newModel.material = wireFrame.lineMat;
            newModel.mesh = mesh;
        }
    }
}
