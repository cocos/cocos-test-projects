import { _decorator, Component, Label, Node, profiler } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('drawCallInfo')
export class drawCallInfo extends Component {

    @property(Label)
    ldrawCall: Label = null!;

    private _recoveryProfiler = false;

    public onLoad(){
        this._recoveryProfiler = profiler.isShowingStats();
    }

    public onEnable(){
        if(!this._recoveryProfiler){
            profiler.showStats();
        }
    }

    public onDisable(){
        if(!this._recoveryProfiler){
            profiler.hideStats();
        }
    }

    update(deltaTime: number) {
        if (this.ldrawCall) {
            this.ldrawCall.string = `DrawCall: ${profiler.stats?.draws.counter.value}`;
        }
    }
}