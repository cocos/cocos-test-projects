import { _decorator, Component, Node, SliderComponent, ToggleComponent, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("TransformController")
export class TransformController extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    @property({
        type:Node,
    })
    public particle1: Node = null;
    @property({
        type:Node,
    })
    public particle2: Node = null;
    @property({
        type:Node,
    })
    public particle3: Node = null;
    @property({
        type:Node,
    })
    public particle4: Node = null;

    @property({
        type:ToggleComponent,
    })
    public check1: ToggleComponent = null;
    @property({
        type:ToggleComponent,
    })
    public check2: ToggleComponent = null;
    @property({
        type:ToggleComponent,
    })
    public check3: ToggleComponent = null;
    @property({
        type:ToggleComponent,
    })
    public check4: ToggleComponent = null;

    private _translate:Vec3 = new Vec3();
    private _rotate:Vec3 = new Vec3();

    start () {
        // Your initialization goes here.
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

    onTranslateChanged (slider: SliderComponent, data: string) {
        this._translate.set(0, 0, slider.progress * 10);
        if (this.check1.isChecked) {
            this.particle1.setPosition(this._translate);
        }
        if (this.check2.isChecked) {
            this.particle2.translate(this._translate);
        }
        if (this.check3.isChecked) {
            this.particle3.translate(this._translate);
        }
        if (this.check4.isChecked) {
            this.particle4.translate(this._translate);
        }
    }

    onRotateChanged (slider: SliderComponent, data: string) {
        this._rotate.set(slider.progress * 90, 0, 0);
        if (this.check1.isChecked) {
            this.particle1.setRotationFromEuler(this._rotate.x,this.particle1.eulerAngles.y,this.particle1.eulerAngles.z);
        }
        if (this.check2.isChecked) {
            this.particle2.setRotationFromEuler(this._rotate.x,this.particle2.eulerAngles.y,this.particle2.eulerAngles.z);
        }
        if (this.check3.isChecked) {
            this.particle3.setRotationFromEuler(this._rotate.x,this.particle3.eulerAngles.y,this.particle3.eulerAngles.z);
        }
        if (this.check4.isChecked) {
            this.particle4.setRotationFromEuler(this._rotate.x,this.particle4.eulerAngles.y,this.particle4.eulerAngles.z);
        }
    }
}
