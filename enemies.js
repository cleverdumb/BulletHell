class Enemy {
    constructor(x,y,r,c) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
        this.frame = 0;
        this.shootAngle = 0;
        this.shootDx = 0;
        this.shootDy = 0;
        this.shootSpeed = 3;
        this.health = 60;
        this.shouldDelete = false;
        this.shootTime = 100;
        this.shootColor = 'orange';
        this.score = 100;
    }
    draw() {
        ctx.fillStyle = this.c;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }
    shoot() {
        // console.log('shoot');
        this.shootAngle = Math.atan2(player.y-this.y,player.x-this.x);
        this.shootDx = Math.cos(this.shootAngle) * this.shootSpeed;
        this.shootDy = Math.sin(this.shootAngle) * this.shootSpeed;
        projectiles.push(new Projectile(this.x,this.y,10,this.shootColor,this.shootDx,this.shootDy))
        GUNSHOOT.play();
    }
    update() {
        this.frame++;
        if (this.frame%this.shootTime==0) {
            this.shoot();
        }
        if (this.x+this.r<=100 || this.x-this.r>=game.w-100 || this.y+this.r<=100 || this.y-this.r>=game.h-100) {
            // console.log('should be deleted');
            this.goIn();
        }
    }
    goIn() {
        // console.log('going in range');
        this.walkAngle = Math.atan2(player.y-this.y,player.x-this.x);
        this.x += Math.cos(this.walkAngle);
        this.y += Math.sin(this.walkAngle);
    }
    hit(dmg) {
        this.health -= dmg;
        if (this.health<=0) {
            this.shouldDelete = true;
        }
    }
}

class CurveEnemy {
    constructor(x,y,r,c) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
        this.frame = 0;
        this.shootAngle = 0;
        this.shootDx = 0;
        this.shootDy = 0;
        this.shootSpeed = 3;
        this.health = 80;
        this.shouldDelete = false;
        this.shootTime = 200;
        this.shootColor = 'red';
        this.score = 100;
    }
    draw() {
        ctx.fillStyle = this.c;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }
    shoot() {
        // console.log('shoot');
        this.shootAngle = Math.atan2(player.y-this.y,player.x-this.x);
        this.shootDx = Math.cos(this.shootAngle) * this.shootSpeed;
        this.shootDy = Math.sin(this.shootAngle) * this.shootSpeed;
        projectiles.push(new Missile(this.x,this.y,10,this.shootColor,this.shootDx,this.shootDy))
        GUNSHOOT.play();
    }
    update() {
        this.frame++;
        if (this.frame%this.shootTime==0) {
            this.shoot();
        }
        if (this.x+this.r<=100 || this.x-this.r>=game.w-100 || this.y+this.r<=100 || this.y-this.r>=game.h-100) {
            // console.log('should be deleted');
            this.goIn();
        }
    }
    goIn() {
        // console.log('going in range');
        this.walkAngle = Math.atan2(player.y-this.y,player.x-this.x);
        this.x += Math.cos(this.walkAngle);
        this.y += Math.sin(this.walkAngle);
    }
    hit(dmg) {
        this.health -= dmg;
        if (this.health<=0) {
            this.shouldDelete = true;
        }
    }
}