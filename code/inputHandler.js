const TILESIZE = 48;
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
	 
var keyHandler = {
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
    }
}

function onLeftClick(event) {
	mouseX = (Math.floor(menuEst.mouse.x / TILESIZE));
	mouseY = (Math.floor(menuEst.mouse.y / TILESIZE));
	
	for (i = 0; i < game.player.room.objects.length; i++){
		//console.log(game.player.room.objects[i].x + " " + game.player.room.objects[i].y);
		if (game.player.room.objects[i].x == mouseX && game.player.room.objects[i].y == mouseY){
			if (game.player.examineActive){
				examineAction(game.player.room.objects[i]);
			} else if (game.player.interactActive){
				interactAction(game.player.room.objects[i]);
			} else if (game.player.speakActive){
				lastObj = game.player.room.objects[i];
				speakAction(game.player.room.objects[i]);
			} else{
				useItem(game.player.room.objects[i]);
			}
		}

	}
	//alert (mouseX + " " + mouseY);
}

// creates a timer for 2.5 seconds
function timedText() {
   
    setTimeout(myTimeout1, 2500) 
}

// after the timer the canvas will become hidden
function myTimeout1() {
    document.getElementById("textScreen").style.visibility = "hidden";
	writing.clearRect(0,0,textCanvas.width, textCanvas.height);

}

function timedText2()
{
	setTimeout(myTimeout2, 1300);
}

function myTimeout2()
{
	writing.clearRect(0,0,textCanvas.width, textCanvas.height); //clears the text in the canvas
}

// function for creating the textbox that appears during object interaction
function drawTextBox(text)
{
	textDiv.style.visibility = "visible"; //canvas is now visable
	writing.font = "15px Arial";
	writing.textAlign = "center"
	writing.fillText(text, textCanvas.width/2, textCanvas.height/2); //fills box with text from objects
	
	
}
	
function examineAction(obj){
	if(states.currentState == "game")
	{
		writing.clearRect(0,0,textCanvas.width, textCanvas.height); //clears the text in the canvas
		if (obj.altState){
			drawTextBox(obj.altLookText);
		} else{
			drawTextBox(obj.lookText);
		}
		timedText(); //canvas becomes hidden again
		return obj.lookText;
	}

}

function interactAction(obj){
	if(states.currentState == "game")
	{
		writing.clearRect(0,0,textCanvas.width, textCanvas.height); //clears the text in the canvas
		if (obj.canTake) // If the object is an inventory item, it will be taken
		{
			drawTextBox(obj.takeText);
			addObjectInv(obj);
			removeObject(obj);
			timedText(); //canvas becomes hidden again
			return obj.takeText; // "You took the _____"
		}
		else if (obj.canUse) // If the object is an interactable map object
		{
			// Under construction


		}
		else
		{
			drawTextBox(obj.failTake);
			timedText(); //canvas becomes hidden again
			return obj.failTake; // on fail - ie; "It's stuck to the wall"
		}
	}
}

function speakAction(obj){
	if(states.currentState == "game")
	{
		writing.clearRect(0,0,textCanvas.width, textCanvas.height); //clears the text in the canvas
		
		if (obj.canSpeak){ // If the object can be spoken too
			dialogueFunction(obj);
		}
		else{
			
			drawTextBox(obj.failSpeak);
			timedText();
			return obj.failSpeak;
		}
	}
}

var optSelect = 0;

function dialogueFunction(obj)
{
	if(states.currentState == "game")
	{
		writing.clearRect(0,0,textCanvas.width, textCanvas.height); //clears the text in the canvas
		if (optSelect == 0){
			drawTextBox(obj.diaText); //prints the first line of the convo
			timedText2(); // clears the canvas on a timer
			setTimeout(function() { drawTextBox(obj.diaText2)}, 1400); //prints first option line of convo on a timer
			optSelect = 1;
		}
		else if (optSelect == 1){
			if (game.player.optSelect == "O"){
				writing.clearRect(0,0,textCanvas.width, textCanvas.height); //clears the text in the canvas
				drawTextBox(obj.diaText3); //prints the last line of the convo
				timedText(); //canvas becomes hidden again
				optSelect = 0;
			}
			else if (game.player.optSelect == "P"){
				writing.clearRect(0,0,textCanvas.width, textCanvas.height); //clears the text in the canvas
				drawTextBox(obj.diaText4); //prints the second line of the convo
				timedText2(); // clears the canvas on a timer
				setTimeout(function() { drawTextBox(obj.diaText5)}, 1400); //prints second option line of convo on a timer
				optSelect = 2;
			}
		}
		else if (optSelect == 2){
			if (game.player.optSelect == "U"){
				writing.clearRect(0,0,textCanvas.width, textCanvas.height); //clears the text in the canvas
				drawTextBox(obj.diaText3); //prints the last line of the convo
				timedText(); //canvas becomes hidden again
				optSelect = 0;
			}
			else if (game.player.optSelect == "I"){
				writing.clearRect(0,0,textCanvas.width, textCanvas.height); //clears the text in the canvas
				drawTextBox(obj.diaText6); //prints the alt last line of the convo
				timedText(); //canvas becomes hidden again
				optSelect = 0;
			}
		}
	}
}

function removeObject(obj){
	obj.x = -1;
	obj.y = -1;
	obj.img.src = "";
}

window.addEventListener('keyup', function(event) { keyHandler.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { keyHandler.onKeydown(event); }, false);