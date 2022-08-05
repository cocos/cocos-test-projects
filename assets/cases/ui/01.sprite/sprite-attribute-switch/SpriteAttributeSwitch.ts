import { _decorator, Component, Node, Sprite, UITransform, Size, math, size, Color, SpriteFrame, SpriteAtlas, Label, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

const spriteTypeList = ['SIMPLE', 'SLICED', 'TILED', 'FILLED'];
const fillTypeList = ['HORIZONTAL', 'VERTICAL', 'RADIAL'];

@ccclass('SpriteAttributeSwitch')
export class SpriteAttributeSwitch extends Component {

    private sprite: Sprite = null!;
    private stateLabel: Label = null!;
    private transform: UITransform = null!;

    private oriSize: Size = new Size(200, 200);
    private oriColor: Color = new Color(255, 255, 255, 255);
    private oriFrame: SpriteFrame = null!;
    private curSpriteTypeIndex = 0;
    private curFillTypeIndex = 0;

    @property({ type: SpriteFrame })
    public frame: SpriteFrame = null!;

    start() {
        this.sprite = this.node.getChildByName('Sprite')?.getComponent<Sprite>(Sprite)!;
        this.stateLabel = this.node.getChildByName('state')?.getComponent<Label>(Label)!;
        this.transform = this.sprite.getComponent<UITransform>(UITransform)!;

        this.oriFrame = this.sprite.spriteFrame!;
        this.sprite.type = this.curSpriteTypeIndex;
        this.sprite.fillType = this.curFillTypeIndex;
        this.sprite.fillCenter = new Vec2(0.5, 0.5);

        this.updateState();
    }

    update(deltaTime: number) {

    }

    public switchActive() {
        this.sprite.node.active = !this.sprite.node.active;
        this.updateState();
    }

    public switchEnabled() {
        this.sprite.enabled = !this.sprite.enabled;
        this.updateState();
    }

    public switchContentSize() {
        const randX = math.random();
        const randY = math.random();
        this.transform.contentSize = new Size(this.oriSize.x * randX, this.oriSize.y * randY);
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
        this.sprite.color = new Color(this.oriColor.r * randR, this.oriColor.g * randG, this.oriColor.b * randB, this.oriColor.a * randA);
        this.updateState();
    }

    public switchSpriteFrame() {
        const isOriFrame = this.sprite.spriteFrame === this.oriFrame;
        this.sprite.spriteFrame = isOriFrame ? this.frame : this.oriFrame;
        this.updateState();
    }

    public switchSpriteType() {
        this.curSpriteTypeIndex = (++this.curSpriteTypeIndex) % spriteTypeList.length;
        this.sprite.type = this.curSpriteTypeIndex;
        this.updateState();
    }

    public switchFillType() {
        this.curFillTypeIndex = (++this.curFillTypeIndex) % fillTypeList.length;
        this.sprite.fillType = this.curFillTypeIndex;
        this.sprite.fillRange = math.random();
        this.updateState();
    }

    public reset() {
        this.sprite.node.active = true;
        this.sprite.enabled = true;
        this.transform.contentSize = this.oriSize;
        this.transform.anchorX = 0.5;
        this.transform.anchorY = 0.5;
        this.sprite.color = this.oriColor;
        this.sprite.spriteFrame = this.oriFrame;
        this.sprite.type = 0;
        this.curSpriteTypeIndex = 0;
        this.sprite.fillType = 0;
        this.curFillTypeIndex = 0;
        this.updateState();
    }

    public updateState() {
        const state = `active = ${this.sprite.node.active}
enabled = ${this.sprite.enabled}
contentSize = ${this.transform.contentSize}
anchor = ${this.transform.anchorPoint}
color = ${this.sprite.color}
spriteFrame = ${this.sprite.spriteFrame!.name}
spriteType = ${spriteTypeList[this.curSpriteTypeIndex]}
fillType = ${fillTypeList[this.curFillTypeIndex]}`;
        this.stateLabel.string = state;
    }
}


