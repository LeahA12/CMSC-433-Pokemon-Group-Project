/* ANIMATION CODE STARTS */
const pPokeStartCoords = [110, 142]; // coordinates for where player pokemon sprites are located in "emptyBattle.jpg"
const oPokeStartCoords = [380, 20]; // coordinates for where opponent pokemon sprites are located in "emptyBattle.jpg"
const ms_btwn_shakes = 90; // amt of time in ms that the frame stays before moving left/right
const ms_btwn_flashes = 140; // amt of time in ms that the frame stays before opacity is decreased
const ms_btwn_bobs = 400; // amt of time in ms that the frame stays before moving up/down
const ms_btwn_fades = 120; // amt of time in ms that the frame stays before its opacity is decreased by 0.1
const ms_btwn_drops = 60; // amt of time in ms that the frame stays before moving down
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
var pShakeTimerID, pFlashTimerID, pIdleTimerID, pFadeTimerID, pDropTimerID, oShakeTimerID, oFlashTimerID, oIdleTimerID, oFadeTimerID, oDropTimerID;
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
		idlePlayerSprite(pokeName); // immediately start the idle animation
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
		idleOppSprite(pokeName); // immediately start the idle animation
	});
}

// Animate Player's chosen pokemon Idling (move up and down)
//    pokeName: lowercase pokemon name (options are blaziken, mudkip, sceptile, swampert, torchic, or treecko)
function idlePlayerSprite(pokeName){
	// (1) CHECK IF ALREADY RUNNING: don't start a second idle on top of a running idle
	if (pIdleTimerID){
		return;
	}
	
	// (2) CREATE A SPRITE-IMAGE OF THE CHOSEN POKEMON
	var pSprite = new Image();
	pSprite.src = "sprites/" + pokeName + "Back.png";

	// Wait for sprite to finish loading before animating!
	pSprite.addEventListener('load', function () {
		var pixels_to_move = 2; // amount of pixels to move up and down
		
		// (3) ANIMATE BOB: Every 400ms (b/c ms_btwn_bobs=400), move sprite up or down
		//    Move sprite DOWN if sprite just moved UP
		//    Move sprite UP if sprite just moved DOWN
		// (3A) START ANIMATION BY MOVING SPRITE UP FIRST: this causes the bob to start
		pPokeCurrCoords[1] = pPokeStartCoords[1] + pixels_to_move;
		pIdleTimerID = setInterval ( () => {
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
			
			// (3D) MOVE SPRITE UP OR DOWN: use pPokeCurrCoords to keep track where sprite is currently 
			//    Move sprite DOWN if sprite just moved UP
			//        sprite just moved UP = curr y coords is > starting y coords
			//    Move sprite UP if sprite just moved DOWN
			//        sprite just moved DOWN = curr y coords is < starting y coords
			if (pPokeCurrCoords[1] > pPokeStartCoords[1]){
				// Player just moved UP, so move DOWN
				pPokeCurrCoords[1] = pPokeStartCoords[1] - pixels_to_move;
			}else if (pPokeCurrCoords[1] < pPokeStartCoords[1]){
				// Player just moved DOWN, so move UP
				pPokeCurrCoords[1] = pPokeStartCoords[1] + pixels_to_move;
			}
		}, ms_btwn_bobs );
	});
}

// Animate Opponent's chosen pokemon Idling (move up and down)
//    pokeName: lowercase pokemon name (options are blaziken, mudkip, sceptile, swampert, torchic, or treecko)
function idleOppSprite(pokeName){
	// (1) CHECK IF ALREADY RUNNING: don't start a second idle on top of a running idle
	if (oIdleTimerID){
		return;
	}
	
	// (2) CREATE A SPRITE-IMAGE OF THE CHOSEN POKEMON
	var oSprite = new Image();
	oSprite.src = "sprites/" + pokeName + "Front.png";

	// Wait for sprite to finish loading before animating!
	oSprite.addEventListener('load', function () {
		var pixels_to_move = 2; // amount of pixels to move up and down
		
		// (3) ANIMATE BOB: Every 400ms (b/c ms_btwn_bobs=400), move sprite up or down
		//    Move sprite DOWN if sprite just moved UP
		//    Move sprite UP if sprite just moved DOWN
		// (3A) START ANIMATION BY MOVING SPRITE UP FIRST: this causes the bob to start
		oPokeCurrCoords[1] = oPokeStartCoords[1] + pixels_to_move;
		oIdleTimerID = setInterval ( () => {
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
			
			// (3D) MOVE SPRITE UP OR DOWN: use oPokeCurrCoords to keep track where sprite is currently 
			//    Move sprite DOWN if sprite just moved UP
			//        sprite just moved UP = curr y coords is > starting y coords
			//    Move sprite UP if sprite just moved DOWN
			//        sprite just moved DOWN = curr y coords is < starting y coords
			if (oPokeCurrCoords[1] > oPokeStartCoords[1]){
				// Player just moved UP, so move DOWN
				oPokeCurrCoords[1] = oPokeStartCoords[1] - pixels_to_move;
			}else if (oPokeCurrCoords[1] < oPokeStartCoords[1]){
				// Player just moved DOWN, so move UP
				oPokeCurrCoords[1] = oPokeStartCoords[1] + pixels_to_move;
			}
		}, ms_btwn_bobs );
	});
}

