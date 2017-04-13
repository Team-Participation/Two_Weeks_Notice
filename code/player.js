function Player() {
    this.x = 2;
    this.y = 4;
    this.hop = 32;
    this.time = 0;
    this.room = new room();
    this.onDoor = false;
    this.theDoor = {};

    this.direction = "down";
	  this.examineActive = true;
    this.interactActive = false;
    this.speakActive = false;

	  this.playerSpriteSheet = new Image();
	  this.playerSpriteSheet.src = "assets/sprites/char/Player.png";
    //this.playerUpSprite = new Image();
    //this.playerUpSprite.src = "assets/sprites/playerUp.png";
    //this.playerDownSprite = new Image();
    //this.playerDownSprite.src = "assets/sprites/playerDown.png";
    //this.playerLeftSprite = new Image();
    //this.playerLeftSprite.src = "assets/sprites/playerLeft.png";
    //this.playerRightSprite = new Image();
    //this.playerRightSprite.src = "assets/sprites/playerRight.png";
}

Player.prototype.update = function()
{
    if(this.time == 30)
    {
        this.time = 0;
    }
    else if(this.time != 0)
    {
        this.time++;
    }

    if (dlog.active) // overrides other inputs while active dialogue
    {
        if (dlog.id === null && keyHandler.lastKey !== null)
        {
            dlog.active = false;
            keyHandler.lastKey = null;
            dlog.Clear();
        }
        else
        {
            this.dlogAdvance();
        }
    }
    else if (cutScene.active)
    {
        cutScene.id.run();
    }
    else
    {
        CheckFlags();
        if (this.onDoor) // use door on appropriate directional input
        {
            switch (this.theDoor.dir)
            {
                case "up":
                if (keyHandler.isDown(keyHandler.UP) || keyHandler.isDown(keyHandler.UP2)) this.swapRoom(this.theDoor.target);
                break;
                case "down":
                if (keyHandler.isDown(keyHandler.DOWN) || keyHandler.isDown(keyHandler.DOWN2)) this.swapRoom(this.theDoor.target);
                break;
                case "left":
                if (keyHandler.isDown(keyHandler.LEFT) || keyHandler.isDown(keyHandler.LEFT2)) this.swapRoom(this.theDoor.target);
                break;
                case "right":
                if (keyHandler.isDown(keyHandler.RIGHT) || keyHandler.isDown(keyHandler.RIGHT2)) this.swapRoom(this.theDoor.target);
                break;
            }
        }
        if (this.time == 0)
            this.doorCheck();

        if (keyHandler.isDown(keyHandler.RIGHT) || keyHandler.isDown(keyHandler.RIGHT2)) this.moveRight();
        if (keyHandler.isDown(keyHandler.UP) || keyHandler.isDown(keyHandler.UP2)) this.moveUp();
        if (keyHandler.isDown(keyHandler.LEFT) || keyHandler.isDown(keyHandler.LEFT2)) this.moveLeft();
        if (keyHandler.isDown(keyHandler.DOWN) || keyHandler.isDown(keyHandler.DOWN2)) this.moveDown();

        if (keyHandler.isDown(keyHandler.EXAMINE)) this.examine();
        if (keyHandler.isDown(keyHandler.INTERACT)) this.interact();
        if (keyHandler.isDown(keyHandler.SPEAK)) this.speak();

        if (keyHandler.isDown(keyHandler.ITEM1)) Inventory(0);
        if (keyHandler.isDown(keyHandler.ITEM2)) Inventory(1);
        if (keyHandler.isDown(keyHandler.ITEM3)) Inventory(2);
        if (keyHandler.isDown(keyHandler.ITEM4)) Inventory(3);
        if (keyHandler.isDown(keyHandler.ITEM5)) Inventory(4);
        if (keyHandler.isDown(keyHandler.ITEM6)) Inventory(5);
        if (keyHandler.isDown(keyHandler.ITEM7)) Inventory(6);
    }
};

