import { _decorator, Component, Node, Slider, Toggle, Vec3 } from "cc";
const { ccclass, property } = _decorator;

let _temp_num: number = 0;

@ccclass("TransformController")
export class TransformController extends Component {

    @property({
        type:Node,
    })
    public particle1: Node = null!;
    @property({
        type:Node,
    })
    public particle2: Node = null!;
    @property({
        type:Node,
    })
    public particle3: Node = null!;
    @property({
        type:Node,
    })
    public particle4: Node = null!;

    @property({
        type:Toggle,
    })
    public check1: Toggle = null!;
    @property({
        type:Toggle,
    })
    public check2: Toggle = null!;
    @property({
        type:Toggle,
    })
    public check3: Toggle = null!;
    @property({
        type:Toggle,
    })
    public check4: Toggle = null!;

    private _translate:Vec3 = new Vec3();
    private _rotate:Vec3 = new Vec3();

    start () {
        // Your initialization goes here.
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

    onTranslateChanged (slider: Slider, data: string) {
        this._translate.set(0, 0, slider.progress * 10 - _temp_num);
        _temp_num = slider.progress * 10;
        if (this.check1.isChecked) {
            this.particle1.translate(this._translate);
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

    onRotateChanged (slider: Slider, data: string) {
        this._rotate.set(slider.progress * 90, 0, 0);
        if (this.check1.isChecked) {
            this.particle1.setRotationFromEuler(this.particle1.eulerAngles.x, this._rotate.x, this.particle1.eulerAngles.z);
        }
        if (this.check2.isChecked) {
            this.particle2.setRotationFromEuler(this.particle2.eulerAngles.x, this._rotate.x, this.particle2.eulerAngles.z);
        }
        if (this.check3.isChecked) {
            this.particle3.setRotationFromEuler(this.particle3.eulerAngles.x, this._rotate.x, this.particle3.eulerAngles.z);
        }
        if (this.check4.isChecked) {
            this.particle4.setRotationFromEuler(this.particle4.eulerAngles.x, this._rotate.x, this.particle4.eulerAngles.z);
        }
    }
}
