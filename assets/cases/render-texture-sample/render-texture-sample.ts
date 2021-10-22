
import { _decorator, Component, Node, RenderTexture, MeshRenderer, Mesh } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = RenderTextureSample
 * DateTime = Fri Sep 17 2021 17:52:49 GMT+0800 (中国标准时间)
 * Author = EndEvil
 * FileBasename = render-texture-sample.ts
 * FileBasenameNoExtension = render-texture-sample
 * URL = db://assets/cases/render-texture-sample/render-texture-sample.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('RenderTextureSample')
export class RenderTextureSample extends Component {
    @property(RenderTexture)
    public renderTexture1: RenderTexture | null = null;

    @property(RenderTexture)
    public renderTexture2: RenderTexture | null = null;

    start () {
        // this.renderTexture1!.setWrapMode(RenderTexture.WrapMode.CLAMP_TO_EDGE, RenderTexture.WrapMode.CLAMP_TO_EDGE);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
