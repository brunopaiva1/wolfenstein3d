import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x3c3c3c);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const wallTexture = textureLoader.load('images/wall.png');
const doorTexture = textureLoader.load('images/door.png');
const gunTexture = textureLoader.load('images/gun.png');

const geometry = new THREE.BoxGeometry(2, 2, 2);
const doorGeometry = new THREE.BoxGeometry(2, 2, 0.5);
const gunGeometry = new THREE.PlaneGeometry(10, 10);
const wallsMaterial = new THREE.MeshBasicMaterial({ map: wallTexture });
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, wireframe: false });
const doorMaterial = new THREE.MeshBasicMaterial({ map: doorTexture });
const gunMaterial = new THREE.MeshBasicMaterial({ map: gunTexture });

//Aqui se pode criar um mapa do tamanho desejado, 
//no qual cada 1 na matriz vai ser um cubo e 0 um espaço livre
const wallsMatrix = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 1, 0, 0, 1, 1],
	[1, 1, 0, 0, 1, 0, 0, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 0, 0, 0, 0, 0, 1, 1],
	[1, 1, 0, 0, 0, 0, 0, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1]
];