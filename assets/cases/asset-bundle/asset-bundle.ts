// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, Node, Label, AudioSource, assetManager, log, Texture2D, Sprite, SpriteFrame, AudioClip, SceneAsset, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AssetBundle')
export class AssetBundle extends Component {
    @property(Label)
    public loadTips: any = null;

    @property(Node)
    public showWindow: Node = null;

    @property({type: [Label]})
    public labels: Array<Label> = [];

    private _audioSource: AudioSource = null;

    private _isLoading: Boolean = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var testBundle = assetManager.getBundle('TestBundle');
        if (testBundle) {
            this.labels[0].string = "已加载";
        }
    }

    onClickBundle () {
        var testBundle = assetManager.getBundle('TestBundle');
        if (testBundle || this._isLoading) {
            return;
        }
        this._onClear()
        this._isLoading = true;
        this.loadTips.string = "Bundle Loading....";
        assetManager.loadBundle('TestBundle', (err) => {
            if (err) {
                log('Error url [' + err + ']');
                return;
            }
            this._isLoading = false;
            this.loadTips.string = "Bundle loaded Successfully!";
            this.labels[0].string = "已加载";
        });
    }

    onClickTexture () {
        if (this._isLoading) return;
        var testBundle = assetManager.getBundle('TestBundle');
        if (!testBundle) {
            this.loadTips.string = "操作失败，请先加载 Asset Bundle";
            return;
        }
        this._onClear()
        this._isLoading = true;
        this.loadTips.string = "Texture Loading....";
        testBundle.load("gold/texture", Texture2D, (err, asset) => {
            if (err) {
                log('Error url [' + err + ']');
                return;
            }
            this._isLoading = false;
            this.loadTips.string = "";
            var node = new Node("New Node");
            node.setPosition(0, 0);
            let component = node.addComponent(Sprite);
            const sp = new SpriteFrame();
            sp.texture = asset;
            component.spriteFrame = sp;
            this.labels[1].string = "已加载";
            this.showWindow.addChild(node);
        });
    }

    onClickAudio () {
        if (this._isLoading) return;
        var testBundle = assetManager.getBundle('TestBundle');
        if (!testBundle) {
            this.loadTips.string = "操作失败，请先加载 Asset Bundle";
            return;
        }
        this._onClear()
        this._isLoading = true;
        this.loadTips.string = "Audio Loading....";
        testBundle.load("ss", AudioClip, (err, asset) => {
            if (err) {
                log('Error url [' + err + ']');
                return;
            }
            this._isLoading = false;
            this.loadTips.string = "";
            var node = new Node("New Node");
            node.setPosition(0, 0);
            let component = node.addComponent(AudioSource);
            component.clip = asset;
            component.play();
            this._audioSource = component;
            this.loadTips.string = "播放音乐";
            this.labels[2].string = "已加载";
            this.showWindow.addChild(node);
        });
    }

    onClickScene () {
        if (this._isLoading) return;
        var testBundle = assetManager.getBundle('TestBundle');
        if (!testBundle) {
            this.loadTips.string = "操作失败，请先加载 Asset Bundle";
            return;
        }
        this._onClear()
        this._isLoading = true;
        this.loadTips.string = "Scene Loading....";
        testBundle.loadScene("sub-scene", (err, asset) => {
            if (err) {
                log('Error url [' + err + ']');
                return;
            }
            this._isLoading = false;
            this.loadTips.string = "";
            director.runScene(asset);
        });
    }

    onClickDestroy () {
        if (this._isLoading) return;
        var testBundle = assetManager.getBundle('TestBundle');
        if (!testBundle) {
            this.loadTips.string = "操作失败，请先加载 Asset Bundle";
            return;
        }
        this._onClear();
        assetManager.removeBundle(testBundle);
        this.loadTips.string = "分包已被销毁";
        this.labels[0].string = "加载 Asset Bundle";
        this.labels[1].string = "加载 Texture";
        this.labels[2].string = "加载 Audio";
        this.labels[3].string = "加载 Scene";
    }

    onClickRelease () {
        if (this._isLoading) return;
        var testBundle = assetManager.getBundle('TestBundle');
        if (!testBundle) {
            this.loadTips.string = "操作失败，请先加载 Asset Bundle";
            return;
        }
        this._onClear();
        testBundle.releaseAll();
        this.loadTips.string = "资源已被释放";
        this.labels[1].string = "加载 Texture";
        this.labels[2].string = "加载 Audio";
        this.labels[3].string = "加载 Scene";
    }


    _onClear () {
        this.showWindow.removeAllChildren();
        if (this._audioSource && this._audioSource instanceof AudioSource) {
            this._audioSource.stop();
        }
    }
}
