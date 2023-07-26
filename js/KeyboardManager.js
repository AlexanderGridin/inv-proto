export const KeyboardKey = {
	J: "j",
	K: "k",
	SPACE: " ",
	F: "f",
	Q: "q",
	P: "p",
	R: "r",
	D: "d",
};

const keysRegistry = {
	[KeyboardKey.J]: {
		isPressed: false,
		isClicked: false,
		prevIsClicked: false,
	},
	[KeyboardKey.K]: {
		isPressed: false,
		isClicked: false,
		prevIsClicked: false,
	},
	[KeyboardKey.F]: {
		isPressed: false,
		isClicked: false,
		prevIsClicked: false,
	},
	[KeyboardKey.D]: {
		isPressed: false,
		isClicked: false,
		prevIsClicked: false,
	},
	[KeyboardKey.Q]: {
		isPressed: false,
		isClicked: false,
		prevIsClicked: false,
	},
	[KeyboardKey.P]: {
		isPressed: false,
		isClicked: false,
		prevIsClicked: false,
	},
	[KeyboardKey.R]: {
		isPressed: false,
		isClicked: false,
		prevIsClicked: false,
	},
	[KeyboardKey.SPACE]: {
		isPressed: false,
		isClicked: false,
		prevIsClicked: false,
	},
};

window.addEventListener("keydown", (e) => {
	if (!keysRegistry[e.key]) {
		return;
	}

	keysRegistry[e.key].isPressed = true;
	keysRegistry[e.key].isClicked = true;
});

window.addEventListener("keyup", (e) => {
	if (!keysRegistry[e.key]) {
		return;
	}

	keysRegistry[e.key].isPressed = false;
	keysRegistry[e.key].prevIsClicked = false;
});

export const isKeyPressed = (key) => keysRegistry[key].isPressed;

export const isKeyClicked = (key) => {
	if (keysRegistry[key].isClicked && !keysRegistry[key].prevIsClicked) {
		keysRegistry[key].prevIsClicked = true;
		return keysRegistry[key].prevIsClicked;
	}

	keysRegistry[key].isClicked = false;
	return keysRegistry[key].isClicked;
};
