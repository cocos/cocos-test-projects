
import { _decorator, Component, Node, TiledLayer, loader, Prefab, v2, instantiate, Vec3, SystemEventType, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ShieldNode')
export class ShieldNode extends Component {


    @property({ type: TiledLayer })
    public tiledLayer: TiledLayer | null = null;

    @property({type: Prefab})
    public nodePrefab: Prefab | null = null;

    start () {
        this.initScene(this.nodePrefab!);
    }

    initScene (prefab: Prefab) {
        const posArr = [v2(-249, 96), v2(-150, 76), v2(-60, 54), v2(-248, -144), v2(-89, -34)];
        const tmpP = new Vec3();
        for (let i = 0; i < posArr.length; i++) {
            const shieldNode = instantiate(prefab);
            shieldNode.setPosition(posArr[i].x, posArr[i].y);
            this.tiledLayer!.addUserNode(shieldNode);
            shieldNode.on(SystemEventType.TOUCH_MOVE, (event:EventTouch) => {
                const deltaMove = event.getDelta();
                shieldNode.getPosition(tmpP);
                tmpP.x += deltaMove.x;
                tmpP.y += deltaMove.y;
                shieldNode.setPosition(tmpP);
            });
        }
    }
}
