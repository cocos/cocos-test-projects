
import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BackToAssetBundleZip')
export class BackToAssetBundleZip extends Component {

    onClick () {
        director.loadScene('asset-bundle-zip');
    }
}
