import { _decorator, Component, Node, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('particle_renderer')
export class particle_renderer extends Component {
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

