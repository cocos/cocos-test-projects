import { find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

// @runScene('material')
// @testClass('Material')
export class Material {
    _dt = 5;

    // @testCase
    async startPlay() {
        await screenshot_custom(0);
    }


    // @testCase
    async cullFrontFace_FRONT() {
        // @ts-ignore
        find('Sphere').getComponent('MaterialTest')._material.overridePipelineStates({
            rasterizerState: {
                cullMode: 1,
            }
        });
        await screenshot_custom(this._dt);
    }

    // @testCase
    async cullFrontFace_BACK() {
        // @ts-ignore
        find('Sphere').getComponent('MaterialTest')._material.overridePipelineStates({
            rasterizerState: {
                cullMode: 2,
            }
        });
        await screenshot_custom(this._dt);
    }

    // @testCase
    async useAlbedoMap_False() {
        // @ts-ignore
        find('Sphere').getComponent('MaterialTest')._material.recompileShaders({ USE_ALBEDO_MAP: false });
        await screenshot_custom(this._dt);
    }

    // @testCase
    async useAlbedoMap_True() {
        // @ts-ignore
        find('Sphere').getComponent('MaterialTest')._material.recompileShaders({ USE_ALBEDO_MAP: true });
        await screenshot_custom(this._dt);
    }

    // @testCase
    // async setAlbedo_0_0() {
    //     await screenshot_custom(this._dt);
    // }

    // @testCase
    // async setAlbedo_0_5() {
    //     await screenshot_custom(this._dt);
    // }

    // @testCase
    // async setAlbedo_1_0() {
    //     await screenshot_custom(this._dt);
    // }

    // @testCase
    async useMetallicMap_False() {
        // @ts-ignore
        find('Sphere').getComponent('MaterialTest')._material.recompileShaders({ USE_METALLIC_ROUGHNESS_MAP: false });
        await screenshot_custom(this._dt);
    }

    // @testCase
    async useMetallicMap_True() {
        // @ts-ignore
        find('Sphere').getComponent('MaterialTest')._material.recompileShaders({ USE_METALLIC_ROUGHNESS_MAP: true });
        await screenshot_custom(this._dt);
    }

    // @testCase
    async setMetallic_00() {
        // @ts-ignore
        find('Sphere').getComponent('MaterialTest')._material.setProperty('metallic', 0)
        await screenshot_custom(this._dt);
    }

    // @testCase
    async setMetallic_05() {
        // @ts-ignore
        find('Sphere').getComponent('MaterialTest')._material.setProperty('metallic', 0.5)
        await screenshot_custom(this._dt);
    }

    // @testCase
    async setMetallic_10() {
        // @ts-ignore
        find('Sphere').getComponent('MaterialTest')._material.setProperty('metallic', 1)
        await screenshot_custom(this._dt);
    }

    // @testCase
    async useAlphaTest_False() {
        // @ts-ignore
        find('Sphere').getComponent('MaterialTest')._material.recompileShaders({ USE_ALPHA_TEST: false })
        await screenshot_custom(this._dt);
    }


    // @testCase
    async useAlphaTest_True() {
        // @ts-ignore
        find('Sphere').getComponent('MaterialTest')._material.recompileShaders({ USE_ALPHA_TEST: true })
        await screenshot_custom(this._dt);
    }

    // @testCase
    async setAlphaThreshold_00() {
        // @ts-ignore
        find('Sphere').getComponent('MaterialTest')._material.setProperty('alphaThreshold', 0)
        await screenshot_custom(this._dt);
    }

    // @testCase
    async setAlphaThreshold_05() {
        // @ts-ignore
        find('Sphere').getComponent('MaterialTest')._material.setProperty('alphaThreshold', 0.5)
        await screenshot_custom(this._dt);
    }

    // @testCase
    async setAlphaThreshold_10() {
        // @ts-ignore
        find('Sphere').getComponent('MaterialTest')._material.setProperty('alphaThreshold', 1)
        await screenshot_custom(this._dt);
    }
}