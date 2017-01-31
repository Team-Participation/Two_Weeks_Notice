var goldfish = new gameObject
{
	this.type = "goldfish";
	this.img = 'goldfish.png';
	this.layerCode = 2;
	this.lookText = 'Unprocessed fishsticks.'
	this.canTake = true;
	this.takeText = '...';
	this.failTake = null;
	this.canSpeak = false;
	this.failSpeak = 'It stares back with a blank expression.'
	this.canUse = false;
	this.usedWith = null;

	this.x = 999;
	this.y = 999;
	this.length = 1;
	this.height = 1;
}

var watercooler = new gameObject
{
	this.type = "watercooler";
	this.img = 'watercooler.png';
	this.imgAlt = 'watercooler2.png';
	this.layerCode = 3;
	this.lookText = 'For making uncomfortable small talk.'
	this.canTake = false;
	this.takeText = null;
	this.failTake = null;
	this.canSpeak = false;
	this.failSpeak = "It doesn't speak. Watercooler conversations suck anyway."
	this.canUse = false;
	this.usedWith = ["goldfish"];
	this.altState = false;

	this.x = 777;
	this.y = 777;
	this.length = 1;
	this.height = 2;
}

var reception = new gameObject
{
	this.type = "reception";
	this.img = 'reception.png';
	this.layerCode = 1;
	this.lookText = 'I could look at that all day.'
	this.canTake = false;
	this.takeText = null;
	this.failTake = null;
	this.canSpeak = true;
	this.failSpeak = null;
	this.canUse = true;
	this.usedWith = null;

	this.x = 666;
	this.y = 666;
	this.length = 1;
	this.height = 2;

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

}
