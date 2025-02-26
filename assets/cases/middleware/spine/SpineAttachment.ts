import { _decorator, Component, Node, sp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpineAttachment')
export class SpineAttachment extends Component {

    @property({type: sp.Skeleton})
    skeletonComponent: sp.Skeleton;

    private _oldAttachment: sp.Attachment | null = null;
    private _newAttachment: sp.Attachment | null = null;
    private _slot: sp.Slot | null = null;

    private _index: number = 0;


    start() {
        const asset = this.skeletonComponent.skeletonData;
        const spineData = asset?.getRuntimeData();
        if (!spineData) return;

        const skin = spineData.findSkin('default');
        let gunSlotIndex = -1;
        if (sp.SPINE_VERSION === '4.2') {
            const slotData = spineData.findSlot('gun');
            if (slotData) {
                gunSlotIndex = slotData.index;
            }
            
        } else {
            gunSlotIndex = spineData.findSlotIndex('gun');
        }

        this._newAttachment = skin.getAttachment(gunSlotIndex, 'gun-nohand');
        const handSlot = this.skeletonComponent.findSlot('front-hand');
        
        if (handSlot) {
            this._oldAttachment = handSlot.getAttachment();
            // handSlot.setAttachment(gunAttachment);
            this._slot = handSlot;
        }
    }

    update(deltaTime: number) {
        
    }

    onChange() {
        if (!this._slot) return;

        this._index += 1;
        if (this._index % 2 === 1) {
            this._slot.setAttachment(this._newAttachment);
        } else {
            this._slot.setAttachment(this._oldAttachment);
        }
    }
}

