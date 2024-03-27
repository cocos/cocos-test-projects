import { _decorator, Component, Node, Vec3, assert, Canvas, Button, EventTouch, UIOpacity, Label, pseudoRandom } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("MoveCtrl")
@menu('opacity/MoveCtrl')
export class MoveCtrl extends Component {

    @property(Node)
    public moveNode: Node = null!;
    @property(Node)
    public firstNode: Node = null!;
    @property(Canvas)
    public canvas: Canvas = null!;
    @property(Button)
    public prevButton: Button = null!;
    @property(Button)
    public nextButton: Button = null!;

    @property(Label)
    public calcFormule: Label = null!;
    @property(Label)
    public calcValue: Label = null!;
    @property(Label)
    public calcResult: Label = null!;
    

    start () {
        // Your initialization goes here.
        this.calcOpacity();
    }

    calcOpacity() {
        let uiOp = this.moveNode.getComponent(UIOpacity);
        let uiOpVal = 1.0;
        if(uiOp && uiOp.enabled) {
            uiOpVal = uiOp.opacity / 255;
        }
        
        this.calcFormule.string = '';
        this.calcValue.string = '';
        this.calcResult.string = '';
        if ((this.moveNode.children.length == 0 && this.moveNode.getParent() == this.canvas.node) ||
            (this.moveNode.children.length > 0 && this.moveNode.children[0] == this.firstNode)) {
            this.calcFormule.string = this.moveNode.name + '.opacity';
            this.calcValue.string = uiOpVal.toFixed(2).toString();
            this.calcResult.string = uiOpVal.toFixed(2).toString();
            return;
        }
        let opacity = 1.0;
        let node = this.firstNode;
        while (node != null && node != this.moveNode) {
            let nodeUiOp = node.getComponent(UIOpacity);
            let nodeOpacity = 1.0;
            if (nodeUiOp) {
                nodeOpacity = nodeUiOp.opacity / 255;
            }
            if (node == this.firstNode) {
                this.calcFormule.string += node.name + '.opacity';
                this.calcValue.string += nodeOpacity.toFixed(2).toString();
            } else {
                this.calcFormule.string += ' * ' + node.name + '.opacity';
                this.calcValue.string += ' * ' + nodeOpacity.toFixed(2).toString();
            }
            opacity *= nodeOpacity;

            node = node.children[0];
        }
        this.calcFormule.string += ' * ' + this.moveNode.name + '.opacity';
        this.calcValue.string += ' * ' + uiOpVal.toFixed(2).toString();
        this.calcResult.string = (uiOpVal * opacity).toFixed(2).toString();
        return;
    }

    prevNode() {
        this.nextButton.interactable = true;
        let parent = this.moveNode.getParent();
        if(parent) {
            if(this.moveNode.children.length > 0) {
                let child = this.moveNode.children[0];
                child.parent = parent;
            }

            let grandParent = parent.getParent();

            if(grandParent) {
                this.moveNode.parent = grandParent;
            }
            parent.parent = this.moveNode;

            if(parent == this.firstNode) {
                const pos = new Vec3(this.moveNode.position);
                this.moveNode.setPosition(this.firstNode.position);
                this.firstNode.setPosition(pos);
                this.prevButton.interactable = false;
            }
        }
        this.calcOpacity();
    }

    nextNode() {
        this.prevButton.interactable = true;
        let parent = this.moveNode.getParent();
        const child = this.moveNode.children[0];
        if(child) {
            if(child == this.firstNode) {
                const pos = new Vec3(this.moveNode.position);
                this.moveNode.setPosition(this.firstNode.position);
                this.firstNode.setPosition(pos);
            }
            if(parent) {
                child.parent = parent;
            }

            if(child.children.length > 0) {
                let grandChild = child.children[0];
                grandChild.parent = this.moveNode;
            } else {
                this.nextButton.interactable = false;
            }
            this.moveNode.parent = child;
        }
        this.calcOpacity();
    }

    separate() {
        this.prevButton.interactable = false;
        this.nextButton.interactable = false;
    
        const parent = this.moveNode.getParent();
        if(this.moveNode.children.length > 0) {
            const child = this.moveNode.children[0];
            if(child == this.firstNode) {
                const pos = new Vec3(this.moveNode.position);
                this.firstNode.setPosition(pos);
            }
            child.parent = parent;
        } else {
            parent!.removeChild(this.moveNode);
        }

        this.moveNode.setPosition(-350, 180);
        this.moveNode.parent = this.canvas.node;
        this.calcOpacity();
    }

    reset() {
        let parent = this.moveNode.getParent();
        if(parent) {
            parent.removeChild(this.moveNode);
        }
        if(this.moveNode.children.length > 0 && this.moveNode.children[0] == this.firstNode) {
            const pos = new Vec3(this.moveNode.position);
            this.firstNode.setPosition(pos);
        }
        let child = this.moveNode.children[0];
        if(child) {
            parent?.addChild(child);
        }
        let thirdNode = this.firstNode.children[0].children[0];
        if(thirdNode) {
            this.moveNode.setPosition(120, 0);
            const child = thirdNode.children[0];
            this.moveNode.addChild(child);
            thirdNode.removeChild(child);
            thirdNode.addChild(this.moveNode);

            this.prevButton.interactable = true;
            this.nextButton.interactable = true;
        }
        this.calcOpacity();
    }
    
    setEnabled(event : EventTouch) {
        let UiOp = this.moveNode.getComponent(UIOpacity);
        if(UiOp) {
            UiOp.enabled = !UiOp.enabled;
        }
        let label =  event.currentTarget.getComponentInChildren(Label);
        if(UiOp?.enabled) {
            label!.string = '禁能'
        } else {
            label!.string = '使能'
        }
        
        this.calcOpacity();
        
    }
    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
