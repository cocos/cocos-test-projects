import { _decorator, Component, Prefab, ScrollView, Node, instantiate } from "cc";
const { ccclass, property } = _decorator;
import { HomeUI } from "./HomeUI";

@ccclass
export class BackPackUI extends Component {
    @property({
        type: Prefab
    })
    slotPrefab: Prefab = null!;
    @property({
        type: ScrollView
    })
    scrollView: ScrollView = null!;
    @property
    totalCount = 0;

    public home: HomeUI = null!;
    public heroSlots: Node[] = [];

    init(home: HomeUI) {
        this.heroSlots.length = 0;
        this.home = home;
        for (let i = 0; i < this.totalCount; ++i) {
            let heroSlot = this.addHeroSlot();
            this.heroSlots.push(heroSlot);
        }
    }

    addHeroSlot() {
        let heroSlot = instantiate(this.slotPrefab);
        this.scrollView.content!.addChild(heroSlot);
        return heroSlot;
    }

    show() {
        this.node.active = true;
        this.node.emit('fade-in');
    }

    hide() {
        this.node.active = false;
        this.node.emit('fade-out');
    }
}
