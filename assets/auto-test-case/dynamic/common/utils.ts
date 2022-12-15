
import { director, physics } from 'cc';
// @ts-ignore
import { captureOneImage, waitForNextFrame } from 'db://automation-framework/runtime/test-framework.mjs';

export async function screenshot_custom(dt?: number, imageName?: string) {
    const frame_time = physics.PhysicsSystem.instance.fixedTimeStep;
    if (dt) {
        for (let i = 0; i < dt; i++) {
            director.tick(physics.PhysicsSystem.instance.fixedTimeStep);
        }
    } else {
        director.tick(frame_time);
    }
    //director.tick(frame_time);
    director.pause();
    await captureOneImage(imageName);
    director.resume();
}

// by add lzh：等待帧截图
export async function screenshot_custom_by_wait(dt?: number, imageName?: string) {
    const frame_time = physics.PhysicsSystem.instance.fixedTimeStep;
    if (dt) {
        for (let i = 0; i < dt; i++) {
            await waitForNextFrame();
            //director.tick(physics.PhysicsSystem.instance.fixedTimeStep);
        }
    } else {
        //director.tick(frame_time);
        await waitForNextFrame();
    }
    //director.tick(frame_time);
    director.pause();
    await captureOneImage(imageName);
    director.resume();
}

export async function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}