window.onload = function() {
  document.getElementById("start").onclick = function() {
    document.getElementById("main-menu").style.display = "none"
    document.getElementById("canvas").style.display = "block"
    document.getElementById("canvas").style.cursor = "crosshair";
    Game.init("canvas");
  };
  // document.getElementById("back").onclick = function() {

  //  }
  document.getElementById("restart").onclick = function() {
    Game.init("canvas");
    document.getElementById("game-over").style.display = "none"
    Game.gameOverSong.pause();
  };
}
