import { _decorator, Node, Size, Component, Prefab, instantiate, UITransform, Widget, fragmentText, safeMeasureText, Label, ScrollView, Vec3, Layout } from "cc";
const { ccclass, property, menu } = _decorator;

const FIXED_HEIGHT = 20;
const TOTAL_PADDING = 4;

interface ILogConfig{
    pos?: Vec3;
    isAlign?: boolean;
    isAlignLeft?: boolean;
    isAlignBottom?: boolean;
    isAlignRight?: boolean;
    isAlignTop?: boolean;
    left?: number;
    right?: number;
    bottom?: number;
    top?: number;
}

@ccclass("UILog")
@menu('UI/UILog')
export class UILog extends Component {
    @property
    get size (){
        return this._size;
    }

    set size(value){
        if(this._size.equals(value)){
            return;
        }

        this._size.set(value);
        if(this.logPanel){
            const transform = this.logPanel.getComponent(UITransform)!;
            transform.contentSize = this._size;
        }
    }

    @property(Prefab)
    public panel: Prefab = null!;
    @property(Prefab)
    public item: Prefab = null!;
    @property
    workOnLoad = true;

    public logPanel: Node | null = null;
    @property
    private _size = new Size(100, 100);
    private _itemList = [];
    private _itemPool: Node[] = [];
    private _context: CanvasRenderingContext2D | null = null;
    private _scrollView: ScrollView | null = null;
    private _offset = new Vec3();
    private _originPos = new Vec3();
    private _layout: Layout | null = null;

    public onLoad(){
        const canvas = document.createElement('canvas');
        this._context = canvas.getContext('2d');
        if(this._context){
            this._context.font = `${FIXED_HEIGHT}px Arial`;
            this._context.lineWidth = FIXED_HEIGHT + 2;
        }

        if(this.workOnLoad){
            this.initLog({
                isAlign: true,
                isAlignLeft: true,
                isAlignBottom: true,
                left: 50,
                bottom: 50,
            });
        }
    }

    public initLog(config: ILogConfig) {
        config = config || { isAlign: false };
        const panel = this.logPanel = instantiate(this.panel) as Node;
        panel.parent = this.node;
        const scrollView = panel.getComponent(ScrollView);
        this._scrollView = scrollView;
        this._layout = scrollView!.content!.getComponent(Layout);
        this._originPos.set(scrollView!.content!.position);
        this._originPos.y = this._size.height / 2;
        const transform = panel.getComponent(UITransform)!;
        transform.contentSize = this.size;
        if (config.pos) {
            panel.setPosition(config.pos);
        }

        if (!!config.isAlign) {
            const widget = panel.addComponent(Widget);
            widget.isAlignLeft = !!config.isAlignLeft;
            widget.isAlignBottom = !!config.isAlignBottom;
            widget.isAlignRight = !!config.isAlignRight;
            widget.isAlignTop = !!config.isAlignTop;
            widget.left = config.left || 0;
            widget.bottom = config.bottom || 0;
            widget.right = config.right || 0;
            widget.top = config.top || 0;
        }

        const mask = panel.getChildByName('view')!;
        const maskWidget = mask.addComponent(Widget);
        maskWidget.isAlignBottom = maskWidget.isAlignLeft = maskWidget.isAlignRight = maskWidget.isAlignTop = true;
        maskWidget.left = maskWidget.right = maskWidget.top = maskWidget.bottom = 0;
    }

    public addLabel(str: string){
        if (!this.item || !this.logPanel || str.length <= 0) {
            return;
        }

        const paragraphedStrings = str.split('\n');
        let spliteStrings: string[] = [];
        const maxWidth = this._size.width;
        this._context?.clearRect(0, 0, maxWidth, this._size.height);
        for (const para of paragraphedStrings) {
            const allWidth = safeMeasureText(this._context!, para);
            const textFragment = fragmentText(para, allWidth, maxWidth - TOTAL_PADDING, this._measureText());
            spliteStrings = spliteStrings.concat(textFragment);
        }

        const text = spliteStrings.join('\n');
        const item = this._allocItem()!;
        const content = this._scrollView ? this._scrollView.content: null;
        item.parent = content;
        const itemTransComp = item.getComponent(UITransform)!;
        const itemBgTransComp = item.children[0].getComponent(UITransform)!;
        itemBgTransComp.width = itemTransComp.width = maxWidth;
        const itemHeight = spliteStrings.length * (FIXED_HEIGHT + 2);
        itemBgTransComp.height = itemTransComp.height = itemHeight;
        const labelTransComp = item.children[1].getComponent(UITransform)!;
        labelTransComp.width = maxWidth - TOTAL_PADDING;
        labelTransComp.height = spliteStrings.length * FIXED_HEIGHT;
        const labelComp = labelTransComp.getComponent(Label)!;
        labelComp.string = text;
        this._layout?.updateLayout();

        const conteTrans = content? content.getComponent(UITransform) : null;
        if (conteTrans && conteTrans.height > this._size.height) {
            this._offset.set(0, conteTrans.height - this._size.height, 0);
            this._scrollView?.scrollToOffset(this._offset, 0.5, true);
        }
    }


    public clearLabel(){
        for (let i = 0; i < this._itemList.length; i++) {
            const e = this._itemList[i];
            this._freeItem(e);

        }
        this._itemList.length = 0;
    }

    private _allocItem(){
        if(this._itemPool.length > 0){
            return this._itemPool.pop();
        }

        const root = instantiate(this.item);
        return root;
    }

    private _freeItem(item: Node) {
        this._itemPool.push(item);
    }

    private _measureText(){
        const ctx = this._context;
        return (str: string) => {
            return safeMeasureText(ctx!, str);
        };
    }

}
