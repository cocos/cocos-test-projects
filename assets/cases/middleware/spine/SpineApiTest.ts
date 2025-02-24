import { _decorator, Component, resources, sp, Texture2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpineApiTest')
export class SpineApiTest extends Component {

    @property({ type: sp.Skeleton })
    skeleton: sp.Skeleton = null!;

    start() {
        this._testApi();
    }

    update(deltaTime: number) {
        
    }

    private _testApi() {
        this._testSkeletonData();
        this._testSlotData();
        this._testSlot();
        this._testSkin();
    }

    private _testSkeletonData() {

        console.log('start skeleton data.')
        
        const data = this.skeleton?.skeletonData?.getRuntimeData();
        const bones = data?.bones!;
  
        console.log('bone_0:',bones[0]);
        console.log('name:', data?.name);
        console.log('bones:',data?.bones);
        console.log('slots:', data?.slots);
        console.log('skins:', data?.skins);
        console.log('defaultSkin:', data?.defaultSkin);
        console.log('events:', data?.events);
        console.log('animations:', data?.animations);
        console.log('ikConstraints:', data?.ikConstraints);
        console.log('transformConstraints:', data?.transformConstraints);
        console.log('pathConstraints:', data?.pathConstraints);
  
        console.log('x:', data?.x);
        console.log('y:', data?.y);
        console.log('width:', data?.width);
        console.log('height:', data?.height);
        console.log('version:', data?.version);
        console.log('hash:', data?.hash);
        console.log('fps:', data?.fps);
        console.log('imagesPath:', data?.imagesPath);
        console.log('audioPath:', data?.audioPath);
  
  
        console.log('findBone:', data?.findBone('neck'))
        if (sp.spine.SPINE_VERSION !== '4.2') {
            console.log('findBoneIndex:', data?.findBoneIndex('neck'));
        }
        console.log('findSlot:', data?.findSlot('back-hand'));
        console.log('findAnimation:', data?.findAnimation('walk'));
        console.log('findEvent:', data?.findEvent('none'));
        console.log('findIkConstraint', data?.findIkConstraint('back-leg-ik'));
  
        let slot = this.skeleton?.findSlot('back-hand');
  
        console.log('slot->getAttachment:', slot?.getAttachment());
        console.log('end skeleton data.')
     }

     private _testSlot() {
        console.log('start test Slot.')

        const slot = this.skeleton?.findSlot('back-hand');
  
        if (sp.spine.SPINE_VERSION !== '4.2') {
            console.log('slot?.getAttachmentTime:', slot?.getAttachmentTime());
        }
        console.log('slot?.getSkeleton:', slot?.getSkeleton());
        console.log('slot?.getAttachment:', slot?.getAttachment());

        console.log('slot?.setAttachment:', slot?.setAttachment);
        console.log('slot?.setAttachmentTime:', slot?.setAttachmentTime);
        console.log('slot?.setToSetupPose:', slot?.setToSetupPose);

        console.log('slot?.data:', slot?.data);
        console.log('slot?.color:', slot?.color);
        console.log('slot?.darkColor:', slot?.darkColor);
        console.log('slot?.attachment:', slot?.attachment);
        console.log('slot?.attachmentState:', slot?.attachmentState);
        console.log('slot?.deform:', slot?.deform);

        console.log('end test Slot.')
     }

     private _testSlotData() {
        console.log('start test SlotData.')

        const slot = this.skeleton?.findSlot('back-hand');
        const slotData = slot?.data;
  
        console.log('slotData?.index:', slotData?.index);
        console.log('slotData?.name:', slotData?.name);
        console.log('slotData?.boneData:', slotData?.boneData);
        console.log('slotData?.color:', slotData?.color);
        console.log('slotData?.darkColor:', slotData?.darkColor);
        console.log('slotData?.attachmentName:', slotData?.attachmentName);
        console.log('slotData?.blendMode:', slotData?.blendMode);
        console.log('slot?.attachmentState:', slot?.attachmentState);
        console.log('slot?.deform:', slot?.deform);

        console.log('end test SlotData.')
     }

     private _testSkeleton() {
        const skeleton = this.skeleton;
        skeleton.addAnimation(1, 'jump', false);
        skeleton.setAnimation(0, 'gun-grab', true);

        resources.load("test_assets/image/texture", Texture2D, (err: Error | null, texture: Texture2D) => {
            if (err) {
                console.error(`路径为 test_assets/image/texture 资源不存在`);
                return;
            }
            skeleton.setSlotTexture("gun", texture, true);
        }); 
     }

     private _testSkin() {
        console.log('start test Skin.')

        const data = this.skeleton?.skeletonData?.getRuntimeData();
        const skin = data?.defaultSkin;
        const skins = data?.skins;

        console.log('skin:', skin);
        console.log('skin?.name:', skin?.name);
        console.log('skin?.attachments:', skin?.attachments);
        console.log('skin?.bones:', skin?.bones);
        console.log('skin?.constraints:', skin?.constraints);
        console.log('skin?.setAttachment:', skin?.setAttachment);
        console.log('skin?.addSkin:', skin?.addSkin);
        console.log('skin?.copySkin:', skin?.copySkin);
        console.log('skin?.findNamesForSlot:', skin?.findNamesForSlot);
        console.log('skin?.getBones:', skin?.getBones);
        console.log('skin?.getConstraints:', skin?.getConstraints);
        console.log('skin?.getAttachment:', skin?.getAttachment);
        console.log('skin?.removeAttachment:', skin?.removeAttachment);
        console.log('skin?.getAttachments:', skin?.getAttachments);
        console.log('skin?.getAttachmentsForSlot:', skin?.getAttachmentsForSlot);


        const skinEntries = skin?.getAttachments();
        const skinEntry = skinEntries ? skinEntries[0] : null;
        if (skinEntry !== null) {
            console.log('SkinEntry?.slotIndex:', skinEntry.slotIndex);
            console.log('SkinEntry?.name:', skinEntry.name);
            console.log('SkinEntry?.slotIndex:', skinEntry.attachment);
        }

        console.log('end test Slot.')
     }
  

    onRealTimeMode() {
        this.skeleton.setAnimationCacheMode(sp.AnimationCacheMode.REALTIME);
        this._testSkeleton();
    }

    onCacheMode() {
        this.skeleton.setAnimationCacheMode(sp.AnimationCacheMode.PRIVATE_CACHE);
        this._testSkeleton();
    }
}


