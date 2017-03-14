// a class to contain all the info of the current room

function room ()
{
    this.height = 18;
    this.width = 32;
    this.tileSize = 48;

    this.tileSprite;
    this.wallSprite;

    this.walls = [];
    this.objects = [];
}

//background sprites
room.prototype.initSprites = function() {

    this.tileSprite = new Image();
    this.tileSprite.src = "assets/background/tile.png";
    this.wallSprite = new Image();
    this.wallSprite.src = "assets/background/wall.png";
}

//function that walls in the area so that the player can't walk off screen
room.prototype.createWalls = function() {
    
    for(var col = 0; col < this.width; col++)
    {
        for(var row = 0; row < this.height; row++)
        {
            //col + 1 because coords aren't 0-indexed
            if(col + 1 == 1 || col + 1 == this.width)
            {
                this.walls.push([col, row]);
            }
            else if(row + 1 == 1 || row + 1 == this.height)
            {
                this.walls.push([col, row]);
            }
        }
    }
}

room.prototype.drawRoom = function() {

    for(var col = 0; col < this.width; col++)
    {
        for(var row = 0; row < this.height; row++)
        {
            game.context.drawImage(this.tileSprite, col * this.tileSize, row * this.tileSize);
        }
    }
    //render the walls of the room
    for(var i = 0; i < this.walls.length; i++)
    {
        game.context.drawImage(this.wallSprite,
                               this.walls[i][0] * this.tileSize,
                               this.walls[i][1] * this.tileSize);
    }
}

room.prototype.drawObjects = function(objectLayer) {
    for(var i = 0; i < this.objects.length; i++)
    {
        if(this.objects[i].layerCode == objectLayer)
        {
            game.context.drawImage(this.objects[i].img,
                                   (this.objects[i].x) * this.tileSize,
                                   (this.objects[i].y) * this.tileSize);
        }
    }
}

room.prototype.onObject = function(playerPos) {
    
    for(var i = 0; i < this.objects.length; i++)
    {
        //if statement to skip items, since they don't have collision
        var width = this.objects[i].colwidth == 1 ? 0 : this.objects[i].colwidth - 1;
        var height = this.objects[i].colheight == 1 ? 0 : this.objects[i].colheight - 1;

        if (playerPos[0] <= this.objects[i].x  + width &&
            playerPos[0] >= this.objects[i].x &&
            playerPos[1] <= this.objects[i].y + height &&
            playerPos[1] >= this.objects[i].y) {
            return true;
        }
    }
    return false;
}

/* function returns false if the player bumps into a wall
 * playerNextPos needs to be an array containing the coords
 * of the tile the player is tring to move to
 */
room.prototype.wallCollision = function(playerNextPos){
    
    for(var i = 0; i < this.walls.length; i++)
    {
        if(playerNextPos[0] == this.walls[i][0] && playerNextPos[1] == this.walls[i][1])
        {
            return false;
        }
    }
    return true;
}

//new function objectCollision, can just be placed under the wallCollision function
//true = can move, false = cannot move
room.prototype.objectCollision = function(playerNextPos) {
    
    //check for each object in the current room
    for(var i = 0; i < this.objects.length; i++)
    {
        //if statement to skip items, since they don't have collision
        if(this.objects[i].layerCode == 2 || this.objects[i].layerCode == 3)
        {
            
            var width = this.objects[i].colwidth == 1 ? 0 : this.objects[i].colwidth - 1;
            var height = this.objects[i].colheight == 1 ? 0 : this.objects[i].colheight - 1;
            
            if (playerNextPos[0] <= this.objects[i].colx  + width &&
                playerNextPos[0] >= this.objects[i].colx &&
                playerNextPos[1] <= this.objects[i].coly + height &&
                playerNextPos[1] >= this.objects[i].coly) {
                return false;
            }
        }
    }
    return true;
}

