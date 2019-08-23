import { _decorator, Component, AnimationClip, UniformCurveValueAdapter, math, AnimationComponent, ComponentModifier, HierachyModifier } from 'cc';


@_decorator.ccclass('UniformKTest')
export class UniformKTest extends Component {
    public start() {
        const testClip = this._makeTestClip();
        const animationComponent = this.node.addComponent(AnimationComponent);
        animationComponent.clips = [ testClip ];
        animationComponent.defaultClip = testClip;
        animationComponent.playOnLoad = true;
    }

    private _makeTestClip() {
        const uniformValueAdapter = new UniformCurveValueAdapter();
        uniformValueAdapter.passIndex = 0;
        uniformValueAdapter.uniformName = 'albedo';

        const animationClip = new AnimationClip();
        animationClip.wrapMode = AnimationClip.WrapMode.Loop;
        animationClip.duration = 2.0;
        animationClip.keys = [
            [0, 0.3, 0.5, 1.0, 1.7, 2.0],
        ];
        animationClip.curves =[{
            modifiers: [
                new HierachyModifier('Nested'),
                new ComponentModifier('cc.ModelComponent'),
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