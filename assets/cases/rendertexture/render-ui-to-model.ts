import { _decorator, Component, MeshRenderer, Canvas, RenderTexture, view } from 'cc';
const { ccclass, property, menu } = _decorator;

@ccclass('RenderUIToModel')
@menu('RenderTexture/RenderUIToModel')
export class RenderUIToModel extends Component {

    @property(MeshRenderer)
    public model: MeshRenderer = null!;

    public renderTexture: RenderTexture | null = null;

    start () {
        const canvas = this.getComponent(Canvas)!;
        const tex = new RenderTexture();
        tex.name = 'render-ui-to-model';
        const size = view.getVisibleSize();
        tex.reset({
            width: size.width,
            height: size.height,
        });

        this.renderTexture = tex;

        canvas.targetTexture = tex;
        const mat = this.model.material!;
        mat.setProperty('mainTexture', tex);
    }

    onDestroy () {
        if(this.renderTexture){
            this.renderTexture.destroy();
            this.renderTexture = null;
        }
    }
}
