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

// ignore this its testing putting a variable in the html file -- will be deleted
var nameTest1 = "TOXTRICITY";
