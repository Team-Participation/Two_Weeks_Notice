const TILESIZE = 48;
const HEIGHT = 18;
const WIDTH = 32;
//this is how many frames it takes to move 1 tile
const MOVETIME = 15;
const error = 0;

var mouseX;
var mouseY;

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
	EXAMINE: 49, //1 on Keyboard
	INTERACT: 50, //2 on Keyboard
	SPEAK: 51,    //3 on Keyboard
	ESC: 27,

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
				speakAction(game.player.room.objects[i]);
			}
		}

	}
	//alert (mouseX + " " + mouseY);
}


function examineAction(obj){

	console.log(obj.lookText);
	return obj.lookText;

}

function interactAction(obj){
	if (obj.canTake) // If the object is an inventory item, it will be taken
  {
    inventory.push(obj); // or replace with better method than push
	console.log(obj.takeText);
	removeObject(obj);
    return obj.takeText; // "You took the _____"
  }
	else if (obj.canUse) // If the object is an interactable map object
	{
		// Under construction


	}
	else
	{
		console.log(obj.failTake);
		return obj.failTake; // on fail - ie; "It's stuck to the wall"
	}

}

function speakAction(obj){

	if (obj.canSpeak){ // If the object can be spoken too
		dialogueFunction(obj);
	}
	else{
		console.log(obj.failSpeak);
		return obj.failSpeak;
	}

}

function removeObject(obj){
	obj.x = -1;
	obj.y = -1;
	obj.img.src = "";
}

window.addEventListener('keyup', function(event) { keyHandler.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { keyHandler.onKeydown(event); }, false);