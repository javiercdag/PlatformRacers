class Level {
	constructor(player) {
		this.objects = [];
		this.objective = [];
		this.gravity;

		this.scene = new THREE.Scene();
		this.startingSpot;
		this.startingView;

		this.music = '../resources/music/ElectronicFantasy.ogg';

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


		//Plataforma inicial
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 50, 0), 100, 2, 100,'resources/textures/moon.jpg'));

		//Conector 1
		this.scene.add(this.createPlatform(new THREE.Vector3(120, 80, 0), 40, 2, 40,'resources/textures/moon.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(190, 110, 0), 40, 2, 40,'resources/textures/moon.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(260, 140, 0), 40, 2, 40,'resources/textures/moon.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(340, 140, 50), 40, 2, 40,'resources/textures/moon.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(450, 140, 90), 40, 2, 40,'resources/textures/moon.jpg'));

		//Conector 2
		this.scene.add(this.createPlatform(new THREE.Vector3(540, 55, 0), 30, 2, 200,'resources/textures/moon.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(620, 55, -200), 30, 2, 200,'resources/textures/moon.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(700, 55, -420), 30, 2, 200,'resources/textures/moon.jpg'));

		this.scene.add(this.createPlatform(new THREE.Vector3(780, 55, -480), 30, 2, 40,'resources/textures/moon.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(850, 55, -450), 30, 2, 40,'resources/textures/moon.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(850, 55, -350), 30, 2, 40,'resources/textures/moon.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(850, 55, -280), 50, 2, 50,'resources/textures/moon.jpg'));

		var objectivePlatform = this.createPlatform(new THREE.Vector3(1030, 55, 0), 400, 2, 400,'resources/textures/moon.jpg');
		this.objective.push(objectivePlatform);
		this.scene.add(objectivePlatform);

		player.position.set(this.startingSpot.x, this.startingSpot.y, this.startingSpot.z);
		player.lookAt(this.startingView);
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
