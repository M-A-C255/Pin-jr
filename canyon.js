//initialise canyons array
function setupCanyons() 
{
    //canyons array
    canyons = [{pos_x:-2000, pos_y: floorPos_y, width: 400}, 
               {pos_x:-1400, pos_y: floorPos_y, width:100},
               {pos_x:-1030, pos_y: floorPos_y, width:100}, 
               {pos_x:-830, pos_y: floorPos_y, width:100},
               {pos_x:-190, pos_y: floorPos_y, width:200},
               {pos_x:650, pos_y: floorPos_y, width:400},
               {pos_x:1070, pos_y: floorPos_y, width:200},
               {pos_x:1290, pos_y: floorPos_y, width:600},
               {pos_x:2050, pos_y: floorPos_y, width:170}];
}

/*function that loops through the canyons array and calls 
drawCanyon function to draw all the canyons*/
function drawCanyons()
{
    for (let canyon of canyons) {
        drawCanyon(canyon);
    }
}

/*DrawCanyon function that draws an individual canyon
using rectangles*/
function drawCanyon(t_canyon) {

    noStroke();
    fill('#020F1D');

    rect(t_canyon.pos_x, t_canyon.pos_y, t_canyon.width,432);

}

