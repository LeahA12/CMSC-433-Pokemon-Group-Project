var mySpritesCanvas = document.getElementById("pokeSpritesCanvas");
if (mySpritesCanvas) {
	var canvasWidth = mySpritesCanvas.width;
	var canvasHeight = mySpritesCanvas.height;
	var context = mySpritesCanvas.getContext("2d");

	// Create & Draw Player's chosen pokemon using sprite image file from pokemondb.net
	//    NOTE: In order to match the emerald pokemon look we're going for, 
	//          we need to make sprite 2.6 times bigger.
	var scaleNum = 2.6; // found this by doing trial and error
	var playerSprite = new Image();
	playerSprite.src = "sprites/treeckoBack.png"; // is treecko for now, will insert player choice later
	context.drawImage(playerSprite, 150, 142, playerSprite.width*(scaleNum), playerSprite.height*(scaleNum)); 
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

function swapSelected() {
	document.getElementById("battleScreen").style.display = "none";
	document.getElementById("swapPokemonScreen").style.display = "block";
}

function cancelSwap() {
	document.getElementById("battleScreen").style.display = "block";
	document.getElementById("swapPokemonScreen").style.display = "none";
}
// Function to use the selected attack/move
// move is an int (1-4)
function useMove(move) {




}