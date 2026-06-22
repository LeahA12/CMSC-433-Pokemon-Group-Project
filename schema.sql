-- this file will contain all the commands to set up the database
CREATE TABLE attacks (
    attack_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL, -- Name
    amount INT DEFAULT NULL, -- Base damage
    type VARCHAR(20) DEFAULT NULL, -- Grass/Water/Etc
    style VARCHAR(20) NOT NULL,  -- Special/Physical
    status VARCHAR(20) DEFAULT NULL -- Poison opponent, paralyze opponent, etc.
);

CREATE TABLE pokemon (
    poke_id INT AUTO_INCREMENT PRIMARY KEY, -- Index number
    name VARCHAR(30) NOT NULL, -- Pokemon name
    type1 VARCHAR(20) NOT NULL, -- Pokemon primary type
    type2 VARCHAR(20) DEFAULT NULL, -- Pokemon secondary type (optional)
    hp INT NOT NULL, -- Hit points
    attack INT NOT NULL, -- Base attack
    defense INT NOT NULL, -- Base defense
    spAttack INT NOT NULL, -- Base special attack
    spDefense INT NOT NULL, -- Base special defense
    speed INT NOT NULL, -- Base speed
    generation INT NOT NULL, -- Pokemon generation
    legendary BOOLEAN NOT NULL,-- T/F is legendary
    move1 VARCHAR(30) NOT NULL,
    move2 VARCHAR(30) NOT NULL,
    move3 VARCHAR(30) DEFAULT NULL,
    move4 VARCHAR(30) DEFAULT NULL
);

CREATE TABLE player (
    player_id INT AUTO_INCREMENT PRIMARY KEY,
    poke1_id INT,
    poke2_id INT,
    poke3_id INT,
    poke4_id INT,
    poke5_id, INT,
    poke6_id, INT,
    poke1 FOREIGN KEY (poke1_id) REFERENCES pokemon(poke_id),
    poke2 FOREIGN KEY (poke2_id) REFERENCES pokemon(poke_id),
    poke3 FOREIGN KEY (poke3_id) REFERENCES pokemon(poke_id),
    poke4 FOREIGN KEY (poke4_id) REFERENCES pokemon(poke_id),
    poke5 FOREIGN KEY (poke5_id) REFERENCES pokemon(poke_id),
    poke6 FOREIGN KEY (poke6_id) REFERENCES pokemon(poke_id)
);
