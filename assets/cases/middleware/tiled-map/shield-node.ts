
import { _decorator, Component, Node, TiledLayer, loader, Prefab, v2, instantiate, Vec3, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

const vec_3 = new Vec3();

@ccclass('ShieldNode')
export class ShieldNode extends Component {


    @property({ type: TiledLayer })
    public tiledLayer: TiledLayer | null = null;

    @property({type: Prefab})
    public nodePrefab: Prefab | null = null;
    
    private shieldNodeMap: Map<number, Node> = new Map();

    start () {
      this.initScene(this.nodePrefab!);
    }

    initScene (prefab: Prefab) {
        const posArr = [v2(-249, 96), v2(-150, 76), v2(-60, 54), v2(-248, -144), v2(-89, -34)];
        for (let i = 0; i < posArr.length; i++) {
            const shieldNode = instantiate(prefab);
            shieldNode.setPosition(posArr[i].x, posArr[i].y);
            this.tiledLayer!.addUserNode(shieldNode);
            this.shieldNodeMap.set(i,shieldNode);
            shieldNode.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        }
    }

    setShieldNodePosition(index : number, vec : Vec3){
        let node : Node | undefined = this.shieldNodeMap.get(index);
        node!.setPosition(vec);
    }

    onDestroy(){
        this.shieldNodeMap.forEach((shieldNode: Node) => {
            if(shieldNode && shieldNode.isValid){
                shieldNode.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
            }
        });
        this.shieldNodeMap.clear();
    }

    onTouchMove(shieldNode: Node, event: EventTouch){
        const deltaMove = event.getUIDelta();
        shieldNode.getPosition(vec_3);
        vec_3.x += deltaMove.x;
        vec_3.y += deltaMove.y;
        shieldNode.setPosition(vec_3);
    }

}
