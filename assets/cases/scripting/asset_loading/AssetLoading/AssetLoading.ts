import { _decorator, Component, Node, director, SpriteAtlas, Prefab, Material, builtinResMgr, Texture2D, Sprite, loader, UIMeshRenderer, SpriteFrame, AudioSource, Font, instantiate, TextureCube, log, Label, Touch, EventTouch, MeshRenderer } from "cc";
const { ccclass, property } = _decorator;

type UrlKey = keyof AssetLoading['_urls'];

@ccclass("AssetLoading")
export class AssetLoading extends Component {

    private declare _curType: UrlKey;
    private _lastType: UrlKey | '' = '';
    private _curRes: any = null;
    private _btnLabel: Label | null = null;
    private _audioSource: AudioSource | null = null;
    private _isLoading = false;
    private _urls = {
        Audio: "test_assets/audio",
        Txt: "test_assets/text",
        ImageAsset: "test_assets/PurpleMonster",
        Texture2D: "test_assets/PurpleMonster/texture",
        Font: "test_assets/font",
        SpriteAtlas: "test_assets/atlas.plist",
        SpriteFrame: "test_assets/image/spriteFrame",
        Prefab: "test_assets/prefab",
        Animation: "test_assets/testAnim",
        Scene: "test_assets/test-scene",
        TextureCube: "test_assets/cubemap",
        CORS: "https://download.cocos.org/CocosTest/test-case/logo.png",
        Material: "test_assets/testMat",
        Mesh: "test_assets/Monster/monster.mesh",
        Skeleton: "test_assets/Monster/Armature.skeleton",
    };

    @property({ type: Node })
    public showWindow: Node = null!;

    @property({ type: Label})
    public loadTips: Label = null!;

    @property({ type: [Node] })
    public loadList: Node[] = [];

    @property({ type: Prefab })
    public loadAnimTestPrefab: Prefab = null!;

    @property({ type: SpriteFrame })
    public loadMaterialSpriteFrame: SpriteFrame = null!;

    // use this for initialization
    onLoad () {
        // registered event
        this._onRegisteredEvent();
    }

    onDestroy () {
        if (this._curRes) {
            loader.releaseAsset(this._curRes);
        }
    }

    _onRegisteredEvent () {
        for (var i = 0; i < this.loadList.length; ++i) {
            this.loadList[i].on(Node.EventType.TOUCH_END, this._onClick.bind(this));
        }
    }

    _onClick (event: EventTouch) {
        if (this._isLoading) {
            return;
        }

        this._onClear();

        const target = event.target as Node;
        if (target) {
            const curType = target.name.split('_')[1];
            if (curType in this._urls) {
                this._curType = curType as UrlKey;
            }
        }

        if (this._lastType !== "" && this._curType === this._lastType) {
            this.loadTips.string = ''
            this._onShowResClick(event);
            return;
        }

        if (this._btnLabel) {
            this._btnLabel.string = "已加载 " + this._lastType;
        }

        this._lastType = this._curType;
        if (target) {
            this._btnLabel = target.getChildByName("Label")!.getComponent(Label);
        }

        this.loadTips.string = this._curType + " Loading....";
        this._isLoading = true;

        this._load();
    }

    _load () {
        const url = this._urls[this._curType];
        var loadCallBack = this._loadCallBack.bind(this);
        switch (this._curType) {
            case 'SpriteFrame':
                // specify the type to load sub asset from texture's url
                loader.loadRes(url, SpriteFrame, loadCallBack);
                break;
            case 'Texture2D':
                loader.loadRes(url, Texture2D, loadCallBack);
                break;
            case 'TextureCube':
                loader.loadRes(url, TextureCube, loadCallBack);
                break;
            case 'Font':
                loader.loadRes(url, Font, loadCallBack);
                break;
            case 'SpriteAtlas':
                loader.loadRes(url, SpriteAtlas, loadCallBack);
                break;
            case 'Animation':
            case 'Prefab':
            case 'Skeleton':
            case 'Mesh':
            case 'ImageAsset':
            case 'Txt':
            case 'Audio':
            case 'Material':
            case 'Skeleton':
                loader.loadRes(url, loadCallBack);
                break;
            case 'Scene':
                director.loadScene(url);
                break;
            case 'CORS':
                loader.load(url, loadCallBack);
                this.loadTips.string = "CORS image should report texImage2D error under WebGL and works ok under Canvas"
                break;
            default:
                loader.load(url, loadCallBack);
                break;
        }
    }

    _loadCallBack (err: Error | null, res: any) {
        this._isLoading = false;
        if (err) {
            log('Error url [' + err + ']');
            return;
        }
        if (this._curType === 'ImageAsset' || this._curType === 'CORS') {
            this._curRes = new Texture2D();
            this._curRes.image = res;
        } else {
            this._curRes = res;
        }

        if (this._btnLabel) {
            if (this._curType === "Audio") {
                this._btnLabel.string = "播放";
            } else {
                this._btnLabel.string = "创建";
            }
            this._btnLabel.string += this._curType;
        }

        this.loadTips.string = this._curType + " Loaded Successfully!";
    }

    _onClear () {
        this.showWindow.removeAllChildren();
        if (this._audioSource && this._audioSource instanceof AudioSource) {
            this._audioSource.stop();
        }
    }

    _onShowResClick (event: any) {
        if (this._curType === "Scene") {
            return;
        }
        this._createNode(this._curType, this._curRes);
    }

    _createNode (type: string, res: any) {
        this.loadTips.string = "";
        const node = new Node("New " + type);
        node.setPosition(0, 0, 0);
        let component = null;
        switch (this._curType) {
            case "SpriteFrame":
                component = node.addComponent(Sprite);
                component.spriteFrame = res;
                break;

            case "SpriteAtlas":
                component = node.addComponent(Sprite);
                component.spriteFrame = res.getSpriteFrames()[0];
                break;
            case "Texture2D":
                let cube = instantiate(this.loadAnimTestPrefab);
                const model = cube.getComponent(MeshRenderer)!;
                model.material!.setProperty('albedoMap', res);
                cube.setPosition(0, 0, 50);
                cube.setScale(100, 100, 100);
                cube.parent = this.showWindow;
                break;
            case 'ImageAsset':
            case "CORS":
                component = node.addComponent(Sprite);
                const spriteFrame = new SpriteFrame();
                spriteFrame.texture = res;
                component.spriteFrame = spriteFrame;
                break;
            case "Audio":
                component = node.addComponent(AudioSource);
                component.clip = res;
                component.play();
                this._audioSource = component;
                this.loadTips.string = "播放音乐。";
                break;
            case "Txt":
                component = node.addComponent(Label);
                component.lineHeight = 40;
                component.string = res.text;
                break;
            case "Material":
                component = node.addComponent(Sprite);
                component.sharedMaterials = res;
                component.spriteFrame = this.loadMaterialSpriteFrame;
                break;
            case "Font":
                component = node.addComponent(Label);
                component.font = res;
                component.lineHeight = 40;
                component.string = "This is BitmapFont!";
                break;
            case 'Mesh':
                component = node.addComponent(MeshRenderer);
                node.addComponent(UIMeshRenderer);
                node.setPosition(0, 0, 50);
                node.setScale(5, 5, 5);
                component.mesh = res;
                component.material = builtinResMgr.get<Material>('standard-material');
                break;
            case "Prefab":
                let prefab = instantiate(res);
                prefab.parent = node;
                prefab.setPosition(0, 0, 0);
                break;
            default:
                this.loadTips.string = "此项没有展示效果";
                break;
        }
        this.showWindow.addChild(node);
    }
}
