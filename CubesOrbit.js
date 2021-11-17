import * as THREE from 'three';

class Cube {
    constructor(x, y, z, width, height, depth, materialColor) {
        const geometry = new THREE.BoxGeometry(width, height, depth)
        const material = new THREE.MeshStandardMaterial({ color: materialColor })
        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.position.x = x
        this.mesh.position.y = y
        this.mesh.position.z = z
    }

    rotate(x, y, z) {
        this.mesh.rotation.x = x
        this.mesh.rotation.y = y
        this.mesh.rotation.z = z
    }

    addToScene(scene) {
        scene.add(this.mesh)
    }
}

export class CubesOrbit {
    constructor(x, y, z, radius, nCubes, cubeWidth, cubeHeight, cubeDepth, cubeMaterialColor) {
        this.centerX = x
        this.centerY = y
        this.centerZ = z
        this.radius = radius

        this.initCubes(nCubes, cubeWidth, cubeHeight, cubeDepth, cubeMaterialColor)
    }

    initCubes(nCubes, cubeWidth, cubeHeight, cubeDepth, cubeMaterialColor) {
        const separationAngle = 360 / nCubes
        let currentAngle = 0
        this.cubes = new Array(nCubes)
        for (let i = 0; i < nCubes; i++, currentAngle += separationAngle) {
            const angleInRadians = currentAngle * Math.PI / 180
            const x = this.centerX + Math.sin(angleInRadians) * this.radius
            const z = this.centerZ + Math.cos(angleInRadians) * this.radius
            const cube = new Cube(x, this.centerY, z, cubeWidth, cubeHeight, cubeDepth, cubeMaterialColor)
            const yRotation = angleInRadians//-currentAngle/360
            cube.rotate(0, yRotation, 0)
            this.cubes.push(cube)
            // todo, rotate the cube in Y axis towards the center considering its current angle
        }
    }

    addToScene(scene) {
        this.cubes.map((c) => {
            scene.add(c.mesh)
        })
    }
}

