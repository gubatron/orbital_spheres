import { Scene } from 'three';
import { CubesOrbit } from './CubesOrbit'

export class OrbitSphere {

    cubes : CubesOrbit[] = []

    constructor(
        x:number,
        y:number,
        z:number,
        maxCubesAtEquator : number,
        cubeWidth:number,
        cubeHeight:number,
        cubeDepth:number,
        color: number) {
        // center orbit
        const centerOrbit = new CubesOrbit(x, y, z, maxCubesAtEquator, cubeWidth, cubeHeight, cubeDepth, color)
        const latitude_gap = (centerOrbit.getRadius() / maxCubesAtEquator) + cubeHeight
        let latitude_down = y - latitude_gap
        let latitude_up = y + latitude_gap
        let nCubes = maxCubesAtEquator - 1
        this.cubes.push(centerOrbit);
        while (nCubes > 0) {
            this.cubes.push(new CubesOrbit(x, latitude_down, z, nCubes, cubeWidth, cubeHeight, cubeDepth, color))
            this.cubes.push(new CubesOrbit(x, latitude_up, z, nCubes, cubeWidth, cubeHeight, cubeDepth, color))
            latitude_down -= latitude_gap
            latitude_up += latitude_gap
            nCubes -= nCubes % 2 == 0 ? 1 : 2 // keep odd number of elements in orbits
        }
    }

    addToScene(scene:Scene) : void {
        this.cubes.forEach( (cubeOrbit) => {
            cubeOrbit.addToScene(scene)
        })
    }

    rotate(degreeSpeed:number) : void {
        for (let i=0, symbol=1; i < this.cubes.length; i++, symbol*=-1) {
            this.cubes[i].rotate(degreeSpeed * symbol)
        }
    }
}