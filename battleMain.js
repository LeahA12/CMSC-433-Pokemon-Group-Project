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
		this.hp = hp;
		this.attack = attack;
		this.defense = defense;
		this.sp_attack = sp_attack;
		this.sp_defense = sp_defense;
		this.speed = speed;
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

// automatically trigger player & opponent sprites animations (hit & faint)
window.addEventListener('load', function () {
	drawPlayerSprite("treecko");
	drawOppSprite("swampert");
	setTimeout(function () {
		hitPlayerSprite("treecko");
		setTimeout(function () {
			faintPlayerSprite("treecko");
			setTimeout(function () {
				hitOppSprite("swampert");
				setTimeout(function () {
					faintOppSprite("swampert");
				}, 2000); 
			}, 3000);
		}, 2000); 
	}, 2000);
});

document.addEventListener('click', function () {
	playSound('sounds/battle.mp3');
});

// php loads random pokemon from database
// and javascript will create objects for each pokemon
function startGame() {
	fetch("database.php")
        .then((response) => response.json())
        .then((data) => {
            // loop 12 times to get variable named keys
			for (let i = 1; i <= 12; i++) {
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
			}

			// here we can call whatever function that displays those pokemon
			// and lets you pick some to make a team, which is then made into
			// another array that is passed into the player object
			
        })
        .catch(console.error)
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
function battleLoop(player, opponent) {
	// start the battle
	var playerMon = player.team[player.currIndex];
	var opponentMon = opponent.team[0];

	// Build a while loop that checks each player's team for a pokemon with at least 1 health

	// Once that loop breaks, the game ends

}


// ignore this its testing putting a variable in the html file -- will be deleted
// var testName1 = "TOXTRICITY";
// document.getElementById("optionText").textContent = `WHAT WILL ${testName1} DO?`;
var testPoke = new Pokemon("TOXTRICITY", "ELECTRIC", "POISON", 75, 98, 70, 114, 70, 75);
const testMoveArray = new Array();
testMoveArray.push(new Move("BOOMBURST", 140, "NORMAL", "SPECIAL"));
testMoveArray.push(new Move("POISON JAB", 80, "POISON", "PHYSICAL"));
testMoveArray.push(new Move("SHOCK WAVE", 60, "ELECTRIC", "SPECIAL"));
testMoveArray.push(new Move("VENOSHOCK", 65, "POISON", "SPECIAL", "POISON"));
document.getElementById("optionText").textContent = `WHAT WILL ${testPoke.name} DO?`;
document.getElementById("move1Button").textContent = testMoveArray[0].name;
document.getElementById("move2Button").textContent = testMoveArray[1].name;
document.getElementById("move3Button").textContent = testMoveArray[2].name;
document.getElementById("move4Button").textContent = testMoveArray[3].name;

// document.getElementById("optionText").textContent = `WHAT WILL ${pokemon[0].name} DO?`;