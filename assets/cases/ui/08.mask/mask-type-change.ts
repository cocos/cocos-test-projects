import { _decorator, Component, Node, SpriteFrame, Mask, Label } from 'cc';
const { ccclass, type } = _decorator;

@ccclass('mask_type_change')
export class mask_type_change extends Component {
    @type(Mask)
    public maskParent: Mask = null!;

    @type(SpriteFrame)
    public image: SpriteFrame = null!;

    @type(Label)
    public label: Label = null!;

    start() {
        const mask = this.getComponent(Mask)!;
        const maskParent = this.maskParent;
        this.scheduleOnce(() => {
            mask.type = Mask.Type.ELLIPSE;
            this.scheduleOnce(() => {
                mask.inverted = true;
                maskParent.enabled = true;
                this.scheduleOnce(() => {
                    mask.segments = 3;
                    mask.inverted = false;
                    this.scheduleOnce(() => {
                        maskParent.enabled = false;
                        mask.type = Mask.Type.RECT;
                        mask.inverted = true;
                        this.scheduleOnce(() => {
                            mask.enabled = false;
                            this.scheduleOnce(() => {
                                maskParent.enabled = false;
                                mask.type = Mask.Type.GRAPHICS_STENCIL;
                                const g = mask.graphics!;
                                g.clear();
                                g.lineWidth = 10;
                                g.fillColor.fromHEX('#ff0000');

                                g.moveTo(-40, 0);
                                g.lineTo(0, -75);
                                g.lineTo(40, 0);
                                g.lineTo(0, 75);
                                g.close();

                                g.stroke();
                                g.fill();
                                mask.enabled = true;
                                this.scheduleOnce(() => {
                                    maskParent.enabled = true;
                                    mask.inverted = false;
                                    mask.spriteFrame = mask.spriteFrame = this.image;
                                    mask.type = Mask.Type.IMAGE_STENCIL;
                                    mask.alphaThreshold = 0.1;
                                    this.scheduleOnce(() => {
                                        mask.enabled = false;
                                        this.scheduleOnce(() => {
                                            mask.enabled = true;
                                            this.scheduleOnce(() => {
                                                mask.type = Mask.Type.RECT;
                                                this.label.string = '测试完成';
                                            }, 2);
                                        }, 2);
                                    }, 2);
                                }, 2);
                            }, 2);
                        }, 2);
                    }, 2);
                }, 2);
            }, 2);
        }, 2);
    }
}


