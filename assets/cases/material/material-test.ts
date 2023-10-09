import { _decorator, Component, MeshRenderer, Toggle, Node, Slider, Material, Color, gfx, Label, director } from "cc";
const { ccclass, property } = _decorator;

const color = Color.WHITE.clone();

@ccclass("MaterialTest")
export class MaterialTest extends Component {

    @property(Node)
    public manualAlbedo: Node = null!;

    @property(Node)
    public manualMetallic: Node = null!;

    @property(Node)
    public manualAlphaTest: Node = null!;

    private _material: Material = null!;
    private _startFrames: number = 0;

    start () {
        this._material = this.node.getComponent(MeshRenderer)!.material!;
        this._startFrames = director.getTotalFrames();
    }

    update () {
        this.node.setRotationFromEuler(0, (director.getTotalFrames() - this._startFrames) * 0.1, 0);
    }

    // callbacks

    useAlbedoMap (e: Toggle) {
        this._material.recompileShaders({ USE_ALBEDO_MAP: e.isChecked });
        this.manualAlbedo.active = !e.isChecked;
        if (e.isChecked) {
            this._material.setProperty('albedo', Color.WHITE.clone());
        }
    }

    useMetallicMap (e: Toggle) {
        this._material.recompileShaders({ USE_METALLIC_ROUGHNESS_MAP: e.isChecked });
        this.manualMetallic.active = !e.isChecked;
    }

    useAlphaTest (e: Toggle) {
        this._material.recompileShaders({ USE_ALPHA_TEST: e.isChecked });
        this.manualAlphaTest.active = e.isChecked;
    }

    setAlbedo (e: Slider) {
        const li = e.progress * 255;
        color.set(li, li, li, li);
        this._material.setProperty('albedo', color);
        this.manualAlbedo.getComponentInChildren(Label)!.string = e.progress.toFixed(1);
    }

    setMetallic (e: Slider) {
        this._material.setProperty('metallic', e.progress);
        this.manualMetallic.getComponentInChildren(Label)!.string = e.progress.toFixed(1);
    }

    setAlphaThreshold (e: Slider) {
        this._material.setProperty('alphaThreshold', e.progress);
        this.manualAlphaTest.getComponentInChildren(Label)!.string = e.progress.toFixed(1);
    }

    cullFrontFace (e: Toggle) {
        this._material.overridePipelineStates({
            rasterizerState: {
                cullMode: e.isChecked ? gfx.CullMode.FRONT : gfx.CullMode.BACK,
            }
        });
    }
}
