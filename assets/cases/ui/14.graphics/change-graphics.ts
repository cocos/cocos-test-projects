import { _decorator, Component, GraphicsComponent } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("ChangeGraphics")
@menu('UI/ChangeGraphics')
export class ChangeGraphics extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start () {
        // Your initialization goes here.
    }

    drawRect(){
        const g = this.getComponent(GraphicsComponent);

        g.clear();
        g.lineWidth = 10;
        g.fillColor.fromHEX('#ff0000');

        // rect
        g.rect(-250, 0, 200, 100);

        // round rect
        g.roundRect(50, 0, 200, 100, 20);

        g.stroke();
        g.fill();
    }

    drawArc(){
        const g = this.getComponent(GraphicsComponent);

        g.clear();
        g.lineWidth = 5;
        g.fillColor.fromHEX('#ff0000');

        g.arc(0, 0, 100, Math.PI / 2, Math.PI, false);
        g.lineTo(0, 0);
        g.close();

        g.stroke();
        g.fill();

        g.fillColor.fromHEX('#00ff00');

        g.arc(-10, 10, 100, Math.PI / 2, Math.PI, true);
        g.lineTo(-10, 10);
        g.close();

        g.stroke();
        g.fill();
    }

    drawLineTo(){
        const g = this.getComponent(GraphicsComponent);

        g.clear();
        g.lineWidth = 10;
        g.fillColor.fromHEX('#ff0000');

        g.moveTo(-20, 0);
        g.lineTo(0, -100);
        g.lineTo(20, 0);
        g.lineTo(0, 100);
        g.close();

        g.stroke();
        g.fill();
    }

    drawEllipse(){
        const g = this.getComponent(GraphicsComponent);

        g.clear();
        g.lineWidth = 10;
        g.fillColor.fromHEX('#ff0000');

        g.circle(150, 0, 100);

        g.ellipse(-150, 0, 100, 70);

        g.stroke();
        g.fill();
    }
}
