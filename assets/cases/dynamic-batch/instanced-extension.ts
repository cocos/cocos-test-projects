import { _decorator, Component, LabelComponent, director, GFXFeature } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('instancedExtension')
export class instancedExtension extends Component {

    @property(LabelComponent)
    public label: LabelComponent = null;

    start () {
        if (!director.root.device.hasFeature(GFXFeature.INSTANCED_ARRAYS)) {
            this.label.string = 'Instanced Arrays GFX feature is not supported on this device,\nexpect all the boxes to be blue-colored.';
        }
    }
}
