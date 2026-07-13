import { find, game } from 'cc';
// @ts-ignore
import { testCase, testClass, waitForFrames, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { AssetBundleZip as AssetBundleZipComp } from '../../../cases/asset/asset-bundle-zip';
import { BackToAssetBundleZip } from '../../../cases/asset/test-bundle-zip/back-to-asset-bundle-zip';

@testClass('AssetBundleZip', 'asset-bundle-zip')
export class AssetBundleZip {
    _dt = 1;
    private caseScript!: AssetBundleZipComp | null;

    @beforeClass
    async initData(){
        this.caseScript = find('Canvas')!.getComponent('AssetBundleZip') as AssetBundleZipComp;
    }

    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async onClickBundle() {
        await this.caseScript!.onClickBundle();
        await screenshot_custom(this._dt);
    }

    @testCase
    async onClickTexture() {
        await this.caseScript!.onClickTexture();
        await screenshot_custom(this._dt);
    }

    @testCase
    async onClickAudio() {
        await this.caseScript!.onClickAudio();
        await screenshot_custom(this._dt);
    }

    @testCase
    async onClickScene() {
        await this.caseScript!.onClickScene();
        await screenshot_custom(this._dt);

        await (find('Canvas')!.getComponent('BackToAssetBundleZip') as BackToAssetBundleZip)!.onClick();
        await screenshot_custom(this._dt);
        this.initData();
    }

    @testCase
    async onClickRelease() {
        this.caseScript!.onClickRelease();
        await screenshot_custom(this._dt);
    }

    @testCase
    async onClickDestroy() {
        this.caseScript!.onClickDestroy();
        await screenshot_custom(this._dt);
    }

    @testCase
    async onFailLoadBundle() {
        await this.caseScript!.onClickTexture().catch((reason: any) => {console.log(reason)});
        await screenshot_custom(this._dt);
    }
}
