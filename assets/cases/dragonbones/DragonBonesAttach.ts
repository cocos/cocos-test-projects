
import { _decorator, Component, instantiate, Label, Color, Prefab, dragonBones, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DragonBonesAttach')
export default class extends Component {

    @property({type: dragonBones.ArmatureDisplay})
    skeleton: dragonBones.ArmatureDisplay |null = null;

    @property({type: Prefab})
    targetPrefab: Prefab | null = null;

    @property({type: Label})
    modeLabel: Label | null = null;

    @property
    redBoneName = "toujiaoR";
    @property
    greenBoneName = "shouL";
    @property
    blueBoneName = "bone24";



    generateAllNodes () {
        this.destroyAllNodes();
        let red = this.createSocket(this.redBoneName, new Color(255, 0, 0))
        let green = this.createSocket(this.greenBoneName, new Color(0, 255, 0))
        let blue = this.createSocket(this.blueBoneName, new Color(0, 0, 255))
        this.skeleton!.sockets = [red, green, blue];
    }

    destroyUnusual () {
        this.destroyAllNodes();
    }

    destroyAllNodes () {
        let sockets = this.skeleton!.sockets;
        for(let s of sockets) {
            s.target!.removeFromParent();
        }
        this.skeleton!.sockets = [];
    }

    generateSomeNodes () {
        let sockets = this.skeleton!.sockets;
        let greens = sockets.filter(x => x.target?.name == this.greenBoneName);
        if(greens.length === 0) {
            let green = this.createSocket(this.greenBoneName, new Color(0, 255, 0))
            sockets.push(green);
            this.skeleton!.sockets = sockets;
        }
    }

    destroySomeNodes () {
        let sockets = this.skeleton!.sockets;
        for(let l = sockets.length -1; l >= 0; l --) {
            if(sockets[l].target!.name === this.greenBoneName){
                let s = sockets.splice(l, 1);
                s[0].target!.removeFromParent();
                this.skeleton!.sockets = sockets;
                break;
            }
        }
    }

    changeMode () {
        let isCached = this.skeleton!.isAnimationCached();
        if (isCached) {
            this.skeleton!.setAnimationCacheMode(dragonBones.ArmatureDisplay.AnimationCacheMode.REALTIME);
            this.modeLabel!.string = "cache";
        } else {
            this.skeleton!.setAnimationCacheMode(dragonBones.ArmatureDisplay.AnimationCacheMode.SHARED_CACHE);
            this.modeLabel!.string = "realtime";
        }
    }

    private createSocket(name:string, color:Color) {
        let dbNode = new dragonBones.DragonBoneSocket();
        dbNode.path = this.skeleton!.querySocketPathByName(name)[0];
        const child = dbNode.target = instantiate(this.targetPrefab!);
        child.parent = this.node;
        child.name = name;
        const sp = child.getComponent(Sprite)!;
        sp.color = color;
        return dbNode;
    }
}
