import { _decorator, Component, Node, Vec2, Graphics, Touch, EventTouch, Vec3, UITransform, math } from 'cc';
const { ccclass, property } = _decorator;

const temp_vec2 = new Vec2();

@ccclass('GraphicsContinuousFilling')
export class GraphicsContinuousFilling extends Component {

    pos = new Vec3();
    worldPos = new Vec3();
    graphics: Graphics = null!;

    minX = 0;
    minY = 0;
    maxX = 0;
    maxY = 0;

    start() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);

        this.graphics = this.getComponent(Graphics)!;
        const trans = this.getComponent(UITransform)!;
        const wPos = this.getComponent(UITransform)?.convertToWorldSpaceAR(new Vec3(), this.worldPos)!;
        this.minX = - trans.anchorX * trans.width + wPos.x;
        this.maxX = (1 - trans.anchorX) * trans.width + wPos.x;
        this.minY = - trans.anchorY * trans.height + wPos.y;
        this.maxY = (1 - trans.anchorY) * trans.height + wPos.y;

        this.graphics.lineWidth = 10;
    }

    onDestroy(){
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onTouchStart(touch: Touch, event: EventTouch) {
        touch.getUILocation(temp_vec2);
        let x = math.clamp(temp_vec2.x, this.minX, this.maxX);
        let y = math.clamp(temp_vec2.y, this.minY, this.maxY);
        this.pos.set(x - this.worldPos.x, y - this.worldPos.y, 0);
    }

    onTouchMove(touch: Touch, event: EventTouch) {
        this.graphics.moveTo(this.pos.x, this.pos.y);
        touch.getUILocation(temp_vec2);
        let x = math.clamp(temp_vec2.x, this.minX, this.maxX);
        let y = math.clamp(temp_vec2.y, this.minY, this.maxY);
        this.pos.set(x - this.worldPos.x, y - this.worldPos.y, 0);
        this.graphics.lineTo(this.pos.x, this.pos.y);
        this.graphics.stroke();

    }

    clear(){
        this.graphics.clear();
    }
}
