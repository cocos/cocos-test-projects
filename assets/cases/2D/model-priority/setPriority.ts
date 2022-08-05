import { _decorator, Component, Node, ModelRenderer } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('setPriority')
export class setPriority extends Component {
    @property
    priority = 0;

    model: ModelRenderer = null!;
    start() {
        this.model = this.node.getComponent(ModelRenderer)!;
        this.model.priority = this.priority;
    }
}


