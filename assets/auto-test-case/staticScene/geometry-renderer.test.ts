// @ts-ignore
import { find, Toggle } from "cc";
import { runScene, testCase, testClass, beforeClass } from "db://automation-framework/runtime/test-framework.mjs";
import { screenshot_custom } from "../dynamic/common/utils";

@runScene("geometry-renderer")
@testClass('GeometryRenderer')
export class GeometryRenderer {
    dt = 40;
    toggle: Toggle | undefined;
    geometryRenderer: Toggle | undefined;
    depthTest: Toggle | undefined;
    toggleUnlit: Toggle | undefined;
    toggleRotate: Toggle | undefined;

    @beforeClass
    async initData() {
        this.geometryRenderer = this.getToggle("Canvas/ToggleWireframe", "cc.Toggle");
        this.depthTest = this.getToggle("Canvas/ToggleDepthTest", "cc.Toggle");
        this.toggleUnlit = this.getToggle("Canvas/ToggleUnlit", "cc.Toggle");
        this.toggleRotate = this.getToggle("Canvas/ToggleRotate", "cc.Toggle");
    }

    @testCase
    async startPlay() {
        await screenshot_custom(this.dt);
    }

    @testCase
    async wireframe() {
        this.geometryRenderer!.isChecked = true;
        await screenshot_custom();
        this.geometryRenderer!.isChecked = false;
    }

    @testCase
    async depthTests() {
        this.depthTest!.isChecked = true;
        await screenshot_custom();
        this.depthTest!.isChecked = false;
    }

    @testCase
    async toggleUnlits() {
        this.toggleUnlit!.isChecked = true;
        await screenshot_custom();
        this.toggleUnlit!.isChecked = false;
    }

    @testCase
    async toggleRotates() {
        this.toggleRotate!.isChecked = true;
        await screenshot_custom();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this.dt - 15);
        }
        await screenshot_custom(this.dt);
        this.toggleRotate!.isChecked = false;
    }

    @testCase
    async checkAll() {
        this.geometryRenderer!.isChecked = true;
        this.depthTest!.isChecked = true;
        this.toggleUnlit!.isChecked = true;
        this.toggleRotate!.isChecked = true;
        await screenshot_custom();
    }

    getToggle(node: string, componentName: string) {
        //@ts-ignore
        this.toggle = find(node)!.getComponent(componentName);
        if (!this.toggle) {
            this.retry(node, componentName, 3);
        }
        return this.toggle;
    }

    retry(node: string, componentName: string, tryNum?: number) {
        for (let i = 0; i < tryNum!; i++) {
            //@ts-ignore
            this.toggle = find(node)!.getComponent(componentName);
            if (this.toggle) {
                return;
            } else {
                continue;
            }
        }
    }
}
