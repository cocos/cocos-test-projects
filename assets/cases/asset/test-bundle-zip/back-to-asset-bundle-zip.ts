
import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BackToAssetBundleZip')
export class BackToAssetBundleZip extends Component {

    onClick() {
        return new Promise<void>((resovle, reject) => {
            director.loadScene('asset-bundle-zip', (err) => {
                err ? reject(err) : resovle();
            });
        });
    }
}
