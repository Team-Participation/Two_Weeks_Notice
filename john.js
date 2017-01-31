function Room ()
{
	this.wallGrid = createWalls();
	this.npcs = []; // NPC layer
	this.items = []; // Foreground collectable items that have no collision can be placed on obstacles
	this.obstacles = []; // Foreground objects such as tables that have collision
	this.bgtiles = []; // Floor tiles, no collision
	this.special = []; // as needed
}

function gameObject ()
{
	this.img = "img.png"
	this.layerCode = 0; // for sorting into draw layer
	this.lookText = ""; // text to display when inspected
	this.canTake = false; // whether it will be collected into inventory when used with hand cursor
	this.takeText = ""; // text for taking
	this.failTake = ""; // text if can't take
	this.canSpeak = false; // whether you can talk to it
	this.failSpeak = ""; // "Chairs can't talk"
	this.canUse = false; // whether it can be used as a stationary object without taking into inventory - like opening a door
	this.usedWith = []; // inventory items that can be used on this object
	this.dialogue = []; // dialogue tree if can be spoken to

	this.x = 999;
	this.y = 999;
	this.length = 999;
	this.height = 999;
}

function Look (gameObject)
{
	return gameObject.lookText;
}

function Hand (gameObject)
{
  if (gameObject.canTake) // If the object is an inventory item, it will be taken
  {
    inventory.push(gameObject); // or replace with better method than push
	Room.items.splice(gameObject); // check syntax, probably wrong
    return gameObject.takeText; // "You took the _____"
  }
	else if (gameObject.canUse) // If the object is an interactable map object
	{
		// Under construction
	}
	else
	{
		return gameObject.failText; // on fail - ie; "It's stuck to the wall"
	}
}

function Speak (gameObject)
{
	if (gameObject.canSpeak)
	{
		// Under construction
	}
	else
	{
		return gameObject.failSpeak
	}
}

function useItem (item, target) // for using inventory item on something
{
	// Under construction
}
