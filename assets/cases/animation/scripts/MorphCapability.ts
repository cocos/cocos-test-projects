import { _decorator, Component, Node, director, GFXFeature, LabelComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MorphCapability')
export class MorphCapability extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property({type: LabelComponent})
    public tip: LabelComponent | null = null;

    start () {
        // Your initialization goes here.
        const device = director.root.device;
        // After v1.2, morph should be supported on all platforms
        // this.tip.string = `Morph is supported: ${device.hasFeature(GFXFeature.TEXTURE_FLOAT)}`;
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
