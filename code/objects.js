// function for making new objects inherit from existing objects without calling class constructor
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

function Item (id) // default ui item class, all src images must follow naming convention
{
  this.id = id;
  this.canUse = false;
  this.aimg = new Image();
  this.oimg = new Image();
  this.aimg.src = "assets/sprites/gui/" + id + "A.png";
  this.oimg.src = "assets/sprites/gui/" + id + ".png";
}

function RoomObject (id, x, y, z, tileID, tileIDalt, useType) // default room interactable object class
{
  this.alt = false;
  this.id = id;
  this.x = x;
  this.y = y;
  this.z = z;
  this.tileID = tileID;
  this.tileIDalt = tileIDalt;
  this.useType = useType;
  this.item = null;
  this.text = {reg: {}, alt: {}, active: {}};
  this.init = function(room)
  {
    this.text.active = this.text.reg;
    room.objects.push(this);
  };
  this.look = function()
  {
    drawTextBox(this.text.active.look);
    dlog.active = true;
  };
  this.talk = function()
  {
    drawTextBox(this.text.active.talk);
    dlog.active = true;
  };
  this.use = function()
  {
    switch (this.useType)
    {
    case "item":
      delete game.player.room.BGArray[this.y][this.x][this.z];
      addObjectInv(this.item);
      drawTextBox(this.text.active.use);
      dlog.active = true;
      break;
    case "container":
      drawTextBox(this.text.active.use);
      dlog.active = true;
      if (!this.alt)
      {
        addObjectInv(this.item);
        this.text.active = this.text.alt;
        game.player.room.BGArray[this.y][this.x][this.z] = this.tileIDalt;
        this.alt = true;
      }
      break;
    case "dispenser":
      addObjectInv(this.item);
      drawTextBox(this.text.active.use);
      dlog.active = true;
      break;
    default:
      drawTextBox(this.text.active.use);
      dlog.active = true;
      break;
    }
  };
  this.spUse = function(item) // special use method for using items on object
  {
    if (this.alt)
    {
      drawTextBox(this.text.active.sp);
      dlog.active = true;
      this.text.active = this.text.reg;
      game.player.room[this.y][this.x][this.z] = this.tileID;
      this.alt = false;
    }
    else
    {
      drawTextBox(this.text.active.sp);
      dlog.active = true;
      this.text.active = this.text.alt;
      game.player.room.BGArray[this.y][this.x][this.z] = this.tileIDalt;
      this.alt = true;
    }
  };
}

function Npc (id, x, y) // NPC class
{
  RoomObject.call(this, id, x, y); // inherit RoomObject class
  this.img = new Image;
  this.img.src ="assets/sprites/char/"+ this.id +".png";
  this.text.reg.use = "I could get in trouble with HR if I do that.";
  this.text.reg.look = "It's " + id + ".";
  this.dlogIdx = 0; // index of dialogue progression
  this.dlog = [];
  this.talk = function() // this version works around drawTextBox in current state
  {
    writing.clear();
    dlog.active = true;
    if (this.dlog[this.dlogIdx].options !== undefined) // if not a terminal node
    {
      dlog.id = this.id;
      var t = ""; // for holding string concatenation
      for (var i = 0; i < this.dlog[this.dlogIdx].options.length; i++) // go through reply options
      {
        t += ("\n" + this.dlog[this.dlogIdx].options[i].reply); // bulk up t
      }
      drawTextBox(this.dlog[this.dlogIdx].text + t); // display NPC initial text and your reply options in one string
    }
    else
    {
      drawTextBox(this.dlog[this.dlogIdx].text);
      this.dlogIdx = 0; // reset to start
      dlog.id = null;
    }
  };
}
Npc.prototype = Object.create(RoomObject.prototype);

var reception = new Npc("Bridget", 7, 5);
reception.text.reg.look = "I could look at that all day.";
reception.dlog[0] = {	text: "What do you want?",
                         options:	[	{	reply: "<1> How's your day?", next: 1},
                                     { reply: "<2> You, in the back seat of my Corolla.", next: 2}]};
reception.dlog[1] = {	text: "Whatever."};
reception.dlog[2] = {	text: "In your dreams, creep.",
                         options:	[	{	reply: "<1> Feelsbadman.", next: 1},
                                     { reply: "<2> Been there, done that.", next: 3}]};
reception.dlog[3] = {	text: "Like, eww."};
reception.init(mainRoom);

var goldfish = new Item("goldfish");

var fishbowl = new RoomObject("fishbowl", 6, 7, 2, 124, 134, "container");
fishbowl.item = goldfish;
fishbowl.usedWith = "goldfish";
fishbowl.text.reg = {
  look: "Unprocessed fish sticks.",
  use: "Took the goldfish.",
  talk: "It stares back with a blank expression.",
  sp: "I'm really not a bad person."};
fishbowl.text.alt = {
  look: "No time for regrets.",
  use: "Really? The bowl too?",
  talk: "But nobody came.",
  sp: "I'm really not a bad person."};
fishbowl.init(mainRoom);

var watercooler = new RoomObject("watercooler", 9, 8, 2, 125, 126);
watercooler.usedWith = "goldfish";
watercooler.text.reg = {
  look: "For making uncomfortable small talk.",
  use: "I'm not thirsty.",
  talk: "It's even more awkward by yourself.",
  sp: "You put the gold fish in the water cooler."};
watercooler.text.alt = {
  look: "No time for regrets.",
  use: "Now I'm really not thirsty.",
  talk: "This is more tolerable than usual."};
watercooler.init(mainRoom);

/*  WIP

    var self = new Npc("Me", player.x, player.y);
    self.text.reg.look = "I'd need a mirror to do that.";
    self.text.reg.use = "Uh... that can wait until after work.";
*/
