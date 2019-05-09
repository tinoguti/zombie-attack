//este literal mantiene el marcador del juego con su puntuación
const ScoreBoard = {
  ctx: undefined,
  init: function(ctx) {
    this.ctx = ctx;
  },
  update: function(score, kills) {
    this.ctx.font = "30px monospace";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Time", 50, 100);
    this.ctx.fillText(Math.floor(score), 150, 100);
    this.ctx.fillText("Kills", 50, 150);
    this.ctx.fillText(Math.floor(kills), 150, 150);
  }
};
