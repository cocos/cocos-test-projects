import { _decorator, Component, ColliderComponent } from "cc";
import { PHY_GROUP, PHY_MASK } from "./group-mask";
const { menu, ccclass, property } = _decorator;

@ccclass("grouptesting")
@menu("physics/grouptesting")
export class grouptesting extends Component {

    @property({ type: PHY_GROUP })
    phy_group0 = 0;

    @property({ type: PHY_GROUP })
    phy_group1 = 0;

    switchGroup () {
        let collider = this.getComponent(ColliderComponent);
        if (collider) {
            if (collider.getGroup() == this.phy_group0) {
                collider.setGroup(this.phy_group1);
            } else {
                collider.setGroup(this.phy_group0);
            }
        }
    }
}
