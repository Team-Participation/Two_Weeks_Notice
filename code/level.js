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









var backgroundSpriteSheet = new Image();
backgroundSpriteSheet.src = "assets/background/newSpriteSheet.png";


room.prototype.drawBG = function() {
	for(var row = 0; row < this.BGArray.length; row++)
	{
		for(var col = 0; col < this.BGArray[row].length; col++)
		{
			for(var i = 0; i < this.BGArray[row][col].length; i++)
			{
				//console.log("sx: ", (this.BGArray[row][col][i] % 10));
				//console.log("sy: ", (Math.floor(this.BGArray[row][col][i] / 10)));
				game.context.drawImage(backgroundSpriteSheet,
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
			game.context.drawImage(backgroundSpriteSheet,
						(this.BGArray[this.tallBG[i][1]][this.tallBG[i][0]][j] % 10) * this.tileSize,
						Math.floor(this.BGArray[this.tallBG[i][1]][this.tallBG[i][0]][j] / 10) * this.tileSize,
						this.tileSize, this.tileSize,
						this.tallBG[i][0] * this.tileSize, this.tallBG[i][1] * this.tileSize,
						this.tileSize, this.tileSize);
		}
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
	goldFish.aimg = new Image();
	goldFish.oimg = new Image();
    goldFish.img.src = "assets/background/goldfish.png";
	goldFish.aimg.src = "assets/background/goldfishA.png";
	goldFish.oimg.src = "assets/background/goldfish.png";
    goldFish.id = "goldFish";
    goldFish.lookText = "Unprocessed fishsticks.";
    goldFish.canTake = true;
    goldFish.takeText = "You picked up the goldfish.";
    goldFish.failTake = null;
    goldFish.canSpeak = false;
    goldFish.failSpeak = "It stares back with a blank expression.";
    goldFish.canUse = false;
    goldFish.usedWith = null;

    goldFish.x = 6;
    goldFish.y = 7;
    goldFish.width = 1;
    goldFish.height = 1;

    goldFish.z = 2;
    goldFish.tileID = 124;
    goldFish.tileIDalt = 125;

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

    waterCooler.spcUse = function()
    {
      waterCooler.altState = true;
      delete firstRoom.BGArray[waterCooler.y][waterCooler.x][waterCooler.z];
      firstRoom.BGArray[waterCooler.y][waterCooler.x][waterCooler.z] = waterCooler.tileIDalt;
    }

    waterCooler.x = 9;
    waterCooler.y = 8;
    waterCooler.width = 1;
    waterCooler.height = 2;

    waterCooler.z = 2;
    waterCooler.tileID = 125;
    waterCooler.tileIDalt = 126;

    this.objects.push(waterCooler);

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
    reception.x = 7;
    reception.y = 5;
    reception.width = 1;
    reception.height = 2;

    this.objects.push(reception);
}
