-- this file will contain all the commands to set up the database
CREATE TABLE attacks {
    name VARCHAR(30); -- Name
    amount INT; -- Base damage
    type VARCHAR(20); -- Grass/Water/Etc
    style VARCHAR(20);  -- Special/Physical
    status VARCHAR(20); -- Poison opponent, paralyze opponent, etc.
}

CREATE TABLE pokemon {
    index INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30);
    type1 VARCHAR(20);
    type2 VARCHAR(20);
    hp INT;
    attack INT;
    defense INT;
    spAttack INT;
    spDefense INT;
    speed INT;
    generation INT;
    legendary BOOLEAN;
}
