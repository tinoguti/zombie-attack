const Game = {
  version: 1.0,
  author: 'Tino Gutiérrez',
  description: 'Zombie Attack is a top-down survival shooter',
  canvas: undefined,
  canvasSize: {
    w: undefined,
    h: undefined,
  },
  ctx: undefined,
  fps: 60,
  keys: {
    W: 87,
    A: 65,
    S: 83,
    D: 68
  },
  random: {
    x: undefined,
    y: undefined
  },
  zombies: [],

  init: function(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.ctx = this.canvas.getContext("2d")
    this.canvasSize.w = window.innerWidth
    this.canvasSize.h = window.innerHeight
    
    // ScoreBoard.init(this.ctx); /* ? */
    this.setDimensions()
    this.setHandlers()
    this.start()
  },
  start: function() {
    this.fps = 60
    this.reset()

    this.interval = setInterval(() => {
      this.clear()
      //console.log(this.framesCounter)
      this.framesCounter++;
      
      // controlamos que frameCounter no sea superior a 1000
      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
        //console.log(this.framesCounter)
      }

      // controlamos la velocidad de generación de enemigos
      if (this.framesCounter % 200 === 0) {
        this.generateZombie();
        console.log("Genero zombie", this.framesCounter)
      }


      this.drawAll()
    }, 1000 / this.fps);    
  }, 
  stop: function() {
    clearInterval(this.interval);
    console.log("Game stopped")
  },
  setDimensions: function () {
    this.canvas.setAttribute('width', this.canvasSize.w)
    this.canvas.setAttribute('height', this.canvasSize.h)
    this.canvasSize.h = window.innerHeight
    this.canvasSize.w = window.innerWidth
  },
  setHandlers: function () {
      window.onresize = () => this.setDimensions()
  },
  reset: function() {
    this.background = new Background(this.canvas.width, this.canvas.height, this.ctx)    
    this.player = new Player(this.canvas.width, this.canvas.height, this.ctx, this.canvas, this.keys)
    this.generateZombie() //this.zombie = new Zombie(this.canvas.width, this.canvas.height, this.ctx, this.canvas, this.player.pos)
    // this.scoreBoard = ScoreBoard;
    this.framesCounter = 0; //Pone el contador de frames en 0
    //this.zombies = [];
    //this.score = 0;
  },
  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
  randomOut: function() {
    let random = Math.floor((Math.random() * 4) + 1)
    switch (random) {
      case 1:
        this.random.x = -30
        this.random.y = Math.floor(Math.random() * this.canvasSize.h) + 1
        break;
      case 2:
        this.random.x = this.canvasSize.w + 30
        this.random.y = Math.floor(Math.random() * this.canvasSize.h) + 1
        break;
      case 3:
        this.random.x = Math.floor(Math.random() * this.canvasSize.w) + 1
        this.random.y = -30
        break;
      case 4:
        this.random.x = Math.floor(Math.random() * this.canvasSize.w) + 1
        this.random.y = this.canvasSize.h + 30
        break;
      }
  },
  generateZombie: function() {
    this.randomOut()
    this.zombies.push(new Zombie(this.canvas.width, this.canvas.height, this.ctx, this.canvas, this.player.pos, this.random))
  },
  drawAll: function() {
  this.background.draw()
  this.player.draw() //Por ahora no tiene animación
  //this.zombie.draw()
  this.zombies.forEach(zombie => zombie.draw())
  this.zombies.forEach(zombie => zombie.move())
  },
}