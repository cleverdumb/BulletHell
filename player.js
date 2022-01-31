class Player {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.color = 'white';
        this.r = 20;
        this.health = 100;
        this.shootSpeed = 3;
        this.dmg = 20;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }
    die() {
        cancelAnimationFrame(game.animationId);
        game.playerDie();
        projectiles = [];
        enemies = [];
    }
    hit(dmg) {
        this.health -= dmg;
        if (this.health<=0) {
            this.die();
        }
    }
    update() {
        if (this.health < 0) {
            this.health = 0;
        }
        enemies.forEach(x=>{
            let dis = Math.hypot(this.x-x.x,this.y-x.y);
            if (dis<=x.r+this.r) {
                // console.log('collide: player and enemy')
                x.shouldDelete = true;
                game.score += x.score;
                // WHOOSH.pause();
                WHOOSH.play();
            }
        })
    }
}