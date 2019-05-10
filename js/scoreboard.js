const ScoreBoard = {
  ctx: undefined,
  init: function(ctx,game) {
    this.ctx = ctx;
    this.game = game;
  },
  update: function(score, kills) {
    this.ctx.font = "30px monospace";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Time", 50, 50);
    this.ctx.fillText(Math.floor(score), 200, 50);
    this.ctx.fillText("Kills", 50, 100);
    this.ctx.fillText(Math.floor(kills), 200, 100);
  },
  drawLife: function() {
    this.ctx.fillStyle = "green"
    this.ctx.fillRect(50,125,this.game.player.health, 10)
  }
};
   