import { find } from 'cc';
// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('particle-velocity')
// @testClass('ParticleVelocity')
export class ParticleVelocity {
    _dt = 2;

    @testCase
    async startPlay() {
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async onTranslateChanged_05() {
        // @ts-ignore
        find('New Canvas/translate').getComponent('cc.Slider').progress = 0.5;
        // @ts-ignore
        find('New Canvas').getComponent('TransformController').onTranslateChanged(find('New Canvas/translate').getComponent('cc.Slider'));
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async onTranslateChanged_10() {
        // @ts-ignore
        find('New Canvas/translate').getComponent('cc.Slider').progress = 1;
        // @ts-ignore
        find('New Canvas').getComponent('TransformController').onTranslateChanged(find('New Canvas/translate').getComponent('cc.Slider'));
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async onTranslateChanged_00() {
        // @ts-ignore
        find('New Canvas/translate').getComponent('cc.Slider').progress = 0;
        // @ts-ignore
        find('New Canvas').getComponent('TransformController').onTranslateChanged(find('New Canvas/translate').getComponent('cc.Slider'));
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async onRotateChanged_05() {
        // @ts-ignore
        find('New Canvas/rotate').getComponent('cc.Slider').progress = 0.5;
        // @ts-ignore
        find('New Canvas').getComponent('TransformController').onRotateChanged(find('New Canvas/rotate').getComponent('cc.Slider'));
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async onRotateChanged_10() {
        // @ts-ignore
        find('New Canvas/rotate').getComponent('cc.Slider').progress = 1;
        // @ts-ignore
        find('New Canvas').getComponent('TransformController').onRotateChanged(find('New Canvas/rotate').getComponent('cc.Slider'));
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async onRotateChanged_00() {
        // @ts-ignore
        find('New Canvas/rotate').getComponent('cc.Slider').progress = 0;
        // @ts-ignore
        find('New Canvas').getComponent('TransformController').onRotateChanged(find('New Canvas/rotate').getComponent('cc.Slider'));
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async unChecked() {
        // @ts-ignore
        find('New Canvas/1').getComponent('cc.Toggle').isChecked = false;
        // @ts-ignore
        find('New Canvas/2').getComponent('cc.Toggle').isChecked = false;
        // @ts-ignore
        find('New Canvas/3').getComponent('cc.Toggle').isChecked = false;
        // @ts-ignore
        find('New Canvas/4').getComponent('cc.Toggle').isChecked = false;
        // @ts-ignore
        find('New Canvas/rotate').getComponent('cc.Slider').progress = 1;
        // @ts-ignore
        find('New Canvas').getComponent('TransformController').onRotateChanged(find('New Canvas/rotate').getComponent('cc.Slider'));
        // @ts-ignore
        find('New Canvas/translate').getComponent('cc.Slider').progress = 1;
        // @ts-ignore
        find('New Canvas').getComponent('TransformController').onTranslateChanged(find('New Canvas/translate').getComponent('cc.Slider'));
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }


    @testCase
    async Checked() {
        // @ts-ignore
        find('New Canvas/1').getComponent('cc.Toggle').isChecked = true;
        // @ts-ignore
        find('New Canvas/2').getComponent('cc.Toggle').isChecked = true;
        // @ts-ignore
        find('New Canvas/3').getComponent('cc.Toggle').isChecked = true;
        // @ts-ignore
        find('New Canvas/4').getComponent('cc.Toggle').isChecked = true;
        // @ts-ignore
        find('New Canvas/rotate').getComponent('cc.Slider').progress = 1;
        // @ts-ignore
        find('New Canvas').getComponent('TransformController').onRotateChanged(find('New Canvas/rotate').getComponent('cc.Slider'));
        // @ts-ignore
        find('New Canvas/translate').getComponent('cc.Slider').progress = 1;
        // @ts-ignore
        find('New Canvas').getComponent('TransformController').onTranslateChanged(find('New Canvas/translate').getComponent('cc.Slider'));
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);

        };
    }

    @testCase
    async click_F() {
        // @ts-ignore
        find('New Canvas/rotate').getComponent('cc.Slider').progress = 0;
        // @ts-ignore
        find('New Canvas').getComponent('TransformController').onRotateChanged(find('New Canvas/rotate').getComponent('cc.Slider'));
        // @ts-ignore
        find('New Canvas/translate').getComponent('cc.Slider').progress = 0;
        // @ts-ignore
        find('New Canvas').getComponent('TransformController').onTranslateChanged(find('New Canvas/translate').getComponent('cc.Slider'));
        // @ts-ignore
        find('Camera').getComponent('CameraController').onPushJoystick(1, 'F');
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async click_B() {
        // @ts-ignore
        find('Camera').getComponent('CameraController').onPushJoystick(1, 'B');
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async click_L() {
        // @ts-ignore
        find('Camera').getComponent('CameraController').onPushJoystick(1, 'L');
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async click_R() {
        // @ts-ignore
        find('Camera').getComponent('CameraController').onPushJoystick(1, 'R');
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async click_U() {
        // @ts-ignore
        find('Camera').getComponent('CameraController').onPushJoystick(1, 'U');
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async click_D() {
        // @ts-ignore
        find('Camera').getComponent('CameraController').onPushJoystick(1, 'D');
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);

        };
    }

    @testCase
    async click_RL() {
        // @ts-ignore
        find('Camera').getComponent('CameraController').onPushJoystick(1, 'RL');
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async click_RR() {
        // @ts-ignore
        find('Camera').getComponent('CameraController').onPushJoystick(1, 'RR');
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }
}