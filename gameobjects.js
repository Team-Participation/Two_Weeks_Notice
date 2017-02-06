var goldfish = new gameObject
{
	this.img = 'img/goldfish.png';
	this.layerCode = 2;
	this.lookText = 'Unprocessed fishsticks.';
	this.canTake = true;
	this.takeText = '...';
	this.failTake = null;
	this.canSpeak = false;
	this.failSpeak = 'It stares back with a blank expression.';
	this.canUse = false;
	this.usedWith = null;

	this.x = 16;
	this.y = 7;
	this.length = 1;
	this.height = 1;
	gameRoom.objects.push(this);
}

var watercooler = new gameObject
{
	this.img = 'img/watercooler.png';
	this.imgAlt = 'watercoolerAlt.png';
	this.layerCode = 3;
	this.lookText = 'For making uncomfortable small talk.';
	this.canTake = false;
	this.takeText = null;
	this.failTake = null;
	this.canSpeak = false;
	this.failSpeak = "It doesn't speak. Watercooler conversations suck anyway.";
	this.canUse = false;
	this.usedWith = ["goldfish"];
	this.altState = false;

	this.x = 2;
	this.y = 12;
	this.length = 1;
	this.height = 2;
	gameRoom.objects.push(this);
}

var receptionDesk = new gameObject
{
	this.img = 'img/reception_desk.png'
	this.layerCode = 3;
	this.lookText = "A mighty fine desk.";
	this.canTake = false;
	this.takeText = null;
	this.failTake = null;
	this.canSpeak = false;
	this.failSpeak = "It doesn't speak.";
	this.canUse = false;
	this.usedWith = null;

	this.x = 14;
	this.y = 7;
	this.length = 3;
	this.height = 1;
	gameRoom.objects.push(this);
}

var reception = new gameObject
{
	this.img = 'img/reception.png';
	this.layerCode = 1;
	this.lookText = 'I could look at that all day.';
	this.canTake = false;
	this.takeText = null;
	this.failTake = null;
	this.canSpeak = true;
	this.failSpeak = null;
	this.canUse = true;
	this.usedWith = null;

	this.dialogue = [];
	this.dialogue[0] = {	text: "What do you want?",
												options:	[	{	reply: "How's your day?", next: 1},
																		{ reply: "You, in the back seat of my Corolla.", next: 2}
																	]
																};
	this.dialogue[1] = {	text: "Whatever."};
	this.dialogue[2] = {	text: "In your dreams, creep.",
												options:	[	{	reply: "Feelsbadman.", next: 1},
																		{ reply: "Been there, done that.", next: 3}
																	]
																};
	this.dialogue[3] = {	text: "Like, eww."};

	this.x = 15;
	this.y = 6;
	this.length = 1;
	this.height = 2;
	gameRoom.objects.push(this);
}
