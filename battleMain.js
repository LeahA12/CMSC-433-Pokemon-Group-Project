// player class containing array of pokemon (team)
class Player {
	constructor(team) {
		this.team = team;
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

// testing drawing player & opponent sprites
drawPlayerSprite("treecko");
drawOppSprite("swampert");

document.addEventListener('click', function () {
	playSound('sounds/battle.mp3');
});

// php loads random pokemon from database
// and javascript will create objects for each pokemon
function startGame() {
	fetch("database.php")
        .then((response) => response.json())
        .then((data) => {
            
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

/*
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
*/

document.getElementById("optionText").textContent = `WHAT WILL ${pokemon[0].name} DO?`;