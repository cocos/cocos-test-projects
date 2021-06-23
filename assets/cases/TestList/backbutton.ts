import { _decorator, Component, Node, ScrollView, Vec3, Layout, game, Label, director, Director, assetManager, find, Canvas, Layers, CCString, CCInteger, resources, JsonAsset, profiler, CCBoolean, log, Game } from "cc";
const { ccclass, property } = _decorator;
import { sceneArray } from "./scenelist";
import { ReceivedCode, StateCode, TestFramework } from "./TestFramework";



declare class AutoTestConfigJson extends JsonAsset {
    json: {
        enabled: boolean,
        isWechat: boolean,
        server: string,
        port: number,
        timeout: number,
        maxRetryTimes: number,
        sceneList: string[],
    }
}
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

    @property(JsonAsset)
    public autoTestConfig: AutoTestConfigJson | null = null;

    private isAutoTesting: boolean = false;

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
        
        
        
        
        if (!this.autoTestConfig!.json.enabled) return;

        TestFramework.instance.connect(this.autoTestConfig!.json.server, this.autoTestConfig!.json.port, this.autoTestConfig!.json.isWechat, this.autoTestConfig!.json.timeout, (err) => {
            if (err) {
                this.isAutoTesting = false;
            }
            else {
                TestFramework.instance.startTest({ time: Date.now() }, (err) => {
                    if (err) {
                        this.isAutoTesting = false;
                    }
                    else {
                        this.isAutoTesting = true;
                        this.autoControl();
                        let sceneList = this.autoTestConfig!.json.sceneList;
                        let testList = sceneArray.filter(x => sceneList.indexOf(x) !== -1);
                        sceneArray.length = 0;
                        sceneArray.push(...testList);
                        this.nextScene();
                    }
                })
            }
        });
        window.addEventListener('error',(event)=>{
            var msg : string;
            msg = "错误发生于："+event.filename+"，错误类型为"+event.error+"错误详细信息为"+event.message;
            if (this.isAutoTesting){
                TestFramework.instance.postMessage(StateCode.ERROR, this.getSceneName(), msg, () => {
                    this.manuallyControl();
                });
            }

        });
        window.onerror = (msg, url, lineNo, columnNo, error) => 
        {
            var string = msg;
            var substring = "script error";
            var message = [
                'Message: ' + msg,
                'URL: ' + url,
                'Line: ' + lineNo,
                'Column: ' + columnNo,
                'Error object: ' + JSON.stringify(error)
            ].join(' - ');
            if (this.isAutoTesting){
                TestFramework.instance.postMessage(StateCode.ERROR, this.getSceneName(), message, () => {
                    this.manuallyControl();
                });
            }
        };
        
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
                BackButton._scrollCom!.scrollToOffset(BackButton.offset, 0.1, true);
            }
            BackButton._blockInput.active = false;
        });
    }

    nextScene () {
        director.resume();
        BackButton._blockInput.active = true;
        this.updateSceneIndex(true);
        const sceneName = this.getSceneName();
        director.loadScene(sceneName, (err) => {
            if (this.isAutoTesting) {
                if (err) {
                    TestFramework.instance.postMessage(StateCode.SCENE_ERROR, sceneName, '', () => {
                        this.manuallyControl();
                    });
                } else {
                    TestFramework.instance.postMessage(StateCode.SCENE_CHANGED, sceneName, '', (err) => {
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
