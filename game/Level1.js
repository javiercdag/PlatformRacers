class Level1 extends Level {
    constructor(player) {
        super(player);
    }

	createLevel(player) {
		this.startingSpot = new THREE.Vector3(0, 65, 0);
		this.startingView = new THREE.Vector3(20, 60, 0);
		this.gravity = 7.0;

		this.cinematicCoordenates.push([new THREE.Vector3(-50, 300, 0), new THREE.Vector3(1030, 300, 0), new THREE.Vector3(1100, 60, 0)]);

		//Plataforma inicial
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 50, 0), 100, 2, 100, 'resources/textures/moon.jpg'));

		//Conector 1
		this.scene.add(this.createPlatform(new THREE.Vector3(120, 80, 0), 40, 2, 40, 'resources/textures/moon.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(190, 110, 0), 40, 2, 40, 'resources/textures/moon.jpg'));
		this.scene.add(this.createPowerup(new THREE.Vector3(190, 110, 0), 'resources/textures/dash.png', "DASH"));
		this.scene.add(this.createPlatform(new THREE.Vector3(260, 140, 0), 40, 2, 40, 'resources/textures/moon.jpg'));
		this.scene.add(this.createPowerup(new THREE.Vector3(260, 140, 0), 'resources/textures/doubleJump.png', "DOUBLE-JUMP"));
		this.scene.add(this.createPlatform(new THREE.Vector3(340, 140, 50), 40, 2, 40, 'resources/textures/moon.jpg'));
		this.scene.add(this.createPowerup(new THREE.Vector3(340, 140, 50), 'resources/textures/doubleJump.png', "DOUBLE-JUMP"));
		this.scene.add(this.createPlatform(new THREE.Vector3(450, 140, 90), 40, 2, 40, 'resources/textures/moon.jpg'));

		//Conector 2
		this.scene.add(this.createBouncingPlatform(new THREE.Vector3(540, 55, -20), 30, 2, 30));
		this.scene.add(this.createSpeedPlatform(new THREE.Vector3(620, 55, -200), 30, 2, 200));
		this.scene.add(this.createPlatform(new THREE.Vector3(700, 55, -420), 30, 2, 200, 'resources/textures/moon.jpg'));

		this.scene.add(this.createPlatform(new THREE.Vector3(780, 55, -480), 30, 2, 40, 'resources/textures/moon.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(850, 55, -450), 30, 2, 40, 'resources/textures/moon.jpg'));
		this.scene.add(this.createMovingPlatform(new THREE.Vector3(850, 55, -370), new THREE.Vector3(850, 55, -280), 40, 2, 40, 'resources/textures/moon.jpg', 3000));

		var objectivePlatform = this.createPlatform(new THREE.Vector3(1030, 55, 0), 400, 2, 400, 'resources/textures/moon.jpg');

		this.objective.push(objectivePlatform);
		this.scene.add(objectivePlatform);
	}

    createMusic() {
        this.music = '../resources/music/ElectronicFantasy.ogg';
    }

    createTexture() {
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
	}

	startupCinematic(player) {
		var origin = this.cinematicCoordenates[0][0];
		var ending = this.cinematicCoordenates[0][1];
		var whereToLook = this.cinematicCoordenates[0][2];

		var that = this;
		this.startupCinematic = new TWEEN.Tween(origin).to(ending, 10000).easing(TWEEN.Easing.Quadratic.InOut).onComplete(function () {
			that.startupDone = true;

		}).onUpdate(function () {
            player.position.copy(origin);
			player.lookAt(whereToLook);
		});

		this.startupCinematic.start();

	}
}
