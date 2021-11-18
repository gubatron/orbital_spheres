"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CubesOrbit = void 0;
const THREE = __importStar(require("three"));
class Cube {
    mesh;
    constructor(x, y, z, width, height, depth, materialColor) {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshStandardMaterial({ color: materialColor });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.x = x;
        this.mesh.position.y = y;
        this.mesh.position.z = z;
    }
    rotate(x, y, z) {
        this.mesh.rotation.x = x;
        this.mesh.rotation.y = y;
        this.mesh.rotation.z = z;
    }
    addToScene(scene) {
        scene.add(this.mesh);
    }
}
class CubesOrbit {
    centerX;
    centerY;
    centerZ;
    radius;
    cubes = [];
    constructor(x, y, z, radius, nCubes, cubeWidth, cubeHeight, cubeDepth, cubeMaterialColor) {
        this.centerX = x;
        this.centerY = y;
        this.centerZ = z;
        this.radius = radius;
        this.initCubes(nCubes, cubeWidth, cubeHeight, cubeDepth, cubeMaterialColor);
    }
    initCubes(nCubes, cubeWidth, cubeHeight, cubeDepth, cubeMaterialColor) {
        const separationAngle = 360 / nCubes;
        let currentAngle = 0;
        this.cubes = new Array(nCubes);
        for (let i = 0; i < nCubes; i++, currentAngle += separationAngle) {
            const angleInRadians = currentAngle * Math.PI / 180;
            const x = this.centerX + Math.sin(angleInRadians) * this.radius;
            const z = this.centerZ + Math.cos(angleInRadians) * this.radius;
            const cube = new Cube(x, this.centerY, z, cubeWidth, cubeHeight, cubeDepth, cubeMaterialColor);
            const yRotation = angleInRadians;
            cube.rotate(0, yRotation, 0);
            this.cubes.push(cube);
        }
    }
    addToScene(scene) {
        this.cubes.map((c) => {
            scene.add(c.mesh);
        });
    }
}
exports.CubesOrbit = CubesOrbit;
