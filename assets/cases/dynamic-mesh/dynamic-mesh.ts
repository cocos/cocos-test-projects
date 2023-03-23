
/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

import { _decorator, Component, director, MeshRenderer, gfx, Node, primitives, utils, Color, Button, Vec3, Mesh, resources, renderer, CameraComponent } from 'cc';

const { ccclass, property } = _decorator;

interface IDragonSubMesh {
    positions: Float32Array;
    normals: Float32Array;
    minPos: Vec3;
    maxPos: Vec3;
}

@ccclass('DynamicMeshCreator')
export class DynamicMeshCreator extends Component {
    @property(Button)
    btnUpdateDynamicMesh: Button = null!;
    @property(CameraComponent)
    cameraComp: CameraComponent = null!
    
    private _mainCamera: renderer.scene.Camera = null!;
    private _increaseVertexCount = 900;
    private _subMeshes: IDragonSubMesh[] = [];
    private _options: primitives.ICreateDynamicMeshOptions = null!;
    private _geometries: primitives.IDynamicGeometry[] = [];
    private _dragon: Node = null!;
    private _initialize: boolean = false;
    private _destroyed: boolean = false;

    // debug only
    private _showBoundingBox = false;
    private _boundingBoxColor = new Color(255, 255, 255, 255);

    public isLoadedMesh = false; 

    private initCamera() {
        this._mainCamera = this.cameraComp.camera;
    }
    
    private initUI() {
        this.btnUpdateDynamicMesh.node.on(Button.EventType.CLICK, this.onButtonUpdateDynamicMesh, this);
    }

    private initMesh() {
        let names: string[] = [];
        for (let i = 0; i < 9; i++) {
            let name = `dynamic-mesh/dragon/Object_${i}`;
            names.push(name);
        }

        resources.load(names, Mesh, (err, meshes) => {
            if (this._destroyed) {
                this.isLoadedMesh = true;
                return;
            }
            
            if (err) {
                console.log('Load gltf failed, error: ', err);
                return;
            }
            
            let options: primitives.ICreateDynamicMeshOptions = {
                maxSubMeshes: 0,
                maxSubMeshVertices: 0,
                maxSubMeshIndices: 0};
    
            for (let index = 0; index < meshes.length; index++) {
                const mesh = meshes[index];
                const positions = mesh.readAttribute(0, gfx.AttributeName.ATTR_POSITION) as Float32Array;
                const normals = mesh.readAttribute(0, gfx.AttributeName.ATTR_NORMAL) as Float32Array;
                const indices = mesh.readIndices(0) as Uint32Array;
    
                let newPositions = new Float32Array(indices.length * 3);
                let newNormals = new Float32Array(indices.length * 3);
                let minPos = new Vec3(Infinity, Infinity, Infinity);
                let maxPos = new Vec3(-Infinity, -Infinity, -Infinity);
                let newPos = new Vec3();
    
                for (let i = 0; i < indices.length; i++) {
                    const index = indices[i];
                    for (let k = 0; k < 3; k++) {
                        newPositions[i * 3 + k] = positions[index * 3 + k];
                        newNormals[i * 3 + k] = normals[index * 3 + k];
                    }
    
                    newPos.set(newPositions[i * 3], newPositions[i * 3 + 1], newPositions[i * 3 + 2]);
                    Vec3.min(minPos, minPos, newPos);
                    Vec3.max(maxPos, maxPos, newPos);
                }
    
                const subMesh: IDragonSubMesh = {
                    positions: newPositions,
                    normals: newNormals,
                    minPos,
                    maxPos,
                };
    
                this._subMeshes.push(subMesh);
                options.maxSubMeshVertices = Math.max(options.maxSubMeshVertices, newPositions.length / 3);
            }
    
            options.maxSubMeshes = this._subMeshes.length;
            this._options = options;
            this._dragon = director.getScene()?.getChildByName("DynamicDragon")!;

            for (let i = 0; i < this._options.maxSubMeshes; i++) {
                let geometry: primitives.IDynamicGeometry = {
                    positions: this._subMeshes[i].positions,
                    normals: this._subMeshes[i].normals,
                    minPos: this._subMeshes[i].minPos,
                    maxPos: this._subMeshes[i].maxPos,
                }

                this._geometries.push(geometry);
            }
            
            const mesh = utils.MeshUtils.createDynamicMesh(0, this._geometries[0], undefined, this._options);
            for (let i = 1; i < this._options.maxSubMeshes; i++) {
                mesh.updateSubMesh(i, this._geometries[i]);
            }

            const meshRenderer = this._dragon.getComponent(MeshRenderer) as MeshRenderer;
            meshRenderer.mesh = mesh;
            meshRenderer.onGeometryChanged();

            this._initialize = true;
            this.isLoadedMesh = true; 
        });
    }

    public onButtonUpdateDynamicMesh (btn: Button) {
        if (!this._initialize) {
            return;
        }

        const meshRenderer = this._dragon.getComponent(MeshRenderer) as MeshRenderer;
        for (let i = 0; i < this._options.maxSubMeshes; i++) {
            const subMesh = this._subMeshes[i];
            const geometry = this._geometries[i];
            
            geometry.positions = subMesh.positions.subarray(0, this._increaseVertexCount * 3);
            geometry.normals = subMesh.normals.subarray(0, this._increaseVertexCount * 3);

            meshRenderer.mesh!.updateSubMesh(i, geometry);
        }
        meshRenderer.onGeometryChanged();
    }

    start() {
        this.initCamera();
        this.initUI();
        this.initMesh();
    }

    onDestroy () {
        this._destroyed = true;
    }

    update (deltaTime: number) {
        if (!this._initialize) {
            return;
        }

        let dirty = false;
        const meshRenderer = this._dragon.getComponent(MeshRenderer) as MeshRenderer;
        for (let i = 0; i < this._options.maxSubMeshes; i++) {
            const subMesh = this._subMeshes[i];
            const geometry = this._geometries[i];
            const leftVertexCount = (subMesh.positions.length - geometry.positions.length) / 3;
            const count = Math.min(this._increaseVertexCount, leftVertexCount);
                
            if (count > 0) {
                geometry.positions = subMesh.positions.subarray(0, geometry.positions.length + count * 3);
                geometry.normals = subMesh.normals.subarray(0, geometry.normals!.length + count * 3);
    
                meshRenderer.mesh!.updateSubMesh(i, geometry);
                dirty = true;
            }
        }

        if(dirty) {
            meshRenderer.onGeometryChanged();
        }
        
        if (this._showBoundingBox) {
            const meshRenderer = this._dragon.getComponent(MeshRenderer) as MeshRenderer;
            const worldBound = meshRenderer.model!.worldBounds;
            if (worldBound) {
                let renderer = this._mainCamera.geometryRenderer;
                renderer.addBoundingBox(worldBound, this._boundingBoxColor, true, true, false);
            }
        }
    }
}
