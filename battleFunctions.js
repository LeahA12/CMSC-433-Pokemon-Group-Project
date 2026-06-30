/* ANIMATION CODE STARTS */
const pPokeStartCoords = [110, 142]; // coordinates for where player pokemon sprites are located in "emptyBattle.jpg"
const oPokeStartCoords = [380, 20]; // coordinates for where opponent pokemon sprites are located in "emptyBattle.jpg"
const ms_btwn_shakes = 100; // amt of time in ms that the frame stays before next frame
const total_shake_ms = 1000; // amt of time in ms that the whole shake runs before stopping
const pokeScaleNum = 2.6; // to make pokemon look right size in emerald battle arena - found this by doing trial and error

var pCanvas = document.getElementById("pPokeSpriteCanvas");
var oCanvas = document.getElementById("oPokeSpriteCanvas");
var pContext, pCanvasWidth, pCanvasHeight, oContext, oCanvasWidth, oCanvasHeight; // make these vars global in scope
if (pCanvas && oCanvas) {
	pCanvasWidth = pCanvas.width;
	pCanvasHeight = pCanvas.height;
	pContext = pCanvas.getContext("2d");
	
	oCanvasWidth = oCanvas.width;
	oCanvasHeight = oCanvas.height;
	oContext = oCanvas.getContext("2d");
	
	// Adding this line so the pokemon sprites are not fuzzy
	//    NOTE: I understood how this property worked via this link 
	//    https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled
	pContext.imageSmoothingEnabled = false;
	oContext.imageSmoothingEnabled = false;
}
var pTimerID, oTimerID;
var pPokeCurrCoords = [pPokeStartCoords[0], pPokeStartCoords[1]]; // where player sprite is located on canvas currently
var oPokeCurrCoords = [oPokeStartCoords[0], oPokeStartCoords[1]]; // where opponent sprite is located on canvas currently

// Draw Player's chosen pokemon using sprite image file from pokemondb.net
//    pokeName: lowercase pokemon name (options are blaziken, mudkip, sceptile, swampert, torchic, or treecko)
//    NOTE: In order to match the emerald pokemon look we're going for, 
//          we need to make sprite 2.6 times bigger.
function drawPlayerSprite(pokeName){
	var pSprite = new Image();
	pSprite.src = "sprites/" + pokeName + "Back.png";

	// Wait for sprite to finish loading before drawing!
	pSprite.addEventListener('load', function () {
		pContext.drawImage(
			pSprite, 
			pPokeStartCoords[0], 
			pPokeStartCoords[1], 
			pSprite.width*(pokeScaleNum), 
			pSprite.height*(pokeScaleNum)
		); 
	});
}

// Animate Player's chosen pokemon getting Hit (will shake and flash!)
//    pokeName: lowercase pokemon name (options are blaziken, mudkip, sceptile, swampert, torchic, or treecko)
function hitPlayerSprite(pokeName){
	// (1) CHECK IF ALREADY RUNNING: don't start a shake on top of a running animation
	if (pTimerID){
		return;
	}
	
	// (2) CREATE A SPRITE-IMAGE OF THE CHOSEN POKEMON
	var pSprite = new Image();
	pSprite.src = "sprites/" + pokeName + "Back.png";

	// Wait for sprite to finish loading before animating!
	pSprite.addEventListener('load', function () {
		var pixels_to_move = 7; // amount of pixels to move left and right
		
		// (3) ANIMATE SHAKE: Every 100ms (b/c ms_btwn_shakes=100), move sprite right or left
		//    Move sprite LEFT if sprite just moved RIGHT
		//    Move sprite RIGHT if sprite just moved LEFT
		// (3A) START ANIMATION BY MOVING SPRITE RIGHT FIRST: this causes the shake to start
		pPokeCurrCoords[0] = pPokeStartCoords[0] + pixels_to_move;
		pTimerID = setInterval ( () => {
			// (3B) CLEAR PREV SPRITE: prevents there being multiple sprites
			pContext.clearRect(0, 0, pCanvasWidth, pCanvasHeight);
			
			// (3C) DRAW SPRITE ONTO CANVAS: use pPokeCurrCoords to keep track where sprite is currently 
			pContext.drawImage(
				pSprite, 
				pPokeCurrCoords[0], 
				pPokeCurrCoords[1], 
				pSprite.width*(pokeScaleNum), 
				pSprite.height*(pokeScaleNum)
			); 
			
			// (3D) MOVE SPRITE LEFT OR RIGHT: use pPokeCurrCoords to keep track where sprite is currently 
			//    Move sprite LEFT if sprite just moved RIGHT
			//        sprite just moved RIGHT = curr x coords is > starting x coords
			//    Move sprite RIGHT if sprite just moved LEFT
			//        sprite just moved LEFT = curr x coords is < starting x coords
			if (pPokeCurrCoords[0] > pPokeStartCoords[0]){
				// Player just moved RIGHT, so move LEFT
				pPokeCurrCoords[0] = pPokeStartCoords[0] - pixels_to_move;
			}else if (pPokeCurrCoords[0] < pPokeStartCoords[0]){
				// Player just moved LEFT, so move RIGHT
				pPokeCurrCoords[0] = pPokeStartCoords[0] + pixels_to_move;
			}
		}, ms_btwn_shakes );
		
		// (4) STOP SHAKE ANIMATION ONCE 1 SECOND PASSED
		setTimeout( () => {
			// this function is only entered once total_shake_ms expires
			// (4A) STOP SHAKE ANIMATION
			stopAnimate(pTimerID);
			
			// (4B) CLEAR PREV SPRITE & REDRAW AT START: so sprite doesn't freeze at shifted coordinate
			pContext.clearRect(0, 0, pCanvasWidth, pCanvasHeight);
			pContext.drawImage(
				pSprite, 
				pPokeStartCoords[0], 
				pPokeStartCoords[1], 
				pSprite.width*(pokeScaleNum), 
				pSprite.height*(pokeScaleNum)
			);
		}, total_shake_ms );
	});
}

