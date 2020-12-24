import { _decorator, Component, Node, Prefab, instantiate, Label, SpriteFrame, loader, js, JsonAsset, ScrollView, UITransform, Asset } from "cc";
const { ccclass, property } = _decorator;

const builtInEffectList = [
    '711ebe11-f673-4cd9-9a83-63c60ba54c5b',
    '971bdb23-3ff6-43eb-b422-1c30165a3663',
    '17debcc3-0a6b-4b8a-b00b-dc58b885581e',
    'd1346436-ac96-4271-b863-1f4fdead95b0',
    '60f7195c-ec2a-45eb-ba94-8955f60e81d0',
    '1baf0fc9-befa-459c-8bdd-af1a450a0319',
    '1d08ef62-a503-4ce2-8b9a-46c90873f7d3',
    'a7612b54-35e3-4238-a1a9-4a7b54635839',
    'a3cd009f-0ab0-420d-9278-b9fdab939bbc',
];

@ccclass("LoadResDirExample")
export class LoadResDirExample extends Component {
    /* class member could be defined like this */
    // dummy = '';


    @property({type: Node})
    public btnClearAll: Node = null!;

    @property({type: Prefab})
    public label: Prefab = null!;

    @property({type: ScrollView})
    public scrollView: ScrollView = null!;

    private _assets: Asset[] = [];
    private _hasLoading = false;


    _init () {
        const uiTrans = this.scrollView.content!.getComponent(UITransform)!;
        uiTrans.height = 0;
        this.btnClearAll.active = false;
    }

    onLoad () {
        this._init();
    }

    _createLabel (text: string) {
        const node = instantiate(this.label);
        const label = node.getComponent(Label)!;
        label.string = text;
        this.scrollView.content!.addChild(node);
    }

    _clear () {
        this.scrollView.content!.removeAllChildren();
        for (let i = 0; i < this._assets.length; ++i) {
            const asset = this._assets[i];
            // 需要释放所有资源依赖
            const deps = loader.getDependsRecursively(asset);
            this._removeBuiltInEffect(deps);
            loader.release(deps);
        }
        this._assets = [];
    }

    _removeBuiltInEffect (deps: string[]) {
        let cache = [];
        for (let  i = 0; i < deps.length; i++) {
            for (let j = 0; j < builtInEffectList.length; j++) {
                if (deps[i].includes(builtInEffectList[j])){
                    cache.push(i);
                }
            }
        }
        for(let k = 0; k < cache.length; k++) {
            delete deps[cache[k]];
        }
        cache = [];
    }

    onClearAll () {
        const uiTrans = this.scrollView.content!.getComponent(UITransform)!;
        uiTrans.height = 0;
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

        loader.loadResDir("test_assets", (err: Error, assets: Asset[]) => {
            if (!this.isValid && err) {
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

        loader.loadResDir("test_assets", SpriteFrame, (err: Error, assets: Asset[]) => {
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
