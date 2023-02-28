function Enemy (x,y, range){
    
    this.x = x;
    this.y = y;
    this.range = range;
    
    this.currentX = x;
    this.inc = 1;
    
    this.update = function() {
        
        this.currentX += this.inc;
        
        if (this.currentX > this.x + this.range) {
            
            this.inc -= 1;
        }
        
        else if (this.currentX < this.x) {
            
            this.inc = 1;
        }
    }
        
    this.draw = function() {
        
        this.update();
        fill('#d9e6f4');
        noStroke();
        
        //body
        ellipse(this.currentX,this.y-10,20,20);
        rect(this.currentX -10, this.y-10, 20, 12);
        
        //legs
        ellipse(this.currentX - 6.3, this.y+2.5, 7);
        ellipse(this.currentX , this.y+2.5, 7);
        ellipse(this.currentX + 6.3, this.y+2.5, 7);
        
        //eyes
        //Outer eyes
        fill(255);
        ellipse(this.currentX,this.y-10,13,13);

        //Inner Eyes
        fill(0);
        ellipse(this.currentX,this.y-10,9,9);
        
    }

    this.checkContact = function(gc_x,gc_y) {

        let d = dist(gc_x, gc_y, this.currentX, this.y);
        
        if (d<=25) {
            
            return true;
        }

        return false;
    }
                              

}