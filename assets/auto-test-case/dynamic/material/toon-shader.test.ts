import { Node, find, Quat, Button, EventHandler } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@testClass('ToonShader', 'toon-shader')
export class ToonShader {
    private camera!: Node;
    private button!: Button;
    private rotation: Quat = new Quat();

    @beforeClass
    async initData() {
        this.camera = find('Camera')!;
        this.button = find('New Canvas/New Button')?.getComponent(Button)!;
    }

    @testCase
    async start() {
        await screenshot_custom(2);
    }

    @testCase
    async play() {
        this.rotation.set(-0.15175081757278622, -0.2030666892855159, -0.03192307649835109, 0.9668073883951707);
        this.camera.setRotation(this.rotation);
        await screenshot_custom(2);

        this.rotation.set(-0.12909632210926186, -0.5602791053489442, -0.08898981798504704, 0.8133279019080372);
        this.camera.setRotation(this.rotation);
        await screenshot_custom(2);

        EventHandler.emitEvents(this.button.clickEvents, this.button);

        this.rotation.set(-0.16408273314219435, -0.3744167039941526, -0.06755481625429643, 0.9101238021585804);
        this.camera.setRotation(this.rotation);
        await screenshot_custom(2);

        this.rotation.set(-0.15175081757278622, -0.2030666892855159, -0.03192307649835109, 0.9668073883951707);
        this.camera.setRotation(this.rotation);
        await screenshot_custom(2);

        this.rotation.set(-0.12909632210926186, -0.5602791053489442, -0.08898981798504704, 0.8133279019080372);
        this.camera.setRotation(this.rotation);
        await screenshot_custom(2);
    }
}
