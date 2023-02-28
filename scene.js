function setupScene()
{
    
}

//make the clouds move by shifting the x position of the clouds
function animateClouds()
{
    for (let cloud of clouds) {
        cloud.pos_x = cloud.pos_x + 0.5; 
    }
}

/*function that loops through the clouds array and calls 
drawCloud function to draw all the clouds*/
function drawClouds()
{
    for (let cloud of clouds) {
        drawCloud(cloud);
    }
}

/*DrawCloud function that draws an individual cloud 
using rectangles*/
function drawCloud(t_cloud)
{
    fill('#EAF5FF');
    rect(t_cloud.pos_x,t_cloud.pos_y,t_cloud.width,t_cloud.height,t_cloud.curve);

}

/*function that loops through the trees array and calls 
drawTree function to draw all the trees*/
function drawTrees()
{
    for (let tree of trees) {
        drawTree(tree);
    }
}

/*Draw tree function that draws an individual tree
using ellipse and rectangle*/
function drawTree(t_tree)
{
    //Tree leaves
    fill('#04223F');
    ellipse(t_tree.pos_x+5,t_tree.pos_y - 5,t_tree.leaves, t_tree.leaves);

    //Tree Trunk
    fill('#010F1D');
    rect(t_tree.pos_x,t_tree.pos_y,t_tree.width,t_tree.height);

}

/*function that loops through the mountains array 
and calls the drawMountain function to draw all the mountains*/
function drawMountains()
{
    for (let mountain of mountains) {
        //if condition used to check and change 
        //color of the mountains depending on sizes
        if (mountain.width==430) {
            
            fill('#02315D');
            
        }
        else {
            fill('#04223F');
        }

        drawMountain(mountain);

        //Draw the missing grounds as drawGround function is above the mountains
        fill('#04223F');
        rect(mountain.pos_x-500, floorPos_y, 1000, height-floorPos_y);
        
    }
}

/*DrawMountain function that draws an individual mountain
using ellipses*/
function drawMountain(t_mountain)
{
    //Some parts of the mountain will be hidden as its below ground
    ellipse(t_mountain.pos_x,t_mountain.pos_y,t_mountain.width,t_mountain.height);
   
}

//draws the ground using floorPos_y and width
function drawGround(){
    
    noStroke();
    fill('#04223F');
    rect(0, floorPos_y, width, height-floorPos_y);
    
}

function createPlatform(x,y,length) {
    
    let platform = new Platform(x,y,length);
    return platform;
}

function drawPlatform() {
    
    for (let platform of platforms) {
        
        platform.draw();
    }
}

function createEnemy(x,y,range) {
    
    let enemy = new Enemy(x,y,range);
    return enemy;
}

function drawEnemies() {
    
    for (let enemy of enemies) {
        
        enemy.draw();
    }
}

