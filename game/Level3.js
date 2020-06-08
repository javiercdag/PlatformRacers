class Level3 extends Level {
    constructor(player) {
        super(player);
    }

	createLevel(player) {
		this.startingSpot = new THREE.Vector3(0, 65, -20);
		this.startingView = new THREE.Vector3(0, 65, 20);
		this.gravity = 7.0;

		// Due to the very light colors used by the skybox of this map, some elements of the UI must get their color changed
		document.getElementById("crono").style.color = "black";
		document.getElementById("highscore").style.color = "black";

		this.cinematicCoordenates.push([new THREE.Vector3(-500, 300, -100), new THREE.Vector3(200, 300, 2300), new THREE.Vector3(0, 200, 950)]);

		// Initial platform
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 50, 0), 100, 2, 100, 'resources/textures/cobblestone.jpg'));
		this.scene.add(this.createIndicator(new THREE.Vector3(-30, 70, 30), 'resources/textures/level3Title.png', 30, false)); // level info

		// First segment
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 60, 130), 40, 2, 40, 'resources/textures/cobblestone.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 70, 240), 40, 2, 40, 'resources/textures/cobblestone.jpg'));
		this.scene.add(this.createPowerup(new THREE.Vector3(0, 70, 240), 'resources/textures/dash.png', "DASH"));
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 70, 280), 40, 2, 40, 'resources/textures/cobblestone.jpg'));
		this.scene.add(this.createSpeedPlatform(new THREE.Vector3(0, 70, 600), 60, 2, 120));
		this.scene.add(this.createSpeedPlatform(new THREE.Vector3(0, 70, 720), 60, 2, 120));
		this.scene.add(this.createBouncingPlatform(new THREE.Vector3(0, 10, 940), 50, 2, 50));
		this.scene.add(this.createSpeedPlatform(new THREE.Vector3(0, 70, 1075), 60, 2, 120));


		// Zig zag
		this.scene.add(this.createPlatform(new THREE.Vector3(50, 70, 1250), 40, 2, 40, 'resources/textures/cobblestone.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(10, 70, 1350), 40, 2, 40, 'resources/textures/cobblestone.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(40, 70, 1450), 40, 2, 40, 'resources/textures/cobblestone.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(20, 50, 1490), 15, 2, 15, 'resources/textures/cobblestone.jpg'));
		this.scene.add(this.createPowerup(new THREE.Vector3(20, 50, 1490), 'resources/textures/dash.png', "DASH"));
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 70, 1550), 40, 2, 40, 'resources/textures/cobblestone.jpg'));

		// Moving segment
		this.scene.add(this.createMovingPlatform(new THREE.Vector3(50, 70, 1640), new THREE.Vector3(-50, 70, 1800), 60, 2, 60, 'resources/textures/blueStone.jpg', 5000));
		this.scene.add(this.createMovingPlatform(new THREE.Vector3(50, 70, 2000), new THREE.Vector3(-50, 70, 1880), 60, 2, 60, 'resources/textures/blueStone.jpg', 5000));

		// Staircase
		this.scene.add(this.createPlatform(new THREE.Vector3(80, 90, 2090), 40, 2, 40, 'resources/textures/cobblestone.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(120, 90, 2090), 40, 2, 40, 'resources/textures/cobblestone.jpg'));
		this.scene.add(this.createPowerup(new THREE.Vector3(120, 90, 2090), 'resources/textures/doubleJump.png', "DOUBLE-JUMP"));
		this.scene.add(this.createPlatform(new THREE.Vector3(120, 190, 1970), 40, 2, 40, 'resources/textures/cobblestone.jpg'));
		this.scene.add(this.createPowerup(new THREE.Vector3(120, 190, 1970), 'resources/textures/doubleJump.png', "DOUBLE-JUMP"));
		this.scene.add(this.createPlatform(new THREE.Vector3(120, 190, 1930), 40, 2, 40, 'resources/textures/cobblestone.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(70, 290, 1930), 40, 2, 40, 'resources/textures/cobblestone.jpg'));
		this.scene.add(this.createPowerup(new THREE.Vector3(30, 290, 1930), 'resources/textures/doubleJump.png', "DOUBLE-JUMP"));
		this.scene.add(this.createPlatform(new THREE.Vector3(30, 290, 1930), 40, 2, 40, 'resources/textures/cobblestone.jpg'));
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 400, 1890), 40, 2, 40, 'resources/textures/cobblestone.jpg'));
		this.scene.add(this.createPowerup(new THREE.Vector3(0, 400, 1890), 'resources/textures/dash.png', "DASH"));
		this.scene.add(this.createPlatform(new THREE.Vector3(0, 400, 1850), 40, 2, 40, 'resources/textures/cobblestone.jpg'));

		// Consecutive jumps
		var baseHeight = 400;
		var initialZ = 1750;

		for (var i = 0; i < 10; i++) {
			this.scene.add(this.createBouncingPlatform(new THREE.Vector3(0, baseHeight, initialZ), 50, 2, 50));
			initialZ -= 25;
			this.scene.add(this.createPlatform(new THREE.Vector3(0, baseHeight + 50, initialZ), 50, 2, 50, 'resources/textures/cobblestone.jpg'));
			initialZ -= 25;
		}

		this.scene.add(this.createPlatform(new THREE.Vector3(0, 450, 1225), 50, 2, 50, 'resources/textures/cobblestone.jpg'));
		this.scene.add(this.createPowerup(new THREE.Vector3(0, 450, 1275), 'resources/textures/doubleJump.png', "DOUBLE-JUMP"));

		// Objective
		var objectivePlatform = this.createPlatform(new THREE.Vector3(0, 200, 1000), 60, 2, 60, 'resources/textures/crown.png');

		this.objective.push(objectivePlatform);
		this.scene.add(objectivePlatform);
	}

    createMusic() {
        this.music = '../resources/music/olympusMusic.mp4';
    }

    createTexture() {
        const loader = new THREE.CubeTextureLoader();
        const bgTexture = loader.load([
            'resources/images/olympusFront.jpg',
            'resources/images/olympusBack.jpg',
            'resources/images/olympusUp.jpg',
            'resources/images/olympusDown.jpg',
            'resources/images/olympusLeft.jpg',
            'resources/images/olympusRight.jpg',
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
