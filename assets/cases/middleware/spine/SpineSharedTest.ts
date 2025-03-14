import { _decorator, AssetManager, assetManager, Component, director, instantiate, Node, Prefab, sp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpineSharedTest')
export class SpineSharedTest extends Component {

    private _childCount: number = 0;

    @property({type: Prefab})
    prefab: Prefab = null!;

    @property({type: Prefab})
    prefab_4_2: Prefab = null!;

    private _nodeArr: Node[] = [];

    start() {
        this._childCount = this.node.children.length;
    }

    update(deltaTime: number) {

    }

    onClick() {
        // The texture shared with multi instances at shared-cache mode, after close the bundle UI, the texture will be released. If instantiate multi instance, After bundle UI close, other instances still use the texture.
        // Here we prevent instantiate multi times.
        const children  = this.node.children;
        const count = children.length;
        const bundleName = this.isVersion4_2() ? "SharedCacheBundle_4_2" : "SharedCacheBundle";
        if (children[count - 1].name === bundleName) return;
        assetManager.loadBundle("SpineSharedTest", (err: Error, bundle: AssetManager.Bundle) => {
            if (err) {
                console.error(err);
                return;
            }

            bundle.load(bundleName, Prefab, (err: Error, res: Prefab) => {
                if (err) {
                    console.error(err);
                    return;
                }

                const node = instantiate(res);
                this.node.addChild(node);
            });
        });
    }

    onAdd() {
        const prefab = this.isVersion4_2() ? this.prefab_4_2 : this.prefab;
        const node = instantiate(prefab);
        this.node.addChild(node);
        this._nodeArr.push(node);
    }

    onRemove() {
        for (const node of this._nodeArr) {
            node.destroy();
        }
        this._nodeArr.length = 0;
    }

    private isVersion4_2(): boolean {    
        return sp.SPINE_VERSION === '4.2';
    }
}

