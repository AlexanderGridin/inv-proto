export class GridCell {
	constructor({ game, x, y, grid, rowIndex, columnIndex }) {
		this.game = game;

		this.x = x;
		this.y = y;

		this.grid = grid;

		this.rowIndex = rowIndex;
		this.columnIndex = columnIndex;
	}

	render() {
		this.game.renderer.strokeStyle = "#BF616A";
		this.game.renderer.strokeRect(
			this.x,
			this.y,
			this.grid.config.cellSize,
			this.grid.config.cellSize
		);
	}
}
