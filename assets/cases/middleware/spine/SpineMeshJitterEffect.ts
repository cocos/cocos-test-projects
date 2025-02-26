import { _decorator, Component, sp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpineMeshJitterEffect')
export class SpineMeshJitterEffect extends Component {
    @property({type: sp.Skeleton})
    skeleton:sp.Skeleton|null = null;

    private _maxEffect = 0;
    private _index = 0;
    private _jitterEffect?:sp.VertexEffectDelegate;
    

    start () {
        this._maxEffect = 2;
        this._index = 0;

        if (sp.SPINE_VERSION === '3.8') {
            this._jitterEffect = new sp.VertexEffectDelegate();
            this._jitterEffect.initJitter(20, 20);
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
                this.skeleton!.setVertexEffectDelegate(this._jitterEffect!);
                break;
        }
    }
    update (dt:number) {
        // 
    } 
}

