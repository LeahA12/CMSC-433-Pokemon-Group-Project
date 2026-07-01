/* ANIMATION CODE STARTS */
const pPokeStartCoords = [110, 142]; // coordinates for where player pokemon sprites are located in "emptyBattle.jpg"
const oPokeStartCoords = [380, 20]; // coordinates for where opponent pokemon sprites are located in "emptyBattle.jpg"
const ms_btwn_shakes = 90; // amt of time in ms that the frame stays before moving left/right
const ms_btwn_flashes = 140; // amt of time in ms that the frame stays before opacity is decreased
const ms_btwn_bobs = 400; // amt of time in ms that the frame stays before moving up/down
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
var pShakeTimerID, pFlashTimerID, pIdleTimerID, oShakeTimerID, oFlashTimerID, oIdleTimerID;
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
				// If at FULL opacity, change it to DECREASED opacity
				pCanvas.style.opacity = "0.5";
				isFullOpacity = false;
			}else{		
				// If at DECREASED opacity, change it to FULL opacity
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
				// If at FULL opacity, change it to DECREASED opacity
				oCanvas.style.opacity = "0.5";
				isFullOpacity = false;
			}else{		
				// If at DECREASED opacity, change it to FULL opacity
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
/*
	This whole section is VERY unfinished and full of placeholder variables.
	Some lines of code may even be entirely relocated into different parts of the program.
	I'll update what has changed here until the final build.
*/
function useMove(move) {
	var player = new Player // REPLACE THIS WITH THE ACTUAL ACTIVE PLAYER OBJECT
	var opponent = new Player // REPLACE THIS WITH THE ACTUAL ACTIVE OPPONENT OBJECT
	var activePokemon = player.activemon;
	var opponentPokemon = opponent.activemon;



	playSound('sounds/select.mp3');
	// may move these elsewhere
	var playerDamage = damageCalculation(activePokemon.moves[move - 1], activePokemon, opponentPokemon);
	var oppDamage = damageCalculation(opponentPokemon.moves[rand(0,3)], opponentPokemon, activePokemon);
	
	
}

// Function that calculates the upper bound of battle damage from using a move on a pokemon, using the formula and rules from the games

function damageCalculation(move, user, target) {
	var atk = 1;
	var def = 1;
	// Determines whether to use physical or special stats for damage calc. Does not factor in exceptions like psyshock or body press.
	if (move.style == PHYSICAL) {
		atk = user.attack;
		def = target.defense;
	}
	if (move.style == SPECIAL) {
		atk = user.sp_attack;
		def = target.sp_defense;
	}

	// Base damage calculation
	var damage = (((((2 * user.level / 5) + 2) * move.power * atk / def) / 50) + 2);
	
	// A damaging move must always do at least 1 damage
	if (damage < 1) {
		damage = 1;
	}
	
	// Same Type Attack Bonus and type effectiveness
	if (move.type == user.type1 || move.type == user.type2) {
		damage = damage * 1.5;
	}
	damage = damage * typeEffectiveness(move, opponentPokemon);
	
	// Status moves do not deal damage
	if (move.style == STATUS) {
		damage = 0;
	}
	
	// In this simulator, each move's additional effect only has a 10% chance of going off. Don't bother using lava plume or scald.
	if (move.additionalEffect) {
		var chance = randomInt(100)
		if (chance < 90) {
			// apply additional effect
		}
	}
	// Note: In the actual games, after damage is calculated, there is an additional roll for the final value. The
	// actual damage can be anywhere between 85% and 100% of the final value, with a 1/16 chance of hitting each
	// percentage. This will be reflected in the battle loop, not here in damageCalculation, as this returns an int.
	return damage;
}
// Helper function to calculate type effectiveness. Takes a move and a target pokemon.
function typeEffectiveness(move, target) {
	var eff = 1;
	var moveType = move.type;
	var targetType1 = target.type1;
	var targetType2 = target.type2;
	var types = [target.type1, target.type2];
	// Puts each of the target's types in an array, then iterates over it for type effectiveness
	// Each type matchup is hardcoded. Open at your own risk. It's long.
	types.forEach((type, i) => {
		switch (type) {
			case NULL:
				eff = eff;
				break;
			case "Normal":
				switch (moveType) {
					case "Fighting":
						eff = eff * 2;
						break;
					case "Ghost":
						eff = 0;
						break;
					default:
						eff = eff;
						break;
				}
				break;
			case "Fire":
				switch (moveType) {
					case "Fire":
						eff = eff / 2;
						break;
					case "Water":
						eff = eff * 2;
						break;
					case "Grass":
						eff = eff / 2;
						break;
					case "Ice":
						eff = eff / 2;
						break;
					case "Ground":
						eff = eff * 2;
						break;
					case "Bug":
						eff = eff / 2;
						break;
					case "Rock":
						eff = eff * 2;
						break;
					case "Steel":
						eff = eff / 2;
						break;
					case "Fairy":
						eff = eff / 2;
						break;
					default:
						eff = eff;
						break;
				}
				break;
			case "Water":
				switch (moveType) {
					case "Fire":
						eff = eff / 2;
						break;
					case "Water":
						eff = eff / 2;
						break;
					case "Electric":
						eff = eff * 2;
						break;
					case "Grass":
						eff = eff * 2;
						break;
					case "Ice":
						eff = eff / 2;
						break;
					case "Steel":
						eff = eff / 2;
						break;
					default:
						eff = eff;
						break;
				}
				break;
			case "Electric":
				switch (moveType) {
					case "Electric":
						eff = eff / 2;
						break;
					case "Ground":
						eff = eff * 2;
						break;
					case "Flying":
						eff = eff / 2;
						break;
					case "Steel":
						eff = eff / 2;
						break;
					default:
						eff = eff;
						break;
				}
				break;
			case "Grass":
				switch (moveType) {
					case "Fire":
						eff = eff * 2;
						break;
					case "Water":
						eff = eff / 2;
						break;
					case "Electric":
						eff = eff / 2;
						break;
					case "Grass":
						eff = eff / 2;
						break;
					case "Ice":
						eff = eff * 2;
						break;
					case "Poison":
						eff = eff * 2;
						break;
					case "Ground":
						eff = eff / 2;
						break;
					case "Flying":
						eff = eff * 2;
						break;
					case "Bug":
						eff = eff * 2;
						break;
					default:
						eff = eff;
						break;
				}
				break;
			case "Ice":
				switch (moveType) {
					case "Fire":
						eff = eff * 2;
						break;
					case "Ice":
						eff = eff / 2;
						break;
					case "Fighting":
						eff = eff * 2;
						break;
					case "Rock":
						eff = eff * 2;
						break;
					case "Steel":
						eff = eff * 2;
						break;
					default:
						eff = eff;
						break;
				}
				break;
			case "Fighting":
				switch (moveType) {
					case "Flying":
						eff = eff * 2;
						break;
					case "Psychic":
						eff = eff * 2;
						break;
					case "Bug":
						eff = eff / 2;
						break;
					case "Rock":
						eff = eff / 2;
						break;
					case "Dark":
						eff = eff / 2;
						break;
					case "Fairy":
						eff = eff * 2;
						break;
					default:
						eff = eff;
						break;
				}
				break;
			case "Poison":
				switch (moveType) {
					case "Grass":
						eff = eff / 2;
						break;
					case "Fighting":
						eff = eff / 2;
						break;
					case "Poison":
						eff = eff / 2;
						break;
					case "Ground":
						eff = eff * 2;
						break;
					case "Psychic":
						eff = eff * 2;
						break;
					case "Bug":
						eff = eff / 2;
						break;
					case "Fairy":
						eff = eff / 2;
						break;
					default:
						eff = eff;
						break;
				}
				break;
			case "Ground":
				switch (moveType) {
					case "Water":
						eff = eff * 2;
						break;
					case "Electric":
						eff = 0;
						break;
					case "Grass":
						eff = eff * 2;
						break;
					case "Ice":
						eff = eff * 2;
						break;
					case "Poison":
						eff = eff / 2;
						break;
					case "Rock":
						eff = eff / 2;
						break;
					default:
						eff = eff;
						break;
				}
				break;
			case "Flying":
				switch (moveType) {
					case "Electric":
						eff = eff * 2;
						break;
					case "Grass":
						eff = eff / 2;
						break;
					case "Ice":
						eff = eff * 2;
						break;
					case "Fighting":
						eff = eff / 2;
						break;
					case "Ground":
						eff = 0;
						break;
					case "Bug":
						eff = eff / 2;
						break;
					case "Rock":
						eff = eff * 2;
						break;
					default:
						eff = eff;
						break;
				}
				break;
			case "Psychic":
				switch (moveType) {
					case "Fighting":
						eff = eff / 2;
						break;
					case "Psychic":
						eff = eff / 2;
						break;
					case "Bug":
						eff = eff * 2;
						break;
					case "Ghost":
						eff = eff * 2;
						break;
					case "Dark":
						eff = eff * 2;
						break;
					default:
						eff = eff;
						break;
				}
				break;
			case "Bug":
				switch (moveType) {
					case "Fire":
						eff = eff * 2;
						break;
					case "Grass":
						eff = eff / 2;
						break;
					case "Fighting":
						eff = eff / 2;
						break;
					case "Ground":
						eff = eff / 2;
						break;
					case "Flying":
						eff = eff * 2;
						break;
					case "Rock":
						eff = eff * 2;
						break;
					default:
						eff = eff;
						break;
				}
				break;
			case "Rock":
				switch (moveType) {
					case "Normal":
						eff = eff / 2;
						break;
					case "Fire":
						eff = eff / 2;
						break;
					case "Water":
						eff = eff * 2;
						break;
					case "Grass":
						eff = eff * 2;
						break;
					case "Fighting":
						eff = eff * 2;
						break;
					case "Poison":
						eff = eff / 2;
						break;
					case "Ground":
						eff = eff * 2;
						break;
					case "Flying":
						eff = eff / 2;
						break;
					case "Steel":
						eff = eff * 2;
						break;
					default:
						eff = eff;
						break;
				}
				break;
			case "Ghost":
				switch (moveType) {
					case "Normal":
						eff = 0;
						break;
					case "Fighting":
						eff = 0;
						break;
					case "Poison":
						eff = eff / 2;
						break;
					case "Bug":
						eff = eff / 2;
						break;
					case "Ghost":
						eff = eff * 2;
						break;
					case "Dark":
						eff = eff * 2;
						break;
					default:
						eff = eff;
						break;
				}
				break;
			case "Dragon":
				switch (moveType) {
					case "Fire":
						eff = eff / 2;
						break;
					case "Water":
						eff = eff / 2;
						break;
					case "Electric":
						eff = eff / 2;
						break;
					case "Grass":
						eff = eff / 2;
						break;
					case "Ice":
						eff = eff * 2;
						break;
					case "Dragon":
						eff = eff * 2;
						break;
					case "Fairy":
						eff = eff * 2;
						break;
					default:
						eff = eff;
						break;
				}
				break;
			case "Dark":
				switch (moveType) {
					case "Fighting":
						eff = eff * 2;
						break;
					case "Psychic":
						eff = 0;
						break;
					case "Bug":
						eff = eff * 2;
						break;
					case "Ghost":
						eff = eff / 2;
						break;
					case "Dark":
						eff = eff / 2;
						break;
					case "Fairy":
						eff = eff * 2;
						break;
					default:
						eff = eff;
						break;
				}
				break;
			case "Steel":
				switch (moveType) {
					case "Normal":
						eff = eff / 2;
						break;
					case "Fire":
						eff = eff * 2;
						break;
					case "Grass":
						eff = eff / 2;
						break;
					case "Ice":
						eff = eff / 2;
						break;
					case "Fighting":
						eff = eff * 2;
						break;
					case "Poison":
						eff = 0;
						break;
					case "Ground":
						eff = eff * 2;
						break;
					case "Flying":
						eff = eff / 2;
						break;
					case "Psychic":
						eff = eff / 2;
						break;
					case "Bug":
						eff = eff / 2;
						break;
					case "Rock":
						eff = eff / 2;
						break;
					case "Dragon":
						eff = eff / 2;
						break;
					case "Steel":
						eff = eff / 2;
						break;
					case "Fairy":
						eff = eff / 2;
						break;
					default:
						eff = eff;
						break;
				}
				break;
			case "Fairy":
				switch (moveType) {
					case "Fighting":
						eff = eff;
						break;
					case "Poison":
						eff = eff / 2;
						break;
					case "Bug":
						eff = eff / 2;
						break;
					case "Dragon":
						eff = 0;
						break;
					case "Dark":
						eff = eff / 2;
						break;
					case "Steel":
						eff = eff * 2;
						break;
					default:
						eff = eff;
						break;
				}
				break;
			default:
				break;
		}
	});
	// Returns an int with the value of the effectiveness multiplier
	return eff;
}
// Helper for random number
function randomInt(max) {
  return Math.floor(Math.random() * max);
}