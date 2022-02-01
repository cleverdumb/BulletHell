console.log('projectiles loaded');

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

class Missile {
    constructor(x,y,r,c,dx,dy) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
        this.dx = dx;
        this.dy = dy;
        this.shouldDelete = false;
        this.playerDis = 0;
        this.damage = 10;
        this.lifespan = 400;
    }
    draw() {
        ctx.fillStyle = this.c;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }
    update() {
        this.lifespan -= 1;
        let dir = Math.atan2(player.y-this.y,player.x-this.x);
        this.dx = Math.cos(dir);
        this.dy = Math.sin(dir);
        this.x += this.dx;
        this.y += this.dy;
        if (this.lifespan == 0) {
            this.shouldDelete = true;
        }
        let dis = Math.hypot(this.x-player.x,this.y-player.y);
        if (dis<=this.r+player.r) {
            this.shouldDelete = true;
            player.hit(this.damage);
        }
        if (this.x+this.r<=0 || this.x-this.r>=game.w || this.y+this.r<=0 || this.y-this.r>=game.h) {
            // console.log('should be deleted');
            this.shouldDelete = true;
        }
    }
}

class Landmine {
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
        this.moveLifespan = Math.random()*100+50;
        this.lifespan = 300;
    }
    draw() {
        ctx.fillStyle = this.c;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }
    update() {
        if (this.moveLifespan>0) {
            this.moveLifespan--;
            this.x += this.dx;
            this.y += this.dy;
        }
        else if (this.lifespan>0) {
            this.lifespan--;
        }
        else if (this.lifespan<=0) {
            this.shouldDelete = true;
        }
        this.playerDis = Math.hypot(this.x-player.x,this.y-player.y);
        if (this.playerDis<=player.r+this.r) {
            this.shouldDelete = true;
            player.hit(this.damage);
        }
        if (this.x+this.r<=0 || this.x-this.r>=game.w || this.y+this.r<=0 || this.y-this.r>=game.h) {
            // console.log('should be deleted');
            this.shouldDelete = true;
        }
    }
}