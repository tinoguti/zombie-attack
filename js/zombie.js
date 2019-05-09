class Zombie {
  constructor(w, h, ctx, canvas, target, random, kills) {
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
    // Posición del target (Player)
    this.target = target 
    this.mouse = {
      x: undefined,
      y: undefined
    }
    this.rotation = undefined

    //Sprite img and size
    this.img = new Image();
    this.img.src = "/img/zombie/skeleton-attack_0.png"
    this.w = 197 * 0.30;
    this.h = 178 * 0.30;
    //this.setListeners();
    //Posicion respecto a player
    this.dx = undefined
    this.dy = undefined
    
    this.speed = 0.3
    this.status = 1 // 1 = vivo, 0 = muerto
    this.kills = kills
  }

  draw() {

    this.ctx.save();
    this.ctx.translate(this.pos.x, this.pos.y);
    this.ctx.rotate(this.rotation);
    this.ctx.drawImage(this.img, -this.w/2, -this.h/2, this.w, this.h)
    this.ctx.restore(); 
    this.move()

  }

  move() {
   
    this.dx = this.target.x - this.pos.x;
    this.dy = this.target.y - this.pos.y;
    this.rotation = Math.atan2(this.dy, this.dx)

    let radians = Math.atan2(this.dy, this.dx)
    this.velX = Math.cos(radians) * this.speed;
    this.velY = Math.sin(radians) * this.speed;
    this.pos.x += this.velX;
    this.pos.y += this.velY;

  }

  die() {

    this.speed = 0
    this.status = 0
    //this.img.src = cambiar a la imagen de zombie muerto 
    this.kills += 1
    //alert(this.kills)
    // alert(game.kills)

  }

  kill() {
    console.log("ZOMBIE MATA A PLAYER")
  }
}