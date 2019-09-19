import { _decorator, Component, Node, game, SystemEventType, Director, director } from "cc";
const { menu, ccclass, property } = _decorator;

@ccclass("PersistSetUp")
@menu("physics/PersistSetUp")
export class PersistSetUp extends Component {

    onLoad () {
        this.node.removeFromParent();
        game.addPersistRootNode(this.node);
        director.on(Director.EVENT_BEFORE_SCENE_LOADING, this.onSceneChanged, this);
    }

    onSceneChanged (sceneName: string) {
        if (sceneName == "TestList") {
            game.removePersistRootNode(this.node);
            director.off(Director.EVENT_BEFORE_SCENE_LOADING, this.onSceneChanged, this);
        }
    }

}
