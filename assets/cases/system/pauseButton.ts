import { _decorator, Component, director } from "cc";
const { ccclass, property } = _decorator;

@ccclass("button")
export class button extends Component {

    onPause () {
        director.pause();
    }
    onResume () {
        director.resume();
    }
}
