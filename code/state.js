
//Menu part start here
function gameMenu(){
    this.buttons;
    this.buttonsHover;
    this.assetsLoaded = 0;
    this.mouse = {x:0, y:0};
    this.buttonsData = [{img:"assets/gui/StartN.png", imgHover:"assets/gui/StartH.png", x:676, y:144, w:184, h:72, over:false, ative: true, click: startGame}, // Start button
                        {img:"assets/gui/OptionN.png", imgHover:"assets/gui/OptionH.png", x:656, y:288, w:224, h:72, over:false, ative: true,  click: enterOptions},
                        {img:"assets/gui/HelpN.png", imgHover:"assets/gui/HelpH.png", x:692, y:432, w:152, h:72, over:false, ative: true, click: enterHelp}, // Help button
                        {img:"assets/gui/ExitN.png", imgHover:"assets/gui/ExitH.png", x:692, y:576, w:152, h:72, over:false, ative: true, click: enterGame}]
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

gameMenu.prototype.drawMenu = function(){
    game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
    document.body.style.cursor = "default";
    for (var i = 0; i < this.buttonsData.length; i++)
    {
        if (this.buttonsData[i].over == true)
        {
            
            game.context.drawImage(this.buttonsData[i].imgHover, this.buttonsData[i].x, this.buttonsData[i].y);
            document.body.style.cursor = "pointer";
        }
        else{
            game.context.drawImage(this.buttonsData[i].img, this.buttonsData[i].x, this.buttonsData[i].y);
        }
    }
};
//Pause menu
gameMenu.prototype.checkState = function(){
	if (keyHandler.isDown(keyHandler.ESC)){
		states.currentState = "pause";
	}
}

gameMenu.prototype.drawPauseMenu = function(){
	if (states.currentState == "pause")
	{
		game.context.fillStyle = "orange";
		game.context.fillRect(576, 96, 384, 624);
		document.body.style.cursor = "default";
		for (var i = 0; i < this.buttonsData.length; i++)
		{
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
};
//Pause menu ends here
gameMenu.prototype.mouseEnable = function() {
    game.canvas.addEventListener("mousemove", updateMouse);
    game.canvas.addEventListener("click", onMouseClick);
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
            this.buttonsData[i].over = true; // If our mouse is inside the button box, flip the over flag to true.
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
    },
    
};

var menuEst = new gameMenu();

function enterMenu() {
    game.stage.style.backgroundColor = "cyan";
    menuEst.initMenu();
};

function startGame() {
    states.currentState = "game";
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





/*
var canvas = document.querySelector("canvas");
canvas.width = 1536;
canvas.height = 864;
var surface = canvas.getContext("2d");







var stage = document.getElementById("gameScreen");
var lastState = -1;
var currState = -1;

var buttons = [{img:"assets/gui/StartN.png", imgO:"assets/gui/StartH.png", x:676, y:144, w:184, h:72, over:false, click:onStartClick}, // Start button
			   {img:"assets/gui/OptionN.png", imgO:"assets/gui/OptionH.png", x:656, y:288, w:224, h:72, over:false, click:onOptionClick},
			   {img:"assets/gui/HelpN.png", imgO:"assets/gui/HelpH.png", x:692, y:432, w:152, h:72, over:false, click:onHelpClick}, // Help button
			   {img:"assets/gui/ExitN.png", imgO:"assets/gui/ExitH.png", x:692, y:576, w:152, h:72, over:false, click:onExitClick},]


var activeBtns = [];
var numAssets = 8;
var assetsLoaded = 0;

var mouse = {x:0, y:0};

const fps = 60; // or 60. The game's set frame rate all update functions will run at.
const fpsMS = 1/fps*1000; // The frames per second as a millisecond interval.
var updateIval;


//optimize this
//window.addEventListener("keydown", onKeyDown);
//window.addEventListener("keyup", onKeyUp);
//window.addEventListener("click", onClick);

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
	//playerMovement();
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

/*
	if (currState == 1)
	{
		surface.clearRect(0, 0, canvas.width, canvas.height);
		clearInterval(updateIval);
		setInterval(update, 16,67);
		renderTools();
	}*/
