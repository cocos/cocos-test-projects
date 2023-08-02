import { _decorator, color, Color, Component, Node, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('rich_text_font_color')
export class rich_text_font_color extends Component {

    richText: RichText = null!;

    onLoad() {
        this.richText = this.getComponent(RichText)!;
    }

    start() {
        this.scheduleOnce(this.changeFontColor, 1);
        this.scheduleOnce(this.changeString, 2);
        this.scheduleOnce(this.changeFontColorToOrange, 3);
    }

    changeFontColor() {
        this.richText.fontColor = Color.CYAN.clone();
    }

    changeString() {
        this.richText.string = `<color=#ff0000>妈妈</c>再也<size=20>不用担心</size>我在 <size=56><color=#cc00ff>Creator</c></s> 里面使用<color=#ff0000>五</c><color=#00ff00>彩</c><color=#00e0ff>缤</c><color=#ffff00>纷</>，<size=20>大小</s><size=60>不一</s>的<size=33>文字</s>了`;
    }

    changeFontColorToOrange() {
        this.richText.fontColor = new Color(255, 112, 0);
    }

}


