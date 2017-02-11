function Player() {
    this.x = 10;
    this.y = 10;
    this.hop = 48;
    this.time = 0;
    
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
    if (keyHandler.isDown(keyHandler.RIGHT) || keyHandler.isDown(keyHandler.RIGHT2)) this.moveRight();
    if (keyHandler.isDown(keyHandler.UP) || keyHandler.isDown(keyHandler.UP2)) this.moveUp();
    if (keyHandler.isDown(keyHandler.LEFT) || keyHandler.isDown(keyHandler.LEFT2)) this.moveLeft();
    if (keyHandler.isDown(keyHandler.DOWN) || keyHandler.isDown(keyHandler.DOWN2)) this.moveDown();
    if(this.time == 15)
    {
        this.time = 0;
    }else if(this.time != 0){
        this.time++;
    }
};

Player.prototype.moveRight = function() {
    if(this.time == 0){
        this.direction = "right";
        if(wallCollision([this.x + 1, this.y], gameRoom.wallGrid) &&
           objectCollision([this.x + 1, this.y], gameRoom))
        {
            this.x ++;
            this.time ++;
        }
    }
    
};

Player.prototype.moveLeft = function() {
    if(this.time == 0){
        this.direction = "left";
        if(wallCollision([this.x - 1, this.y], gameRoom.wallGrid) &&
           objectCollision([this.x - 1, this.y], gameRoom))
        {
            this.x --;
            this.time ++;
        }
    }
};

Player.prototype.moveDown = function() {
    if(this.time == 0){
        this.direction = "down";
        if(wallCollision([this.x, this.y + 2], gameRoom.wallGrid) &&
           objectCollision([this.x, this.y + 2], gameRoom))
        {
            this.y ++;
            this.time ++;
        }
    }
};

Player.prototype.moveUp = function() {
    if(this.time == 0){
        this.direction = "up";
        if(wallCollision([this.x, this.y - 1], gameRoom.wallGrid) &&
           objectCollision([this.x, this.y - 1], gameRoom))
        {
            this.y --;
            this.time ++;
        }
    }
};

Player.prototype.draw = function(context) {
    if(this.direction == "up"){
        this.time != 0 ? context.drawImage(this.playerUpSprite, this.x * this.hop, this.y * this.hop - this.hop * this.time / 15) :
        context.drawImage(this.playerUpSprite, this.x * this.hop, (this.y - 1) * this.hop);
    }else if(this.direction == "down"){
        this.time != 0 ? context.drawImage(this.playerDownSprite, this.x * this.hop, (this.y - 2) * this.hop  + this.hop * this.time / 15) :
        context.drawImage(this.playerDownSprite, this.x * this.hop, (this.y - 1) * this.hop);
    }else if(this.direction == "right"){
        this.time != 0 ? context.drawImage(this.playerRightSprite, (this.x - 1) * this.hop + this.hop * this.time / 15, (this.y - 1) * this.hop) :
        context.drawImage(this.playerRightSprite, this.x * this.hop, (this.y - 1) * this.hop);
    }else if(this.direction == "left"){
        this.time != 0 ? context.drawImage(this.playerLeftSprite, (this.x + 1) * this.hop - this.hop * this.time / 15, (this.y - 1) * this.hop) :
        context.drawImage(this.playerLeftSprite, this.x * this.hop, (this.y - 1) * this.hop);
    }
}

var keyHandler = {
    keyPressed: {},
    RIGHT: 39,
    RIGHT2: 68,
    LEFT: 37,
    LEFT2: 65,
    UP: 38,
    UP2: 87,
    DOWN: 40,
    DOWN2: 83,
        
    isDown: function(keyCode) {
        return this.keyPressed[keyCode];
    },

    onKeydown: function(event) {
        this.keyPressed[event.keyCode] = true;
    },

    onKeyup: function(event) {
        delete this.keyPressed[event.keyCode];
    }
}

window.addEventListener('keyup', function(event) { keyHandler.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { keyHandler.onKeydown(event); }, false);