var inventory = [];

function Inventory(slotNumber) {

	if (slotNumber < inventory.length){

		game.player.examineActive = false;
		game.player.interactActive = false;
		game.player.speakActive = false;
		deactivateItems();
		invContext.clearRect(0, 0, 240, 80);
		invContext.drawImage(eye.img, 0, 0, 80, 80);
		invContext.drawImage(hand.img, 80, 0, 80, 80);
		invContext.drawImage(talk.img, 160, 0, 80, 80);
		inventory[slotNumber].canUse = true;
		invContext.clearRect((slotNumber+1) * 240, 0, 80, 80);
		invContext.drawImage(inventory[slotNumber].aimg, (slotNumber+1) * 240, 0, 80, 80);
		invContext.drawImage(empty.img, (slotNumber+1) * 240, 0, 80, 80);

	}


}

function useItem(obj){
	for (var i = 0; i < inventory.length; i++){
		if (inventory[i].canUse == true)
		{
			if (obj.usedWith == inventory[i].id)
			{
				obj.spUse(inventory[i]);
				inventory.splice (0,i + 1);
				invContext.clearRect((i+1) * 240, 0, 80, 80);
				invContext.drawImage(empty.img, (i+1) * 240, 0, 80, 80);
			}
		}
	}
}

function deactivateItems(){

	for (var i = 0; i < inventory.length; i++){
			inventory[i].canUse = false;
			invContext.clearRect((i+1) * 240, 0, 80, 80);
			//console.log(inventory[i].id);
			invContext.drawImage(empty.img, (i+1) * 240, 0, 80, 80);
			invContext.drawImage(inventory[i].oimg, (i+1) * 240, 0, 80, 80);

		}
}

function addObjectInv(obj){
	inventory.push(obj);
	invContext.drawImage(obj.oimg, inventory.length * 240, 0, 80, 80);
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
	//if(game.player.examineActive == false)
		//invContext.drawImage(eye.img, 0, 0, 80, 80);
	//else
		invContext.drawImage(eyeA.img, 0, 0, 80, 80);
	//if(game.player.interactActive == false)
		invContext.drawImage(hand.img, 80, 0, 80, 80);
	//else
		//invContext.drawImage(handA.img, 80, 0, 80, 80);
	//if(game.player.speakActive == false)
		invContext.drawImage(talk.img, 160, 0, 80, 80);
	//else
		//invContext.drawImage(talkA.img, 160, 0, 80, 80);
	invContext.drawImage(empty.img, 240, 0, 80, 80);
	invContext.drawImage(empty.img, 320, 0, 80, 80);
	invContext.drawImage(empty.img, 400, 0, 80, 80);
	invContext.drawImage(empty.img, 480, 0, 80, 80);
	invContext.drawImage(empty.img, 560, 0, 80, 80);
}
