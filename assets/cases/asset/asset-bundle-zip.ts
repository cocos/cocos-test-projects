import { _decorator, Component, Node, Label, AudioSource, assetManager, log, Texture2D, Sprite, SpriteFrame, AudioClip, director, game } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AssetBundleZip')
export class AssetBundleZip extends Component {
    @property(Label)
    public loadTips: any = null;

    @property(Node)
    public showWindow: Node = null!;

    @property({type: [Label]})
    public labels: Array<Label> = [];

    private _audioSource: AudioSource = null!;

    private _isLoading: Boolean = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var testBundle = assetManager.getBundle('TestBundleZip');
        if (testBundle) {
            this.labels[0].string = "已加载";
        }
    }

    async onClickBundle (): Promise<void> {
        return new Promise((resolve, reject) => {
            var testBundle = assetManager.getBundle('TestBundleZip');
            if (testBundle || this._isLoading) {
                reject();
                return;
            }
            this._onClear()
            this._isLoading = true;
            this.loadTips.string = "Bundle Loading....";
            assetManager.loadBundle('TestBundleZip', (err) => {
                if (err) {
                    log('Error url [' + err + ']');
                    reject(err);
                    return;
                }
                this._isLoading = false;
                this.loadTips.string = "Bundle loaded Successfully!";
                this.labels[0].string = "已加载";
                resolve();
            });
        });

    }

    async onClickTexture (): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this._isLoading) return;
            var testBundle = assetManager.getBundle('TestBundleZip');
            if (!testBundle) {
                this.loadTips.string = "操作失败，请先加载 Asset Bundle";
                reject(this.loadTips.string);
                return;
            }
            this._onClear()
            this._isLoading = true;
            this.loadTips.string = "Texture Loading....";
            testBundle.load("content/texture", Texture2D, (err, asset) => {
                if (err) {
                    log('Error url [' + err + ']');
                    reject(err);
                    return;
                }

                this._isLoading = false;
                this.loadTips.string = "";
                var node = new Node("New Node");
                node.setPosition(0, 0);
                let component = node.addComponent(Sprite);
                const sp = new SpriteFrame();
                sp.texture = asset!;
                component.spriteFrame = sp;
                this.labels[1].string = "已加载";
                this.showWindow.addChild(node);
                resolve();
            });
        });
    }

    async onClickAudio (): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this._isLoading) return;
            var testBundle = assetManager.getBundle('TestBundleZip');
            if (!testBundle) {
                this.loadTips.string = "操作失败，请先加载 Asset Bundle";
                reject(this.loadTips.string);
                return;
            }
            this._onClear()
            this._isLoading = true;
            this.loadTips.string = "Audio Loading....";
            testBundle.load("audio", AudioClip, (err, asset) => {
                if (err) {
                    log('Error url [' + err + ']');
                    reject(err);
                    return;
                }

                this._isLoading = false;
                this.loadTips.string = "";
                var node = new Node("New Node");
                node.setPosition(0, 0);
                let component = node.addComponent(AudioSource);
                component.clip = asset!;
                component.play();
                this._audioSource = component;
                this.loadTips.string = "播放音乐";
                this.labels[2].string = "已加载";
                this.showWindow.addChild(node);
                resolve();
            });
        });
    }

    async onClickScene (): Promise<void> {
        return new Promise((resovle, reject) => {
            if (this._isLoading) return;
            var testBundle = assetManager.getBundle('TestBundleZip');
            if (!testBundle) {
                this.loadTips.string = "操作失败，请先加载 Asset Bundle";
                reject(this.loadTips.string);
                return;
            }
            this._onClear()
            this._isLoading = true;
            this.loadTips.string = "Scene Loading....";
            testBundle.loadScene("sub-scene", (err, asset) => {
                if (err) {
                    log('Error url [' + err + ']');
                    reject(err);
                    return;
                }
                this._isLoading = false;
                this.loadTips.string = "";
                director.runScene(asset!, undefined, (err) => {
                    err ? reject(err) : resovle();
                });
                if (game.isPaused()) {
                    game.step();
                }
            });
        });    
    }

    onClickDestroy () {
        if (this._isLoading) return;
        var testBundle = assetManager.getBundle('TestBundleZip');
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
        var testBundle = assetManager.getBundle('TestBundleZip');
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