// Animate Player's chosen pokemon getting Hit (will shake and flash!)
//    pokeName: lowercase pokemon name (options are blaziken, mudkip, sceptile, swampert, torchic, or treecko)
function hitPlayerSprite(pokeName){
	// (1) CHECK IF ALREADY RUNNING: don't start a second shake/flash on top of a running shake/flash
	if (pShakeTimerID || pFlashTimerID){
		return;
	}
	
	// (2) PAUSE THE IDLE ANIMATION: stop the timer & set it to null
	if (pIdleTimerID){
		clearInterval(pIdleTimerID);
		pIdleTimerID = null;
	}
	
	// (3) CREATE A SPRITE-IMAGE OF THE CHOSEN POKEMON
	var pSprite = new Image();
	pSprite.src = "sprites/" + pokeName + "Back.png";

	// Wait for sprite to finish loading before animating!
	pSprite.addEventListener('load', function () {
		var pixels_to_move = 7; // amount of pixels to move left and right
		var isFullOpacity = true; // represents whether the CSS canvas style.opacity value is "1.0" or not
		
		// (4) ANIMATE FLASH: Every 140ms (b/c ms_btwn_flashes=140), alternate the CSS opacity btwn full and decreased
		pFlashTimerID = setInterval ( () => {
			if (isFullOpacity) {
				// If at FULL opacity, change it to HALVED opacity
				pCanvas.style.opacity = "0.5";
				isFullOpacity = false;
			}else{		
				// If at HALVED opacity, change it to FULL opacity
				pCanvas.style.opacity = "1.0";
				isFullOpacity = true;
			}
		}, ms_btwn_flashes );
		
		// (5) ANIMATE SHAKE: Every 90ms (b/c ms_btwn_shakes=90), move sprite right or left
		//    Move sprite LEFT if sprite just moved RIGHT
		//    Move sprite RIGHT if sprite just moved LEFT
		// (5A) START ANIMATION BY MOVING SPRITE RIGHT FIRST: this causes the shake to start
		pPokeCurrCoords[0] = pPokeStartCoords[0] + pixels_to_move;
		pShakeTimerID = setInterval ( () => {
			// (5B) CLEAR PREV SPRITE: prevents there being multiple sprites
			pContext.clearRect(0, 0, pCanvasWidth, pCanvasHeight);
			
			// (5C) DRAW SPRITE ONTO CANVAS: use pPokeCurrCoords to keep track where sprite is currently 
			pContext.drawImage(
				pSprite, 
				pPokeCurrCoords[0], 
				pPokeCurrCoords[1], 
				pSprite.width*(pokeScaleNum), 
				pSprite.height*(pokeScaleNum)
			);
			
			// (5D) MOVE SPRITE LEFT OR RIGHT: use pPokeCurrCoords to keep track where sprite is currently 
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
		
		// (6) STOP SHAKE ANIMATION ONCE 1.2 SECONDS PASSED
		setTimeout( () => {
			// this function is only entered once total_hit_ms expires
			// (6A) STOP SHAKE & FLASH ANIMATIONS: stop the timers & set them to null
			clearInterval(pShakeTimerID);
			clearInterval(pFlashTimerID);
			pShakeTimerID = null;
			pFlashTimerID = null;
			
			// (6B) CLEAR PREV SPRITE & REDRAW AT START W/FULL OPACITY: so sprite doesn't freeze at shifted coordinate or decreased opacity
			pCanvas.style.opacity = "1.0";
			isFullOpacity = true;
			pContext.clearRect(0, 0, pCanvasWidth, pCanvasHeight);
			drawPlayerSprite(pokeName); // continues the idle animation!
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
	
	// (2) PAUSE THE IDLE ANIMATION: stop the timer & set it to null
	if (oIdleTimerID){
		clearInterval(oIdleTimerID);
		oIdleTimerID = null;
	}
	
	// (3) CREATE A SPRITE-IMAGE OF THE CHOSEN POKEMON
	var oSprite = new Image();
	oSprite.src = "sprites/" + pokeName + "Front.png";

	// Wait for sprite to finish loading before animating!
	oSprite.addEventListener('load', function () {
		var pixels_to_move = 7; // amount of pixels to move left and right
		var isFullOpacity = true; // represents whether the CSS canvas style.opacity value is "1.0" or not
		
		// (4) ANIMATE FLASH: Every 140ms (b/c ms_btwn_flashes=140), alternate the CSS opacity btwn full and decreased
		oFlashTimerID = setInterval ( () => {
			if (isFullOpacity) {
				// If at FULL opacity, change it to HALVED opacity
				oCanvas.style.opacity = "0.5";
				isFullOpacity = false;
			}else{		
				// If at HALVED opacity, change it to FULL opacity
				oCanvas.style.opacity = "1.0";
				isFullOpacity = true;
			}
		}, ms_btwn_flashes );
		
		// (5) ANIMATE SHAKE: Every 90ms (b/c ms_btwn_shakes=90), move sprite right or left
		//    Move sprite LEFT if sprite just moved RIGHT
		//    Move sprite RIGHT if sprite just moved LEFT
		// (5A) START ANIMATION BY MOVING SPRITE RIGHT FIRST: this causes the shake to start
		oPokeCurrCoords[0] = oPokeStartCoords[0] + pixels_to_move;
		oShakeTimerID = setInterval ( () => {
			// (5B) CLEAR PREV SPRITE: prevents there being multiple sprites
			oContext.clearRect(0, 0, oCanvasWidth, oCanvasHeight);
			
			// (5C) DRAW SPRITE ONTO CANVAS: use oPokeCurrCoords to keep track where sprite is currently 
			oContext.drawImage(
				oSprite, 
				oPokeCurrCoords[0], 
				oPokeCurrCoords[1], 
				oSprite.width*(pokeScaleNum), 
				oSprite.height*(pokeScaleNum)
			); 
			
			// (5D) MOVE SPRITE LEFT OR RIGHT: use oPokeCurrCoords to keep track where sprite is currently 
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
		
		// (6) STOP SHAKE ANIMATION ONCE 1.2 SECONDS PASSED
		setTimeout( () => {
			// this function is only entered once total_hit_ms expires
			// (6A) STOP SHAKE & FLASH ANIMATIONS: stop the timers & set them to null
			clearInterval(oShakeTimerID);
			clearInterval(oFlashTimerID);
			oShakeTimerID = null;
			oFlashTimerID = null;
			
			// (6B) CLEAR PREV SPRITE & REDRAW AT START W/FULL OPACITY: so sprite doesn't freeze at shifted coordinate or decreased opacity
			oCanvas.style.opacity = "1.0";
			isFullOpacity = true;
			oContext.clearRect(0, 0, oCanvasWidth, oCanvasHeight);
			drawOppSprite(pokeName); // continues the idle animation!
		}, total_hit_ms );
	});
}

// Animate Player's chosen pokemon Fainting (fade in opacity, then drop downward until offscreen)
//    pokeName: lowercase pokemon name (options are blaziken, mudkip, sceptile, swampert, torchic, or treecko)
function faintPlayerSprite(pokeName){
	// (1) CHECK IF ALREADY RUNNING: don't start a second fade/drop on top of a running fade/drop
	if (pFadeTimerID || pDropTimerID){
		return;
	}
	
	// (2) END THE IDLE ANIMATION: stop the timer & set it to null
	if (pIdleTimerID){
		clearInterval(pIdleTimerID);
		pIdleTimerID = null;
	}
	
	// (3) CREATE A SPRITE-IMAGE OF THE CHOSEN POKEMON
	var pSprite = new Image();
	pSprite.src = "sprites/" + pokeName + "Back.png";

	// Wait for sprite to finish loading before animating!
	pSprite.addEventListener('load', function () {
		var pixels_to_move = 7; // amount of pixels to move down for each drop
		var curr_opacity_tracker = 1.0;
		var opacity_amt_to_decrease = 0.1;
		
		// (4) ANIMATE FADE: Every 120ms (b/c ms_btwn_fades=120), decrease the CSS opacity by 0.1 until at 0.4
		pFadeTimerID = setInterval ( () => {
			// (4A) CHECK IF AT 0.4 OPACITY: only decrease opacity if it is NOT 0.4  
			if (curr_opacity_tracker > 0.4){
				// (4B) DECREASE OPACITY BY 0.1
				curr_opacity_tracker = curr_opacity_tracker - opacity_amt_to_decrease;
				pCanvas.style.opacity = curr_opacity_tracker;
			}else{
				// (4C) STOP FADE-ANIMATION B/C SPRITE IS AT 0.4 OPACITY
				clearInterval(pFadeTimerID);
				pFadeTimerID = null;
				
				// (5) ANIMATE DROP AFTER FADE: Every 60ms (b/c ms_btwn_drops=60), move sprite down 7 pixels until offscreen
				pDropTimerID = setInterval ( () => {
					// (5A) CLEAR PREV SPRITE: prevents there being multiple sprites
					pContext.clearRect(0, 0, pCanvasWidth, pCanvasHeight);
					
					// (5B) CHECK IF OFFSCREEN: only draw sprite if it has NOT reached off screen
					//    btw, pPokeCurrCoords is used to keep track where sprite is currently 
					if (pPokeCurrCoords[1] < pCanvasHeight){
						// (5C) DRAW SPRITE ONTO CANVAS W/0.4 OPACITY: use pPokeCurrCoords
						pCanvas.style.opacity = "0.4";
						pContext.drawImage(
							pSprite, 
							pPokeCurrCoords[0], 
							pPokeCurrCoords[1], 
							pSprite.width*(pokeScaleNum), 
							pSprite.height*(pokeScaleNum)
						);
						
						// (5D) MOVE SPRITE DOWN (until off screen): us pPokeCurrCoords
						pPokeCurrCoords[1] = pPokeCurrCoords[1] + pixels_to_move;
					}else{
						// (5E) STOP DROP-ANIMATION B/C SPRITE IS NOW OFFSCREEN
						clearInterval(pDropTimerID);
						pDropTimerID = null;
					}
				}, ms_btwn_drops );
			}
		}, ms_btwn_fades );
	});
}

// Animate Opponent's chosen pokemon Fainting (fade in opacity, then drop downward until offscreen)
//    pokeName: lowercase pokemon name (options are blaziken, mudkip, sceptile, swampert, torchic, or treecko)
function faintOppSprite(pokeName){
	// (1) CHECK IF ALREADY RUNNING: don't start a second fade/drop on top of a running fade/drop
	if (oFadeTimerID || oDropTimerID){
		return;
	}
	
	// (2) END THE IDLE ANIMATION: stop the timer & set it to null
	if (oIdleTimerID){
		clearInterval(oIdleTimerID);
		oIdleTimerID = null;
	}
	
	// (3) CREATE A SPRITE-IMAGE OF THE CHOSEN POKEMON
	var oSprite = new Image();
	oSprite.src = "sprites/" + pokeName + "Front.png";

	// Wait for sprite to finish loading before animating!
	oSprite.addEventListener('load', function () {
		var pixels_to_move = 7; // amount of pixels to move down for each drop
		var curr_opacity_tracker = 1.0;
		var opacity_amt_to_decrease = 0.1;
		
		// (4) ANIMATE FADE: Every 120ms (b/c ms_btwn_fades=120), decrease the CSS opacity by 0.1 until at 0.4
		oFadeTimerID = setInterval ( () => {
			// (4A) CHECK IF AT 0.4 OPACITY: only decrease opacity if it is NOT 0.4  
			if (curr_opacity_tracker > 0.4){
				// (4B) DECREASE OPACITY BY 0.1
				curr_opacity_tracker = curr_opacity_tracker - opacity_amt_to_decrease;
				oCanvas.style.opacity = curr_opacity_tracker;
			}else{
				// (4C) STOP FADE-ANIMATION B/C SPRITE IS AT 0.4 OPACITY
				clearInterval(oFadeTimerID);
				oFadeTimerID = null;
				
				// (5) ANIMATE DROP AFTER FADE: Every 60ms (b/c ms_btwn_drops=60), move sprite down 7 pixels until offscreen
				oDropTimerID = setInterval ( () => {
					// (5A) CLEAR PREV SPRITE: prevents there being multiple sprites
					oContext.clearRect(0, 0, oCanvasWidth, oCanvasHeight);
					
					// (5B) CHECK IF OFFSCREEN: only draw sprite if it has NOT reached off screen
					//    btw, oPokeCurrCoords is used to keep track where sprite is currently 
					if (oPokeCurrCoords[1] < oCanvasHeight){
						// (5C) DRAW SPRITE ONTO CANVAS W/0.4 OPACITY: use oPokeCurrCoords
						oCanvas.style.opacity = "0.4";
						oContext.drawImage(
							oSprite, 
							oPokeCurrCoords[0], 
							oPokeCurrCoords[1], 
							oSprite.width*(pokeScaleNum), 
							oSprite.height*(pokeScaleNum)
						);
						
						// (5D) MOVE SPRITE DOWN (until off screen): us oPokeCurrCoords
						oPokeCurrCoords[1] = oPokeCurrCoords[1] + pixels_to_move;
					}else{
						// (5E) STOP DROP-ANIMATION B/C SPRITE IS NOW OFFSCREEN
						clearInterval(oDropTimerID);
						oDropTimerID = null;
					}
				}, ms_btwn_drops );
			}
		}, ms_btwn_fades );
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