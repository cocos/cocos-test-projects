import { _decorator, Component, Node, director, EditBoxComponent, SpriteComponent, LabelComponent, CCObject, math } from "cc";
const { ccclass, property } = _decorator;

@ccclass("fillsprite")
export class fillsprite extends Component {
    @property({type:LabelComponent})
    hlabel=null;
    @property({type:SpriteComponent})
    hhorizontal=null;

    @property({type:LabelComponent})
    vlabel=null;
    @property({type:SpriteComponent})
    vhorizontal=null;

    @property({type:LabelComponent})
    mclabel=null;
    @property({type:SpriteComponent})
    mc=null;

    @property({type:LabelComponent})
    lblabel=null;
    @property({type:SpriteComponent})
    lb=null;

    @property({type:LabelComponent})
    rblabel=null;
    @property({type:SpriteComponent})
    rb=null;

    private timer=0;
    private ltimer=0;
    private rtimer=0.2;

    vh(num:number){
        this.vhorizontal.getComponent(SpriteComponent).fillRange=num;
        this.hhorizontal.getComponent(SpriteComponent).fillRange=num;
        this.mc.getComponent(SpriteComponent).fillRange=num;
    }

    update (deltaTime: number) {
        this.timer += 0.1*deltaTime;
        if(this.timer>1){
            this.timer=0;
        }

        this.ltimer += 0.1*deltaTime;
        if(this.ltimer>0.3){
            this.ltimer=0;
        }

        this.rtimer += 0.1*deltaTime;
        if(this.rtimer>0.5){
            this.rtimer=0.2;
        }
        this.vh(this.timer);
        this.lb.getComponent(SpriteComponent).fillRange=this.ltimer;
        this.rb.getComponent(SpriteComponent).fillRange=this.rtimer;

        this.vlabel.getComponent(LabelComponent).string='填充类型：垂直填充 '+Math.floor(this.timer*100)+'%';
        this.hlabel.getComponent(LabelComponent).string='填充类型：水平填充 '+Math.floor(this.timer*100)+'%';
        this.mclabel.getComponent(LabelComponent).string='center(0.5, 0.5) rang '+Math.floor(this.timer*100)/100;
        this.lblabel.getComponent(LabelComponent).string='center(0, 0) rang '+Math.floor(this.ltimer*100)/100;
        this.rblabel.getComponent(LabelComponent).string='center(1, 0) rang '+Math.floor(this.rtimer*100)/100;
    }
}
