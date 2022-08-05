import { _decorator, Component, Node, Label, UITransform, Size, Color, math, HorizontalTextAlignment, Font, Overflow, CacheMode, LabelOutline, LabelShadow, color, Vec2, LabelComponent } from 'cc';
const { ccclass, property } = _decorator;

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

@ccclass('LabelAttributeSwitch')
export class LabelAttributeSwitch extends Component {

    private label: Label = null!;
    private stateLabel: Label = null!;
    private transform: UITransform = null!;
    private outline: LabelOutline = null!;
    private shadow: LabelShadow = null!;

    private oriSize: Size = new Size(200, 200);
    private oriColor: Color = new Color(255, 255, 255, 255);
    private oriFontSize: number = 0;
    private oriFont: Font = null!;
    private oriOutlineColor = new Color(0, 0, 0, 255);
    private oriOutlineWidth = 3;
    private oriShadowColor = new Color(0, 0, 0, 255);
    private oriShadowOffset = new Vec2(3, 3);
    private oriShadowBlur = 3;

    @property({ type: Font })
    public font: Font = null!;


    start() {
        this.label = this.node.getChildByName('Label')?.getComponent<Label>(Label)!;
        this.stateLabel = this.node.getChildByName('state')?.getComponent<Label>(Label)!;
        this.transform = this.label.getComponent<UITransform>(UITransform)!;
        this.outline = this.label.getComponent<LabelOutline>(LabelOutline)!;
        this.shadow = this.label.getComponent<LabelShadow>(LabelShadow)!;

        this.oriFontSize = this.label.fontSize;
        this.oriFont = this.label.font!;

        this.updateState();
    }

    update(deltaTime: number) {

    }

    public switchActive() {
        this.label.node.active = !this.label.node.active;
        this.updateState();
    }

    public switchEnabled() {
        this.label.enabled = !this.label.enabled;
        this.updateState();
    }

    public switchContentSize() {
        const randX = math.random();
        const randY = math.random();
        this.transform.contentSize = new Size(this.oriSize.x * 2 * randX, this.oriSize.y * 2 * randY);
        this.updateState();
    }

    public switchAnchorX() {
        const randX = math.random();
        this.transform.anchorX = randX;
        this.updateState();
    }

    public switchAnchorY() {
        const randY = math.random();
        this.transform.anchorY = randY;
        this.updateState();
    }

    public switchColor() {
        const randR = math.random();
        const randG = math.random();
        const randB = math.random();
        const randA = math.random();
        this.label.color = new Color(this.oriColor.r * randR, this.oriColor.g * randG, this.oriColor.b * randB, this.oriColor.a * randA);
        this.updateState();
    }


    public switchString() {
        let result = '';
        const length = characters.length * math.random();
        for (let i = 0; i < length; i++) {
            result += characters[Math.round(characters.length * math.random())];
        }
        this.label.string = result;
        this.updateState();
    }

    public switchHorizontalAlign() {
        this.label.horizontalAlign = (++this.label.horizontalAlign) % 3;
        this.updateState();
    }

    public switchVerticalAlign() {
        this.label.verticalAlign = (++this.label.verticalAlign) % 3;
        this.updateState();
    }

    public switchFont() {
        const useOri = this.label.font === this.oriFont;
        this.label.font = useOri ? this.font : this.oriFont;
        this.updateState();
    }

    public switchUseSystemFont() {
        this.label.useSystemFont = !this.label.useSystemFont;
        if (!this.label.useSystemFont) {
            this.label.font = this.oriFont;
        }
        this.updateState();
    }

    public switchFontSize() {
        this.label.fontSize = Math.round(this.oriFontSize * 2 * math.random());
        this.updateState();
    }

    public switchOverflow() {
        this.label.overflow = (++this.label.overflow) % 4;
        this.updateState();
    }

    public switchCacheMode() {
        this.label.cacheMode = (++this.label.cacheMode) % 3;
        this.updateState();
    }


    public switchOutline() {
        this.outline.enabled = !this.outline.enabled;
        this.updateState();
    }

    public switchOutlineColor() {
        const randR = math.random();
        const randG = math.random();
        const randB = math.random();
        const randA = math.random();
        this.outline.color = new Color(255 * randR, 255 * randG, 255 * randB, 255 * randA);
        this.updateState();
    }
    public switchOutlineWidth() {
        this.outline.width = this.oriOutlineWidth * 2 * math.random();
        this.updateState();
    }

    public switchShadow() {
        this.shadow.enabled = !this.shadow.enabled;
        this.updateState();
    }

    public switchShadowColor() {
        const randR = math.random();
        const randG = math.random();
        const randB = math.random();
        const randA = math.random();
        this.shadow.color = new Color(255 * randR, 255 * randG, 255 * randB, 255 * randA);
        this.updateState();
    }

    public switchShadowOffset() {
        const randX = math.random();
        const randY = math.random();
        this.shadow.offset = new Vec2(this.oriShadowOffset.x * 2 * randX, this.oriShadowOffset.y * 2 * randY);
        this.updateState();
    }

    public switchShadowBlur() {
        this.shadow.blur = this.oriShadowBlur * 2 * math.random();
        this.updateState();
    }


    public reset() {
        this.label.node.active = true;
        this.label.enabled = true;
        this.transform.contentSize = this.oriSize;
        this.transform.anchorX = 0.5;
        this.transform.anchorY = 0.5;
        this.label.color = this.oriColor;
        this.label.string = 'label';
        this.label.font = this.oriFont;
        this.label.fontSize = this.oriFontSize;
        this.label.overflow = Overflow.SHRINK;
        this.label.cacheMode = CacheMode.NONE;
        this.outline.enabled = true;
        this.outline.color = this.oriOutlineColor;
        this.outline.width = this.oriOutlineWidth;
        this.shadow.enabled = true;
        this.shadow.color = this.oriShadowColor;
        this.shadow.offset = this.oriShadowOffset;
        this.shadow.blur = this.oriShadowBlur;

        this.updateState();
    }

    public updateState() {
        const state = `active = ${this.label.node.active}
enabled = ${this.label.enabled}
contentSize = ${this.transform.contentSize}
anchor = ${this.transform.anchorPoint}
color = ${this.label.color}
string = ${this.label.string}
font = ${this.label.font?.name}
useSystemFont = ${this.label.useSystemFont}
fontSize = ${this.label.fontSize}
overflow = ${this.label.overflow.toString()}
cacheMode = ${this.label.cacheMode.toString()}
outline.enabled = ${this.outline.enabled}
outline.color = ${this.outline.color}
outline.width = ${this.outline.width}
shadow.enabled = ${this.shadow.enabled}
shadow.color = ${this.shadow.color}
shadow.offset = ${this.shadow.offset}
shadow.blur = ${this.shadow.blur}
`;
        this.stateLabel.string = state;
    }
}