Player.prototype.doorCheck = function()
{
  for (var i = 0; i < game.player.room.doors.length; i++)
  {
    if (this.x == game.player.room.doors[i].x && this.y == game.player.room.doors[i].y)
    {
      this.onDoor = true;
      this.theDoor = game.player.room.doors[i];
    }
    else
    {
      this.onDoor = false;
      this.theDoor = {};
    }
  }
};

Player.prototype.moveRight = function() {
    if(this.time == 0){
        this.direction = "right";
        if(this.room.collision([this.x + 1, this.y]) && this.room.npcCollision([this.x + 1, this.y]))
        {
            this.x ++;
            this.time ++;
        }
    }
};

Player.prototype.moveLeft = function() {
    if(this.time == 0){
        this.direction = "left";
        if(this.room.collision([this.x - 1, this.y]) && this.room.npcCollision([this.x - 1, this.y]))
        {
            this.x --;
            this.time ++;
        }
    }
};

Player.prototype.moveDown = function() {
    if(this.time == 0){
        this.direction = "down";
        if(this.room.collision([this.x, this.y + 1]) && this.room.npcCollision([this.x, this.y + 1]))
        {
            this.y ++;
            this.time ++;
        }
    }
};

Player.prototype.moveUp = function() {
    if(this.time == 0){
        this.direction = "up";
        if(this.room.collision([this.x, this.y - 1]) && this.room.npcCollision([this.x, this.y - 1]))
        {
            this.y --;
            this.time ++;
        }
    }
};

Player.prototype.examine = function(){
	if (!this.examineActive && states.currentState == "game"){
		this.examineActive = true;
		this.interactActive = false;
		this.speakActive = false;
		console.log("Examine Active");
		deactivateItems();
		setTimeout(drawEye, 100);
		function drawEye()
		{
			invContext.clearRect(0, 0, 240, 80);
			invContext.drawImage(eyeA.img, 0, 0, 80, 80);
			invContext.drawImage(hand.img, 80, 0, 80, 80);
			invContext.drawImage(talk.img, 160, 0, 80, 80);
		}
	}
}

Player.prototype.interact = function(){
	if (!this.interactActive && states.currentState == "game"){
		this.examineActive = false;
		this.interactActive = true;
		this.speakActive = false;
		console.log("Interact Active");
		deactivateItems();
		setTimeout(drawHand, 100);
		function drawHand()
		{
			invContext.clearRect(0, 0, 240, 80);
			invContext.drawImage(eye.img, 0, 0, 80, 80);
			invContext.drawImage(handA.img, 80, 0, 80, 80);
			invContext.drawImage(talk.img, 160, 0, 80, 80);
		}
	}
}

Player.prototype.speak = function(){
	if (!this.speakActive && states.currentState == "game"){
		this.examineActive = false;
		this.interactActive = false;
		this.speakActive = true;
		console.log("Speak Active");
		deactivateItems();
		setTimeout(drawTalk, 100);
		function drawTalk()
		{
			invContext.clearRect(0, 0, 240, 80);
			invContext.drawImage(eye.img, 0, 0, 80, 80);
			invContext.drawImage(hand.img, 80, 0, 80, 80);
			invContext.drawImage(talkA.img, 160, 0, 80, 80);
		}
	}
}
/*
Player.prototype.onObject = function() {
    return this.room.onObject([this.x, this.y]);
};
*/

