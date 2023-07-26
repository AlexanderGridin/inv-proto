export class GameUI {
	constructor(game) {
		this.game = game;

		this.scoreElement = document.getElementById("score");
		this.livesElement = document.getElementById("lives");
		this.bulletsElement = document.getElementById("bullets");

		this.initButtons();
	}

	initButtons() {
		document.querySelector(".btns").addEventListener("click", (e) => {
			if (e.target.textContent === "Pause") {
				this.game.isInProgress ? this.game.stop() : this.game.continue();
			}

			if (e.target.textContent === "Restart") {
				this.game.restart();
			}
		});
	}

	setScore(score) {
		this.scoreElement.textContent = `${score}`;
	}

	setLives(lives) {
		this.livesElement.textContent = `${lives}`;
	}

	setBullets(amount) {
		this.bulletsElement.textContent = `${amount}`;
	}
}
