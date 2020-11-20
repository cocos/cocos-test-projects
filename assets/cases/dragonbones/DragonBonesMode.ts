

import { _decorator, Component, director, instantiate, Label, Color, Vec2, Node, Prefab, dragonBones, macro, SystemEventType, systemEvent, Vec3, Material } from 'cc';
import { SystemEvent } from '../event/system-event/system-event';
const { ccclass, property, requireComponent } = _decorator;


@ccclass('DragonBonesMode')
export class DragonBonesMode extends Component {
    @property({ type: Material })
    grayMaterial: Material | null = null;
    @property({ type: Material })
    normalMaterial: Material | null = null;
    @property({ type: dragonBones.ArmatureDisplay })
    db0: dragonBones.ArmatureDisplay | null = null;
    @property({ type: dragonBones.ArmatureDisplay })
    db1: dragonBones.ArmatureDisplay | null = null;
    @property({ type: dragonBones.ArmatureDisplay })
    db2: dragonBones.ArmatureDisplay | null = null;
    @property({ type: Label })
    batchLabel: Label | null = null;
    @property({ type: Label })
    cacheLabel: Label | null = null;
    @property({ type: Label })
    matLabel: Label | null = null;

    @property
    isGray = false;

    @property
    isBatch = false;

    @property
    isCache = false;
    
    onGray () {
        this.isGray = !this.isGray;

        let label = "gray";
        if (this.isGray) label = "normal";
        this.matLabel!.string = label;

        let material = this.grayMaterial;
        if (!this.isGray) {
            material = this.normalMaterial;
        }
        this.db0!.setMaterial(material, 0);
        this.db0!.markForUpdateRenderData(true);

        this.db1!.setMaterial(material, 0);
        this.db1!.markForUpdateRenderData(true);

        this.db2!.setMaterial(material, 0);
        this.db2!.markForUpdateRenderData();
    }

    onBatch () {
        this.isBatch = !this.isBatch;
        let label = "batch";
        if (this.isBatch) label = "no batch";
        this.batchLabel!.string = label;

        this.db0!.enableBatch = this.isBatch;
        this.db1!.enableBatch = this.isBatch;
        this.db2!.enableBatch = this.isBatch;
    }
    onCache () {
        this.isCache = !this.isCache;

        let label = "cache";
        if (this.isCache) label = "no cache";
        this.cacheLabel!.string = label;

        let mode = dragonBones.ArmatureDisplay.AnimationCacheMode.SHARED_CACHE;
        if (!this.isCache) mode = dragonBones.ArmatureDisplay.AnimationCacheMode.REALTIME;
        this.db0!.setAnimationCacheMode(mode);
        this.db1!.setAnimationCacheMode(mode);
        this.db2!.setAnimationCacheMode(mode);
    }
}
