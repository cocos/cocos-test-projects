import { _decorator, Component, Node, ScrollView, Prefab, instantiate, EventHandler, find, Vec3, UITransform, Layout, View } from "cc";
import { FoldItem } from "./folditem";
import { ItemType, ListItem } from "./listitem";
const { ccclass, property } = _decorator;
import { screen } from 'cc'
import { Size } from 'cc'

export class SceneList {

    static sceneArray: string[] = [];
    static sceneFold: string[] = [];
    static foldCount: number = 0;

}

class DisplayItems {
    index: number = -1;
    type: number = -1;
}

const _temp_vec3 = new Vec3();
@ccclass("scenemanager")
export class SceneManager extends Component {

    @property({ type: Prefab })
    itemPrefab: Prefab | null = null;
    @property({ type: Prefab })
    foldPrefab: Prefab | null = null;
    @property({ type: ScrollView })
    scrollView: ScrollView = null!;
    @property
    public bufferZone = 0; // when item is away from bufferZone, we relocate it

    private _content: Node = null!;
    private _items: Node[] = [];
    private _updateTimer = 0;
    private _updateInterval = 0.2;
    private _lastContentPosY = 0;
    private _itemTemplateUITrans!: UITransform;
    private _contentUITrans!: UITransform;
    private _spacing = 10; // item vertical spacing
    private _spawnCount = 10; // Initialize item number
    private _totalCount = 0; // The total number of items in the scrolling list
    private _height = 0;
    private _displaySize = 0;
    private _displayItems: DisplayItems[] = [];
    onLoad() {
        //screen.windowSize = new Size(1024, 2048);
        this._content = this.scrollView.content!;

        this._itemTemplateUITrans = this.itemPrefab!.data.getComponent(UITransform)!;
        this._contentUITrans = this._content._uiProps.uiTransformComp!;

        SceneList.foldCount = 0;
        if (!this.itemPrefab) {
            return;
        }
        let k = 0;
        let flodItem = new DisplayItems;
        flodItem.index = 0;
        flodItem.type = ItemType.FOLD;
        this._displayItems.push(flodItem);
        // Recombine item and fold for sliding the entire queue
        for (let i = 0; i < SceneList.sceneArray.length; i++) {
            let scenseItem = new DisplayItems;
            scenseItem.index = k++;
            scenseItem.type = ItemType.SCENSE;
            this._displayItems.push(scenseItem);
            if (i + 1 < SceneList.sceneFold.length && SceneList.sceneFold[i] !== SceneList.sceneFold[i + 1]) {
                let flodItem = new DisplayItems;
                flodItem.index = i + 1;
                flodItem.type = ItemType.FOLD;
                this._displayItems.push(flodItem);
            }
        }
        this._totalCount = this._displayItems.length;
        this._height = this._totalCount * (this._itemTemplateUITrans.height + this._spacing) + this._spacing; // get total content height
        this._contentUITrans.height = this._height;
        this._displaySize = this.node.parent!.getComponent(UITransform)!.height;
        this._spawnCount = Math.ceil(this._displaySize / (this._itemTemplateUITrans.height + this._spacing)) + 16;
        for (let j = 0; j < this._spawnCount; j++) {
            let item = instantiate(this.itemPrefab);
            item.getComponent(ListItem)!.updateItem(this._displayItems[j].type, this._displayItems[j].index);
            this.node.addChild(item);
            let itemUITrans = item.getComponent(UITransform)!;
            item.setPosition(0, -itemUITrans.height * (0.1 + j) - this._spacing * (j + 1), 0);
            this._items.push(item);
        }
    }

    getPositionInView(item: Node) {
        // get item position in scrollview's node space
        let worldPos = item.parent!.getComponent(UITransform)!.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.getComponent(UITransform)!.convertToNodeSpaceAR(worldPos);
        return viewPos;
    }

    update(dt: number) {
        this._updateTimer += dt;
        if (this._updateTimer < this._updateInterval) return; // we don't need to do the math every frame
        this._updateTimer = 0;
        let items = this._items;
        let isDown = this.scrollView.content!.position.y < this._lastContentPosY; // scrolling direction
        let offset = (this._itemTemplateUITrans.height + this._spacing) * this._spawnCount;

        for (let i = 0; i < this._spawnCount; ++i) {
            let viewPos = this.getPositionInView(items[i]);
            items[i].getPosition(_temp_vec3);
            let isChange = false;
            if (isDown) {
                // if away from buffer zone and not reaching top of content
                if (viewPos.y < -this._displaySize && _temp_vec3.y + offset <= 0) {
                    _temp_vec3.y += offset;
                    items[i].setPosition(_temp_vec3);
                    isChange = true;
                }
            } else {
                // if away from buffer zone and not reaching bottom of content
                if (viewPos.y > this._displaySize && _temp_vec3.y - offset > -this._height) {
                    let n = Math.floor((viewPos.y - this._displaySize) / (offset));
                    _temp_vec3.y -= offset * (n + 1);
                    items[i].setPosition(_temp_vec3);
                    isChange = true;
                }
            }
            let yPos = _temp_vec3.y > 0 ? _temp_vec3.y : -1 * _temp_vec3.y;
            // Does not need to be refreshed every frame, only calculated when it changes
            if (isChange || yPos < offset) {
                // Quickly locate the corresponding index for returning from a specific scene
                let index = Math.floor(yPos / offset) * this._spawnCount + i;
                if (index >= 0 && index < this._displayItems.length)
                    items[i].getComponent(ListItem)?.updateItem(this._displayItems[index].type, this._displayItems[index].index);
            }

        }
        // update lastContentPosY
        this._lastContentPosY = this.scrollView.content!.position.y;
    }
}
