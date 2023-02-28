//Jmping while moving left
function drawGameCharIsLeftAndIsFalling()
{
    fill('#246099');

    //Body
    ellipse(gameChar_x,gameChar_y,38,38);

    //Outer eyes
    fill(255);
    ellipse(gameChar_x-14,gameChar_y-4,20,20);
    ellipse(gameChar_x+6,gameChar_y-4,20,20);

    //Inner Eyes
    fill(0);
    ellipse(gameChar_x-17.5,gameChar_y-4.5,12,12);
    ellipse(gameChar_x+2.5,gameChar_y-4.5,12,12);

    //mouth
    ellipse(gameChar_x-3,gameChar_y+8,5,5);

}

//Jumping while moving right
function drawGameCharIsRightAndIsFalling()
{   
    fill('#246099');

    //Body
    ellipse(gameChar_x,gameChar_y,38,38);

    //Outer eyes
    fill(255);
    ellipse(gameChar_x+14,gameChar_y-4,20,20);
    ellipse(gameChar_x-6,gameChar_y-4,20,20);

    //Inner Eyes
    fill(0);
    ellipse(gameChar_x+17.5,gameChar_y-4.5,12,12);
    ellipse(gameChar_x-2.5,gameChar_y-4.5,12,12);

    //mouth
    ellipse(gameChar_x+3,gameChar_y+8,5,5);

}

//moving left
function drawGameCharIsLeft()
{
    fill('#246099');

    //Body
    ellipse(gameChar_x,gameChar_y,38,38);

    //Legs
    rect(gameChar_x+5,gameChar_y,7,27);

    rect(gameChar_x-8,gameChar_y,7,27);

    triangle(gameChar_x-7,gameChar_y+27,
             gameChar_x-7,gameChar_y+20,
             gameChar_x-14,gameChar_y+27);

    triangle(gameChar_x+10,gameChar_y+27,
             gameChar_x+10,gameChar_y+16,
             gameChar_x,gameChar_y+27);

    //Outer eyes
    fill(255);
    ellipse(gameChar_x-14,gameChar_y-4,20,20);
    ellipse(gameChar_x+6,gameChar_y-4,20,20);

    //Inner Eyes
    fill(0);
    ellipse(gameChar_x-17.5,gameChar_y-4.5,12,12);
    ellipse(gameChar_x+2.5,gameChar_y-4.5,12,12);

}

//moving right
function drawGameCharIsRight()
{
    fill('#246099');

    //Body
    ellipse(gameChar_x,gameChar_y,38,38);

    //Legs
    //right
    rect(gameChar_x+2,gameChar_y,7,27);
    //left
    rect(gameChar_x-11,gameChar_y,7,27);

    triangle(gameChar_x-7,gameChar_y+27,
             gameChar_x-7,gameChar_y+19,
             gameChar_x+2,gameChar_y+27);

    triangle(gameChar_x+9,gameChar_y+27,
             gameChar_x+9,gameChar_y+21,
             gameChar_x+15,gameChar_y+27);

    //Outer eyes
    fill(255);
    ellipse(gameChar_x+14,gameChar_y-4,20,20);
    ellipse(gameChar_x-6,gameChar_y-4,20,20);

    //Inner Eyes
    fill(0);
    ellipse(gameChar_x+17.5,gameChar_y-4.5,12,12);
    ellipse(gameChar_x-2.5,gameChar_y-4.5,12,12);

}

//falling down or jumping
function drawGameCharIsFallingOrIsPlummeting()
{
    fill('#246099');

    //Body
    ellipse(gameChar_x,gameChar_y,38,38);

    //Outer eyes
    fill(255);
    ellipse(gameChar_x-10,gameChar_y-4,20,20);
    ellipse(gameChar_x+10.5,gameChar_y-4,20,20);

    //Inner Eyes
    fill(0);
    ellipse(gameChar_x-10,gameChar_y-4,12,12);
    ellipse(gameChar_x+10.5,gameChar_y-4,12,12);

    //mouth
    ellipse(gameChar_x,gameChar_y+8,5,5);

}

//Just standing up without any keys pressed
function drawGameCharStandingFront()
{
    fill('#246099');

    //Body
    ellipse(gameChar_x,gameChar_y,38,38);

    //Legs
    rect(gameChar_x-13,gameChar_y+1,7,25);

    rect(gameChar_x+5,gameChar_y+1,7,25);

    //left feet
    triangle(gameChar_x-6,gameChar_y+26,
             gameChar_x-6,gameChar_y+8,
             gameChar_x-18,gameChar_y+26);

    //right feet
    triangle(gameChar_x+12,gameChar_y+26,
             gameChar_x+12,gameChar_y+19,
             gameChar_x+18,gameChar_y+26);

    //Outer eyes
    fill(255);
    ellipse(gameChar_x-10,gameChar_y-4,20,20);
    ellipse(gameChar_x+10.5,gameChar_y-4,20,20);

    //Inner Eyes
    fill(0);
    ellipse(gameChar_x-10,gameChar_y-4,12,12);
    ellipse(gameChar_x+10.5,gameChar_y-4,12,12);

}

