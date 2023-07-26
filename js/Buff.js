export const BuffType = {
	bullets: "bullets",
	health: "health",
	score: "score",
};

export class Buff {
	constructor(game) {
		this.game = game;

		this.x = 0;
		this.y = 0;

		this.width = 30;
		this.height = 30;

		this.speed = 5;

		this.amount = 0;

		this.isIngame = false;
		this.type = null;

		this.bullet = {
			img: document.getElementById("bullet"),
			width: 16 * 0.9,
			height: 37 * 0.9,
		};

		this.heart = {
			img: document.getElementById("heart"),
			width: 800 * 0.025,
			height: 749 * 0.025,
		};

		this.score = {
			img: document.getElementById("coin"),
			width: 1280 * 0.02,
			height: 1280 * 0.02,
		};
	}

	update() {
		this.y = this.y + this.speed;

		if (this.game.checkCollision(this, this.game.player)) {
			this.handleCollisionWithPlayer();
		}

		if (this.y + this.height > this.game.height) {
			this.pullFromGame();
		}
	}

	handleCollisionWithPlayer() {
		switch (this.type) {
			case BuffType.bullets:
				this.game.player.increaseBullets(this.amount);
				this.game.updateBulletsUI();

				break;

			case BuffType.health:
				this.game.player.increaseLives(this.amount);
				this.game.updateLivesUI();

				break;

			default:
				this.game.increaseScore();
		}

		this.pullFromGame();
	}

	render() {
		switch (this.type) {
			case BuffType.bullets:
				this.game.renderer.drawImage(
					this.bullet.img,
					0,
					0,
					16,
					37,
					this.x,
					this.y,
					this.width,
					this.height
				);
				break;

			case BuffType.health:
				this.game.renderer.drawImage(
					this.heart.img,
					0,
					0,
					800,
					749,
					this.x,
					this.y,
					this.width,
					this.height
				);
				break;

			default:
				this.game.renderer.drawImage(
					this.score.img,
					0,
					0,
					1280,
					1280,
					this.x,
					this.y,
					this.score.width,
					this.score.height
				);
		}

		this.game.renderer.textAlign = "center";
		this.game.renderer.fillStyle = "#FFF";

		if (this.type === BuffType.bullets) {
			this.game.renderer.fillText(
				this.amount.toString(),
				this.x + this.width + 10,
				this.y,
				30
			);

			return;
		}

		if (this.type === BuffType.health) {
			this.game.renderer.fillText(
				this.amount.toString(),
				this.x + this.width * 0.5,
				this.y + this.height * 0.5 + 5,
				30
			);
		}
	}

	pushInGame(x, y, type) {
		this.type =
			type ||
			(Math.ceil(Math.random() * 10) < 3 ? BuffType.health : BuffType.bullets);

		switch (this.type) {
			case BuffType.bullets:
				this.width = this.bullet.width;
				this.height = this.bullet.height;
				break;

			case BuffType.health:
				this.width = this.heart.width;
				this.height = this.heart.height;
				break;

			default:
				this.width = this.score.width;
				this.height = this.score.height;
		}

		this.x = x - this.width * 0.5;
		this.y = y - this.height * 0.5;

		this.amount =
			this.type === BuffType.score ? 1 : Math.ceil(Math.random() * 5);

		this.isInGame = true;
	}

	pullFromGame() {
		this.isInGame = false;

		this.x = 0;
		this.y = 0;

		this.amount = 0;
	}
}
