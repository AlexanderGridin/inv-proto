import { Enemy } from "./Enemy.js";

export class EnemiesGrid {
	constructor(game) {
		this.game = game;

		const { enemiesGridConfig } = game;

		this.width = enemiesGridConfig.totalColumns * enemiesGridConfig.enemySize;
		this.height = enemiesGridConfig.totalRows * enemiesGridConfig.enemySize;

		this.posCorrection = (this.width - window.innerWidth) / 2;

		if (this.posCorrection > 0) {
			this.game.enemiesGridConfig.totalColumns =
				this.game.enemiesGridConfig.totalColumns - 1;

			this.width = enemiesGridConfig.totalColumns * enemiesGridConfig.enemySize;
		}

		this.posCorrection = (this.width - window.innerWidth) / 2;
		this.x = 0 + this.posCorrection * -1;
		this.y = 0;

		this.speed = {
			x: enemiesGridConfig.speed.x,
			y: enemiesGridConfig.speed.y,
		};

		this.enemies = [];
		this.initEnemies();
	}

	initEnemies() {
		for (let y = 0; y < this.game.enemiesGridConfig.totalRows; y++) {
			for (let x = 0; x < this.game.enemiesGridConfig.totalColumns; x++) {
				this.enemies.push(
					new Enemy({
						game: this.game,
						posX: this.x + x * this.game.enemiesGridConfig.enemySize,
						posY: this.y + y * this.game.enemiesGridConfig.enemySize,
						grid: this,
						rowIndex: y,
						columnIndex: x,
					})
				);
			}
		}
	}

	update() {}

	updateLegacy() {
		if (this.y < 0) {
			this.y += 5;
		}

		this.x = this.x + this.speed.x;
		this.y = this.y + this.speed.y;

		this.enemies.forEach((enemy) => {
			enemy.update();
		});

		this.speed.y = 0;

		if (this.x <= 0 || this.x + this.width >= this.game.width) {
			this.speed.x *= -1;
			this.speed.y = this.game.enemiesGridConfig.enemySize;
		}

		this.enemies = this.enemies.filter((enemy) => !enemy.isDestroyed);

		if (!this.enemies.length) {
			console.log("Wave stopped!");
			this.game.enemiesWaves = [];
		}
	}

	render() {
		// this.game.renderer.strokeStyle = "#EBCB8B";
		// this.game.renderer.strokeRect(this.x, this.y, this.width, this.height);

		this.enemies.forEach((enemy) => {
			enemy.render();
		});
	}
}
