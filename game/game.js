
import * as THREE from '../build/three.module.js';

import { PointerLockControls } from '../jsm/controls/PointerLockControls.js';

class game {
	constructor() {

		this.objects = [];

		this.raycaster;

		this.moveForward = false;
		this.moveBackward = false;
		this.moveLeft = false;
		this.moveRight = false;
		this.canJump = false;

		this.prevTime = performance.now();
		this.velocity = new THREE.Vector3();
		this.direction = new THREE.Vector3();
		this.vertex = new THREE.Vector3();
		this.color = new THREE.Color();
		this.scene = new THREE.Scene();
		this.crono = document.getElementById("crono");
		this.tempo = new THREE.Clock();
		this.init();
		this.animate();

		
	}

init() {

	this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
	this.camera.position.y = 10;

	
	this.scene.background = new THREE.Color(0xffffff);
	this.scene.fog = new THREE.Fog(0xffffff, 0, 750);
	
	this.light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
	this.light.position.set(0.5, 1, 0.75);
	this.scene.add(this.light);

	this.controls = new PointerLockControls(this.camera, document.body);

	var blocker = document.getElementById('blocker');
	var instructions = document.getElementById('instructions');

	var that = this;
	instructions.addEventListener('click', function () {

		that.controls.lock();

	}, false);

	this.controls.addEventListener('lock', function () {

		instructions.style.display = 'none';
		blocker.style.display = 'none';

	});

	this.controls.addEventListener('unlock', function () {

		blocker.style.display = 'block';
		instructions.style.display = '';

	});

	this.scene.add(this.controls.getObject());

	this.onKeyDown = function (event) {

		switch (event.keyCode) {

			case 38: // up
			case 87: // w
				that.moveForward = true;
				break;

			case 37: // left
			case 65: // a
				that.moveLeft = true;
				break;

			case 40: // down
			case 83: // s
				that.moveBackward = true;
				break;

			case 39: // right
			case 68: // d
				that.moveRight = true;
				break;

			case 32: // space
				if (that.canJump === true) that.velocity.y += 350;
				that.canJump = false;
				break;

		}

	};

	this.onKeyUp = function (event) {
		
		switch (event.keyCode) {

			case 38: // up
			case 87: // w
				that.moveForward = false;
				break;

			case 37: // left
			case 65: // a
				that.moveLeft = false;
				break;

			case 40: // down
			case 83: // s
				that.moveBackward = false;
				break;

			case 39: // right
			case 68: // d
				that.moveRight = false;
				break;

		}

	};

	document.addEventListener('keydown', this.onKeyDown, false);
	document.addEventListener('keyup', this.onKeyUp, false);

	this.raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 10);

	// floor

	var floorGeometry = new THREE.PlaneBufferGeometry(2000, 2000, 100, 100);
	floorGeometry.rotateX(- Math.PI / 2);

	// this.vertex displacement

	var position = floorGeometry.attributes.position;

	for (var i = 0, l = position.count; i < l; i++) {

		this.vertex.fromBufferAttribute(position, i);

		this.vertex.x += Math.random() * 20 - 10;
		this.vertex.y += Math.random() * 2;
		this.vertex.z += Math.random() * 20 - 10;

		position.setXYZ(i, this.vertex.x, this.vertex.y, this.vertex.z);

	}

	floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

	position = floorGeometry.attributes.position;
	var colors = [];

	for (var i = 0, l = position.count; i < l; i++) {

		this.color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
		colors.push(this.color.r, this.color.g, this.color.b);

	}

	floorGeometry.setAttribute('this.color', new THREE.Float32BufferAttribute(colors, 3));

	var floorMaterial = new THREE.MeshPhongMaterial({ color: 0xd0d5db });//new THREE.MeshBasicMaterial({ vertexColors: true });

	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	this.scene.add(floor);

	// this.objects
	
	var boxGeometry = new THREE.BoxBufferGeometry(20, 2, 20);
	boxGeometry = boxGeometry.toNonIndexed(); // ensure each face has unique vertices

