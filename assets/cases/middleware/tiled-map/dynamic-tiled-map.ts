
import { _decorator, Component, Node, TiledMapAsset, TiledMap, loader } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DynamicTiledMap')
export class DynamicTiledMap extends Component {

    @property({type: Node})
    public targetNode: Node = null!;

    start () {
        // Your initialization goes here.
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }


    onLoadTileMap (url:string) {
        return new Promise<void>((resovle, reject) => {
            loader.loadRes(url, TiledMapAsset, (err, tmxAsset) => {
                if (err) {
                    console.error(err);
                    reject("error");
                    return;
                }
                this.onCreateTileMap(tmxAsset!);
                resovle();
            });
        });
    }

    onCreateTileMap (tmxAsset: TiledMapAsset) {
        this.targetNode!.destroyAllChildren();
        const node = new Node();
        this.targetNode.addChild(node);
        node.layer = this.targetNode.layer;
        const tileMap = node.addComponent(TiledMap);
        tileMap.tmxAsset = tmxAsset;
    }

    onBtnCreateTileMap () {
        const url = 'tilemap/tile_iso_offset';
        this.onLoadTileMap(url);
    }

    onBtnCreateTileMapWithTsx () {
        const url = 'tilemap/tile_iso_offset_with_tsx';
        this.onLoadTileMap(url);
    }
}
