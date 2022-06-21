
// 导入Joystick脚本
import joy from "./Joystick"

import { _decorator, Component, Node, CCLoader, CCFloat, Vec2, log, RigidBody, RigidBodyComponent, Vec3, math,animation, AnimationComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export default class Player extends Component {


    @property({displayName: "摇杆脚本所在节点", tooltip: "摇杆脚本Joystick所在脚本", type: joy})
    joy: joy = null!;


    @property({displayName: "角色", tooltip: "角色", type: RigidBodyComponent})
    player: RigidBodyComponent = null!;

    @property({displayName: "动画控制", tooltip: "动画图所在节点", type: animation.AnimationController})
    animCtrl: animation.AnimationController = null!;

    @property({displayName: "是否禁锢角色", tooltip: "是否禁锢角色，如果角色被禁锢，角色就动不了了"})
    is_fbd_player: boolean = false;


    @property({displayName: "角色移动速度", tooltip: "角色移动速度，不建议太大，1-10最好", type: CCFloat})
    speed: number = 3;


    // 角色的移动向量
    vector: Vec2 = new Vec2(0, 0);


    update () {
        // console.log("vector", this.vector.toString());
        

        // 如果没有禁锢角色
        if (this.is_fbd_player == false) {
            // 获取角色目标移动向量
            this.vector = this.joy.vector;
            // 归一化
            let dir = this.vector.normalize();
            // 乘速度
            let x = dir.x * this.speed;
            let y = dir.y * this.speed;

            this.animCtrl.setValue('VelocityX', x)
            console.log(`VelocityX now: ${x}`);

            this.animCtrl.setValue('VelocityY', y)
            console.log(`VelocityY now: ${y}`);
            // 获取角色当前移动向量
            let vc = new Vec3(0, 0, 0);
            this.player.getLinearVelocity(vc);
            // 结合成角色最终移动向量，因为摇杆获取的是Y轴，而最终设置的线性速度应该是Z轴，所以最后一个参数是负的
            let vec = new Vec3(x, vc.y, -y);

            // 向量四元数乘法
            Vec3.transformQuat(vec, vec, this.player.node.getRotation());

            // 设置角色移动向量
            this.player.setLinearVelocity(vec);
        }


    }



}