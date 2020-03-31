import { _decorator, Component, Node, Vec3, LabelComponent, ButtonComponent, Color, color, Mat4 } from 'cc';
import { button } from './pauseButton';
const { ccclass, property } = _decorator;

@ccclass('mathTest')
export class mathTest extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property({
        type: LabelComponent
    })
    label:LabelComponent = null;
    @property({
        type: ButtonComponent
    })
    button:ButtonComponent = null;

    start () {
        // Your initialization goes here.
        if(!this.label || !this.button) {
            console.error('Need a label component and a button');
        }
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

    testMath() {
        this.button.interactable = false;
        this.label.string = '';
        this.testVec3Creat();
        this.testVec3Call();
        this.testColorCreat();
        this.testColorCall();
        this.testMat4Creat();
        this.testMat4Call();
        this.button.interactable = true;
    }

    testVec3Creat() {
        let tempVec3 = [];
        const num = 100000;
        const t1 = Date.now();
        for(let i = 0; i < num; i++) {
            tempVec3[i] = new Vec3(1,2,3);
        }
        const t2 = Date.now();
        console.log(`Created ${num} times Vec3 spend: ${t2 - t1}ms`);
        this.label.string += `Created ${num} times Vec3 spend: ${t2 - t1}ms`;
        tempVec3 = [];
    }

    testVec3Call() {
        let tempVec3 = new Vec3(1,2,3);
        const num = 1000000;
        const t1 = Date.now();
        for(let i = 0; i < num; i++) {
            tempVec3.x = tempVec3.x + tempVec3.x * Math.random();
            tempVec3.y = tempVec3.y + tempVec3.y * Math.random();
            tempVec3.z = tempVec3.z + tempVec3.z * Math.random();
            tempVec3.x = 1;
            tempVec3.y = 2;
            tempVec3.z = 3;
        }
        const t2 = Date.now();
        console.log(`Call ${num} times Vec3 spend: ${t2 - t1}ms`);
        this.label.string += `\n Call ${num} times Vec3 spend: ${t2 - t1}ms`;
    }

    testColorCreat() {
        let tempColor = [];
        const num = 100000;
        const t1 = Date.now();
        for(let i = 0; i < num; i++) {
            tempColor[i] = new Color();
        }
        const t2 = Date.now();
        console.log(`Created ${num} times Color spend: ${t2 - t1}ms`);
        this.label.string += `\n Created ${num} times Color spend: ${t2 - t1}ms`;
        tempColor = [];
    }

    testColorCall() {
        let tempColor = new Color();
        const num = 1000000;
        const t1 = Date.now();
        for(let i = 0; i < num; i++) {
            tempColor.r = tempColor.r * Math.random();
            tempColor.g = tempColor.g * Math.random();
            tempColor.r = tempColor.r * Math.random();
            tempColor.a = tempColor.a * Math.random();
            tempColor.r = 255;
            tempColor.g = 255;
            tempColor.b = 255;
            tempColor.a = 255;
        }
        const t2 = Date.now();
        console.log(`Call ${num} times Color spend: ${t2 - t1}ms`);
        this.label.string += `\n Call ${num} times Color spend: ${t2 - t1}ms`;
    }

    testMat4Creat() {
        let tempMat4 = [];
        const num = 100000;
        const t1 = Date.now();
        for(let i = 0; i < num; i++) {
            tempMat4[i] = new Mat4();
        }
        const t2 = Date.now();
        console.log(`Created ${num} times Mat4 spend: ${t2 - t1}ms`);
        this.label.string += `\n Created ${num} times Mat4 spend: ${t2 - t1}ms`;
        tempMat4 = [];
    }

    testMat4Call() {
        let tempMat4 = new Mat4();
        const num = 1000000;
        const t1 = Date.now();
        for(let i = 0; i < num; i++) {
            tempMat4.m00 = tempMat4.m00 + tempMat4.m00 * Math.random();
            tempMat4.m01 = tempMat4.m01 + tempMat4.m01 * Math.random();
            tempMat4.m02 = tempMat4.m02 + tempMat4.m02 * Math.random();
            tempMat4.m03 = tempMat4.m03 + tempMat4.m03 * Math.random();
            tempMat4.m04 = tempMat4.m04 + tempMat4.m04 * Math.random();
            tempMat4.m05 = tempMat4.m05 + tempMat4.m05 * Math.random();
            tempMat4.m06 = tempMat4.m06 + tempMat4.m06 * Math.random();
            tempMat4.m07 = tempMat4.m07 + tempMat4.m07 * Math.random();
            tempMat4.m08 = tempMat4.m08 + tempMat4.m08 * Math.random();
            tempMat4.m09 = tempMat4.m09 + tempMat4.m09 * Math.random();
            tempMat4.m10 = tempMat4.m10 + tempMat4.m10 * Math.random();
            tempMat4.m11 = tempMat4.m11 + tempMat4.m11 * Math.random();
            tempMat4.m12 = tempMat4.m12 + tempMat4.m12 * Math.random();
            tempMat4.m13 = tempMat4.m13 + tempMat4.m13 * Math.random();
            tempMat4.m14 = tempMat4.m14 + tempMat4.m14 * Math.random();
            tempMat4.m15 = tempMat4.m15 + tempMat4.m15 * Math.random();
            tempMat4.m00 = 0;
            tempMat4.m01 = 1;
            tempMat4.m02 = 2;
            tempMat4.m03 = 3;
            tempMat4.m04 = 4;
            tempMat4.m05 = 5;
            tempMat4.m06 = 6;
            tempMat4.m07 = 7;
            tempMat4.m08 = 8;
            tempMat4.m09 = 9;
            tempMat4.m10 = 10;
            tempMat4.m11 = 11;
            tempMat4.m12 = 12;
            tempMat4.m13 = 13;
            tempMat4.m14 = 14;
            tempMat4.m15 = 15;
        }
        const t2 = Date.now();
        console.log(`Call ${num} times Mat4 spend: ${t2 - t1}ms`);
        this.label.string += `\n Call ${num} times Mat4 spend: ${t2 - t1}ms`;
    }
}
