
import { _decorator, Component, Node, Material, MeshRenderer, builtinResMgr, Texture2D, TextureCube, ImageAsset, director } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BuiltinTexturesTest
 * DateTime = Wed Dec 22 2021 18:14:42 GMT+0800 (中国标准时间)
 * Author = Greg1129
 * FileBasename = builtin-textures-test.ts
 * FileBasenameNoExtension = builtin-textures-test
 * URL = db://assets/cases/material/builtin-textures-test.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('BuiltinTexturesTest')
export class BuiltinTexturesTest extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({type: Node})
    public nodeBlack = null;

    @property({type: Node})
    public nodeWhite = null;

    @property({type: Node})
    public nodeGrey = null;

    @property({type: Node})
    public nodeEmpty = null;

    @property({type: Node})
    public nodeNormal = null;

    @property({type: Node})
    public nodeDefault = null;

    @property({type: Node})
    public nodeBlack1 = null;

    @property({type: Node})
    public nodeWhite1 = null;

    @property({type: Node})
    public nodeGrey1 = null;

    @property({type: Node})
    public nodeEmpty1 = null;

    @property({type: Node})
    public nodeNormal1 = null;

    @property({type: Node})
    public nodeDefault1 = null;

    start () {
        const blackTexture   = builtinResMgr.get<Texture2D>('black-texture');
        const whiteTexture   = builtinResMgr.get<Texture2D>('white-texture');
        const greyTexture    = builtinResMgr.get<Texture2D>('grey-texture');
        const emptyTexture   = builtinResMgr.get<Texture2D>('empty-texture');
        const normalTexture  = builtinResMgr.get<Texture2D>('normal-texture');
        const defaultTexture = builtinResMgr.get<Texture2D>('default-texture');

        const blackRenderMat = new Material();
        blackRenderMat._uuid = "black";
        blackRenderMat.initialize({
            effectName: 'builtin-unlit',
            defines: { USE_TEXTURE: true },
        });
        blackRenderMat.setProperty('mainTexture', blackTexture, 0);

        const whiteRenderMat = new Material();
        whiteRenderMat._uuid = "white";
        whiteRenderMat.initialize({
            effectName: 'builtin-unlit',
            defines: { USE_TEXTURE: true },
        });
        whiteRenderMat.setProperty('mainTexture', whiteTexture, 0);

        const greyRenderMat = new Material();
        greyRenderMat._uuid = "grey";
        greyRenderMat.initialize({
            effectName: 'builtin-unlit',
            defines: { USE_TEXTURE: true },
        });
        greyRenderMat.setProperty('mainTexture', greyTexture, 0);

        const emptyRenderMat = new Material();
        emptyRenderMat._uuid = "empty";
        emptyRenderMat.initialize({
            effectName: 'builtin-unlit',
            defines: { USE_TEXTURE: true },
        });
        emptyRenderMat.setProperty('mainTexture', emptyTexture, 0);

        const normalRenderMat = new Material();
        normalRenderMat._uuid = "normal";
        normalRenderMat.initialize({
            effectName: 'builtin-unlit',
            defines: { USE_TEXTURE: true },
        });
        normalRenderMat.setProperty('mainTexture', normalTexture, 0);

        const defaultRenderMat = new Material();
        defaultRenderMat._uuid = "default";
        defaultRenderMat.initialize({
            effectName: 'builtin-unlit',
            defines: { USE_TEXTURE: true },
        });
        defaultRenderMat.setProperty('mainTexture', defaultTexture, 0);

        // build from canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        const imgAsset = new ImageAsset(canvas);
        const l = canvas.width = canvas.height = 2;

        // black texture
        context.fillStyle = '#000';
        context.fillRect(0, 0, l, l);
        const blackTextureCanvas = new Texture2D();
        blackTextureCanvas.image = imgAsset;

        // empty texture
        context.fillStyle = 'rgba(0,0,0,0)';
        context.fillRect(0, 0, l, l);
        const emptyTextureCanvas = new Texture2D();
        emptyTextureCanvas.image = imgAsset;

        // grey texture
        context.fillStyle = '#777777';
        context.fillRect(0, 0, l, l);
        const greyTextureCanvas = new Texture2D();
        greyTextureCanvas.image = imgAsset;

        // white texture
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, l, l);
        const whiteTextureCanvas = new Texture2D();
        whiteTextureCanvas.image = imgAsset;

        // normal texture
        context.fillStyle = '#7f7fff';
        context.fillRect(0, 0, l, l);
        const normalTextureCanvas = new Texture2D();
        normalTextureCanvas.image = imgAsset;

        // default texture
        canvas.width = canvas.height = 16;
        context.fillStyle = '#dddddd';
        context.fillRect(0, 0, 16, 16);
        context.fillStyle = '#555555';
        context.fillRect(0, 0, 8, 8);
        context.fillStyle = '#555555';
        context.fillRect(8, 8, 8, 8);
        const defaultTextureCanvas = new Texture2D();
        defaultTextureCanvas.image = imgAsset;

        const blackRenderMatCanvas = new Material();
        blackRenderMatCanvas._uuid = "black1";
        blackRenderMatCanvas.initialize({
            effectName: 'builtin-unlit',
            defines: { USE_TEXTURE: true },
        });
        blackRenderMatCanvas.setProperty('mainTexture', blackTextureCanvas, 0);

        const whiteRenderMatCanvas = new Material();
        whiteRenderMatCanvas._uuid = "white1";
        whiteRenderMatCanvas.initialize({
            effectName: 'builtin-unlit',
            defines: { USE_TEXTURE: true },
        });
        whiteRenderMatCanvas.setProperty('mainTexture', whiteTextureCanvas, 0);

        const greyRenderMatCanvas = new Material();
        greyRenderMatCanvas._uuid = "grey1";
        greyRenderMatCanvas.initialize({
            effectName: 'builtin-unlit',
            defines: { USE_TEXTURE: true },
        });
        greyRenderMatCanvas.setProperty('mainTexture', greyTextureCanvas, 0);

        const emptyRenderMatCanvas = new Material();
        emptyRenderMatCanvas._uuid = "empty1";
        emptyRenderMatCanvas.initialize({
            effectName: 'builtin-unlit',
            defines: { USE_TEXTURE: true },
        });
        emptyRenderMatCanvas.setProperty('mainTexture', emptyTextureCanvas, 0);

        const normalRenderMatCanvas = new Material();
        normalRenderMatCanvas._uuid = "normal1";
        normalRenderMatCanvas.initialize({
            effectName: 'builtin-unlit',
            defines: { USE_TEXTURE: true },
        });
        normalRenderMatCanvas.setProperty('mainTexture', normalTextureCanvas, 0);

        const defaultRenderMatCanvas = new Material();
        defaultRenderMatCanvas._uuid = "default1";
        defaultRenderMatCanvas.initialize({
            effectName: 'builtin-unlit',
            defines: { USE_TEXTURE: true },
        });
        defaultRenderMatCanvas.setProperty('mainTexture', defaultTextureCanvas, 0);

        if (this.nodeBlack) {
            this.nodeBlack.getComponent(MeshRenderer).material   = blackRenderMat;
        }

        if (this.nodeWhite) {
            this.nodeWhite.getComponent(MeshRenderer).material   = whiteRenderMat;
        }

        if (this.nodeGrey) {
            this.nodeGrey.getComponent(MeshRenderer).material    = greyRenderMat;
        }

        if (this.nodeEmpty) {
            this.nodeEmpty.getComponent(MeshRenderer).material   = emptyRenderMat;
        }

        if (this.nodeNormal) {
            this.nodeNormal.getComponent(MeshRenderer).material  = normalRenderMat;
        }

        if (this.nodeDefault) {
            this.nodeDefault.getComponent(MeshRenderer).material = defaultRenderMat;
        }

        if (this.nodeBlack1) {
            this.nodeBlack1.getComponent(MeshRenderer).material   = blackRenderMatCanvas;
        }

        if (this.nodeWhite1) {
            this.nodeWhite1.getComponent(MeshRenderer).material   = whiteRenderMatCanvas;
        }

        if (this.nodeGrey1) {
            this.nodeGrey1.getComponent(MeshRenderer).material    = greyRenderMatCanvas;
        }

        if (this.nodeEmpty1) {
            this.nodeEmpty1.getComponent(MeshRenderer).material   = emptyRenderMatCanvas;
        }

        if (this.nodeNormal1) {
            this.nodeNormal1.getComponent(MeshRenderer).material  = normalRenderMatCanvas;
        }

        if (this.nodeDefault1) {
            this.nodeDefault1.getComponent(MeshRenderer).material = defaultRenderMatCanvas;
        }

        const defaultCubeTexture = builtinResMgr.get<TextureCube>("default-cube-texture");
        director.getScene().globals.skybox.envmap = defaultCubeTexture;
    }
}
