import { KeyboardKey, isKeyPressed, isKeyClicked } from "./KeyboardManager.js";

const TANK_IMG_WIDTH = 248;
const TANK_IMG_HEIGHT = 154;

const GUN_WIDTH = 94;
const GUN_HEIGHT = 212;
const GUN_POSITION_OFFSET_X = 53;
const GUN_POSITION_OFFSET_Y = 75;

export class Player {
	constructor(game) {
		this.game = game;

		this.scale = 0.9;
		this.width = TANK_IMG_WIDTH * this.scale;
		this.height = TANK_IMG_HEIGHT * this.scale;

		this.defaultSpeed = 5;
		this.speed = this.defaultSpeed;
		this.lives = 5;
		this.totalBullets = 5;

		this.setInitialPosition();

		this.img = document.getElementById("thank");
		this.gunImg = document.getElementById("gun");

		this.laser = {
			x: 0,
			y: 0,
			height: Math.ceil(this.y - 70),
			width: 4,
			isShown: false,
		};
	}

	setInitialPosition() {
		this.x = this.game.width * 0.5 - this.width * 0.5;
		this.y = this.game.height - this.height - 5;
	}

	update() {
		if (isKeyPressed(KeyboardKey.J)) {
			this.moveLeft();
		}

		if (isKeyPressed(KeyboardKey.SPACE)) {
			this.speed = this.defaultSpeed + 10;
		} else {
			this.speed = this.defaultSpeed;
		}

		if (isKeyPressed(KeyboardKey.K)) {
			this.moveRight();
		}

		if (isKeyClicked(KeyboardKey.F) && this.totalBullets > 0) {
			this.shoot();
			this.game.updateBulletsUI();
		}

		if (isKeyPressed(KeyboardKey.D)) {
			this.laser.isShown = true;
			this.laser.x = this.x + this.width * 0.5 - 18;
		} else {
			this.laser.isShown = false;
		}
	}

	moveLeft() {
		const offset = 17;

		if (this.x > 0 - this.width * 0.5 + offset) {
			this.x = this.x - this.speed;
			return;
		}

		this.x = 0 - this.width * 0.5 + offset;
	}

	moveRight() {
		const offset = 17;

		if (this.x + this.width * 0.5 - offset < this.game.width) {
			this.x = this.x + this.speed;
			return;
		}

		this.x = this.game.width - this.width * 0.5 + offset;
	}

	shoot() {
		const bullet = this.game.bulletsPool.getTile();

		if (!bullet) {
			return;
		}

		bullet.pushInGame(this.x + this.width * 0.5 - 17, this.y - 70);
		this.decreaseBullets();
	}

	render() {
		this.renderTank();
		this.renderLaser();
		this.renderGun();

		if (this.game.isInDebug) {
			this.renderHitbox();
		}
	}

	renderLaser() {
		if (!this.laser.isShown) {
			return;
		}

		this.game.renderer.fillStyle = "red";
		this.game.renderer.fillRect(
			this.laser.x,
			this.laser.y,
			this.laser.width,
			this.laser.height
		);
	}

	renderTank() {
		this.game.renderer.drawImage(
			this.img,
			0,
			0,
			TANK_IMG_WIDTH,
			TANK_IMG_HEIGHT,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}

	renderGun() {
		this.game.renderer.drawImage(
			this.gunImg,
			0,
			0,
			GUN_WIDTH,
			GUN_HEIGHT,
			this.x + GUN_POSITION_OFFSET_X,
			this.y - GUN_POSITION_OFFSET_Y,
			GUN_WIDTH * this.scale,
			GUN_HEIGHT * this.scale
		);
	}

	renderHitbox() {
		this.game.renderer.strokeStyle = "#A3BE8C";
		this.game.renderer.lineWidth = 1;
		this.game.renderer.strokeRect(this.x, this.y, this.width, this.height);
	}

	decreaseLives(amount = 1) {
		this.lives = this.lives - amount;
	}

	decreaseBullets(amount = 1) {
		this.totalBullets = this.totalBullets - amount;
	}

	increaseBullets(amount = 1) {
		this.totalBullets = this.totalBullets + amount;
	}

	increaseLives(amount = 1) {
		this.lives = this.lives + amount;
	}
}
