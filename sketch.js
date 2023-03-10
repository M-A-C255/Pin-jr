//Loads the mp3 music file from folder
function preload() {
    
    //initialise variables
    soundReady = false;
    soundLoadCounter = 0;

    soundFormats('mp3');

    jumpGhost = loadSound("assets/jump.mp3", soundLoaded());
    
    fallCanyon = loadSound("assets/canyon.mp3", soundLoaded());
    
    backgroundGhost = loadSound("assets/ghost.mp3", soundLoaded());
    
    lose = loadSound("assets/gameOver.mp3", soundLoaded());
    
    win = loadSound("assets/win.mp3", soundLoaded());
    
    collectStar = loadSound("assets/collectStar.mp3", soundLoaded());
    
    hitEnemy = loadSound("assets/hitEnemy.mp3", soundLoaded());
    
}

//To check if all the sound files have loaded or not
function soundLoaded() {
    
    soundLoadCounter++;
    
    //check if the counter is at 7
    if (soundLoadCounter == 7) {
        soundReady = true;
    }
}

function setup() {
    
    createCanvas(1024, 576);

    initVariables();//call the initVariables function in variables.js

    setupScene();//call the setupScene in scene.js
    setupCanyons();//call the setupCanyon in canyon.js
    setupCollectables();//call the setupCollectable in collectable.js
    
    //Stops the game over music when user restarts
    win.stop();
    lose.stop();
    
    //sets volume of the music
    backgroundMusic();

}

function draw() {

    //Only start game when all sound effects are loaded
    if(!soundReady) {
        return;
    }
    
    ///////////DRAWING CODE//////////
    
    noStroke();
    background('#72A6D8'); //fill the sky blue
    
    //calls drawscene function to draw and load the game
    drawScene();
    
    //Check if the game is over to draw the game over text
    if (checkIsGameOver()){
        drawGameOver();
        
        return;
    }
    
    //function call to draw character animations
    //Added after checking if game is over so that game
    //character disappears after game is over
    drawGameChar();
    
    ///////////INTERACTION CODE//////////

    //loop through canyons array to check if character has fallen
    checkIfCharIsOnCanyon();
    
    //Check if the game character hit the enemy or not
    checkIfGameCharInContactWithEnemy();
    
    //Check if the flag pole is reached or not
    checkFlagpole();
    
    //check to see if collectable is found or not
    //only draw the collectables that are not found yet
    checkIfCollectableIsFound();
    
    //Plays music depending on if player win or lose
    checkIfPlayerWon();
    
    //function call for game char interactions
    gameCharMovements();
    
    /*this changes the character's world x location to make
    sure the interactions with the canyons and collectable
    still work fine*/
    gameChar_world_x = gameChar_x - scrollPos;

}

//Function for keys being pressed down
function keyPressed() {

    //to restart the game if lost or won
    if (checkIsGameOver()) {
        
        this.setup();
        
    }
    
    //If game is not over yet
    else {
        
        //Stops and freezes the keys once the character falls down
        if (isPlummeting == true) {

            return;
        }

        else {

            //Left arrow key + "a" key to move left
            if (keyCode == 37 || keyCode == 65) {

                isLeft = true; 

            }

            //Right arrow key + "d" key to move right
            else if (keyCode == 39 || keyCode == 68) {

                isRight = true;

            }

            //space bar for jumping
            else if (keyCode == 32 || key == "W" || keyCode == 38)
            {
                //if statement to make sure no double jump occurs
                if (isFalling == false || onPlatform){

                    gameChar_y -= 140;

                    jumpMusic();

                }
            }
        }  
    }
}

//function for when keys are released
function keyReleased() {

    //stops moving left once left arrow key or "a" is released 
    if (keyCode == 37 || keyCode == 65) {

        isLeft = false;    
    }

    //stops moving right once right arrow key or "d" is released 
    else if (keyCode == 39 || keyCode == 68) {

        isRight = false;
    }
}

//Draws the game scene
function drawScene() {
    
    /*Ground is drawn before push() function so that
      it follows the character around*/
    drawGround(); 

    //Creates the scrolling effect that translates the scene
    push();
    translate(scrollPos,0);
    
    //draw the clouds
    drawClouds();
    animateClouds();

    //draw the mountains
    drawMountains();

    //draw the trees
    drawTrees();
    
    //drawCollectables
    drawCollectables();

    //draw the canyon
    drawCanyons();
    
    //Creates platforms
    drawPlatform();
    
    //Creates enemies
    drawEnemies();
    
    //flagpole functions
    renderFlagpole();
    
    //Draws the instructions for the game
    drawInstructions();
    
    pop();

    //function to draw life tokens
    drawLifeTokens();
    
    //function call to draw game score
    drawGameScore();
    
}

/*function that checks if the character is on the canyon. 
  Sets plummenting to true so that character falls down*/
