import { _decorator, Component, ModelComponent, ToggleComponent, Node, SliderComponent, Material, Color, GFXCullMode, LabelComponent, director } from "cc";
const { ccclass, property } = _decorator;

const color = Color.WHITE.clone();

@ccclass("MaterialTest")
export class MaterialTest extends Component {

    @property(Node)
    manualAlbedo: Node = null;

    @property(Node)
    manualMetallic: Node = null;

    @property(Node)
    manualAlphaTest: Node = null;

    _material: Material = null;

    start () {
        this._material = this.node.getComponent(ModelComponent).material;
    }

    update () {
        this.node.setRotationFromEuler(0, director.getCurrentTime() * 0.01, 0);
    }

    // callbacks

    useAlbedoMap (e: ToggleComponent) {
        this._material.recompileShaders({ USE_ALBEDO_MAP: e.isChecked });
        this.manualAlbedo.active = !e.isChecked;
    }

    useMetallicMap (e: ToggleComponent) {
        this._material.recompileShaders({ USE_METALLIC_ROUGHNESS_MAP: e.isChecked });
        this.manualMetallic.active = !e.isChecked;
    }

    useAlphaTest (e: ToggleComponent) {
        this._material.recompileShaders({ USE_ALPHA_TEST: e.isChecked });
        this.manualAlphaTest.active = e.isChecked;
    }

    setAlbedo (e: SliderComponent) {
        const li = e.progress * 255;
        color.set(li, li, li, li);
        this._material.setProperty('albedo', color);
        this.manualAlbedo.getComponentInChildren(LabelComponent).string = e.progress.toFixed(1);
    }

    setMetallic (e: SliderComponent) {
        this._material.setProperty('metallic', e.progress);
        this.manualMetallic.getComponentInChildren(LabelComponent).string = e.progress.toFixed(1);
    }

    setAlphaThreshold (e: SliderComponent) {
        this._material.setProperty('alphaThreshold', e.progress);
        this.manualAlphaTest.getComponentInChildren(LabelComponent).string = e.progress.toFixed(1);
    }

    cullFrontFace (e: ToggleComponent) {
        this._material.overridePipelineStates({
            rasterizerState: {
                cullMode: e.isChecked ? GFXCullMode.FRONT : GFXCullMode.BACK,
            }
        });
    }
}
