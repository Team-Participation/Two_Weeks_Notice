/* tiles are set so that when each tile is a square, the aspect
 * ratio is 16*9. This is just temporary.
 */
const TILESIZE = 48;
const HEIGHT = 18;
const WIDTH = 32;
//this is how many frames it takes to move 1 tile
const MOVETIME = 15;

//item array will be populated with these.
function Item ()
{
    //0 = not picked up, 1 = in inventory, 2 = used.
    this.state = 0;
    this.name = "Unnamed Item";
    //where in the room the item is located before being picked up
    this.location = [1,1];
    this.sprite = new Image();
    //this is the image that will appear in your inventory when you have the item
    this.sprite = "img/defaultItem.png";
}

// a class to contain all the info of the current room
function Room ()
{
    this.wallGrid = createWalls();
    this.items = [];
    this.gameObjects = [];
    this.interactions = [];
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

//interactions are anything that brings up text(items, talking, etc).
function Interaction ()
{
    this.dialogue = "This interaction has no dialogue";
    //-1 means no item, otherwise it's the array location of the item.
    this.getItem = 1;
    this.useItem = 1;
    //the tile location of the interaction.
    this.location = [1,1];
}

/* objects in the game, like desks or a water cooler.
 * unlike events, they have collision.
 */
function gameObject ()
{
    //objects don't need to have dialogue, but they can
    this.dialogue = null;
    /* 2D array for collision. First is x coord, then y coord.
     * The outer array contains each square of collision.
     * By default it's just 1 square.
     *
     * I did it this way instead of just a 1D array that just has
     * the dimensions, like 2 by 4, so that objects don't have to
     * be squares.
     *
     * example of setting a 2 by 2 object named desk:
     * var desk = new Object();
     * desk.collision = [[1,1], [1,2], [2,1], [2,2]];
     */
    this.collision = [[1,1]];
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
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

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

setInterval(update, 16.67);

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
            break
        case 38: // up
        case 87: // w
            if(upPressed == false)
            {
                upPressed = true;
            }
            break
        case 40: // down
        case 83: // s
            if(downPressed == false)
            {
                downPressed = true;
            }
            break
    }
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










