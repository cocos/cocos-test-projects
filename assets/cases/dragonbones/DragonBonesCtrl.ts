
import { _decorator, Component, Node, dragonBones, macro, SystemEventType, systemEvent, Vec3, director } from 'cc';
const { ccclass, property, requireComponent } = _decorator;


var NORMAL_ANIMATION_GROUP = "normal";
var AIM_ANIMATION_GROUP = "aim";
var ATTACK_ANIMATION_GROUP = "attack";
var JUMP_SPEED = -20;
var NORMALIZE_MOVE_SPEED = 3.6;
var MAX_MOVE_SPEED_FRONT = NORMALIZE_MOVE_SPEED * 1.4;
var MAX_MOVE_SPEED_BACK = NORMALIZE_MOVE_SPEED * 1.0;
var WEAPON_R_LIST = ["weapon_1502b_r", "weapon_1005", "weapon_1005b", "weapon_1005c", "weapon_1005d", "weapon_1005e"];
var WEAPON_L_LIST = ["weapon_1502b_l", "weapon_1005", "weapon_1005b", "weapon_1005c", "weapon_1005d"];
var SKINS = ["mecha_1502b", "skin_a", "skin_b", "skin_c"];
var GROUND = -200;
var G = -0.6;



@ccclass('DragonBonesCtrl')
@requireComponent(dragonBones.ArmatureDisplay)
export default class DragonBonesCtrl extends Component {

    @property({ type: Node })
    touchHandler: Node | null = null;

    @property({ type: Node })
    upButton: Node | null = null;
    @property({ type: Node })
    downButton: Node | null = null;
    @property({ type: Node })
    leftButton: Node | null = null;
    @property({ type: Node })
    rightButton: Node | null = null;


    @property({ type: dragonBones.ArmatureDisplay })
    weaponArmature: dragonBones.ArmatureDisplay | null = null;


    @property({ type: dragonBones.ArmatureDisplay })
    skinArmature: dragonBones.ArmatureDisplay | null = null;

    _bullets:any[] = [];
    _left = false;
    _right = false;
    _isJumpingA = false;
    _isJumpingB = false;
    _isSquating = false;
    _isAttackingA = false;
    _isAttackingB = false;
    _weaponRIndex = 0;
    _weaponLIndex = 0;
    _skinIndex = 0;
    _faceDir = 1;
    _aimDir = 0;
    _moveDir = 0;
    _aimRadian = 0;
    _speedX = 0;
    _speedY = 0;
    _armature: any= null;
    _armatureDisplay:dragonBones.ArmatureDisplay|null = null;
    _weaponR:any = null;
    _weaponL:any = null;
    _aimState :any= null;
    _walkState:any = null;
    _attackState :any = null;
    _target = new Vec3(0, 0, 0);

    _mouseDown_ = false;

