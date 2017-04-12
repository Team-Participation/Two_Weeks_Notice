const TILESIZE = 32;
const HEIGHT = 18;
const WIDTH = 32;
//this is how many frames it takes to move 1 tile
const MOVETIME = 15;
const error = 0;

var mouseX;
var mouseY;

var textDiv = document.getElementById("textScreen"); //makes a varible for the textScreen div
var textBox = document.getElementById("textCanvas"); //makes a varible for the textCanvas canvas
var writing = textBox.getContext("2d"); //to allow drawing

var lastObj;
var dlog = {active: false, id: null};

var keyHandler = {
    lastKey: null, // keeps dialogue from skipping through multiple choices
    keyPressed: {},
    keyUp: {},
    RIGHT: 39,
    RIGHT2: 68,
    LEFT: 37,
    LEFT2: 65,
    UP: 38,
    UP2: 87,
    DOWN: 40,
    DOWN2: 83,
    SPACE: 32,
	EXAMINE: 49, 	//1 on Keyboard
	INTERACT: 50, 	//2 on Keyboard
	SPEAK: 51,    	//3 on Keyboard
	ITEM1: 52,		//4 on Keyboard
	ITEM2: 53,		//5
	ITEM3: 54,		//6
	ITEM4: 55,		//7
	ITEM5: 56,		//8
	ITEM6: 57,		//9
	ITEM7: 48,		//0
	ESC: 27,
	OPT1: 79, // "o" on keyboard
	OPT2: 80, // "p" on keyboard
	OPT3: 85, // "u"
	OPT4: 73,

    isDown: function(keyCode) {
        return this.keyPressed[keyCode];
    },

    isKeyUp: function(keyCode) {
        return this.keyUp[keyCode];
    },

    deleteIsKeyUp: function(keyCode) {
        delete this.keyUp[keyCode];
    },

    onKeydown: function(event) {
        this.keyPressed[event.keyCode] = true;
    },

    onKeyup: function(event) {
        if(this.keyUp[event.keyCode] == true){
            this.keyUp[event.keyCode] = false;
        }else{
            this.keyUp[event.keyCode] = true;
        }
        delete this.keyPressed[event.keyCode];
        if (dlog.active || cutScene.active)
          this.lastKey = event.keyCode;
    },

    onKeypress: function(event) {

    }
}

function onLeftClick(event)
{
  if (dlog.active || cutScene.active) // so that mouse clicks can also dismiss text windows
    keyHandler.lastKey = 999;
  else
  {
  	mouseX = (Math.floor(menuEst.mouse.x / TILESIZE));
  	mouseY = (Math.floor(menuEst.mouse.y / TILESIZE));

  	checkTile(game.player.room.objects, mouseX, mouseY);
    checkTile(game.player.room.npcs, mouseX, mouseY);
    checkTile(game.player.room.npcs, mouseX, mouseY+1);
  }
}

function checkTile(array, x, y)
{
  for (i = 0; i < array.length; i++)
  {
    if (array[i].x == x && array[i].y == y)
    {
      if (game.player.examineActive){
        examineAction(array[i]);
      }
      else if (game.player.interactActive){
        interactAction(array[i]);
      }
      else if (game.player.speakActive){
        lastObj = array[i];
        speakAction(array[i]);
      }
      else
      {
        useItem(array[i]);
      }
    }
  }
}

writing.clear = function()
{
  document.getElementById("textScreen").style.visibility = "hidden";
  this.clearRect(0,0,textCanvas.width, textCanvas.height);
};

// function for creating the textbox that appears during object interaction
function drawTextBox(text)
{
	textDiv.style.visibility = "visible"; //canvas is now visable
	writing.font = "20px Arial";
	writing.textAlign = "center"
	if (text.length > 90){
		var lastChar;
		for (var i = 90; i > 0; i--){
			if (text.charAt(i) == " "){
				lastChar = i;
				i = 0;
			}
		}
		//alert(lastChar);
		var text2 = text.slice(lastChar,text.length);
		text = text.slice(0,lastChar);
		writing.fillText(text, textCanvas.width/2, textCanvas.height/2.5); //fills box with text from objects
		writing.fillText(text2, textCanvas.width/2, textCanvas.height/1.3); //fills box with text from objects
	}else{
		writing.fillText(text, textCanvas.width/2, textCanvas.height/2); //fills box with text from objects
	}
	
	
}

function examineAction(obj){
	if(states.currentState == "game")
	{
		writing.clearRect(0,0,textCanvas.width, textCanvas.height); //clears the text in the canvas
		obj.look();
	}
}

function interactAction(obj){
	if(states.currentState == "game")
	{
		writing.clearRect(0,0,textCanvas.width, textCanvas.height); //clears the text in the canvas
    obj.use();
	}
}

function speakAction(obj){
	if(states.currentState == "game")
	{
		writing.clearRect(0,0,textCanvas.width, textCanvas.height); //clears the text in the canvas
    obj.talk();
	}
}

function removeObject(obj){
	delete breakRoom.BGArray[obj.y][obj.x][obj.z];
}

window.addEventListener('keyup', function(event) { keyHandler.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { keyHandler.onKeydown(event); }, false);
//window.addEventListener('keypress', function(event) { keyHandler.onKeypress(event); }, false);
