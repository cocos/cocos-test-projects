
import { _decorator, Component, Node, MotionStreak, Texture2D, Animation, Color } from 'cc';
const { ccclass, type } = _decorator;

@ccclass('MotionStreakCtrl')
export class MotionStreakCtrl extends Component {
    @type(MotionStreak)
    motionStreak: MotionStreak | null = null;

    @type(Texture2D)
    newTexture: Texture2D | null = null;

    @type(Animation)
    animationCom: Animation | null = null;

    private _changed: boolean = true;
    private _oldTexture: Texture2D | null = null;

    private _colorChanged: boolean = false;
    private _newColor = Color.CYAN;
    private _oldColor = Color.WHITE;

    onLoad () {
        this._changed = true;
        this._oldTexture = this.motionStreak!.texture;
        this._colorChanged = false;
    }

    onClick () {
        if (this._changed) {
            this.setMotionStreak(2, 3, 20, this.newTexture!);
        }
        else {
            this.setMotionStreak(0.5, 1, 30, this._oldTexture!);
        }
        this._changed = !this._changed;
    }

    colorChange () {
        this._colorChanged = !this._colorChanged;
        if (this._colorChanged) {
            this.motionStreak!.color = this._newColor;
        } else {
            this.motionStreak!.color = this._oldColor;
        }
    }

    setMotionStreak (fadeTime: number, minSeg: number, stroke: number, texture: Texture2D) {
        this.motionStreak!.fadeTime = fadeTime;
        this.motionStreak!.minSeg = minSeg;
        this.motionStreak!.stroke = stroke;
        this.motionStreak!.texture = texture;
    }

    lateUpdate () {
        if (!this.animationCom!.getState('move_around').isPlaying) {
            this.animationCom!.play();
        }
    }

    onDisable () {
        this.animationCom!.stop();
    }
}
