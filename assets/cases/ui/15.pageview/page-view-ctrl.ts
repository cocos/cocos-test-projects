import { _decorator, Component, Prefab, LabelComponent, PageViewComponent, Color, Node, Vec3, SpriteComponent  } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("PageViewCtrl")
@menu('UI/PageViewCtrl')
export class PageViewCtrl extends Component {
    public static Direction = PageViewComponent.Direction;
    @property
    public curNum = 3;
    @property
    public curTotal = 10;
    @property(Prefab)
    public pageTeample:Prefab | null = null;
    @property(PageViewComponent)
    target: PageViewComponent | null = null;
    @property(LabelComponent)
    label: LabelComponent | null = null;
    @property({
        type:PageViewComponent.Direction,
    })
    direction = PageViewComponent.Direction.Horizontal;

    _createPage() {
        const page = cc.instantiate(this.pageTeample) as Node;
        page.name = `page_${this.curNum}`;
        page.setPosition(new Vec3());
        const color = new Color();
        color.r = Math.floor(Math.random() * 255);
        color.g = Math.floor(Math.random() * 255);
        color.b = Math.floor(Math.random() * 255);
        const comp = page.getComponent(SpriteComponent);
        comp.color = color;
        return page;
    }

    onLoad() {
        // 设置的当前页面为 1
        this.target.setCurrentPageIndex(0);
    }

    update() {
        // 当前页面索引
        const extra = this.direction === PageViewComponent.Direction.Vertical ? '\n' : '';
        this.label.string = `第${extra}` + (this.target.getCurrentPageIndex() + 1) + `${extra}页`;
    }

    // 返回首页
    onJumpHome() {
        // 第二个参数为滚动所需时间，默认值为 0.3 秒
        this.target.scrollToPage(0);
    }

    // 添加页面
    plusPage(callback: Function) {
        if (this.curNum > this.curTotal) {
            return;
        }
        this.curNum++;
        if (callback) {
            callback();
        }
    }

    // 减少页面
    lessPageNum(callback: Function) {
        if (this.curNum <= 0) {
            return;
        }
        this.curNum--;
        if (callback) {
            callback();
        }
    }

    // 添加页面
    onAddPage() {
        this.plusPage(() => {
            this.target.addPage(this._createPage());
        });
    }

    // 插入当前页面
    onInsertPage() {
        this.plusPage(() => {
            this.target.insertPage(this._createPage(), this.target.getCurrentPageIndex());
        });
    }

    // 移除最后一个页面
    onRemovePage() {
        this.lessPageNum(() => {
            var pages = this.target.getPages();
            this.target.removePage(pages[pages.length - 1]);
        });
    }

    // 移除当前页面
    onRemovePageAtIndex() {
        this.lessPageNum(() => {
            this.target.removePageAtIndex(this.target.getCurrentPageIndex());
        });
    }

    // 移除所有页面
    onRemoveAllPage() {
        this.target.removeAllPages();
        this.curNum = 0;
    }

    // 监听事件
    onPageEvent(sender, eventType) {
        // 翻页事件
        if (eventType !== PageViewComponent.EventType.PAGE_TURNING) {
            return;
        }
        console.log("当前所在的页面索引:" + sender.getCurrentPageIndex());
    }
}
