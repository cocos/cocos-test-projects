import { Component, find, game, Toggle } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { MaterialTest } from '../../../cases/material/material-test';
import { screenshot_custom } from '../common/utils';

@runScene('material')
@testClass('Material')
export class Material {
    _dt = 5;
    material!: MaterialTest | Object;
    albedoToggle!: Toggle;
    testData!: TestData;
    toggle!: Toggle;
    manualAlbedoSlider!: Component | Toggle;
    manualAlbedoLabel!: Toggle;
    metallicToggle!: Toggle;
    metallicSlider!: Toggle;
    metallicLabel!: Toggle;

    @beforeClass
    async initData(){
        this.testData = {
            isChecked: true,
            tickTime: 20,
            progress: 1.0,
        }
        this.material = this.getComponent("Sphere", "MaterialTest");
        this.albedoToggle = this.getComponent("Canvas/Albedo/Toggle", "cc.Toggle");
        this.manualAlbedoSlider = this.getComponent("Canvas/Albedo/manual albedo/Slider", "cc.Slider");
        this.manualAlbedoLabel = this.getComponent("Canvas/Albedo/manual albedo/Label", "cc.Label");
        this.metallicToggle = this.getComponent("Canvas/Metallic/Toggle", "cc.Toggle");
        this.metallicSlider = this.getComponent("Canvas/Metallic/manual metallic/Slider", "cc.Slider");
        this.metallicLabel = this.getComponent("Canvas/Metallic/manual metallic/Label", "cc.Label");
        
    }

    @testCase
    async startPlay() {
        await screenshot_custom();
    }

    @testCase
    async albedoChecked(){
        //@ts-ignore 
        this.albedoToggle!.isChecked = !this.testData.isChecked;
        await screenshot_custom();
    }


    @testCase
    async albedoSilder(){
        // //progress 0
        this.testData.progress = 0.0;
        //@ts-ignore 
        this.manualAlbedoSlider.progress = this.testData.progress;
        this.material.setAlbedo(this.manualAlbedoSlider)
        // this.manualAlbedoLabel.string = "0.0";
        await screenshot_custom(this.testData.tickTime);

        // //progress 0.5
        // this.testData.progress = 0.5;
        // //@ts-ignore 
        // this.manualAlbedoSlider.progress = this.testData.progress;
        // this.manualAlbedoLabel.string = "0.5";
        // await screenshot_custom(this.testData.tickTime);

        // //progress 1
        // this.testData.progress = 1.0;
        // //@ts-ignore 
        // this.manualAlbedoSlider.progress = this.testData.progress;
        // this.manualAlbedoLabel.string = "1.0";
        // await screenshot_custom(this.testData.tickTime);

        // //resume checkbox
        // this.albedoToggle!.isChecked = this.testData.isChecked;
    }


    // @testCase
    // async metallicChecked(){
    //     this.metallicToggle.isChecked = !this.testData.isChecked;
    //     await screenshot_custom(this.testData.tickTime);
    // }

    // @testCase
    // async metallicSliders(){
    //      //progress 0
    //      this.testData.progress = 0.0;
    //      //@ts-ignore 
    //      this.metallicSlider.progress = this.testData.progress;
    //      this.metallicLabel.string = "0.0";
    //      await screenshot_custom(this.testData.tickTime);


    //     //progress 0.5
    //     this.testData.progress = 0.5;
    //     //@ts-ignore 
    //     this.metallicSlider.progress = this.testData.progress;
    //     this.metallicLabel.string = "0.5";
    //     await screenshot_custom(this.testData.tickTime);

    //      //progress 1.0
    //      this.testData.progress = 1.0;
    //      //@ts-ignore 
    //      this.metallicSlider.progress = this.testData.progress;
    //      this.metallicLabel.string = "1.0";
    //      await screenshot_custom(this.testData.tickTime);

    //      //reset checked
    //      this.metallicToggle.isChecked = this.testData.isChecked;
    // }


    // @testCase
    // async alphaTests(){

    // }



    getComponent(node: string, componentName: string){
    //@ts-ignore
    this.toggle = find(node).getComponent(componentName);
    if(!this.toggle){
        this.retry(node, componentName, 3)
    }
    return this.toggle;
    }

