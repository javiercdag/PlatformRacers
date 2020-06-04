class Level {
	constructor(player) {
		this.objects = [];
		this.objective = [];
		this.gravity;

		this.scene = new THREE.Scene();
		this.startingSpot;
		this.startingView;

		const loader = new THREE.CubeTextureLoader();
		const bgTexture = loader.load([
			'resources/images/front.png',
			'resources/images/back.png',
			'resources/images/up.png',
			'resources/images/down.png',
			'resources/images/left.png',
			'resources/images/right.png',
		]);

		this.scene.background = bgTexture;
		//this.scene.fog = new THREE.Fog(0x000000, 0, 750);

		this.light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
		this.light.position.set(0.5, 1, 0.75);
		this.scene.add(this.light);

		this.createLevel(player);
	}

	addElementToScene(element) {
		this.scene.add(element);
	}

	createLevel(player) {
		this.startingSpot = new THREE.Vector3(0, 65, 0);
		this.startingView = new THREE.Vector3(20, 60, 0);
		this.gravity = 7.0;

		//var floorGeometry = new THREE.PlaneBufferGeometry(2000, 2000, 100, 100);
		//floorGeometry.rotateX(- Math.PI / 2);

		//var floorMaterial = new THREE.MeshPhongMaterial({ color: 0xd0d5db });//new THREE.MeshBasicMaterial({ vertexColors: true });

		//var floor = new THREE.Mesh(floorGeometry, floorMaterial);
		//this.scene.add(floor);

		
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 50, 0), 100, 2, 100));
		this.scene.add(this.createPlatform(new THREE.Vector3(100, 50, 0), 40, 2, 40));
		this.scene.add(this.createPlatform(new THREE.Vector3(170, 50, 0), 40, 2, 40));
		this.scene.add(this.createPlatform(new THREE.Vector3(230, 55, 0), 40, 2, 40));

		var objectivePlatform = this.createPlatform(new THREE.Vector3(330, 55, 0), 40, 2, 400);
		this.objective.push(objectivePlatform);
		this.scene.add(objectivePlatform);

		player.position.set(this.startingSpot.x, this.startingSpot.y, this.startingSpot.z);
		player.lookAt(this.startingView);
	}

	createPlatform(position, width, height, depth) {
		var platformGeometry = new THREE.BoxBufferGeometry(width, height, depth);
		var platformMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
		var platform = new THREE.Mesh(platformGeometry, platformMaterial);
		platform.position.set(position.x, position.y, position.z);
		this.objects.push(platform);

		return platform;
    }

	getCollidableObjects() {
		return this.objects;
	}

	getGravity() {
		return this.gravity;
	}

	getObjective() {
		return this.objective;
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
	


}