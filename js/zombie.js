class Zombie {
  constructor(w, h, ctx, canvas, target, random) {
    this.canvasW = w
    this.canvasH = h
    this.ctx = ctx
    this.canvas = canvas
    // Posición inicial, será aleatoria alrededor del mapa
    this.random = random
    this.pos = {
      x: this.random.x,
      y: this.random.y
    }
    this.target = target // Posición del target (Player)
    this.mouse = {
      x: undefined,
      y: undefined
    }
    this.rotation = undefined

    //Sprite img and size
    this.img = new Image();
    this.img.src = "img/zombie/skeleton-attack_0.png"
    this.w = 253 * 0.35;
    this.h = 216 * 0.35;
    //this.setListeners();
    //Posicion respecto a player
    this.dx = undefined
    this.dy = undefined
    // this.distance = Math.sqrt((this.dx*this.dx) + (this.dy*this.dy))
    // this.angle = Math.atan2(this.dy,this.dx) * 180 / Math.PI
    // this.speedX = undefined
    // this.speedY = undefined
  }

  draw() {
    //console.log("Drawing Zombie!", this.target.x, this.target.y)
    this.ctx.save();
    this.ctx.translate(this.pos.x, this.pos.y);
    this.ctx.rotate(this.rotation);
    this.ctx.drawImage(this.img, -this.w/2, -this.h/2, this.w, this.h)
    this.ctx.restore(); 
    this.move()
  }
  // getAngle() {
  //   console.log("Getting angle", this.target.x, this.pos.y)
  //   //this.dx = this.target.x - this.pos.x
  //   //this.dy = this.target.y - this.pos.y
  //   //this.distance = Math.sqrt((this.dx*this.dx) + (this.dy*this.dy))
  //   //this.angle = Math.atan2(this.dy,this.dx) * 180 / Math.PI
  // }
  // getSpeed() {
  //   console.log("Getting speed")
  //   this.speedX = this.speed * (this.dx/this.distance)
  //   this.speedY = this.speed * (this.dy/this.distance)
  // }

  move() {
   
    this.dx = this.target.x - this.pos.x;
    this.dy = this.target.y - this.pos.y;
    this.rotation = Math.atan2(this.dy, this.dx)
    //console.log("HOLA QUE TAL ESTOY EN", this.pos.x, this.pos.y, this.rotation)
    
    if (this.target.x > this.pos.x) this.pos.x += 0.3
    else this.pos.x -= 0.3

    if (this.target.y > this.pos.y) this.pos.y += 0.3
    else this.pos.y -= 0.3
    
    
    //console.log(this.pos.x, this.pos.y)

  }
}