
import { Camera, game, director, math, physics, Vec3 } from 'cc';
// @ts-ignore
import { captureOneImage, waitForNextFrame, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';

export async function screenshot_custom(dt?: number, imageName?: string) {
    await screenshot(dt, imageName);
    // const frame_time = physics.PhysicsSystem.instance.fixedTimeStep;
    // if (dt) {
    //     for (let i = 0; i < dt; i++) {
    //         director.tick(physics.PhysicsSystem.instance.fixedTimeStep);
    //     }
    // } else {
    //     director.tick(frame_time);
    // }
    // //director.tick(frame_time);
    // director.pause();
    // await captureOneImage(imageName);
    // director.resume();
}

// add by lzh
export async function screenshot_custom_by_wait(dt?: number, imageName?: string) {
    await screenshot(dt, imageName);
    // const frame_time = physics.PhysicsSystem.instance.fixedTimeStep;
    // if (dt) {
    //     for (let i = 0; i < dt; i++) {
    //         await waitForNextFrame();
    //         //director.tick(physics.PhysicsSystem.instance.fixedTimeStep);
    //     }
    // } else {
    //     //director.tick(frame_time);
    //     await waitForNextFrame();
    // }
    // //director.tick(frame_time);
    // director.pause();
    // await captureOneImage(imageName);
    // // director.resume();
}

async function screenshot(afterFrames?: number, imageName?: string) {
    if (afterFrames) {
        afterFrames -= 1;
        await waitForFrames(afterFrames);
    }

    await captureOneImage(imageName);
}

// add by lzh: zoom
export function mouse_wheel_by_delta (delta=1, camera:any) {
    const v3_1 = new Vec3();
    Vec3.transformQuat(v3_1, Vec3.UNIT_Z, camera.node.rotation);
    Vec3.scaleAndAdd(camera._position, camera.node.position, v3_1, delta);
}

export async function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}