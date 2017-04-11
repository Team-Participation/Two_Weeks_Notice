/* tiles are set so that when each tile is a square, the aspect
 * ratio is 16*9. This is just temporary.
 */

function debug()
{
  console.log("!");
}

var game = {
    fps: 60,
    tileSize: 32,
    width: 1024,
    height: 576,
    bgmemory: 0
};

game.onEachFrame = (function() {
    var requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame;

    if (requestAnimationFrame) {
        return function(callback) {
            var _cb = function() { callback(); requestAnimationFrame(_cb); }
            _cb();
        };
    } else {
        return function(callback) {
            setInterval(callback, 1000 / game.fps);
        }
    }
})();

game.start = function() {
    game.canvas = document.querySelector("canvas");
    game.canvas.width = game.width;
    game.canvas.height = game.height;
    game.context = game.canvas.getContext("2d");
    game.stage = document.getElementById("gameScreen");

    game.ui = new uiController();

    game.player = new Player();

    game.ui.drawInitial();
    game.player.room = breakRoom;

    game.onEachFrame(game.run);
};

game.run = (function() {
    var loops = 0, skipTicks = 1000 / game.fps,
        maxFrameSkip = 10,
        nextgameTick = (new Date).getTime(),
        lastgameTick;

    return function() {
        loops = 0;

        while ((new Date).getTime() > nextgameTick) {
            game.update();
            nextgameTick += skipTicks;
            loops++;
        }

        if (loops) game.draw();
    }
})();

game.draw = function() {
    if(states.currentState == "game"){
        game.context.clearRect(0, 0, game.width, game.height);
		//game.player.room.drawRoom();
		game.player.room.drawBG();

    for (i = 0; i < game.player.room.npcs.length; i++)
    {
      if(game.player.room.npcs[i].y < game.player.y -1)
		    drawNPC(game.context, game.player.room.npcs[i]);
    }

    game.player.draw(game.context);

    for (i = 0; i < game.player.room.npcs.length; i++)
    {
      if(game.player.room.npcs[i].y >= game.player.y -1)
        drawNPC(game.context, game.player.room.npcs[i]);
    }

		game.player.room.drawTallBG();

    }else if(states.currentState == "menu"){

        if (menuEst.assetsLoaded == menuEst.numAssetsLoaded()){
            game.ui.drawMenu();
        }
    }else if(states.currentState == "pause"){
			game.ui.drawPauseMenu();
		}
};

game.update = function() {
	game.ui.checkState();
    if(states.currentState == "game"){
        game.player.update();
    }else if(states.currentState == "menu"){
        game.ui.updateMenu();
    }else if(states.currentState == "pause"){
		game.ui.updateMenu();
		}
};

window.onload = game.start;
