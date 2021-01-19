
import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NodeMove')
export class NodeMove extends Component {

    start () {
        let x = this.node.position.x;
        let y = this.node.position.y;
        let z = this.node.position.z;
        this.schedule((dt:number) => {
            x += dt;
            this.node.position = new Vec3(x, y , z);
            if( x >= 5) {
                x = -5;
            }
        });
    }

}
