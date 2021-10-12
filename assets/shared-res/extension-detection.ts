import { _decorator, Component, director, gfx, Label, error } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ExtensionDetection')
export class ExtensionDetection extends Component {

    @property
    public feature: string = '';

    @property
    public tips: string = '';

    public start () {
        const label = this.node.getComponent(Label);
        if (!this.feature.length || !label) {
            return;
        }

        const featureNames = Object.keys(gfx.Feature);
        const str = this.feature.toUpperCase();
        if (!featureNames.includes(str)) {
            error(`Type error of GFXFeature`);
            return;
        }

        const featureName = str as unknown as (keyof typeof gfx.Feature);
        if (!director.root!.device.hasFeature(gfx.Feature[featureName])) {
            label.string = `GFX feature '${this.feature}' is not supported on this device,\n${this.tips}`;
        }
    }
}
