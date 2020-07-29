import { _decorator, Component, game } from "cc";
const { ccclass, property } = _decorator;

@ccclass("button")
export class button extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    private isPaused =false;
    start () {
        // Your initialization goes here.
        game.on(cc.Game.EVENT_SHOW, this.resumeState, this);
    }

    onDestroy () {
        game.off(cc.Game.EVENT_SHOW, this.resumeState, this);
    }

    resumeState () {
        if (this.isPaused) {
            this.onPause();
        } else {
            this.onResume();
        }
    }

    onPause () {
        if(game.isPaused()) return;
        this.isPaused=true;
        game.pause();
    }
    onResume () {
        if(!game.isPaused()) return;
        this.isPaused = false;
        game.resume();
    }
}
