class Level {
	constructor(player) {
		this.objects = [];
		this.powerups = [];
		this.objective = [];
		this.gravity;
		this.cinematicCoordenates = [];
		this.startupDone = false;

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

	createLevel(player) {

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

		createPowerup(position, texture) {
			var powerupColliderGeometry =  new THREE.BoxBufferGeometry(10, 2, 10);
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

			this.powerups.push(powerupCollider);

			return powerupCollider;
		}

	createMusic() {

	}

	createTexture() {

	}


	getCollidableObjects() {
		return this.objects;
	}

	getGravity() {
		return this.gravity;
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

	getScene() {
		return this.scene;
	}

	getStartingSpot() {
		return this.startingSpot;
    }

	getStartingView() {
		return this.startingView;
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
