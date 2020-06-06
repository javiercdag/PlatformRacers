
import * as THREE from '../build/three.module.js';
import Stats from '../libs/stats.module.js';

import { PointerLockControls } from '../jsm/controls/PointerLockControls.js';

class Game {
	constructor() {

		this.raycaster;
		this.stats;
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
		this.camera.position.y = 10; // player height

		switch (document.getElementById("level").innerHTML) {
			case "1":
				this.level = new Level1(this.camera);
				break;
        }

		this.moveForward = false;
		this.moveBackward = false;
		this.moveLeft = false;
		this.moveRight = false;
		this.canJump = false;
		this.canDoubleJump = false;
		this.canDash = false;
		this.dashImage = "resources/textures/dash.png";
		this.dashImageCD = "resources/textures/dashOff.png";
		this.doubleJumpImage = "resources/textures/doubleJump.png";
		this.doubleJumpImageCD = "resources/textures/doubleJumpOff.png";
		this.dashDiv = document.getElementById("dash");
		this.doubleJumpDiv = document.getElementById("doubleJump");
		this.gameFinished = false;

		this.prevTime = performance.now();
		this.velocity = new THREE.Vector3();
		this.direction = new THREE.Vector3();
		this.vertex = new THREE.Vector3();
		this.color = new THREE.Color();

		this.crono = document.getElementById("crono");
		this.tempo = new THREE.Clock(false);
		this.totalTime = 0; //Controls the total time, to restart the chrono
		this.startTheClock = false;
		this.highscore = 999999999999.0;

		this.init();
		this.animate();



	}

init() {

	this.controls = new PointerLockControls(this.camera, document.body);
	this.dashDiv.src = this.dashImageCD;
	this.doubleJumpDiv.src = this.doubleJumpImageCD;
	this.stats = new Stats();
	var container = document.getElementById("stats");

	container.appendChild(this.stats.dom);

	var blocker = document.getElementById('blocker');
	var instructions = document.getElementById('instructions');
	var resume = document.getElementById('resume');

	resume.addEventListener('click', function () {

		that.controls.lock();

	}, false);

	var that = this;

	document.getElementById("goAgain").addEventListener('click', function () {
		var startingSpot = that.level.getStartingSpot();

		that.gameFinished = false;
		that.camera.position.set(startingSpot.x, startingSpot.y, startingSpot.z);
		that.canJump = true;
		that.camera.lookAt(that.level.getStartingView());
		that.velocity.x = 0;
		that.velocity.z = 0;
		that.totalTime = that.tempo.oldTime;
		that.canDash = false;
		that.dashDiv.src = that.dashImageCD;
		that.canDoubleJump = false;
		that.doubleJumpDiv.src = that.doubleJumpImageCD;
		document.getElementById("crono").style.display = "block";
		that.controls.lock();

	}, false);

	

	this.controls.addEventListener('lock', function () {
		document.getElementById("levelFinished").style.display = 'none';
		instructions.style.display = 'none';
		blocker.style.display = 'none';
	});

	this.controls.addEventListener('unlock', function () {
		if (that.gameFinished) {
			blocker.style.display = 'block';
			document.getElementById("levelFinished").style.display = 'block';
		}
		else {
			blocker.style.display = 'block';
			instructions.style.display = '';
		}

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
				if (that.canJump === false && that.canDoubleJump === true){
					that.velocity.y += 250;
					that.canDoubleJump = false;
					that.doubleJumpDiv.src = that.doubleJumpImageCD;
				}

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
				that.canDash = false;
				that.dashDiv.src = that.dashImageCD;
				that.canDoubleJump = false;
				that.doubleJumpDiv.src = that.doubleJumpImageCD;
				break;

			case 16: //shift
				if (that.canDash) {
					that.direction.z = Number(that.moveForward) - Number(that.moveBackward);
					that.direction.x = Number(that.moveRight) - Number(that.moveLeft);
					that.direction.normalize(); // this ensures consistent movements in all directions

					that.velocity.z -= that.direction.z * 800.0;

					that.velocity.x -= that.direction.x * 800.0;
					that.canDash = false;
					that.dashDiv.src = that.dashImageCD;
				}

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

	//Resize window
	window.addEventListener('resize', function () {

		that.camera.aspect = window.innerWidth / window.innerHeight;
		that.camera.updateProjectionMatrix();

		that.renderer.setSize(window.innerWidth, window.innerHeight);

	});


	//Audio
	var listener = new THREE.AudioListener();
	this.camera.add (listener);
	this.sound = new THREE.Audio( listener );
	var audioLoader = new THREE.AudioLoader();
	audioLoader.load(this.level.getMusic(), function( buffer ) {
		that.sound.setBuffer( buffer );
		that.sound.setLoop( true );
		that.sound.setVolume(0.5);
		that.sound.play();
	});

}

animate() {
	requestAnimationFrame(() => this.animate());
	this.stats.update();

	if (this.level.isStartupDone()) {

		if (this.controls.isLocked === true) {
			this.startTheClock = true;
			this.raycaster.ray.origin.copy(this.controls.getObject().position);
			this.raycaster.ray.origin.y -= 10;

			var powerups = this.level.getPowerups();
			for (var i=0; i<powerups.length; i++){
				powerups[i][0].rotation.y += 0.05;
				var playerOnPowerup = this.raycaster.intersectObject(powerups[i][0]);
				var onPowerup = playerOnPowerup.length > 0;
				if (onPowerup) {
					switch (powerups[i][1]) {
						case "DASH":
							this.canDash = true;
							this.dashDiv.src = this.dashImage;
							break;
						case "DOUBLE-JUMP":
							this.canDoubleJump = true;
							this.doubleJumpDiv.src = this.doubleJumpImage;
							break;
                    }
				}
			}

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
			else if (onObject) this.velocity.z = 0;

			if (this.moveLeft || this.moveRight) this.velocity.x -= this.direction.x * 400.0 * delta;
			else if (onObject) this.velocity.x = 0;

			if (onObject === true) {

				this.velocity.y = Math.max(0, this.velocity.y);
				this.canJump = true;
			}
			else {
				this.canJump = false;
			}

			if (onObjective === true) { //endgame
				this.gameFinished = true;
				this.controls.unlock();
				document.getElementById("crono").style.display = "none";
				var timeElapsed = this.tempo.oldTime - this.totalTime;

				if (timeElapsed < this.highscore) {
					this.highscore = timeElapsed;
					var secondsElapsed = timeElapsed / 1000;

					var hours = Math.floor(secondsElapsed / 60 / 60);

					var minutes = Math.floor(secondsElapsed / 60) - (hours * 60);

					var seconds = secondsElapsed % 60;

					var miliseconds = timeElapsed % 1000;

					var formatted = '';
					var secondsFormatted = Math.trunc(seconds);
					if (secondsFormatted < 10) {
						secondsFormatted = "0" + secondsFormatted;
					}
					var minutesFormatted = minutes;
					if (minutesFormatted < 10) {
						minutesFormatted = "0" + minutesFormatted;
					}
					if (hours != 0)
						formatted += hours + ':';

					formatted += "Highscore: " + minutesFormatted + ":" + secondsFormatted + ":" + (miliseconds / 10).toFixed(0);

					document.getElementById("highscore").innerHTML = formatted;
                }
			}

			this.controls.moveRight(- this.velocity.x * delta);
			this.controls.moveForward(- this.velocity.z * delta);

			this.controls.getObject().position.y += (this.velocity.y * delta); // new behavior

			this.prevTime = time;

		}


		if (this.startTheClock == true) {/* Crono */

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

			var formatted = '';
			var secondsFormatted = Math.trunc(seconds);
			if (secondsFormatted < 10){
				secondsFormatted = "0" + secondsFormatted;
			}
			var minutesFormatted = minutes;
			if (minutesFormatted < 10){
				minutesFormatted = "0" + minutesFormatted;
			}
			if (hours != 0)
				formatted += hours + ':';

			formatted += minutesFormatted + ":" + secondsFormatted + ":" + (miliseconds/10).toFixed(0);

			this.crono.innerHTML = formatted;
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
			this.canDash = false;
			this.dashDiv.src = this.dashImageCD;
			this.canDoubleJump = false;
			this.doubleJumpDiv.src = this.doubleJumpImageCD;
		}


	}
	else {
		TWEEN.update();

		if (this.controls.isLocked === true) {
			this.level.setStartupDone(true);
		}
	}

	this.renderer.render(this.level.getScene(), this.camera);

	if (document.getElementById("musicRange").value >= 0 && document.getElementById("musicRange").value <= 100)
		this.sound.setVolume(document.getElementById("musicRange").value / 100.0);

}
}

var escena = new Game();
