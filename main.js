import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x3c3c3c);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);