    // use this for initialization
    onLoad () {
        this._armatureDisplay = this.getComponent(dragonBones.ArmatureDisplay)!;
        this._armature = this._armatureDisplay.armature();

        this._armatureDisplay.addEventListener((dragonBones as any).EventObject.FADE_IN_COMPLETE, this._animationEventHandler, this);
        this._armatureDisplay.addEventListener((dragonBones as any).EventObject.FADE_OUT_COMPLETE, this._animationEventHandler, this);
        this._armatureDisplay.addEventListener((dragonBones as any).EventObject.COMPLETE, this._animationEventHandler, this);

        this._weaponR = this._armature.getSlot('weapon_r').childArmature;
        this._weaponL = this._armature.getSlot('weapon_l').childArmature;
        this._weaponR.addEventListener((dragonBones as any).EventObject.FRAME_EVENT, this._frameEventHandler, this);
        this._weaponL.addEventListener((dragonBones as any).EventObject.FRAME_EVENT, this._frameEventHandler, this);

        // load all skin data
        for (let i = 1; i < SKINS.length; i++) {
            this.skinArmature!.armatureName = SKINS[i];
        }

        for (let i = 1; i < WEAPON_R_LIST.length; i++) {
            this.weaponArmature!.armatureName = WEAPON_R_LIST[i];
        }

        this._updateAnimation();

        if (this.touchHandler) {
            // touch events
            this.touchHandler.on(SystemEventType.TOUCH_START, (event: { getTouches: () => any; }) => {
                this._mouseDown_ = true;
                var touches = event.getTouches();
                var touchLoc = touches[0].getLocation();
                this.aim(touchLoc.x, touchLoc.y);
                this.attack(true);
            } , this);
            this.touchHandler.on(SystemEventType.TOUCH_END, (event: any) => {
                this._mouseDown_ = false;
                this.attack(false);
            }, this);
            this.touchHandler.on(SystemEventType.TOUCH_MOVE, (event: { getTouches: () => any; }) => {
                var touches = event.getTouches();
                var touchLoc = touches[0].getLocation();
                this.aim(touchLoc.x, touchLoc.y);
            }, this);
        }

        if (this.upButton) {
            this.upButton.on(SystemEventType.TOUCH_START, (event: any) => {
                this.jump();
            }, this);
        }

        if (this.downButton) {
            this.downButton.on(SystemEventType.TOUCH_START, (event: any) => {
                this.squat(true);
            } ,this);
            this.downButton.on(SystemEventType.TOUCH_END, (event: any) => {
                this.squat(false);
            } ,this);
            this.downButton.on(SystemEventType.TOUCH_CANCEL, (event: any) => {
                this.squat(false);
            } ,this);
        }

        if (this.leftButton) {
            this.leftButton.on(SystemEventType.TOUCH_START, (event: any) => {
                this._left = true;
                this._updateMove(-1);
            } ,this);
            this.leftButton.on(SystemEventType.TOUCH_END, (event: any) => {
                this._left = false;
                this._updateMove(-1);
            } ,this);
            this.leftButton.on(SystemEventType.TOUCH_CANCEL, (event: any) => {
                this._left = false;
                this._updateMove(-1);
            } ,this);
        }

        if (this.rightButton) {
            this.rightButton.on(SystemEventType.TOUCH_START, (event: any) => {
                this._right = true;
                this._updateMove(1);
            } ,this);
            this.rightButton.on(SystemEventType.TOUCH_END, (event: any) => {
                this._right = false;
                this._updateMove(1);
            }, this);
            this.rightButton.on(SystemEventType.TOUCH_CANCEL, (event: any) => {
                this._right = false;
                this._updateMove(1);
            } ,this);
        }

        // keyboard events
        systemEvent.on(SystemEventType.KEY_DOWN,  (event) => {
            this._keyHandler(event!.keyCode, true);
        }, this);
        systemEvent.on(SystemEventType.KEY_UP,  (event) => {
            this._keyHandler(event!.keyCode, false);
        },this);
    }

    _keyHandler (keyCode: number, isDown: boolean) {
        switch (keyCode) {
            case macro.KEY.a:
            case macro.KEY.left:
                this._left = isDown;
                this._updateMove(-1);
                break;
            case macro.KEY.d:
            case macro.KEY.right:
                this._right = isDown;
                this._updateMove(1);
                break;
            case macro.KEY.w:
            case macro.KEY.up:
                if (isDown) {
                    this.jump();
                }
                break;
            case macro.KEY.s:
            case macro.KEY.down:
                this.squat(isDown);
                break;
            case macro.KEY.q:
                if (isDown) {
                    this.switchWeaponR();
                }
                break;
            case macro.KEY.e:
                if (isDown) {
                    this.switchWeaponL();
                }
                break;
            case macro.KEY.space:
                if (isDown) {
                    this.switchWeaponR();
                    this.switchWeaponL();
                }
                break;
            default:
                return;
        }
    }

    _updateMove (dir: number) {
        if (this._left && this._right) {
            this.move(dir);
        } else if (this._left) {
            this.move(-1);
        } else if (this._right) {
            this.move(1);
        } else {
            this.move(0);
        }
    }

    move (dir: number) {
        if (this._moveDir === dir) {
            return;
        }

        this._moveDir = dir;
        this._updateAnimation();
    }

    jump () {
        if (this._isJumpingA) {
            return;
        }

        this._isJumpingA = true;
        this._armature.animation.fadeIn("jump_1", -1, -1, 0, NORMAL_ANIMATION_GROUP);
        this._walkState = null;
    }

