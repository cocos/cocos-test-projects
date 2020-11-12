// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, Node, ccenum, SystemEventType, TiledMap, Vec2, Vec3, view, macro, TiledLayer, systemEvent, EventKeyboard } from 'cc';
const { ccclass, property } = _decorator;

enum MoveDirection {
    NONE = 0,
    UP = 1,
    DOWN = 2,
    LEFT = 3,
    RIGHT = 4,
}

const minTilesCount = 2;
const mapMoveStep = 1;
const minMoveValue = 50;

ccenum(MoveDirection);

@ccclass('Puzzle')
export class Puzzle extends Component {


    _touchStartPos = null;

    _isMapLoaded = false;


    @property
    floorLayerName = 'floor';

    @property
    barrierLayerName = 'barrier';

    @property
    objectGroupName = 'players';

    @property
    startObjectName = 'SpawnPoint';

    @property
    successObjectName = 'SuccessPoint';


    @property({type:Node})
    player:Node|null = null;

    _touching?: boolean;
    _succeedLayer?: Node;
    _curTile?: Vec2;
    _startTile?: Vec2;
    _endTile?: Vec2;
    _tiledMap?: TiledMap;
    _layerFloor?: TiledLayer;
    _layerBarrier?: TiledLayer;

    onLoad () {
        if (!this._isMapLoaded) {
            this.player.active = false;
        }

        systemEvent.on(SystemEventType.KEY_UP, this._onKeyPressed, this);

        this.node.on(SystemEventType.TOUCH_START, (event) => {
            this._touching = true;
            this._touchStartPos = event.touch.getLocation();
        });
        this.node.on(SystemEventType.TOUCH_END, (event) => {
            if (!this._touching || !this._isMapLoaded || this._succeedLayer.active) return;

            this._touching = false;
            const touchPos = event.touch.getLocation();
            const movedX = touchPos.x - this._touchStartPos.x;
            const movedY = touchPos.y - this._touchStartPos.y;
            const movedXValue = Math.abs(movedX);
            const movedYValue = Math.abs(movedY);
            if (movedXValue < minMoveValue && movedYValue < minMoveValue) {
                // touch moved not enough
                return;
            }

            const tp = this._curTile;
            const newTile = new Vec2(tp.x, tp.y);
            let mapMoveDir = MoveDirection.NONE;
            if (movedXValue >= movedYValue) {
                // move to right or left
                if (movedX > 0) {
                    newTile.x += 1;
                    mapMoveDir = MoveDirection.LEFT;
                } else {
                    newTile.x -= 1;
                    mapMoveDir = MoveDirection.RIGHT;
                }
            } else {
                // move to up or down
                if (movedY > 0) {
                    newTile.y -= 1;
                    mapMoveDir = MoveDirection.DOWN;
                } else {
                    newTile.y += 1;
                    mapMoveDir = MoveDirection.UP;
                }
            }
            this._tryMoveToNewTile(newTile, mapMoveDir);
        });
    }

    onDestroy () {
        systemEvent.off(SystemEventType.KEY_UP, this._onKeyPressed, this);
    }

    restartGame () {
        this._succeedLayer.active = false;
        this._initMapPos();
        this._curTile = this._startTile;
        this._updatePlayerPos();
    }

    start () {

        // init the map position
        this._initMapPos();

        // init the succeed layer
        this._succeedLayer = this.node.getParent().getChildByName('succeedLayer');
        this._succeedLayer.active = false;

        // init the player position
        this._tiledMap = this.node.getComponent('cc.TiledMap') as TiledMap;
        const objectGroup = this._tiledMap.getObjectGroup(this.objectGroupName);
        if (!objectGroup) return;

        const startObj = objectGroup.getObject(this.startObjectName);
        const endObj = objectGroup.getObject(this.successObjectName);
        if (!startObj || !endObj) return;

        const startPos = new Vec2(startObj.x, startObj.y);
        const endPos = new Vec2(endObj.x, endObj.y);

        this._layerFloor = this._tiledMap.getLayer(this.floorLayerName);
        this._layerBarrier = this._tiledMap.getLayer(this.barrierLayerName);
        if (!this._layerFloor || !this._layerBarrier) return;

        this._curTile = this._startTile = this._getTilePos(startPos);
        this._endTile = this._getTilePos(endPos);

        if (this.player) {
            this._updatePlayerPos();
            this.player.active = true;
        }

        this._isMapLoaded = true;
    }

    _initMapPos () {
        // this.node.setPosition(visibleRect.bottomLeft);
    }

