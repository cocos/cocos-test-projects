
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = NewComponent
 * DateTime = Wed Nov 03 2021 17:08:13 GMT+0800 (中国标准时间)
 * Author = undefined
 * FileBasename = NewComponent.ts
 * FileBasenameNoExtension = NewComponent
 * URL = db://assets/cases/terrain/NewComponent.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 import { Terrain, Toggle } from 'cc';
 
@ccclass('Terrain123')
export class Terrain123 extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property(Toggle)
    toggle: Toggle = null!

    @property(Node)
    terrainNode: Node = null!

    onEnable () {
        this.toggle.node.on(Toggle.EventType.TOGGLE, this.onToggle, this);
    }

    onDisable () {
        this.toggle.node.off(Toggle.EventType.TOGGLE, this.onToggle, this);
    }

    onToggle (toggle: Toggle) {
        const terrain = this.terrainNode.getComponent(Terrain) as Terrain;
        if (terrain != null) {
            terrain.LodEnable = toggle.isChecked;
        }
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
