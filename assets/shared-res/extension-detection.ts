import { _decorator, Component, director, GFXFeature, LabelComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ExtensionDetection')
export class ExtensionDetection extends Component {

    @property
    public feature: string = '';

    @property
    public tips: string = '';

    public start () {
        const label = this.node.getComponent(LabelComponent);
        if (!this.feature.length || !label) { return; }
        if (!director.root.device.hasFeature(GFXFeature[this.feature.toUpperCase()])) {
            label.string = `GFX feature '${this.feature}' is not supported on this device,\n${this.tips}`;
        }
    }
}
