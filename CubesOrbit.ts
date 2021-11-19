import * as THREE from 'three';

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

    addToScene(scene:THREE.Scene) {
        scene.add(this.mesh)
    }
}

export class CubesOrbit {
    private centerX: number
    private centerY: number
    private centerZ: number
    private radius: number
    private cubes: Cube[] = []
    private radians: number[] = []

    constructor(
        x:number,
        y:number,
        z:number,
        nCubes:number,
        cubeWidth:number, cubeHeight:number, cubeDepth:number, cubeMaterialColor:number) {
        this.centerX = x
        this.centerY = y
        this.centerZ = z
        this.radius = nCubes / Math.PI
        this.initCubes(nCubes, cubeWidth, cubeHeight, cubeDepth, cubeMaterialColor)
    }

    initCubes(nCubes:number, cubeWidth:number, cubeHeight:number, cubeDepth:number, cubeMaterialColor:number) : void {
        const separationAngle = 360 / nCubes
        let currentAngle = 0
        for (let i = 0; i < nCubes; i++, currentAngle += separationAngle) {
            const angleInRadians = currentAngle * Math.PI / 180
            const x = this.centerX + Math.cos(angleInRadians) * this.radius
            const z = this.centerZ + Math.sin(angleInRadians) * this.radius
            const cube = new Cube(x, this.centerY, z, cubeWidth, cubeHeight, cubeDepth, cubeMaterialColor)
            cube.rotate(0, angleInRadians, 0)
            this.cubes.push(cube)
            this.radians.push(currentAngle)
        }
    }

    addToScene(scene:THREE.Scene) : void {
        this.cubes.map((c) => {
            scene.add(c.mesh)
        })
    }

    getRadius() : number {
        return this.radius
    }

    rotate(degreeSpeed: number) : void {
        const rotationInRadians = degreeSpeed * Math.PI / 180
        for (let i=0; i < this.cubes.length; i++) {
            const cube = this.cubes[i]
            this.radians[i] += rotationInRadians
            cube.mesh.position.x = this.centerX + Math.cos(this.radians[i]) * this.radius
            cube.mesh.position.z = this.centerZ + Math.sin(this.radians[i]) * this.radius
            cube.rotate(0, rotationInRadians, 0)
        }
    }
 }

