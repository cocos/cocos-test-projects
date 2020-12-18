import { _decorator, Component, Node, Label, ScrollView, ScrollBar} from "cc";
const { ccclass, property } = _decorator;

@ccclass("ScrollViewEvents")
export class ScrollViewEvents extends Component {
    @property(Label)
    public eventLabel: Label = null!;
    @property({
        type: ScrollBar.Direction
    })
    direction = ScrollBar.Direction.HORIZONTAL;

    start() {
        if (this.direction === ScrollBar.Direction.VERTICAL) {
            this.node.on(ScrollView.EventType.SCROLL_TO_BOTTOM, this.eventScrollToBottom, this);
            this.node.on(ScrollView.EventType.SCROLL_TO_TOP, this.eventScrollToTop, this);
            this.node.on(ScrollView.EventType.BOUNCE_BOTTOM, this.bounceBottom, this);
            this.node.on(ScrollView.EventType.BOUNCE_TOP, this.bounceTop, this);
        } else {
            this.node.on(ScrollView.EventType.SCROLL_TO_LEFT, this.eventScrollToLeft, this);
            this.node.on(ScrollView.EventType.SCROLL_TO_RIGHT, this.eventScrollToRight, this);
            this.node.on(ScrollView.EventType.BOUNCE_LEFT, this.bounceLeft, this);
            this.node.on(ScrollView.EventType.BOUNCE_RIGHT, this.bounceRight, this);
        }
    }

    eventScrollToLeft(scroll: ScrollView){
        this.eventLabel.string = 'ScrollToLeft';
    }

    eventScrollToBottom(scroll: ScrollView) {
        this.eventLabel.string = 'ScrollToBottom';
    }

    eventScrollToRight(scroll: ScrollView) {
        this.eventLabel.string = 'ScrollToRight';
    }

    eventScrollToTop(scroll: ScrollView) {
        this.eventLabel.string = 'ScrollToTop';
    }

    bounceLeft(scroll: ScrollView) {
        this.eventLabel.string = 'BounceLeft';
    }

    bounceBottom(scroll: ScrollView) {
        this.eventLabel.string = 'BounceBottom';
    }

    bounceRight(scroll: ScrollView) {
        this.eventLabel.string = 'BounceRight';
    }

    bounceTop(scroll: ScrollView) {
        this.eventLabel.string = 'BounceTop';
    }
}
