// 导入Player脚本
import player from "./Player";

import { _decorator, Component, Node, SystemEventType, EventMouse, Vec3, CCFloat, Vec2, EventTouch,animation,AnimationComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UI')
export class UI extends Component {


    @property({displayName: "Player脚本所在节点", tooltip: "Player脚本所在节点", type: player})
    player: player = null!;


    @property({
        displayName: "移动视角事件目标节点", 
        tooltip: "代码将把移动视角的事件绑定到这个节点上，推荐把这个节点的宽高设置成和canvas一样，并给四个方向加上widget", 
        type: Node
    })
    target: Node = null!;

    @property({displayName: "相机", tooltip: "相机", type: Node})
    camera: Node = null!;


    @property({displayName: "相机移动速度", tooltip: "相机移动速度", type: CCFloat})
    angle_speed: number = 0.1;

    @property({displayName: "跳跃的高度", tooltip: "跳跃的高度，代码会根据这个值设置角色刚体的Y线性速度", type: CCFloat})
    jump_height: number = 5;

    @property({displayName: "跳跃按钮禁用时间", tooltip: "按一次跳跃按钮禁用多长时间，单位是秒", type: CCFloat})
    jump_btn_time: number = 1;

    @property({displayName: "攻击按钮禁用时间", tooltip: "按一次攻击按钮禁用多长时间，单位是秒", type: CCFloat})
    attack_btn_time: number = 1;

    @property({displayName: "相机上下移动限制", tooltip: "限制相机X旋转，X是向上移动限制的角度，Y是向下移动限制的角度"})
    cam_att: Vec2 = new Vec2(-25, -50);

    @property({displayName: "动画控制", tooltip: "动画图所在节点", type: animation.AnimationController})
    animCtrl: animation.AnimationController = null!;

    // 是否可以跳跃
    is_jump: boolean = true;
    is_attack: boolean = true;

    onLoad () {
        let self = this;

        // 给canvas绑定触摸移动事件
        this.target.on(SystemEventType.TOUCH_MOVE, function (e: EventTouch) {
            
            // 获取鼠标距离上一次事件移动的距离对象，对象包含 x 和 y 属性
            let D = e.getDelta();

            
            // 上下左右移动视角
            // 左右移动视角是移动角色的Y旋转
            if (D.x < 0) {
                self.player.node.eulerAngles = self.player.node.eulerAngles.add3f(0, -D.x * self.angle_speed , 0);
            } else if (D.x > 0) {
                self.player.node.eulerAngles = self.player.node.eulerAngles.add3f(0, -D.x * self.angle_speed, 0);
            }

            // 上下移动视角是移动相机的X旋转
            if (D.y < 0) {
                self.camera.eulerAngles = self.camera.eulerAngles.add3f(D.y * self.angle_speed, 0, 0);
            } else if (D.y > 0) {
                self.camera.eulerAngles = self.camera.eulerAngles.add3f(D.y * self.angle_speed, 0, 0);
            }


            // 限制相机上下移动范围
            let angle = self.camera.eulerAngles;
            if (self.camera.eulerAngles.x > self.cam_att.x) {
                self.camera.eulerAngles = new Vec3(self.cam_att.x, angle.y, angle.z);
            }
            if (self.camera.eulerAngles.x < self.cam_att.y) {
                self.camera.eulerAngles = new Vec3(self.cam_att.y, angle.y, angle.z);
            }

        }, this);
    }


    // 跳跃按钮专用函数
    onbtn_jump () {
        if (this.is_jump == true) {
            // 获取角色移动向量
            let vc = new Vec3(0, 0, 0);
            this.player.player.getLinearVelocity(vc);
            // 设置角色Y的移动向量，让角色跳起来
            this.player.player.setLinearVelocity(new Vec3(vc.x, this.jump_height, vc.z));
            console.log("点击了跳跃按钮");

            this.animCtrl.setValue('Jump', true)

            let self = this;
            // 不可以再次跳跃
            this.is_jump = false;
            // 规定时间后恢复跳跃
            this.scheduleOnce(function () {
                self.is_jump = true;
            }, this.jump_btn_time);
        }
    }

    // 攻击按钮专用函数
    onbtn_attack () {
        if (this.is_attack == true) {

            console.log("点击了攻击按钮");

            this.animCtrl.setValue('Attack', true)

            let self = this;
            // 不可以再次跳跃
            this.is_attack = false;
            // 规定时间后恢复跳跃
            this.scheduleOnce(function () {
                self.is_attack = true;
            }, this.attack_btn_time);
        }
    }
    
}