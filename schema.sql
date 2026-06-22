-- this file will contain all the commands to set up the database
CREATE TABLE attacks {
    name VARCHAR(30); -- Name
    damage INT; -- Base damage
    type VARCHAR(20); -- Grass/Water/Etc
    style VARCHAR(20);  -- Special/Physical
    status VARCHAR(20); -- Poison opponent, paralyze opponent, etc.
}