    retry(node: string, componentName: string, tryNum?: number){
        for(let i=0; i < tryNum!; i++){
            //@ts-ignore
            this.toggle = find(node).getComponent(componentName);
            if(this.toggle){
                return;
            }else{
                continue;
            }
        }
    }

//     @testCase
//     async cullFrontFace_FRONT() {
//         // @ts-ignore
//         find('Sphere').getComponent('MaterialTest')._material.overridePipelineStates({
//             rasterizerState: {
//                 cullMode: 1,
//             }
//         });
//         await screenshot_custom(this._dt);
//     }

//     @testCase
//     async cullFrontFace_BACK() {
//         // @ts-ignore
//         find('Sphere').getComponent('MaterialTest')._material.overridePipelineStates({
//             rasterizerState: {
//                 cullMode: 2,
//             }
//         });
//         await screenshot_custom(this._dt);
//     }

//     @testCase
//     async useAlbedoMap_False() {
//         // @ts-ignore
//         find('Sphere').getComponent('MaterialTest')._material.recompileShaders({ USE_ALBEDO_MAP: false });
//         await screenshot_custom(this._dt);
//     }

//     @testCase
//     async useAlbedoMap_True() {
//         // @ts-ignore
//         find('Sphere').getComponent('MaterialTest')._material.recompileShaders({ USE_ALBEDO_MAP: true });
//         await screenshot_custom(this._dt);
//     }

//     @testCase
//     async setAlbedo_0_0() {
//         await screenshot_custom(this._dt);
//     }

//     @testCase
//     async setAlbedo_0_5() {
//         await screenshot_custom(this._dt);
//     }

//     @testCase
//     async setAlbedo_1_0() {
//         await screenshot_custom(this._dt);
//     }

//     @testCase
//     async useMetallicMap_False() {
//         // @ts-ignore
//         find('Sphere').getComponent('MaterialTest')._material.recompileShaders({ USE_METALLIC_ROUGHNESS_MAP: false });
//         await screenshot_custom(this._dt);
//     }

//     @testCase
//     async useMetallicMap_True() {
//         // @ts-ignore
//         find('Sphere').getComponent('MaterialTest')._material.recompileShaders({ USE_METALLIC_ROUGHNESS_MAP: true });
//         await screenshot_custom(this._dt);
//     }

//     @testCase
//     async setMetallic_00() {
//         // @ts-ignore
//         find('Sphere').getComponent('MaterialTest')._material.setProperty('metallic', 0)
//         await screenshot_custom(this._dt);
//     }

//     @testCase
//     async setMetallic_05() {
//         // @ts-ignore
//         find('Sphere').getComponent('MaterialTest')._material.setProperty('metallic', 0.5)
//         await screenshot_custom(this._dt);
//     }

//     @testCase
//     async setMetallic_10() {
//         // @ts-ignore
//         find('Sphere').getComponent('MaterialTest')._material.setProperty('metallic', 1)
//         await screenshot_custom(this._dt);
//     }

//     @testCase
//     async useAlphaTest_False() {
//         // @ts-ignore
//         find('Sphere').getComponent('MaterialTest')._material.recompileShaders({ USE_ALPHA_TEST: false })
//         await screenshot_custom(this._dt);
//     }


//     @testCase
//     async useAlphaTest_True() {
//         // @ts-ignore
//         find('Sphere').getComponent('MaterialTest')._material.recompileShaders({ USE_ALPHA_TEST: true })
//         await screenshot_custom(this._dt);
//     }

//     @testCase
//     async setAlphaThreshold_00() {
//         // @ts-ignore
//         find('Sphere').getComponent('MaterialTest')._material.setProperty('alphaThreshold', 0)
//         await screenshot_custom(this._dt);
//     }

//     @testCase
//     async setAlphaThreshold_05() {
//         // @ts-ignore
//         find('Sphere').getComponent('MaterialTest')._material.setProperty('alphaThreshold', 0.5)
//         await screenshot_custom(this._dt);
//     }

//     @testCase
//     async setAlphaThreshold_10() {
//         // @ts-ignore
//         find('Sphere').getComponent('MaterialTest')._material.setProperty('alphaThreshold', 1)
//         await screenshot_custom(this._dt);
//     }
}


export type TestData = {
    isChecked: boolean;
    tickTime: number;
    progress: number;
}