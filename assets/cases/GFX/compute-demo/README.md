# compute-demo (Custom Pipeline / Compute Shader)

Mirror of Cocos official tutorial-005-compute (raytracing by compute) from
cocos-example-custom-pipeline, adapted as an automation test case.

## 运行前提（重要）

1. **后端（Backend）**：浏览器预览必须先开启 **WebGPU** —— 使用支持 WebGPU 的
   Chrome / Edge 等浏览器（较新版本默认开启；旧版本需在 chrome://flags 打开
   WebGPU 相关开关）。桌面预览可用 Vulkan / Metal。
2. **渲染管线（图形设置）**：项目设置 -> 功能裁剪（Feature Cropping）-> 图形 /
   渲染管线选择**新的渲染管线（custom-pipeline）**，并在管线名称（Custom Pipeline
   Name）中填写 **RaytracingWeekend** —— 必须与 raytracingByCompute.ts 中
   rendering.setCustomPipeline('RaytracingWeekend', ...) 的注册名一致，否则管线不会生效。

## 文件说明

- raytracingByCompute.ts - PipelineBuilder + rendering.setCustomPipeline('RaytracingWeekend', ...)
  (compute pass writes to a storage texture, a fullscreen quad blits it to the swapchain)
- compute-demo.scene - camera + main light only, compute output fills the window
- ../pipeline-data.ts - window/framebuffer helper imported by the pipeline script
- assets/resources/raytracing-compute/ - rt-compute (compute shader) and
  rt-swizzle (blit) effects + materials, loaded at runtime via resources.load

## QA 步骤

1. 按"运行前提"完成配置：浏览器预览开启 WebGPU；图形设置选新渲染管线，
   管线名称填 RaytracingWeekend。
2. 打开场景 compute-demo.scene。手动预览时，把 raytracingByCompute.ts
   （组件 pipeline_005_raytracing_in_1_weekend）挂到任意节点上，
   否则管线不会被注册。
3. 预览或跑自动化验证 compute 输出。

## 自动化

- Registered in assets/auto-test-config.json under sceneList as compute-demo.
- Test: assets/auto-test-case/dynamic/GFX/compute-demo.test.ts (screenshot based).

## 维护

- Edit scene content in rt-compute.effect (spheres uniform, imageStore).
- addDispatch(width/8, height/4, 1) must match layout(local_size_x = 8, local_size_y = 4).
- The .effect.meta/.mtl.meta files are kept on purpose: .mtl binds the
  effect by uuid. If you delete them, re-assign the effect on both materials
  after Creator regenerates the metas.
