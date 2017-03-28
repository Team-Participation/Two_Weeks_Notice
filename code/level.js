// a class to contain all the info of the current room
function room ()
{
    this.height = 18;
    this.width = 32;
    this.tileSize = 32;

    this.tileSprite;
    this.wallSprite;

    this.walls = [];
    this.objects = [];
}

var backgroundSpriteSheet = new Image();
backgroundSpriteSheet.src = "assets/background/tileset.png";

//taking sprites from a sheet takes more lines of code so I'm using a class & function for drawing sprites
function sprite(x, y) {
	this.sx = x * 32;
	this.sy = y * 32;
	this.swidth = 32;
	this.sheight = 32;
	//spriteType says which sprite sheet to load from
	this.spriteType = "background";
}

//more cases can be added to the switch statement when there are more sprite sheets
sprite.prototype.draw = function(x, y) {
	switch(this.spriteType)
	{
		case "background":
			game.context.drawImage(backgroundSpriteSheet, 
					this.sx, this.sy, this.swidth, this.sheight, x, y);
			break;
	}
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


room.prototype.initBackground = function()
{
	//numbered sprites without any special instructions are just top to bottom
	wallBaseSprite = new sprite(0, 14);
	wallMidSprite = new sprite(0, 13);
	wallTopSprite = new sprite(0, 12);
	doorBaseSprite = new sprite(1, 14);
	doorMidSprite = new sprite(1, 13);
	doorTopSprite = new sprite(1, 12);
	floorSprite = new sprite(0, 15);
	/*window goes like this:
	 * 1 2 3
	 * 4 5 6
	 */
	window1Sprite = new sprite(2, 12);
	window2Sprite = new sprite(3, 12);
	window3Sprite = new sprite(4, 12);
	window4Sprite = new sprite(2, 13);
	window5Sprite = new sprite(3, 13);
	window6Sprite = new sprite(4, 13);
	
	//grey floor sprites
	wall2BaseSprite = new sprite(4, 14);
	floor2Sprite = new sprite(4, 15);
	
	//desk objects
	phoneUpSprite = new sprite(0, 9);
	phoneLeftSprite = new sprite(0, 10);
	phoneRightSprite = new sprite(0, 11);
	computerDownSprite = new sprite(1, 9);
	computerLeft1Sprite = new sprite(1, 10);
	computerLeft2Sprite = new sprite(1, 11);
	computerRight1Sprite = new sprite(2, 10);
	computerRight2Sprite = new sprite(2, 11);
	angledMonitor1Sprite = new sprite(3, 10);
	angledMonitor2Sprite = new sprite(3, 11);
	deskPlantSprite = new sprite(2, 9);
	deskLampSprite = new sprite(3, 9);
	fishBowlSprite = new sprite(4, 9);
	emptyFishBowlSprite = new sprite(4, 10);
	coffeMakerSprite = new sprite(5, 9);
	microwaveSprite = new sprite(6, 9);
	cactusSprite = new sprite(2, 8);
	
	//chairs
	lobbyChairDown1Sprite = new sprite(4, 7);
	lobbyChairDown2Sprite = new sprite(4, 8);
	lobbyChairUp1Sprite = new sprite(5, 7);
	lobbyChairUp2Sprite = new sprite(5, 8);
	lobbyChairLeft1Sprite = new sprite(6, 7);
	lobbyChairLeft2Sprite = new sprite(6, 8);
	lobbyChairRight1Sprite = new sprite(7, 7);
	lobbyChairRight2Sprite = new sprite(7, 8);
	spinChairRightSprite = new sprite(8, 7);
	spinChairLeftSprite = new sprite(8, 8);
	spinChairDownSprite = new sprite(9, 7);
	spinChairUpSprite = new sprite(9, 8);
	bossChair1Sprite = new sprite(10, 7);
	bossChair2Sprite = new sprite(10, 8);
	toilet1Sprite = new sprite(11, 7);
	toilet2Sprite = new sprite(11, 8);
	
	//misc. objects
	extinguisherSprite = new sprite(7, 9);
	recycle1Sprite = new sprite(3, 7);
	recycle2Sprite = new sprite(3, 8);
	trashCanSprite = new sprite(2, 7);
	tree1Sprite = new sprite(0, 7);
	tree2Sprite = new sprite(0, 8);
	fern1Sprite = new sprite(1, 7);
	fern2Sprite = new sprite(1, 8);
	
	//furniture
	leftCabinet1Sprite = new sprite(0, 5);
	leftCabinet2Sprite = new sprite(0, 6);
	midCabinet1Sprite = new sprite(1, 5);
	midCabinet2Sprite = new sprite(1, 6);
	rightCabinet1Sprite = new sprite(2, 5);
	rightCabinet2Sprite = new sprite(2, 6);
	cabinetSink1Sprite = new sprite(3, 5);
	cabinetSink2Sprite = new sprite(3, 6);
	cabinetStove1Sprite = new sprite(4, 5);
	cabinetStove2Sprite = new sprite(4, 6);
	fridge1Sprite = new sprite(5, 5);
	fridge2Sprite = new sprite(5, 6);
	snackMachine1Sprite = new sprite(6, 5);
	snackMachine2Sprite = new sprite(6, 6);
	drinkMachine1Sprite = new sprite(7, 5);
	drinkMachine2Sprite = new sprite(7, 6);
	//bookshelf 1, 2 & 3 is one shelf, 4, 5 & 6 is the other shelf
	bookshelf1Sprite = new sprite(8, 4);
	bookshelf2Sprite = new sprite(8, 5);
	bookshelf3Sprite = new sprite(8, 6);
	bookshelf4Sprite = new sprite(9, 4);
	bookshelf5Sprite = new sprite(9, 5);
	bookshelf6Sprite = new sprite(9, 6);
	/* wood table goes like this:
	 * 1 2 3
	 * 4 5 6
	 * 7 8 9
	 */
	woodTable1Sprite = new sprite(9, 0);
	woodTable2Sprite = new sprite(10, 0);
	woodTable3Sprite = new sprite(11, 0);
	woodTable4Sprite = new sprite(9, 1);
	woodTable5Sprite = new sprite(10, 1);
	woodTable6Sprite = new sprite(11, 1);
	woodTable7Sprite = new sprite(9, 2);
	woodTable8Sprite = new sprite(10, 2);
	woodTable9Sprite = new sprite(11, 2);
	/* glass table goes like this:
	 * 1 2
	 * 3 4
	 */
	glassTable1Sprite = new sprite(4, 2);
	glassTable2Sprite = new sprite(5, 2);
	glassTable3Sprite = new sprite(4, 3);
	glassTable4Sprite = new sprite(5, 3);
	/* photocopier goes like this:
	 * 1 2
	 * 3 4
	 */
	photocopier1Sprite = new sprite(4, 0);
	photocopier2Sprite = new sprite(5, 0);
	photocopier3Sprite = new sprite(4, 1);
	photocopier4Sprite = new sprite(5, 1);
	/* cubicle goes like this(does not include right wall because it has a repeating texture)
	 * 1  2  3
	 * 4  5  6
	 * 7  8  9
	 * 10
	 */
	cubicle1Sprite = new sprite(0, 0);
	cublicle2Sprite = new sprite(1, 0);
	cubicle3Sprite = new sprite(2, 0);
	cubicle4Sprite = new sprite(0, 1);
	cubicle5Sprite = new sprite(1, 1);
	cubicle6Sprite = new sprite(2, 1);
	cubicle7Sprite = new sprite(0, 2);
	cubicle8Sprite = new sprite(1, 2);
	cubicle9Sprite = new sprite(2, 2);
	cubicle10Sprite = new sprite(0, 3);
	cubicleRightWallSprite = new sprite(3, 1);
	cubicleRightWall2Sprite = new sprite(3, 2);
	cubicleRightwall3Sprite = new sprite(3, 3);
	//lamp desks have the same third tile as regular sideways cubicle desks
	sidewaysCubicleDesk1Sprite = new sprite(6, 0);
	sidewaysCubicleDesk2Sprite = new sprite(6, 1);
	sidewaysCubicleDesk3Sprite = new sprite(6, 2);
	lampDeskLeft1Sprite = new sprite(7, 0);
	lampDeskLeft2Sprite = new sprite(7, 1);
	lampDeskRight1Sprite = new sprite(8, 0);
	lampDeskRight2Sprite = new sprite(8, 1);
	//note: I didn't put in the grey cabinets in the top right
}	

room.prototype.initObjects = function() {
    var goldFish = new Object();
    goldFish.img = new Image();
	goldFish.aimg = new Image();
	goldFish.oimg = new Image();
    goldFish.img.src = "assets/background/goldfish.png";
	goldFish.aimg.src = "assets/background/goldfishA.png";
	goldFish.oimg.src = "assets/background/goldfish.png";
    goldFish.id = "goldFish";
    goldFish.layerCode = 3;
    goldFish.lookText = "Unprocessed fishsticks.";
    goldFish.canTake = true;
    goldFish.takeText = "You picked up the goldfish.";
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
    waterCooler.failTake = "It's too heavy for you to lift... let alone put in your bag.";
    waterCooler.canSpeak = false;
    waterCooler.failSpeak = "It doesn't speak. Watercooler conversations suck anyway.";
    waterCooler.canUse = false;
    waterCooler.usedWith = "goldFish";
	waterCooler.usedWithText = "You dropped the goldfish into the watercooler"
    waterCooler.altState = false;
	waterCooler.altLookText = "Fishy! Fishy! Wake up! Wake up!"

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
    receptionDesk.failTake = "Seriously? The desk...";
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
    reception.failTake = "I could get in trouble with HR if I do that.";
    reception.canSpeak = true;
    reception.failSpeak = null;
    reception.canUse = false;
    reception.usedWith = null;
	
	reception.diaText = "Receptionist: What do you want?";
	reception.diaText2 = "You:  O -- How's your day?  OR  P -- You in the backseat of my Corolla";
	reception.diaText3 = "Receptionist: Whatever.";
	reception.diaText4 = "Receptionist: In your dreams, creep.";
	reception.diaText5 = "You: U: Feelsbadman.  I: Been there, done that.";
	reception.diaText6 = "Receptionist: Like ewww...";
	
	
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













