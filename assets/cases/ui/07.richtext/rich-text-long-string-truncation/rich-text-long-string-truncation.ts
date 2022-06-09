import { _decorator, Component, Node, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('rich_text_long_string_truncation')
export class rich_text_long_string_truncation extends Component {
    @property(Node)
    public noSupport: Node = null!

    onLoad () {
        if (sys.platform === sys.Platform.NX ) {
            this.noSupport.active = true;
            return;
        } else {
            this.noSupport.active = false;         
        }
    }
}

