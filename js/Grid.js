import { GridCell } from "./GridCell.js";

export class Grid {
	constructor(game, config) {
		this.game = game;
		this.config = config;

		const { totalColumns, totalRows, cellSize } = this.config;

		this.width = totalColumns * cellSize;
		this.height = totalRows * cellSize;

		this.posCorrection = (this.width - window.innerWidth) / 2;

		if (this.posCorrection > 0) {
			this.config.totalColumns = totalColumns - 1;
			this.width = this.config.totalColumns * cellSize;
		}

		this.posCorrection = (this.width - window.innerWidth) / 2;
		this.x = 0 - this.posCorrection;
		this.y = 0;

		this.cells = [];
		this.initCells();
	}

	initCells() {
		for (let y = 0; y < this.config.totalRows; y++) {
			for (let x = 0; x < this.config.totalColumns; x++) {
				this.cells.push(
					new GridCell({
						game: this.game,
						x: this.x + x * this.config.cellSize,
						y: this.y + y * this.config.cellSize,
						grid: this,
						rowIndex: y,
						columnIndex: x,
					})
				);
			}
		}
	}

	update() {}

	render() {
		this.cells.forEach((cell) => {
			cell.render();
		});
	}
}
