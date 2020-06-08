class Level0 extends Level {
    constructor(player) {
        super(player);
    }

	createLevel(player) {
		this.startingSpot = new THREE.Vector3(0, 65, -20);
		this.startingView = new THREE.Vector3(0, 65, 20);
		this.gravity = 7.0;

		this.cinematicCoordenates.push([new THREE.Vector3(0, 100, -50), new THREE.Vector3(0, 250, 1900), new THREE.Vector3(0, 150, 2050)]);

		// Plataforma inicial
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 50, 0), 100, 2, 100, 'resources/textures/dirt.jpg'));
		this.scene.add(this.createIndicator(new THREE.Vector3(-30, 70, 30), 'resources/textures/level0Title.png', 30, false)); // tutorial title
		this.scene.add(this.createIndicator(new THREE.Vector3(25, 70, 70), 'resources/textures/tutorialTip0.png', 20, false)); // tutotial jump tip

		// Saltos iniciales
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 50, 125), 40, 2, 40, 'resources/textures/dirt.jpg'));
		this.scene.add(this.createIndicator(new THREE.Vector3(-30, 70, 150), 'resources/textures/tutorialTip9.png', 20, false)); // tutotial menu tip
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 50, 225), 40, 2, 40, 'resources/textures/dirt.jpg'));
		this.scene.add(this.createIndicator(new THREE.Vector3(30, 70, 250), 'resources/textures/tutorialTip10.png', 20, false)); // tutotial restart tip
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 70, 300), 40, 2, 40, 'resources/textures/bark.jpg'));

		// Powerups
		this.scene.add(this.createIndicator(new THREE.Vector3(-25, 90, 330), 'resources/textures/tutorialTip1.png', 20, false)); //tutorial powerup tip
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 70, 340), 40, 2, 40, 'resources/textures/bark.jpg'));
		this.scene.add(this.createIndicator(new THREE.Vector3(25, 90, 370), 'resources/textures/tutorialTip2.png', 20, false)); //tutorial doublejump tip
		this.scene.add(this.createPowerup(new THREE.Vector3(0, 70, 340), 'resources/textures/doubleJump.png', "DOUBLE-JUMP"));
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 120, 475), 40, 2, 40, 'resources/textures/bark.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 120, 515), 40, 2, 40, 'resources/textures/bark.jpg'));
		this.scene.add(this.createIndicator(new THREE.Vector3(25, 140, 580), 'resources/textures/tutorialTip3.png', 20, false)); //tutorial dash tip
		this.scene.add(this.createPowerup(new THREE.Vector3(0, 120, 515), 'resources/textures/dash.png', "DASH"));
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 120, 555), 40, 2, 40, 'resources/textures/bark.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 70, 800), 60, 2, 60, 'resources/textures/field.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 70, 860), 60, 2, 60, 'resources/textures/field.jpg'));

		// Special Platforms
		this.scene.add(this.createIndicator(new THREE.Vector3(0, 80, 950), 'resources/textures/tutorialTip4.png', 30, false)); //tutorial bouncing tip
		this.scene.add(this.createBouncingPlatform(new THREE.Vector3(0, 10, 980), 50, 2, 50));
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 70, 1100), 60, 2, 60, 'resources/textures/field.jpg'));
		this.scene.add(this.createIndicator(new THREE.Vector3(30, 95, 1160), 'resources/textures/tutorialTip5.png', 30, false)); //tutorial speed tip
		this.scene.add(this.createSpeedPlatform(new THREE.Vector3(0, 70, 1190), 60, 2, 120));
		this.scene.add(this.createSpeedPlatform(new THREE.Vector3(0, 70, 1310), 60, 2, 120));
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 70, 1400), 60, 2, 60, 'resources/textures/field.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 70, 1460), 60, 2, 60, 'resources/textures/field.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 70, 1520), 60, 2, 60, 'resources/textures/field.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 70, 1580), 60, 2, 60, 'resources/textures/field.jpg'));
		this.scene.add(this.createIndicator(new THREE.Vector3(-25, 90, 1580), 'resources/textures/tutorialTip6.png', 30, false)); //tutorial moving tip 1
		this.scene.add(this.createIndicator(new THREE.Vector3(25, 90, 1630), 'resources/textures/tutorialTip7.png', 30, false)); //tutorial moving tip 2
		this.scene.add(this.createMovingPlatform(new THREE.Vector3(0, 70, 1670), new THREE.Vector3(0, 70, 1800), 60, 2, 60, 'resources/textures/field.jpg', 5000));
		this.scene.add(this.createIndicator(new THREE.Vector3(0, 100, 1980), 'resources/textures/tutorialTip8.png', 30, false)); //tutorial finish line tip
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 70, 1900), 60, 2, 60, 'resources/textures/field.jpg'));

		var objectivePlatform = this.createPlatform(new THREE.Vector3(0, 70, 2000), 60, 2, 60, 'resources/textures/crown.png');
		objectivePlatform.rotation.y = Math.PI;

		this.objective.push(objectivePlatform);
		this.scene.add(objectivePlatform);
	}

    createMusic() {
        this.music = '../resources/music/tutorialMusic.mp3';
    }

    createTexture() {
        const loader = new THREE.CubeTextureLoader();
        const bgTexture = loader.load([
            'resources/images/tutorialFront.png',
            'resources/images/tutorialBack.png',
            'resources/images/tutorialUp.png',
            'resources/images/tutorialDown.png',
            'resources/images/tutorialLeft.png',
            'resources/images/tutorialRight.png',
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
