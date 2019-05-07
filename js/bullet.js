class Bullet {
  constructor(position, enemyX, enemyY, ctx) {
    this.ctx = ctx
    this.pos = {...position}
    // this.target = target
    this.enemyX = enemyX
    this.enemyY = enemyY
    this.r = 5
    this.vx = 10;
    this.vy = 10;
  }

  draw() {
    console.log(this.pos)
    this.ctx.beginPath();
    this.ctx.fillStyle = "red";
    this.ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }

  move() {
    console.log(this.pos)
    if (this.enemyX > this.pos.x) this.pos.x += 20
    else this.pos.x -= 20

    if (this.enemyY > this.pos.y) this.pos.y += 20
    else this.pos.y -= 20
    }
}