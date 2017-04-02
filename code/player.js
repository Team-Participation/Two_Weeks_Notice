function Player() {
    this.x = 2;
    this.y = 4;
    this.hop = 32;
    this.time = 0;
    this.room = new room();

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

Player.prototype.update = function() {
  if(this.time == 30)
  {
    this.time = 0;
  }else if(this.time != 0){
    this.time++;
  }

  if (dlog.active) // overrides other inputs while active dialogue
  {
    if (dlog.id === null && keyHandler.lastKey !== null)
    {
      dlog.active = false;
      keyHandler.lastKey = null;
      writing.clear();
    }
    else
    {
      for (var i = 0; i < this.room.objects.length; i++)
      {
        if (this.room.objects[i].id == dlog.id)
        {
          switch (keyHandler.lastKey)
          {
            case 49:
            this.room.objects[i].dlogIdx = this.room.objects[i].dlog[this.room.objects[i].dlogIdx].options[0].next;
            keyHandler.lastKey = null;
            this.room.objects[i].talk(); // continue until terminal node
            break;
            case 50:
            this.room.objects[i].dlogIdx = this.room.objects[i].dlog[this.room.objects[i].dlogIdx].options[1].next;
            keyHandler.lastKey = null;
            this.room.objects[i].talk(); // continue until terminal node
            break;
          }
        }
      }
    }
  }
  else
  {
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

Player.prototype.moveRight = function() {
    if(this.time == 0){
        this.direction = "right";
        if(this.room.collision([this.x + 1, this.y]))
        {
            this.x ++;
            this.time ++;
        }
    }

};

Player.prototype.moveLeft = function() {
    if(this.time == 0){
        this.direction = "left";
        if(this.room.collision([this.x - 1, this.y]))
        {
            this.x --;
            this.time ++;
        }
    }
};

Player.prototype.moveDown = function() {
    if(this.time == 0){
        this.direction = "down";
        if(this.room.collision([this.x, this.y + 1]))
        {
            this.y ++;
            this.time ++;
        }
    }
};

Player.prototype.moveUp = function() {
    if(this.time == 0){
        this.direction = "up";
        if(this.room.collision([this.x, this.y - 1]))
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
					context.drawImage(this.playerSpriteSheet, 64, 0, 32, 64, (this.x - 1)  * this.hop + this.hop * this.time / 30, (this.y - 2) * this.hop, 32, 64);
					break;
				case 2:
					context.drawImage(this.playerSpriteSheet, 96, 0, 32, 64, (this.x - 1)  * this.hop + this.hop * this.time / 30, (this.y - 2) * this.hop, 32, 64);
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
					context.drawImage(this.playerSpriteSheet, 64, 64, 32, 64, (this.x + 1)  * this.hop - this.hop * this.time / 30, (this.y - 2) * this.hop, 32, 64);
					break;
				case 2:
					context.drawImage(this.playerSpriteSheet, 96, 64, 32, 64, (this.x + 1)  * this.hop - this.hop * this.time / 30, (this.y - 2) * this.hop, 32, 64);
					break;
			}
		}
		else
		{
			context.drawImage(this.playerSpriteSheet, 0, 64, 32, 64, this.x * this.hop, (this.y - 2) * this.hop, 32, 64);
		}
    }
}
