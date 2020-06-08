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

	// In order to allow the platform to carry the player when it moves, we've had to make some sacrifices in terms on both code readability
	// and code efficiency inside of this function.
	createMovingPlatform(initialPosition, endingPosition, width, height, depth, texture, time, player) {
		var platform = this.createPlatform(initialPosition, width, height, depth, texture);

		var origin = JSON.parse(JSON.stringify(initialPosition));
		var end = JSON.parse(JSON.stringify(endingPosition));
		var prevOrigin = JSON.parse(JSON.stringify(origin));
		var translation = new THREE.Vector3(0, 0, 0);
		var that = this;

		var platformToEnd = new TWEEN.Tween(origin).to(end, time).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
			platform.position.set(origin.x, origin.y, origin.z);
			translation.x = origin.x - prevOrigin.x;
			translation.y = origin.y - prevOrigin.y;
			translation.z = origin.z - prevOrigin.z;

			if (player.position.y > (origin.y + 18) && player.position.y < (origin.y + 22) && player.position.x > (origin.x - width / 2.0) && player.position.x < (origin.x + width / 2.0)
				&& player.position.z > (origin.z - depth / 2.0) && player.position.z < (origin.z + depth / 2.0)) { // player in platform

				if (translation.x < 1 && translation.x > -1 && translation.y < 1 && translation.y > -1 && translation.z < 1 && translation.z > -1) {
					player.position.x += translation.x;
					player.position.y += translation.y;
					player.position.z += translation.z;
				}
			}

			prevOrigin = JSON.parse(JSON.stringify(origin));
		});

		var origin2 = JSON.parse(JSON.stringify(endingPosition));
		var end2 = JSON.parse(JSON.stringify(initialPosition));
		var prevOrigin2 = JSON.parse(JSON.stringify(origin2));
		var translation2 = new THREE.Vector3(0, 0, 0);

		var platformToOrigin = new TWEEN.Tween(origin2).to(end2, time).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
			platform.position.set(origin2.x, origin2.y, origin2.z);

			translation2.x = origin2.x - prevOrigin2.x;
			translation2.y = origin2.y - prevOrigin2.y;
			translation2.z = origin2.z - prevOrigin2.z;

			if (player.position.y > (origin2.y + 18) && player.position.y < (origin2.y + 22) && player.position.x > (origin2.x - width / 2.0) && player.position.x < (origin2.x + width / 2.0)
				&& player.position.z > (origin2.z - depth / 2.0) && player.position.z < (origin2.z + depth / 2.0)) { // player in platform

				if (translation2.x < 1 && translation2.x > -1 && translation2.y < 1 && translation2.y > -1 && translation2.z < 1 && translation2.z > -1) {
					player.position.x += translation2.x;
					player.position.y += translation2.y;
					player.position.z += translation2.z;
				}
			}
			
			prevOrigin2 = JSON.parse(JSON.stringify(origin2));
		});

		platformToEnd.chain(platformToOrigin);
		platformToOrigin.chain(platformToEnd);
		platformToEnd.start();

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