    squat (isSquating: boolean) {
        if (this._isSquating === isSquating) {
            return;
        }

        this._isSquating = isSquating;
        this._updateAnimation();
    }

    attack (isAttacking: boolean) {
        if (this._isAttackingA == isAttacking) {
            return;
        }

        this._isAttackingA = isAttacking;
    }

    switchWeaponL () {
        this._weaponL.removeEventListener((dragonBones as any).EventObject.FRAME_EVENT, this._frameEventHandler, this);

        this._weaponLIndex++;
        if (this._weaponLIndex >= WEAPON_L_LIST.length) {
            this._weaponLIndex = 0;
        }

        var newWeaponName = WEAPON_L_LIST[this._weaponLIndex];
        let factory = (dragonBones as any).CCFactory.getInstance();
        this._weaponL = factory.buildArmature(newWeaponName);
        this._armature.getSlot('weapon_l').childArmature = this._weaponL;

        this._weaponL.addEventListener((dragonBones as any).EventObject.FRAME_EVENT, this._frameEventHandler, this);
    }

    switchWeaponR () {
        this._weaponR.removeEventListener((dragonBones as any).EventObject.FRAME_EVENT, this._frameEventHandler, this);

        this._weaponRIndex++;
        if (this._weaponRIndex >= WEAPON_R_LIST.length) {
            this._weaponRIndex = 0;
        }

        var newWeaponName = WEAPON_R_LIST[this._weaponRIndex];
        let factory = dragonBones.CCFactory.getInstance() as any;
        this._weaponR = factory.buildArmature(newWeaponName);
        this._armature.getSlot('weapon_r').childArmature = this._weaponR;

        this._weaponR.addEventListener((dragonBones as any).EventObject.FRAME_EVENT, this._frameEventHandler, this);
    }

    switchSkin () {
        this._skinIndex++;
        if (this._skinIndex >= SKINS.length) {
            this._skinIndex = 0;
        }
        let skinName = SKINS[this._skinIndex];
        let factory = dragonBones.CCFactory.getInstance()  as any;
        let skinData = factory.getArmatureData(skinName).defaultSkin;
        factory.replaceSkin(this._armatureDisplay!.armature(), skinData, false, ["weapon_l", "weapon_r"]);
    }

    aim (x: any, y: any) {
        if (this._aimDir === 0) {
            this._aimDir = 10;
        }

        this._target = this.node.parent!._uiProps.uiTransformComp!.convertToNodeSpaceAR(new Vec3(x, y, 0));
    }

    update (dt: any) {
        this._updatePosition();
        this._updateAim();
        this._updateAttack();
        this._enterFrameHandler(dt);
    }

    onDisable () {
        // clean the bullets
        for (var i = this._bullets.length - 1; i >= 0; i--) {
            var bullet = this._bullets[i];
            bullet.enabled = false;
        }
        this._bullets = [];
    }

    addBullet (bullet: any) {
        this._bullets.push(bullet);
    }

    _enterFrameHandler (dt: any) {
        for (var i = this._bullets.length - 1; i >= 0; i--) {
            var bullet = this._bullets[i];
            if (bullet.update()) {
                this._bullets.splice(i, 1);
            }
        }
    }

    _animationEventHandler (event: { type: any; animationState: { name: string; }; }) {
        if (event.type === (dragonBones as any).EventObject.FADE_IN_COMPLETE) {
            if (event.animationState.name === "jump_1") {
                this._isJumpingB = true;
                this._speedY = -JUMP_SPEED;

                if (this._moveDir != 0) {
                    if (this._moveDir * this._faceDir > 0) {
                        this._speedX = MAX_MOVE_SPEED_FRONT * this._faceDir;
                    }
                    else {
                        this._speedX = -MAX_MOVE_SPEED_BACK * this._faceDir;
                    }
                }

                this._armature.animation.fadeIn("jump_2", -1, -1, 0, NORMAL_ANIMATION_GROUP).resetToPose = false;
            } else if (event.animationState.name === "jump_4") {
                this._updateAnimation();
            }
        }
        else if (event.type === (dragonBones as any).EventObject.FADE_OUT_COMPLETE) {
            if (event.animationState.name === "attack_01") {
                this._isAttackingB = false;
                this._attackState = null;
            }
        }
        else if (event.type === (dragonBones as any).EventObject.COMPLETE) {
            if (event.animationState.name === "jump_4") {
                this._isJumpingA = false;
                this._isJumpingB = false;
                this._updateAnimation();
            }
        }
    }

