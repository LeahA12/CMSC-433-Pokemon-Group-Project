var myCanvas = document.getElementById("BattleCanvas");

if (myCanvas) {
	var canvasWidth = myCanvas.width;
	var canvasHeight = myCanvas.height;
	var context = myCanvas.getContext("2d");

	// CREATE BACKGROUND BATTLE ARENA FROM IMAGE FILE
	var battleArena = new Image();
	battleArena.src = "emptyBattle.jpg";

	context.drawImage(
		// Source IMAGE that will be drawn into destination CANVAS
		battleArena,
		
		// Source IMAGE coords and width/height
		0, 0, battleArena.width, battleArena.height,
		
		// Destination CANVAS coords and width/height
		0, 0, canvasWidth, canvasHeight
	);
}

var soundCache = {};

function playSound (src, volume) {
	if (volume === undefined) {
		volume = 0.05;
	}

	var sound = soundCache[src];

	if (!sound) {
		sound = new Audio();
		sound.src = src;
		soundCache[src] = sound;
	}
	
	sound.volume = volume;
	sound.play();
}

document.addEventListener('click', function () {
	playSound('sounds/battle.mp3');
});

// Changes battle ui to show the moves your pokemon knows after you select "FIGHT"
function fightSelected() {
	playSound('sounds/select.mp3');

	document.getElementById("optionText").style.display = "none";
	document.getElementById("optionButtonsArea").style.display = "none";
	document.getElementById("moveSelect").style.display = "block";
	document.getElementById("movePPId").style.display = "block";
}

// Function to use the selected attack/move
// move is an int (1-4)
function useMove(move) {




}