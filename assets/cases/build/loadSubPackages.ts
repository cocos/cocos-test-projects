import { _decorator, Component, Node, loader } from "cc";
const { ccclass, property } = _decorator;

@ccclass("loadSubPackages")
export class loadSubPackages extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property({type: cc.LabelComponent})
    label = null;

    start () {
        // Your initialization goes here.
    }

    loadSubPackage() {
        this.label.string = 'Load subPackage...'
        loader.downloader.loadSubpackage('subPackage', (err: any) => {
            if (err) {
                this.label.string = 'load subPackage failed!';
                return console.error(err);
            }
            this.label.string = 'load subPackage success!';
            console.log(`load subpackage(subPackage) successfully.`);
        });
    }
    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
