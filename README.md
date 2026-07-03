
### CMSC 433 Project 3 - Group members:
Alexis Young, Habib Aina, Joseph Romanic, Leah Arfa, Maxwell Sovich

## What is this project?:
This webapp is a pokemon game built with mariadb, php, html, js, and css and is a pokemon battle. Select your starter pokemon
and face against 6 other NPC pokemon and defeat them all to win.

### How to run:
- go to http://localhost/phpmyadmin/, select the 'import' tab, choose file ```schema.sql```, scroll down, and press 'import' button OR
- ```mysql -u root -p proj3 < schema.sql```
- put the project folder in your web server directory (e.g. XAMPP htdocs) and open ```index.php``` in a browser

### Database:
- database name: ```proj3```
- username: ```root```
- password: (empty)
- change these in ```database.php``` if your setup is different

### Requirements to run this game:
- PHP with PDO/MySQL support
- MariaDB or MySQL
- a local web server (we used XAMPP)
- a browser (Chrome, Firefox, Edge)

### Contributions:
- Leah: sprite animations, battle arena layout, HP bars, screen CSS, PokemonDB sprites
- Max: SQL database setup, battle base UI, button/PHP communication
- Alexis: database querying, Pokemon/Move/Player objects, team selection logic
- Joseph: battle logic
- Habib: game audio, battle bug fixes, battle messaging, game reset, low-HP feedback

### Where we got our sprites from:
https://pokemondb.net/sprites/blaziken
https://pokemondb.net/sprites/mudkip
https://pokemondb.net/sprites/sceptile
https://pokemondb.net/sprites/swampert
https://pokemondb.net/sprites/torchic
https://pokemondb.net/sprites/treecko
