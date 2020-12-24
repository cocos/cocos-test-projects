import { _decorator, Component, game, Game } from "cc";
const { ccclass, property } = _decorator;

@ccclass("button")
export class button extends Component {

    private isPaused = false;
    start () {
        // Your initialization goes here.
        game.on(Game.EVENT_SHOW, this.resumeState, this);
    }

    onDestroy () {
        game.off(Game.EVENT_SHOW, this.resumeState, this);
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
