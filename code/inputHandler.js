const TILESIZE = 48;
const HEIGHT = 18;
const WIDTH = 32;
//this is how many frames it takes to move 1 tile
const MOVETIME = 15;
const error = 0;

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

window.addEventListener('keyup', function(event) { keyHandler.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { keyHandler.onKeydown(event); }, false);