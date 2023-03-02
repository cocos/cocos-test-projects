import { _decorator, Component, Animation, Button, Node, EventTouch, Input, Vec3, CameraComponent, input, EventKeyboard, KeyCode } from "cc";
const { ccclass, property } = _decorator;

enum Direction {
    North,
    South,
    West,
    East,
}

@ccclass("PlayerBoxProjection")
export class PlayerBoxProjection extends Component {
    @property(Node)
    player: Node = null!;

    private _animation!: Animation;
    private _isWalking = false;
    private _forward = new Vec3(1, 0, 0);
    private _eulerAngle = new Vec3(0, 0, 0);
    private _speed = 0.015;
    private _followDelta = new Vec3(-15, 8, 0);
    private _minWalkPos = new Vec3(-100, 0, -50);
    private _maxWalkPos = new Vec3(1, 30, 45);

    start () {
        this.initAnim();
    }



    private initAnim() {
        this._animation = this.player.getComponent(Animation)!;
    }

    private setPlayerRotation(dir: Direction) {
        switch (dir) {
            case Direction.North:
                this._eulerAngle.set(0, 90, 0);
                break;
            case Direction.South:
                this._eulerAngle.set(0, -90, 0);
                break;
            case Direction.West:
                this._eulerAngle.set(0, 180, 0);
                break;
            case Direction.East:
                this._eulerAngle.set(0, 0, 0);
                break;
        }

        this.player.setRotationFromEuler(this._eulerAngle);
    }

    private setPlayerForward(dir: Direction) {
        switch (dir) {
            case Direction.North:
                this._forward.set(1, 0, 0);
                break;
            case Direction.South:
                this._forward.set(-1, 0, 0);
                break;
            case Direction.West:
                this._forward.set(0, 0, -1);
                break;
            case Direction.East:
                this._forward.set(0, 0, 1);
                break;
        }
    }

    private startWalking(dir: Direction) {
        this.setPlayerRotation(dir);
        this.setPlayerForward(dir);

        this._animation.crossFade("Take 001", 0.3);
        this._isWalking = true;
    }

    private stopWalking() {
        this._animation.stop();
        this._isWalking = false;
    }

    public onUpButtonTouchStart (event: EventTouch) {
        this.startWalking(Direction.North);
    }

    public onUpButtonTouchEnd (event: EventTouch) {
        this.stopWalking();
    }

    public onDownButtonTouchStart (event: EventTouch) {
        this.startWalking(Direction.South);
    }

    public onDownButtonTouchEnd (event: EventTouch) {
        this.stopWalking();
    }

    public onLeftButtonTouchStart (event: EventTouch) {
        this.startWalking(Direction.West);
    }

    public onLeftButtonTouchEnd (event: EventTouch) {
        this.stopWalking();
    }

    public onRightButtonTouchStart (event: EventTouch) {
        this.startWalking(Direction.East);
    }

    public onRightButtonTouchEnd (event: EventTouch) {
        this.stopWalking();
    }

    public onKeyboardDown (event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
                this.startWalking(Direction.North);
                break;
            case KeyCode.KEY_S:
                this.startWalking(Direction.South);
                break;
            case KeyCode.KEY_A:
                this.startWalking(Direction.West);
                break;
            case KeyCode.KEY_D:
                this.startWalking(Direction.East);
                break;
        }
    }

    public onKeyboardUp (event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
            case KeyCode.KEY_S:
            case KeyCode.KEY_A:
            case KeyCode.KEY_D:
                this.stopWalking();
                break;
        }
    }

    update (deltaTime: number) {
        if (!this._isWalking) {
            //return;
        }

        this.updatePlayerAndCamera();
    }

    private canWalkTo(position: Vec3) {
        return !(position.x > this._maxWalkPos.x || position.x < this._minWalkPos.x ||
            position.y > this._maxWalkPos.y || position.y < this._minWalkPos.y ||
            position.z > this._maxWalkPos.z || position.z < this._minWalkPos.z);
    }

    private updatePlayerAndCamera() {
        const position = new Vec3(0, 0, 0);
        Vec3.scaleAndAdd(position, this.player.getPosition(), this._forward, this._speed);
        if (!this.canWalkTo(position)) {
            return;
        }

        this.player.setPosition(position);
        //Vec3.add(position, position, this._followDelta);
        //this.camera.node.setPosition(position);
    }
}