// Animate Opponent's chosen pokemon getting Hit (will shake and flash!)
//    pokeName: lowercase pokemon name (options are blaziken, mudkip, sceptile, swampert, torchic, or treecko)
function hitOppSprite(pokeName){
	// (1) CHECK IF ALREADY RUNNING: don't start a shake on top of a running animation
	if (oTimerID){
		return;
	}
	
	// (2) CREATE A SPRITE-IMAGE OF THE CHOSEN POKEMON
	var oSprite = new Image();
	oSprite.src = "sprites/" + pokeName + "Front.png";

	// Wait for sprite to finish loading before animating!
	oSprite.addEventListener('load', function () {
		var pixels_to_move = 7; // amount of pixels to move left and right
		
		// (3) ANIMATE SHAKE: Every 100ms (b/c ms_btwn_shakes=100), move sprite right or left
		//    Move sprite LEFT if sprite just moved RIGHT
		//    Move sprite RIGHT if sprite just moved LEFT
		// (3A) START ANIMATION BY MOVING SPRITE RIGHT FIRST: this causes the shake to start
		oPokeCurrCoords[0] = oPokeStartCoords[0] + pixels_to_move;
		oTimerID = setInterval ( () => {
			// (3B) CLEAR PREV SPRITE: prevents there being multiple sprites
			oContext.clearRect(0, 0, oCanvasWidth, oCanvasHeight);
			
			// (3C) DRAW SPRITE ONTO CANVAS: use oPokeCurrCoords to keep track where sprite is currently 
			oContext.drawImage(
				oSprite, 
				oPokeCurrCoords[0], 
				oPokeCurrCoords[1], 
				oSprite.width*(pokeScaleNum), 
				oSprite.height*(pokeScaleNum)
			); 
			
			// (3D) MOVE SPRITE LEFT OR RIGHT: use oPokeCurrCoords to keep track where sprite is currently 
			//    Move sprite LEFT if sprite just moved RIGHT
			//        sprite just moved RIGHT = curr x coords is > starting x coords
			//    Move sprite RIGHT if sprite just moved LEFT
			//        sprite just moved LEFT = curr x coords is < starting x coords
			if (oPokeCurrCoords[0] > oPokeStartCoords[0]){
				// Player just moved RIGHT, so move LEFT
				oPokeCurrCoords[0] = oPokeStartCoords[0] - pixels_to_move;
			}else if (oPokeCurrCoords[0] < oPokeStartCoords[0]){
				// Player just moved LEFT, so move RIGHT
				oPokeCurrCoords[0] = oPokeStartCoords[0] + pixels_to_move;
			}
		}, ms_btwn_shakes );
		
		// (4) STOP SHAKE ANIMATION ONCE 1 SECOND PASSED
		setTimeout( () => {
			// this function is only entered once total_shake_ms expires
			// (4A) STOP SHAKE ANIMATION
			stopAnimate(oTimerID);
			
			// (4B) CLEAR PREV SPRITE & REDRAW AT START: so sprite doesn't freeze at shifted coordinate
			oContext.clearRect(0, 0, oCanvasWidth, oCanvasHeight);
			oContext.drawImage(
				oSprite, 
				oPokeStartCoords[0], 
				oPokeStartCoords[1], 
				oSprite.width*(pokeScaleNum), 
				oSprite.height*(pokeScaleNum)
			);
		}, total_shake_ms );
	});
}

// Draw Opponents's chosen pokemon using sprite image file from pokemondb.net
//    pokeName: lowercase pokemon name (options are blaziken, mudkip, sceptile, swampert, torchic, or treecko)
//    NOTE: In order to match the emerald pokemon look we're going for, 
//          we need to make sprite 2.6 times bigger.
function drawOppSprite(pokeName){
	var oSprite = new Image();
	oSprite.src = "sprites/" + pokeName + "Front.png";

	// Wait for sprite to finish loading before drawing!
	oSprite.addEventListener('load', function () {
		oContext.drawImage(
			oSprite, 
			oPokeStartCoords[0],
			oPokeStartCoords[1],
			oSprite.width*(pokeScaleNum), 
			oSprite.height*(pokeScaleNum)
		); 
	});
}

function stopAnimate(timerID) {
	// stop the timer
	clearInterval(timerID);
	
	// clear the timer flag ID
	timerID = null;
}

/* ANIMATION CODE ENDS */



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
	document.getElementById("runText").style.display = "none";
	document.getElementById("runBackContainer").style.display = "none";
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

function attemptEscape() {
	document.getElementById("optionText").style.display = "none";
	document.getElementById("optionButtonsArea").style.display = "none";
	document.getElementById("runText").style.display = "block";
	document.getElementById("runBackContainer").style.display = "block";
}

// Function to use the selected attack/move
// move is an int (1-4)
function useMove(move) {
	playSound('sounds/select.mp3');




}