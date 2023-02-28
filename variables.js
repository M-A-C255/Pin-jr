var gameChar_x;
var gameChar_y;
var floorPos_y;

var gameCharWidth;

//music
var backgroundGhost;
var jumpGhost;
var fallCanyon;
var gameOver;
var soundLoadCounter;
var soundReady;
var lose;
var win;
var collectStar;
var hitEnemy;

//Game char movements
var isLeft;
var isRight;
var isFalling;
var isPlummeting; 

//all the scene objects
var mountains;
var trees;
var clouds;
var canyons;
var collectables;
var flagpole;

var isFound;

var scrollPos; //for side scrolling
var gameChar_world_x; //for fixing canyon and collectable error

var game_score;

var lives;

//platform
var platforms = [];
var onPlatform;

//enemies
var enemies;
var hitByEnemy;


//Initialise variables with values
function initVariables() {
    
    //game score
    game_score = 0;
    
    //Char lives
    lives = 3;
    startGame();
    
    trees = [ 
             {pos_x:-2800, pos_y: floorPos_y - 44, leaves: 40, width: 10, height: 45}, 
             {pos_x:-2350, pos_y: floorPos_y - 44, leaves: 40, width: 10, height: 45}, 
             {pos_x:-2050, pos_y: floorPos_y - 44, leaves: 40, width: 10, height: 45}, 
             {pos_x:-2000, pos_y: floorPos_y - 44, leaves: 40, width: 10, height: 45}, 
             {pos_x:-1550, pos_y: floorPos_y - 44, leaves: 40, width: 10, height: 45},
             {pos_x:-1500, pos_y: floorPos_y - 44, leaves: 40, width: 10, height: 45},
             {pos_x:-1150, pos_y: floorPos_y - 44, leaves: 40, width: 10, height: 45},
             {pos_x:-690, pos_y: floorPos_y - 44, leaves: 40, width: 10, height: 45},
             {pos_x:-450, pos_y: floorPos_y - 44, leaves: 40, width: 10, height: 45},
             {pos_x:-400, pos_y: floorPos_y - 44, leaves: 40, width: 10, height: 45},
             {pos_x:95, pos_y: floorPos_y - 44, leaves: 40, width: 10, height: 45},
             {pos_x:50, pos_y: floorPos_y - 44, leaves: 40, width: 10, height: 45},
             {pos_x:800, pos_y: floorPos_y - 44, leaves: 40, width: 10, height: 45},
             {pos_x:1160, pos_y: floorPos_y - 44, leaves: 40, width: 10, height: 45},
             {pos_x:1210, pos_y: floorPos_y - 44, leaves: 40, width: 10, height: 45},
             {pos_x:1530, pos_y: floorPos_y - 44, leaves: 40, width: 10, height: 45},
             {pos_x:1900, pos_y: floorPos_y - 44, leaves: 40, width: 10, height: 45},
             {pos_x:1950, pos_y: floorPos_y - 44, leaves: 40, width: 10, height: 45},
             {pos_x:2425, pos_y: floorPos_y - 44, leaves: 40, width: 10, height: 45},
             {pos_x:2770, pos_y: floorPos_y - 44, leaves: 40, width: 10, height: 45},
             {pos_x:2820, pos_y: floorPos_y - 44, leaves: 40, width: 10, height: 45}];

    //mountain arrays
    mountains = [
        {pos_x:-3150, pos_y:floorPos_y+30, width:430, height:470},
        {pos_x:-2930, pos_y:floorPos_y+45, width:250, height:290},
        {pos_x:-2500, pos_y:floorPos_y+45, width:250, height:290},
        {pos_x:-2000, pos_y:floorPos_y+30, width:430, height:470},
        {pos_x:-1000, pos_y:floorPos_y+30, width:430, height:470}, {pos_x:-830, pos_y:floorPos_y+45, width:250, height:290}, {pos_x:-270, pos_y:floorPos_y+45, width:250, height:290},
        {pos_x:300, pos_y:floorPos_y+30, width:430, height:470}, 
        {pos_x:450, pos_y:floorPos_y+45, width:250, height:290}, {pos_x:940,pos_y:floorPos_y+45,width:250,height:290},
        {pos_x:1500, pos_y:floorPos_y+30, width:430, height:470}, 
        {pos_x:2320, pos_y:floorPos_y+30, width:430, height:470},
        {pos_x:2100, pos_y:floorPos_y+45, width:250, height:290},  
        {pos_x:2950, pos_y:floorPos_y+45, width:250, height:290}];
    
    flagpole = {isReached: false, x_pos: 2500};
    
    //platform array
    platforms.push(createPlatform(-1700, floorPos_y-100, 140));
    platforms.push(createPlatform(-1885, floorPos_y-170, 175));
    platforms.push(createPlatform(-2030, floorPos_y-100, 130));
    platforms.push(createPlatform(-165, floorPos_y-70, 150));
    platforms.push(createPlatform(640, floorPos_y-70, 150));
    platforms.push(createPlatform(800, floorPos_y-150, 200));
    platforms.push(createPlatform(1060, floorPos_y-90, 120));
    platforms.push(createPlatform(1280, floorPos_y-90, 120));
    platforms.push(createPlatform(1430, floorPos_y-150, 70));
    platforms.push(createPlatform(1540, floorPos_y-190, 70));
    platforms.push(createPlatform(1650, floorPos_y-140, 70));
    platforms.push(createPlatform(1760, floorPos_y-80, 105));
    platforms.push(createPlatform(2060, floorPos_y-80, 150));
}

