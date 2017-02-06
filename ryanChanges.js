//start of new render code
function render(room)
{
	//make sure render functions are in order of what appears on top of what
    surface.clearRect(0, 0, canvas.width, canvas.height);
    //draws the floor tiles & walls
    renderBackground();
	//each renderObjects function renders a different layer of objects(NPC, item, obstacle)
	renderObjects(gameRoom, 1);
	renderObjects(gameRoom, 2);
	renderObjects(gameRoom, 3);
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
							room.objects[i].x,
							room.objects[i].y);
		}
	}
}
//end of new render code












//in gameobjects.js, add this last line of code to each object to put it into gameRoom.objects
//example of what goldfish is like:
var goldfish = new gameObject
{
	this.type = "goldfish";
	this.img = 'goldfish.png';
	this.layerCode = 2;
	this.lookText = 'Unprocessed fishsticks.';
	this.canTake = true;
	this.takeText = '...';
	this.failTake = null;
	this.canSpeak = false;
	this.failSpeak = 'It stares back with a blank expression.';
	this.canUse = false;
	this.usedWith = null;
	
	this.x = 15;
	this.y = 15;
	this.length = 1;
	this.height = 1;
	gameRoom.objects.push(this);//<-- add this 
}














//the room prototype is now this, replace the old one
function Room ()
{
    this.wallGrid = createWalls();
    this.objects[];
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
					if(playerNextPos[0] == room.objects[i].x ++ length &&
							playerNextPos[1] == room.objects[i].y ++ width)
					{
						return false;
					}
				}
			}
		}
	}	
	return true;
}












//new version of playerMovement function, replaces the old one
//player movement function, should be called every update
function playerMovement()
{
    /* the if statement stops the player from moving another tile if
     * they're already in the process of moving to another tile.
     * Player cannot move diagonally.
     */
    if(playerMoveTime == 0)
    {
        if(rightPressed && !leftPressed)
        {
            playerDirection = "right";
            if(wallCollision([playerX + 1, playerY], gameRoom.wallGrid) &&
				objectCollision([playerX + 1, playerY], gameRoom))
            {
                playerMoveTime = 1;
                playerX ++;
            }
        }
        else if(leftPressed && !rightPressed)
        {
            playerDirection = "left";
            if(wallCollision([playerX - 1, playerY], gameRoom.wallGrid) &&
				objectCollision([playerX - 1, playerY], gameRoom))
            {
                playerMoveTime = 1;
                playerX --;
            }
        }
        else if(downPressed && !upPressed)
        {
            playerDirection = "down";
            if(wallCollision([playerX, playerY + 1], gameRoom.wallGrid) &&
				objectCollision([playerX, playerY + 1], gameRoom))
            {
                playerMoveTime = 1;
                playerY ++;
            }
        }
        else if(upPressed && !downPressed)
        {
            playerDirection = "up";
            if(wallCollision([playerX, playerY - 1], gameRoom.wallGrid) &&
				objectCollision([playerX, playerY - 1], gameRoom))
            {
                playerMoveTime = 1;
                playerY --;
            }
        }
    }
    else
    {
        //if moving, advances the movement to the next tile each frame
        playerMoveTime ++;
        if(playerMoveTime == MOVETIME)
        {
            playerMoveTime = 0;
        }
    }
}