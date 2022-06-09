import { _decorator, Component, Node, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('particle_align')
export class particle_align extends Component {
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

