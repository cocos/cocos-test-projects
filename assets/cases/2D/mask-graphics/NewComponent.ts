import { _decorator, Component, EventTouch, Graphics, Node, NodeEventType, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends Component {
    @property(Graphics)
    maskGraphics!: Graphics;
    onLoad() {
        this.node.on(NodeEventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(NodeEventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(NodeEventType.TOUCH_END, this.onTouchEnd, this);
        this.scheduleOnce(()=>{
            this.maskGraphics.lineWidth = 100;
            this.maskGraphics.lineJoin = Graphics.LineJoin.ROUND;
            this.maskGraphics.lineCap = Graphics.LineCap.ROUND;
            this.maskGraphics.miterLimit = 100;
        },0)
            
    }

    onTouchStart(event: EventTouch) {



        let target = event.getUILocation();
        //   this.getColor(target.x, target.y);
        let pos = this.node.getComponent(UITransform)!.convertToNodeSpaceAR(new Vec3(target.x, target.y, 0));
        this.maskGraphics.moveTo(pos.x, pos.y);
    }
    onTouchMove(event: EventTouch) {
        let target = event.getUILocation();
        let pos = this.node.getComponent(UITransform)!.convertToNodeSpaceAR(new Vec3(target.x, target.y, 0));
        this.maskGraphics.lineTo(pos.x, pos.y);
        this.maskGraphics.stroke();
        this.maskGraphics.moveTo(pos.x, pos.y);
    }
    onTouchEnd(event: EventTouch) {

    }
}

