// a class to contain all the info of the current room
function room ()
{
    this.height = 18;
    this.width = 32;
    this.tileSize = 32;

    this.walls = [];
	this.collisionArray = [];
    this.objects = [];
	this.BGArray = [];
	this.tallBG = [];
}

var tileset = new Image();
tileset.src = "assets/sprites/bg/tileset.png";


room.prototype.drawBG = function() {
	for(var row = 0; row < this.BGArray.length; row++)
	{
		for(var col = 0; col < this.BGArray[row].length; col++)
		{
			for(var i = 0; i < this.BGArray[row][col].length; i++)
			{
				//console.log("sx: ", (this.BGArray[row][col][i] % 10));
				//console.log("sy: ", (Math.floor(this.BGArray[row][col][i] / 10)));
				game.context.drawImage(tileset,
							(this.BGArray[row][col][i] % 10) * this.tileSize,
							(Math.floor(this.BGArray[row][col][i] / 10) * this.tileSize),
							this.tileSize, this.tileSize,
							col * this.tileSize, row * this.tileSize,
							this.tileSize, this.tileSize);
			}
		}
	}
}

room.prototype.drawTallBG = function() {
	for(var i = 0; i < this.tallBG.length; i++)
	{
		//starts at 1 so it doesn't redraw the floor, just everything else
		for(var j = 1; j < this.BGArray[this.tallBG[i][1]][this.tallBG[i][0]].length; j++)
		{
			game.context.drawImage(tileset,
						(this.BGArray[this.tallBG[i][1]][this.tallBG[i][0]][j] % 10) * this.tileSize,
						Math.floor(this.BGArray[this.tallBG[i][1]][this.tallBG[i][0]][j] / 10) * this.tileSize,
						this.tileSize, this.tileSize,
						this.tallBG[i][0] * this.tileSize, this.tallBG[i][1] * this.tileSize,
						this.tileSize, this.tileSize);
		}
	}
}

/* function returns false if the player bumps into a wall
 * playerNextPos needs to be an array containing the coords
 * of the tile the player is tring to move to
 */
room.prototype.collision = function(playerNextPos){
    if(playerNextPos[0] < firstRoom.width && playerNextPos[0] >= 0 &&
			playerNextPos[1] <= firstRoom.height && playerNextPos[1] >= 0)
	{
		return !firstRoom.collisionArray[playerNextPos[1]][playerNextPos[0]];
	}
    else
	{
	return false;
	}
}
