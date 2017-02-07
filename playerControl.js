
var playerX = 10;
var playerY = 10;
/* the direction the player is facing: "up", "down", "left", or "right"
 * seems like this could be used a lot so I'm just gonna make it simple
 * and easy to use instead of using an int or something.
 */
var playerDirection = "down";
var playerMoving = false;
var playerMoveTime = 0;

//input stuff
var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;
var examineActive = true;
var interactActive = false;
var speakActive = false;

//player sprites
var playerUpSprite = new Image();
playerUpSprite.src = "img/playerUp.png";
var playerDownSprite = new Image();
playerDownSprite.src = "img/playerDown.png";
var playerLeftSprite = new Image();
playerLeftSprite.src = "img/playerLeft.png";
var playerRightSprite = new Image();
playerRightSprite.src = "img/playerRight.png";

function onKeyDown(event)
{
    switch(event.keyCode)
    {
        case 37: // left
        case 65: // a
            if(leftPressed == false)
            {
                leftPressed = true;
            }
            break;
        case 39: // right
        case 68: // d
            if(rightPressed == false)
            {
                rightPressed = true;
            }
            break;
        case 38: // up
        case 87: // w
            if(upPressed == false)
            {
                upPressed = true;
            }
            break;
        case 40: // down
        case 83: // s
            if(downPressed == false)
            {
                downPressed = true;
            }
            break;
		case 49: // 1 on the keyboard
			if (examineActive == false)
			{
				examineActive = true;
				interactActive = false;
				speakActive = false;
				console.log("Examine Active");
			}
			break;
		case 50: // 2 on the keyboard
			if (interactActive == false)
			{
				interactActive = true;
				examineActive = false;
				speakActive = false;
				console.log("Interact Active");
			}
			break;
	    case 51: // 3 on the keyboard
			if (speakActive == false)
			{
				speakActive = true;
				interactActive = false;
				examineActive = false;
				console.log("Speak Active");
			}
			break;
		case 27:
		{
			console.log("Entering menu from game...");
			//surface.clearRect(0, 0, canvas.width, canvas.height);
			//clearInterval(updateIval);
			//clearInterval(update);
			changeState(0);

		}
    }
}

function onClick(e) // Needs to be fixed for different window sizes
{
	var mouseX = Math.floor((e.clientX - 20) / TILESIZE) + 1;
	var mouseY = Math.floor((e.clientY - 20) / TILESIZE) + 1;


	for (i = 0; i < gameRoom.objects.length; i++){
		console.log(gameRoom.objects[i].x);
		if (gameRoom.objects[i].x == mouseX && gameRoom.objects[i].y == mouseY){
			if (examineActive){
				examineAction(gameRoom.objects[i]);
			} else if (interactActive){
				interactAction(gameRoom.objects[i]);
			} else if (speakActive){
				speakAction(gameRoom.objects[i]);
			}
		}

	}
	//alert(mouseX + "  " + mouseY);
}

function examineAction(obj){

	console.log(obj.lookText);
	return obj.lookText;

}

function interactAction(obj){
	if (obj.canTake) // If the object is an inventory item, it will be taken
  {
    inventory.push(obj); // or replace with better method than push
	console.log(obj.takeText);
    return obj.takeText; // "You took the _____"
	removeObject(obj);
  }
	else if (obj.canUse) // If the object is an interactable map object
	{
		// Under construction


	}
	else
	{
		console.log(obj.failTake);
		return obj.failTake; // on fail - ie; "It's stuck to the wall"
	}

}

function speakAction(obj){

	if (obj.canSpeak){ // If the object can be spoken too
		dialogueFunction(obj);
	}
	else{
		console.log(obj.failSpeak);
		return obj.failSpeak;
	}

}

//function that deals with removing an object from the game screen and deleting it from arrays and what not
//under construction
function removeObject(obj){

}

//Function that handles the dialogue of talking to someone
function dialogueFunction(obj){

}

function onKeyUp(event)
{
    switch(event.keyCode)
    {
        case 37: // left
        case 65: // a
            leftPressed = false;
            break;
        case 39: // right
        case 68: // d
            rightPressed = false;
            break;
        case 38: // up
        case 87: // w
            upPressed = false;
            break;
        case 40: // down
        case 83: // s
            downPressed = false;
            break;
    }
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
