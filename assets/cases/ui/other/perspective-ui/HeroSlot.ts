import { _decorator, Component, Label, Sprite, SpriteFrame } from "cc";
const { ccclass, property } = _decorator;

const getRandomInt = function (min: number, max: number) {
    var ratio = Math.random();
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
    
    private static num: number = 0;
    // use this for initialization
    onLoad() {
        this.refresh();
        HeroSlot.num++;
    }

    refresh() {
        let bgIdx = HeroSlot.num % this.sfBorders.length;
        let heroIdx = HeroSlot.num % this.sfHeroes.length;
        let starIdx = HeroSlot.num % this.spStars.length;
        let rankIdx = HeroSlot.num % this.sfRanks.length;
        let attIdx = HeroSlot.num % this.sfAttributes.length;
        let levelIdx = HeroSlot.num % 100;

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
