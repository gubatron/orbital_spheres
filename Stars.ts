import * as THREE from 'three'
import { Scene } from 'three'

function addStar(scene : Scene) {
    const geometry = new THREE.SphereGeometry(0.02, 2, 2)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const star = new THREE.Mesh(geometry, material)

    const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(100))
    star.position.set(x, y, z)
    scene.add(star)
}

export { addStar }