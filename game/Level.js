class Level {
	constructor(player) {
		this.objects = [];
		this.bouncingPlatforms = [];
		this.speedPlatforms = [];
		this.powerups = [];
		this.indicators = [];
		this.rotatingIndicators = [];
		this.objective = [];
		this.gravity;
		this.cinematicCoordenates = [];
		this.startupDone = false;
		this.startupCinematic;

		this.scene = new THREE.Scene();
		this.startingSpot;
		this.startingView;

		this.createTexture();
		this.createMusic();

		//this.scene.fog = new THREE.Fog(0x000000, 0, 700);

		this.light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
		this.light.position.set(0.5, 1, 0.75);
		this.scene.add(this.light);
		this.createLevel(player);
		this.startupCinematic(player);

		player.position.set(this.startingSpot.x, this.startingSpot.y, this.startingSpot.z);
		player.lookAt(this.startingView);
	}

	addElementToScene(element) {
		this.scene.add(element);
	}

	createIndicator(position, texture, size, rotate) {
		var indicatorGeometry = new THREE.PlaneBufferGeometry(size, size, 100, 100);
		var indicatorTexture = new THREE.TextureLoader().load(texture);
		var indicatorMaterial = new THREE.MeshBasicMaterial({ map: indicatorTexture });
		indicatorMaterial.transparent = true;
		var indicator = new THREE.Mesh(indicatorGeometry, indicatorMaterial);
		indicator.material.side = THREE.DoubleSide;

		indicator.position.set(position.x, position.y, position.z);

		if (rotate)
			this.rotatingIndicators.push(indicator);
		else
			this.indicators.push(indicator);

		return indicator;
	}

	createLevel(player) {

	}

	createBouncingPlatform(position, width, height, depth) {
		var platform = this.createPlatform(position, width, height, depth, 'resources/textures/bouncing.png');

		this.bouncingPlatforms.push(platform);
		var indicatorNE = this.createIndicator(new THREE.Vector3(position.x + width / 2.0, position.y + 5.0, position.z - depth / 2.0), 'resources/textures/bouncingFX.png', 7, true);
		var indicatorNW = this.createIndicator(new THREE.Vector3(position.x - width / 2.0, position.y + 5.0, position.z - depth / 2.0), 'resources/textures/bouncingFX.png', 7, true);
		var indicatorSE = this.createIndicator(new THREE.Vector3(position.x + width / 2.0, position.y + 5.0, position.z + depth / 2.0), 'resources/textures/bouncingFX.png', 7, true);
		var indicatorSW = this.createIndicator(new THREE.Vector3(position.x - width / 2.0, position.y + 5.0, position.z + depth / 2.0), 'resources/textures/bouncingFX.png', 7, true);

		this.scene.add(indicatorNE);
		this.scene.add(indicatorNW);
		this.scene.add(indicatorSE);
		this.scene.add(indicatorSW);

		return platform;
    }

	createPlatform(position, width, height, depth, texture) {
		var platformGeometry = new THREE.BoxBufferGeometry(width, height, depth);

		var texture = new THREE.TextureLoader().load( texture );
		var platformMaterial = new THREE.MeshBasicMaterial( { map: texture } );
		//var platformMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
		var platform = new THREE.Mesh(platformGeometry, platformMaterial);
		platform.position.set(position.x, position.y, position.z);
		this.objects.push(platform);

		return platform;
	}

	createSpeedPlatform(position, width, height, depth) {
		var platform = this.createPlatform(position, width, height, depth, 'resources/textures/speedPlatform.png');

		this.speedPlatforms.push(platform);
		var indicatorNE = this.createIndicator(new THREE.Vector3(position.x + width / 2.0, position.y + 5.0, position.z - depth / 2.0), 'resources/textures/speedFX.png', 7, true);
		var indicatorNW = this.createIndicator(new THREE.Vector3(position.x - width / 2.0, position.y + 5.0, position.z - depth / 2.0), 'resources/textures/speedFX.png', 7, true);
		var indicatorSE = this.createIndicator(new THREE.Vector3(position.x + width / 2.0, position.y + 5.0, position.z + depth / 2.0), 'resources/textures/speedFX.png', 7, true);
		var indicatorSW = this.createIndicator(new THREE.Vector3(position.x - width / 2.0, position.y + 5.0, position.z + depth / 2.0), 'resources/textures/speedFX.png', 7, true);

		this.scene.add(indicatorNE);
		this.scene.add(indicatorNW);
		this.scene.add(indicatorSE);
		this.scene.add(indicatorSW);

		return platform;
	}

	// In order to allow the platform to carry the player when it moves, we've had to make some sacrifices in terms on both code readability
	// and code efficiency inside of this function.
	createMovingPlatform(initialPosition, endingPosition, width, height, depth, texture, time, player) {
		var platform = this.createPlatform(initialPosition, width, height, depth, texture);

		// Variables of the first half of the platform movement
		var firstOrigin = JSON.parse(JSON.stringify(initialPosition));
		var firstEnd = JSON.parse(JSON.stringify(endingPosition));
		var firstPrevOrigin = JSON.parse(JSON.stringify(firstOrigin));
		var firstDisplacement = new THREE.Vector3(0, 0, 0);
		var that = this;

		var firstHalfMovement = new TWEEN.Tween(firstOrigin).to(firstEnd, time).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
			platform.position.set(firstOrigin.x, firstOrigin.y, firstOrigin.z);
			firstDisplacement.x = firstOrigin.x - firstPrevOrigin.x;
			firstDisplacement.y = firstOrigin.y - firstPrevOrigin.y;
			firstDisplacement.z = firstOrigin.z - firstPrevOrigin.z;

			if (player.position.y > (firstOrigin.y + 18) && player.position.y < (firstOrigin.y + 22) && player.position.x > (firstOrigin.x - width / 2.0) && player.position.x < (firstOrigin.x + width / 2.0)
				&& player.position.z > (firstOrigin.z - depth / 2.0) && player.position.z < (firstOrigin.z + depth / 2.0)) { // player in platform

				if (firstDisplacement.x < 1 && firstDisplacement.x > -1 && firstDisplacement.y < 1 && firstDisplacement.y > -1 && firstDisplacement.z < 1 && firstDisplacement.z > -1) {
					player.position.x += firstDisplacement.x;
					player.position.y += firstDisplacement.y;
					player.position.z += firstDisplacement.z;
				}
			}

			firstPrevOrigin = JSON.parse(JSON.stringify(firstOrigin));
		});

		var secondOrigin = JSON.parse(JSON.stringify(endingPosition));
		var secondEnd = JSON.parse(JSON.stringify(initialPosition));
		var secondPrevOrigin = JSON.parse(JSON.stringify(secondOrigin));
		var secondDisplacement = new THREE.Vector3(0, 0, 0);

		var secondHalfMovement = new TWEEN.Tween(secondOrigin).to(secondEnd, time).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
			platform.position.set(secondOrigin.x, secondOrigin.y, secondOrigin.z);

			secondDisplacement.x = secondOrigin.x - secondPrevOrigin.x;
			secondDisplacement.y = secondOrigin.y - secondPrevOrigin.y;
			secondDisplacement.z = secondOrigin.z - secondPrevOrigin.z;

			if (player.position.y > (secondOrigin.y + 18) && player.position.y < (secondOrigin.y + 22) && player.position.x > (secondOrigin.x - width / 2.0) && player.position.x < (secondOrigin.x + width / 2.0)
				&& player.position.z > (secondOrigin.z - depth / 2.0) && player.position.z < (secondOrigin.z + depth / 2.0)) { // player in platform

				if (secondDisplacement.x < 1 && secondDisplacement.x > -1 && secondDisplacement.y < 1 && secondDisplacement.y > -1 && secondDisplacement.z < 1 && secondDisplacement.z > -1) {
					player.position.x += secondDisplacement.x;
					player.position.y += secondDisplacement.y;
					player.position.z += secondDisplacement.z;
				}
			}

			secondPrevOrigin = JSON.parse(JSON.stringify(secondOrigin));
		});

		firstHalfMovement.chain(secondHalfMovement);
		secondHalfMovement.chain(firstHalfMovement);
		firstHalfMovement.start();

		return platform;
	}

	createPowerup(position, texture, type) {
		var powerupColliderGeometry =  new THREE.BoxBufferGeometry(15, 2, 15);
		var powerupGeometry = new THREE.PlaneBufferGeometry(10,10,100,100);

		var powerupTexture = new THREE.TextureLoader().load(texture);
		var powerupMaterial = new THREE.MeshBasicMaterial( { map: powerupTexture } );
		powerupMaterial.transparent = true;
		var powerup = new THREE.Mesh(powerupGeometry,powerupMaterial);

		var powerupColliderMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
		powerupColliderMaterial.colorWrite = false;
		var powerupCollider = new THREE.Mesh(powerupColliderGeometry,powerupColliderMaterial);



		powerup.material.side = THREE.DoubleSide;
		powerup.position.set(0, 10, 0);


		powerupCollider.position.set(position.x, position.y, position.z);

		powerupCollider.add(powerup);

		this.powerups.push([powerupCollider, type]);

		return powerupCollider;
	}

	createMusic() {

	}

	createTexture() {

	}

	getBouncingPlatforms() {
		return this.bouncingPlatforms;
    }

	getCollidableObjects() {
		return this.objects;
	}

	getGravity() {
		return this.gravity;
	}

	getIndicators() {
		return this.indicators;
	}

	getMusic() {
		return this.music;
	}

	getObjective() {
		return this.objective;
	}

	getPowerups() {
		return this.powerups;
	}

	getRotatingIndicators() {
		return this.rotatingIndicators;
    }

	getScene() {
		return this.scene;
	}

	getSpeedPlatforms() {
		return this.speedPlatforms;
	}

	getStartingSpot() {
		return this.startingSpot;
    }

	getStartingView() {
		return this.startingView;
	}

	getStartupCinematic() {
		return this.startupCinematic;
	}

	isStartupDone() {
		return this.startupDone;
	}

	setStartupDone(option) {
		this.startupDone = option;
	}

	startupCinematic(player) {

    }

}
