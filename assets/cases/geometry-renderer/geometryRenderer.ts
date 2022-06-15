import { _decorator, Component, Node, Toggle, sys } from 'cc';
import { GeometryCreator } from './geometry-creator';
const { ccclass, property } = _decorator;

@ccclass('geometryRenderer')
export class geometryRenderer extends Component {

    @property(GeometryCreator)
    creator: GeometryCreator = null!;

    @property(Node)
    public noSupport: Node = null!

    onLoad () {
        if (sys.platform === sys.Platform.NX ) {
            this.noSupport.active = true;
            this.creator.enabled = false;
            return;
        } else {
            this.noSupport.active = false;  
            this.creator.enabled = true;       
        }
    }
}

