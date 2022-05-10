// @ts-ignore
import { captureOneImage, loadScene, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { delayTime, sceneNameList } from '../static-scene-list';

@testClass('StaticScene')
export class StaticScene {
    _delay = delayTime;
    @testCase
    async switchScene() {
        console.log('场景列表:  ', sceneNameList);
        console.log('delayTime: ', delayTime);
        for (let i = 0; i < sceneNameList.length; i++) {
            await sleep(this._delay);
            await loadScene(sceneNameList[i])?.catch((e: any) => { console.log(e) });
            // 截图 or 断言
            await waitForNextFrame();
            await captureOneImage(sceneNameList[i]);
        };
    };
}