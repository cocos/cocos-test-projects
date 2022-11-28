
import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BackToAssetBundleZip')
export class BackToAssetBundleZip extends Component {

    onClick() {
        return new Promise<void>(resovle => {
            director.loadScene('asset-bundle-zip', () => {
                resovle();
            });
        });
    }
}
