import { _decorator, Component, Node, GraphicsComponent } from 'cc';
const { ccclass, property } = _decorator;

const LineCap = GraphicsComponent.LineCap;
const LineJoin = GraphicsComponent.LineJoin;

@ccclass('GraphicsLineJoin')
export class GraphicsLineJoin extends Component {
    graphics: GraphicsComponent = null;
    time = 0;
    radius = 100;

    start () {
        // Your initialization goes here.
        this.graphics = this.getComponent(GraphicsComponent);
        this.graphics.lineWidth = 20;

        this.draw();
    }

    draw () {
        let graphics = this.graphics;
        graphics.clear();

        let rx = this.radius * Math.sin(this.time);
        let ry = -this.radius * Math.cos(this.time);

        // line join
        graphics.lineCap = LineCap.BUTT;

        graphics.lineJoin = LineJoin.BEVEL;
        this.drawLine(-200, 0, rx, ry);

        graphics.lineJoin = LineJoin.MITER;
        this.drawLine(0, 0, rx, ry);

        graphics.lineJoin = LineJoin.ROUND;
        this.drawLine(200, 0, rx, ry);

        // line cap
        graphics.lineJoin = LineJoin.MITER;

        graphics.lineCap = LineCap.BUTT;
        this.drawLine(0, -125, rx, ry);

        graphics.lineCap = LineCap.SQUARE;
        this.drawLine(-200, -125, rx, ry);

        graphics.lineCap = LineCap.ROUND;
        this.drawLine(200, -125, rx, ry);
    }

    drawLine (x: number, y: number, rx: number, ry: number) {
        let graphics = this.graphics;

        graphics.moveTo(x + rx, y + ry);
        graphics.lineTo(x, y);
        graphics.lineTo(x - rx, y + ry);
        graphics.stroke();
    }

    update (dt) {
        this.time += dt * 0.5;
        this.draw();
    }
}
