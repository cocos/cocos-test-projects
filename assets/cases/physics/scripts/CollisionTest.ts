import { _decorator, Component, ITriggerEvent, ColliderComponent, LabelComponent, ICollisionEvent } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("CollisionTest")
@menu("physics/CollisionTest")
export class CollisionTest extends Component {

    private static _idCounter = 0;
    public readonly id: number;

    private alreadyStay: boolean = false;

    @property({ type: LabelComponent })
    public label: LabelComponent = null;

    constructor () {
        super();
        this.id = CollisionTest._idCounter++;
    }

    start () {
        // Your initialization goes here.
        let collider = this.getComponent(ColliderComponent);
        if (collider) {
            collider.on('onCollisionEnter', this.onCollision, this);
            collider.on('onCollisionStay', this.onCollision, this);
            collider.on('onCollisionExit', this.onCollision, this);
        }
    }

    onCollision (event: ICollisionEvent) {
        if (event.type == 'onCollisionStay') {
            if (!this.alreadyStay) {
                this.alreadyStay = true;
            } else {
                return;
            }
        } else if (event.type == 'onCollisionExit') {
            this.alreadyStay = false;
        }

        if (this.label) {
            this.label.string += event.selfCollider.node.name + '一' + event.type + '一' + event.otherCollider.node.name + '  ';
        }
    }

}
