
import { _decorator, Component, Node, Toggle, ResolutionPolicy, view } from 'cc';
import { HTML5 } from 'cc/env';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = ContainerStragety
 * DateTime = Wed Nov 10 2021 13:51:26 GMT+0800 (中国标准时间)
 * Author = unbrella_man
 * FileBasename = containerStragety.ts
 * FileBasenameNoExtension = containerStragety
 * URL = db://assets/cases/base/containerStragety.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

const TOGGLE_EQUAL_TO_FRAME = 'ToggleEqualToFrame';
const TOGGLE_PROPORTIONAL_TO_FRAME = 'ToggleProportionalToFrame';
 
@ccclass('ContainerStragety')
export class ContainerStragety extends Component {
    @property(Node)
    noSupoortTip !: Node;

    onLoad () {
        if (!HTML5) {
            this.noSupoortTip.active = true;
        }
    }

    onDestroy () {
        this.toggleToEqualToFrame();
    }

    onToggleGroupEvent (toggle: Toggle) {
        switch (toggle.node.name) {
            case TOGGLE_EQUAL_TO_FRAME:
                this.toggleToEqualToFrame();
                break;
            case TOGGLE_PROPORTIONAL_TO_FRAME:
                this.toggleToProportionalToFrame();
                break;
            default:
                this.toggleToEqualToFrame();
                break;
        }
    }

    toggleToProportionalToFrame() {
        const resolutionPolicy = view.getResolutionPolicy();
        resolutionPolicy.setContainerStrategy(ResolutionPolicy.ContainerStrategy.PROPORTION_TO_FRAME);
        view.setResolutionPolicy(resolutionPolicy);
    }

    toggleToEqualToFrame() {
        const resolutionPolicy = view.getResolutionPolicy();
        resolutionPolicy.setContainerStrategy(ResolutionPolicy.ContainerStrategy.EQUAL_TO_FRAME);
        view.setResolutionPolicy(resolutionPolicy);
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
