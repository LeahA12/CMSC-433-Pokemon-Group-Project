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
    legendary BOOLEAN NOT NULL,-- T/F is legendary
    
    move1_id INT NOT NULL,
    move2_id INT NOT NULL,
    move3_id INT DEFAULT NULL,
    move4_id INT DEFAULT NULL,
    CONSTRAINT fk_move1_id FOREIGN KEY (move1_id) REFERENCES attacks(attack_id),
    CONSTRAINT fk_move2_id FOREIGN KEY (move2_id) REFERENCES attacks(attack_id),
    CONSTRAINT fk_move3_id FOREIGN KEY (move3_id) REFERENCES attacks(attack_id),
    CONSTRAINT fk_move4_id FOREIGN KEY (move4_id) REFERENCES attacks(attack_id)
);

CREATE TABLE player (
    player_id INT AUTO_INCREMENT PRIMARY KEY,
    poke1_id INT NOT NULL,
    poke2_id INT NOT NULL,
    poke3_id INT NOT NULL,
    poke4_id INT DEFAULT NULL,
    poke5_id INT DEFAULT NULL,
    poke6_id INT DEFAULT NULL,
    CONSTRAINT fk_poke1_id FOREIGN KEY (poke1_id) REFERENCES pokemon(poke_id),
    CONSTRAINT fk_poke2_id FOREIGN KEY (poke2_id) REFERENCES pokemon(poke_id),
    CONSTRAINT fk_poke3_id FOREIGN KEY (poke3_id) REFERENCES pokemon(poke_id),
    CONSTRAINT fk_poke4_id FOREIGN KEY (poke4_id) REFERENCES pokemon(poke_id),
    CONSTRAINT fk_poke5_id FOREIGN KEY (poke5_id) REFERENCES pokemon(poke_id),
    CONSTRAINT fk_poke6_id FOREIGN KEY (poke6_id) REFERENCES pokemon(poke_id)
);
