import { EventGamepad, input, Input, _decorator, Component, Node, ScrollView, Vec3, game, Label, director, Director, assetManager, find, Canvas, Layers, JsonAsset, profiler, sys } from "cc";
const { ccclass, property } = _decorator;
import { SceneList } from "./scenelist";
import { StateCode, TestFramework } from "./TestFramework";

declare class AutoTestConfigJson extends JsonAsset {
    json: {
        enabled: boolean,
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

    public static focusButtonIndex: number = 0;
    public static isControllerMode: boolean = false;
    private lastPressTimestamp: number = 0;

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
            if (sys.platform === sys.Platform.NX){
                if (str.includes('rich-text-long-string-truncation') || str.includes('rich-text-align') || str.includes('geometry-renderer') 
                || str.includes('boxes-unbatched') || str.includes('network') || str.includes('webview') || str.includes('video-player')) {
                    continue;
                }
            }
            const firstIndex = str.lastIndexOf('/') + 1;
            const lastIndex = str.lastIndexOf('.scene');
            SceneList.sceneArray.push(str.substring(firstIndex, lastIndex));
            const firstIndexFold= str.indexOf('/cases/') + 7;
            const lastIndexFolf = str.indexOf('/',firstIndexFold);
            SceneList.sceneFold.push(str.substring(firstIndexFold, lastIndexFolf));
        }
    }

    onLoad() {
        input.on(Input.EventType.GAMEPAD_INPUT, this.onGamepadInput, this);
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
        TestFramework.instance.connect(this.autoTestConfig!.json.server, this.autoTestConfig!.json.port, this.autoTestConfig!.json.timeout, (err) => {
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
                        let testList = SceneList.sceneArray.filter(x => sceneList.indexOf(x) !== -1);
                        SceneList.sceneArray.length = 0;
                        SceneList.sceneArray.push(...testList);
                        this.nextScene();
                    }
                })
            }
        });
    }

    onDestroy () {
        let length = SceneList.sceneArray.length;
        for(let i = 0; i < length; i++) {
            SceneList.sceneArray.pop();
        }
        input.off(Input.EventType.GAMEPAD_INPUT, this.onGamepadInput, this);
    }

    switchSceneName () {
        if (this.getSceneName() == null) {
            return;
        }
        this.sceneName.node.active = true;
        this.sceneName.string = this.getFoldName() +' : '+ this.getSceneName();
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
                //BackButton._scrollCom!.content!.getComponent(Layout)!.updateLayout();
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
                        else if (BackButton._sceneIndex === SceneList.sceneArray.length - 1) {
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
            (BackButton._sceneIndex + 1) >= SceneList.sceneArray.length ? BackButton._sceneIndex = 0 : BackButton._sceneIndex += 1;
        }else {
            (BackButton._sceneIndex - 1) < 0 ? BackButton._sceneIndex = SceneList.sceneArray.length - 1 : BackButton._sceneIndex -= 1;
        }
    }

    getSceneName () {
        return SceneList.sceneArray[BackButton._sceneIndex];
    }

    getFoldName () {
        return SceneList.sceneFold[BackButton._sceneIndex];
    }

    isControllerButtonPress(val: number): boolean {
        let ret = !!(val > 0);
        return ret;
    }

    onGamepadInput(event: EventGamepad) {
        const pressSensitiveTime = 250; //ms
        const axisPrecision = 0.03;

        let currentSence = director.getScene();
        if (currentSence?.name == "" || (currentSence?.name == "TestList") || (currentSence?.name == "gamepad-event")) {
            return;
        }
        if ((this.lastPressTimestamp != 0) && ((Date.now() - this.lastPressTimestamp) < pressSensitiveTime)) {
            return;
        }
        this.lastPressTimestamp = Date.now();

        const gp = event.gamepad;
        const ls = gp.leftStick.getValue();

        const isLeft = this.isControllerButtonPress(gp.dpad.left.getValue()) || ls.x < -axisPrecision;
        const isRight = this.isControllerButtonPress(gp.dpad.right.getValue()) || (ls.x > axisPrecision);
        const isBack = this.isControllerButtonPress(gp.buttonEast.getValue());
        if (isBack) {
            this.backToList();
        } else if (isLeft) {
            this.preScene();
        } else if (isRight) {
            this.nextScene();
        }
    }
}
