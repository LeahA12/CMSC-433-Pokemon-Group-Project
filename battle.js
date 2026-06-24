var myCanvas = document.getElementById("BattleCanvas");
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