drawNPC = function(context, npc)
{
		if(npc.direction == "up")
		{
			if(npc.time != 0)
			{
				switch(Math.floor(npc.time / 15))
				{
					case 0:
						context.drawImage(npc.img, 32, 128, 32, 64, npc.x * TILESIZE, ((npc.y-1) - (npc.time / npc.totalTime)) * TILESIZE, 32, 64);
						break;
					case 1:
						context.drawImage(npc.img, 96, 128, 32, 64, npc.x * TILESIZE, ((npc.y-1) - (npc.time / npc.totalTime)) * TILESIZE, 32, 64);
						break;
					case 2:
						context.drawImage(npc.img, 96, 128, 32, 64, npc.x * TILESIZE, ((npc.y-1) - (npc.time / npc.totalTime)) * TILESIZE, 32, 64);
						break;
				}
			}
			else
			{
				context.drawImage(npc.img, 0, 128, 32, 64, npc.x * TILESIZE, (npc.y-1) * TILESIZE, 32, 64);
			}
		}
		else if(npc.direction == "down")
		{
			if(npc.time != 0)
			{
				switch(Math.floor(npc.time / 15))
				{
					case 0:
						context.drawImage(npc.img, 32, 192, 32, 64, npc.x * TILESIZE, ((npc.y-1) + (npc.time / npc.totalTime)) * TILESIZE, 32, 64);
						break;
					case 1:
						context.drawImage(npc.img, 96, 192, 32, 64, npc.x * TILESIZE, ((npc.y-1) + (npc.time / npc.totalTime)) * TILESIZE, 32, 64);
						break;
					case 2:
						context.drawImage(npc.img, 96, 192, 32, 64, npc.x * TILESIZE, ((npc.y-1) + (npc.time / npc.totalTime)) * TILESIZE, 32, 64);
						break;
				}
			}
			else
			{
				context.drawImage(npc.img, 0, 192, 32, 64, npc.x * TILESIZE, (npc.y-1) * TILESIZE, 32, 64);
			}
		}
		else if(npc.direction == "right")
		{
			if(npc.time != 0)
			{
				switch(Math.floor(npc.time / 15))
				{
					case 0:
						context.drawImage(npc.img, 32, 0, 32, 64, (npc.x + (npc.time / npc.totalTime)) * TILESIZE, (npc.y-1) * TILESIZE, 32, 64);
						break;
					case 1:
						context.drawImage(npc.img, 96, 0, 32, 64, (npc.x + (npc.time / npc.totalTime)) * TILESIZE, (npc.y-1) * TILESIZE, 32, 64);
						break;
					case 2:
						context.drawImage(npc.img, 96, 0, 32, 64, (npc.x + (npc.time / npc.totalTime)) * TILESIZE, (npc.y-1) * TILESIZE, 32, 64);
						break;
				}
			}
			else
			{
				context.drawImage(npc.img, 0, 0, 32, 64, npc.x * TILESIZE, (npc.y-1) * TILESIZE, 32, 64);
			}
		}
		else if(npc.direction == "left")
		{
			if(npc.time != 0)
			{
				switch(Math.floor(npc.time / 15))
				{
					case 0:
						context.drawImage(npc.img, 32, 0, 32, 64, (npc.x - (npc.time / npc.totalTime)) * TILESIZE, (npc.y-1) * TILESIZE, 32, 64);
						break;
					case 1:
						context.drawImage(npc.img, 96, 0, 32, 64, (npc.x - (npc.time / npc.totalTime)) * TILESIZE, (npc.y-1) * TILESIZE, 32, 64);
						break;
					case 2:
						context.drawImage(npc.img, 96, 0, 32, 64, (npc.x - (npc.time / npc.totalTime)) * TILESIZE, (npc.y-1) * TILESIZE, 32, 64);
						break;
				}
			}
			else
			{
				context.drawImage(npc.img, 0, 64, 32, 64, npc.x * TILESIZE, (npc.y-1) * TILESIZE, 32, 64);
			}
		}
}

