import { _decorator, Component, director, LabelComponent, SpriteComponent, EditBoxComponent, SpriteFrame } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Test")
export class Test extends Component {
    
    @property({type:EditBoxComponent})
    editbox=null;

    @property({type:SpriteFrame})
    sf=null;

    private tiplabel=null;
    private showlabel=null;
    private _sprite=null;
    private _label:string='替换成功';

    start () {
        var canvas= director.getScene().getChildByName('Canvas');
        this.tiplabel= canvas.getChildByName('Label-1');
        this.showlabel= canvas.getChildByName('Label-2');

        this._sprite=this.node.getComponent(SpriteComponent);
    }

    test(name:string){
        this.node.getComponent(SpriteComponent).changeSpriteFrameFromAtlas(name);
    }
    button(){
        this.tiplabel.setPosition(0,1000,0);
    }
    button1(){
        this.test(this.editbox.string);
        if(this._sprite.spriteFrame!=null){
        this.showlabel.getComponent(LabelComponent).string=this._label+' '+this.editbox.string;
        }
        if(this._sprite.spriteAtlas==null){
            this.showlabel.getComponent(LabelComponent).string="替换失败"+this.editbox.string;
        }
        if(this._sprite.spriteAtlas!=null&&this._sprite.spriteFrame==null){
            this.showlabel.getComponent(LabelComponent).string="请输入正确的名字";
        }
        this.tiplabel.setPosition(0,1000,0);
    }
    button2(){
        this._sprite.spriteAtlas=null;
        this.showlabel.getComponent(LabelComponent).string='清除图集';
        this._label='替换失败';
    }
    button3(){
        this._sprite.spriteFrame=this.sf;
        this.showlabel.getComponent(LabelComponent).string='更换图片 tree';
    }
}