function startGame() {
    
    //starting initial positions
    floorPos_y = height * 3/4;
    gameChar_x = width/2;
    gameChar_y = floorPos_y-26;
    
    //scrolling effect
    scrollPos = 0;
    gameChar_world_x = gameChar_x;
    
    //game character interactions
    isLeft = false;
    isRight = false;
    isfalling = false;
    isPlummeting = false;
    isJumping = false;
    
    onPlatform = false;
    hitByEnemy = false;
    
    enemies = [];
    enemies.push(createEnemy(-2250,floorPos_y-10,200));
    enemies.push(createEnemy(-1580,floorPos_y-10,120));
    enemies.push(createEnemy(-630,floorPos_y-10,120));
    enemies.push(createEnemy(850,floorPos_y-160,100));
    enemies.push(createEnemy(2230,floorPos_y-10,150));

    clouds=[   
        {pos_x:random(1300,1500),pos_y:random(20,100),width:random(180,210),height:random(30,40), curve: 20}, {pos_x:random(1300,1500),pos_y:random(120,200),width:random(70,90),height:random(15,25), curve: 20}, {pos_x:random(1300,1500),pos_y:random(220,250),width:random(160,180),height:random(30,40), curve: 20}, {pos_x:random(10,width),pos_y:random(20,100),width:random(180,210),height:random(30,40), curve: 20}, {pos_x:random(10,width),pos_y:random(120,200),width:random(70,90),height:random(15,25), curve: 20}, {pos_x:random(10,width),pos_y:random(220,250),width:random(160,180),height:random(30,40), curve: 20}, {pos_x:random(-1500,-1300),pos_y:random(20,100),width:random(180,210),height:random(30,40), curve: 20}, {pos_x:random(-1500,-1300),pos_y:random(120,200),width:random(70,90),height:random(15,25), curve: 20}, {pos_x:random(-1500,-1300),pos_y:random(220,250),width:random(160,180),height:random(30,40), curve: 20}, {pos_x:random(-2500,-2300),pos_y:random(20,100),width:random(180,210),height:random(30,40), curve: 20}, {pos_x:random(-2500,-2300),pos_y:random(120,200),width:random(70,90),height:random(15,25), curve: 20}, {pos_x:random(-2500,-2300),pos_y:random(220,250),width:random(160,180),height:random(30,40), curve: 20}];
    
}


