// player class containing array of pokemon (team)
class Player {
	constructor(team, currIndex) {
		this.team = team;
		this.currIndex = currIndex;
	}
}

// pokemon class containing attributes of pokemon
class Pokemon {
	constructor(name, type1, type2, hp, attack, defense, sp_attack, sp_defense, speed, status, moves) {
		this.name = name;
		this.type1 = type1;
		this.type2 = type2;
		// A pokemon's actual stats are calculated based on its base stats
		// We'll be treating every pokemon as level 100, 31 IVs, 0 EVs for balance sake
		this.currHP = (2 * hp + 31) + 110;
		this.maxHP = (2 * hp + 31) + 110
		this.attack = (2 * attack + 31) + 5;
		this.defense = (2 * defense + 31) + 5;
		this.sp_attack = (2 * sp_attack + 31) + 5;
		this.sp_defense = (2 * sp_defense + 31) + 5;
		this.speed = (2 * speed + 31) + 5;
		this.status = status;

		// array of moves
		this.moves = moves
	}
}

// move class containing attributes of moves
class Move {
	constructor(name, amount, type, style, status) {
		this.name = name;
		this.amount = amount;
		this.type = type;
		this.style = style;
		this.status = status;
	}
}

// array of pokemon
const pokemon = new Array();
const playerSelect = new Array();
var user;
var computer;

// Going from Start Screen to the 12 Pokemon Selection Screen
function goToChoose12Screen() {
	loadGame();		// initialize global pokemon array

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("chooseScreen").style.display = "block";
}

// Going from 12 Pokemon Selection Screen to the Battle Arena Screen
function goToBattleScreen() {
	if (playerSelect.length < 3) {
		document.getElementById("confirmTeamButton").style.backgroundColor = "red";
		document.getElementById("confirmTeamButton").innerHTML = "<b>Select atleast 3 Pokemon.</b>";
		document.getElementById("confirmTeamButton").onclick = "";

		setTimeout(() => {
			document.getElementById("confirmTeamButton").style.backgroundColor = "lightgrey";
			document.getElementById("confirmTeamButton").innerHTML = "CONFIRM THIS TEAM!";
			document.getElementById("confirmTeamButton").onclick = "goToBattleScreen()";
		}, 3000);

	} else {
		startGame();
	}
}

// Going from End Screen back to Start Screen to loop the game loop
function goToStartScreen() {
    document.getElementById("endScreen").style.display = "none";
    document.getElementById("startScreen").style.display = "flex"; // preserving the centering style
}

// Placeholder for when a mini sprite selection is clicked
function pickPokemon(choice) {
    console.log("Picked Pokemon slot number: " + choice);

    if (playerSelect.length == 6) {
		document.getElementById("confirmTeamButton").style.backgroundColor = "red";
		document.getElementById("confirmTeamButton").innerHTML = "<b>Can only select 6 Pokemon.</b>";
		document.getElementById("confirmTeamButton").onclick = "";

		setTimeout(() => {
			document.getElementById("confirmTeamButton").style.backgroundColor = "lightgrey";
			document.getElementById("confirmTeamButton").innerHTML = "CONFIRM THIS TEAM!";
			document.getElementById("confirmTeamButton").onclick = "goToBattleScreen()";
		}, 3000);

	} else if (playerSelect.includes(choice - 1)) {
		playerSelect = playerSelect.filter((curr) => curr == choice - 1);
		document.getElementById(`choose${choice}Button`).style.backgroundColor = "lightgrey";

	} else {
		document.getElementById(`choose${choice}Button`).style.backgroundColor = "lightgreen";
		playerSelect.push(choice - 1);
	}
}

// automatically trigger player & opponent sprites animations (hit & faint)
window.addEventListener('load', function () {
	
	// drawPlayerSprite("treecko");
	// changePokeName("treecko", 1, 0);
	
	// drawOppSprite("swampert");
	// changePokeName("swampert", 0, 1);
	
	// setTimeout(function () {
	// 	playerTakesHit(20, "treecko");
	// 	setTimeout(function () {
	// 		playerTakesHit(20, "treecko");
	// 		setTimeout(function () {
	// 			faintPlayerSprite("treecko");

	// 			setTimeout(function () {
	// 				oppTakesHit(50, "swampert");
	// 				setTimeout(function () {
	// 					oppTakesHit(50, "swampert");
	// 					setTimeout(function () {
	// 						faintOppSprite("swampert");
	// 					}, 3000); 
	// 				}, 3000);
	// 			}, 3000);
			
	// 		}, 3000); 
	// 	}, 3000);
	// }, 2000);
});

document.addEventListener('click', function () {
	playSound('sounds/battle.mp3');
});

