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
        const state1 = animationComponent.getState('forward');
        state1.play();
        const state2 = animationComponent.getState('deferred');
        state2.play();
    }

    private _makeTestClip(passIndex: number) {
        const uniformValueAdapter = new animation.UniformProxyFactory();
        uniformValueAdapter.passIndex = passIndex;
        uniformValueAdapter.uniformName = 'albedo';

        const animationClip = new AnimationClip();
        animationClip.wrapMode = AnimationClip.WrapMode.Loop;
        animationClip.duration = 2.0;
        const track = new animation.ColorTrack();
        track.path.toHierarchy('Nested');
        track.path.toComponent(MeshRenderer);
        track.path.toProperty("sharedMaterials");
        track.path.toElement(0);
        track.proxy = uniformValueAdapter;
        const [r, g, b, a] = track.channels();
        const keys = [0, 0.3, 0.5, 1.0, 1.7, 2.0];
        const colors = [
            new math.Color(0),
            new math.Color(10),
            new math.Color(70),
            new math.Color(80),
            new math.Color(150),
            new math.Color(255),
        ];
        r.curve.assignSorted(
            keys,
            colors.map((c) => c.r),
        );
        g.curve.assignSorted(
            keys,
            colors.map((c) => c.g),
        );
        b.curve.assignSorted(
            keys,
            colors.map((c) => c.b),
        );
        a.curve.assignSorted(
            keys,
            colors.map((c) => c.a),
        );
        animationClip.addTrack(track);
        return animationClip;
    }
}
