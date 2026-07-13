import { find } from 'cc';
// @ts-ignore
import { runScene, sleep, testCase, testClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('asset-bundle')
@testClass('AssetBundle')
export class AssetBundle {
    failList: String[] = [];
    tickTime: number = 50;

    @testCase
    async startPlay() {
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async onClickBundle() {
        await this.getBundleResult();
        await screenshot_custom(this.tickTime);
    }


    @testCase
    async onClickTexture() {
        // @ts-ignore
        await this.getTextrueResult();
        // find('Canvas').getComponent('AssetBundle').onClickTexture();
        // await sleep(this._delay);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async onClickAudio() {
        // @ts-ignore
        await this.getAudioResult();
        // find('Canvas').getComponent('AssetBundle').onClickAudio();
        // await sleep(4);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async onClickScene() {
        // @ts-ignore
        await this.getSceneResult();
        await screenshot_custom(this.tickTime);
        // @ts-ignore
        await find('Canvas')?.getComponent('BackToAssetBundle')?.onClick();
        await waitForFrames(this.tickTime - 20);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async onClickRelease() {
        // @ts-ignore
        await this.getReleaseResult();
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async onClickDestroy() {
        // @ts-ignore
        await this.getDestroyResult();
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async onFailLoadBundle() {
        // @ts-ignore
        await this.getTextrueResult();
        await screenshot_custom(this.tickTime);
    }

    // @testCase
    // async retry() {
    //     if (this.failList.length > 0) {
    //         for (const iterator of this.failList) {
    //             switch (iterator) {
    //                 case 'onClickTexture': this.onClickTexture();
    //                     break;
    //                 case 'onClickAudio': this.onClickAudio();
    //                     break;
    //                 case 'onClickScene': this.onClickScene();
    //             }
    //         }
    //     }
    //     this.failList = []
    // }


    async getSceneResult() {
        return new Promise<void>(async (resovle, reject) => {
            //@ts-ignore
            const assetBundle = find('Canvas')!.getComponent('AssetBundle')!;
            //@ts-ignore
            assetBundle.onClickScene();
            //@ts-ignore
            if (!find('Canvas/Load Tip') && find('Canvas').getComponent('BackToAssetBundle')) {
                resovle();
            } else {
                for (let i = 1; i < 10; i++) {
                    await waitForFrames(i * 60);
                    //@ts-ignore
                    if (!find('Canvas/Load Tip') && find('Canvas').getComponent('BackToAssetBundle')) {
                        resovle();
                        break;
                    }
                }
                reject('test case has error，scence:asset-bundle');
            }

        })
    }


    async getTextrueResult() {
        return new Promise<void>(async (resovle) => {
            //@ts-ignore
            if (find('Canvas/Load Tip').getComponent('cc.Label').string === '操作失败，请先加载 Asset Bundle') {
                console.warn('before load bundle fail, cause onclickTexture fail!');
                resovle();
            } else {
                //@ts-ignore
                const assetBundle = find('Canvas')!.getComponent('AssetBundle')!;
                //@ts-ignore
                assetBundle.onClickTexture();
                //@ts-ignore
                if (find('Canvas/Load Tip').getComponent('cc.Label').string === '操作失败，请先加载 Asset Bundle') {
                    console.warn('after onclickTexture method reload asset bundle has error');
                    resovle();
                } else {
                    await waitForFrames(60);
                    //@ts-ignore
                    if (find('Canvas/Layout/Load_Texture').getComponent('cc.Button').target.getChildByName('Label').components.length > 0) {
                        await sleep(1)
                        //@ts-ignore
                        let target = find('Canvas/Layout/Load_Texture').getComponent('cc.Button').target.getChildByName('Label').getComponent('cc.Label').string;
                        //@ts-ignore
                        if (target === '已加载') {
                            resovle();
                        } else {
                            for (let i = 1; i < 10; i++) {
                                await waitForFrames(i * 60);
                                //@ts-ignore
                                if (target === '已加载') {
                                    resovle();
                                    break;
                                }
                            }
                        }
                    } else {
                        this.failList.push('onClickTexture');
                    }
                }
            }
        })
    }



    async getAudioResult() {
        return new Promise<void>(async (resovle) => {
            //@ts-ignore
            const assetBundle = find('Canvas')!.getComponent('AssetBundle')!;
            //@ts-ignore
            assetBundle.onClickAudio();
            //@ts-ignore
            if (find('Canvas/Load Tip').getComponent('cc.Label').string === '播放音乐') {
                resovle();
            } else {
                for (let i = 1; i < 10; i++) {
                    await waitForFrames(i * 60);
                    //@ts-ignore
                    if (find('Canvas/Load Tip').getComponent('cc.Label').string === '播放音乐') {
                        resovle();
                        break;
                    }
                }
            }
        })
    }


    async getDestroyResult() {
        return new Promise<void>(async (resovle) => {
            //@ts-ignore
            const assetBundle = find('Canvas')!.getComponent('AssetBundle')!;
            //@ts-ignore
            assetBundle.onClickDestroy();
            //@ts-ignore
            if (find('Canvas/Load Tip').getComponent('cc.Label').string === '分包已被销毁') {
                resovle();
            } else {
                for (let i = 1; i < 10; i++) {
                    await waitForFrames(i * 60);
                    //@ts-ignore
                    if (find('Canvas/Load Tip').getComponent('cc.Label').string === '分包已被销毁') {
                        resovle();
                        break;
                    }
                }
            }
        })
    }

    async getBundleResult() {
        return new Promise<void>(async (resovle) => {
            const assetBundle = find('Canvas')!.getComponent('AssetBundle')!;
            //@ts-ignore
            assetBundle.onClickBundle();
            //@ts-ignore
            if (find('Canvas/Load Tip').getComponent('cc.Label').string === 'Bundle loaded Successfully!') {
                resovle();
            } else {
                for (let i = 1; i < 10; i++) {
                    await waitForFrames(i * 60);
                    //@ts-ignore
                    if (find('Canvas/Load Tip').getComponent('cc.Label').string === 'Bundle loaded Successfully!') {
                        resovle();
                        break;
                    }
                }
            }
        })
    }


    async getReleaseResult() {
        return new Promise<void>(async (resovle) => {
            //@ts-ignore
            const assetBundle = find('Canvas')!.getComponent('AssetBundle')!;
            //@ts-ignore
            assetBundle.onClickRelease();
            //@ts-ignore
            if (find('Canvas/Load Tip').getComponent('cc.Label').string === '资源已被释放') {
                resovle();
            } else {
                for (let i = 1; i < 10; i++) {
                    await waitForFrames(i * 60);
                    //@ts-ignore
                    if (find('Canvas/Load Tip').getComponent('cc.Label').string === '资源已被释放') {
                        resovle();
                        break;
                    }
                }
            }
        })
    }
}