// php loads random pokemon from database
// and javascript will create objects for each pokemon
function loadGame() {
	fetch("database.php")
        .then((response) => response.json())
        .then((data) => {
            // loop 12 times to get variable named keys
			for (let i = 1; i <= 12; i++) {
				let buttonLabel = document.getElementById(`choose${i}Name`);
				let spriteImage = document.getElementById(`mini${i}Sprite`);

				let currMoves = new Array();

				let currMove1Name = data["move1Name"+i];
				let currMove1Amount = data["move1Amount"+i];
				let currMove1Type = data["move1Type"+i];
				let currMove1Style = data["move1Style"+i];
				let currMove1Status = data["move1Status"+i];

				currMoves.push(new Move(currMove1Name, currMove1Amount, currMove1Type, currMove1Style, currMove1Status));

				let currMove2Name = data["move2Name"+i];
				let currMove2Amount = data["move2Amount"+i];
				let currMove2Type = data["move2Type"+i];
				let currMove2Style = data["move2Style"+i];
				let currMove2Status = data["move2Status"+i];

				currMoves.push(new Move(currMove2Name, currMove2Amount, currMove2Type, currMove2Style, currMove2Status));

				let currMove3Name = data["move3Name"+i];
				let currMove3Amount = data["move3Amount"+i];
				let currMove3Type = data["move3Type"+i];
				let currMove3Style = data["move3Style"+i];
				let currMove3Status = data["move3Status"+i];

				currMoves.push(new Move(currMove3Name, currMove3Amount, currMove3Type, currMove3Style, currMove3Status));

				let currMove4Name = data["move4Name"+i];
				let currMove4Amount = data["move4Amount"+i];
				let currMove4Type = data["move4Type"+i];
				let currMove4Style = data["move4Style"+i];
				let currMove4Status = data["move4Status"+i];

				currMoves.push(new Move(currMove4Name, currMove4Amount, currMove4Type, currMove4Style, currMove4Status));

				let currName = data["name"+i];
				let currType1 = data["type1"+i];
				let currType2 = data["type2"+i];
				let currHP = data["hp"+i];
				let currAttack = data["attack"+i];
				let currDefense = data["defense"+i];
				let currSPAttack = data["sp_attack"+i];
				let currSPDefense = data["sp_defense"+i];
				let currSpeed = data["speed"+i];
				let currStatus = data["status"+i];

				pokemon.push(new Pokemon (
					currName, currType1, currType2, currHP,
					currAttack, currDefense, currSPAttack,
					currSPDefense, currSpeed, currStatus,
					currMoves
				));

				buttonLabel.innerText = currName;
				spriteImage.src = "https://img.pokemondb.net/sprites/emerald/normal/" + currName.toLowerCase() + ".png";
			}
        })
        .catch(console.error)
}

function startGame () {
	var computerSelect = new Array();

	// get random pokemon not selected by player
	// matching player size, in the case that the player
	// selected 6 pokemon this is inefficient but whatever
	for (let i = 0; i < playerSelect.length; i++) {
		let randNum = Math.floor(Math.random() * 12);

		while (playerSelect.includes(randNum) || computerSelect.includes(randNum)) {
			randNum = Math.floor(Math.random() * 12);
		}

		computerSelect.push(randNum);
	}

	var userTeam = new Array();
	var computerTeam = new Array();

	for (let i = 0; i < 6; i++) {
		userTeam.push(pokemon[playerSelect[i]]);
		computerTeam.push(pokemon[computerSelect[i]]);
	}

	user = new Player(userTeam, 0);
	computer = new Player(computerTeam, 0);
	
	for (let i = 0; i < playerSelect.length; i++) {
		var partyButtons = document.getElementById("partyButtons");
		var pokemonSelect = document.createElement("button");

		pokemonSelect.className = "party";
		pokemonSelect.id = `pokemon${i + 1}Button`;
		pokemonSelect.innerText = `[POKEMON ${i + 1}]`;

		pokemonSelect.addEventListener("click", function () {
			swapToPokemon(i);
		});

		partyButtons.append(pokemonSelect);
	}

	document.getElementById("chooseScreen").style.display = "none";
    document.getElementById("battleScreen").style.display = "block";

	battleLoop();
}

// sends updated pokemon information back to database
function battleEnd() {
	fetch("database.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({  })
    });
}

// The function in which the actual battle logic happens
// Presently doesn't do anything except create both player objects
function battleLoop() {
	// start the battle
	var playerMon = user.team[user.currIndex];
	var opponentMon = computer.team[0];

	loadPokemon(user.team[user.currIndex], true);
	loadPokemon(computer.team[computer.currIndex], false);
	// Build a while loop that checks each player's team for a pokemon with at least 1 health
	// Render the battle menu from the "what will ___ do?" screen
	// If a move is selected, call useMove(selection)
	// useMove calculates damage for both player and opponent for simplicity's sake, then updates global teams

	// If a switch is selected, update player.currIndex() to match the selected pokemon, and then calculate opponent's move
	// Opponent will never switch

	// After health is updated, update sprites
	// If a pokemon faints, mark it as fainted and display animation
	// Check to see if that player has any pokemon left
	// If they do force a switch
	// Opponent's switch is random

	// End of loop
}

// make these global variables so
// battleFunctions.js can access it
window.user = user;
window.computer = computer;