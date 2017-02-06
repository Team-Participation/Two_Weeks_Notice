/* tiles are set so that when each tile is a square, the aspect
 * ratio is 16*9. This is just temporary.
 */
const TILESIZE = 48;
const HEIGHT = 18;
const WIDTH = 32;
//this is how many frames it takes to move 1 tile
const MOVETIME = 15;
const error = 0;

function inventory(){
    this.slots = new inventorySlot(11);
    this.pickUpItm = function(itemObj) {
        var itemStored = this.slots.findIndex(function(inventorySlot){return inventorySlot.item.name == itemObj.name});
        if(itemStored == -1){
            var emptySlot = this.slots.findIndex(function(inventorySlot){return inventorySlot.item === null});
            if(emptySlot == -1){
                console.log("Inventory Full");
                return false;
            }else{
                this.slots(emptySlot).item = itemObj;
                return true;
            }
        }else{
            this.slots(itemStored).quantity++;
            return true;
        }
    };
    this.checkMoveItm = function(slotSel, slotRem) {
        if(slot < 0 || slot > 11){
            error = 221; //error code for surpassing allowed inventory size
            console.log("surpassed allowed inventory size");
            return false;
        }else if(this.slots(slotSel).item === null || this.slots(slotSel).item == this.slots(slotRem).item){
            return true;
        }else{
            return false;
        }
    };
    this.moveItm = function(slotSel, slotRem) {
        if(slot < 0 || slot > 11){
            error = 221; //error code for surpassing allowed inventory size
            console.log("surpassed allowed inventory size");
            return false;
        }else if(slotSel == slotRem){
            return true;
        }else if(this.slots(slotSel).item === null){
            this.slots(slotSel) = this.slots(slotRem);
            this.slots(slotRem).reset();
        }else if(this.slots(slotSel).item !== null){
            this.tempSlot = this.slots(slotSel);
            this.slots(slotSel) = this.slots(slotRem);
            this.slots(slotRem) = this.tempSlot;
        }
    };
}

function inventorySlot(){
    this.item = null;
    this.quantity = 0;
    this.reset = function() {
        this.item = null;
        this.quantity = 0;
    };

}

// a class to contain all the info of the current room

function Room ()
{
	this.wallGrid = createWalls();
	this.npcs = []; // NPC layer
	this.items = []; // Foreground collectable items that have no collision can be placed on obstacles
	this.obstacles = []; // Foreground objects such as tables that have collision
	this.bgtiles = []; // Floor tiles, no collision
	this.special = []; // as needed
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

function gameObject ()
{
	this.img = "img.png"
	this.layerCode = 0; // for sorting into draw layer
				// 1 = NPC, 2 = Items, 3 = Obstacles, 4 = Background, 5 = Special
	this.lookText = ""; // text to display when inspected
	this.canTake = false; // whether it will be collected into inventory when used with hand cursor
	this.takeText = ""; // text for taking
	this.failTake = ""; // text if can't take
	this.canSpeak = false; // whether you can talk to it
	this.failSpeak = ""; // "Chairs can't talk"
	this.canUse = false; // whether it can be used as a stationary object without taking into inventory - like opening a door
	this.usedWith = []; // inventory items that can be used on this object
	this.dialogue = []; // dialogue tree if can be spoken to

	this.x = 999;
	this.y = 999;
	this.length = 999;
	this.height = 999;
}

var playerX = 10;
var playerY = 10;
/* the direction the player is facing: "up", "down", "left", or "right"
 * seems like this could be used a lot so I'm just gonna make it simple
 * and easy to use instead of using an int or something.
 */
var playerDirection = "down";
var playerMoving = false;
var playerMoveTime = 0;
/* items the player has are stored here. For this example the player can
 * hold 3 items
 */
var playerInventory = [false, false, false];

//input stuff
var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;
var examineActive = false;
var interactActive = false;
/*var movementActive = false;*/
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.addEventListener("click", onClick);

//rendering stuff
var canvas = document.querySelector("canvas");
canvas.width = 1536;
canvas.height = 864;
var surface = canvas.getContext("2d");

//background sprites
var tileSprite = new Image();
tileSprite.src = "img/tile.png";
var wallSprite = new Image();
wallSprite.src = "img/wall.png";
//player sprites
var playerUpSprite = new Image();
playerUpSprite.src = "img/playerUp.png";
var playerDownSprite = new Image();
playerDownSprite.src = "img/playerDown.png";
var playerLeftSprite = new Image();
playerLeftSprite.src = "img/playerLeft.png";
var playerRightSprite = new Image();
playerRightSprite.src = "img/playerRight.png";

//initializing the room
var gameRoom = new Room();

//setInterval(update, 16.67);

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
    }
}

