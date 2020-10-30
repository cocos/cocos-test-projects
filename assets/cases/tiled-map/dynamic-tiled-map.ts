// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, Node, TiledMapAsset, TiledMap, loader } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DynamicTiledMap')
export class DynamicTiledMap extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    @property({type: Node})
    targetNode: Node|null = null;

    start () {
        // Your initialization goes here.
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

    	
    onLoadTileMap (url:string) {
        loader.loadRes(url, TiledMapAsset, (err, tmxAsset) => {
            if (err) {
                console.error(err);
                return;
            }
            this.onCreateTileMap(tmxAsset);
        });
    }
 
    onCreateTileMap (tmxAsset: TiledMapAsset) {
        this.targetNode!.destroyAllChildren();
        const node = new Node();
        this.targetNode.addChild(node);
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
