class Player {
  constructor(w, h, ctx, canvas, keys) {
    this.canvasW = w
    this.canvasH = h
    this.ctx = ctx
    this.canvas = canvas
    this.keys = keys
    // Posición inicial
    this.pos = {
      x: this.canvasW/2,
      y: this.canvasH/2
    }
    this.mouse = {
      x: undefined,
      y: undefined
    }
    // Rotation
    this.target = {
      x: undefined,
      y: undefined,
    }
    this.rotation = undefined

    //Sprite img and size
    this.img = new Image();
    this.img.src = "img/player.gif";
    this.w = 253 * 0.30;
    this.h = 216 * 0.30;

    this.setListeners();
  }

  draw() {
    console.log("Drawing player!")
    console.log("ROTATION", this.rotation)
    this.ctx.drawImage(
      this.img,
      this.pos.x,
      this.pos.y,
      this.w,
      this.h
      );  
    
    //this.ctx.rotate(this.rotation);

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
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY;
      this.canvas.style.cursor = "crosshair"
      this.target.x = this.mouse.x - this.pos.x;
      this.target.y = this.mouse.y - this.pos.y;
      this.rotation = Math.atan2(this.target.y, this.target.x)
      console.log(this.mouse.x, this.mouse.y, this.pos.x, this.pos.y, this.rotation)
      //.url {cursor: url(myBall.cur),auto;}
    }


  }
}