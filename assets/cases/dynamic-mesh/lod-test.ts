
/*
 Copyright (c) 2022 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */


import { _decorator, Component, Vec3, CameraComponent, LODGroup, Label, instantiate, director, Prefab, v3, Toggle, Button, NodeEventType, Vec2, EventTouch, UITransform, PipelineSceneData, MeshRenderer, Mesh, Director, PipelineEventType, Slider, gfx } from 'cc';
const { ccclass, property } = _decorator;

const MAX_COUNT_TO_ADD = 16;
const RECALCULATE_RENDER_TIME_DURATION = 500;

@ccclass('LodTest')
export class LodTest extends Component {
    @property(Button)
    cameraButton: Button = null!;
    @property(CameraComponent)
    cameraComp: CameraComponent = null!;
    @property(Label)
    frameRateLabel: Label = null!;
    @property(Label)
    triangleCountLabel: Label = null!;
    @property(Label)
    enableLodLabel: Label = null!;
    @property(Label)
    renderTimeLabel: Label = null!;
    @property(Prefab)
    prefab: Prefab = null!;
    @property(Slider)
    distanceSlider: Slider = null!;
    
    private _lodGroups: LODGroup[] = [];
    private _enableMove: boolean = false;
    private _moveBtnStartPos: Vec2 = null!;
    private _cameraBtnPos: Vec3 = null!;
    private _moveBtnSize: number = 0;
    private _cameraPos: Vec3 = null!;
    private _lastFrameRate: number = 0;
    private _lastTriangleCount: number = 0;
    private _lastRenderTime: number = 0;
    private _lastUpdateTime: number = 0;
    private _sceneData: PipelineSceneData | null = null;
    private _device: gfx.Device = null!;

    public onAddButton () {
        let column = 14;
        for (; column > 0; column--) {   
            for (let i = 0; i < MAX_COUNT_TO_ADD; i++) {
                const node = instantiate(this.prefab);
                let pos = v3(( i - MAX_COUNT_TO_ADD / 2) * 5, 0, 10 - column*6);
                node.setPosition(pos);
                const lodGroup = node.getComponent(LODGroup);
                node.parent = director.getScene();
                if (lodGroup) {
                   this._lodGroups.push(lodGroup);
                }
            }
        }
    }

    public onToggleChanged(toggle: Toggle) {
        let level = toggle.isChecked ? -1 : 0;
        // if (toggle.isChecked) {
        //     this.enableLodLabel.string = "Disable LOD";
        // } else {
        //     this.enableLodLabel.string = "Enable LOD";
        // }
        let enabled = toggle.isChecked;
        this._lodGroups.forEach(lodGroup => {
           // lodGroup.forceLOD(level);
           lodGroup.enabled = enabled;
           for (let i = 1; i < lodGroup.lodCount; i++) {
                for (let k = 0; k < lodGroup.LODs[i].rendererCount; k++) {
                    let mr = lodGroup.LODs[i].getRenderer(k)
                    if (mr) {
                        mr.enabled = enabled;
                    }
                }
            };
        });
    }

    public onSliderChange(slider: Slider) {
        this.cameraComp.node.setPosition(this._cameraPos.x, this._cameraPos.y, 2 - slider.progress);
    }

    start() {
        this._device = gfx.deviceManager.gfxDevice;
        this._cameraPos = this.cameraComp.node.getPosition();
        this.cameraButton.node.on(NodeEventType.TOUCH_START, this._onTouchStart, this);
        this.cameraButton.node.on(NodeEventType.TOUCH_MOVE, this._onTouchMove, this);
        this.cameraButton.node.on(NodeEventType.TOUCH_END, this._onTouchEnd, this);
        this.cameraButton.node.on(NodeEventType.TOUCH_CANCEL, this._onTouchEnd, this);
        this._moveBtnSize = this.cameraButton.node.getComponent(UITransform)?.contentSize.width || 0;
        // this._sceneData = director.getScene()?.renderScene?.root.pipeline.pipelineSceneData || null;
        // director.getScene()?.renderScene?.root.pipelineEvent.on(PipelineEventType.RENDER_CAMERA_END, this._afterCulling, this);
        // director.on(Director.EVENT_BEFORE_DRAW, this._beforeDraw, this);
        // director.on(Director.EVENT_AFTER_DRAW, this._afterDraw, this);

         this.onAddButton();
    }

    onDestroy () {
        //
    }

    update (deltaTime: number) {
        const frameRate = director.getScene()?.renderScene?.root.fps || 0;
        if (this._lastFrameRate !== frameRate) {
            this._lastFrameRate = frameRate;
            this.frameRateLabel.string = "" + frameRate;
        }
        if (this._lastTriangleCount != this._device.numTris) {
            this._lastTriangleCount = this._device.numTris;
            this.triangleCountLabel.string = "" + this._lastTriangleCount;
        }
    }

    // private _beforeDraw() {
    //     this._lastRenderTime = performance.now();
    // }

    // private _afterDraw() {
    //     const now = performance.now();
    //     if (now - this._lastUpdateTime < RECALCULATE_RENDER_TIME_DURATION) return;
    //     this._lastUpdateTime = now;
    //     const elapseTime = now - this._lastRenderTime;
    //     this.renderTimeLabel.string = elapseTime.toFixed(3);
    // }

    private _afterCulling(target: any) {
        if (target !== this.cameraComp.camera) return;
        let count = 0;
        if (this._sceneData) {
            this._sceneData.renderObjects.forEach((renderObject, index) => {
                const meshRender = renderObject.model.node?.getComponent(MeshRenderer);
                const primitives = meshRender?.mesh?.struct.primitives;
                primitives?.forEach((subMesh: Mesh.ISubMesh) => {
                    if (subMesh && subMesh.indexView) {
                        count += subMesh.indexView.count;
                    }
                });
            })
        }
        count /= 3;
        if (this._lastTriangleCount !== count) {
            this._lastTriangleCount = count;
            this.triangleCountLabel.string = "" + count;
        }
    }

    private _onTouchStart(event: EventTouch) {
        this._enableMove = true;
        this._moveBtnStartPos = event.getLocation();
        this._cameraBtnPos = this.cameraButton.node.position.clone();
    }

    private _onTouchEnd(event: EventTouch) {
        this._enableMove = false;
        this.cameraButton.node.setPosition(this._cameraBtnPos.x, this._cameraBtnPos.y);
    }

    private _onTouchMove(event: EventTouch) {
        if (!this._enableMove) return;
        const touch = event.getLocation();
        let diffX = touch.x - this._moveBtnStartPos.x;
        let diffY = touch.y - this._moveBtnStartPos.y;
        if (diffX > 0 && diffX > this._moveBtnSize) {
            diffX = this._moveBtnSize;
        } else if (diffX < 0 && diffX < -this._moveBtnSize) {
            diffX = -this._moveBtnSize;
        }

        if (diffY > 0 && diffY > this._moveBtnSize) {
            diffY = this._moveBtnSize;
        } else if (diffY < 0 && diffY < -this._moveBtnSize) {
            diffY = -this._moveBtnSize;
        }
        // const z = Math.abs(diffX + diffY) / 100;
        this.cameraButton.node.setPosition(this._cameraBtnPos.x + diffX, this._cameraBtnPos.y + diffY);
        this.cameraComp.node.setPosition(this._cameraPos.x + diffX * 0.8, this._cameraPos.y, 2 + diffY*2.1);
    }

}
