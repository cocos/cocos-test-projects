import { _decorator, Component, Node, director, Label } from "cc";
const { ccclass, property } = _decorator;

@ccclass("subScript02")
export class subScript02 extends Component {

    @property({type: Label})
    public tips: Label = null!;

    public backRoot: Node | null = null!;

    start () {
        // Your initialization goes here.
        this.backRoot = this.node.getParent()!.getChildByName('backRoot');
        if (this.backRoot) {
            this.backRoot.active = false;
        }
        console.log('subScript02 load finish');
        this.tips.string = "subScript02 load finish!";
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

    backToList() {
        return new Promise<void>((resovle, reject) => {
            if (this.backRoot) {
                this.backRoot.active = true;
            }
            director.loadScene('sub-packages',  (error: any) => {
                error ? reject(error) : resovle();
            });
        });
    }
}
