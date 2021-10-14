
import { _decorator, Component, Node, Toggle, screen, sys, log } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScreenTest')
export class ScreenTest extends Component {
    
    @property(Toggle)
    toggleFullscreen: Toggle = null!;

    start () {
        if (screen.supportsFullScreen) {
            this.toggleFullscreen.isChecked = screen.fullScreen();
            this.toggleFullscreen.node.on(Toggle.EventType.TOGGLE, this.onToggle, this);
        } else {
            this.toggleFullscreen.node.active = false;
        }
    }

    onToggle (toggle: Toggle) {
        if (toggle.isChecked) {
            screen.requestFullScreen().then(() => {
                log('on enter fullscreen');
            }).catch(e => {});;
        } else {
            screen.exitFullScreen().then(() => {
                log('on exit fullscreen');
            }).catch(e => {});
        }
    }

    scaleTo_0_1_X () {
        screen.resolutionScale = 0.1;
    }

    scaleTo_0_5_X () {
        screen.resolutionScale = 0.5;
    }

    scaleTo_1_0_X () {
        screen.resolutionScale = 1;
    }
    
    scaleTo_2_0_X () {
        screen.resolutionScale = 2;
    }
}
