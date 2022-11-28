
import { _decorator, Component, Node, assetManager, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BackToAssetBundle')
export class BackToAssetBundle extends Component {

    start () {
        // Your initialization goes here.
    }

    onClick() {
        return new Promise<void>(resovle => {
            director.loadScene('asset-bundle', () => {
                resovle();
            });
        })
    }
}