    _updatePlayerPos () {
        const pos = this._layerFloor.getPositionAt(this._curTile);
        this.player.setPosition(new Vec3(pos.x, pos.y, 0));
    }

    _getTilePos (posInPixel:{x:number, y:number}) {
        const mapSize = this.node._uiProps.uiTransformComp!.contentSize;
        const tileSize = this._tiledMap.getTileSize();
        const x = Math.floor(posInPixel.x / tileSize.width);
        const y = Math.floor((mapSize.height - posInPixel.y) / tileSize.height);

        return new Vec2(x, y);
    }

    _onKeyPressed (event:EventKeyboard) {
        if (!this._isMapLoaded || this._succeedLayer.active) return;

        const newTile = new Vec2(this._curTile.x, this._curTile.y);
        let mapMoveDir = MoveDirection.NONE;
        switch (event.keyCode) {
            case macro.KEY.up:
                newTile.y -= 1;
                mapMoveDir = MoveDirection.DOWN;
                break;
            case macro.KEY.down:
                newTile.y += 1;
                mapMoveDir = MoveDirection.UP;
                break;
            case macro.KEY.left:
                newTile.x -= 1;
                mapMoveDir = MoveDirection.RIGHT;
                break;
            case macro.KEY.right:
                newTile.x += 1;
                mapMoveDir = MoveDirection.LEFT;
                break;
            default:
                return;
        }

        this._tryMoveToNewTile(newTile, mapMoveDir);
    }

    _tryMoveToNewTile (newTile:Vec2, mapMoveDir:MoveDirection) {
        const mapSize = this._tiledMap.getMapSize();
        if (newTile.x < 0 || newTile.x >= mapSize.width) return;
        if (newTile.y < 0 || newTile.y >= mapSize.height) return;

        if (this._layerBarrier.getTileGIDAt(newTile.x, newTile.y) as unknown as any) {
            console.log('This way is blocked!');
            return false;
        }

        // update the player position
        this._curTile = newTile;
        this._updatePlayerPos();

        // move the map if necessary
        this._tryMoveMap(mapMoveDir);

        // check the player is success or not
        if (this._curTile.equals(this._endTile)) {
            console.log('succeed');
            this._succeedLayer.active = true;
        }
    }

    _tryMoveMap (moveDir:MoveDirection) {
        // get necessary data
        const mapContentSize = this.node._uiProps.uiTransformComp!.contentSize;
        const mapPos = this.node.getPosition();
        const playerPos = this.player.getPosition();
        const viewSize = view.getVisibleSize();
        const tileSize = this._tiledMap.getTileSize();
        const minDisX = minTilesCount * tileSize.width;
        const minDisY = minTilesCount * tileSize.height;

        const disX = playerPos.x + mapPos.x;
        const disY = playerPos.y + mapPos.y;
        let newPos;
        switch (moveDir) {
            case MoveDirection.UP:
                if (disY < minDisY) {
                    newPos = new Vec2(mapPos.x, mapPos.y + tileSize.height * mapMoveStep);
                }
                break;
            case MoveDirection.DOWN:
                if (viewSize.height - disY - tileSize.height < minDisY) {
                    newPos = new Vec2(mapPos.x, mapPos.y - tileSize.height * mapMoveStep);
                }
                break;
            case MoveDirection.LEFT:
                if (viewSize.width - disX - tileSize.width < minDisX) {
                    newPos = new Vec2(mapPos.x - tileSize.width * mapMoveStep, mapPos.y);
                }
                break;
            case MoveDirection.RIGHT:
                if (disX < minDisX) {
                    newPos = new Vec2(mapPos.x + tileSize.width * mapMoveStep, mapPos.y);
                }
                break;
            default:
                return;
        }

        const vsize = view.getVisibleSize();
        const voffset = view.getVisibleOrigin();

        if (newPos) {
            // calculate the position range of map
            const minX = viewSize.width - mapContentSize.width - voffset.x;
            const maxX = voffset.x;
            const minY = viewSize.height - mapContentSize.height -voffset.y;
            const maxY = voffset.y;

            if (newPos.x < minX) newPos.x = minX;
            if (newPos.x > maxX) newPos.x = maxX;
            if (newPos.y < minY) newPos.y = minY;
            if (newPos.y > maxY) newPos.y = maxY;

            if (newPos.x != mapPos.x || newPos.y != mapPos.y) {
                console.log('Move the map to new position: ', newPos);
                this.node.setPosition(newPos.x, newPos.y);
            }
        }
    }

}
