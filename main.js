import * as THREE from 'three';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry2 = new THREE.SphereGeometry( 1, 10, 10 );
const material2 = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
const cube2 = new THREE.Mesh( geometry2, material2 );
scene.add( cube2 );

const cameraStep = 0.1;

let velX = 0.0;
let velY = 0.0;
let velCubo2Z = -1.0;
camera.position.z = 5;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

class Asteroide {
	posiciona() {
		this.modelo.position.x = getRandomArbitrary(-10, 10);
		this.modelo.position.y = getRandomArbitrary(-10, 10);
		this.modelo.position.z = -20;
	}

	carrega(objeto){

		const loader = new GLTFLoader;
		loader.load(
			// resource URL
			'modelo/asteroide.gltf',
			// called when the resource is loaded
			function ( gltf ) {
		
				scene.add( gltf.scene );
				gltf.scene.children[0].scale.set(0.5, 0.5, 0.5);
				scene.remove(objeto.modelo);
				objeto.modelo = gltf.scene.children[0];
				scene.add(objeto.modelo);
		
				gltf.animations; // Array<THREE.AnimationClip>
				gltf.scene; // THREE.Group
				gltf.scenes; // Array<THREE.Group>
				gltf.cameras; // Array<THREE.Camera>
				gltf.asset; // Object
		
			},
			// called while loading is progressing
			function ( xhr ) {
		
				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		
			},
			// called when loading has errors
			function ( error ) {
		
				console.log( 'An error happened' );
		
			}
		);
	}

	constructor() {
		const geometry = new THREE.SphereGeometry( 1, 10, 10 );
		const material = new THREE.MeshStandardMaterial( { color: 0x00ff00} );
		this.modelo = new THREE.Mesh( geometry, material );
		scene.add( this.modelo );
		this.carrega(this);
		this.velCuboZ = 0.07;
		this.posiciona();
	}

	move() {
		this.modelo.rotation.x += 0.01;
		this.modelo.rotation.y += 0.01;
		this.modelo.position.z += this.velCuboZ;

		if(this.modelo.position.z > camera.position.z)
			this.posiciona();
	}

	trataColisao(pos) {
		let deltaX = pos.x - this.modelo.position.x;
		let deltaY = pos.y - this.modelo.position.y;
		let deltaZ = pos.z - this.modelo.position.z;
		let distancia = Math.sqrt(deltaX*deltaX + deltaY*deltaY + deltaZ*deltaZ);
		if(distancia < 2.0)
			this.posiciona();
	}
}

const nAsteroides = 10;
let asteroides = [];

for(let i = 0; i < nAsteroides; i++) {
	asteroides.push(new Asteroide());
}

let luz1 = new THREE.HemisphereLight(0xffffff, 0xff0000, 10);
scene.add(luz1);

function animate() {
	requestAnimationFrame( animate );

	for(let i = 0; i < nAsteroides; i++) {
		asteroides[i].move();
		asteroides[i].trataColisao(cube2.position);
	}

	cube2.position.z += velCubo2Z;

	camera.position.x += velX;
	camera.position.y += velY;

	renderer.render( scene, camera );
}
animate();

document.onkeyup = function(evento) {
	if(evento.key == "ArrowLeft")
		velX = 0.0;

	if(evento.key == "ArrowRight")
		velX = 0.0;

	if(evento.key == "ArrowUp")
		velY = 0.0;

	if(evento.key == "ArrowDown")
		velY = 0.0;
}

document.onkeydown = function(evento) {
	console.log(evento);

	if(evento.key == " "){
		cube2.position.x = camera.position.x;
		cube2.position.y = camera.position.y;
		cube2.position.z = camera.position.z;
	}

	if(evento.key == "ArrowLeft")
		velX = -cameraStep;

	if(evento.key == "ArrowRight")
		velX = cameraStep;

	if(evento.key == "ArrowUp")
		velY = cameraStep;

	if(evento.key == "ArrowDown")
		velY = -cameraStep;

}