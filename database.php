<?php 
    $connString = "mysql:host=localhost;dbname=proj3";
    $user = "root";
    $pass = "";

    $pdo = new PDO($connString, $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // reading data from database
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        // fetch all pokemon ids from db, shuffle, and return the first 12
        $stmt = $pdo->query("SELECT poke_id FROM pokemon");
        $pokemonIDs = $stmt->fetchAll(PDO::FETCH_COLUMN);
        shuffle($pokemonIDs);
        $pokemonIDs = array_slice($pokemonIDs, 0, 12);

        $pokemon = array();

        for ($i = 1; $i <= count($pokemonIDs); $i++) {
            $myName = "name".$i;
            $myType1 = "type1".$i;
            $myType2 = "type2".$i;
            $myHP = "hp".$i;
            $myAttack = "attack".$i;
            $myDefense = "defense".$i;
            $mySPAttack = "sp_attack".$i;
            $mySPDefense = "sp_defense".$i;
            $mySpeed = "speed".$i;
            $myStatus = "status".$i;

            $myMove1Name = "move1Name".$i;
            $myMove1Amount = "move1Amount".$i;
            $myMove1Type = "move1Type".$i;
            $myMove1Style = "move1Style".$i;
            $myMove1Status = "move1Status".$i;

            $myMove2Name = "move2Name".$i;
            $myMove2Amount = "move2Amount".$i;
            $myMove2Type = "move2Type".$i;
            $myMove2Style = "move2Style".$i;
            $myMove2Status = "move2Status".$i;

            $myMove3Name = "move3Name".$i;
            $myMove3Amount = "move3Amount".$i;
            $myMove3Type = "move3Type".$i;
            $myMove3Style = "move3Style".$i;
            $myMove3Status = "move3Status".$i;

            $myMove4Name = "move4Name".$i;
            $myMove4Amount = "move4Amount".$i;
            $myMove4Type = "move4Type".$i;
            $myMove4Style = "move4Style".$i;
            $myMove4Status = "move4Status".$i;

            $sql = "SELECT * FROM pokemon WHERE poke_id = ?";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([$pokemonIDs[$i - 1]]);
            $result = $stmt->fetch();

            if ($result) {
                $pokemon[$myName] = $result["name"];
                $pokemon[$myType1] = $result["type1"];
                $pokemon[$myType2] = $result["type2"];
                $pokemon[$myHP] = $result["hp"];
                $pokemon[$myAttack] = $result["attack"];
                $pokemon[$myDefense] = $result["defense"];
                $pokemon[$mySPAttack] = $result["sp_attack"];
                $pokemon[$mySPDefense] = $result["sp_defense"];
                $pokemon[$mySpeed] = $result["speed"];
                $pokemon[$myStatus] = $result["status"];
            }

            if (!$result) continue;

            $sql = "SELECT * FROM attacks WHERE attack_id = ?";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([$result["move1_id"]]);
            $result2 = $stmt->fetch();

            if ($result2) {
                $pokemon[$myMove1Name] = $result2["name"];
                $pokemon[$myMove1Amount] = $result2["amount"];
                $pokemon[$myMove1Type] = $result2["type"];
                $pokemon[$myMove1Style] = $result2["style"];
                $pokemon[$myMove1Status] = $result2["status"];
            }

            $sql = "SELECT * FROM attacks WHERE attack_id = ?";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([$result["move2_id"]]);
            $result2 = $stmt->fetch();

            if ($result2) {
                $pokemon[$myMove2Name] = $result2["name"];
                $pokemon[$myMove2Amount] = $result2["amount"];
                $pokemon[$myMove2Type] = $result2["type"];
                $pokemon[$myMove2Style] = $result2["style"];
                $pokemon[$myMove2Status] = $result2["status"];
            }

            $sql = "SELECT * FROM attacks WHERE attack_id = ?";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([$result["move3_id"]]);
            $result2 = $stmt->fetch();

            if ($result2) {
                $pokemon[$myMove3Name] = $result2["name"];
                $pokemon[$myMove3Amount] = $result2["amount"];
                $pokemon[$myMove3Type] = $result2["type"];
                $pokemon[$myMove3Style] = $result2["style"];
                $pokemon[$myMove3Status] = $result2["status"];
            }

            $sql = "SELECT * FROM attacks WHERE attack_id = ?";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([$result["move4_id"]]);
            $result2 = $stmt->fetch();

            if ($result2) {
                $pokemon[$myMove4Name] = $result2["name"];
                $pokemon[$myMove4Amount] = $result2["amount"];
                $pokemon[$myMove4Type] = $result2["type"];
                $pokemon[$myMove4Style] = $result2["style"];
                $pokemon[$myMove4Status] = $result2["status"];
            }

        }

        echo json_encode($pokemon);

        exit;
    }
    
    // sending data back to database
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        
        exit;
    }
?>