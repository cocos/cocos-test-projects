import { _decorator, Component, AnimationClip, UniformCurveValueAdapter, math, Animation, animation, js, MeshRenderer } from 'cc';
const { ccclass } = _decorator;

@ccclass('UniformKTest')
export class UniformKTest extends Component {
    public start() {
        const testClip = this._makeTestClip(0);
        testClip.name = 'forward';
        const testClip2 = this._makeTestClip(1);
        testClip2.name = 'deferred';
        const animationComponent = this.node.addComponent(Animation);
        animationComponent.clips = [ testClip, testClip2 ];
        animationComponent.defaultClip = testClip;
        //animationComponent.playOnLoad = true;
        const state1 = animationComponent.getAnimationState('forward');
        state1.play();
        const state2 = animationComponent.getAnimationState('deferred');
        state2.play();
    }

    private _makeTestClip(passIndex: number) {
        const uniformValueAdapter = new UniformCurveValueAdapter();
        uniformValueAdapter.passIndex = passIndex;
        uniformValueAdapter.uniformName = 'albedo';

        const animationClip = new AnimationClip();
        animationClip.wrapMode = AnimationClip.WrapMode.Loop;
        animationClip.duration = 2.0;
        animationClip.keys = [
            [0, 0.3, 0.5, 1.0, 1.7, 2.0],
        ];
        animationClip.curves =[{
            modifiers: [
                new animation.HierarchyPath('Nested'),
                new animation.ComponentPath(js.getClassName(MeshRenderer)),
                "sharedMaterials",
                0,
            ],
            valueAdapter: uniformValueAdapter,
            data: {
                keys: 0,
                values: [
                    new math.Color(0),
                    new math.Color(10),
                    new math.Color(70),
                    new math.Color(80),
                    new math.Color(150),
                    new math.Color(255),
                ],
            },
        }];
        return animationClip;
    }
}
