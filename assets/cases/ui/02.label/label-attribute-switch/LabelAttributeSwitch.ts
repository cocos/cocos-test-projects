import { _decorator, Component, Node, Label, UITransform, Size, Color, math, HorizontalTextAlignment, Font, Overflow, CacheMode } from 'cc';
const { ccclass, property } = _decorator;

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

@ccclass('LabelAttributeSwitch')
export class LabelAttributeSwitch extends Component {

    private label: Label = null!;
    private stateLabel: Label = null!;
    private transform: UITransform = null!;

    private oriSize: Size = new Size(200, 200);
    private oriColor: Color = new Color(255, 255, 255, 255);
    private oriFontSize: number = 0;
    private oriFont: Font = null!;

    @property({ type: Font })
    public font: Font = null!;


    start() {
        this.label = this.node.getChildByName('Label')?.getComponent<Label>(Label)!;
        this.stateLabel = this.node.getChildByName('state')?.getComponent<Label>(Label)!;
        this.transform = this.label.getComponent<UITransform>(UITransform)!;

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
        this.transform.contentSize = new Size(this.oriSize.x * randX, this.oriSize.y * randY);
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

    public reset() {
        this.label.node.active = true;
        this.label.enabled = true;
        this.transform.contentSize = this.oriSize;
        this.label.color = this.oriColor;
        this.label.string = 'label';
        this.label.font = this.oriFont;
        this.label.fontSize = this.oriFontSize;
        this.label.overflow = Overflow.SHRINK;
        this.label.cacheMode = CacheMode.NONE;

        this.updateState();
    }

    public updateState() {
        const state = `active = ${this.label.node.active}
enabled = ${this.label.enabled}
contentSize = ${this.transform.contentSize}
color = ${this.label.color}
string = ${this.label.string}
font = ${this.label.font?.name}
useSystemFont = ${this.label.useSystemFont}
fontSize = ${this.label.fontSize}
overflow = ${this.label.overflow.toString()}
cacheMode = ${this.label.cacheMode.toString()}
`;
        this.stateLabel.string = state;
    }
}


