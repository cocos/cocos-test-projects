

import { _decorator, Component, sp, Size } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('SpineMeshEffect')
export default class extends Component {

    @property({type: sp.Skeleton})
    skeleton:sp.Skeleton|null = null;

    private _swirlTime = 0;
    private _maxEffect = 0;
    private _index = 0;
    private _bound?:Size;
    private _swirlEffect?:sp.VertexEffectDelegate;
    private _jitterEffect?:sp.VertexEffectDelegate;
    

    start () {
        this._swirlTime = 0;
        this._maxEffect = 2;
        this._index = 0;
        const skeletonNodeUIProps = this.skeleton!.node._uiProps.uiTransformComp!;
        this._bound = new Size(skeletonNodeUIProps.width, skeletonNodeUIProps.height);

        if (sp.SPINE_VERSION === '3.8') {
            this._swirlEffect = new sp.VertexEffectDelegate();
            this._swirlEffect.initSwirlWithPowOut(0, 2);
        }
    }

    switchEffect () {
        this._index++;
        if (this._index >= this._maxEffect) {
            this._index = 0;
        }

        switch (this._index) {
            case 0:
                this.skeleton!.setVertexEffectDelegate(null as any);
                break;
            case 1:
                this.skeleton!.setVertexEffectDelegate(this._swirlEffect!);
                break;
        }
    }
    update (dt:number) {
        if (this._index == 1) {
            this._swirlTime += dt;
            let percent = this._swirlTime % 2;
            if (percent > 1) percent = 1 - (percent -1 );

            let bound = this._bound!;
            if (this._swirlEffect) {
                let swirlEffect = this._swirlEffect!.getSwirlVertexEffect();
                swirlEffect.angle = 360 * percent;
                swirlEffect.centerX = bound.width * 0.5;
                swirlEffect.centerY = bound.height * 0.5;

                swirlEffect.radius = percent * Math.sqrt(bound.width * bound.width + bound.height * bound.height);
            }
        }    
    } 
}

