import { BuffType } from "./Buff.js";

const ENEMY_IMG_WIDTH = 178;
const ENEMY_IMG_HEIGHT = 479;

let id = 0;

export class Enemy {
	constructor(game) {
		this.game = game;
		this.id = (id++).toString();

		this.scale = 0.5;
		this.width = ENEMY_IMG_WIDTH * this.scale;
		this.height = ENEMY_IMG_HEIGHT * this.scale;

		this.hitbox = null;

		this.x = 0;
		this.y = 0;

		this.isDestroyed = false;
		this.isInGame = false;
		this.speed = 1;

		this.img = document.getElementById("enemy");
	}

	render() {
		if (!this.isInGame) {
			return;
		}

		this.game.renderer.drawImage(
			this.img,
			0,
			0,
			ENEMY_IMG_WIDTH,
			ENEMY_IMG_HEIGHT,
			this.x,
			this.y,
			this.width,
			this.height
		);

		if (this.game.isInDebug) {
			this.renderHitbox();
		}
	}

	renderHitbox() {
		this.game.renderer.strokeStyle = "#BF616A";
		this.game.renderer.strokeRect(
			this.hitbox.x,
			this.hitbox.y,
			this.hitbox.width,
			this.hitbox.height
		);
	}

	update() {
		if (!this.isInGame) {
			return;
		}

		this.y = this.y + this.speed;
		this.hitbox.y = this.y;

		if (this.hitbox.y + this.hitbox.height > this.game.height) {
			this.game.player.decreaseLives();
			this.game.updateLivesUI();
			this.pullFromGame();
		}

		if (this.game.checkCollision(this.hitbox, this.game.player)) {
			this.game.player.decreaseLives();
			this.game.updateLivesUI();
			this.pullFromGame();
		}

		if (
			this.game.player.laser.isShown &&
			this.game.checkCollision(this.hitbox, this.game.player.laser)
		) {
			this.pullFromGame();
			this.game.increaseScore();
		}

		this.game.bulletsPool.pool.forEach((bullet) => {
			if (!bullet.isInGame) {
				return;
			}

			this.handleCollisionWithBullet(bullet);
		});
	}

	handleCollisionWithBullet(bullet) {
		const isCollision = this.game.checkCollision(this.hitbox, bullet);

		if (!isCollision) {
			return;
		}

		this.pullFromGame();
		bullet.pullFromGame();

		this.game.player.increaseBullets();
		this.game.updateBulletsUI();

		const coin = this.game.buffsPool.getItem();
		if (coin) {
			coin.pushInGame(
				this.hitbox.x + this.hitbox.width * 0.5,
				this.hitbox.y + this.hitbox.height * 0.5,
				BuffType.score
			);
		}

		const buff = this.game.buffsPool.getItem();
		const isRnd = Math.ceil(Math.random() * 10) <= 2;
		if (buff && isRnd) {
			buff.pushInGame(
				this.hitbox.x + this.hitbox.width * 0.5,
				this.hitbox.y + this.hitbox.height * 0.5
			);
		}
	}

	pushInGame(x, y) {
		this.x = x;
		this.y = y - this.height;

		this.game.enemiesPool.pool.forEach((enemy) => {
			if (!enemy.isInGame || !this.game.checkCollision(this, enemy, 3, 3)) {
				return;
			}

			const topLeft = this.x;
			const enemyTopRight = enemy.x + enemy.width + 3;

			if (topLeft <= enemyTopRight) {
				const offset = enemyTopRight - topLeft;
				this.x = this.x + offset + 15;
			}

			const topRight = this.x + this.width + 3;
			if (topRight >= enemy.x) {
				const offset = topRight - enemy.x;
				this.x = this.x - offset - 15;
			}

			const bottomLeft = this.y + this.height + 3;
			if (bottomLeft >= enemy.y) {
				const offset = bottomLeft - enemy.y;
				this.y = this.y - offset - 15;
			}
		});

		this.hitbox = {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height - 70,
		};

		this.isInGame = true;
	}

	pullFromGame() {
		this.isInGame = false;

		this.x = 0;
		this.y = 0;
	}
}
