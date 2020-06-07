class Level2 extends Level {
    constructor(player) {
        super(player);
    }

	createLevel(player) {
		this.startingSpot = new THREE.Vector3(0, 65, 0);405, 110, 1200
		this.startingView = new THREE.Vector3(20, 60, 90);
		this.gravity = 10.0;

		this.cinematicCoordenates.push([new THREE.Vector3(-50, 125, 0), new THREE.Vector3(125, 145, 400), new THREE.Vector3(125, 60, 450)]);

		//Plataforma inicial
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 50, 0), 50, 2, 50, 'resources/textures/wood.jpg'));

    this.scene.add(this.createPlatform(new THREE.Vector3(25, 60, 90), 50, 2, 50, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(50, 70, 180), 50, 2, 50, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(75, 80, 270), 50, 2, 50, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(100, 90, 360), 50, 2, 50, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(125, 100, 450), 50, 2, 50, 'resources/textures/wood.jpg'));

    //Plataformas dificiles
    this.scene.add(this.createPlatform(new THREE.Vector3(45, 100, 450), 30, 2, 30, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(-25, 100, 450), 30, 2, 30, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(-95, 100, 450), 30, 2, 30, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(-165, 100, 450), 30, 2, 30, 'resources/textures/wood.jpg'));

    this.scene.add(this.createPlatform(new THREE.Vector3(-215, 130, 420), 30, 2, 30, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(-215, 130, 490), 30, 2, 30, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(-285, 140, 455), 30, 2, 30, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(-355, 160, 455), 30, 2, 30, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(-415, 180, 455), 30, 2, 30, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(-475, 200, 455), 30, 2, 30, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(-535, 220, 455), 30, 2, 30, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(-595, 240, 455), 30, 2, 30, 'resources/textures/wood.jpg'));

    this.scene.add(this.createPowerup(new THREE.Vector3(-595, 240, 455), 'resources/textures/doubleJump.png', "DOUBLE-JUMP"));
    this.scene.add(this.createIndicator(new THREE.Vector3(-610,270,505), 'resources/textures/doubleJumpRequired.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(-595, 240, 555), 30, 2, 50, 'resources/textures/wood.jpg'));

    this.scene.add(this.createPlatform(new THREE.Vector3(-595, 240, 655), 30, 2, 50, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(-595, 240, 755), 30, 2, 50, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(-595, 240, 855), 30, 2, 50, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(-595, 240, 955), 30, 2, 50, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPowerup(new THREE.Vector3(-595, 240, 955), 'resources/textures/dash.png', "DASH"));
    this.scene.add(this.createIndicator(new THREE.Vector3(-595,270,1000), 'resources/textures/dashRequired.jpg'));

    this.scene.add(this.createPlatform(new THREE.Vector3(-595, 230, 1200), 30, 2, 90, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(-515, 230, 1200), 40, 2, 40, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(-435, 230, 1200), 40, 2, 40, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(-355, 230, 1200), 40, 2, 40, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(-275, 230, 1200), 40, 2, 40, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(-195, 230, 1200), 40, 2, 40, 'resources/textures/wood.jpg'));

    //Caida
    this.scene.add(this.createPlatform(new THREE.Vector3(-95, 210, 1200), 40, 2, 40, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(5, 190, 1200), 40, 2, 40, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(105, 170, 1200), 40, 2, 40, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(205, 150, 1200), 40, 2, 40, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(305, 130, 1200), 40, 2, 40, 'resources/textures/wood.jpg'));

    //link
    this.scene.add(this.createPlatform(new THREE.Vector3(405, 110, 1200), 80, 2, 80, 'resources/textures/wood.jpg'));

    this.scene.add(this.createPlatform(new THREE.Vector3(405, 110, 1100), 40, 2, 40, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(405, 110, 1025), 40, 2, 40, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(405, 110, 950), 40, 2, 40, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(405, 110, 875), 30, 2, 30, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(405, 110, 800), 30, 2, 30, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(405, 110, 725), 30, 2, 30, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(405, 110, 660), 20, 2, 20, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(405, 110, 600), 20, 2, 20, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPowerup(new THREE.Vector3(405, 110, 600), 'resources/textures/doubleJump.png', "DOUBLE-JUMP"));


    //Final
    this.scene.add(this.createIndicator(new THREE.Vector3(455,130,1200), 'resources/textures/doubleJumpRequired.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(455, 160, 1200), 50, 2, 50, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(510, 170, 1275), 50, 2, 50, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(510, 180, 1350), 50, 2, 50, 'resources/textures/wood.jpg'));
    this.scene.add(this.createPlatform(new THREE.Vector3(510, 190, 1425), 50, 2, 50, 'resources/textures/wood.jpg'));

		var objectivePlatform = this.createPlatform(new THREE.Vector3(510, 190, 1500), 20, 2, 20, 'resources/textures/gold.jpg');
		this.objective.push(objectivePlatform);
    this.scene.fog = new THREE.Fog(0x000000, 50, 190);
		this.scene.add(objectivePlatform);
	}

    createMusic() {
        this.music = '../resources/music/GreatLittleChallenge.ogg';
    }

    createTexture() {
        this.scene.background = 0x000000;
	}

	startupCinematic(player) {
		var origin = this.cinematicCoordenates[0][0];
		var ending = this.cinematicCoordenates[0][1];
		var whereToLook = this.cinematicCoordenates[0][2];

		var that = this;
		this.firstTween = new TWEEN.Tween(origin).to(ending, 10000).easing(TWEEN.Easing.Quadratic.InOut).onComplete(function () {
			that.startupDone = true;

		}).onUpdate(function () {
            player.position.copy(origin);
			player.lookAt(whereToLook);
		});

		this.firstTween.start();

	}
}
