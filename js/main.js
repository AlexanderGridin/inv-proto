import { Game } from "./Game.js";

window.addEventListener("load", main);

function main() {
	const canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const ctx = canvas.getContext("2d");

	const game = new Game(ctx);
	game.start();
}
