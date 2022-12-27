// @ts-ignore
import { find, Vec3 } from "cc";
// @ts-ignore
import { runScene, testCase, testClass, beforeClass, sleep } from "db://automation-framework/runtime/test-framework.mjs";
import { screenshot_custom, screenshot_custom_by_wait } from "../common/utils";

@runScene("boxes-batched")
@testClass("BoxesBatched")
export class BoxesBatched {
    _dt = 3;
    firstPersonCamera : any;

    @beforeClass
    async initData(){
        //@ts-ignore
        this.firstPersonCamera = find('Camera').getComponent('first-person-camera');
        if(!this.firstPersonCamera){
            await sleep(5);
            //@ts-ignore
            this.firstPersonCamera = find('Camera').getComponent('first-person-camera');
        }
    }

    @testCase
    async start() {
        await screenshot_custom();
    }

    @testCase
    async play_0() {
        //@ts-ignore
        find("New Canvas/New Slider").getComponent("cc.Slider").progress = 0;
        //@ts-ignore
        find("Camera").getComponent("BatchTester").setCount(find("New Canvas/New Slider").getComponent("cc.Slider"));
        await screenshot_custom(this._dt);
    }

    @testCase
    async play_05() {
        //@ts-ignore
        find("New Canvas/New Slider").getComponent("cc.Slider").progress = 0.3;
        //@ts-ignore
        find("Camera").getComponent("BatchTester").setCount(find("New Canvas/New Slider").getComponent("cc.Slider"));
        await screenshot_custom(this._dt);
    }

    @testCase
    async play_07() {
        //@ts-ignore
        find("New Canvas/New Slider").getComponent("cc.Slider").progress = 0.7;
        //@ts-ignore
        find("Camera").getComponent("BatchTester").setCount(find("New Canvas/New Slider").getComponent("cc.Slider"));
        await screenshot_custom(this._dt);
    }

    @testCase
    async play_10() {
        //@ts-ignore
        find("New Canvas/New Slider").getComponent("cc.Slider").progress = 1;
        //@ts-ignore
        find("Camera").getComponent("BatchTester").setCount(find("New Canvas/New Slider").getComponent("cc.Slider"));
        await screenshot_custom(this._dt);
    }

    @testCase
    async bigScales(){
        await this.onMouseWheel(500);
        
        await screenshot_custom_by_wait(this._dt*10);
    }

    @testCase
    async mallScale(){
        await this.onMouseWheel(-500); 
        //负数为缩小，正数为放大
        await screenshot_custom_by_wait(this._dt*10);
    }

    @testCase
    async changePosition(){
       this.firstPersonCamera._euler={x: -36.125, y: -200.25, z: 0}
       await screenshot_custom_by_wait(this._dt*10);
    }

    public onMouseWheel (delta:number) {
        let v3_1=new Vec3();
        Vec3.transformQuat(v3_1, Vec3.UNIT_Z, this.firstPersonCamera.node.rotation);
        Vec3.scaleAndAdd(this.firstPersonCamera!._position, this.firstPersonCamera.node.position, v3_1, delta);
    }


    // public onMouseWheel (delta=1) {
    //     //const delta = -e.getScrollY() * this.moveSpeed * 0.01; // delta is positive when scroll down
    //     return new Promise((resolve, reject)=>{
    //       const v3_1 = new Vec3();
    //       Vec3.transformQuat(v3_1, Vec3.UNIT_Z, this.firstPersonCamera.node.rotation);
    //       Vec3.scaleAndAdd(this.firstPersonCamera._position, this.firstPersonCamera.node.position, v3_1, delta);
    //       resolve("ok")
    //     });
    
    //   }
}
