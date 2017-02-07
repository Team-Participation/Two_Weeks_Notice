//initializing the room

var gameRoom = new Room();

// a class to contain all the info of the current room

function Room ()
{
    this.wallGrid = createWalls();
    this.objects = [];
}

//function that walls in the area so that the player can't walk off screen
function createWalls()
{
    var walls = [];
    for(var col = 0; col < WIDTH; col++)
    {
        for(var row = 0; row < HEIGHT; row++)
        {
            //col + 1 because coords aren't 0-indexed
            if(col + 1 == 1 || col + 1 == WIDTH)
            {
                walls.push([col, row]);
            }
            else if(row + 1 == 1 || row + 1 == HEIGHT)
            {
                walls.push([col, row]);
            }
        }
    }
    return walls;
}


//background sprites
var tileSprite = new Image();
tileSprite.src = "img/tile.png";
var wallSprite = new Image();
wallSprite.src = "img/wall.png";


/* function returns false if the player bumps into a wall
 * playerNextPos needs to be an array containing the coords
 * of the tile the player is tring to move to
 */
function wallCollision(playerNextPos, walls)
{
    for(var i = 0; i < walls.length; i++)
    {
        if(playerNextPos[0] == walls[i][0] && playerNextPos[1] == walls[i][1])
        {
            console.log("hehe cx");
            return false;
        }
    }
    return true;
}

//new function objectCollision, can just be placed under the wallCollision function
//true = can move, false = cannot move
function objectCollision(playerNextPos, room)
{
	//check for each object in the current room
	for(var i = 0; i < room.objects.length; i++)
	{
		//if statement to skip items, since they don't have collision
		if(room.objects[i].layerCode != 2)
		{
			/* these for statements make sure to check for each tile the object
			 * takes up, if it has a length and/or width greater than 1
			 */
			for(var length = 0; length < room.objects[i].length; length++)
			{
				for(var height = 0; height < room.objects[i].height; height++)
				{
					if(playerNextPos[0] == room.objects[i].x + length &&
							playerNextPos[1] == room.objects[i].y + height)
					{
						return false;
					}
				}
			}
		}
	}
	return true;
}