	position = boxGeometry.attributes.position;
	colors = [];

	for (var i = 0, l = position.count; i < l; i++) {

		this.color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
		colors.push(this.color.r, this.color.g, this.color.b);

	}

	boxGeometry.setAttribute('this.color', new THREE.Float32BufferAttribute(colors, 3));

	for (var i = 0; i < 500; i++) {

		var boxMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });//new THREE.MeshPhongMaterial({ specular: 0xffffff, flatShading: true, vertexColors: true });
		//boxMaterial.color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);

		var box = new THREE.Mesh(boxGeometry, boxMaterial);
		box.position.x = Math.floor(Math.random() * 20 - 10) * 20;
		box.position.y = Math.floor(Math.random() * 20) * 20 + 10;
		box.position.z = Math.floor(Math.random() * 20 - 10) * 20;

		this.camera.position.set(box.position.x, box.position.y+20, box.position.z); // ELIMINAR 

		this.scene.add(box);
		this.objects.push(box);

	}
	
	//

	this.renderer = new THREE.WebGLRenderer({ antialias: true });
	this.renderer.setPixelRatio(window.devicePixelRatio);
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(this.renderer.domElement);

	//

	window.addEventListener('resize', this.onWindowResize, false);

}

onWindowResize() {

	this.camera.aspect = window.innerWidth / window.innerHeight;
	this.camera.updateProjectionMatrix();

	this.renderer.setSize(window.innerWidth, window.innerHeight);

}

animate() {

	requestAnimationFrame(()=>this.animate());

	if (this.controls.isLocked === true) {

		this.raycaster.ray.origin.copy(this.controls.getObject().position);
		this.raycaster.ray.origin.y -= 10;

		var intersections = this.raycaster.intersectObjects(this.objects);

		var onObject = intersections.length > 0;

		var time = performance.now();
		var delta = (time - this.prevTime) / 1000;

		this.velocity.x -= this.velocity.x * 5.0 * delta;
		this.velocity.z -= this.velocity.z * 5.0 * delta;

		this.velocity.y -= 9.8 * 110.0 * delta; // 100.0 = mass

		this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
		this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
		this.direction.normalize(); // this ensures consistent movements in all directions

		if (this.moveForward || this.moveBackward) this.velocity.z -= this.direction.z * 400.0 * delta;
		if (this.moveLeft || this.moveRight) this.velocity.x -= this.direction.x * 400.0 * delta;

		if (onObject === true) {

			this.velocity.y = Math.max(0, this.velocity.y);
			this.canJump = true;
		}

		this.controls.moveRight(- this.velocity.x * delta);
		this.controls.moveForward(- this.velocity.z * delta);

		this.controls.getObject().position.y += (this.velocity.y * delta); // new behavior

		if (this.controls.getObject().position.y < 10) {

			this.velocity.y = 0;
			this.controls.getObject().position.y = 10;

			this.canJump = true;

		}

		this.prevTime = time;

	}

	/* Fell off *//*
	if (this.camera.position.y < 10.5) {
		this.camera.position.set(25,125,0)
	}*/

/* Crono */
	if (!this.tempo.running)
		this.tempo.start();

	this.tempo.stop();
	
	var timeElapsed = this.tempo.oldTime;
	this.tempo.start();

	var secondsElapsed = timeElapsed / 1000;

	var hours = Math.floor(secondsElapsed / 60 / 60);

	var minutes = Math.floor(secondsElapsed / 60) - (hours * 60);

	var seconds = secondsElapsed % 60;

	var miliseconds = timeElapsed % 1000;

	var formatted = hours + ':' + minutes + ':' + Math.trunc(seconds) + ":" + miliseconds.toFixed(0);

	this.crono.innerHTML = formatted;
	
	this.renderer.render(this.scene, this.camera);

	for (var i = 0; i < this.objects.length; i++) {
		this.objects[i].position.x += 0.5;
	}

	if (onObject) {
		this.camera.position.x += 0.5;
    }

}
}

var escena = new game();
