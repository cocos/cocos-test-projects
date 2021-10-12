
import { _decorator, Component, Node, Prefab, game, Game, instantiate, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ShowHideEvent')
export class ShowHideEvent extends Component {
    @property(Node)
    contentView: Node = null!;

    @property(Prefab)
    timeLabelPrefab: Prefab = null!;

    onLoad () {
        game.on(Game.EVENT_HIDE, this.onHide, this);
        game.on(Game.EVENT_SHOW, this.onShow, this);
    }

    onDestroy () {
        game.off(Game.EVENT_HIDE, this.onHide, this);
        game.off(Game.EVENT_SHOW, this.onShow, this);
    }

    onHide () {
        const timeLabelNode = instantiate(this.timeLabelPrefab);
        let label = timeLabelNode.getComponent(Label)!;
        label.string = `${this.getTime()} hide event`;
        this.contentView.addChild(timeLabelNode);
    }

    onShow () {
        const timeLabelNode = instantiate(this.timeLabelPrefab);
        let label = timeLabelNode.getComponent(Label)!;
        label.string = `${this.getTime()} show event`;
        this.contentView.addChild(timeLabelNode);
    }

    getTime () {
        let date = new Date();
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
