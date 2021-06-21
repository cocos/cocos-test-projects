
import { _decorator, Component, Node, Label, loader, assetManager, AssetManager, Texture2D, ImageAsset, SpriteAtlas } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TestAtlasConfig')
export class TestAtlasConfig extends Component {
    // [1]
    // dummy = '';
    @property({type: [Label]})
    public normal: Label[] = [];

    @property({type: [Label]})
    public config: Label[] = [];

    @property({type: Label})
    public loadBundleLabel!: Label;
    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        // [3]
        this.loadBundle();
    }

    loadBundle() {
        assetManager.loadBundle('test-atlas-build', (err, bundle) => {
            if (err) {
                this.loadBundleLabel.string = 'load bundle test-atlas-build failed!';
                return;
            }

            this.loadBundleLabel.string = 'load bundle success!';
            this.loadAssetTest('normal', bundle);
            this.loadAssetTest('config', bundle);
        });
    }

    loadAssetTest(folder: 'normal' | 'config', bundle: AssetManager.Bundle) {
        const loadTexture = this[folder][0];
        const loadImage = this[folder][1];
        const loadSpriteAtlas = this[folder][2];
        bundle.load(`${folder}/1/texture`, Texture2D, (err, asset) => {
            if (err) {
                loadTexture.string = folder + ' load texture failed!';
                return;
            }
            loadTexture.string = folder + ' load texture sucess!';
        });
        bundle.load(`${folder}/2`, ImageAsset, (err, asset) => {
            if (err) {
                loadImage.string = folder + ' load image failed!√';
                return;
            }
            loadImage.string = folder + ' load image sucess!';
        });
        bundle.load(`${folder}/auto-atlas`, SpriteAtlas, (err, asset) => {
            if (err) {
                loadSpriteAtlas.string = folder + ' load spriteAtlas failed!';
                return;
            }
            loadSpriteAtlas.string = folder + ' load spriteAtlas sucess!';
        });
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
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
