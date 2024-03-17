import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// inicialize a cena
var scene = new THREE.Scene();

// criando uma camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, 0);

// Criando uma rederização
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.PlaneGeometry(200, 200);
var material = new THREE.MeshStandardMaterial({ color: 0x000000, side:THREE.DoubleSide });
var surface = new THREE.Mesh(geometry, material);
surface.receiveShadow = true;
scene.add(surface);

function animate(){

}