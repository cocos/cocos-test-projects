import { _decorator, Component, Label, Node, Button, Prefab, instantiate, loader, director } from "cc";
const { ccclass, property } = _decorator;

@ccclass("loadSubPack")
export class loadSubPack extends Component {

    @property({type: Label})
    label = null;
    @property({type: Button})
    createButton_1 = null;
    @property({type: Button})
    createButton_2 = null;

    start () {
        // Your initialization goes here.
        this.loadSubPackages();
    }

    loadSubPackages() {
        this.createButton_1.node.active = false;
        this.createButton_2.node.active = false;
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
