
import { _decorator, Component, Node, Label } from 'cc';
const { ccclass } = _decorator;
 
@ccclass('StringChange')
export class StringChange extends Component {

    start () {
        this.getComponent(Label)!.string = 'changed';
    }
}

