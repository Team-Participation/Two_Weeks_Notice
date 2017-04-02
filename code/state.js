
//Menu part start here
function gameMenu(){
    this.buttons;
    this.buttonsHover;
    this.assetsLoaded = 0;
    this.mouse = {x:0, y:0};
    this.buttonsData = [{id:"start", img:"assets/sprites/gui/StartN.png", imgHover:"assets/sprites/gui/StartH.png", x:676, y:144, w:184, h:72, over:false, active:true, click: startGame}, // Start button
                        {id:"resume", img:"assets/sprites/gui/StartN.png", imgHover:"assets/sprites/gui/StartH.png", x:676, y:144, w:184, h:72, over:false, active:false, click: startGame}, // needs png for resume
                        {id:"options", img:"assets/sprites/gui/OptionN.png", imgHover:"assets/sprites/gui/OptionH.png", x:656, y:288, w:224, h:72, over:false, active:true,  click: enterOptions},
                        {id:"help", img:"assets/sprites/gui/HelpN.png", imgHover:"assets/sprites/gui/HelpH.png", x:692, y:432, w:152, h:72, over:false, active:true, click: enterHelp}, // Help button
                        {id:"exit", img:"assets/sprites/gui/ExitN.png", imgHover:"assets/sprites/gui/ExitH.png", x:692, y:576, w:152, h:72, over:false, active:true, click: enterGame}]
	//temporary fix to buttons position for new resolution
	for(var i = 0; i < this.buttonsData.length; i++)
	{
		this.buttonsData[i].x /= 1.5;
		this.buttonsData[i].y /= 1.5;
	}
};

gameMenu.prototype.setActive = function(id,bool){
    for(var i = 0; i < this.buttonsData.length; i++){
        if(this.buttonsData[i].id == id) this.buttonsData[i].active = bool;
    }
};

gameMenu.prototype.initButtons = function(){
    for (var i = 0; i < this.buttonsData.length; i++)
    {
            this.buttons = new Image();
            this.buttons.src = this.buttonsData[i].img;
            this.buttons.addEventListener("load", this.onAssetLoad(this));
            this.buttonsData[i].img = this.buttons; // .img used to hold the path string, now it holds the actual image object.
            this.buttonsHover = new Image();
            this.buttonsHover.src = this.buttonsData[i].imgHover;
            this.buttonsHover.addEventListener("load", this.onAssetLoad(this));
            this.buttonsData[i].imgHover = this.buttonsHover;

    }
};

gameMenu.prototype.onAssetLoad = function(event){
    this.assetsLoaded += 1;
};

gameMenu.prototype.numAssetsLoaded = function(event){
    return this.buttonsData.length*2;
};

gameMenu.prototype.drawMenu = function(){
    game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
    document.body.style.cursor = "default";
    for(var i = 0; i < this.buttonsData.length; i++)
    {
        if(this.buttonsData[i].active == true){
            if (this.buttonsData[i].over == true)
            {
				//set these to /1.5 when the resolution changed
                game.context.drawImage(this.buttonsData[i].imgHover, this.buttonsData[i].x, this.buttonsData[i].y);
                document.body.style.cursor = "pointer";
            }
            else{
                game.context.drawImage(this.buttonsData[i].img, this.buttonsData[i].x, this.buttonsData[i].y);
            }
        }
    }
};

gameMenu.prototype.checkState = function(){
    if(!keyHandler.isKeyUp(keyHandler.ESC) && states.currentState == "pause"){
		states.currentState = "game";
    }else if(keyHandler.isKeyUp(keyHandler.ESC)){
        states.currentState = "pause";
    }
}

//Pause menu
gameMenu.prototype.drawPauseMenu = function(){
	if (states.currentState == "pause")
	{
        this.setActive("start",true);
        this.setActive("resume",false);
		game.context.fillStyle = "orange";
		game.context.fillRect(576, 96, 384, 624);
		document.body.style.cursor = "default";
		for (var i = 0; i < this.buttonsData.length; i++)
		{
            if(this.buttonsData[i].active == true){
                if (this.buttonsData[i].over == true)
                {
                    game.context.drawImage(this.buttonsData[i].imgHover, this.buttonsData[i].x, this.buttonsData[i].y);
                    document.body.style.cursor = "pointer";
                }
                else{
                    game.context.drawImage(this.buttonsData[i].img, this.buttonsData[i].x, this.buttonsData[i].y);
                }
            }
		}
	}
};
//Pause menu ends here

gameMenu.prototype.mouseEnable = function() {
    game.canvas.addEventListener("mousemove", updateMouse);
    game.canvas.addEventListener("click", onMouseClick);
	game.canvas.addEventListener("click", onLeftClick);
}

gameMenu.prototype.mouseDisable = function() {
    game.canvas.removeEventListener("mousemove", this.updateMouse);
    game.canvas.removeEventListener("click", this.onMouseClick);
}

gameMenu.prototype.initMenu = function() {
    this.mouseEnable();
    this.initButtons();
};

function updateMouse(event) {
    var rect = game.canvas.getBoundingClientRect();
    menuEst.mouse.x = event.clientX - rect.left;
    menuEst.mouse.y = event.clientY - rect.top;
}

function onMouseClick(event) {
    for (var i = 0; i < menuEst.buttonsData.length; i++)
    {
        if (menuEst.buttonsData[i].over == true)
        {
            menuEst.buttonsData[i].click();
            break;
        }
    }
}

gameMenu.prototype.updateMenu = function() {
    for (var i = 0; i < this.buttonsData.length; i++)
    {
        this.buttonsData[i].over = false;
        if(!(this.mouse.x < this.buttonsData[i].x ||
             this.mouse.x > this.buttonsData[i].x+this.buttonsData[i].w ||
             this.mouse.y < this.buttonsData[i].y ||
             this.mouse.y > this.buttonsData[i].y+this.buttonsData[i].h))
        {
            this.buttonsData[i].over = true; // If the mouse is inside the button box, flip the over flag to true.
        }
    }
};


var states = {
    currentState: "none",
    initial: "menu",
    menuStates: {
        menu:  {enter: enterMenu, to: startGame},
        game:  {start: startGame, enter: enterGame, pause: pauseGame, to: enterOptions},
        help:  {enter: enterHelp, to: enterOptions},
        options:  {enter: enterOptions, to: enterGame},
		pause: {enter: enterPauseMenu, to:enterGame}
    }
};

var menuEst = new gameMenu();

function enterMenu() {
    game.stage.style.backgroundColor = "#404040";
    menuEst.initMenu();
};

function startGame() {
    keyHandler.deleteIsKeyUp(keyHandler.ESC);
    states.currentState = "game";
	invDiv.style.visibility = "visible";
};

function enterGame() {

};

function pauseGame() {

};

function enterOptions() {

};

function enterHelp() {

};

function enterPauseMenu() {

};
