import { _decorator, Component, Node, Sprite, Material, Vec4 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChangeUniform')
export class ChangeUniform extends Component {

    @property
    public startTime = 2;
    @property
    public intervalTime = 2;

    public spriteCom : Sprite = null!;
    public materialIns : Material = null!;

    cha : boolean = false;

    color = new Vec4(1, 1, 1, 1);

    start () {
        // Your initialization goes here.
        this.cha = false;
        this.spriteCom = this.node.getComponent(Sprite)!;
        // this.materialIns = this.spriteCom.sharedMaterial;
        this.materialIns = this.spriteCom.material!;

        this.schedule(this.changeUni, this.intervalTime, 1000, this.startTime);
    }

    changeUni () {
        if (this.cha) {
            this.color.set(1,1,0,1);
        } else {
            this.color.set(1,1,1,1);
        }
        this.materialIns.setProperty('mainColor',this.color);
        this.cha = !this.cha;
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
