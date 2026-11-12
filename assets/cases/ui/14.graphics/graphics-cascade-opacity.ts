import { _decorator, Button, Color, Component, Graphics, Label, Node, Sprite, SpriteFrame, UIOpacity, UITransform } from 'cc';

const { ccclass, property } = _decorator;
const paintWidth = 128;
const fillHeight = 60;
const lineWidth = 20;
const lineAlpha = 128;

@ccclass('GraphicsCascadeOpacity')
export class GraphicsCascadeOpacity extends Component {
    @property(SpriteFrame)
    whiteFrame!: SpriteFrame;

    private board!: Node;
    private parentOpacity!: UIOpacity;
    private referenceFill!: Sprite;
    private referenceStroke!: Sprite;
    private status!: Label;
    private elapsed = 0;
    private playing = false;
    private value = -1;

    start () {
        this.board = this.child(this.node, 'Comparison', 0, 0);
        this.rectangle(this.board, 'Background', 0, 0, 680, 400, new Color(24, 24, 24, 255));
        this.text(this.board, 'Title', 'Graphics 父节点透明度', 0, 163, 28);
        this.text(this.board, 'Instructions', '比较两列的矩形内部和横线中段，同一行应一样亮', 0, 125, 19);
        this.text(this.board, 'ExpectedTitle', '预期值 · Sprite', -144, 80, 22);
        this.text(this.board, 'ActualTitle', '实际值 · Graphics', 144, 80, 22);

        // The references are outside the tested subtree and use only their own color alpha.
        this.referenceFill = this.rectangle(this.board, 'ExpectedFill', -144, 24, paintWidth, fillHeight, Color.WHITE);
        this.referenceStroke = this.rectangle(this.board, 'ExpectedStroke', -144, -50, paintWidth, lineWidth, Color.WHITE);

        const group = this.child(this.board, 'FadingParent', 144, 0);
        this.parentOpacity = group.addComponent(UIOpacity);
        const art = this.child(group, 'RetainedGraphics', 0, 0).addComponent(Graphics);
        art.fillColor = new Color(255, 255, 255, 255);
        art.rect(-paintWidth / 2, 24 - fillHeight / 2, paintWidth, fillHeight);
        art.fill();
        art.strokeColor = new Color(255, 255, 255, lineAlpha);
        art.lineWidth = lineWidth;
        art.moveTo(-paintWidth / 2, -50);
        art.lineTo(paintWidth / 2, -50);
        art.stroke();

        this.status = this.text(this.board, 'Status', '', 0, -102, 19);
        this.button('Opaque', '255', -225, () => this.setOpacity(255));
        this.button('Half', '128', -75, () => this.setOpacity(128));
        this.button('Hidden', '0', 75, () => this.setOpacity(0));
        this.button('Animate', '循环淡出 / 入', 225, () => { this.elapsed = 0; this.playing = true; });
        this.setOpacity(128);
        this.resize();
        this.node.on(Node.EventType.SIZE_CHANGED, this.resize, this);
    }

    onDestroy () {
        this.node.off(Node.EventType.SIZE_CHANGED, this.resize, this);
    }

    update (dt: number) {
        if (!this.playing) return;
        this.elapsed = (this.elapsed + dt) % 4;
        this.applyOpacity(Math.round(255 * Math.abs(1 - this.elapsed / 2)));
    }

    public setOpacity (value: number) {
        this.playing = false;
        this.applyOpacity(value);
    }

    private applyOpacity (value: number) {
        if (this.value === value) return;
        this.value = value;
        this.parentOpacity.opacity = value;
        const stroke = Math.round(lineAlpha * value / 255);
        this.referenceFill.color = new Color(255, 255, 255, value);
        this.referenceStroke.color = new Color(255, 255, 255, stroke);
        this.status.string = `父透明度 ${value} / 255    填充预期 ${value}    描边预期 ${stroke}`;
    }

    private resize () {
        const area = this.node.getComponent(UITransform)!;
        const scale = Math.min(1, area.width / 700, area.height / 420);
        this.board.setScale(scale, scale, 1);
    }

    private child (parent: Node, name: string, x: number, y: number): Node {
        const node = new Node(name);
        node.layer = parent.layer;
        parent.addChild(node);
        node.setPosition(x, y, 0);
        return node;
    }

    private rectangle (parent: Node, name: string, x: number, y: number, width: number, height: number, color: Readonly<Color>): Sprite {
        const node = this.child(parent, name, x, y);
        const sprite = node.addComponent(Sprite);
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;
        sprite.spriteFrame = this.whiteFrame;
        sprite.color = new Color(color.r, color.g, color.b, color.a);
        node.getComponent(UITransform)!.setContentSize(width, height);
        return sprite;
    }

    private text (parent: Node, name: string, message: string, x: number, y: number, size: number): Label {
        const label = this.child(parent, name, x, y).addComponent(Label);
        label.fontSize = size;
        label.lineHeight = size + 4;
        label.string = message;
        return label;
    }

    private button (name: string, title: string, x: number, click: () => void) {
        const sprite = this.rectangle(this.board, name, x, -155, 136, 46, new Color(65, 74, 86, 255));
        const node = sprite.node;
        node.addComponent(Button);
        this.text(node, 'Caption', title, 0, 0, 19);
        node.on(Button.EventType.CLICK, click, this);
    }
}
