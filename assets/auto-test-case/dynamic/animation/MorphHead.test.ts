import { find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('Morph-Head')
@testClass('MorphHead')
export class MorphHead {
    _dt = 5;

    @testCase
    async startPlay() {

        // @ts-ignore
        // tslint:disable-next-line: max-line-length
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0')!.getComponent('MorphController')!.weightsControl = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // 截图 or 断言
        await screenshot_custom(this._dt);
    }

    @testCase
    async smile_05() {

        // @ts-ignore
        let morph_slider = find("Canvas/ScrollView/view/content").children[1].getChildByName("Slider").getComponent(cc.Slider);
        // @ts-ignore
        morph_slider.progress = 0.5;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,0');
        // 截图 or 断言
        await screenshot_custom(this._dt);
        // @ts-ignore
        morph_slider.progress = 0;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,0');

    }
    @testCase
    async smile_10() {

        // @ts-ignore
        let morph_slider = find("Canvas/ScrollView/view/content").children[1].getChildByName("Slider").getComponent(cc.Slider);
        // @ts-ignore
        morph_slider.progress = 1;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,0');

        // 截图 or 断言
        await screenshot_custom(this._dt);
        // @ts-ignore
        morph_slider.progress = 0;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,0');

    }


    @testCase
    async look_right_05() {

        // @ts-ignore
        let morph_slider = find("Canvas/ScrollView/view/content").children[2].getChildByName("Slider").getComponent(cc.Slider);
        // @ts-ignore
        morph_slider.progress = 0.5;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,1');
        // 截图 or 断言
        await screenshot_custom(this._dt);
        // @ts-ignore
        morph_slider.progress = 0;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,1');


    }
    @testCase
    async look_right_10() {

        // @ts-ignore
        let morph_slider = find("Canvas/ScrollView/view/content").children[2].getChildByName("Slider").getComponent(cc.Slider);
        // @ts-ignore
        morph_slider.progress = 1;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,1');
        // 截图 or 断言
        await screenshot_custom(this._dt);
        // @ts-ignore
        morph_slider.progress = 0;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,1');

    }


    @testCase
    async angry_05() {

        // @ts-ignore
        let morph_slider = find("Canvas/ScrollView/view/content").children[3].getChildByName("Slider").getComponent(cc.Slider);
        // @ts-ignore
        morph_slider.progress = 0.5;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,2');
        // 截图 or 断言
        await screenshot_custom(this._dt);
        // @ts-ignore
        morph_slider.progress = 0;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,2');

    }
    @testCase
    async angry_10() {

        // @ts-ignore
        let morph_slider = find("Canvas/ScrollView/view/content").children[3].getChildByName("Slider").getComponent(cc.Slider);
        // @ts-ignore
        morph_slider.progress = 1;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,2');
        // 截图 or 断言
        await screenshot_custom(this._dt);
        // @ts-ignore
        morph_slider.progress = 0;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,2');

    }


    @testCase
    async cry_05() {

        // @ts-ignore
        let morph_slider = find("Canvas/ScrollView/view/content").children[4].getChildByName("Slider").getComponent(cc.Slider);
        // @ts-ignore
        morph_slider.progress = 0.5;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,3');
        // 截图 or 断言
        await screenshot_custom(this._dt);
        // @ts-ignore
        morph_slider.progress = 0;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,3');

    }
    @testCase
    async cry_10() {

        // @ts-ignore
        let morph_slider = find("Canvas/ScrollView/view/content").children[4].getChildByName("Slider").getComponent(cc.Slider);
        // @ts-ignore
        morph_slider.progress = 1;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,3');
        // 截图 or 断言
        await screenshot_custom(this._dt);
        // @ts-ignore
        morph_slider.progress = 0;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,3');

    }


    @testCase
    async stern_05() {

        // @ts-ignore
        let morph_slider = find("Canvas/ScrollView/view/content").children[5].getChildByName("Slider").getComponent(cc.Slider);
        // @ts-ignore
        morph_slider.progress = 0.5;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,4');
        // 截图 or 断言
        await screenshot_custom(this._dt);
        // @ts-ignore
        morph_slider.progress = 0;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,4');

    }
    @testCase
    async stern_10() {

        // @ts-ignore
        let morph_slider = find("Canvas/ScrollView/view/content").children[5].getChildByName("Slider").getComponent(cc.Slider);
        // @ts-ignore
        morph_slider.progress = 1;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,4');
        // 截图 or 断言
        await screenshot_custom(this._dt);
        // @ts-ignore
        morph_slider.progress = 0;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,4');

    }


    @testCase
    async laugh_05() {

        // @ts-ignore
        let morph_slider = find("Canvas/ScrollView/view/content").children[6].getChildByName("Slider").getComponent(cc.Slider);
        // @ts-ignore
        morph_slider.progress = 0.5;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,5');
        // 截图 or 断言
        await screenshot_custom(this._dt);
        // @ts-ignore
        morph_slider.progress = 0;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,5');

    }
    @testCase
    async laugh_10() {

        // @ts-ignore
        let morph_slider = find("Canvas/ScrollView/view/content").children[6].getChildByName("Slider").getComponent(cc.Slider);
        // @ts-ignore
        morph_slider.progress = 1;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,5');
        // 截图 or 断言
        await screenshot_custom(this._dt);
        // @ts-ignore
        morph_slider.progress = 0;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,5');

    }


    @testCase
    async smile_sly_05() {

        // @ts-ignore
        let morph_slider = find("Canvas/ScrollView/view/content").children[7].getChildByName("Slider").getComponent(cc.Slider);
        // @ts-ignore
        morph_slider.progress = 0.5;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,6');
        // 截图 or 断言
        await screenshot_custom(this._dt);
        // @ts-ignore
        morph_slider.progress = 0;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,6');

    }
    @testCase
    async smile_sly_10() {
        // @ts-ignore
        find('Canvas/ScrollView').getComponent('cc.ScrollView').content.position = { x: -200, y: 370, z: 0 }
        // @ts-ignore
        let morph_slider = find("Canvas/ScrollView/view/content").children[7].getChildByName("Slider").getComponent(cc.Slider);
        // @ts-ignore
        morph_slider.progress = 1;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,6');
        // 截图 or 断言
        await screenshot_custom(this._dt);
        // @ts-ignore
        morph_slider.progress = 0;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,6');

    }


    @testCase
    async terror_05() {

        // @ts-ignore
        let morph_slider = find("Canvas/ScrollView/view/content").children[8].getChildByName("Slider").getComponent(cc.Slider);
        // @ts-ignore
        morph_slider.progress = 0.5;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,7');

        // 截图 or 断言
        await screenshot_custom(this._dt);
        // @ts-ignore
        morph_slider.progress = 0;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,7');

    }
    @testCase
    async terror_10() {

        // @ts-ignore
        let morph_slider = find("Canvas/ScrollView/view/content").children[8].getChildByName("Slider").getComponent(cc.Slider);
        // @ts-ignore
        morph_slider.progress = 1;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,7');

        // 截图 or 断言
        await screenshot_custom(this._dt);
        // @ts-ignore
        morph_slider.progress = 0;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,7');

    }



    @testCase
    async disgust_05() {

        // @ts-ignore
        let morph_slider = find("Canvas/ScrollView/view/content").children[9].getChildByName("Slider").getComponent(cc.Slider);
        // @ts-ignore
        morph_slider.progress = 0.5;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,8');

        // 截图 or 断言
        await screenshot_custom(this._dt);
        // @ts-ignore
        morph_slider.progress = 0;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,8');

    }
    @testCase
    async disgust_10() {

        // @ts-ignore
        let morph_slider = find("Canvas/ScrollView/view/content").children[9].getChildByName("Slider").getComponent(cc.Slider);
        // @ts-ignore
        morph_slider.progress = 1;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,8');

        // 截图 or 断言
        await screenshot_custom(this._dt);
        // @ts-ignore
        morph_slider.progress = 0;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,8');
    }



    @testCase
    async shock_05() {

        // @ts-ignore
        let morph_slider = find("Canvas/ScrollView/view/content").children[10].getChildByName("Slider").getComponent(cc.Slider);
        // @ts-ignore
        morph_slider.progress = 0.5;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,9');

        // 截图 or 断言
        await screenshot_custom(this._dt);
        // @ts-ignore
        morph_slider.progress = 0;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,9');

    }
    @testCase
    async shock_10() {

        // @ts-ignore
        let morph_slider = find("Canvas/ScrollView/view/content").children[10].getChildByName("Slider").getComponent(cc.Slider);
        // @ts-ignore
        morph_slider.progress = 1;
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,9');
        // 截图 or 断言
        await screenshot_custom(this._dt);
        // @ts-ignore
        morph_slider.progress = 0
        // @ts-ignore
        find('head/soldier_head_look_up/soldier_head_look_up_Soldier_american_skin_test_0').getComponent('MorphController').onSliderChanged(morph_slider, '0,9');
    }
}