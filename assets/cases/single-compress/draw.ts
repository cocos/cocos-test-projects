import { _decorator, Component, Node, GraphicsComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Draw')
export class Draw extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start () {
        // Your initialization goes here.
        this.drawRect();
    }

    drawRect(){
        const g = this.getComponent(GraphicsComponent);

        g.clear();
        // round rect
        // g.strokeColor.fromHEX('#CF8A49');
        g.roundRect(-460, 25, 920, 240, 2);
        g.stroke();

        g.strokeColor.fromHEX('#49A858');
        g.roundRect(10, -240, 240, 240, 2);

        g.stroke();
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
