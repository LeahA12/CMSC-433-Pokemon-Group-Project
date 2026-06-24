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
		<div class="parent">
			<img class="emptyBattle" src="emptyBattle.jpg" width="630" height="416"/>
			<div class="playerStatus">
				<p>Player pokemon status</p> 
			</div>
		  	<div class="opponentStatus">
				<p>Opponent pokemon status</p> 
			</div>
		  	<div class="optionSelect">
				Here is where the battle options will be
		  	</div>
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
