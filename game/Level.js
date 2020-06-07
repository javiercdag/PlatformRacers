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

	createMovingPlatform(initialPosition, endingPosition, width, height, depth, texture, time) {
		var platform = this.createPlatform(initialPosition, width, height, depth, texture);

		var origin = initialPosition;
		var end = endingPosition;

		var that = this;
		var platformToEnd = new TWEEN.Tween(origin).to(end, time).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
			platform.position.set(origin.x, origin.y, origin.z);
		});

		var origin2 = JSON.parse(JSON.stringify(endingPosition));
		var end2 = JSON.parse(JSON.stringify(initialPosition));

		var platformToOrigin = new TWEEN.Tween(origin2).to(end2, time).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
			platform.position.set(origin2.x, origin2.y, origin2.z);
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