    _frameEventHandler (event: any, bone: any, armature: any ) {
        if (event.name === "fire") {
            // var firePointBone = event.armature.getBone("firePoint");
            var localPoint = new Vec3(event.bone.global.x, event.bone.global.y, 0);

            var display = event.armature.display;
            var globalPoint = display.node.convertToWorldSpace(localPoint);
            this._fire(globalPoint);
        }
    }

    _fire (firePoint: Vec3) {
        firePoint.x += Math.random() * 2 - 1;
        firePoint.y += Math.random() * 2 - 1;
        firePoint.z = 0;

        var armature = this._armatureDisplay!.buildArmature("bullet_01");
        var effect = this._armatureDisplay!.buildArmature("fire_effect_01");
        var radian = this._faceDir < 0 ? Math.PI - this._aimRadian : this._aimRadian;
        var bullet = new DragonBullet();
        bullet.init(this.node.parent!, armature, effect, radian + Math.random() * 0.02 - 0.01, 40, firePoint);
        this.addBullet(bullet);
    }

    _updateAnimation () {
        if (this._isJumpingA) {
            return;
        }

        if (this._isSquating) {
            this._speedX = 0;
            this._armature.animation.fadeIn("squat", -1, -1, 0, NORMAL_ANIMATION_GROUP).resetToPose = false;
            this._walkState = null;
            return;
        }

        if (this._moveDir === 0) {
            this._speedX = 0;
            this._armature.animation.fadeIn("idle", -1, -1, 0, NORMAL_ANIMATION_GROUP).resetToPose = false;
            this._walkState = null;
        } else {
            if (!this._walkState) {
                this._walkState = this._armature.animation.fadeIn("walk", -1, -1, 0, NORMAL_ANIMATION_GROUP);
                this._walkState.resetToPose = false;
            }

            if (this._moveDir * this._faceDir > 0) {
                this._walkState.timeScale = MAX_MOVE_SPEED_FRONT / NORMALIZE_MOVE_SPEED;
            } else {
                this._walkState.timeScale = -MAX_MOVE_SPEED_BACK / NORMALIZE_MOVE_SPEED;
            }

            if (this._moveDir * this._faceDir > 0) {
                this._speedX = MAX_MOVE_SPEED_FRONT * this._faceDir;
            } else {
                this._speedX = -MAX_MOVE_SPEED_BACK * this._faceDir;
            }
        }
    }

    _updatePosition () {
        const camera = director.root!.ui.getFirstRenderCamera(this.node)!;
        const pos = this.node.getPosition();
        if (this._speedX !== 0) {
            pos.x += this._speedX;
            var minX = -camera.width / 2;
            var maxX = camera.width / 2;
            if (pos.x < minX) {
                pos.x = minX;
            } else if (pos.x > maxX) {
                pos.x = maxX;
            }
            this.node.setPosition(pos);

        }

        if (this._speedY != 0) {
            if (this._speedY > 5 && this._speedY + G <= 5) {
                this._armature.animation.fadeIn("jump_3", -1, -1, 0, NORMAL_ANIMATION_GROUP).resetToPose = false;
            }

            this._speedY += G;
            pos.y += this._speedY;
            if (pos.y < GROUND) {
                pos.y = GROUND;
                this._speedY = 0;
                this._armature.animation.fadeIn("jump_4", -1, -1, 0, NORMAL_ANIMATION_GROUP).resetToPose = false;
            }
            this.node.setPosition(pos);
        }
    }

