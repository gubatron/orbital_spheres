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
const THREE = __importStar(require("three"));
const OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
const ObjectGradient_1 = require("./ObjectGradient");
const Stars_1 = require("./Stars");
const CubesOrbit_1 = require("./CubesOrbit");
const VRButton_js_1 = require("three/examples/jsm/webxr/VRButton.js");
const scene = new THREE.Scene(); // Object container
const FOV = 75; // Field of View, in degrees
const ASPECT_RATIO = window.innerWidth / window.innerHeight;
const NEAR_CLIPPING_PLANE = 0.1;
const FAR_CLIPPING_PLANE = 1000;
const camera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR_CLIPPING_PLANE, FAR_CLIPPING_PLANE);
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// VR support
document.body.appendChild(VRButton_js_1.VRButton.createButton(renderer));
renderer.xr.enabled = true;
const controls = new OrbitControls_1.OrbitControls(camera, renderer.domElement);
// horizon
const gridHelper = new THREE.GridHelper(30, 30);
const geometry = new THREE.BoxGeometry();
// a mesh basic material requires no external light source
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
// this material needs a light    
const material2 = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 10, 5);
const pointLight2 = new THREE.PointLight(0xffffff);
pointLight2.position.set(5, -10, 5);
// 3D objects are called "Meshes", they need a geometry (set of 3d points)
// and a material to go along
const cube = new THREE.Mesh(geometry, material);
const cube2 = new THREE.Mesh(geometry, material2);
const camXGradient = new ObjectGradient_1.ObjectGradient(5, 0, 100);
const camYGradient = new ObjectGradient_1.ObjectGradient(cube.position.y + 3, 0.05, cube.position.y + 3, cube.position.y + 10);
const camZGradient = new ObjectGradient_1.ObjectGradient(100, 0.05, -50, 100);
const camRotationSpeed = 0.01;
const cubeOrbit1 = new CubesOrbit_1.CubesOrbit(1, 1, 1, 10, 40, 0.5, 0.25, 0.5, 0xff0000);
// setup the scene
scene.add(gridHelper); //horizon
scene.add(pointLight, pointLight2); //lights
scene.add(cube); //objects
scene.add(cube2);
cubeOrbit1.addToScene(scene);
// Load 2000 randomly generated stars
for (let i = 0; i < 2000; i++)
    (0, Stars_1.addStar)(scene);
// World background
const nebulaTexture = new THREE.TextureLoader().load("/nebula.jpg");
scene.background = nebulaTexture;
cube2.position.x = cube.position.x + 3;
cube2.position.y = cube.position.y + 3;
cube.rotation.y = 0.04;
camera.position.z = 15;
camera.position.y = 10;
camera.lookAt(scene.position);
function animate() {
    (0, ObjectGradient_1.updateObjectGradients)();
    renderer.render(scene, camera);
    cube.rotation.x = -ObjectGradient_1.xGradient.val() * 8;
    cube.rotation.z = -ObjectGradient_1.zGradient.val() * 4;
    cube.rotation.y = -cube.rotation.y;
    cube2.rotation.x = -ObjectGradient_1.xGradient.val() / 4;
    cube2.rotation.z = ObjectGradient_1.zGradient.val() * 4;
    cube2.rotation.y = -cube.rotation.y;
    cube.material.color.setRGB(ObjectGradient_1.redBand.val(), ObjectGradient_1.greenBand.val(), ObjectGradient_1.blueBand.val());
    cube2.material.color.setRGB(ObjectGradient_1.redBand2.val(), ObjectGradient_1.greenBand2.val(), ObjectGradient_1.blueBand2.val());
    rotateCamera();
}
function rotateCamera() {
    var x = camera.position.x;
    var z = camera.position.z;
    camera.position.x = x * Math.cos(camRotationSpeed) + z * Math.sin(camRotationSpeed);
    camera.position.z = z * Math.cos(camRotationSpeed) - x * Math.sin(camRotationSpeed);
    camera.lookAt(scene.position);
}
renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
    animate();
});
