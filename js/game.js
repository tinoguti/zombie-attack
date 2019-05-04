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

      this.framesCounter++;

      // controlamos que frameCounter no sea superior a 1000
      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }

      // controlamos la velocidad de generación de obstáculos
      // if (this.framesCounter % 50 === 0) {
      //   this.generateObstacle();

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
    // this.scoreBoard = ScoreBoard;
    // this.framesCounter = 0;
    // this.obstacles = [];
    // this.score = 0;
  },
  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
  drawAll: function() {
  this.background.draw()
  this.player.draw() //Por ahora no tiene animación
  },

}