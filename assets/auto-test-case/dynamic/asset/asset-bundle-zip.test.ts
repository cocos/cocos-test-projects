import { find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('asset-bundle-zip')
@testClass('AssetBundleZip')
export class AssetBundleZip {
    _dt = 1;


    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async onClickBundle() {
        await this.getBundleResult();
        await screenshot_custom(this._dt);
    }

    @testCase
    async onClickTexture() {
        await this.getTextrueResult();
        await screenshot_custom(this._dt);
    }

    @testCase
    async onClickAudio() {
        // @ts-ignore
        // find('Canvas').getComponent('AssetBundleZip').onClickAudio();
        await this.getAudioResult();
        await screenshot_custom(this._dt);
    }

    @testCase
    async onClickScene() {
        // @ts-ignore
        // await find('Canvas')?.getComponent('AssetBundleZip')?.onClickScene();
        await this.getSceneResult();
        await screenshot_custom(this._dt);
        // @ts-ignore
        await find('Canvas')?.getComponent('BackToAssetBundleZip')?.onClick();
        await screenshot_custom(this._dt);
    }

    @testCase
    async onClickRelease() {
        // @ts-ignore
        await this.getReleaseResult();
        await screenshot_custom(this._dt);
    }

    @testCase
    async onClickDestroy() {
        // @ts-ignore
        await this.getDestroyResult();
        await screenshot_custom(this._dt);
    }

    @testCase
    async onFailLoadBundle() {
        // @ts-ignore
        await this.getTextrueResult();
        await screenshot_custom(this._dt);
    }

    async getTextrueResult() {
        return new Promise<void>(async (resovle) => {
            await waitForFrames(5 * 60);
            //@ts-ignore
            const assetBundleZip = find('Canvas')!.getComponent('AssetBundleZip')!;
            //@ts-ignore
            await assetBundleZip.onClickTexture();
            // find('Canvas').getComponent('AssetBundleZip').onClickTexture();
            await waitForFrames(2 * 60);
            //@ts-ignore
            if (find('Canvas/Load Tip')!.getComponent('cc.Label')!.string === '操作失败，请先加载 Asset Bundle') {
                console.warn('before load bundle fail, cause onclickTexture fail!');
                resovle();
            } else {
                for (let i = 1; i < 6; i++) {
                    await waitForFrames(i * 60);
                    //@ts-ignore
                    if (find('Canvas/Layout/Load_Texture')!.getComponent('cc.Button')!.target.getChildByName('Label')!.getComponent('cc.Label')!.string === '已加载') {
                        resovle();
                        break;
                    } else {
                        for (let i = 1; i < 10; i++) {
                            await waitForFrames(i * 60);
                            //@ts-ignore
                            if (find('Canvas/Layout/Load_Texture')!.getComponent('cc.Button')!.target.getChildByName('Label')!.getComponent('cc.Label')!.string === '已加载') {
                                resovle();
                                break;
                            }
                        }
                    }
                }
            }
        })
    }


    async getAudioResult() {
        return new Promise<void>(async (resovle) => {
            //@ts-ignore
            const assetBundleZip = find('Canvas')!.getComponent('AssetBundleZip')!;
            //@ts-ignore
            await assetBundleZip.onClickAudio();
            //@ts-ignore
            if (find('Canvas/Load Tip')!.getComponent('cc.Label')!.string === '播放音乐') {
                resovle();
            } else {
                for (let i = 1; i < 10; i++) {
                    await waitForFrames(i * 60);
                    //@ts-ignore
                    if (find('Canvas/Load Tip')!.getComponent('cc.Label')!.string === '播放音乐') {
                        resovle();
                    }
                }
            }
        })
    }


    async getSceneResult() {
        return new Promise<void>(async (resovle, reject) => {
            //@ts-ignore
            const assetBundleZip = find('Canvas')!.getComponent('AssetBundleZip')!;
            //@ts-ignore
            await assetBundleZip.onClickScene();
            //@ts-ignore
            if (!find('Canvas/Load Tip') && find('Canvas').getComponent('BackToAssetBundleZip')) {
                resovle();
            } else {
                for (let i = 1; i < 10; i++) {
                    await waitForFrames(i * 60);
                    //@ts-ignore
                    if (!find('Canvas/Load Tip') && find('Canvas')!.getComponent('BackToAssetBundleZip')!) {
                        resovle();
                    }
                }
                reject('test case has error，scene:asset-bundle-zip');
            }
        })
    }


    async getDestroyResult() {
        return new Promise<void>(async (resovle) => {
            //@ts-ignore
            const assetBundleZip = find('Canvas')!.getComponent('AssetBundleZip')!;
            //@ts-ignore
            await assetBundleZip.onClickDestroy();
            //@ts-ignore
            if (find('Canvas/Load Tip')!.getComponent('cc.Label')!.string === '分包已被销毁') {
                resovle();
            } else {
                for (let i = 1; i < 10; i++) {
                    await waitForFrames(i * 60);
                    //@ts-ignore
                    if (find('Canvas/Load Tip')!.getComponent('cc.Label')!.string === '分包已被销毁') {
                        resovle();
                    }
                }
            }
        })
    }

    async getBundleResult() {
        return new Promise<void>(async (resovle) => {
            //@ts-ignore
            const assetBundleZip = find('Canvas')!.getComponent('AssetBundleZip')!;
            //@ts-ignore
            await assetBundleZip.onClickBundle();
            //@ts-ignore
            if (find('Canvas/Load Tip')!.getComponent('cc.Label')!.string === 'Bundle loaded Successfully!') {
                console.log('asset zip bundle: bundle loaded successfully!');
                resovle();
            } else {
                for (let i = 1; i < 10; i++) {
                    await waitForFrames(i * 60);
                    //@ts-ignore
                    if (find('Canvas/Load Tip')!.getComponent('cc.Label')!.string === 'Bundle loaded Successfully!') {
                        console.log('asset zip bundle: bundle loaded successfully!');
                        resovle();
                    }
                }
            }
        })
    }


    async getReleaseResult() {
        return new Promise<void>(async (resovle) => {
            //@ts-ignore
            const assetBundleZip = find('Canvas')!.getComponent('AssetBundleZip')!;
            //@ts-ignore
            await assetBundleZip.onClickRelease();
            //@ts-ignore
            if (find('Canvas/Load Tip')!.getComponent('cc.Label')!.string === '资源已被释放') {
                resovle();
            } else {
                for (let i = 1; i < 10; i++) {
                    await waitForFrames(i * 60);
                    //@ts-ignore
                    if (find('Canvas/Load Tip')!.getComponent('cc.Label')!.string === '资源已被释放') {
                        resovle();
                    }
                }
            }
        })
    }
}
