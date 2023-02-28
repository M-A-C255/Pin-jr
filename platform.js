function Platform(x,y,length) {
    
    this.x = x;
    this.y = y;
    this.length = length;
    this.draw = function(gc_x, gc_y) {
        fill('#BFDAF6');
        strokeWeight(1);
        stroke('#020F1D');
        rect(this.x, this.y, this.length, 20, 20);
    }
    
    this.checkContact = function(gc_x, gc_y) {
        
        if (gc_x > this.x && gc_x < this.x + this.length) {
            
            let d = this.y - gc_y - 25;
            
            if (d>=0 && d<5)  {
                 
                return true;
            }
        }
        
        return false;
    }
    
}