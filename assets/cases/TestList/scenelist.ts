import { _decorator, Component, Node, Prefab } from "cc";
const { ccclass, property } = _decorator;

export const sceneArray:string[] = [
    "audio",
    "camera",
    "SwitchAnimation",
    "UniformKTest",
    "deprecated",
    "AnimationEvent",
    "Material",
    "Transform",
    "compressed-texture",
    "node-event",
    "system-event",
    "event-info",
    "material",
    "particle-color",
    "particle-force",
    "particle-limit-velocity",
    "particle-main",
    "particle-renderer",
    "particle-rotation",
    "particle-shape",
    "particle-size",
    "particle-texture-animation",
    "particle-trail",
    "particle-velocity",
    "group-mask-builtin",
    "trigger-builtin",
    "collision",
    "constant-force",
    "force-impluse",
    "group-mask",
    "physic-material",
    "trigger",
    "velocity",
    "culling",
    "planar-shadow",
    "sort",
    "capture_to_web",
    "render-camera-to-model",
    "render-ui-to-model",
    "render-ui-to-spriteframe",
    "use-render-texture-asset",
    "AssetLoading",
    "LoadRes",
    "LoadResDir",
    "tween",
    "fill-sprite",
    "simple",
    "sliced-sprite",
    "trimmed",
    "align-font-label",
    "bmfont-label",
    "system-font",
    "ttffont-label",
    "button-click",
    "click-when-scroll",
    "advance-widget",
    "align-mode",
    "anim-widget",
    "widget-percentage",
    "widget-performance",
    "layout-basic",
    "layout-grid-expand",
    "layout-scrollview",
    "list-view",
    "scroll-view",
    "rich-text",
    "mask",
    "toggle",
    "slider",
    "progress",
    "editbox-ctrl",
    "editbox",
    "frame-anim",
    "graphics",
    "pageView_free_horizontal",
    "pageView_free_verticle",
    "pageView_unified_horizontal",
    "pageView_unified_verticle",
    "coordinate-ui-3d",
    "priority",
    "uimodel",
]

@ccclass("scenemanager")
export class SceneManager extends Component {

    @property ({ type: Prefab })
    itemPrefab: Prefab | null  = null;

    onLoad() {
        if(this.itemPrefab){
            for(let i = 0; i<sceneArray.length; i++ ) {
                let item = cc.instantiate(this.itemPrefab);
                this.node.addChild(item);
            }
        }
    }

    start () {
    }
}
