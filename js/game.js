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
  scoreBoard: undefined,
  zombies: [],
  kills: 0,
  ratio: undefined,
  freq: undefined,
  gameOverSong: new Audio(),
  playingSong: new Audio(),
  zombieSound: new Audio(),

  init: function(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.ctx = this.canvas.getContext("2d")
    this.canvasSize.w = window.innerWidth
    this.canvasSize.h = window.innerHeight
    
    ScoreBoard.init(this.ctx,this);
    this.setDimensions()
    this.setHandlers()
    this.start()
    this.playingSong.src = "sound/playing.mp3"
    this.playingSong.play()
  },

  start: function() {
    this.fps = 60
    this.reset()

    this.interval = setInterval(() => {
      this.clear()
      this.framesCounter++;    
      
      if (this.framesCounter > 1000) {
        this.framesCounter = 0;
      }      
      if (this.framesCounter % this.freq === 0) { // Controla la velocidad de generación de enemigos
        this.generateZombie();
      }
      this.score += 0.01

      // const waves = {
      //   wave1: {
      //     zombies: 3,
      //     frames: 1000
      //   }
      // }

      this.drawAll()
      this.handleCollisions()
      this.clearBullets()
      this.levelUp(Math.floor(this.score))
    }, 1000 / this.fps);    
  }, 

  stop: function() {
    clearInterval(this.interval)
  },

  setDimensions: function () {
    this.canvas.setAttribute('width', this.canvasSize.w)
    this.canvas.setAttribute('height', this.canvasSize.h)
    this.canvasSize.h = window.innerHeight
    this.canvasSize.w = window.innerWidth
  },

  setHandlers: function () {
      window.onresize = () => this.setDimensions()
      this.playingSong.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play()
      }, false)
  },

  reset: function() {
    this.background = new Background(this.canvas.width, this.canvas.height, this.ctx)    
    this.player = new Player(this.canvas.width, this.canvas.height, this.ctx, this.canvas, this.keys)
    this.generateZombie()
    this.scoreBoard = ScoreBoard
    this.framesCounter = 0
    this.zombies = []
    this.score = 0
    this.kills = 0
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },

  randomOut: function() { //Generación aleatoria de las posiciones de los zombies.
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
    this.zombies.push(new Zombie(this.canvas.width, this.canvas.height, this.ctx, this.canvas, this.player.pos, this.random, this.kills))
  },
    
  clearBullets: function() {
    this.player.bullets = this.player.bullets.filter(function(bullet) {
      return Math.round(bullet.prevVelX) !== -Math.round(bullet.velX) && Math.round(bullet.prevVelY) !== -Math.round(bullet.velY)
    });
  },

  drawAll: function() {
  this.background.draw()
  this.player.draw() 
  this.scoreBoard.drawLife()
  this.zombies.forEach(zombie => zombie.draw())
  this.zombies.forEach(zombie => zombie.move())
  this.drawScore();
  },

  collision: function(a, b) {
    return a.pos.x < b.pos.x + b.w &&
            a.pos.x + a.w > b.pos.x &&
            a.pos.y < b.pos.y + b.h &&
            a.pos.y + a.h > b.pos.y;
  },

  handleCollisions: function() {
    //Cuando el zombie se encuentra con una bala
    this.zombies.forEach(zombie => {
      if (
        this.player.bullets.some(bullet => { 
          return this.collision(zombie,bullet)
        })
      ) {
        //this.player.bullets.splice(this.player.bullets.indexOf(bullet),1)
        //zombie.die()
        this.zombies.splice(this.zombies.indexOf(zombie),1)
        this.kills++
      }
    })
    //Para borrar las balas
    this.player.bullets.forEach(bullet => {
      if (
        this.zombies.some(zombie => { 
          return this.collision(zombie,bullet)
        })
      ) {
        this.player.bullets.splice(this.player.bullets.indexOf(bullet),1)
        //this.zombies.splice(this.zombies.indexOf(zombie),1)
      }
    })
    //Cuando el zombie llega al player
    this.zombies.forEach(zombie => {
      if (this.collision(zombie,this.player)) {
        // Aquí empecé a darle vida al jugador pero empezó a llevarme más tiempo del esperado.
        // if (this.player.health >= 0) this.player.health -= 0.0005 
        // if (this.player.health <= 0.95) { }
        this.playingSong.pause();
        this.player.health -= 1  
        if (this.player.health <= 0){

          this.player.die()
          this.gameOver()
        }
      }
    })
  },
  drawScore: function() {
    this.scoreBoard.update(this.score, this.kills);
  },
  levelUp: function(score) { //Controla la frecuencia de generación de zombies
    switch (score) {
      case 0:
        this.freq = 300
        break;
      case 10:
        this.freq = 200
        break;
      case 20:
        this.freq = 100
        break;
      case 30:
        this.freq = 50
        break;
      case 40:
        this.freq = 40
        break;
      case 50:
        this.freq = 30
        break;
      case 60:
        this.freq = 20
        break;
      case 70:
        this.freq = 10
        break;
    }
  },

  gameOver: function() {
    this.stop()
    let node = document.createElement("P");
    document.getElementById("game-over").style.display = "inline-block"
    document.getElementById("time").innerHTML = Math.floor(this.score)
    document.getElementById("kills").innerHTML = this.kills 
    this.ratio = this.kills/Math.floor(this.score)   
    this.ratio = this.ratio.toFixed(2)
    this.gameOverSong.src = "sound/gameover.mp3"
    this.gameOverSong.play();
    document.getElementById("ratio").innerHTML = this.ratio
    //this.loadRandking()
  },
  // addToRanking: function() {
  //   let name = document.getElementById("name").value
  //   if (typeof(Storage) !== "undefined") {
  //   localStorage.setItem(name, this.ratio);
  //   console.log(localStorage.getItem(name))
  //   } else {
  //     document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
  //   }
  // },
  // loadRandking: function() {
  //   let values = [],
  //         keys = Object.keys(localStorage),
  //         i = keys.length;
  
  //     while (i--) {
  //         // values.push(localStorage.getItem(keys[i]));
  //         document.getElementById("stats").appendChild

  //     }  
  //     return values;
  // },  
  data: function() {
    console.log(this.zombies)
  }
}



