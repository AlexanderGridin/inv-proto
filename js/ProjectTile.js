export class ProjectTile {
	constructor(game) {
		this.game = game;

		this.scale = 0.9;
		this.width = 16 * this.scale;
		this.height = 37 * this.scale;

		this.x = 0;
		this.y = 0;

		this.speed = 10;

		this.isInGame = false;
		this.img = document.getElementById("bullet");
	}

	render() {
		if (this.game.isInDebug) {
			this.renderHitbox();
		}

		this.game.renderer.drawImage(
			this.img,
			0,
			0,
			16,
			37,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}

	renderHitbox() {
		this.game.renderer.fillStyle = "#5E81AC";
		this.game.renderer.fillRect(this.x, this.y, this.width, this.height);
	}

	update() {
		this.y = this.y - this.speed;

		if (this.y + this.height < 0) {
			this.pullFromGame();
		}
	}

	pushInGame(x, y) {
		this.x = x - this.width * 0.5;
		this.y = y;

		this.isInGame = true;
	}

	pullFromGame() {
		this.isInGame = false;

		this.x = 0;
		this.y = 0;
	}
}
