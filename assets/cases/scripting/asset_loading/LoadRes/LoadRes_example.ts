import { _decorator, Component, Node, loader, SpriteComponent, SpriteAtlas, Prefab, instantiate, v2, director } from "cc";
const { ccclass, property } = _decorator;

const builtInEffectList = [
    '711ebe11-f673-4cd9-9a83-63c60ba54c5b.json',
    '971bdb23-3ff6-43eb-b422-1c30165a3663.json',
    '17debcc3-0a6b-4b8a-b00b-dc58b885581e.json',
    'd1346436-ac96-4271-b863-1f4fdead95b0.json',
    '60f7195c-ec2a-45eb-ba94-8955f60e81d0.json',
    '1baf0fc9-befa-459c-8bdd-af1a450a0319.json',
    '1d08ef62-a503-4ce2-8b9a-46c90873f7d3.json',
    'a7612b54-35e3-4238-a1a9-4a7b54635839.json',
    'a3cd009f-0ab0-420d-9278-b9fdab939bbc.json',
];

@ccclass("LoadResexample")
export class LoadResexample extends Component {

    private _url = ["test_assets/atlas", "test_assets/prefab"];

    @property({type: Node})
    content = null;

    loadSpriteFrame () {
        const url = this._url[0];
        this._releaseResource(url, SpriteAtlas);
        loader.loadRes(url, SpriteAtlas, (err, atlas) => {
            this._removeAllChildren();
            loader.setAutoRelease(atlas, true);
            const node = new Node();
            this.content.addChild(node);
            node.setPosition(0, 0, 0);
            const sprite = node.addComponent(SpriteComponent);
            sprite.spriteFrame = atlas.getSpriteFrame('sheep_run_0');
        });
    }

    loadPrefab () {
        const url = this._url[1];
        this._releaseResource(url, Prefab);
        loader.loadRes(url, Prefab, (err, prefab) => {
            this._removeAllChildren();
            loader.setAutoRelease(prefab, true);
            const node = instantiate(prefab);
            this.content.addChild(node);
            node.setPosition(0, 0, 0);
        });
    }

    onDisable () {
        this._releaseResource(this._url[0], SpriteAtlas);
        this._releaseResource(this._url[1], Prefab);
    }

    _removeAllChildren () {
        this.content.removeAllChildren(true);
    }

    _releaseResource (url, type) {
        this._removeAllChildren();
        const res = loader.getRes(url, type);
        const all = loader.getDependsRecursively(res);
        this._removeBuiltInEffect(all);
        loader.release(all);
    }

    _removeBuiltInEffect (deps) {
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

    backToAssetLoading () {
        director.loadScene('AssetLoading');
    }
}
