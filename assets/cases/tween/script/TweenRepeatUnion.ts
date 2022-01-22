
import { _decorator, Component, Node, Sprite, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = TweenRepeatUnion
 * DateTime = Wed Jan 19 2022 15:58:04 GMT+0800 (中国标准时间)
 * Author = zmzczy
 * FileBasename = TweenRepeatUnion.ts
 * FileBasenameNoExtension = TweenRepeatUnion
 * URL = db://assets/cases/tween/script/TweenRepeatUnion.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('TweenRepeatUnion')
export class TweenRepeatUnion extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    spriteRed: Sprite = null!;
    spriteGreen: Sprite = null!;
    spriteBlue: Sprite = null!;

    oriRedPos:Vec3 = null!;
    oriGreenPos:Vec3 = null!;
    oriBluePos:Vec3 = null!;

    start () {
        // [3]
        this.spriteRed = this.node.getChildByName('SpriteRed')?.getComponent<Sprite>(Sprite)!;
        this.oriRedPos = this.spriteRed.node.position;
        this.spriteGreen = this.node.getChildByName('SpriteGreen')?.getComponent<Sprite>(Sprite)!;
        this.oriGreenPos = this.spriteGreen.node.position;
        this.spriteBlue = this.node.getChildByName('SpriteBlue')?.getComponent<Sprite>(Sprite)!;
        this.oriBluePos = this.spriteBlue.node.position;

        this.tweenStart();
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    tweenStart() {
        tween(this.spriteRed.node)
            .to(2,{scale:new Vec3(2,2,2)})
            .call(()=>{this.spriteRed.node.scale = Vec3.ONE})
            .union()
            .repeatForever()
            .start();
        tween(this.spriteRed.node)
            .to(2,{position: new Vec3(this.oriRedPos.x,-200,0)})
            .start();

        tween(this.spriteGreen.node)
            .to(2,{position: new Vec3(this.oriGreenPos.x,-200,0)})
            .call(()=>{this.spriteGreen.node.position =  new Vec3(this.oriGreenPos.x,0,0)})
            .union()
            .repeatForever()
            .start();
        tween(this.spriteGreen.node)
            .to(2,{scale:new Vec3(2,2,2)})
            .start();

        tween(this.spriteBlue.node)
            .parallel(
                tween().to(2,{position: new Vec3(this.oriBluePos.x,-200,0)}),
                tween().to(2,{scale:new Vec3(2,2,2)})
            ).call(()=>{
                this.spriteBlue.node.scale = Vec3.ONE
                this.spriteBlue.node.position =  new Vec3(this.oriBluePos.x,0,0)
            })
            .union()
            .repeatForever()
            .start();

    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
