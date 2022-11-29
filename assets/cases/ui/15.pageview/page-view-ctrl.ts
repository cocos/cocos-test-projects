import { _decorator, Component, Prefab, Label, PageView, Color, Node, Vec3, Sprite, instantiate } from "cc";
const { ccclass, property, menu } = _decorator;


@ccclass("PageViewCtrl")
@menu('UI/PageViewCtrl')
export class PageViewCtrl extends Component {
    public static Direction = PageView.Direction;
    @property
    public curNum = 3;
    @property
    public curTotal = 10;
    @property(Prefab)
    public pageTeample: Prefab = null!;
    @property(PageView)
    public target: PageView = null!;
    @property(Label)
    public label: Label | null = null;
    @property({
        type: PageView.Direction,
    })
    public direction = PageView.Direction.Horizontal;

    private colorIndex = 0;

    _createPage() {
        this.colorIndex = (this.curNum) % 3;

        const page = instantiate(this.pageTeample) as Node;
        page.name = `page_${this.curNum}`;
        page.setPosition(new Vec3());
        let color: Color = Color.WHITE;
        if (this.colorIndex === 0) {
            color = Color.RED;
        } else if (this.colorIndex === 1) {
            color = Color.GREEN;
        } else if (this.colorIndex === 2) {
            color = Color.BLUE;
        }
        const comp = page.getComponent(Sprite)!;
        comp.color = color;
        return page;
    }

    onLoad() {
        // 设置的当前页面为 1
        this.target.setCurrentPageIndex(0);
    }

    update() {
        // 当前页面索引
        const extra = this.direction === PageView.Direction.Vertical ? '\n' : '';
        this.label!.string = `第${extra}` + (this.target.getCurrentPageIndex() + 1) + `${extra}页`;
    }

    // 返回首页
    onJumpHome() {
        // 第二个参数为滚动所需时间，默认值为 0.3 秒
        this.target.scrollToPage(0);
    }

    // 添加页面
    plusPage(callback: Function) {
        if (this.curNum >= this.curTotal) {
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
            if (this.curNum === 0) {
                this.onAddPage();
            }
        });
    }

    // 移除当前页面
    onRemovePageAtIndex() {
        this.lessPageNum(() => {
            this.target.removePageAtIndex(this.target.getCurrentPageIndex());
            if (this.curNum === 0) {
                this.onAddPage();
            }
        });
    }

    // 移除所有页面
    onRemoveAllPage() {
        this.target.removeAllPages();
        this.curNum = 0;
        this.onAddPage();
    }

    // 监听事件
    onPageEvent(sender: PageView, eventType: typeof PageView.EventType) {
        // // 翻页事件
        // if (eventType !== PageView.EventType.PAGE_TURNING) {
        //     return;
        // }

        console.log("当前所在的页面索引:" + sender.getCurrentPageIndex());
    }
}
