// @ts-ignore
import { director, Terrain } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom, waitSceneLaunched } from '../common/utils';

/**
 * 验证「同步动态创建地形」全流程无报错：
 * 场景 cases/terrain/terrain_dynamic_create.scene 中的 TerrainStressDemo 组件
 * 会在 start() 内同步执行 rebuild → importHeightField → LOD 并挂载到场景。
 *
 * 检测方式：
 * 1. 场景加载后若创建流程抛异常，DynamicTerrain 节点不会存在 → throw 使用例失败；
 * 2. Terrain 组件 / 顶点数 / 激活状态 与预期不符 → throw 使用例失败；
 * 3. 用例方法结束后再持续观察若干帧，通过 window 'error' 捕获主循环内
 *    （如 TerrainBlock.update）抛出的未捕获全局异常——这类错误不在用例方法栈内，
 *    只能靠旁路监听，捕获到即 throw 使用例失败；
 * 4. 截图留档（供后续帧画面回归对比）。
 */
@runScene('terrain_dynamic_create')
@testClass('TerrainStressDemo')
export class TerrainStressDemo {
    @testCase
    async create_terrain_sync_no_error () {
        // 收集主循环每帧抛出的全局未捕获异常（不在本用例方法栈内，需旁路监听）
        const globalErrors: string[] = [];
        const onWindowError = (e: ErrorEvent) => {
            const msg = e.message || (e.error && e.error.message) || String(e.error);
            globalErrors.push(msg);
        };
        window.addEventListener('error', onWindowError);

        try {
            // 等待场景真正加载完成（场景名一致才返回）
            const launched = await waitSceneLaunched('terrain_dynamic_create', 10);
            if (!launched) {
                throw new Error('terrain_dynamic_create 场景未能加载完成');
            }

            // 场景激活后组件 start 在首帧执行，多等几帧确保同步构建完成
            await waitForFrames(5);

            const scene = director.getScene()!;
            const terrainNode = scene.getChildByName('DynamicTerrain');
            if (!terrainNode) {
                throw new Error('未找到 DynamicTerrain 节点：同步动态创建地形过程可能抛出了异常');
            }

            const terrain = terrainNode.getComponent(Terrain);
            if (!terrain) {
                throw new Error('DynamicTerrain 节点上缺少 Terrain 组件');
            }

            // blockCount 4x4、每 block 32 格 => 每轴 4*32+1 = 129 顶点
            const expected = 4 * 32 + 1;
            const vc = terrain.vertexCount;
            if (vc[0] !== expected || vc[1] !== expected) {
                throw new Error(`地形顶点数异常 vc=[${vc[0]},${vc[1]}]，期望 [${expected},${expected}]`);
            }

            if (!terrainNode.activeInHierarchy) {
                throw new Error('地形节点未激活，无法渲染');
            }

            // 创建相关断言已全部通过，继续观察若干帧，
            // 捕获挂载激活后每帧 update（如 _updateMaterial 内读 tileSize）抛出的运行时错误
            await waitForFrames(30);

            await screenshot_custom(30, 'terrain_dynamic_create');

            if (globalErrors.length > 0) {
                throw new Error(`运行期间检测到 ${globalErrors.length} 个全局异常，首个: ${globalErrors[0]}`);
            }
        } finally {
            window.removeEventListener('error', onWindowError);
        }
    }
}
