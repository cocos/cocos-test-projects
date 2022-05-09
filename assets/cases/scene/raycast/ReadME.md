# 射线检测

用于比较目前支持的三种射线检测，分别为以下

## 基于 model 的射线检测（检测所有的三角面片）

目前检测对象是三角类图元网格 model，由 render-scene 提供接口：

- raycastAllModels: 根据给定的参数，检测场景中所有的符合条件的模型
- raycastSingleModel: 根据给定的参数，检测参数中的模型

## 基于带 ui-transform 的节点的射线检测（检测 ui-transform 所对应的 aabb）

目前检测对象是带 ui-transform 组件的节点，底层调用的是 intersect 提供的 ray-aabb 相交性检测功能，由 render-scene 提供接口：

- raycastAllCanvas: 根据给定的参数，检测场景中所有符合条件的 canvas 和以及所有的子节点

## 基于物理碰撞体的射线检测（检测所有的物理碰撞体）

目前检测对象是所有的物理碰撞体，由物理引擎底层提供支持，由 PhysicsSystem 提供对外接口：

- raycastAll: 根据给定的参数，检测场景中所有的碰撞体
- raycastClosest：根据给定的参数，检测场景中所有的碰撞体

## 返回结果

以上 API 返回结果都为 true 或 false，用来表示是否有检测到物体。

## 获取检测结果

所有提供检测 API 的类，都提供了相应的获取检测结果的 getter。
