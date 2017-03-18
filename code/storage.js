function inventory(){
    this.slots = new inventorySlot(11);
    this.pickUpItm = function(itemObj) {
        var itemStored = this.slots.findIndex(function(inventorySlot){return inventorySlot.item.name == itemObj.name});
        if(itemStored == -1){
            var emptySlot = this.slots.findIndex(function(inventorySlot){return inventorySlot.item === null});
            if(emptySlot == -1){
                console.log("Inventory Full");
                return false;
            }else{
                this.slots(emptySlot).item = itemObj;
                return true;
            }
        }else{
            this.slots(itemStored).quantity++;
            return true;
        }
    };
    this.checkMoveItm = function(slotSel, slotRem) {
        if(slot < 0 || slot > 11){
            error = 221; //error code for surpassing allowed inventory size
            console.log("surpassed allowed inventory size");
            return false;
        }else if(this.slots(slotSel).item === null || this.slots(slotSel).item == this.slots(slotRem).item){
            return true;
        }else{
            return false;
        }
    };
    this.moveItm = function(slotSel, slotRem) {
        if(slot < 0 || slot > 11){
            error = 221; //error code for surpassing allowed inventory size
            console.log("surpassed allowed inventory size");
            return false;
        }else if(slotSel == slotRem){
            return true;
        }else if(this.slots(slotSel).item === null){
            this.slots(slotSel) = this.slots(slotRem);
            this.slots(slotRem).reset();
        }else if(this.slots(slotSel).item !== null){
            this.tempSlot = this.slots(slotSel);
            this.slots(slotSel) = this.slots(slotRem);
            this.slots(slotRem) = this.tempSlot;
        }
    };
}

function inventorySlot(){
    this.item = null;
    this.quantity = 0;
    this.reset = function() {
        this.item = null;
        this.quantity = 0;
    };

}

//inventory
var invDiv = document.getElementById("inventoryScreen");
var invBox = document.getElementById("inventoryCanvas");
var invContext = invBox.getContext("2d");

var eye = new Object();
eye.img = new Image();
eye.img.src = "assets/gui/eye.png";

var eyeA = new Object();
eyeA.img = new Image();
eyeA.img.src = "assets/gui/eyeActive.png";

var hand = new Object();
hand.img = new Image();
hand.img.src = "assets/gui/hand.png";

var handA = new Object();
handA.img = new Image();
handA.img.src = "assets/gui/handActive.png";

var talk = new Object();
talk.img = new Image();
talk.img.src = "assets/gui/talk.png";

var talkA = new Object();
talkA.img = new Image();
talkA.img.src = "assets/gui/talkActive.png";

var empty = new Object();
empty.img = new Image();
empty.img.src = "assets/gui/empty.png";

setTimeout(drawInv, 100);

function drawInv()
{
	if(game.player.examineActive == false)
		invContext.drawImage(eye.img, 0, 0, 80, 80);
	else
		invContext.drawImage(eyeA.img, 0, 0, 80, 80);
	if(game.player.interactActive == false)
		invContext.drawImage(hand.img, 80, 0, 80, 80);
	else
		invContext.drawImage(handA.img, 80, 0, 80, 80);
	if(game.player.speakActive == false)
		invContext.drawImage(talk.img, 160, 0, 80, 80);
	else
		invContext.drawImage(talkA.img, 160, 0, 80, 80);
	invContext.drawImage(empty.img, 240, 0, 80, 80);
	invContext.drawImage(empty.img, 320, 0, 80, 80);
	invContext.drawImage(empty.img, 400, 0, 80, 80);
	invContext.drawImage(empty.img, 480, 0, 80, 80);
	invContext.drawImage(empty.img, 560, 0, 80, 80);
}