room.prototype.initObjects = function() {
    var goldFish = new Object();
    goldFish.img = new Image();
    goldFish.img.src = "assets/background/goldfish.png";
    goldFish.id = "goldFish";
    goldFish.layerCode = 3;
    goldFish.lookText = "Unprocessed fishsticks.";
    goldFish.canTake = true;
    goldFish.takeText = "...";
    goldFish.failTake = null;
    goldFish.canSpeak = false;
    goldFish.failSpeak = "It stares back with a blank expression.";
    goldFish.canUse = false;
    goldFish.usedWith = null;

    goldFish.x = 15;
    goldFish.y = 6;
    goldFish.width = 1;
    goldFish.height = 1;
    
    goldFish.colx = 15;
    goldFish.coly = 6;
    goldFish.colwidth = 1;
    goldFish.colheight = 1;
    
    this.objects.push(goldFish);
    

    var waterCooler = new Object();
    waterCooler.img = new Image();
    waterCooler.img.src = "assets/background/watercooler.png";
    waterCooler.id = "waterCooler";
    waterCooler.imgAlt = "watercoolerAlt.png";
    waterCooler.layerCode = 2;
    waterCooler.lookText = "For making uncomfortable small talk.";
    waterCooler.canTake = false;
    waterCooler.takeText = null;
    waterCooler.failTake = null;
    waterCooler.canSpeak = false;
    waterCooler.failSpeak = "It doesn't speak. Watercooler conversations suck anyway.";
    waterCooler.canUse = false;
    waterCooler.usedWith = ["goldfish"];
    waterCooler.altState = false;

    waterCooler.x = 1;
    waterCooler.y = 11;
    waterCooler.width = 1;
    waterCooler.height = 2;
    waterCooler.colx = 1;
    waterCooler.coly = 12;
    waterCooler.colwidth = 1;
    waterCooler.colheight = 1;
   
    this.objects.push(waterCooler);

    var receptionDesk = new Object();
    receptionDesk.img = new Image();
    receptionDesk.img.src = "assets/background/reception_desk.png";
    receptionDesk.id = "receptionDesk";
    receptionDesk.layerCode = 2;
    receptionDesk.lookText = "A mighty fine desk.";
    receptionDesk.canTake = false;
    receptionDesk.takeText = null;
    receptionDesk.failTake = null;
    receptionDesk.canSpeak = false;
    receptionDesk.failSpeak = "It doesn't speak.";
    receptionDesk.canUse = false;
    receptionDesk.usedWith = null;

    receptionDesk.x = 13;
    receptionDesk.y = 6;
    receptionDesk.width = 3;
    receptionDesk.height = 1;
    
    receptionDesk.colx = 13;
    receptionDesk.coly = 6;
    receptionDesk.colwidth = 3;
    receptionDesk.colheight = 1;
    
    this.objects.push(receptionDesk);
    
    var reception = new Object();
    reception.img = new Image();
    reception.img.src = "assets/background/reception.png";
    reception.id = "reception";
    reception.layerCode = 1;
    reception.lookText = "I could look at that all day.";
    reception.canTake = false;
    reception.takeText = null;
    reception.failTake = null;
    reception.canSpeak = true;
    reception.failSpeak = null;
    reception.canUse = true;
    reception.usedWith = null;
    reception.dialogue = [];
    reception.dialogue[0] = {	text: "What do you want?",
                             options:	[	{	reply: "How's your day?", next: 1},
                                         { reply: "You, in the back seat of my Corolla.", next: 2}
                                        ]
                            };
    reception.dialogue[1] = {	text: "Whatever."};
    reception.dialogue[2] = {	text: "In your dreams, creep.",
                             options:	[	{	reply: "Feelsbadman.", next: 1},
                                         { reply: "Been there, done that.", next: 3}
                                        ]
                            };
    reception.dialogue[3] = {	text: "Like, eww."};
    reception.x = 14;
    reception.y = 5;
    reception.width = 1;
    reception.height = 2;
    
    reception.colx = 14;
    reception.coly = 6;
    reception.colwidth = 1;
    reception.colheight = 1;
    this.objects.push(reception);
}
