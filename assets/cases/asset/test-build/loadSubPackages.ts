import { _decorator, Component, Node, loader, Sprite, SpriteAtlas, Label, assetManager, Color } from "cc";
const { ccclass, property } = _decorator;

@ccclass("loadSubPackages")
export class loadSubPackages extends Component {

    @property({type: Label})
    public label: Label = null!;

    @property({type: Node})
    public canvas: Node = null!;
    start () {
        // Your initialization goes here.
        this.loadSubPackage();
    }

    loadSubPackage() {
        this.label.string = 'Load subPackage...';
        loader.downloader.loadSubpackage('subPackage', (err: any) => {
            if (err) {
                this.label.string = 'load subPackage failed!';
                this.label.color = Color.RED;
                return console.error(err);
            }
            this.label.string = 'load subPackage success!';
            console.log(`load subpackage(subPackage) successfully.`);
            this.loadSpriteAtlas();
        });
    }

    loadSpriteAtlas () {
        assetManager.getBundle('subPackage')!.load<SpriteAtlas>('sheep', SpriteAtlas, (err, atlas) => {
            if (err) {
                return console.error(err);
            }
            loader.setAutoRelease(atlas!, true);
            const node = new Node();
            this.canvas.addChild(node);
            node.setPosition(0, 0, 0);
            const sprite = node.addComponent(Sprite);
            sprite.spriteFrame = atlas!.getSpriteFrame('sheep_down_0');
            this.label.string += '\nLoad atlas in subPackage success!';
            console.log('Load atlas in subPackage success!')
        });
    }
    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
