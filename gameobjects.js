function gameObject ()
{
	this.img = "img.png"
	this.layerCode = 0; // for sorting into draw layer
				// 1 = NPC, 2 = Items, 3 = Obstacles, 4 = Background, 5 = Special
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

var goldfish = new gameObject();
{
goldfish.img = new Image();
goldfish.img.src = "img/goldfish.png";
goldfish.layerCode = 2;
goldfish.lookText = "Unprocessed fishsticks.";
goldfish.canTake = true;
goldfish.takeText = "...";
goldfish.failTake = null;
goldfish.canSpeak = false;
goldfish.failSpeak = "It stares back with a blank expression.";
goldfish.canUse = false;
goldfish.usedWith = null;

goldfish.x = 16;
goldfish.y = 7;
goldfish.length = 1;
goldfish.height = 1;
gameRoom.objects.push(goldfish);
}

var waterCooler = new gameObject();
{
waterCooler.img = new Image();
waterCooler.img.src = "img/watercooler.png";
waterCooler.imgAlt = "watercoolerAlt.png";
waterCooler.layerCode = 3;
waterCooler.lookText = "For making uncomfortable small talk.";
waterCooler.canTake = false;
waterCooler.takeText = null;
waterCooler.failTake = null;
waterCooler.canSpeak = false;
waterCooler.failSpeak = "It doesn't speak. Watercooler conversations suck anyway.";
waterCooler.canUse = false;
waterCooler.usedWith = ["goldfish"];
waterCooler.altState = false;

waterCooler.x = 2;
waterCooler.y = 12;
waterCooler.length = 1;
waterCooler.height = 2;
gameRoom.objects.push(waterCooler);
}

var receptionDesk = new gameObject();
{
receptionDesk.img = new Image();
receptionDesk.img.src = "img/reception_desk.png";
receptionDesk.layerCode = 3;
receptionDesk.lookText = "A mighty fine desk.";
receptionDesk.canTake = false;
receptionDesk.takeText = null;
receptionDesk.failTake = null;
receptionDesk.canSpeak = false;
receptionDesk.failSpeak = "It doesn't speak.";
receptionDesk.canUse = false;
receptionDesk.usedWith = null;

receptionDesk.x = 14;
receptionDesk.y = 7;
receptionDesk.length = 3;
receptionDesk.height = 1;
gameRoom.objects.push(receptionDesk);
}

var reception = new gameObject();
{
reception.img = new Image();
reception.img.src = "img/reception.png";
reception.layerCode = 1;
reception.lookText = "I could look at that all day.";
reception.canTake = false;
reception.takeText = null;
reception.failTake = null;
reception.canSpeak = true;
reception.failSpeak = null;
reception.canUse = true;
reception.usedWith = null;

reception.dialogue = [];
reception.dialogue[0] = {	text: "What do you want?",
											options:	[	{	reply: "How's your day?", next: 1},
																	{ reply: "You, in the back seat of my Corolla.", next: 2}
																]
															};
reception.dialogue[1] = {	text: "Whatever."};
reception.dialogue[2] = {	text: "In your dreams, creep.",
											options:	[	{	reply: "Feelsbadman.", next: 1},
																	{ reply: "Been there, done that.", next: 3}
																]
															};
reception.dialogue[3] = {	text: "Like, eww."};

reception.x = 15;
reception.y = 6;
reception.length = 1;
reception.height = 2;
gameRoom.objects.push(reception);
}
