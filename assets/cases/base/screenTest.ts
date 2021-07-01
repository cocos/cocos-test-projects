
import { _decorator, Component, Node, Toggle, screen, sys, log } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScreenTest')
export class ScreenTest extends Component {
    
    @property(Toggle)
    toggleFullscreen: Toggle = null!;

    @property(Node)
    public noSupport: Node = null!

    start () {
        if (sys.platform === sys.Platform.MOBILE_BROWSER ||
            sys.platform === sys.Platform.DESKTOP_BROWSER) {
            this.noSupport.active = false;
        } else {
            this.noSupport.active = true;
            return;
        }
        this.toggleFullscreen.isChecked = screen.fullScreen();
        this.toggleFullscreen.node.on(Toggle.EventType.TOGGLE, this.onToggle, this);
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
}
