class Projectile {
    constructor(x,y,r,c,dx,dy) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
        this.dx = dx;
        this.dy = dy;
        this.shouldDelete = false;
        this.playerDis = 0;
        this.damage = 5;
    }
    draw() {
        ctx.fillStyle = this.c;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }
    update() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x+this.r<=0 || this.x-this.r>=game.w || this.y+this.r<=0 || this.y-this.r>=game.h) {
            // console.log('should be deleted');
            this.shouldDelete = true;
        }
        this.playerDis = Math.hypot(this.x-player.x,this.y-player.y);
        if (this.playerDis<=player.r+this.r) {
            player.hit(this.damage);
            this.shouldDelete = true;
        }
    }
}