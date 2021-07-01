
import { _decorator, Component, Node, Toggle, screen, sys } from 'cc';
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
            screen.requestFullScreen();
        } else {
            screen.exitFullScreen();
        }
    }
}
