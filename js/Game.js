import { Player } from "./Player.js";
import { ProjectTilesPool } from "./ProjectTilesPool.js";
import { EnemiesPool } from "./EnemiesPool.js";
import { Grid } from "./Grid.js";
import { GameUI } from "./GameUI.js";
import { KeyboardKey, isKeyClicked } from "./KeyboardManager.js";
import { BuffPool } from "./BuffPool.js";

export class Game {
	constructor(canvasCtx) {
		this.renderer = canvasCtx;
		this.frameRef = null;

		this.isInProgress = false;
		this.isInDebug = false;

		this.width = canvasCtx.canvas.width;
		this.height = canvasCtx.canvas.height;

		this.player = new Player(this);
		this.bulletsPool = new ProjectTilesPool({
			game: this,
		});

		this.gridConfig = {
			totalColumns: Math.ceil(window.innerWidth / 89),
			totalRows: 1,
			cellSize: 89,
		};

		this.enemiesGrid = new Grid(this, this.gridConfig);
		this.enemiesPool = new EnemiesPool({
			game: this,
			tilesLimit: this.enemiesGrid.cells.length,
		});
		console.log(this.enemiesPool);

		this.statistic = {
			score: 0,
		};

		this.gameUI = new GameUI(this);

		this.buffsPool = new BuffPool({ game: this });
	}

	start() {
		setInterval(() => {
			console.log("enemy tick");

			if (this.isInProgress) {
				this.spawnEnemy();
			}
		}, 1000);

		this.updateScoreUI();
		this.updateLivesUI();
		this.updateBulletsUI();

		this.isInProgress = true;
		this.renderGameFrame();
	}

	spawnEnemy() {
		const randomIndex = Math.round(
			Math.random() * this.enemiesGrid.cells.length
		);

		const index =
			randomIndex > this.enemiesGrid.cells.length - 1
				? this.enemiesGrid.cells.length - 1
				: randomIndex;

		const cell = this.enemiesGrid.cells[index];
		const enemy = this.enemiesPool.getTile();

		if (!enemy || !cell) {
			return;
		}

		enemy.pushInGame(cell.x, cell.y);

		if (
			enemy.x < this.enemiesGrid.x ||
			enemy.x + enemy.width > this.enemiesGrid.width
		) {
			enemy.pullFromGame();
		}

		this.enemiesPool.pool.forEach((poolEnemy) => {
			if (!poolEnemy.isInGame || poolEnemy.id === enemy.id) {
				return;
			}

			if (enemy.x === poolEnemy.x && enemy.y === poolEnemy.y) {
				enemy.pullFromGame();
			}
		});
	}

	renderGameFrame() {
		if (this.isInProgress) {
			this.clearRenderer();

			this.update();
			this.render();
		}

		if (isKeyClicked(KeyboardKey.P)) {
			this.isInProgress ? this.stop() : this.continue();
		}

		if (isKeyClicked(KeyboardKey.R)) {
			this.restart();
		}

		requestAnimationFrame(this.renderGameFrame.bind(this));
	}

	clearRenderer() {
		this.renderer.clearRect(0, 0, this.width, this.height);
	}

	render() {
		this.enemiesPool.render();
		this.buffsPool.render();
		this.bulletsPool.render();

		if (this.isInDebug) {
			this.enemiesGrid.render();
		}

		this.player.render();
	}

	update() {
		if (isKeyClicked(KeyboardKey.Q)) {
			this.isInDebug = !this.isInDebug;
		}

		this.player.update();
		this.enemiesPool.update();
		this.buffsPool.update();
		this.bulletsPool.update();

		if (this.player.lives <= 0) {
			this.stop();
		}
	}

	stop() {
		this.isInProgress = false;
	}

	continue() {
		this.isInProgress = true;
	}

	restart() {
		this.player = new Player(this);
		this.enemiesPool.reset();
		this.bulletsPool.reset();

		this.statistic.score = 0;

		this.updateScoreUI();
		this.updateLivesUI();
		this.updateBulletsUI();

		this.isInProgress = true;
	}

	checkCollision(a, b, n = 0, k = 0) {
		return (
			a.x < b.x + b.width + k &&
			a.x + a.width + n > b.x &&
			a.y < b.y + b.height + k &&
			a.y + a.height + n > b.y
		);
	}

	increaseScore(amount = 1) {
		this.statistic.score = this.statistic.score + amount;
		this.updateScoreUI();
	}

	updateScoreUI() {
		this.gameUI.setScore(this.statistic.score);
	}

	updateLivesUI() {
		this.gameUI.setLives(this.player.lives);
	}

	updateBulletsUI() {
		this.gameUI.setBullets(this.player.totalBullets);
	}
}
