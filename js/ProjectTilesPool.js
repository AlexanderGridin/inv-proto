import { ProjectTile } from "./ProjectTile.js";

export class ProjectTilesPool {
	constructor({ tilesLimit = 10, game }) {
		this.game = game;

		this.pool = [];
		this.tilesLimit = tilesLimit;

		this.init();
	}

	init() {
		for (let i = 0; i < this.tilesLimit; i++) {
			this.pool.push(new ProjectTile(this.game));
		}
	}

	getTile() {
		let tile = null;

		this.pool.some((item) => {
			if (!item.isInGame) {
				tile = item;
				return true;
			}

			return false;
		});

		return tile;
	}

	update() {
		this.pool.forEach((item) => {
			if (!item.isInGame) {
				return;
			}

			item.update();
		});
	}

	render() {
		this.pool.forEach((item) => {
			if (!item.isInGame) {
				return;
			}

			item.render();
		});
	}

	reset() {
		this.pool.forEach((tile) => {
			if (!tile.isInGame) {
				return;
			}

			tile.pullFromGame();
		});
	}
}
