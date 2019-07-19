import { _decorator, Component, Node, EditBoxComponent } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("EditboxCtrl")
@menu('UI/EditboxCtrl')
export class EditboxCtrl extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property(EditBoxComponent)
    editBox1: EditBoxComponent = null;
    @property(EditBoxComponent)
    editBox2: EditBoxComponent = null;
    @property(EditBoxComponent)
    editBox3: EditBoxComponent = null;

    start () {
        // Your initialization goes here.
    }

    setFocus(event, custom){
        if(custom === '1'){
            this.editBox1.setFocus();
        } else if (custom === '2') {
            this.editBox2.setFocus();
        } else if (custom === '3') {
            this.editBox3.setFocus();
        }
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
