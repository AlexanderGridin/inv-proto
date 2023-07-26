import { Buff } from "./Buff.js";

export class BuffPool {
	constructor({ game, limit = 5 }) {
		this.game = game;

		this.pool = [];
		this.limit = limit;

		this.init();
	}

	init() {
		for (let i = 0; i < this.limit; i++) {
			this.pool.push(new Buff(this.game));
		}
	}

	getItem() {
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
		this.pool.forEach((item) => {
			if (!item.isInGame) {
				return;
			}

			item.pullFromGame();
		});
	}
}
