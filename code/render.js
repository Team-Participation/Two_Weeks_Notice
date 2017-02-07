
//start of new render code

//rendering stuff
var canvas = document.querySelector("canvas");
canvas.width = 1536;
canvas.height = 864;
var surface = canvas.getContext("2d");

function render(room)
{
	//make sure render functions are in order of what appears on top of what
    surface.clearRect(0, 0, canvas.width, canvas.height);
    //draws the floor tiles & walls
    renderBackground();
	//each renderObjects function renders a different layer of objects(NPC, item, obstacle)
	renderObjects(gameRoom, 3);
	renderObjects(gameRoom, 2);
	renderObjects(gameRoom, 1);
    //draw the player
    renderPlayer();
}

/* all of the drawImage functions use one less than the actual player Y value so that
 * his feet are where he is actually standing and not his head
 */
function renderPlayer()
{
    //outer if statements make sure the player is facing the proper direction
    if(playerDirection == "up")
    {
        //inner if statements deal with movement
        if(playerMoveTime != 0)
        {
            surface.drawImage(playerUpSprite,
                            playerX * TILESIZE,
                            playerY * TILESIZE - TILESIZE * playerMoveTime / MOVETIME);
        }
        else
        {
            surface.drawImage(playerUpSprite,
                            playerX * TILESIZE,
                            (playerY - 1) * TILESIZE);
        }
    }
    else if(playerDirection == "down")
    {
        if(playerMoveTime != 0)
        {
            surface.drawImage(playerDownSprite,
                            playerX * TILESIZE,
                            (playerY - 2) * TILESIZE + TILESIZE * playerMoveTime / MOVETIME);
        }
        else
        {
            surface.drawImage(playerDownSprite,
                            playerX * TILESIZE,
                            (playerY - 1) * TILESIZE);
        }
    }
    else if(playerDirection == "left")
    {
        if(playerMoveTime != 0)
        {
            surface.drawImage(playerLeftSprite,
                            (playerX + 1) * TILESIZE - TILESIZE * playerMoveTime / MOVETIME,
                            (playerY - 1) * TILESIZE);
        }
        else
        {
            surface.drawImage(playerLeftSprite,
                            playerX * TILESIZE,
                            (playerY - 1) * TILESIZE);
        }
    }
    else
    {
        if(playerMoveTime != 0)
        {
            surface.drawImage(playerRightSprite,
                            (playerX - 1) * TILESIZE + TILESIZE * playerMoveTime / MOVETIME,
                            (playerY - 1) * TILESIZE);
        }
        else
        {
            surface.drawImage(playerRightSprite,
                            playerX * TILESIZE,
                            (playerY - 1) * TILESIZE);
        }
    }
}

function renderBackground()
{
	for(var col = 0; col < WIDTH; col++)
    {
        for(var row = 0; row < HEIGHT; row++)
        {
            surface.drawImage(tileSprite, col * TILESIZE, row * TILESIZE);
        }
    }
    //render the walls of the room
    for(var i = 0; i < gameRoom.wallGrid.length; i++)
    {
        surface.drawImage(wallSprite,
                        gameRoom.wallGrid[i][0] * TILESIZE,
                        gameRoom.wallGrid[i][1] * TILESIZE);
    }
}

function renderObjects(room, objectLayer)
{
	for(var i = 0; i < room.objects.length; i++)
	{
		if(room.objects[i].layerCode == objectLayer)
		{
			surface.drawImage(room.objects[i].img,
							(room.objects[i].x - 1) * TILESIZE,
							(room.objects[i].y - 1) * TILESIZE);
		}
	}
}
//end of new render code