import { _decorator, Component, Node, MaskComponent } from "cc";
const { ccclass, property, menu, executeInEditMode } = _decorator;

@ccclass("GraphicsMask")
@menu('UI/GraphicsMask')
@executeInEditMode
export class GraphicsMask extends Component {

    start(){
        this.drawArc();
    }

    drawArc(){
        const mask = this.getComponent(MaskComponent);
        const g = mask.graphics;

        g.clear();
        g.lineWidth = 10;
        g.fillColor.fromHEX('#ff0000');

        g.moveTo(-80, 0);
        g.lineTo(0, -150);
        g.lineTo(80, 0);
        g.lineTo(0, 150);
        g.close();

        g.stroke();
        g.fill();
    }
}
