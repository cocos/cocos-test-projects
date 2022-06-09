import { _decorator, Component, Node, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('particle_trail3')
export class particle_trail3 extends Component {
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

