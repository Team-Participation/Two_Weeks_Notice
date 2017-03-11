/* tiles are set so that when each tile is a square, the aspect
 * ratio is 16*9. This is just temporary.
 */
var game = {
    fps: 60,
    tileSize: 48,
    width: 1536,
    height: 864,
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
    game.player.room.initSprites();
    game.player.room.initObjects();
    game.player.room.createWalls();
    
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
        game.player.room.drawRoom();
        if(game.player.onObject() || game.bgmemory >= 1 && game.bgmemory <= 60){
            game.player.draw(game.context);
            game.player.room.drawObjects(1);
            game.player.room.drawObjects(2);
            game.player.room.drawObjects(3);
            game.bgmemory = (game.bgmemory == 60 ? 0 : game.bgmemory+1);
        }else{
            game.player.room.drawObjects(1);
            game.player.room.drawObjects(2);
            game.player.room.drawObjects(3);
            game.player.draw(game.context);
        }
        
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

game.start();