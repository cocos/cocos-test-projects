import { _decorator, Component, Node, ParticleSystem2D, Tween, tween, Vec3, Label } from 'cc';
const { ccclass, type } = _decorator;

@ccclass('particle_2d_position_type_change')
export class particle_2d_position_type_change extends Component {
    @type(ParticleSystem2D)
    public particle: ParticleSystem2D = null!;

    @type(Label)
    public info: Label = null!;

    private _currIndex = 0;

    changePositionType() {
        this._currIndex = (++this._currIndex) % 3;
        this.particle.positionType = this._currIndex;
        this.updateInfo();
        this.particle.resetSystem();
    }

    start() {
        this._currIndex = this.particle.positionType;
        this.updateInfo();

        tween(this.particle.node)
            .to(1.0, { position: new Vec3(-200, -200, 0) })
            .to(1.0, { position: new Vec3(200, -200, 0) })
            .to(1.0, { position: new Vec3(200, 200, 0) })
            .to(1.0, { position: new Vec3(-200, 200, 0) })
            .union()
            .repeatForever()
            .start();
    }

    updateInfo() {
        if (this.particle.positionType == 0) {
            this.info.string = '当前positionType = FREE';
        } else if (this.particle.positionType == 1) {
            this.info.string = '当前positionType = RELATIVE';
        } else if (this.particle.positionType == 2) {
            this.info.string = '当前positionType = GROUPED';
        }
    }
}


