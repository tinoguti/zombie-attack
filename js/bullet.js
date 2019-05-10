class Bullet {
  constructor(posX, posY, tx, ty, ctx, bullets) {
    this.ctx = ctx
    //Posicion inicial de la bala
    this.pos = {  
      x: posX,
      y: posY
    }
    //Posicion del target donde se dispara
    this.targetX = tx 
    this.targetY = ty
    this.speed = 20
    //this.bullets = bullets
    this.r = 3
    this.vx = 1
    this.vy = 1
    this.w = 10 
    this.h = 10
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.fillStyle = "red"
    this.ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2)
    this.ctx.fill()
    this.ctx.closePath()
  }

  move() {
    let radians = Math.atan2(this.targetY-this.pos.y, this.targetX- this.pos.x)
    this.prevVelX = this.velX
    this.prevVelY = this.velY
    this.velX = Math.cos(radians) * this.speed
    this.velY = Math.sin(radians) * this.speed
    this.pos.x += this.velX
    this.pos.y += this.velY
  }
}