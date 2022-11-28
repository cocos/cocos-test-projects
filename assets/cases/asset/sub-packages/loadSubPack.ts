import { _decorator, Component, Label, Node, Button, Prefab, instantiate, loader, director, math } from "cc";
const { ccclass, property } = _decorator;

@ccclass("loadSubPack")
export class loadSubPack extends Component {

    @property({type: Label})
    label!: Label;
    @property({type: Button})
    createButton_1!: Button;
    @property({type: Button})
    createButton_2!: Button;

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
                this.label.color = math.Color.RED;
                return console.error(err);
            }
            this.label.string = 'load sub-pack-01 success!';
            console.log(`load subpackage(sub-pack-01) successfully.`);
            this.createButton_1.node.active = true;

            loader.downloader.loadSubpackage('sub-pack-02',(err: any) => {
                if(err) {
                    this.label.string = 'load sub-pack-02 failed!';
                    this.label.color = math.Color.RED;
                    return console.error(err);
                }
                this.label.string += '\n load sub-pack-02 success!';
                console.log(`load subpackage(sub-pack-02) successfully.`);
                this.createButton_2.node.active = true;

                this.label.string += '\n load all success!';
            });
        });
    }

    async jumpToSubScene01() {
        return new Promise<void>((resolve) => {
            director.loadScene('subPack01', () => {
                console.log('subpack01');
                resolve();
            });
        })
    }

    jumpToSubScene02() {
        return new Promise<void>((resolve) => {
            director.loadScene('subPack02', () => {
                console.log('subPack02');
                resolve();
            });
        });
    }
}
