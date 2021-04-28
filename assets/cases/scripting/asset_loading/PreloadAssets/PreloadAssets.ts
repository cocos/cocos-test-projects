import { _decorator, Component, Node, Sprite, AudioSource, builtinResMgr, director, Font, instantiate, Label, loader, log, Material, MeshRenderer, Prefab, SpriteAtlas, SpriteFrame, Texture2D, TextureCube, UIMeshRenderer, assetManager, resources, Asset, AssetManager, SceneAsset, Layers } from 'cc';
const { ccclass, property } = _decorator;

type UrlKey = keyof PreloadAssets['_urls'];

@ccclass('PreloadAssets')
export class PreloadAssets extends Component {
    private declare _curType: UrlKey;
    private _lastType: UrlKey | '' = '';
    private _btnLabel: Label | null = null;
    private _audioSources: AudioSource[] = [];
    private _isLoading = false;
    private _urls = {
        Audio: "test_assets/audio",
        Txt: "test_assets/text",
        ImageAsset: "test_assets/PurpleMonster",
        Texture2D: "test_assets/PurpleMonster/texture",
        Font: "test_assets/font",
        SpriteAtlas: "test_assets/atlas",
        SpriteFrame: "test_assets/image/spriteFrame",
        Prefab: "test_assets/prefab",
        Animation: "test_assets/testAnim",
        Scene: "test_assets/test-preload-scene",
        TextureCube: "test_assets/cubemap",
        Material: "test_assets/testMat",
        Mesh: "test_assets/Monster/monster",
        Skeleton: "test_assets/Monster/Armature",
        Dir: 'test_assets'
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

    }

    _onRegisteredEvent () {
        for (var i = 0; i < this.loadList.length; ++i) {
            this.loadList[i].on(Node.EventType.TOUCH_END, this._onClick.bind(this));
        }
    }

    _onClick (event: any) {
        if (this._isLoading) {
            return;
        }

        this._onClear();

        this._curType = event.target.name.split('_')[1];
        if (this._lastType !== "" && this._curType === this._lastType) {
            this.loadTips.string = ''
            this._onShowResClick(event);
            return;
        }

        if (this._btnLabel) {
            this._btnLabel.string = "已加载 " + this._lastType;
        }

        this._lastType = this._curType;

        this._btnLabel = event.target.getChildByName("Label").getComponent(Label);

        this.loadTips.string = this._curType + " Loading....";
        this._isLoading = true;

        this._load();
    }

    _load () {
        var url = this._urls[this._curType];
        var loadCallBack = this._loadCallBack.bind(this);
        switch (this._curType) {
            case 'SpriteFrame':
                // specify the type to load sub asset from texture's url
                resources.preload(url, SpriteFrame, loadCallBack);
                break;
            case 'Texture2D':
                resources.preload(url, Texture2D, loadCallBack);
                break;
            case 'TextureCube':
                resources.preload(url, TextureCube, loadCallBack);
                break;
            case 'Font':
                resources.preload(url, Font, loadCallBack);
                break;
            case 'SpriteAtlas':
                resources.preload(url, SpriteAtlas, loadCallBack);
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
                resources.preload(url, loadCallBack);
                break;
            case 'Scene':
                director.preloadScene(url, loadCallBack);
                break;
            case 'Dir':
                resources.preloadDir(url, loadCallBack);
                break;
            default:
                break;
        }
    }

    _loadCallBack (err: Error | null, data?: AssetManager.RequestItem[] | SceneAsset) {
        this._isLoading = false;
        if (err) {
            log('Error url [' + err + ']');
            return;
        }

        if(this._btnLabel){
            if (this._curType === "Audio") {
                this._btnLabel.string = "播放";
            } else {
                this._btnLabel.string = "创建";
            }

            this._btnLabel.string += this._curType;
        }

        this.loadTips.string = this._curType + " Preloaded Successfully!";
    }

    _onClear () {
        this.showWindow.removeAllChildren();
        this._audioSources.forEach(audioSource => {
            audioSource.stop();
        });
        this._audioSources.length = 0;
    }

    _onShowResClick (event: any) {
        var url = this._urls[this._curType];
        switch (this._curType) {
            case 'SpriteFrame':
                // specify the type to load sub asset from texture's url
                resources.load(url, SpriteFrame, (err, asset) => this._createNode(this._curType, asset));
                break;
            case 'Texture2D':
                resources.load(url, Texture2D, (err, asset) => this._createNode(this._curType, asset));
                break;
            case 'TextureCube':
                resources.load(url, TextureCube, (err, asset) => this._createNode(this._curType, asset));
                break;
            case 'Font':
                resources.load(url, Font, (err, asset) => this._createNode(this._curType, asset));
                break;
            case 'SpriteAtlas':
                resources.load(url, SpriteAtlas, (err, asset) => this._createNode(this._curType, asset));
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
                resources.load(url, (err, asset) => this._createNode(this._curType, asset));
                break;
            case 'Scene':
                director.loadScene(url);
                break;
            case 'Dir':
                resources.loadDir(url, (err, assets) => {
                    this.loadTips.string = "The asset loaded: ";
                    assets.forEach((r) => this.loadTips.string += `${r.name};`);
                });
                break;
            default:
                break;
        }
    }

    _createNode (type: string, res: any) {
        this.loadTips.string = "";
        const node = new Node("New " + type);
        node.layer = Layers.Enum.UI_2D;
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
                const model = cube.getComponent(MeshRenderer);
                model?.material?.setProperty('albedoMap', res);
                cube.setPosition(0, 0, 50);
                cube.setScale(100, 100, 100);
                cube.parent = this.showWindow;
                break;
            case 'ImageAsset':
                component = node.addComponent(Sprite);
                const spriteFrame = new SpriteFrame();
                const tex = new Texture2D();
                tex.image = res;
                spriteFrame.texture = tex;
                component.spriteFrame = spriteFrame;
                break;
            case "Audio":
                component = node.addComponent(AudioSource);
                component.clip = res;
                component.play();
                this._audioSources.push(component);
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
