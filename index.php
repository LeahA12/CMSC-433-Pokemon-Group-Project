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
		<!-- START SCREEN -->
		<div class="startScreen" id="startScreen">
			<p class="introText">Welcome to Pokémon Battle!</p>
			<p class="authorText">This was created by Alexis Young, Habib Aina, Joseph Romanic, Leah Arfa, & Maxwell Sovich</p>
			<button id="startButton" onclick="goToChoose12Screen()">START GAME!</button>
		</div>

		<!-- CHOOSE 12 POKEMON SCREEN -->
		<div class="chooseScreen" id="chooseScreen" style="display: none;">
			<div class="chooseButtonsArea">
				<button class="choosePoke" id="choose1Button" onclick="pickPokemon(1)">
					<img class="miniSprite" id="mini1Sprite" src=""> <span id="choose1Name">[POKEMON 1]</span>
				</button>
				<button class="choosePoke" id="choose2Button" onclick="pickPokemon(2)">
					<img class="miniSprite" id="mini2Sprite" src=""> <span id="choose2Name">[POKEMON 2]</span>
				</button>
				<button class="choosePoke" id="choose3Button" onclick="pickPokemon(3)">
					<img class="miniSprite" id="mini3Sprite" src=""> <span id="choose3Name">[POKEMON 3]</span>
				</button>
				<button class="choosePoke" id="choose4Button" onclick="pickPokemon(4)">
					<img class="miniSprite" id="mini4Sprite" src=""> <span id="choose4Name">[POKEMON 4]</span>
				</button>
				<button class="choosePoke" id="choose5Button" onclick="pickPokemon(5)">
					<img class="miniSprite" id="mini5Sprite" src=""> <span id="choose5Name">[POKEMON 5]</span>
				</button>
				<button class="choosePoke" id="choose6Button" onclick="pickPokemon(6)">
					<img class="miniSprite" id="mini6Sprite" src=""> <span id="choose6Name">[POKEMON 6]</span>
				</button>
				<button class="choosePoke" id="choose7Button" onclick="pickPokemon(7)">
					<img class="miniSprite" id="mini7Sprite" src=""> <span id="choose7Name">[POKEMON 7]</span>
				</button>
				<button class="choosePoke" id="choose8Button" onclick="pickPokemon(8)">
					<img class="miniSprite" id="mini8Sprite" src=""> <span id="choose8Name">[POKEMON 8]</span>
				</button>
				<button class="choosePoke" id="choose9Button" onclick="pickPokemon(9)">
					<img class="miniSprite" id="mini9Sprite" src=""> <span id="choose9Name">[POKEMON 9]</span>
				</button>
				<button class="choosePoke" id="choose10Button" onclick="pickPokemon(10)">
					<img class="miniSprite" id="mini10Sprite" src=""> <span id="choose10Name">[POKEMON 10]</span>
				</button>
				<button class="choosePoke" id="choose11Button" onclick="pickPokemon(11)">
					<img class="miniSprite" id="mini11Sprite" src=""> <span id="choose11Name">[POKEMON 11]</span>
				</button>
				<button class="choosePoke" id="choose12Button" onclick="pickPokemon(12)">
					<img class="miniSprite" id="mini12Sprite" src=""> <span id="choose12Name">[POKEMON 12]</span>
				</button>
			</div>
			<button id="confirmTeamButton" onclick="goToBattleScreen()">CONFIRM THIS TEAM!</button>
		</div>

		<!-- BATTLE SCREEN -->		
		<div class="battleScreen" id="battleScreen" style="display: none;">
			<!-- The Empty Emerald Battle Arena Background
			Note that emptyBattle.jpg is 1261 x 832 -> width: 1261, height: 832
			emptyBattle.jpg seems a little big for a screen so we shrunk it by 
			halving the width & height...
				halved width: 1261/2 = 630.5
				halved height: 832/2 = 416
			-->
			<img class="emptyBattle" src="emptyBattle.jpg" width="630" height="416"/>
			
			<!-- The Transparent Canvas W/Player's Pokemon Sprites [layered on top of Battle Arena] -->
			<canvas id="pPokeSpriteCanvas" width="630" height="416"></canvas>
			
			<!-- The Transparent Canvas W/Opponent's Pokemon Sprites [layered on top of Battle Arena] -->
			<canvas id="oPokeSpriteCanvas" width="630" height="416"></canvas>
			
			<!-- The Player's HP/Name box [layered on top of Battle Arena (lower-right)] -->
			<div class="playerStatus">
				<p class="pPokeName" id="pPokeName"></p>
				<div class="pHP_Outer">
					<div class="pHP_InnerFill" id="pHP_InnerFill"></div>
				</div>
				<p class="pHP_Nums" id="pHP_Nums"></p>
			</div>
		  	
			<!-- The Bot Opponent's HP/Name box [layered on top of Battle Arena (upper-left)] -->
			<div class="opponentStatus">
				<p class="oPokeName" id="oPokeName"></p>
				<div class="oHP_Outer">
					<div class="oHP_InnerFill" id="oHP_InnerFill"></div>
				</div>
				<p class="oHP_Nums" id="oHP_Nums"></p>
			</div>
			
			<!-- -->
		  	<div class="optionSelect">
				
				<!-- -->
				<div class="optionText" id="optionText">WHAT WILL [POKEMON] DO?</div>
				
				<!-- -->
				<div class="optionButtonsArea" id="optionButtonsArea"> 
					<button class="startOptions" id="fightButton" onclick="fightSelected()">FIGHT</button>
					<button class="startOptions" id="bagButton" onclick="openBag()">BAG</button>
					<button class="startOptions" id="pokemonButton" onclick="swapSelected()">POKEMON</button>
					<button class="startOptions" id="runButton" onclick="attemptEscape()">RUN</button>
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

				<!-- -->
				<div class="moveSelect" id="runText" style="display: none; text-align: center; align-content: center;">
					NO! THERE'S NO RUNNING FROM A TRAINER BATTLE!
				</div>
				<div class="movePPContainer" id="runBackContainer" style="display: none;">
					<button class="moveOptions" id="runBackButton" onclick="backToOptions()" style="width: 100%; height: 100%;">BACK</button>
				</div>

				<!-- -->
				<div class="moveSelect" id="bagText" style="display: none; text-align: center; align-content: center;">
					YOU CANNOT USE ITEMS IN A TRAINER BATTLE!
				</div>
				<div class="movePPContainer" id="bagBackContainer" style="display: none;">
					<button class="moveOptions" id="bagBackButton" onclick="backToOptions()" style="width: 100%; height: 100%;">BACK</button>
				</div>
			</div>
		</div>
		
		<!-- END SCREEN -->
		<div class="endScreen" id="endScreen" style="display: none;">
			<p class="endText" id="endText">YOU WIN!</p>
			<button id="playAgainButton" onclick="goToStartScreen()">Play Again?</button>
		</div>
		
		<!-- MID BATTLE CHOOSE POKEMON SCREEN -->
		<div class="swapPokemonScreen" id="swapPokemonScreen" style="display: none;">
			<button class="currPoke" id="currPoke">[CURRENT POKEMON]</button>
			<div class="partyButtonsArea">
				<button class="party" id="pokemon1Button">[POKEMON 1]</button>
				<button class="party" id="pokemon2Button">[POKEMON 2]</button>
				<button class="party" id="pokemon3Button">[POKEMON 3]</button>
				<button class="party" id="pokemon4Button">[POKEMON 4]</button>
				<button class="party" id="pokemon5Button">[POKEMON 5]</button>
				<button class="party" id="pokemon6Button">[POKEMON 6]</button>
			</div>
			<div class="swapBottomBar">
				<div class="swapPokeText" id="swapPokeText">Choose a POKEMON</div>
				<button class="backToOptions" id="backToOptions" onclick="cancelSwap()">CANCEL</button>
			</div>
		</div>
    </body>
</html>
