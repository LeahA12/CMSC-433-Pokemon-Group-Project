-- this file will contain all the commands to set up the database
CREATE TABLE attacks {
    id INT AUTO_INCREMENT PRIMARY KEY;
    name VARCHAR(30); -- Name
    amount INT; -- Base damage
    type VARCHAR(20); -- Grass/Water/Etc
    style VARCHAR(20);  -- Special/Physical
    status VARCHAR(20); -- Poison opponent, paralyze opponent, etc.
}

CREATE TABLE pokemon {
    id INT AUTO_INCREMENT PRIMARY KEY; -- Index number
    name VARCHAR(30); -- Pokemon name
    type1 VARCHAR(20); -- Pokemon primary type
    type2 VARCHAR(20); -- Pokemon secondary type (optional)
    hp INT; -- Hit points
    attack INT; -- Base attack
    defense INT; -- Base defense
    spAttack INT; -- Base special attack
    spDefense INT; -- Base special defense
    speed INT; -- Base speed
    generation INT; -- Pokemon generation
    legendary BOOLEAN; -- T/F is legendary
}
