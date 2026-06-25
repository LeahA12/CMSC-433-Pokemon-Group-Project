<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Pokemon Battle</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="style.css">
		<script async src="battle.js"></script>
    </head>
    <body style="justify-content: display: flex; padding: 50px">
		<!-- 
			Note that emptyBattle.jpg is 1261 x 832 -> width: 1261, height: 832
			emptyBattle.jpg seems a little big for a screen so i shrunk it by 
			finding width/2 and height/2 which is...
				halved width: 1261/2 = 630.5
				halved height: 832/2 = 416
		-->
	
		<!-- Leah's idea -->
		<div class="parent" id="battleScreen">
			<img class="emptyBattle" src="emptyBattle.jpg" width="630" height="416"/>
			<div class="playerStatus">
				<p>Player pokemon status</p> 
			</div>
		  	<div class="opponentStatus">
				<p>Opponent pokemon status</p> 
			</div>
		  	<div class="optionSelect">
				<div class="optionText" id="optionText">WHAT WILL [POKEMON] DO?</div>
				<div class="optionButtonsArea" id="optionButtonsArea"> 
					<button class="startOptions" id="fightButton" onclick="fightSelected()">FIGHT</button>
					<button class="startOptions" id="bagButton">BAG</button>
					<button class="startOptions" id="pokemonButton" onclick="swapSelected()">POKEMON</button>
					<button class="startOptions" id="runButton">RUN</button>
				</div>
				<div class="moveSelect" id="moveSelect" style="display: none;">
					<button class="moveOptions" id="move1Button" onclick="useMove(1)">[MOVE 1]</button>
					<button class="moveOptions" id="move2Button" onclick="useMove(2)">[MOVE 2]</button>
					<button class="moveOptions" id="move3Button" onclick="useMove(3)">[MOVE 3]</button>
					<button class="moveOptions" id="move4Button" onclick="useMove(4)">[MOVE 4]</button>
				</div>
				<div class="movePP" id="movePPId" style="display: none;">PP<br>X/Y</div>
			</div>
		</div>
		<div class="swapPokemonScreen" id="swapPokemonScreen" style="display: none;">
			<button class="currPoke" id="currPoke"></button>
			<button class="party" id="pokemon1Button" style="margin-top: 5%;">[POKEMON 1]</button>
			<button class="party" id="pokemon2Button">[POKEMON 2]</button>
			<button class="party" id="pokemon3Button">[POKEMON 3]</button>
			<button class="party" id="pokemon4Button">[POKEMON 4]</button>
			<button class="party" id="pokemon5Button" style="margin-bottom: 3%;">[POKEMON 5]</button>
			<div class="swapPokeText" id="swapPokeText">Choose a POKEMON</div>
			<button class="backToOptions" id="backToOptions" style="margin-top: 5%;">CANCEL</button>
		</div>
		<br> <br> <br> <br> <br> <br>
        <!-- Max's idea w/Leah's background canvas idea 
		<div class="battleBox">
	        <div class="column playerStatus_Max">
            	(Player pokemon status (look at poke showdown for what i mean))
	        </div>
	        <div class="column battleArena">
				<canvas id="BattleCanvas" width="630" height="416"></canvas>
	        </div>
	        <div class="column opponentStatus_Max">
                (Opponent pokemon status)
	        </div>
        </div>
		-->
		<br> <br> <br>
    </body>
</html>
