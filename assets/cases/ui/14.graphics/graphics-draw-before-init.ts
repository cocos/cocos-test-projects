import { _decorator, Component, Node, Graphics } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GraphicsDrawBeforeInit')
export class GraphicsDrawBeforeInit extends Component {
    start () {
        const node  = new Node('graphics');
        const g = node.addComponent(Graphics)!;

        g.clear();
        g.lineWidth = 10;
        g.fillColor.fromHEX('#ff0000');

        // rect
        g.rect(-250, 0, 200, 100);

        // round rect
        g.roundRect(50, 0, 200, 100, 20);

        g.stroke();
        g.fill();

        node.parent = this.node;

    }
}
