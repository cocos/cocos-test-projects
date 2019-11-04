import { _decorator, Component, Node, loader, SpriteComponent, SpriteAtlas, Prefab, instantiate, v2 } from "cc";
const { ccclass, property } = _decorator;

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
        loader.release(all);
    }
}
