import { _decorator, Component, Node, ScrollView, Vec3, Layout, game, Label, director, Director, assetManager, find, Canvas, Layers, CCString, CCInteger, resources, JsonAsset, profiler, CCBoolean } from "cc";
const { ccclass, property } = _decorator;
import { sceneArray } from "./scenelist";
import { ReceivedCode, StateCode, TestFramework } from "./TestFramework";

@ccclass("BackButton")
export class BackButton extends Component {
    private static _offset = new Vec3();
    public static _scrollNode : Node | null  = null;
    private static _scrollCom : ScrollView | null = null;

    private static _sceneIndex : number = -1;
    private static _blockInput : Node;
    private static _prevNode : Node;
    private static _nextNode : Node;
    private sceneName! : Label;

    @property(CCString)
    public testServerAddress = '127.0.0.1';

    @property(CCInteger)
    public testServerPort = 8080;

    @property(CCInteger)
    public timeout = 5000;

    @property(CCInteger)
    public retryTime = 3;

    private autoTest = false;

    @property(CCBoolean)
    public manuallyTest = false;

    __preload() {
        const sceneInfo = assetManager.main!.config.scenes;
        const array: string[] = [];
        sceneInfo.forEach((i) => array.push(i.url));
        array.sort();
        for (let i = 0;  i< array.length; i++) {
            let str = array[i];
            if (str.includes('TestList') || str.includes('subPack') || str.includes('static-ui-replace')) {
                continue;
            }
            if (str.includes('asset-bundle-zip') && !assetManager.downloader.remoteServerAddress) {
                continue;
            }
            const firstIndex = str.lastIndexOf('/') + 1;
            const lastIndex = str.lastIndexOf('.scene');
            sceneArray.push(str.substring(firstIndex, lastIndex));
        }
    }

    public manuallyControl () {
        this.node.getChildByName('PrevButton')!.active = true;
        this.node.getChildByName('NextButton')!.active = true;
        this.node.getChildByName('back')!.active = true;
        profiler.showStats();
    }

    public autoControl () {
        this.node.getChildByName('PrevButton')!.active = false;
        this.node.getChildByName('NextButton')!.active = false;
        this.node.getChildByName('back')!.active = false;
        profiler.hideStats();
    }

    public static get offset() {
        return BackButton._offset;
    }

    public static set offset( value ) {
        BackButton._offset = value;
    }

    public static saveOffset () {
        if (BackButton._scrollNode ) {
            BackButton._offset = new Vec3(0, BackButton._scrollCom!.getScrollOffset().y, 0);
        }
    }

    public static saveIndex ( index : number) {
        BackButton._sceneIndex = index;
        BackButton.refreshButton();
    }

    public static refreshButton () {
        if (BackButton._sceneIndex === -1) {
            BackButton._prevNode.active = false;
            BackButton._nextNode.active = false;
        } else {
            BackButton._prevNode.active = true;
            BackButton._nextNode.active = true;
        }
    }

    start () {
        let camera = this.node.getComponent(Canvas)!.cameraComponent!;
        if (camera.visibility & Layers.Enum.UI_2D) camera.visibility &= ~Layers.Enum.UI_2D;
        this.sceneName = find("backRoot")!.getChildByName("sceneName")!.getComponent(Label)!;
        game.addPersistRootNode(this.node);
        BackButton._scrollNode = this.node.getParent()!.getChildByPath('Canvas/ScrollView') as Node;
        if (BackButton._scrollNode) {
            BackButton._scrollCom = BackButton._scrollNode.getComponent(ScrollView);
        }
        BackButton._blockInput = this.node.getChildByName('BlockInput') as Node;
        BackButton._blockInput.active = false;
        BackButton._prevNode = this.node.getChildByName('PrevButton') as Node;
        BackButton._nextNode = this.node.getChildByName('NextButton') as Node;
        if (BackButton._prevNode && BackButton._nextNode) {
            BackButton.refreshButton();
        }
        director.on(Director.EVENT_BEFORE_SCENE_LOADING,this.switchSceneName,this);
        if (this.manuallyTest) return;
        TestFramework.instance.connect(this.testServerAddress, this.testServerPort, this.timeout, this.retryTime, (err) => {
            if (err) {
                this.autoTest = false;
            }
            else {
                TestFramework.instance.startTest({ time: Date.now() }, (err) => {
                    if (err) {
                        this.autoTest = false;
                    }
                    else {
                        this.autoTest = true;
                        this.autoControl();
                        TestFramework.instance.onmessage = (state, message) => {
                            if (state === ReceivedCode.CHANGE_SCENE) {
                                this.nextScene();
                            }
                        };
                        resources.load('auto-test-list', JsonAsset, (err, asset) => {
                            let staticScenes = (asset.json as Record<string, any>)!["static-scenes"] as string[];
                            let testList = sceneArray.filter(x => staticScenes.indexOf(x) !== -1);
                            sceneArray.length = 0;
                            sceneArray.push(...testList);
                            this.nextScene();
                        });
                    }
                })
            }
        });
    }

    onDestroy () {
        let length = sceneArray.length;
        for(let i = 0; i < length; i++) {
            sceneArray.pop();
        }
    }

    switchSceneName () {
        if (this.getSceneName() == null) {
            return;
        }
        this.sceneName.node.active = true;
        this.sceneName.string = this.getSceneName();
    }

    backToList () {
        director.resume();
        BackButton._blockInput.active = true;
        director.loadScene('TestList', ()=> {
            this.sceneName.node.active = false;
            BackButton._sceneIndex = -1;
            BackButton.refreshButton();
            BackButton._scrollNode = this.node.parent!.getChildByPath('Canvas/ScrollView') as Node;
            if (BackButton._scrollNode) {
                BackButton._scrollCom = BackButton._scrollNode.getComponent(ScrollView);
                BackButton._scrollCom!.content!.getComponent(Layout)!.updateLayout();
                BackButton._scrollCom!.scrollToOffset(BackButton.offset,0.1,true);
            }
            BackButton._blockInput.active = false;
        });
    }

    nextScene () {
        director.resume();
        BackButton._blockInput.active = true;
        this.updateSceneIndex(true);
        director.loadScene(this.getSceneName(), () => {
            if (this.autoTest) {
                TestFramework.instance.postMessage(StateCode.SCENE_CHANGED, this.getSceneName(), '', (err) => {
                    if (err) {
                        this.manuallyControl();
                    }
                    else if (BackButton._sceneIndex === sceneArray.length - 1) {
                        TestFramework.instance.endTest('', () => {
                            this.manuallyControl();
                        });
                    }
                    else {
                        this.nextScene();
                    }
                });
            }
            BackButton._blockInput.active = false;
        });
    }

    preScene () {
        director.resume();
        BackButton._blockInput.active = true;
        this.updateSceneIndex(false);
        director.loadScene(this.getSceneName(), function() {
            BackButton._blockInput.active = false;
        });
    }

    updateSceneIndex (next:Boolean) {
        if (next) {
            (BackButton._sceneIndex + 1) >= sceneArray.length ? BackButton._sceneIndex = 0 : BackButton._sceneIndex += 1;
        }else {
            (BackButton._sceneIndex - 1) < 0 ? BackButton._sceneIndex = sceneArray.length - 1 : BackButton._sceneIndex -= 1;
        }
    }

    getSceneName () {
        return sceneArray[BackButton._sceneIndex];
    }
}
