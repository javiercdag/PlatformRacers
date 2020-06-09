class Level1 extends Level {
    constructor(player) {
        super(player);
    }

	createLevel(player) {
		this.startingSpot = new THREE.Vector3(-20, 65, 0);
		this.startingView = new THREE.Vector3(20, 65, 0);
		this.gravity = 6.0;

		this.cinematicCoordenates.push([new THREE.Vector3(-50, 300, 0), new THREE.Vector3(1030, 300, 0), new THREE.Vector3(1100, 60, 0)]);

		// Initial platform
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 50, 0), 100, 2, 100, 'resources/textures/moon.jpg'));
		this.scene.add(this.createIndicator(new THREE.Vector3(50, 70, 25), 'resources/textures/level1Title.png', 30, false)); // level info

		// Connector
		this.scene.add(this.createPlatform(new THREE.Vector3(120, 80, 0), 40, 2, 40, 'resources/textures/moon.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(190, 110, 0), 40, 2, 40, 'resources/textures/moon.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(260, 140, 0), 40, 2, 40, 'resources/textures/moon.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(340, 140, 50), 40, 2, 40, 'resources/textures/moon.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(450, 140, 90), 40, 2, 40, 'resources/textures/moon.jpg'));

		// 2nd Connector
		this.scene.add(this.createBouncingPlatform(new THREE.Vector3(550, 85, 90), 30, 2, 30));
    this.scene.add(this.createBouncingPlatform(new THREE.Vector3(650, 85, 90), 30, 2, 30));
    this.scene.add(this.createPlatform(new THREE.Vector3(750, 110, 90), 40, 2, 40, 'resources/textures/moon.jpg'));
    this.scene.add(this.createMovingPlatform(new THREE.Vector3(800, 110, 90), new THREE.Vector3(950, 110, 90), 30, 2, 30, 'resources/textures/moon.jpg', 6000, player));
    this.scene.add(this.createPlatform(new THREE.Vector3(1000, 80, 90), 30, 2, 30, 'resources/textures/moon.jpg'));
    this.scene.add(this.createPowerup(new THREE.Vector3(1000, 80, 90), 'resources/textures/doubleJump.png', "DOUBLE-JUMP"));
    this.scene.add(this.createIndicator(new THREE.Vector3(1150, 110, 90), 'resources/textures/doubleJumpRequired.jpg', 10, false));
    this.scene.add(this.createBouncingPlatform(new THREE.Vector3(1100, 80, 90), 30, 2, 30));
    this.scene.add(this.createPlatform(new THREE.Vector3(1200, 220, 90), 30, 2, 30, 'resources/textures/moon.jpg'));

    //Bouncing zone
    this.scene.add(this.createBouncingPlatform(new THREE.Vector3(1200, 220, -10), 30, 2, 30));
    this.scene.add(this.createBouncingPlatform(new THREE.Vector3(1200, 220, -130), 30, 2, 30));
    this.scene.add(this.createBouncingPlatform(new THREE.Vector3(1200, 220, -240), 30, 2, 30));
    this.scene.add(this.createBouncingPlatform(new THREE.Vector3(1300, 230, -240), 30, 2, 30));
    this.scene.add(this.createBouncingPlatform(new THREE.Vector3(1380, 230, -130), 30, 2, 30));
    this.scene.add(this.createBouncingPlatform(new THREE.Vector3(1460, 230, -10), 30, 2, 30));

    //Last section
    this.scene.add(this.createPlatform(new THREE.Vector3(1540, 230, -10), 30, 2, 30, 'resources/textures/moon.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(1540, 230, -110), 30, 2, 30, 'resources/textures/moon.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(1640, 240, -110), 30, 2, 30, 'resources/textures/moon.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(1640, 250, -210), 30, 2, 30, 'resources/textures/moon.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(1740, 260, -210), 30, 2, 30, 'resources/textures/moon.jpg'));

    //Speed section
    this.scene.add(this.createSpeedPlatform(new THREE.Vector3(1850, 260, -210), 80, 2, 20));
    this.scene.add(this.createSpeedPlatform(new THREE.Vector3(2000, 260, -110), 80, 2, 20));
    this.scene.add(this.createSpeedPlatform(new THREE.Vector3(2150, 260, -10), 80, 2, 20));
    this.scene.add(this.createSpeedPlatform(new THREE.Vector3(2300, 260, 90), 80, 2, 20));

    this.scene.add(this.createBouncingPlatform(new THREE.Vector3(2400, 260, 90), 20, 2, 20));
    this.scene.add(this.createPowerup(new THREE.Vector3(2400, 260, 90), 'resources/textures/dash.png', "DASH"));



		// Objective
		var objectivePlatform = this.createPlatform(new THREE.Vector3(2700, 250, 90), 50, 2, 50, 'resources/textures/crown.png');
		objectivePlatform.rotation.y = Math.PI;

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