function onClick(e)
{
	var mouseX = Math.floor((e.clientX - 132) / TILESIZE);
	var mouseY = Math.floor((e.clientY - 20) / TILESIZE) + 1;


	for (i = 0; i < lengthOfArray; i++){
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

function update()
{
    playerMovement();
    render();
}

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
            if(wallCollision([playerX + 1, playerY], gameRoom.wallGrid))
            {
                playerMoveTime = 1;
                playerX ++;
            }
        }
        else if(leftPressed && !rightPressed)
        {
            playerDirection = "left";
            if(wallCollision([playerX - 1, playerY], gameRoom.wallGrid))
            {
                playerMoveTime = 1;
                playerX --;
            }
        }
        else if(downPressed && !upPressed)
        {
            playerDirection = "down";
            if(wallCollision([playerX, playerY + 1], gameRoom.wallGrid))
            {
                playerMoveTime = 1;
                playerY ++;
            }
        }
        else if(upPressed && !downPressed)
        {
            playerDirection = "up";
            if(wallCollision([playerX, playerY - 1], gameRoom.wallGrid))
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

function render(room)
{
    surface.clearRect(0, 0, canvas.width, canvas.height);
    //draws the floor tiles
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
    //draw the player
    renderPlayer();

}

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

//Menu part start here
var stage = document.getElementById("gameScreen");
var states = [{enter: enterMenu, update: updateMenu, exit: exitMenu},
			  {enter: enterGame, update: updateGame, exit: exitGame},
			  {enter: enterHelp, update: updateHelp, exit: exitHelp},
			  {enter: enterOption, update: updateOption, exit: exitOption},];
var lastState = -1;
var currState = -1;

var buttons = [{img:"img/StartN.png", imgO:"img/StartH.png", x:676, y:144, w:184, h:72, over:false, click:onStartClick}, // Start button
			   {img:"img/OptionN.png", imgO:"img/OptionH.png", x:656, y:288, w:224, h:72, over:false, click:onOptionClick},
			   {img:"img/HelpN.png", imgO:"img/HelpH.png", x:692, y:432, w:152, h:72, over:false, click:onHelpClick}, // Help button
			   {img:"img/ExitN.png", imgO:"img/ExitH.png", x:692, y:576, w:152, h:72, over:false, click:onExitClick},]


var activeBtns = [];
var numAssets = 8;
var assetsLoaded = 0;

var mouse = {x:0, y:0};

const fps = 30; // or 60. The game's set frame rate all update functions will run at.
const fpsMS = 1/fps*1000; // The frames per second as a millisecond interval.
var updateIval;

window.addEventListener("load", loadAssets);
canvas.addEventListener("mousemove", updateMouse);
canvas.addEventListener("click", onMouseClick);

function loadAssets(event)
{
	for (var i = 0; i < buttons.length; i++)
	{
		var tempBtn = new Image();
		tempBtn.src = buttons[i].img;
		tempBtn.addEventListener("load", onAssetLoad);
		buttons[i].img = tempBtn; // .img used to hold the path string, now it holds the actual image object.
		var tempBtnO = new Image();
		tempBtnO.src = buttons[i].imgO;
		tempBtnO.addEventListener("load", onAssetLoad);
		buttons[i].imgO = tempBtnO;
	}
}

function onAssetLoad(event)
{
	if (++assetsLoaded == numAssets)
		initGame();
}

function initGame()
{
	changeState(0); // Change to menu state.
}

function changeState(stateToRun)
{
	if (stateToRun >= 0 && stateToRun < states.length)
	{
		if (currState >= 0)
		{
			clearInterval(updateIval);
			states[currState].exit();
		}
		lastState = currState;
		currState = stateToRun;
		states[currState].enter();
		updateIval = setInterval(states[currState].update, fpsMS);
	}
	else
		console.log("Invalid stateToRun!");
}

function enterMenu()
{
	console.log("Entering menu state.");
	stage.style.backgroundColor = "cyan";
	activeBtns = [ buttons[0], buttons[1], buttons[2], buttons[3] ];
}

function updateMenu()
{
	console.log("In menu state.");
	checkButtons();
	renderMenu();
}

function exitMenu()
{
	console.log("Exiting menu state.");
}

function enterGame()
{
	console.log("Entering game state.");
	//activeBtns = [ buttons[3] ];
}

function updateGame()
{
	console.log("In game state.");
	playerMovement();
	//checkButtons();
	render();
}

function exitGame()
{
	console.log("Exiting game state.");
}

function enterHelp()
{
	console.log("Entering help state.");
	activeBtns = [ buttons[3] ];
}

function updateHelp()
{
	console.log("In help state.");
	checkButtons();
	renderMenu();
}

function exitHelp()
{
	console.log("Exiting help state.");
}

function enterOption()
{
	console.log("Entering option state.");
	activeBtns = [ buttons[3] ];
}

function updateOption()
{
	console.log("In option state.");
	checkButtons();
	renderMenu();
}

function exitOption()
{
	console.log("Exiting option state.");
}

function checkButtons()
{
	for (var i = 0; i < activeBtns.length; i++)
	{
		activeBtns[i].over = false;
		if(!(mouse.x < activeBtns[i].x ||
			 mouse.x > activeBtns[i].x+activeBtns[i].w ||
			 mouse.y < activeBtns[i].y ||
			 mouse.y > activeBtns[i].y+activeBtns[i].h))
		{
			activeBtns[i].over = true; // If our mouse is inside the button box, flip the over flag to true.
		}
	}
}

function onMouseClick()
{
	for (var i = 0; i < activeBtns.length; i++)
	{
		if (activeBtns[i].over == true)
		{
			activeBtns[i].click();
			break;
		}
	}
}

function renderMenu()
{
	surface.clearRect(0, 0, canvas.width, canvas.height);
	document.body.style.cursor = "default";
	for (var i = 0; i < activeBtns.length; i++)
	{
		if (activeBtns[i].over == true)
		{
			surface.drawImage(activeBtns[i].imgO, activeBtns[i].x, activeBtns[i].y);
			document.body.style.cursor = "pointer";
		}
		else
			surface.drawImage(activeBtns[i].img, activeBtns[i].x, activeBtns[i].y);
	}
}

function onStartClick()
{
	changeState(1);
	/*
	if (currState == 1)
	{
		surface.clearRect(0, 0, canvas.width, canvas.height);
		clearInterval(updateIval);
		setInterval(update, 16,67);
		renderTools();
	}*/
}

function onHelpClick()
{
	changeState(2);
}

function onOptionClick()
{
	changeState(3);
}

function onExitClick()
{
	if(currState == 0)
		window.close();
	else
	changeState(0);
}

function updateMouse(event)
{
	var rect = canvas.getBoundingClientRect();
	mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
}
//Menu part ends here
/*window.addEventListener("pause", exitInGame);

function exitInGame(event)
{
	if(event.keyCode == 27)
	{
		alert("ESC");
		changeState(0);
	}
}*/
