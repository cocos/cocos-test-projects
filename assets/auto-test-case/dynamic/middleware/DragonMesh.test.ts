import { find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('DragonMesh')
//@testClass('DragonMesh')
export class DragonMesh {
    _dt = 10;
    _delay = 0.3;
    @testCase
    async startLoad() {
        // 截图
        // await screenshot_custom(this._dt);
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        }
    };

    @testCase
    async dynamicCreate() {
        try {
            await sleep(this._delay);
            // @ts-ignore
            find('Canvas').getComponent('LoadDragonBones').dynamicCreate();
            // director.tick(1);
            // director.pause();
            // 截图 or 断言
            // await screenshot_custom(this._dt);
            for (let i = 0; i < 3; i++) {
                await screenshot_custom(this._dt);
            }
            console.log(`【script】className:${DragonMesh.name} functionName:${this.dynamicCreate.name}`)
        } catch (error) {
            console.error(`【script】className:${DragonMesh.name} functionName:${this.dynamicCreate.name} has error ${error}`)
        }
    }
}



