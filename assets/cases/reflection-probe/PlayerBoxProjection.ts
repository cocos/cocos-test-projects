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
    private _speed = 0.014;
    private _minWalkPos = new Vec3(-10, 0, 0);
    private _maxWalkPos = new Vec3(7, 0, 0);

    start () {
        this.initAnim();
    }

    private initAnim() {
        this._animation = this.player.getComponentInChildren(Animation)!;
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

        this._isWalking = true;
    }

    private stopWalking() {
        this._animation.stop();
        this._isWalking = false;
    }

    update (deltaTime: number) {
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
            if(this._forward.x===-1)
            {
                this.startWalking(Direction.North);
            }else{
                this.startWalking(Direction.South);
            }
            return;
        }

        this.player.setPosition(position);
    }
}
