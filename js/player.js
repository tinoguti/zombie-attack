class Player {
  constructor(w, h, ctx, canvas, keys) {
    this.canvasW = w
    this.canvasH = h
    this.ctx = ctx
    this.canvas = canvas
    this.keys = keys
    // Health
    this.health = 100
    // Posición inicial
    this.pos = {
      x: this.canvasW/2,
      y: this.canvasH/2
    }
    this.mouse = {
      x: undefined,
      y: undefined
    }
    // Target and rotation
    this.target = {
      x: undefined,
      y: undefined,
    }
    this.rotation = undefined
    // Posiciones x e y del disparo
    this.shootX = undefined
    this.shootY = undefined

    //Sprite img and size
    this.img = new Image();
    this.img.src = "/img/player.png"
    this.w = 213 * 0.30;
    this.h = 165 * 0.30;
    this.bullets = []
    this.setListeners();
    //Gun sound
    this.gunShots = new Audio()
    this.gunShots.src = "/sound/gun.mp3"
  }

  draw() {
    //console.log("Drawing player!")
    //console.log("ROTATION", this.rotation)
    this.ctx.save();
    this.ctx.translate(this.pos.x, this.pos.y);
    this.ctx.rotate(this.rotation);
    this.ctx.drawImage(this.img, -this.w/2, -this.h/2, this.w, this.h)
    // this.ctx.drawImage(
    //   this.img,
    //   this.pos.x,
    //   this.pos.y,
    //   this.w,
    //   this.h
    //   );
    this.ctx.restore(); 
    ////////////////////////////
    // this.bullets = this.bullets.filter(bullet => {
    //   return bullet.x < this.canvas.w;
    // });

    this.bullets.forEach(function(bullet) {
      bullet.draw()
      bullet.move()
      //bullet.clearBullets()
    });
  }

  shoot(tx, ty) {
    this.bullets.push(new Bullet(this.pos.x, this.pos.y, tx, ty, this.ctx, this.bullets))
    //this.gunShots.play();
    
  }

  setListeners() { // No estoy contento con el resultado, pero por ahora es algo
    let keys = []
    document.onkeydown = function(event) {
      keys[event.keyCode] = true
      if (keys[this.keys.W]) this.pos.y -= 5
      if (keys[this.keys.A]) this.pos.x -= 5
      if (keys[this.keys.S]) this.pos.y += 5
      if (keys[this.keys.D]) this.pos.x += 5  
      event.preventDefault();  
    }.bind(this)

    document.onkeyup = function(event) {
      keys[event.keyCode] = false
    }.bind(this)

    document.onmousemove = event => {
      this.mouse.x = event.pageX //event.clientX;
      this.mouse.y = event.pageY //event.clientY;
      this.canvas.style.cursor = "crosshair"
      this.target.x = this.mouse.x - this.pos.x;
      this.target.y = this.mouse.y - this.pos.y;
      this.rotation = Math.atan2(this.target.y, this.target.x)
      //.url {cursor: url(myBall.cur),auto;} wd     
    }
    document.onclick = event => {
      this.shootX = event.pageX
      this.shootY = event.pageY
      this.shoot(event.pageX, event.pageY)

    }
  }
  die() {
    // alert("YOU ARE DEAD MAN!")
    console.log("you are dead")
  }
}