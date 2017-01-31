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
	this.layerCode = 999; // for sorting into draw layer
	this.lookText = ""; // text to display when inspected
  this.canTake = false;
  this.takeText = ""; // text for taking
  this.failTake = "";
  this.canSpeak = false;
	this.failSpeak = ""; // "Chairs can't talk"
	this.canUse = false;
	this.usedWith = []; // item interaction flag

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
  if (gameObject.canTake)
  {
    inventory.push(gameObject); // or replace with better method than push
		Room.items.splice(gameObject); // check syntax
    return gameObject.takeText; // optional when can take
  }
	else if (gameObject.canUse)
	{

	}
	else
	{
		return gameObject.takeText; // on fail - ie; "It's stuck to the wall" - can separate into own var if needed
	}
}

function Speak (gameObject)
{
	if (gameObject.canSpeak)
	{

	}
	else
	{
		return gameObject.failSpeak
	}
}

function useItem (item, target)
{

}
