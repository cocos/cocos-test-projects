import { _decorator, Component, Node, Sprite, Label } from "cc";
const { ccclass, property } = _decorator;

@ccclass("FillSprite")
export class FillSprite extends Component {
    @property({ type: Label })
    public hlabel: Label = null!;
    @property({ type: Sprite })
    public hhorizontal: Sprite = null!;

    @property({ type: Label })
    public vlabel: Label = null!;
    @property({ type: Sprite })
    public vhorizontal: Sprite = null!;

    @property({ type: Label })
    public mclabel: Label = null!;
    @property({ type: Sprite })
    public mc: Sprite = null!;

    @property({ type: Label })
    public lblabel: Label = null!;
    @property({ type: Sprite })
    public lb: Sprite = null!;

    @property({ type: Label })
    public rblabel: Label = null!;
    @property({ type: Sprite })
    public rb: Sprite = null!;

    private timer = 0;
    private lTimer = 0;
    private rTimer = 0.2;

    vh (num: number) {
        this.vhorizontal.getComponent(Sprite)!.fillRange = num;
        this.hhorizontal.getComponent(Sprite)!.fillRange = num;
        this.mc.getComponent(Sprite)!.fillRange = num;
    }

    update (deltaTime: number) {
        this.timer += 0.1*deltaTime;
        if (this.timer > 1) {
            this.timer = 0;
        }

        this.lTimer += 0.1 * deltaTime;
        if (this.lTimer > 0.3) {
            this.lTimer = 0;
        }

        this.rTimer += 0.1 * deltaTime;
        if (this.rTimer > 0.5) {
            this.rTimer = 0.2;
        }

        this.vh(this.timer);
        this.lb.getComponent(Sprite)!.fillRange = this.lTimer;
        this.rb.getComponent(Sprite)!.fillRange = this.rTimer;

        this.vlabel.getComponent(Label)!.string = '填充类型：垂直填充 ' + Math.floor(this.timer * 100) + '%';
        this.hlabel.getComponent(Label)!.string = '填充类型：水平填充 ' + Math.floor(this.timer * 100) + '%';
        this.mclabel.getComponent(Label)!.string = 'center(0.5, 0.5) rang ' + Math.floor(this.timer * 100) / 100;
        this.lblabel.getComponent(Label)!.string = 'center(0, 0) rang ' + Math.floor(this.lTimer * 100) / 100;
        this.rblabel.getComponent(Label)!.string = 'center(1, 0) rang ' + Math.floor(this.rTimer * 100) / 100;
    }
}
