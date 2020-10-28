// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, Node, TiledLayer, loader, Prefab, v2, instantiate, Vec3, SystemEventType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ShieldNode')
export class ShieldNode extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    @property({ type: TiledLayer })
    tiledLayer: TiledLayer = null;

    @property({type: Prefab})
    nodePrefab: Prefab = null;

    start () {
        this.initScene(this.nodePrefab);
    }

    initScene (prefab: Prefab) {
        const posArr = [v2(-249, 96), v2(-150, 76), v2(-60, 54), v2(-248, -144), v2(-89, -34)];
        const tmpP = new Vec3();
        for (let i = 0; i < posArr.length; i++) {
            const shieldNode = instantiate(prefab);
            shieldNode.setPosition(posArr[i].x, posArr[i].y);
            this.tiledLayer.addUserNode(shieldNode);
            shieldNode.on(SystemEventType.TOUCH_MOVE, (event) => {
                const deltaMove = event.getLocation().sub(event.getPreviousLocation());
                shieldNode.getPosition(tmpP);
                tmpP.x += deltaMove.x;
                tmpP.y += deltaMove.y;
                shieldNode.setPosition(tmpP);
            });
        }
    }
}
