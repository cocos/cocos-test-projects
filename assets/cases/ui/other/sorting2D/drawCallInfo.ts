import { _decorator, Component, Label, Node, profiler } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('drawCallInfo')
export class drawCallInfo extends Component {

    @property(Label)
    ldrawCall: Label = null!;

    onLoad () {
        profiler.showStats();
    }

    update(deltaTime: number) {
        if (this.ldrawCall) {
            this.ldrawCall.string = `DrawCall: ${profiler.stats?.draws.counter.value}`;
        }
    }
}


