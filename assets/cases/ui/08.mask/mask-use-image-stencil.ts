// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, Node, SpriteFrame, Label, Mask } from 'cc';
const { ccclass, type } = _decorator;

@ccclass('MaskUseImageStencil')
export class MaskUseImageStencil extends Component {
    @type(SpriteFrame)
    image: SpriteFrame = null;

    @type(Label)
    label: Label = null;

    start(){
        const mask = this.getComponent(Mask)!;

        this.scheduleOnce(() => {
            mask.type = Mask.Type.IMAGE_STENCIL;
            this.scheduleOnce(()=>{
                mask.enabled = false;
                this.scheduleOnce(() => {
                    mask.type = Mask.Type.GRAPHICS_STENCIL;
                    const g = mask.graphics;
                    g.clear();
                    g.lineWidth = 10;
                    g.fillColor.fromHEX('#ff0000');

                    g.moveTo(-80, 0);
                    g.lineTo(0, -150);
                    g.lineTo(80, 0);
                    g.lineTo(0, 150);
                    g.close();

                    g.stroke();
                    g.fill();
                    mask.enabled = true;
                    this.scheduleOnce(() => {
                        mask.spriteFrame = mask.spriteFrame = this.image;
                        mask.type = Mask.Type.IMAGE_STENCIL;
                        mask.alphaThreshold = 0.1;
                        this.scheduleOnce(() => {
                            mask.type = Mask.Type.RECT;
                            this.label.string = '测试完成';
                        }, 2);
                    }, 2);
                }, 1);
            }, 1)
        }, 2);
    }
}
