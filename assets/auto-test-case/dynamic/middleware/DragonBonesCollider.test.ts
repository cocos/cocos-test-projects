// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('DragonBonesCollider')
@testClass('DragonBonesCollider')
export class DragonBonesCollider {
    _delay = 0.2;
    _dt = 30;

    @testCase
    async startPlay() {
        for (let i = 0; i < 4; i++) {
            // 截图 or 断言
            await screenshot_custom(this._dt);
        }
    }

    // @testCase
    // async footOne() {
    //     // 截图
    //     // await screenshot_custom(this._dt);
    //     // // @ts-ignore
    //     // const lposx = find('Canvas/man/foot1')!._lpos.x;
    //     // // @ts-ignore
    //     // const lposy = find('Canvas/man/foot1')!._lpos.y;
    //     // // @ts-ignore
    //     // const lposz = find('Canvas/man/foot1')!._lpos.z;
    //     // console.log(lposx, lposy, lposz);
    //     // expect(lposx).to.equal(footOne.lposx, '不相等');
    //     // expect(lposy).to.equal(footOne.lposy, '不相等');
    //     // expect(lposz).to.equal(footOne.lposz, '不相等');
    //     // // @ts-ignore
    //     // const lrotx = find('Canvas/man/foot1')!._lrot.x;
    //     // // @ts-ignore
    //     // const lroty = find('Canvas/man/foot1')!._lrot.y;
    //     // // @ts-ignore
    //     // const lrotz = find('Canvas/man/foot1')!._lrot.z;
    //     // console.log(lrotx, lroty, lrotz);
    //     // expect(lrotx).to.equal(footOne.lrotx, '不相等');
    //     // expect(lroty).to.equal(footOne.lroty, '不相等');
    //     // expect(lrotz).to.equal(footOne.lrotz, '不相等');

    // };


    //     @testCase
    //     async footTwo() {
    //         // 截图 or 断言
    //         await screenshot_custom(this._dt);
    //         // // @ts-ignore
    //         // const lposx = find('Canvas/man/foot2')!._lpos.x;
    //         // // @ts-ignore
    //         // const lposy = find('Canvas/man/foot2')!._lpos.y;
    //         // // @ts-ignore
    //         // const lposz = find('Canvas/man/foot2')!._lpos.z;
    //         // console.log(lposx, lposy, lposz);
    //         // expect(lposx).to.equal(footTwo.lposx, '不相等');
    //         // expect(lposy).to.equal(footTwo.lposy, '不相等');
    //         // expect(lposz).to.equal(footTwo.lposz, '不相等');
    //         // // @ts-ignore
    //         // const lrotx = find('Canvas/man/foot2')!._lrot.x;
    //         // // @ts-ignore
    //         // const lroty = find('Canvas/man/foot2')!._lrot.y;
    //         // // @ts-ignore
    //         // const lrotz = find('Canvas/man/foot2')!._lrot.z;
    //         // console.log(lrotx, lroty, lrotz);
    //         // expect(lrotx).to.equal(footTwo.lrotx, '不相等');
    //         // expect(lroty).to.equal(footTwo.lroty, '不相等');
    //         // expect(lrotz).to.equal(footTwo.lrotz, '不相等');
    //     }
}