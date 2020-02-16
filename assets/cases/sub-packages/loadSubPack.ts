import { _decorator, Component, LabelComponent, Node, ButtonComponent, Prefab, instantiate, loader, director } from "cc";
const { ccclass, property } = _decorator;

@ccclass("loadSubPack")
export class loadSubPack extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property({type: LabelComponent})
    label = null;
    @property({type: ButtonComponent})
    createButton_1 = null;
    @property({type: ButtonComponent})
    createButton_2 = null;

    start () {
        // Your initialization goes here.
        this.loadSubPackages();
    }

    loadSubPackages() {
        this.createButton_1.node.active = false;
        this.createButton_2.node.active = false;
        if(CC_ALIPAY || CC_COCOSPLAY || !(CC_MINIGAME || CC_RUNTIME_BASED)) {
            this.label.string = '该平台暂不支持分包加载';
            return;
        }
        this.label.string = 'Load subPackage...';
        loader.downloader.loadSubpackage('sub-pack-01',(err: any) => {
            if(err) {
                this.label.string = 'load sub-pack-01 failed!';
                this.label.color = 'red';
                return console.error(err);
            }
            this.label.string = 'load sub-pack-01 success!';
            console.log(`load subpackage(sub-pack-01) successfully.`);
            this.createButton_1.node.active = true;

            loader.downloader.loadSubpackage('sub-pack-02',(err: any) => {
                if(err) {
                    this.label.string = 'load sub-pack-02 failed!';
                    this.label.color = 'red';
                    return console.error(err);
                }
                this.label.string += '\n load sub-pack-02 success!';
                console.log(`load subpackage(sub-pack-02) successfully.`);
                this.createButton_2.node.active = true;

                this.label.string += '\n load all success!';
            });
        });
    }

    jumpToSubScene01() {
        director.loadScene('subPack01');
    }

    jumpToSubScene02() {
        director.loadScene('subPack02');
    }
}
