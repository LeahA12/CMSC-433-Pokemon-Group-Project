<?php 
    $connString = "mysql:host=localhost;dbname=proj3test";
    $user = "root";
    $pass = "";

    $pdo = new PDO($connString, $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // reading data from database
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        
        exit;
    }
    
    // sending data back to database
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        
        exit;
    }
?>