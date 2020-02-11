import { _decorator, Component, Node, LabelComponent, macro, ScrollViewComponent, EventHandler, Vec3, ScrollBarComponent} from "cc";
const { ccclass, property } = _decorator;

@ccclass("ScrollViewEvents")
export class ScrollViewEvents extends Component {
    @property(LabelComponent)
    eventLabel: LabelComponent = null;
    @property({
        type: ScrollBarComponent.Direction
    })
    direction = ScrollBarComponent.Direction.HORIZONTAL;

    start() {
        if (this.direction === ScrollBarComponent.Direction.VERTICAL) {
            this.node.on(ScrollViewComponent.EventType.SCROLL_TO_BOTTOM, this.eventScrollToBottom, this);
            this.node.on(ScrollViewComponent.EventType.SCROLL_TO_TOP, this.eventScrollToTop, this);
            this.node.on(ScrollViewComponent.EventType.BOUNCE_BOTTOM, this.bounceBottom, this);
            this.node.on(ScrollViewComponent.EventType.BOUNCE_TOP, this.bounceTop, this);
        } else {
            this.node.on(ScrollViewComponent.EventType.SCROLL_TO_LEFT, this.eventScrollToLeft, this);
            this.node.on(ScrollViewComponent.EventType.SCROLL_TO_RIGHT, this.eventScrollToRight, this);
            this.node.on(ScrollViewComponent.EventType.BOUNCE_LEFT, this.bounceLeft, this);
            this.node.on(ScrollViewComponent.EventType.BOUNCE_RIGHT, this.bounceRight, this);
        }
    }

    eventScrollToLeft(scroll: ScrollViewComponent){
        this.eventLabel.string = 'ScrollToLeft';
    }

    eventScrollToBottom(scroll: ScrollViewComponent) {
        this.eventLabel.string = 'ScrollToBottom';
    }

    eventScrollToRight(scroll: ScrollViewComponent) {
        this.eventLabel.string = 'ScrollToRight';
    }

    eventScrollToTop(scroll: ScrollViewComponent) {
        this.eventLabel.string = 'ScrollToTop';
    }

    bounceLeft(scroll: ScrollViewComponent) {
        this.eventLabel.string = 'BounceLeft';
    }

    bounceBottom(scroll: ScrollViewComponent) {
        this.eventLabel.string = 'BounceBottom';
    }

    bounceRight(scroll: ScrollViewComponent) {
        this.eventLabel.string = 'BounceRight';
    }

    bounceTop(scroll: ScrollViewComponent) {
        this.eventLabel.string = 'BounceTop';
    }


}
