var mySpritesCanvas = document.getElementById("pokeSpritesCanvas");
if (mySpritesCanvas) {
	var canvasWidth = mySpritesCanvas.width;
	var canvasHeight = mySpritesCanvas.height;
	var context = mySpritesCanvas.getContext("2d");
	
	// Adding this line so the pokemon sprites are not fuzzy
	//    NOTE: I understood how this property worked via this link 
	//    https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled
	context.imageSmoothingEnabled = false;
}
var pokeScaleNum = 2.6; // found this by doing trial and error

// Draw Player's chosen pokemon using sprite image file from pokemondb.net
//    pokeName: lowercase pokemon name (options are blaziken, mudkip, sceptile, swampert, torchic, or treecko)
//    NOTE: In order to match the emerald pokemon look we're going for, 
//          we need to make sprite 2.6 times bigger.
function drawPlayerSprite(pokeName){
	var playerSprite = new Image();
	playerSprite.src = "sprites/" + pokeName + "Back.png";

	// Wait for sprite to finish loading before drawing!
	playerSprite.addEventListener('load', function () {
		context.drawImage(playerSprite, 110, 142, playerSprite.width*(pokeScaleNum), playerSprite.height*(pokeScaleNum)); 
	});
}

// Draw Opponents's chosen pokemon using sprite image file from pokemondb.net
//    pokeName: lowercase pokemon name (options are blaziken, mudkip, sceptile, swampert, torchic, or treecko)
//    NOTE: In order to match the emerald pokemon look we're going for, 
//          we need to make sprite 2.6 times bigger.
function drawOppSprite(pokeName){
	var oppSprite = new Image();
	oppSprite.src = "sprites/" + pokeName + "Front.png";

	// Wait for sprite to finish loading before drawing!
	oppSprite.addEventListener('load', function () {
		context.drawImage(oppSprite, 380, 20, oppSprite.width*(pokeScaleNum), oppSprite.height*(pokeScaleNum)); 
	});
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

function backToOptions () {
	playSound('sounds/select.mp3');

	document.getElementById("optionText").style.display = "block";
	document.getElementById("optionButtonsArea").style.display = "block";
	document.getElementById("moveSelect").style.display = "none";
	document.getElementById("movePPContainer").style.display = "none";
}

// Changes battle ui to show the moves your pokemon knows after you select "FIGHT"
function fightSelected() {
	playSound('sounds/select.mp3');
	
	document.getElementById("optionText").style.display = "none";
	document.getElementById("optionButtonsArea").style.display = "none";
	document.getElementById("moveSelect").style.display = "block";
	document.getElementById("movePPContainer").style.display = "flex";
}

function swapSelected() {
	playSound('sounds/select.mp3');
	
	document.getElementById("battleScreen").style.display = "none";
	document.getElementById("swapPokemonScreen").style.display = "block";
}

function cancelSwap() {
	playSound('sounds/select.mp3');
	
	document.getElementById("battleScreen").style.display = "block";
	document.getElementById("swapPokemonScreen").style.display = "none";
}

// Function to use the selected attack/move
// move is an int (1-4)
function useMove(move) {
	playSound('sounds/select.mp3');




}