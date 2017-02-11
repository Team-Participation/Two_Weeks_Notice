/* tiles are set so that when each tile is a square, the aspect
 * ratio is 16*9. This is just temporary.
 */
const TILESIZE = 48;
const HEIGHT = 18;
const WIDTH = 32;
//this is how many frames it takes to move 1 tile
const MOVETIME = 15;
const error = 0;

var game = {
    fps: 60,
    tileSize: 48,
    width: 1536,
    height: 864
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

    game.player = new Player();

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
    game.context.clearRect(0, 0, game.width, game.height);
    game.player.draw(game.context);
};

game.update = function() {
    game.player.update();
};

game.start();