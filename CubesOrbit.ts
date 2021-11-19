import * as THREE from 'three';
import { Scene } from 'three';

class Cube {
    mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>;

    constructor(x:number, y:number, z:number, width:number, height:number, depth:number, materialColor:number) {
        const geometry = new THREE.BoxGeometry(width, height, depth)
        const material = new THREE.MeshStandardMaterial({ color: materialColor })
        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.position.x = x
        this.mesh.position.y = y
        this.mesh.position.z = z
    }

    rotate(x:number, y:number, z:number) {
        this.mesh.rotation.x = x
        this.mesh.rotation.y = y
        this.mesh.rotation.z = z
    }

    addToScene(scene:Scene) {
        scene.add(this.mesh)
    }
}

export class CubesOrbit {
    private centerX: number;
    private centerY: number;
    private centerZ: number;
    private radius: number;
    private cubes: Cube[] = [];

    constructor(x:number, y:number, z:number, radius:number, nCubes:number, cubeWidth:number, cubeHeight:number, cubeDepth:number, cubeMaterialColor:number) {
        this.centerX = x
        this.centerY = y
        this.centerZ = z
        this.radius = radius

        this.initCubes(nCubes, cubeWidth, cubeHeight, cubeDepth, cubeMaterialColor)
    }

    initCubes(nCubes:number, cubeWidth:number, cubeHeight:number, cubeDepth:number, cubeMaterialColor:number) : void {
        const separationAngle = 360 / nCubes
        let currentAngle = 0
        this.cubes = new Array(nCubes)
        for (let i = 0; i < nCubes; i++, currentAngle += separationAngle) {
            const angleInRadians = currentAngle * Math.PI / 180
            const x = this.centerX + Math.sin(angleInRadians) * this.radius
            const z = this.centerZ + Math.cos(angleInRadians) * this.radius
            const cube = new Cube(x, this.centerY, z, cubeWidth, cubeHeight, cubeDepth, cubeMaterialColor)
            const yRotation = angleInRadians
            cube.rotate(0, yRotation, 0)
            this.cubes.push(cube)            
        }
    }

    addToScene(scene:Scene) : void {
        this.cubes.map((c) => {
            scene.add(c.mesh)
        })
    }
}