    _updateAim () {
        if (!this._mouseDown_) return;

        if (this._aimDir === 0) {
            return;
        }
        const pos = this.node.getPosition();
        const scale = this.node.getScale();

        this._faceDir = this._target.x > pos.x ? 1 : -1;
        if (scale.x * this._faceDir < 0) {
            scale.x *= -1;
            if (this._moveDir) {
                this._updateAnimation();
            }
            this.node.setScale(scale);
        }

        var aimOffsetY = this._armature.getBone("chest").global.y * scale.y;

        if (this._faceDir > 0) {
            this._aimRadian = Math.atan2(this._target.y - pos.y - aimOffsetY, this._target.x - pos.x);
        } else {
            this._aimRadian = Math.PI - Math.atan2(this._target.y - pos.y - aimOffsetY, this._target.x - pos.x);
            if (this._aimRadian > Math.PI) {
                this._aimRadian -= Math.PI * 2;
            }
        }

        let aimDir = 0;
        if (this._aimRadian > 0) {
            aimDir = 1;
        } else {
            aimDir = -1;
        }

        if (this._aimDir != aimDir) {
            this._aimDir = aimDir;

            // Animation mixing.
            if (this._aimDir >= 0) {
                this._aimState = this._armature.animation.fadeIn(
                    "aim_up", -1.0, -1,
                    0, AIM_ANIMATION_GROUP);
            } else {
                this._aimState = this._armature.animation.fadeIn(
                    "aim_down", -1.0, -1,
                    0, AIM_ANIMATION_GROUP);
            }

            this._aimState.resetToPose = false;
        }

        this._aimState.weight = Math.abs(this._aimRadian / Math.PI * 2);

        //_armature.invalidUpdate("pelvis"); // Only update bone mask.
        this._armature.invalidUpdate();
    }

    _updateAttack () {
        if (!this._isAttackingA || this._isAttackingB) {
            return;
        }

        this._isAttackingB = true;

        // Animation mixing.
        this._attackState = this._armature.animation.fadeIn(
            "attack_01", -1.0, -1,
            0, ATTACK_ANIMATION_GROUP, dragonBones.AnimationFadeOutMode.SameGroup
        );

        this._attackState.resetToPose = false;
        this._attackState.autoFadeOutTime = this._attackState.fadeTotalTime;
    }
}




@ccclass('DragonBullet')
export class DragonBullet {

    _speedX= 0;
    _speedY = 0;

    _armature: any =  null;
    _armatureDisplay: any =  null;
    _effect: any = null;

    init (parentNode: Node, armature: dragonBones.ArmatureDisplay, effect: any, radian: number, speed: number, position: Vec3) {
        this._speedX = Math.cos(radian) * speed;
        this._speedY = Math.sin(radian) * speed;
        var thePos = parentNode._uiProps.uiTransformComp!.convertToNodeSpaceAR(position);

        armature.playAnimation("idle");

        let armatureNode = armature.node;
        armatureNode.setPosition(thePos);
        armatureNode.angle = radian * macro.DEG;

        this._armature = armature;

        if (effect) {
            this._effect = effect;
            var effectDisplay = this._effect.node;
            effectDisplay.angle = radian * macro.DEG;
            effectDisplay.setPosition(thePos);
            effectDisplay.scaleX = 1 + Math.random() * 1;
            effectDisplay.scaleY = 1 + Math.random() * 0.5;
            if (Math.random() < 0.5) {
                effectDisplay.scaleY *= -1;
            }

            this._effect.playAnimation("idle");

            parentNode.addChild(effectDisplay);
        }

        parentNode.addChild(armatureNode);
    }

    update () {
        let armatureNode = this._armature.node as Node;
        const pos = armatureNode.getPosition();
        pos.x += this._speedX;
        pos.y += this._speedY;
        armatureNode.setPosition(pos);
        const uiTrans = armatureNode.parent!._uiProps.uiTransformComp!;
        var worldPos = uiTrans.convertToWorldSpaceAR(armatureNode.getPosition());
        const camera = director.root!.ui.getFirstRenderCamera(armatureNode)!;
        if (
            worldPos.x < -100 || worldPos.x >= camera.width + 100 ||
            worldPos.y < -100 || worldPos.y >= camera.height + 100
        ) {
            this.doClean();
            return true;
        }

        return false;
    }

    onDisable () {
        this.doClean();
    }

    doClean () {
        this._armature.node.removeFromParent();

        if (this._effect) {
            this._effect.node.removeFromParent();
        }
    }
}
