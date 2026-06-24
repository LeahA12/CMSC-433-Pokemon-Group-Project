<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Pokemon Battle</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="style.css">
		<script async src="battle.js"></script>
    </head>
    <body style="justify-content: center; display: flex; padding: 50px">
		<div class="battleBox">
	        <div class="column playerStatus">
            	(Player pokemon status (look at poke showdown for what i mean))
	        </div>
	        <div class="column battleArena">
				<canvas id="BattleCanvas" width="630" height="416"></canvas>
	        </div>
	        <div class="column opponentStatus">
                (Opponent pokemon status)
	        </div>
        </div>
    </body>
</html>
