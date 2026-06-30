/* ANIMATION CODE STARTS */
const pPokeStartCoords = [110, 142]; // coordinates for where player pokemon sprites are located in "emptyBattle.jpg"
const oPokeStartCoords = [380, 20]; // coordinates for where opponent pokemon sprites are located in "emptyBattle.jpg"
const ms_btwn_shakes = 90; // amt of time in ms that the frame stays before moving left/right
const ms_btwn_flashes = 140; // amt of time in ms that the frame stays before opacity is decreased
const total_hit_ms = 1200; // amt of time in ms that the whole shake & flash runs before stopping
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
var pShakeTimerID, pFlashTimerID, oShakeTimerID, oFlashTimerID;
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
	// (1) CHECK IF ALREADY RUNNING: don't start a second shake/flash on top of a running shake/flash
	if (pShakeTimerID || pFlashTimerID){
		return;
	}
	
	// (2) CREATE A SPRITE-IMAGE OF THE CHOSEN POKEMON
	var pSprite = new Image();
	pSprite.src = "sprites/" + pokeName + "Back.png";

	// Wait for sprite to finish loading before animating!
	pSprite.addEventListener('load', function () {
		var pixels_to_move = 7; // amount of pixels to move left and right
		var isFullOpacity = true; // represents whether the CSS canvas style.opacity value is "1.0" or not
		
		// (3) ANIMATE FLASH: Every 140ms (b/c ms_btwn_flashes=140), alternate the CSS opacity btwn full and decreased
		pFlashTimerID = setInterval ( () => {
			if (isFullOpacity) {
				// If at FULL opacity, change it to DECREASED opacity
				pCanvas.style.opacity = "0.5";
				isFullOpacity = false;
			}else{		
				// If at DECREASED opacity, change it to FULL opacity
				pCanvas.style.opacity = "1.0";
				isFullOpacity = true;
			}
		}, ms_btwn_flashes );
		
		// (4) ANIMATE SHAKE: Every 90ms (b/c ms_btwn_shakes=90), move sprite right or left
		//    Move sprite LEFT if sprite just moved RIGHT
		//    Move sprite RIGHT if sprite just moved LEFT
		// (4A) START ANIMATION BY MOVING SPRITE RIGHT FIRST: this causes the shake to start
		pPokeCurrCoords[0] = pPokeStartCoords[0] + pixels_to_move;
		pShakeTimerID = setInterval ( () => {
			// (4B) CLEAR PREV SPRITE: prevents there being multiple sprites
			pContext.clearRect(0, 0, pCanvasWidth, pCanvasHeight);
			
			// (4C) DRAW SPRITE ONTO CANVAS: use pPokeCurrCoords to keep track where sprite is currently 
			pContext.drawImage(
				pSprite, 
				pPokeCurrCoords[0], 
				pPokeCurrCoords[1], 
				pSprite.width*(pokeScaleNum), 
				pSprite.height*(pokeScaleNum)
			);
			
			// (4D) MOVE SPRITE LEFT OR RIGHT: use pPokeCurrCoords to keep track where sprite is currently 
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
		
		// (5) STOP SHAKE ANIMATION ONCE 1.2 SECONDS PASSED
		setTimeout( () => {
			// this function is only entered once total_hit_ms expires
			// (5A) STOP SHAKE & FLASH ANIMATIONS: stop the timers & set them to null
			clearInterval(pShakeTimerID);
			clearInterval(pFlashTimerID);
			pShakeTimerID = null;
			pFlashTimerID = null;
			
			// (5B) CLEAR PREV SPRITE & REDRAW AT START W/FULL OPACITY: so sprite doesn't freeze at shifted coordinate or decreased opacity
			pCanvas.style.opacity = "1.0";
			isFullOpacity = true;
			pContext.clearRect(0, 0, pCanvasWidth, pCanvasHeight);
			pContext.drawImage(
				pSprite, 
				pPokeStartCoords[0], 
				pPokeStartCoords[1], 
				pSprite.width*(pokeScaleNum), 
				pSprite.height*(pokeScaleNum)
			);
		}, total_hit_ms );
	});
}

// Animate Opponent's chosen pokemon getting Hit (will shake and flash!)
//    pokeName: lowercase pokemon name (options are blaziken, mudkip, sceptile, swampert, torchic, or treecko)
function hitOppSprite(pokeName){
	// (1) CHECK IF ALREADY RUNNING: don't start a second shake/flash on top of a running shake/flash
	if (oShakeTimerID || oFlashTimerID){
		return;
	}
	
	// (2) CREATE A SPRITE-IMAGE OF THE CHOSEN POKEMON
	var oSprite = new Image();
	oSprite.src = "sprites/" + pokeName + "Front.png";

	// Wait for sprite to finish loading before animating!
	oSprite.addEventListener('load', function () {
		var pixels_to_move = 7; // amount of pixels to move left and right
		var isFullOpacity = true; // represents whether the CSS canvas style.opacity value is "1.0" or not
		
		// (3) ANIMATE FLASH: Every 140ms (b/c ms_btwn_flashes=140), alternate the CSS opacity btwn full and decreased
		oFlashTimerID = setInterval ( () => {
			if (isFullOpacity) {
				// If at FULL opacity, change it to DECREASED opacity
				oCanvas.style.opacity = "0.5";
				isFullOpacity = false;
			}else{		
				// If at DECREASED opacity, change it to FULL opacity
				oCanvas.style.opacity = "1.0";
				isFullOpacity = true;
			}
		}, ms_btwn_flashes );
		
		// (4) ANIMATE SHAKE: Every 90ms (b/c ms_btwn_shakes=90), move sprite right or left
		//    Move sprite LEFT if sprite just moved RIGHT
		//    Move sprite RIGHT if sprite just moved LEFT
		// (4A) START ANIMATION BY MOVING SPRITE RIGHT FIRST: this causes the shake to start
		oPokeCurrCoords[0] = oPokeStartCoords[0] + pixels_to_move;
		oShakeTimerID = setInterval ( () => {
			// (4B) CLEAR PREV SPRITE: prevents there being multiple sprites
			oContext.clearRect(0, 0, oCanvasWidth, oCanvasHeight);
			
			// (4C) DRAW SPRITE ONTO CANVAS: use oPokeCurrCoords to keep track where sprite is currently 
			oContext.drawImage(
				oSprite, 
				oPokeCurrCoords[0], 
				oPokeCurrCoords[1], 
				oSprite.width*(pokeScaleNum), 
				oSprite.height*(pokeScaleNum)
			); 
			
			// (4D) MOVE SPRITE LEFT OR RIGHT: use oPokeCurrCoords to keep track where sprite is currently 
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
		
		// (5) STOP SHAKE ANIMATION ONCE 1.2 SECONDS PASSED
		setTimeout( () => {
			// this function is only entered once total_hit_ms expires
			// (5A) STOP SHAKE & FLASH ANIMATIONS: stop the timers & set them to null
			clearInterval(oShakeTimerID);
			clearInterval(oFlashTimerID);
			oShakeTimerID = null;
			oFlashTimerID = null;
			
			// (5B) CLEAR PREV SPRITE & REDRAW AT START W/FULL OPACITY: so sprite doesn't freeze at shifted coordinate or decreased opacity
			oCanvas.style.opacity = "1.0";
			isFullOpacity = true;
			oContext.clearRect(0, 0, oCanvasWidth, oCanvasHeight);
			oContext.drawImage(
				oSprite, 
				oPokeStartCoords[0], 
				oPokeStartCoords[1], 
				oSprite.width*(pokeScaleNum), 
				oSprite.height*(pokeScaleNum)
			);
		}, total_hit_ms );
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