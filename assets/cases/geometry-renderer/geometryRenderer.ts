import { _decorator, Component, Node, Toggle, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('geometryRenderer')
export class geometryRenderer extends Component {

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

