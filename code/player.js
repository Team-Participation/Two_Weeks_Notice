function Player() {
    this.x = 10;
    this.y = 10;
    this.hop = 48;
    this.time = 0;
    this.room = new room();
    
    this.direction = "down";
    this.examineActive = true;
    this.interactActive = false;
    this.speakActive = false;
    
    this.playerUpSprite = new Image();
    this.playerUpSprite.src = "assets/sprites/playerUp.png";
    this.playerDownSprite = new Image();
    this.playerDownSprite.src = "assets/sprites/playerDown.png";
    this.playerLeftSprite = new Image();
    this.playerLeftSprite.src = "assets/sprites/playerLeft.png";
    this.playerRightSprite = new Image();
    this.playerRightSprite.src = "assets/sprites/playerRight.png";
}

Player.prototype.update = function() {
    if(this.time == 30)
    {
        this.time = 0;
    }else if(this.time != 0){
        this.time++;
    }
    if (keyHandler.isDown(keyHandler.RIGHT) || keyHandler.isDown(keyHandler.RIGHT2)) this.moveRight();
    if (keyHandler.isDown(keyHandler.UP) || keyHandler.isDown(keyHandler.UP2)) this.moveUp();
    if (keyHandler.isDown(keyHandler.LEFT) || keyHandler.isDown(keyHandler.LEFT2)) this.moveLeft();
    if (keyHandler.isDown(keyHandler.DOWN) || keyHandler.isDown(keyHandler.DOWN2)) this.moveDown();
};

Player.prototype.moveRight = function() {
    if(this.time == 0){
        this.direction = "right";
        if(this.room.wallCollision([this.x + 1, this.y]) &&
           this.room.objectCollision([this.x + 1, this.y]))
        {
            this.x ++;
            this.time ++;
        }
    }
    
};

Player.prototype.moveLeft = function() {
    if(this.time == 0){
        this.direction = "left";
        if(this.room.wallCollision([this.x - 1, this.y]) &&
           this.room.objectCollision([this.x - 1, this.y]))
        {
            this.x --;
            this.time ++;
        }
    }
};

Player.prototype.moveDown = function() {
    if(this.time == 0){
        this.direction = "down";
        if(this.room.wallCollision([this.x, this.y + 1]) &&
           this.room.objectCollision([this.x, this.y + 1]))
        {
            this.y ++;
            this.time ++;
        }
    }
};

Player.prototype.moveUp = function() {
    if(this.time == 0){
        this.direction = "up";
        if(this.room.wallCollision([this.x, this.y - 2]) &&
           this.room.objectCollision([this.x, this.y - 1]))
        {
            this.y --;
            this.time ++;
        }
    }
};

Player.prototype.onObject = function() {
    return this.room.onObject([this.x, this.y]);
};

Player.prototype.draw = function(context) {
    if(this.direction == "up"){
        this.time != 0 ? context.drawImage(this.playerUpSprite, this.x * this.hop, this.y * this.hop - this.hop * this.time / 30) :
        context.drawImage(this.playerUpSprite, this.x * this.hop, (this.y - 1) * this.hop);
    }else if(this.direction == "down"){
        this.time != 0 ? context.drawImage(this.playerDownSprite, this.x * this.hop, (this.y - 2) * this.hop  + this.hop * this.time / 30) :
        context.drawImage(this.playerDownSprite, this.x * this.hop, (this.y - 1) * this.hop);
    }else if(this.direction == "right"){
        this.time != 0 ? context.drawImage(this.playerRightSprite, (this.x - 1) * this.hop + this.hop * this.time / 30, (this.y - 1) * this.hop) :
        context.drawImage(this.playerRightSprite, this.x * this.hop, (this.y - 1) * this.hop);
    }else if(this.direction == "left"){
        this.time != 0 ? context.drawImage(this.playerLeftSprite, (this.x + 1) * this.hop - this.hop * this.time / 30, (this.y - 1) * this.hop) :
        context.drawImage(this.playerLeftSprite, this.x * this.hop, (this.y - 1) * this.hop);
    }
}