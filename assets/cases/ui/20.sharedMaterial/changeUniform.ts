import { _decorator, Component, Node, SpriteFrame, SpriteComponent, Material, Vec4 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChangeUniform')
export class ChangeUniform extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property
    public startTime = 2;
    @property
    public intervalTime = 2;

    spriteCom : SpriteComponent = null;
    materialIns : Material = null;

    cha : boolean = false;

    color : Vec4 = null;

    start () {
        // Your initialization goes here.
        this.cha = false;
        this.color = new Vec4(1,1,1,1);
        this.spriteCom = this.node.getComponent(SpriteComponent);
        // this.materialIns = this.spriteCom.sharedMaterial;
        this.materialIns = this.spriteCom.material;

        this.schedule(this.changeUni,this.intervalTime,1000,this.startTime);
    }

    changeUni () {
        if(this.cha) {
            this.color.set(0,1,0,1);
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
