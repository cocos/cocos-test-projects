
import { _decorator, Component, Node, TiledMapAsset, TiledMap, loader } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DynamicTiledMap')
export class DynamicTiledMap extends Component {

    @property({type: Node})
    public targetNode: Node = null!;

    public isLoadedMap = false;  
    public isLoadedMapWithTsx = false;

    start () {
        // Your initialization goes here.
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }


    onLoadTileMap (url:string, type=1) {
        loader.loadRes(url, TiledMapAsset, (err, tmxAsset) => {
            if (err) {
                console.error(err);
                if(type == 1){
                    this.isLoadedMap = true;
                }else{
                    this.isLoadedMapWithTsx = true;
                }
                return;
            }
            this.onCreateTileMap(tmxAsset!);
            if(type == 1){
                this.isLoadedMap = true;
            }else{
                this.isLoadedMapWithTsx = true;
            }
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
        this.onLoadTileMap(url, 1);
    }

    onBtnCreateTileMapWithTsx () {
        const url = 'tilemap/tile_iso_offset_with_tsx';
        this.onLoadTileMap(url, 2);
    }
}
