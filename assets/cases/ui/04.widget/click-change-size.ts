import { _decorator, Component, Node, Size } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("ClickChangeSize")
@menu('UI/ClickChangeSize')
export class ClickChangeSize extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property(Node)
    target: Node | null = null;
    @property(Size)
    size = new Size();

    start () {
        // Your initialization goes here.
        this.node.on('click', this.click, this);
    }

    click(){
        if(this.target){
            this.target.setContentSize(this.size);
        }
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
