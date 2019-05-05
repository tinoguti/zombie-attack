class Zombie {
  constructor(w, h, ctx, canvas, target) {
    this.canvasW = w
    this.canvasH = h
    this.ctx = ctx
    this.canvas = canvas
    // Posición inicial, será aleatoria alrededor del mapa
    this.pos = {
      x: this.canvasW/2 + 400,
      y: this.canvasH/2
    }
    this.target = target // Posicion del target (Player)
    this.mouse = {
      x: undefined,
      y: undefined
    }
    this.rotation = undefined

    //Sprite img and size
    this.img = new Image();
    this.img.src = "img/zombie/skeleton-attack_0.png";
    this.w = 253 * 0.35;
    this.h = 216 * 0.35;
    //this.setListeners();
  }

  check() {
    alert("HOLA")
    alert(this.target)
  }
  draw() {
    //console.log("Drawing Zombie!", this.target.x, this.target.y)
    
    this.ctx.drawImage(
      this.img,
      this.pos.x,
      this.pos.y,
      this.w,
      this.h
      );  
    
    //this.ctx.rotate(this.rotation);
  }
}