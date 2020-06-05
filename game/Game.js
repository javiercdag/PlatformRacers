
import * as THREE from '../build/three.module.js';
import Stats from '../libs/stats.module.js';

import { PointerLockControls } from '../jsm/controls/PointerLockControls.js';

class Game {
	constructor() {

		this.raycaster;
		this.stats;
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
		this.camera.position.y = 10; // player height

		this.level = new Level(this.camera);

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

		this.crono = document.getElementById("crono");
		this.tempo = new THREE.Clock();
		this.totalTime = 0; //Controls the total time, to restart the chrono

		this.init();
		this.animate();



	}

init() {

	this.controls = new PointerLockControls(this.camera, document.body);
	this.stats = new Stats();
	var container = document.getElementById("stats");

	container.appendChild(this.stats.dom);

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

	this.level.addElementToScene(this.controls.getObject());

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
				if (that.canJump === true) that.velocity.y += 250;
				that.canJump = false;
				break;

			case 82: // r
				var startingSpot = that.level.getStartingSpot();
				that.camera.position.set(startingSpot.x, startingSpot.y, startingSpot.z);
				that.canJump = true;
				that.camera.lookAt(that.level.getStartingView());
				that.velocity.x = 0;
				that.velocity.z = 0;
				that.totalTime = that.tempo.oldTime;
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

	this.renderer = new THREE.WebGLRenderer({ antialias: true });
	this.renderer.setPixelRatio(window.devicePixelRatio);
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(this.renderer.domElement);

	window.addEventListener('resize', this.onWindowResize, false);


	//Audio
	var listener = new THREE.AudioListener();
	this.camera.add (listener);
	var sound = new THREE.Audio( listener );
	var audioLoader = new THREE.AudioLoader();
	audioLoader.load(this.level.getMusic(), function( buffer ) {
		sound.setBuffer( buffer );
		sound.setLoop( true );
		sound.setVolume( 0.5 );
		sound.play();
	});

}

onWindowResize() {

	this.camera.aspect = window.innerWidth / window.innerHeight;
	this.camera.updateProjectionMatrix();

	this.renderer.setSize(window.innerWidth, window.innerHeight);

}

animate() {

	requestAnimationFrame(()=>this.animate());
	this.stats.update();

	if (this.controls.isLocked === true) {

		this.raycaster.ray.origin.copy(this.controls.getObject().position);
		this.raycaster.ray.origin.y -= 10;

		var intersections = this.raycaster.intersectObjects(this.level.getCollidableObjects());
		var playerOnObjective = this.raycaster.intersectObjects(this.level.getObjective());

		var onObject = intersections.length > 0;
		var onObjective = playerOnObjective.length > 0;

		var time = performance.now();
		var delta = (time - this.prevTime) / 1000;

		this.velocity.x -= this.velocity.x * 3.5 * delta;
		this.velocity.z -= this.velocity.z * 3.5 * delta;

		var gravity = this.level.getGravity();

		this.velocity.y -= gravity * 90.0 * delta; // 100.0 = mass

		this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
		this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
		this.direction.normalize(); // this ensures consistent movements in all directions

		if (this.moveForward || this.moveBackward) this.velocity.z -= this.direction.z * 400.0 * delta;
		else if(onObject) this.velocity.z = 0;

		if (this.moveLeft || this.moveRight) this.velocity.x -= this.direction.x * 400.0 * delta;
		else if (onObject) this.velocity.x = 0;

		if (onObject === true) {

			this.velocity.y = Math.max(0, this.velocity.y);
			this.canJump = true;
		}
		else {
			this.canJump = false;
		}

		if (onObjective === true) {
			console.log("has ganado");
        }

		this.controls.moveRight(- this.velocity.x * delta);
		this.controls.moveForward(- this.velocity.z * delta);

		this.controls.getObject().position.y += (this.velocity.y * delta); // new behavior

		this.prevTime = time;

	}

	/* Fell off */
	if (this.camera.position.y < -100) {
		var startingSpot = this.level.getStartingSpot();
		this.camera.position.set(startingSpot.x, startingSpot.y, startingSpot.z);
		this.canJump = true;
		this.camera.lookAt(this.level.getStartingView());
		this.velocity.x = 0;
		this.velocity.z = 0;
		this.totalTime = this.tempo.oldTime;
	}

/* Crono */
	if (!this.tempo.running)
		this.tempo.start();

	this.tempo.stop();

	var timeElapsed = this.tempo.oldTime - this.totalTime;
	this.tempo.start();

	var secondsElapsed = timeElapsed / 1000;

	var hours = Math.floor(secondsElapsed / 60 / 60);

	var minutes = Math.floor(secondsElapsed / 60) - (hours * 60);

	var seconds = secondsElapsed % 60;

	var miliseconds = timeElapsed % 1000;

	var formatted = hours + ':' + minutes + ':' + Math.trunc(seconds) + ":" + miliseconds.toFixed(0);

	this.crono.innerHTML = formatted;

	this.renderer.render(this.level.getScene(), this.camera);


	}
}

var escena = new Game();
