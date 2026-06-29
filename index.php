<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Pokemon Battle</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="style.css">
		<script src=" https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
		<script async src="battleFunctions.js"></script>
		<script async src="battleMain.js"></script>
    </head>

    <body style="justify-content: display: flex; padding: 50px">	
		<div class="battleScreen" id="battleScreen">
			<!-- The Empty Emerald Battle Arena Background
			Note that emptyBattle.jpg is 1261 x 832 -> width: 1261, height: 832
			emptyBattle.jpg seems a little big for a screen so we shrunk it by 
			halving the width & height...
				halved width: 1261/2 = 630.5
				halved height: 832/2 = 416
			-->
			<img class="emptyBattle" src="emptyBattle.jpg" width="630" height="416"/>
			
			<!-- The Transparent Canvas W/Player & Opponent Pokemon Sprites [layered on top of Battle Arena] -->
			<canvas id="pokeSpritesCanvas" width="630" height="416"></canvas>
			
			<!-- The Player's HP/Name box [layered on top of Battle Arena (lower-right)] -->
			<div class="playerStatus">
				<p>Player pokemon status</p> 
			</div>
		  	
			<!-- The Bot Opponent's HP/Name box [layered on top of Battle Arena (upper-left)] -->
			<div class="opponentStatus">
				<p>Opponent pokemon status</p> 
			</div>
			
			<!-- -->
		  	<div class="optionSelect">
				
				<!-- -->
				<div class="optionText" id="optionText">WHAT WILL [POKEMON] DO?</div>
				
				<!-- -->
				<div class="optionButtonsArea" id="optionButtonsArea"> 
					<button class="startOptions" id="fightButton" onclick="fightSelected()">FIGHT</button>
					<button class="startOptions" id="bagButton">BAG</button>
					<button class="startOptions" id="pokemonButton" onclick="swapSelected()">POKEMON</button>
					<button class="startOptions" id="runButton">RUN</button>
				</div>
				
				<!-- -->
				<div class="moveSelect" id="moveSelect" style="display: none;">
					<button class="moveOptions" id="move1Button" onclick="useMove(1)">[MOVE 1]</button>
					<button class="moveOptions" id="move2Button" onclick="useMove(2)">[MOVE 2]</button>
					<button class="moveOptions" id="move3Button" onclick="useMove(3)">[MOVE 3]</button>
					<button class="moveOptions" id="move4Button" onclick="useMove(4)">[MOVE 4]</button>
				</div>
				
				<!-- -->
				<div class="movePPContainer" id="movePPContainer">
					<!-- <div class="movePP" id="movePPId">PP<br>X/Y</div> -->
					<button class="moveOptions" id="backButton" onclick="backToOptions()" style="width: 100%; height: 100%;">BACK</button>
				</div>
				<div class="moveSelect" id="runText" style="display: none;">
					NO! THERE'S NO RUNNING FROM A TRAINER BATTLE!
				</div>
				<div class="movePPContainer" id="runBackContainer">
					<button class="moveOptions" id="runBackButton" onclick="backToOptions()" style="width: 100%; height: 100%;">BACK</button>
				</div>
			</div>
		</div>
		
		<!-- -->
		<div class="swapPokemonScreen" id="swapPokemonScreen" style="display: none;">
			<button class="currPoke" id="currPoke">[CURRENT POKEMON]</button>
			<button class="party" id="pokemon1Button" style="margin-top: 5%;">[POKEMON 1]</button>
			<button class="party" id="pokemon2Button">[POKEMON 2]</button>
			<button class="party" id="pokemon3Button">[POKEMON 3]</button>
			<button class="party" id="pokemon4Button">[POKEMON 4]</button>
			<button class="party" id="pokemon5Button" style="margin-bottom: 3%;">[POKEMON 5]</button>
			<div class="swapPokeText" id="swapPokeText">Choose a POKEMON</div>
			<button class="backToOptions" id="backToOptions" style="margin-top: 2.5%;" onclick="cancelSwap()">CANCEL</button>
		</div>
    </body>
</html>
