import { _decorator, Component, Label, Sprite, EditBox, SpriteFrame, Vec3, find } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Test")
export class Test extends Component {

    @property({type:EditBox})
    public editbox: EditBox = null!;

    @property({type:SpriteFrame})
    public sf: SpriteFrame = null!;

    @property({type:SpriteFrame})
    public sea: SpriteFrame = null!;

    @property({type:SpriteFrame})
    public lake: SpriteFrame = null!;

    @property({type:SpriteFrame})
    public mountain: SpriteFrame = null!;

    private tipLabel: Label = null!;
    private showLabel: Label = null!;
    private _sprite: Sprite = null!;
    private _label:string='替换成功';

    start () {
        const canvas = find('Canvas');
        this.tipLabel = canvas?.getChildByName('Label-1')?.getComponent(Label)!;
        this.showLabel = canvas?.getChildByName('Label-2')?.getComponent(Label)!;

        this._sprite = this.node.getComponent(Sprite)!;
    }

    test(name:string){
        this._sprite.changeSpriteFrameFromAtlas(name);
    }
    button(){
        this.tipLabel.node.setPosition(0, 1000, 0);
    }
    button1(){
        this.test(this.editbox.string);
        if (this._sprite.spriteFrame !== null) {
            this.showLabel.string = this._label + ' ' + this.editbox.string;
        }

        if (this._sprite.spriteAtlas === null) {
            this.showLabel.string = "替换失败" + this.editbox.string;
        }

        if (this._sprite.spriteAtlas != null && this._sprite.spriteFrame == null) {
            this.showLabel.string = "请输入正确的名字";
        }

        this.tipLabel.node.active = false;
    }
    button2(){
        this._sprite.spriteAtlas = null;
        this.showLabel.string = '清除图集';
        this._label = '替换失败';
    }
    button3(name:string){
        this.name = this.editbox.string;
        if (this.name == 'tree') {
            this._sprite.spriteFrame = this.sf;
            this.showLabel.string = '更换图片 tree';
        }

        if (this.name == 'sea') {
            this._sprite.spriteFrame = this.sea;
            this.showLabel.string = '更换图片 sea';
        }

        if (this.name == 'lake') {
            this._sprite.spriteFrame = this.lake;
            this.showLabel.string = '更换图片 lake';
        }

        if (this.name == 'mountain') {
            this._sprite.spriteFrame = this.mountain;
            this.showLabel.string = '更换图片 mountain';
        }

        if (this.name != 'mountain' && this.name != 'lake' && this.name != 'sea' && this.name != 'tree') {
            this.showLabel.string = '请输入正确的名字';
        }
    }
    button4(){
        this.tipLabel.node.active = !this.tipLabel.node.active;
    }
}
