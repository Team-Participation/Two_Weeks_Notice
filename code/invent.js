var inventory = [];
var activeSlot = null;

function Inventory(slotNumber)
{
	if (slotNumber < inventory.length)
	{
		game.player.examineActive = false;
		game.player.interactActive = false;
		game.player.speakActive = false;
		deactivateItems();
		invContext.clearRect(0, 0, 240, 80);
		invContext.drawImage(eye.img, 0, 0, 80, 80);
		invContext.drawImage(hand.img, 80, 0, 80, 80);
		invContext.drawImage(talk.img, 160, 0, 80, 80);
		inventory[slotNumber].canUse = true;
		invContext.clearRect((slotNumber) * 80 + 240, 0, 80, 80);
		invContext.drawImage(inventory[slotNumber].aimg, (slotNumber) * 80 + 240, 0, 80, 80);
		invContext.drawImage(empty.img, (slotNumber) * 80 + 240, 0, 80, 80);
		activeSlot = slotNumber;
	}
}

function useItem(obj){
	for (var i = 0; i < inventory.length; i++){
		if (inventory[i].canUse == true)
		{
			if (obj.usedWith == inventory[i].id)
			{
				var b = obj.spUse();
				if (b)
				{
					inventory.splice (i, 1);
					invContext.clearRect(inventory.length * 80 + 240, 0, 80, 80);
					if (inventory[i] !== undefined)
						invContext.drawImage(inventory[i].oimg, i * 80 + 240, 0, 80, 80);
					invContext.drawImage(empty.img, i * 80 + 240, 0, 80, 80);
					invContext.drawImage(empty.img, inventory.length * 80 + 240, 0, 80, 80);
				}
			}
		}
	}
}

function deactivateItems()
{
	activeSlot = null;
	for (var i = 0; i < inventory.length; i++)
	{
		inventory[i].canUse = false;
		invContext.clearRect((i) * 80 + 240, 0, 80, 80);
		invContext.drawImage(inventory[i].oimg, (i) * 80 + 240, 0, 80, 80);
		invContext.drawImage(empty.img, (i) * 80 + 240, 0, 80, 80);
	}
}

function addObjectInv(obj){
	inventory.push(obj);
	invContext.drawImage(obj.oimg, (inventory.length-1) * 80 + 240, 0, 80, 80);
	invContext.drawImage(empty.img, (inventory.length-1) * 80 + 240, 0, 80, 80);
}



//inventory
var invDiv = document.getElementById("inventoryScreen");
var invBox = document.getElementById("inventoryCanvas");
var invContext = invBox.getContext("2d");

var eye = new Object();
eye.img = new Image();
eye.img.src = "assets/sprites/gui/eye.png";

var eyeA = new Object();
eyeA.img = new Image();
eyeA.img.src = "assets/sprites/gui/eyeActive.png";

var hand = new Object();
hand.img = new Image();
hand.img.src = "assets/sprites/gui/hand.png";

var handA = new Object();
handA.img = new Image();
handA.img.src = "assets/sprites/gui/handActive.png";

var talk = new Object();
talk.img = new Image();
talk.img.src = "assets/sprites/gui/talk.png";

var talkA = new Object();
talkA.img = new Image();
talkA.img.src = "assets/sprites/gui/talkActive.png";

var empty = new Object();
empty.img = new Image();
empty.img.src = "assets/sprites/gui/empty.png";

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
	invContext.drawImage(empty.img, 640, 0, 80, 80);
	invContext.drawImage(empty.img, 720, 0, 80, 80);
}
