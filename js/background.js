class Background {
  constructor(w, h, ctx) {
    this.ctx = ctx
    //Bg image + width and height
    this.img = new Image();
    this.img.src = "img/background.jpg";
    this.w = w
    this.h = h
    //Bg position
    this.x = 0;
    this.y = 0;
  }
  draw() {
    //console.log("Drawing background!", this.img.src)
      this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }
}