function checkIfCharIsOnCanyon() {
    
    //Loops the canyon array
    for (let canyon of canyons){

        //Check if the game character is on the ground or in the air
        if (gameChar_y == (floorPos_y-26)) {

            //Checks if the game character is in the range of the canyon
            if (gameChar_world_x >= (canyon.pos_x+10) && 
                gameChar_world_x <= (canyon.pos_x+canyon.width-10)) { 

                isPlummeting = true;  
                
                //decrease lives
                lives--;
                fallIntoCanyonMusic();
                
                return;
            }
        } 
    }

}

/*function that checks if the collectable is found or not.
  Sets collectables's "isFound" property to true so that 
  the collecgtable is no longer drawn.*/
function checkIfCollectableIsFound() {
    
    //Loops the collectables array
    for (let collectable of collectables) {

        //To find collectables with the isFound property 'false'
        if (collectable.isFound == false) {
            
            //Check if the game character is close to the collectable
            if (dist(collectable.x_pos,
                 collectable.y_pos,
                 gameChar_world_x,gameChar_y) <= 30) {
                
                //Sets isFound property to true and adds game score
                collectable.isFound = true;
                game_score++;
                collectStarMusic();
            }
        }
        
    }
}

/*Function that checks if character is on platform or not
  Sets onPlatform to true so that character stays on platform
  Otherwise, character falls down due to gravity*/
function checkIfCharOnPlatform() {
    
    //Initialise the variables
    let isContact = false;
    onPlatform = false;

    //Loops through the platforms array
    for (let platform of platforms) {

        isContact = platform.checkContact(gameChar_world_x, gameChar_y);
        
        //Checks if game character is on platform
        if (isContact) {
            onPlatform = true;
            isfalling = false;
            break;
        }
    }
    
    //if not on platform then game character falls down
    if (isContact == false) {
        gameChar_y += 4;
        isFalling = true;
    }
    
}

/*Function that checks if character is attacked by enemy
  if hit, reduces character's lives
*/
function checkIfGameCharInContactWithEnemy() {
    
    //If game is over then leaves
    if(checkIsGameOver()) {
        
        return;
    }
    
    //Loops through the enemies array
    for (let enemy of enemies) {
        
        let isContact = enemy.checkContact(gameChar_world_x, gameChar_y);
        
        if (isContact) {
            
            hitByEnemy = true;
            lives--;
            
            hitEnemyMusic();
            
            return;
        }
    }
}

//Function to play music depending on if player has won or lost
function checkIfPlayerWon() {
    
    //for win condition
    if (flagpole.isReached && game_score == collectables.length) {
        
        backgroundGhost.stop();
        jumpGhost.stop();
        fallCanyon.stop();
        hitEnemy.stop();
        
        console.log("hi");
        winMusic();
        
    }
    
    //for lose condition
    else if (lives<1) {

        backgroundGhost.stop();
        jumpGhost.stop();
        fallCanyon.stop();
        hitEnemy.stop();
        
        console.log("hello");
        loseMusic();

    }
    
}

//Adds a background music on loop once user clicks 
//on a key and start the game
function backgroundMusic() {
   
    //sets volume of the music
    backgroundGhost.setVolume(0.1);

    //plays the music and loops
    backgroundGhost.play();
    backgroundGhost.loop();

    //Only starts background audio when user interacts with game
    userStartAudio();

}

//Music for jumping sounds
function jumpMusic() {
    
    //Plays the jump music
    jumpGhost.setVolume(0.1);
    jumpGhost.play();
}

//Music for falling into canyon
function fallIntoCanyonMusic() {
    
    fallCanyon.setVolume(0.2);
    fallCanyon.play();
}

//Sound effect for game over
function loseMusic() {

    lose.setVolume(0.2);
    lose.play();
}

//Music for winning
function winMusic() {
    
    win.setVolume(0.2);
    win.play();
}

//Sound effect for collecting stars
function collectStarMusic() {
    
    collectStar.setVolume(0.2);
    collectStar.play();
}

//Sound effect when hit by enemy
function hitEnemyMusic() {
    
    hitEnemy.setVolume(0.5);
    hitEnemy.play();
}

//Function to draw game score on top
function drawGameScore() {

    fill('#04223F');
    stroke(5);
    textSize(30);
    textFont('Courier New');

    text("Score: " + game_score + "/" + collectables.length, 30, 50);
}

//function to draw the game character animations
function drawGameChar() {
    
    noStroke();
    
    //Walking left on platform
    if (onPlatform && isLeft) {
        
        drawGameCharIsLeft();
    }
    
    //Walking right on platform
    else if (onPlatform && isRight) {
        
        drawGameCharIsRight();
    }
    
    //On platform
    else if (onPlatform) {
        
        drawGameCharStandingFront();
    }
    
    //Jumping left
    else if(isLeft && isFalling) {
        
        drawGameCharIsLeftAndIsFalling();
    }

    //Jumping right
    else if(isRight && isFalling)
    {
        drawGameCharIsRightAndIsFalling();
    }

    //moving left
    else if(isLeft)
    {
        drawGameCharIsLeft();
    }

    //moving right
    else if(isRight)
    {
        drawGameCharIsRight();
    }

    //is jumping
    else if(isFalling || isPlummeting)
    {
        drawGameCharIsFallingOrIsPlummeting();
    }

    //is just standing up
    else {
        drawGameCharStandingFront();
    }
}

