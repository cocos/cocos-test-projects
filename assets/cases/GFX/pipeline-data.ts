import { cclegacy, renderer, gfx } from "cc";

export class WindowInfo {
    constructor (id: number, width: number, height: number, framebuffer: gfx.Framebuffer) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.framebuffer = framebuffer;
    }
    id = 0xFFFFFFFF;
    width = 0;
    height = 0;
    framebuffer: gfx.Framebuffer;
}

if (cclegacy.user === undefined) {
    cclegacy.user = new Object();
    cclegacy.user.windowID = 0;
    cclegacy.user.windows = new WeakMap<Object, WindowInfo>();
}

export function getWindowInfo(camera: renderer.scene.Camera): WindowInfo {
    let info = cclegacy.user.windows.get(camera.window);
    if (info !== undefined) {
        return info;
    }
    info = new WindowInfo(cclegacy.user.windowID, 0, 0, camera.window.framebuffer);
    ++cclegacy.user.windowID;
    cclegacy.user.windows.set(camera.window, info);
    return info;
}

export function needClearColor(camera: renderer.scene.Camera): boolean {
    return !!(camera.clearFlag & (gfx.ClearFlagBit.COLOR | (gfx.ClearFlagBit.STENCIL << 1)));
}
