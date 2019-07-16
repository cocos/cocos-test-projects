import { _decorator, Component, Node, Prefab, instantiate, LabelComponent, SpriteFrame, loader, js, JsonAsset, ScrollViewComponent } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LoadResDirexample")
export class LoadResDirexample extends Component {
    /* class member could be defined like this */
    // dummy = '';


    @property({type: Node})
    btnClearAll = null;

    @property({type: Prefab})
    label = null;

    @property({type: ScrollViewComponent})
    scrollView = null;

    private _assets = [];
    private _hasLoading = false;


    _init () {
        this.scrollView.content.height = 0;
        this.btnClearAll.active = false;
    }
 
    onLoad () {
        this._init();
    }
 
    _createLabel (text) {
        const node = instantiate(this.label);
        const label = node.getComponent(LabelComponent);
        label.string = text;
        this.scrollView.content.addChild(node);
    }
 
    _clear () {
        this.scrollView.content.removeAllChildren(true);
        for (let i = 0; i < this._assets.length; ++i) {
            const asset = this._assets[i];
            // 需要释放所有资源依赖
            const deps = loader.getDependsRecursively(asset);
            loader.release(deps);
        }
        this._assets = [];
    }
 
    onClearAll () {
        this.scrollView.content.height = 0;
        this.btnClearAll.active = false;
        this._clear();
    }
 
    onLoadAll () {
        if (this._hasLoading) { return; }
        this._hasLoading = true;
 
        this._clear();
        this._createLabel("Load All Assets");
        this.scrollView.scrollToTop();
        this.btnClearAll.active = false;  // 防止加载的过程中清除资源
 
        loader.loadResDir("test_assets", (err, assets) => {
            if (!this.isValid) {
                return;
            }
 
            this._assets = assets;
            for (var i = 0; i < assets.length; ++i) {
                var asset = assets[i];
                var info = asset.toString();
                if (!info) {
                    if (asset instanceof JsonAsset) {
                        info = JSON.stringify(asset.json, null, 4);
                    }
                    else {
                        info = info || asset.name || js.getClassName(asset);
                    }
                }
                this._createLabel(info);
            }
            this._hasLoading = false;
            this.btnClearAll.active = true;
        });
    }
 
    onLoadSpriteFrameAll () {
        if (this._hasLoading) { return; }
        this._hasLoading = true;
 
        this._clear();
        this._createLabel("Load All Sprite Frame");
        this.scrollView.scrollToTop();
        this.btnClearAll.active = false;  // 防止加载的过程中清除资源
 
        loader.loadResDir("test_assets", SpriteFrame, (err, assets) => {
            if (!this.isValid) {
                return;
            }
            this._assets = assets;
            for (var i = 0; i < assets.length; ++i) {
                var asset = assets[i];
                this._createLabel(asset.name);
            }
            this._hasLoading = false;
            this.btnClearAll.active = true;
        });
    }
}
