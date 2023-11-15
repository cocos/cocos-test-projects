import { _decorator, Component, Label, random, Sprite, SpriteFrame } from "cc";
const { ccclass, property } = _decorator;

const getRandomInt = function (min: number, max: number) {
    var ratio = random();
    return min + Math.floor((max - min) * ratio);
};

@ccclass
export class HeroSlot extends Component {
    @property([SpriteFrame])
    public sfAttributes: SpriteFrame[] = [];
     @property([SpriteFrame])
    public sfRanks: SpriteFrame[] = [];
     @property([SpriteFrame])
    public sfHeroes: SpriteFrame[] = [];
     @property([SpriteFrame])
    public sfBorders: SpriteFrame[] = [];
    @property(Label)
    public labelLevel: Label = null!;
    @property(Sprite)
    public spHero: Sprite = null!;
    @property(Sprite)
    public spRank: Sprite = null!;
    @property(Sprite)
    public spAttribute: Sprite = null!;
    @property(Sprite)
    public spBorder: Sprite = null!;
    @property([Sprite])
    public spStars: Sprite[] = [];

    // use this for initialization
    onLoad() {
        this.refresh();
    }

    refresh() {
        let bgIdx = getRandomInt(0, this.sfBorders.length);
        let heroIdx = getRandomInt(0, this.sfHeroes.length);
        let starIdx = getRandomInt(0, this.spStars.length);
        let rankIdx = getRandomInt(0, this.sfRanks.length);
        let attIdx = getRandomInt(0, this.sfAttributes.length);
        let levelIdx = getRandomInt(0, 100);
        this.labelLevel.string = 'LV.' + levelIdx;
        this.spRank.spriteFrame = this.sfRanks[rankIdx];
        this.refreshStars(starIdx);
        this.spBorder.spriteFrame = this.sfBorders[bgIdx];
        this.spAttribute.spriteFrame = this.sfAttributes[attIdx];
        this.spHero.spriteFrame = this.sfHeroes[heroIdx];
    }

    refreshStars(count: number) {
        for (let i = 0; i < this.spStars.length; ++i) {
            if (i <= count) this.spStars[i].enabled = true;
            else this.spStars[i].enabled = false;
        }
    }
}