Player.prototype.draw = function(context)
{
    if(this.direction == "up")
	{
        if(this.time != 0)
		{
			switch(Math.floor(this.time / 15))
			{
				case 0:
					context.drawImage(this.playerSpriteSheet, 32, 128, 32, 64, this.x * this.hop, (this.y - 1) * this.hop - this.hop * this.time / 30, 32, 64);
					break;
				case 1:
					context.drawImage(this.playerSpriteSheet, 96, 128, 32, 64, this.x * this.hop, (this.y - 1) * this.hop - this.hop * this.time / 30, 32, 64);
					break;
				case 2:
					context.drawImage(this.playerSpriteSheet, 96, 128, 32, 64, this.x * this.hop, (this.y - 3) * this.hop + this.hop * this.time / 30, 32, 64);
					break;
			}
		}
		else
		{
			context.drawImage(this.playerSpriteSheet, 0, 128, 32, 64, this.x * this.hop, (this.y - 2) * this.hop, 32, 64);
		}
    }
	else if(this.direction == "down")
	{
        if(this.time != 0)
		{
			switch(Math.floor(this.time / 15))
			{
				case 0:
					context.drawImage(this.playerSpriteSheet, 32, 192, 32, 64, this.x * this.hop, (this.y - 3) * this.hop + this.hop * this.time / 30, 32, 64);
					break;
				case 1:
					context.drawImage(this.playerSpriteSheet, 96, 192, 32, 64, this.x * this.hop, (this.y - 3) * this.hop + this.hop * this.time / 30, 32, 64);
					break;
				case 2:
					context.drawImage(this.playerSpriteSheet, 96, 192, 32, 64, this.x * this.hop, (this.y - 3) * this.hop + this.hop * this.time / 30, 32, 64);
					break;
			}
		}
		else
		{
			context.drawImage(this.playerSpriteSheet, 0, 192, 32, 64, this.x * this.hop, (this.y - 2) * this.hop, 32, 64);
		}
    }
	else if(this.direction == "right")
	{
        if(this.time != 0)
		{
			switch(Math.floor(this.time / 15))
			{
				case 0:
					context.drawImage(this.playerSpriteSheet, 32, 0, 32, 64, (this.x - 1)  * this.hop + this.hop * this.time / 30, (this.y - 2) * this.hop, 32, 64);
					break;
				case 1:
					context.drawImage(this.playerSpriteSheet, 0, 0, 32, 64, (this.x - 1)  * this.hop + this.hop * this.time / 30, (this.y - 2) * this.hop, 32, 64);
					break;
				case 2:
					context.drawImage(this.playerSpriteSheet, 0, 0, 32, 64, (this.x - 1)  * this.hop + this.hop * this.time / 30, (this.y - 2) * this.hop, 32, 64);
					break;
			}
		}
		else
		{
			context.drawImage(this.playerSpriteSheet, 0, 0, 32, 64, this.x * this.hop, (this.y - 2) * this.hop, 32, 64);
		}
    }
	else if(this.direction == "left")
	{
        if(this.time != 0)
		{
			switch(Math.floor(this.time / 15))
			{
				case 0:
					context.drawImage(this.playerSpriteSheet, 32, 64, 32, 64, (this.x + 1)  * this.hop - this.hop * this.time / 30, (this.y - 2) * this.hop, 32, 64);
					break;
				case 1:
					context.drawImage(this.playerSpriteSheet, 0, 64, 32, 64, (this.x + 1)  * this.hop - this.hop * this.time / 30, (this.y - 2) * this.hop, 32, 64);
					break;
				case 2:
					context.drawImage(this.playerSpriteSheet, 0, 64, 32, 64, (this.x + 1)  * this.hop - this.hop * this.time / 30, (this.y - 2) * this.hop, 32, 64);
					break;
			}
		}
		else
		{
			context.drawImage(this.playerSpriteSheet, 0, 64, 32, 64, this.x * this.hop, (this.y - 2) * this.hop, 32, 64);
		}
    }
}

Player.prototype.setPos = function (x, y, dir)
{
    this.x = x;
    this.y = y;
    this.direction = dir;
}

Player.prototype.swapRoom = function (target, x, y, dir) // room transition
{
  switch (target)
  {
    case "main":
    var newRoom = mainRoom;
    break;
    case "break":
    var newRoom = breakRoom;
    break;
  }
  if (dir !== undefined)
  {
      this.direction = dir;
  }
  if (x !== undefined && y !== undefined)
  {
      this.x = x;
      this.y = y;
  }
  else
  {
    for(var i = 0; i < newRoom.spawn.length; i++) // decide where to move player coordinates based on origin room
    {
        if(this.room.id == newRoom.spawn[i].id)
        {
            this.x = newRoom.spawn[i].x;
            this.y = newRoom.spawn[i].y;
        }
    }
}
  switch (this.room.id) // save current state of origin room into old room object
  {
    case "main":
    mainRoom = this.room;
    break;
    case "break":
    breakRoom = this.room;
  }
  this.room = newRoom; // change current room to new room
  cutScene.OnRoomSwitch();
};
