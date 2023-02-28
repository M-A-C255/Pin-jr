function setupCollectables() 
{
    
    //collectables array
    collectables = [{x_pos: -1797.5, y_pos:floorPos_y-190, isFound:false}, 
                    {x_pos: -2300, y_pos:410, isFound:false}, 
                    {x_pos: -1080, y_pos:410, isFound:false}, 
                    {x_pos: -880, y_pos:410, isFound:false},
                    {x_pos: -420, y_pos:410, isFound:false},
                    {x_pos: 200, y_pos:410, isFound:false},
                    {x_pos: 715, y_pos:floorPos_y-90, isFound:false},
                    {x_pos: 1283, y_pos:410, isFound:false},
                    {x_pos: 1575, y_pos:floorPos_y-210, isFound:false},
                    {x_pos: 2135, y_pos:floorPos_y-100, isFound:false}];

}

/*function that loops through the collectables array and calls 
drawCCollectables function to draw all the collectables*/
function drawCollectables()
{

    for (let collectable of collectables) {

        if (collectable.isFound == false) {

            drawCollectable(collectable);

        }
    }
}

/*DrawCollectable function that draws an individual 
collectable using rectangles*/
function drawCollectable(t_Collectable) {

    fill('#FFE7A0');
    star(t_Collectable.x_pos,t_Collectable.y_pos,
         10,14,5);

}

//Function to draw a star
//reference - https://p5js.org/examples/form-star.html
function star(pos_x, pos_y, radius1, radius2, numPoints) 
{

    let angle = TWO_PI / numPoints;
    let halfAngle = angle / 2.0;
    
    beginShape();

    for (let i = 0; i < TWO_PI; i += angle) {

        let sx = pos_x + cos(i) * radius2;
        let sy = pos_y + sin(i) * radius2;
        
        vertex(sx, sy);
        
        sx = pos_x + cos(i + halfAngle) * radius1;
        sy = pos_y + sin(i + halfAngle) * radius1;
        vertex(sx, sy);

    }

    endShape(CLOSE);

}
