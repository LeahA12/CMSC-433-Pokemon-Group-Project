-- this file will contain all the commands to set up the database *DATABASE SHOULD BE NAMED proj3*

CREATE DATABASE IF NOT EXISTS proj3;
USE proj3;

CREATE TABLE IF NOT EXISTS attacks (
    attack_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL, -- Name
    amount INT DEFAULT NULL, -- Base damage
    type VARCHAR(20) DEFAULT NULL, -- Grass/Water/Etc
    style VARCHAR(20) NOT NULL,  -- Special/Physical
    status VARCHAR(20) DEFAULT NULL -- Poison opponent, paralyze opponent, etc.
);

CREATE TABLE IF NOT EXISTS pokemon (
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

CREATE TABLE IF NOT EXISTS player (
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

-- ========== ATTACKS INSERT STATEMENTS ==========
INSERT INTO attacks (name, amount, type, style, status) VALUES
('Tackle', 40, 'Normal', 'Physical', NULL),
('Scratch', 40, 'Normal', 'Physical', NULL),
('Ember', 40, 'Fire', 'Special', NULL),
('Growl', 0, 'Normal', 'Special', 'Lower Attack'),
('Pound', 40, 'Normal', 'Physical', NULL),
('Water Gun', 40, 'Water', 'Special', NULL),
('Vine Whip', 45, 'Grass', 'Physical', NULL),
('Thunderbolt', 90, 'Electric', 'Special', NULL),
('Psychic', 90, 'Psychic', 'Special', NULL),
('Ice Beam', 90, 'Ice', 'Special', NULL),
('Flamethrower', 90, 'Fire', 'Special', NULL),
('Hydro Pump', 110, 'Water', 'Special', NULL),
('Solar Beam', 120, 'Grass', 'Special', NULL),
('Earthquake', 100, 'Ground', 'Physical', NULL),
('Stone Edge', 100, 'Rock', 'Physical', NULL),
('Dragon Pulse', 85, 'Dragon', 'Special', NULL),
('Hyper Beam', 150, 'Normal', 'Special', NULL),
('Close Combat', 120, 'Fighting', 'Physical', NULL),
('Shadow Ball', 80, 'Ghost', 'Special', NULL),
('Focus Blast', 120, 'Fighting', 'Special', NULL),
('Surf', 90, 'Water', 'Special', NULL),
('Blizzard', 110, 'Ice', 'Special', NULL),
('Thunderwave', 0, 'Electric', 'Special', 'Paralyze'),
('Thunder', 110, 'Electric', 'Special', NULL),
('Fire Punch', 75, 'Fire', 'Physical', NULL),
('Ice Punch', 75, 'Ice', 'Physical', NULL),
('Thunder Punch', 75, 'Electric', 'Physical', NULL),
('Earthquake', 100, 'Ground', 'Physical', NULL),
('Sludge Bomb', 90, 'Poison', 'Special', NULL),
('Poison Powder', 0, 'Poison', 'Special', 'Poison'),
('Sleep Powder', 0, 'Grass', 'Special', 'Sleep'),
('Leech Seed', 0, 'Grass', 'Special', 'Drain HP'),
('Mega Drain', 40, 'Grass', 'Special', 'Drain HP'),
('Giga Drain', 75, 'Grass', 'Special', 'Drain HP'),
('Absorb', 20, 'Grass', 'Special', 'Drain HP'),
('Flash Cannon', 80, 'Steel', 'Special', NULL),
('Iron Head', 80, 'Steel', 'Physical', NULL),
('Metal Claw', 50, 'Steel', 'Physical', NULL),
('Waterfall', 80, 'Water', 'Physical', NULL),
('Power Whip', 120, 'Grass', 'Physical', NULL),
('Leaf Storm', 130, 'Grass', 'Special', NULL),
('Fire Lash', 90, 'Fire', 'Physical', NULL),
('Crunch', 80, 'Dark', 'Physical', NULL),
('Dark Pulse', 80, 'Dark', 'Special', NULL),
('Sucker Punch', 70, 'Dark', 'Physical', NULL),
('Bite', 60, 'Dark', 'Physical', NULL),
('Outrage', 120, 'Dragon', 'Physical', NULL),
('Draco Meteor', 130, 'Dragon', 'Special', NULL),
('Dragon Dance', 0, 'Dragon', 'Physical', 'Boost Speed'),
('Sworddance', 0, 'Normal', 'Physical', 'Boost Attack'),
('Calm Mind', 0, 'Psychic', 'Physical', 'Boost Sp.Atk'),
('Nasty Plot', 0, 'Dark', 'Physical', 'Boost Sp.Atk'),
('Moonlight', 0, 'Fairy', 'Physical', 'Heal'),
('Roost', 0, 'Flying', 'Physical', 'Heal'),
('Recover', 0, 'Normal', 'Physical', 'Heal'),
('Refresh', 0, 'Normal', 'Physical', 'Remove Status'),
('Protect', 0, 'Normal', 'Physical', 'Protect'),
('Substitute', 0, 'Normal', 'Physical', 'Create Substitute'),
('Bulk Up', 0, 'Fighting', 'Physical', 'Boost Defense'),
('Curse', 0, 'Ghost', 'Physical', 'Lower Speed'),
('Hone Claws', 0, 'Dark', 'Physical', 'Boost Attack'),
('Snarl', 55, 'Dark', 'Special', 'Lower Sp.Atk'),
('Noble Roar', 0, 'Normal', 'Physical', 'Lower Attack'),
('Scary Face', 0, 'Normal', 'Physical', 'Lower Speed'),
('Feather Dance', 0, 'Flying', 'Physical', 'Lower Attack'),
('Willowisp', 0, 'Fire', 'Special', 'Burn'),
('Toxic Spikes', 0, 'Poison', 'Physical', 'Entry Hazard'),
('Reflect', 0, 'Psychic', 'Physical', 'Barrier'),
('Light Screen', 0, 'Psychic', 'Physical', 'Barrier'),
('Trick Room', 0, 'Psychic', 'Physical', 'Reverse Speed'),
('Stealth Rock', 0, 'Rock', 'Physical', 'Entry Hazard'),
('Spikes', 0, 'Ground', 'Physical', 'Entry Hazard'),
('Leech Life', 80, 'Bug', 'Physical', 'Drain HP'),
('X-Scissor', 95, 'Bug', 'Physical', NULL),
('Bug Buzz', 90, 'Bug', 'Special', NULL),
('U-turn', 70, 'Bug', 'Physical', 'Switch Out'),
('Pin Missile', 25, 'Bug', 'Physical', NULL),
('Signal Beam', 75, 'Bug', 'Special', NULL),
('Aerial Ace', 60, 'Flying', 'Physical', NULL),
('Air Slash', 75, 'Flying', 'Special', NULL),
('Peck', 35, 'Flying', 'Physical', NULL),
('Brave Bird', 120, 'Flying', 'Physical', NULL),
('Sky Attack', 140, 'Flying', 'Physical', NULL),
('Hurricane', 110, 'Flying', 'Special', NULL),
('Air Current', 0, 'Flying', 'Physical', 'Boost Speed'),
('Rock Throw', 50, 'Rock', 'Physical', NULL),
('Rock Slide', 75, 'Rock', 'Physical', NULL),
('Power Gem', 80, 'Rock', 'Special', NULL),
('Stone Edge', 100, 'Rock', 'Physical', NULL),
('Rock Polish', 0, 'Rock', 'Physical', 'Boost Speed'),
('Defense Curl', 0, 'Normal', 'Physical', 'Boost Defense'),
('Minimize', 0, 'Normal', 'Physical', 'Evade'),
('Stockpile', 0, 'Normal', 'Physical', 'Boost Defense'),
('Swallow', 0, 'Normal', 'Physical', 'Heal'),
('Spit Up', 100, 'Normal', 'Physical', NULL),
('Mud Shot', 55, 'Ground', 'Special', 'Lower Speed'),
('Mud Bomb', 65, 'Ground', 'Special', NULL),
('Mud Slap', 20, 'Ground', 'Physical', 'Lower Accuracy'),
('Magnitude', 60, 'Ground', 'Physical', NULL),
('Dig', 80, 'Ground', 'Physical', NULL),
('Drill Run', 95, 'Ground', 'Physical', NULL),
('High Horsepower', 95, 'Ground', 'Physical', NULL),
('Accelerock', 40, 'Rock', 'Physical', NULL),
('Wide Guard', 0, 'Rock', 'Physical', 'Protect Team'),
('Aqua Jet', 40, 'Water', 'Physical', NULL),
('Quick Attack', 40, 'Normal', 'Physical', NULL),
('Priority', 0, 'Normal', 'Physical', 'Always First'),
('Mach Punch', 40, 'Fighting', 'Physical', NULL),
('Bullet Punch', 40, 'Steel', 'Physical', NULL),
('Priority Boost', 0, 'Normal', 'Physical', 'Priority'),
('Double Team', 0, 'Normal', 'Physical', 'Boost Evasion'),
('Agility', 0, 'Psychic', 'Physical', 'Boost Speed'),
('Amnesia', 0, 'Psychic', 'Physical', 'Boost Sp.Def'),
('Tailwind', 0, 'Flying', 'Physical', 'Boost Speed'),
('Cotton Guard', 0, 'Grass', 'Physical', 'Boost Defense'),
('Coil', 0, 'Poison', 'Physical', 'Boost All'),
('Setup Move', 0, 'Normal', 'Physical', 'Boost Stats'),
('Swagger', 0, 'Normal', 'Physical', 'Confuse & Boost'),
('Sling Slap', 100, 'Normal', 'Physical', NULL),
('Play Rough', 90, 'Fairy', 'Physical', NULL),
('Dazzling Gleam', 80, 'Fairy', 'Special', NULL),
('Moonblast', 95, 'Fairy', 'Special', NULL),
('Misty Terrain', 0, 'Fairy', 'Physical', 'Terrain'),
('Psychic Terrain', 0, 'Psychic', 'Physical', 'Terrain'),
('Electric Terrain', 0, 'Electric', 'Physical', 'Terrain'),
('Grassy Terrain', 0, 'Grass', 'Physical', 'Terrain'),
('Hail', 0, 'Ice', 'Physical', 'Weather'),
('Rain Dance', 0, 'Water', 'Physical', 'Weather'),
('Sunny Day', 0, 'Fire', 'Physical', 'Weather'),
('Sandstorm', 0, 'Rock', 'Physical', 'Weather'),
('Priomordial Sea', 0, 'Water', 'Physical', 'Weather'),
('Desolate Land', 0, 'Fire', 'Physical', 'Weather'),
('Delta Stream', 0, 'Flying', 'Physical', 'Weather');

-- ========== POKEMON INSERT STATEMENTS ==========
INSERT INTO pokemon (name, type1, type2, hp, attack, defense, sp_attack, sp_defense, speed, generation, legendary, move1_id, move2_id, move3_id, move4_id) VALUES
('Bulbasaur', 'Grass', 'Poison', 45, 49, 49, 65, 65, 45, 1, 0, 7, 4, 31, 2),
('Charmander', 'Fire', NULL, 39, 52, 43, 60, 50, 65, 1, 0, 3, 1, 25, 11),
('Squirtle', 'Water', NULL, 44, 48, 65, 50, 64, 43, 1, 0, 6, 1, 44, 21),
('Pikachu', 'Electric', NULL, 35, 55, 40, 50, 50, 90, 1, 0, 24, 23, 9, 1),
('Charizard', 'Fire', 'Flying', 78, 84, 78, 109, 85, 100, 1, 0, 11, 47, 45, 48),
('Blastoise', 'Water', NULL, 79, 83, 100, 83, 83, 80, 1, 0, 21, 44, 20, 1),
('Venusaur', 'Grass', 'Poison', 80, 82, 83, 100, 100, 80, 1, 0, 12, 33, 30, 31),
('Dragonite', 'Dragon', 'Flying', 91, 134, 95, 100, 100, 80, 1, 0, 50, 47, 49, 52),
('Alakazam', 'Psychic', NULL, 55, 50, 65, 135, 95, 120, 1, 0, 9, 58, 72, 59),
('Machamp', 'Fighting', NULL, 90, 130, 80, 65, 85, 55, 1, 0, 18, 17, 56, 55),
('Golem', 'Rock', 'Ground', 80, 120, 130, 55, 65, 45, 1, 0, 16, 14, 15, 98),
('Arcanine', 'Fire', NULL, 90, 110, 80, 100, 80, 95, 1, 0, 11, 1, 25, 92),
('Lapras', 'Water', 'Ice', 130, 85, 80, 85, 95, 60, 1, 0, 21, 22, 44, 20),
('Gyarados', 'Water', 'Flying', 95, 125, 79, 60, 100, 81, 1, 0, 44, 20, 47, 81),
('Arcanine', 'Fire', NULL, 90, 110, 80, 100, 80, 95, 1, 0, 11, 1, 25, 92),
('Nidoking', 'Poison', 'Ground', 81, 102, 77, 85, 75, 85, 1, 0, 29, 14, 28, 1),
('Nidoqueen', 'Poison', 'Ground', 90, 92, 87, 75, 85, 76, 1, 0, 29, 14, 28, 1),
('Dugtrio', 'Ground', NULL, 35, 80, 50, 50, 70, 120, 1, 0, 102, 103, 14, 1),
('Persian', 'Normal', NULL, 65, 70, 60, 65, 60, 115, 1, 0, 1, 2, 130, 131),
('Psyduck', 'Water', NULL, 50, 52, 48, 66, 56, 55, 1, 0, 6, 1, 9, 61),
('Golduck', 'Water', NULL, 80, 82, 78, 95, 80, 85, 1, 0, 21, 44, 9, 61),
('Mankey', 'Fighting', NULL, 40, 80, 35, 35, 35, 70, 1, 0, 1, 2, 17, 18),
('Primeape', 'Fighting', NULL, 65, 105, 60, 60, 60, 95, 1, 0, 1, 2, 18, 19),
('Growlithe', 'Fire', NULL, 55, 70, 57, 60, 50, 60, 1, 0, 3, 1, 25, 92),
('Hypno', 'Psychic', NULL, 85, 73, 70, 73, 115, 67, 1, 0, 9, 58, 61, 62),
('Krabby', 'Water', NULL, 30, 105, 90, 25, 25, 50, 1, 0, 6, 1, 20, 21),
('Kingler', 'Water', NULL, 55, 130, 115, 50, 50, 75, 1, 0, 44, 20, 21, 1),
('Voltorb', 'Electric', NULL, 40, 30, 50, 55, 55, 100, 1, 0, 23, 9, 61, 62),
('Electrode', 'Electric', NULL, 60, 50, 70, 80, 80, 140, 1, 0, 24, 9, 61, 62),
('Exeggcute', 'Grass', 'Psychic', 60, 40, 80, 60, 45, 40, 1, 0, 7, 4, 31, 33),
('Exeggutor', 'Grass', 'Psychic', 95, 95, 85, 125, 65, 55, 1, 0, 12, 31, 33, 34),
('Cubone', 'Ground', NULL, 50, 75, 85, 40, 40, 35, 1, 0, 1, 103, 14, 1),
('Marowak', 'Ground', NULL, 75, 100, 110, 50, 80, 45, 1, 0, 103, 14, 1, 104),
('Hitmonlee', 'Fighting', NULL, 50, 120, 53, 35, 110, 87, 1, 0, 17, 18, 19, 20),
('Hitmonchan', 'Fighting', NULL, 50, 105, 79, 35, 110, 76, 1, 0, 25, 26, 27, 17),
('Lickitung', 'Normal', NULL, 90, 55, 75, 60, 75, 30, 1, 0, 1, 64, 65, 66),
('Rhydon', 'Ground', 'Rock', 105, 130, 120, 45, 45, 40, 1, 0, 103, 14, 15, 16),
('Chansey', 'Normal', NULL, 250, 5, 5, 35, 105, 30, 1, 0, 1, 64, 57, 58),
('Kangaskhan', 'Normal', NULL, 105, 95, 80, 40, 80, 90, 1, 0, 1, 17, 2, 3),
('Horsea', 'Water', NULL, 30, 40, 70, 70, 25, 60, 1, 0, 6, 1, 20, 21),
('Seadra', 'Water', NULL, 55, 65, 95, 95, 45, 85, 1, 0, 21, 44, 20, 1),
('Goldeen', 'Water', NULL, 45, 67, 60, 35, 50, 63, 1, 0, 6, 1, 20, 21),
('Seaking', 'Water', NULL, 80, 92, 65, 65, 80, 68, 1, 0, 21, 44, 20, 1),
('Staryu', 'Water', NULL, 30, 45, 55, 70, 55, 85, 1, 0, 6, 1, 20, 21),
('Starmie', 'Water', 'Psychic', 60, 75, 85, 100, 85, 115, 1, 0, 21, 44, 9, 61),
('Jynx', 'Ice', 'Psychic', 35, 20, 35, 110, 95, 95, 1, 0, 22, 9, 23, 61),
('Electabuzz', 'Electric', NULL, 65, 83, 57, 95, 85, 105, 1, 0, 24, 9, 23, 61),
('Magby', 'Fire', NULL, 65, 112, 57, 98, 66, 72, 1, 0, 3, 1, 25, 11),
('Pinsir', 'Bug', NULL, 65, 125, 100, 55, 70, 85, 1, 0, 80, 81, 82, 83),
('Tauros', 'Normal', NULL, 75, 100, 95, 40, 70, 110, 1, 0, 1, 2, 92, 93),
('Magikarp', 'Water', NULL, 20, 10, 55, 15, 20, 80, 1, 0, 6, 1, 20, 21),
('Gyarados', 'Water', 'Flying', 95, 125, 79, 60, 100, 81, 1, 0, 44, 20, 47, 81),
('Lapras', 'Water', 'Ice', 130, 85, 80, 85, 95, 60, 1, 0, 21, 22, 44, 20),
('Ditto', 'Normal', NULL, 48, 48, 48, 48, 48, 48, 1, 0, 1, 2, 3, 4),
('Eevee', 'Normal', NULL, 55, 55, 50, 45, 65, 55, 1, 0, 1, 2, 130, 131),
('Vaporeon', 'Water', NULL, 130, 65, 60, 110, 95, 65, 1, 0, 21, 44, 20, 1),
('Jolteon', 'Electric', NULL, 65, 65, 60, 110, 95, 130, 1, 0, 24, 9, 23, 61),
('Flareon', 'Fire', NULL, 65, 130, 60, 95, 110, 65, 1, 0, 11, 1, 25, 92),
('Porygon', 'Normal', NULL, 65, 60, 70, 85, 75, 40, 1, 0, 1, 2, 61, 62),
('Omanyte', 'Rock', 'Water', 35, 40, 100, 90, 55, 35, 1, 0, 16, 6, 20, 21),
('Omastar', 'Rock', 'Water', 70, 60, 125, 115, 70, 55, 1, 0, 16, 21, 44, 15),
('Kabuto', 'Rock', 'Water', 30, 80, 90, 55, 45, 55, 1, 0, 16, 6, 20, 21),
('Kabutops', 'Rock', 'Water', 60, 115, 105, 65, 75, 80, 1, 0, 16, 44, 20, 1),
('Aerodactyl', 'Rock', 'Flying', 80, 105, 65, 60, 75, 130, 1, 0, 16, 47, 48, 49),
('Snorlax', 'Normal', NULL, 150, 80, 50, 40, 65, 30, 1, 0, 1, 57, 58, 59),
('Dratini', 'Dragon', NULL, 41, 64, 45, 72, 45, 50, 1, 0, 50, 1, 2, 3),
('Dragonair', 'Dragon', NULL, 61, 84, 65, 92, 65, 70, 1, 0, 51, 1, 2, 3),
('Dragonite', 'Dragon', 'Flying', 91, 134, 95, 100, 100, 80, 1, 0, 51, 47, 48, 49),
('Chikorita', 'Grass', NULL, 45, 49, 65, 49, 65, 45, 2, 0, 7, 4, 31, 2),
('Bayleef', 'Grass', NULL, 60, 62, 80, 63, 80, 60, 2, 0, 7, 31, 33, 34),
('Meganium', 'Grass', NULL, 80, 82, 100, 83, 100, 80, 2, 0, 12, 33, 34, 35),
('Cyndaquil', 'Fire', NULL, 39, 52, 43, 60, 50, 65, 2, 0, 3, 1, 25, 11),
('Quilava', 'Fire', NULL, 58, 64, 58, 80, 65, 80, 2, 0, 11, 1, 25, 92),
('Typhlosion', 'Fire', NULL, 78, 84, 78, 109, 85, 100, 2, 0, 11, 47, 45, 48),
('Totodile', 'Water', NULL, 50, 65, 64, 48, 43, 43, 2, 0, 6, 1, 20, 21),
('Croconaw', 'Water', NULL, 65, 80, 80, 59, 63, 58, 2, 0, 21, 44, 20, 1),
('Feraligatr', 'Water', NULL, 85, 105, 100, 79, 83, 78, 2, 0, 44, 20, 81, 82),
('Pichu', 'Electric', NULL, 20, 40, 15, 35, 35, 60, 2, 0, 24, 1, 61, 62),
('Wooper', 'Water', 'Ground', 55, 48, 48, 46, 41, 25, 2, 0, 6, 103, 14, 1),
('Espeon', 'Psychic', NULL, 65, 65, 60, 130, 95, 110, 2, 0, 9, 58, 72, 59),
('Umbreon', 'Dark', NULL, 95, 65, 110, 60, 130, 65, 2, 0, 10, 47, 48, 49),
('Murkrow', 'Dark', 'Flying', 52, 85, 52, 62, 66, 91, 2, 0, 10, 47, 48, 49),
('Slowking', 'Water', 'Psychic', 95, 75, 80, 100, 110, 30, 2, 0, 21, 9, 58, 61),
('Seel', 'Water', NULL, 65, 45, 70, 45, 70, 45, 2, 0, 6, 1, 20, 21),
('Dewgong', 'Water', 'Ice', 90, 70, 80, 70, 95, 70, 2, 0, 21, 22, 44, 20),
('Grimer', 'Poison', NULL, 80, 80, 50, 40, 50, 25, 2, 0, 29, 1, 2, 3),
('Muk', 'Poison', NULL, 105, 105, 75, 65, 100, 50, 2, 0, 29, 28, 27, 26),
('Shellder', 'Water', NULL, 35, 65, 100, 45, 25, 40, 2, 0, 6, 1, 20, 21),
('Cloyster', 'Water', NULL, 50, 95, 180, 85, 45, 70, 2, 0, 44, 20, 1, 81),
('Gastly', 'Ghost', 'Poison', 30, 35, 30, 100, 35, 80, 1, 0, 19, 29, 30, 31),
('Haunter', 'Ghost', 'Poison', 45, 50, 45, 115, 55, 95, 1, 0, 19, 29, 30, 31),
('Gengar', 'Ghost', 'Poison', 60, 65, 60, 130, 75, 110, 1, 0, 19, 29, 30, 31),
('Onix', 'Rock', 'Ground', 35, 45, 160, 30, 45, 70, 1, 0, 16, 103, 14, 1),
('Drowzee', 'Psychic', NULL, 60, 48, 45, 43, 90, 42, 1, 0, 9, 58, 61, 62),
('Koffing', 'Poison', NULL, 40, 65, 95, 60, 45, 35, 1, 0, 29, 28, 27, 26),
('Weezing', 'Poison', NULL, 65, 90, 120, 85, 70, 60, 1, 0, 29, 28, 27, 26),
('Rhyhorn', 'Ground', 'Rock', 80, 100, 95, 30, 30, 25, 1, 0, 103, 14, 15, 16),
('Chansey', 'Normal', NULL, 250, 5, 5, 35, 105, 30, 1, 0, 1, 57, 58, 59),
('Articuno', 'Ice', 'Flying', 90, 85, 100, 95, 125, 85, 1, 1, 22, 47, 48, 49),      -- legendaries start here
('Zapdos', 'Electric', 'Flying', 90, 90, 85, 125, 90, 100, 1, 1, 24, 47, 48, 49),
('Moltres', 'Fire', 'Flying', 90, 100, 90, 125, 85, 90, 1, 1, 11, 47, 48, 49),
('Mewtwo', 'Psychic', NULL, 106, 110, 90, 154, 90, 130, 1, 1, 9, 58, 72, 59),
('Mew', 'Psychic', NULL, 100, 100, 100, 100, 100, 100, 1, 1, 9, 58, 72, 59);