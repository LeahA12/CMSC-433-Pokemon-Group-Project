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
    sp_attack INT NOT NULL, -- Base special attack
    sp_defense INT NOT NULL, -- Base special defense
    speed INT NOT NULL, -- Base speed
    generation INT NOT NULL, -- Pokemon generation
    legendary BOOLEAN NOT NULL DEFAULT 0,-- T/F is legendary
    status VARCHAR(20) DEFAULT NULL,
    
    move1_id INT NOT NULL, -- Move1 ID
    move2_id INT NOT NULL, -- Move2 ID
    move3_id INT DEFAULT NULL, -- Move3 ID, can be NULL
    move4_id INT DEFAULT NULL, -- Move4 ID, can be NULL

    FOREIGN KEY (move1_id) REFERENCES attacks(attack_id), -- Move1 FK to attack table
    FOREIGN KEY (move2_id) REFERENCES attacks(attack_id), -- Move2 FK to attack table
    FOREIGN KEY (move3_id) REFERENCES attacks(attack_id), -- Move3 FK to attack table
    FOREIGN KEY (move4_id) REFERENCES attacks(attack_id) -- Move4 FK to attack table
);

CREATE TABLE player (
    player_id INT AUTO_INCREMENT PRIMARY KEY, -- Player ID
    type BOOLEAN DEFAULT 0, -- Human or robot, If robot, type == 1
    poke1_id INT NOT NULL, -- Pokemon1 ID
    poke2_id INT NOT NULL, -- Pokemon2 ID
    poke3_id INT NOT NULL, -- Pokemon3 ID
    poke4_id INT DEFAULT NULL, -- Pokemon4 ID, can be NULL
    poke5_id INT DEFAULT NULL, -- Pokemon5 ID, can be NULL
    poke6_id INT DEFAULT NULL, -- Pokemon6 ID, can be NULL
    
    FOREIGN KEY (poke1_id) REFERENCES pokemon(poke_id), -- Poke1 FK to poke table
    FOREIGN KEY (poke2_id) REFERENCES pokemon(poke_id), -- Poke2 FK to poke table
    FOREIGN KEY (poke3_id) REFERENCES pokemon(poke_id), -- Poke3 FK to poke table
    FOREIGN KEY (poke4_id) REFERENCES pokemon(poke_id), -- Poke4 FK to poke table
    FOREIGN KEY (poke5_id) REFERENCES pokemon(poke_id), -- Poke5 FK to poke table
    FOREIGN KEY (poke6_id) REFERENCES pokemon(poke_id) -- Poke6 FK to poke table
);
