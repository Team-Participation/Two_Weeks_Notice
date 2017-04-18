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
    width: 800,
    height: 600,
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

var dlog =
{
    active: false,
    id: null,
    buffer: [],
    maxChar: 72,
    margin: 20,
    padding: 40,
    line: 30,
    Draw: function()
    {
        game.context.font = "bold 20px Arial";
        game.context.textAlign = "left";
        if(this.buffer[0] !== undefined)
        {
            var l = 0;
            for (i = 0; i < this.buffer.length; i++)
            {
                l++;
                var skip = false;
                for (var j = this.buffer[i].length; j > 0; j--)
                {
                    if (this.buffer[i].charAt(j) == "~")
                    {
                        skip = true
                        l++;
                    }
                }
                if (!skip && this.buffer[i].length > this.maxChar)
                {
                    l++;
                }
            }
            var y = game.height - (this.margin + this.padding + l * this.line);
            game.context.fillStyle = "black";
            game.context.fillRect(this.margin, y, game.width - this.margin*2, (this.padding + l * this.line));
            game.context.fillStyle = "white";
            l = 0;
            for (i = 0; i < this.buffer.length; i++)
            {
                var text = this.buffer[i];
                var skip = false;
                for (var j = text.length; j > 0; j--)
                {
                    if (text.charAt(j) == "~")
                    {
                        text = text.replace("~","");
                        var lastChar = j;
                        var text2 = text.slice(lastChar,text.length);
                		text = text.slice(0,lastChar);
                        game.context.fillText(text, this.padding, this.padding + y + (i + l) * this.line); //fills box with text from objects
                        l++;
                        game.context.fillText(text2, this.padding, this.padding + y + (i + l) * this.line); //fills box with text from objects
                        skip = true;
                        break;
                    }
                }
                if (!skip && text.length > this.maxChar)
                {
                    var lastChar;
            		for (var j = this.maxChar; j > 0; j--)
                    {
            			if (text.charAt(j) == " ")
                        {
            				lastChar = j + 1;
            				break;
            			}
            		}
            		var text2 = text.slice(lastChar,text.length);
            		text = text.slice(0,lastChar);
                    game.context.fillText(text, this.padding, this.padding + y + (i + l) * this.line); //fills box with text from objects
                    l++;
                    game.context.fillText(text2, this.padding, this.padding + y + (i + l) * this.line); //fills box with text from objects
                }
                else if (!skip)
                {
                    game.context.fillText(text, this.padding, this.padding + y + (i + l) * this.line); //fills box with text from objects
            	}
            }
        }
    },
    Clear: function()
    {
        this.buffer = [];
    },
    Push: function(text)
    {
        this.buffer.push(text);
    }
};

game.draw = function() {
    if(states.currentState == "game"){
        game.context.clearRect(0, 0, game.width, game.height);

        game.player.room.drawBG();

        for (i = 0; i < game.player.room.npcs.length; i++)
        {
            if(game.player.room.npcs[i].y < game.player.y)
            drawNPC(game.context, game.player.room.npcs[i]);
        }

        game.player.draw(game.context);

        for (i = 0; i < game.player.room.npcs.length; i++)
        {
            if(game.player.room.npcs[i].y >= game.player.y)
            drawNPC(game.context, game.player.room.npcs[i]);
        }

        game.player.room.drawTallBG();
        dlog.Draw();
    }else if(states.currentState == "menu"){

        if (menuEst.assetsLoaded == menuEst.numAssetsLoaded()){
            game.ui.drawMenu();
        }
    }else if(states.currentState == "pause"){
        game.ui.drawPauseMenu();
    }
    if (fadeActive)
    {
        fade();
    }
};

game.update = function() {
	game.ui.checkState();
    if(states.currentState == "game"){
        game.player.update();
		for(var i = 0; i < game.player.room.npcs.length; i++)
		{
			game.player.room.npcs[i].Update();
		}
    }else if(states.currentState == "menu"){
        game.ui.updateMenu();
    }else if(states.currentState == "pause"){
		game.ui.updateMenu();
		}
};

window.onload = game.start;
