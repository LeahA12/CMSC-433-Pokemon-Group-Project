-- this file will contain all the commands to set up the database
CREATE TABLE attacks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL, -- Name
    amount INT DEFAULT NULL, -- Base damage
    type VARCHAR(20) DEFAULT NULL, -- Grass/Water/Etc
    style VARCHAR(20) NOT NULL,  -- Special/Physical
    status VARCHAR(20) DEFAULT NULL -- Poison opponent, paralyze opponent, etc.
);

CREATE TABLE pokemon (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Index number
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
    legendary BOOLEAN NOT NULL-- T/F is legendary
);