//Movements and interactions of the game character
function gameCharMovements() {
    
    //character falling down the canyon
    if (isPlummeting == true) 
    {
        gameChar_y += 2;

        isLeft == false;
        isRight == false;
        isfalling == true;

        checkPlayerDie();
        
        return;
    }
    
    if (hitByEnemy == true) {
        
        if (lives>0) {
            
            startGame();
        }
        return;
    }

    //Scrolling effect which makes the game character appear in the middle
    if (isLeft == true) 
    {
        //to make an edge on the left side
        if(gameChar_world_x > -2600) {
            
            if (gameChar_x > width * 0.49) {
                
            gameChar_x -= 5;
            
            }

            else {

                scrollPos+=5;
            }
        }
        
        else {
            
            if (gameChar_y <= floorPos_y-30) {
                
                checkIfCharOnPlatform();
            }
            
            return;
        }
        
    }

    else if (isRight == true) 
    {
        if(gameChar_world_x < 3050) {
            
            if (gameChar_x < width*0.51) {

            gameChar_x += 5;
        }

            else {

                scrollPos-=5;
            }   
        }  
    }

    //Create a gravity effect
    if (gameChar_y <= floorPos_y-30) 
    {
    
        checkIfCharOnPlatform();
    }

    else if (gameChar_y >= floorPos_y-26 && isPlummeting == false) 
    {
        isFalling = false;
    }
    
}

/*draw the flagpole
if flagpole is not reached yet flag will be down
if flagpole is reached, flag will be raised
*/
function renderFlagpole() {
    
    //draw pole
    fill('#C3D8ED');
    rect(flagpole.x_pos, floorPos_y-200, 10, 200);
    
    fill('#FFE7A0');
    
    //draw flag
    if (flagpole.isReached && game_score == collectables.length) {
        
        rect(flagpole.x_pos+12,floorPos_y-200, 75, 45);
        
    }
    
    else {
        
        rect(flagpole.x_pos+12,floorPos_y-45, 75, 45);
        
    }
    
}

//Checks if the flagpole has been reached or not
function checkFlagpole() {
    
    //check if game character goes over the flag pole or not
    if (flagpole.isReached == false) {

        if (gameChar_world_x > flagpole.x_pos) {

            flagpole.isReached = true;
        }
        
    }
    
    else {
        
        if (gameChar_world_x < flagpole.x_pos) {
            
            flagpole.isReached = false;
        }
    }
}

//Shows the remaining life 
function drawLifeTokens() {
      
    //loops through the number of lives
    for (let i=0; i<lives; i++) {
        
        fill('#246099');

        //Body
        ellipse(60*i + 855, 40,38,38);

        //Outer eyes
        fill(255);
        ellipse(60*i + 845, 36,20,20);
        ellipse(60*i + 865.5, 36,20,20);

        //Inner Eyes
        fill(0);
        ellipse(60*i + 845, 36,12,12);
        ellipse(60*i + 865.5, 36,12,12);
    }
}

//respawns the game character if it dies
function checkPlayerDie() {
    
    if (gameChar_y > floorPos_y+220 || hitByEnemy) {
        
        if (lives>0) {
            
            startGame();
        }
    }
}

/*Check if the game is over or not by checking
whether game character is dead or flag is reached and all stars are collected
Returns true if game is over
Returns false if game is not over yet
*/
function checkIsGameOver() {
    
    let gameOver = false;
    
    //Checks if all lives are gone
    if (lives < 1 ) {
        
        gameOver = true;
        
    }
    
    //checks if flagpole is reached and score is max
    else if (flagpole.isReached && game_score == collectables.length) {
        
        gameOver = true; 
    }
    
    return gameOver;
}

/*Draws the game over text
Checks if game is won or lost by number of lives
If lives remaining and game is over then game won
If lives is 0 and game is over then game lost
*/
function drawGameOver() {
    
    fill(255);
    textSize(100);
    
    //For winning
    if (lives>0) {
        
        text("YAYYYYYYYYY!", 150,height/2-100);
        text("You Win!",270,height/2);
        
    }
    
    //For losing
    else {
        
        text("Boo Hoo!", 250,height/2-100);
        text("Try Again!",200,height/2);
        
    }
    
    textSize(20);
    text("Press Any Key to Restart!", 355, height/2 + 45);
}

//Draw some instructions on the ground
function drawInstructions() {
    
    textFont('Courier New');
    fill(255);
    textSize(15);
    
    text("Collect all the stars", 245, floorPos_y + 60);
    text("and reach the flag to win!", 230, floorPos_y +90);
    
    fill('#2D6CAF');
    text("<-- More Stars", 30, floorPos_y + 25);
    text("Flag -->", 560, floorPos_y + 25);
}



