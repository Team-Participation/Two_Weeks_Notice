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
    room.BGArray[this.y][this.x][this.z] = this.tileID;
  };
  this.look = function()
  {
    if (this.text.active.look !== undefined)
    {
      drawTextBox(this.text.active.look);
      dlog.active = true;
    }
  };
  this.talk = function()
  {
    if (this.text.active.talk !== undefined)
    {
      drawTextBox(this.text.active.talk);
      dlog.active = true;
    }
  };
  this.use = function()
  {
    if (this.text.active.use !== undefined)
    {
      switch (this.useType)
      {
      case "item":
        delete game.player.room.BGArray[this.y][this.x][this.z];
        addObjectInv(this.item);
        drawTextBox(this.text.active.use);
        dlog.active = true;
        this.x = -1;
        this.y = -1;
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
    }
  };
  this.spUse = function() // special use method for using items on object
  {
    if (this.alt)
    {
      drawTextBox(this.text.active.sp);
      dlog.active = true;
      this.text.active = this.text.reg;
      game.player.room.BGArray[this.y][this.x][this.z] = this.tileID;
      this.alt = false;
      return true;
    }
    else
    {
      drawTextBox(this.text.active.sp);
      dlog.active = true;
      this.text.active = this.text.alt;
      game.player.room.BGArray[this.y][this.x][this.z] = this.tileIDalt;
      this.alt = true;
      return true;
    }
  };
}

function Npc (id, x, y, dir) // NPC class
{
  RoomObject.call(this, id, x, y); // inherit RoomObject class
  this.img = new Image;
  this.img.src ="assets/sprites/char/"+ this.id +".png";
  this.text.reg.use = "Um, I'm trying to get fired, not arrested.";
  this.text.reg.look = "It's " + id + ".";
  this.dlogIdx = 0; // index of dialogue progression
  this.dlog = [{text: "..."}];
  this.direction = dir; // direction the npc faces
  this.moves = false; // whether or not the npc moves around randomly
  this.time = 0; // controls render position during tile movement
  this.totalTime = 30; // total time it takes for the npc to move 1 tile
  this.init = function(room)
  {
    this.text.active = this.text.reg;
    room.npcs.push(this);
  };
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

var reception = new Npc("Bridget", 7, 5, "left");
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

var boss = new Npc("Bruce", 7, 3, "down");
boss.init(mainRoom);

var moron = new Npc("Chad", 16, 5, "left");
moron.init(mainRoom);

var weeb = new Npc("Oswald", 13, 5, "right");
weeb.init(mainRoom);

var ceo = new Npc("CEO", -1, -1, "right");

/*
var partner = new Npc("Greg", 16, 11, "left");
partner.init(mainRoom);

var waifu = new Npc("Emily", 7, 11, "down");
waifu.init(mainRoom);

var tech = new Npc("Boris", 4, 11, "down");
tech.init(mainRoom);

var hr = new Npc("Sue", 1, 11, "down");
hr.init(mainRoom)
*/

var goldfish = new Item("goldfish");
var jarMayo = new Item("jarMayo");
var jarEmpty = new Item("jarEmpty");
var wieners = new Item("wieners");
var laxative = new Item("laxative");

var myComp = new RoomObject("myComp", 14, 10, 2, 131, 131);
myComp.text.reg = {
  look: "My workstation."
};
myComp.use = function()
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
myComp.dlogIdx = 0;
myComp.dlog = [];
myComp.dlog[0] = {text: "What to do?",
                  options: [{reply: "<1> Today's event reminders", next: 1},
                            {reply: "<2> Check email", next: 2}]};
myComp.dlog[1] = {text: "12:00PM Employee Appreciation Lunch Party"};
myComp.dlog[2] = {text: "Six new forwards from Bruce. Wonderful."};
myComp.init(mainRoom);

var meetingDoor = new RoomObject("meetingDoor", 7, 1, 11, 11);
meetingDoor.text.reg = {
  look: "Meeting Room Booking Sheet \n 2:00PM Oswald + Chad, Client Meeting",
  use: "It's locked."};
meetingDoor.init(mainRoom);

var bossDoor = new RoomObject("bossDoor", 12, 1, 11, 11);
bossDoor.text.reg = {
  look: "Bruce J. Burns, Branch Manager",
  use: "It's locked."};
bossDoor.init(mainRoom);

var copier1 = new RoomObject("copier1", 17, 2, 59, 59);
copier1.text.reg = {
  look: "An all-in-one office paper thing.",
  use: "Jammed as usual."};
copier1.init(mainRoom);

var copier2 = new RoomObject("copier2", 10, 12, 59, 59);
copier2.text.reg = {
  look: "Another all-in-one office paper thing.",
  use: "It spat out a blank sheet of paper. Rad."};
copier2.init(mainRoom);

var fishbowl = new RoomObject("fishbowl", 6, 7, 2, 124, 134, "container");
fishbowl.item = goldfish;
fishbowl.usedWith = "goldfish";
fishbowl.text.reg = {
  look: "Unprocessed fish sticks.",
  use: "Took the goldfish.",
  talk: "It stares back with a blank expression."};
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

var fridge = new RoomObject("fridge", 6, 2, 1, 95, 95, "container");
fridge.item = wieners;
fridge.usedWith = "goldfish";
fridge.text.reg = {
  use: "All I have in here are some wieners.",
  sp: "...you need help dude."};
fridge.text.alt = {
  use: "Nothing else in here belongs to me.",
  sp: "...you need help dude."};
fridge.spUse = function()
{
  drawTextBox(fridge.text.active.sp);
  dlog.active = true;
  return false;
};
fridge.init(breakRoom);

var jarjarbg = new RoomObject("jarjarbg", 3, 1, 2, 148, 147, "item");
jarjarbg.item = jarMayo;
jarjarbg.text.reg = {
  look: "Yuck, this jar of mayo looks like it was left out all weekend.",
  use: "Ugh, it stinks."};
jarjarbg.init(breakRoom);

var television = new RoomObject("television", 11, 1, 1, 143, 143);
television.text.reg = {
  look: "Permanently tuned to the company propaganda channel.",
  use: "It's too high for me to reach."};
television.init(breakRoom);

var snackMachine = new RoomObject("snackMachine", 8, 2, 1, 96, 96);
snackMachine.text.reg = {
  look: "Salty carbs.",
  use: "I gave all my change to a homeless man this morning. Just kidding, I'm broke."};
snackMachine.init(breakRoom);

var sodaMachine = new RoomObject("sodaMachine", 9, 2, 1, 97, 97);
sodaMachine.text.reg = {
  look: "Sweet carbs.",
  use: "I gave all my change to a homeless man this morning. Just kidding, I'm broke."};
sodaMachine.init(breakRoom);

var coffeeMaker = new RoomObject("coffeeMaker", 4, 1, 2, 144, 144);
coffeeMaker.usedWith = "laxative";
coffeeMaker.text.reg = {
  look: "Productivity, in liquid form",
  use: "That would be counterproductive to me trying to be counterproductive.",
  sp: "Heh."};
coffeeMaker.text.alt = {
  look: "Productivity, in liquid form. Heh.",
  use: "Have you ever damaged the part of your brain that handles short term memory?"};
coffeeMaker.init(breakRoom);

var microwave = new RoomObject("microwave", 5, 1, 2, 145, 145);
microwave.usedWith = "goldfish";
microwave.text.reg = {
  use: "Beep, boop.",
  sp: "...you need help dude."};
microwave.spUse = function()
{
  drawTextBox(fridge.text.active.sp);
  dlog.active = true;
  return false;
};
microwave.init(breakRoom);

var extinguisher = new RoomObject("extinguisher", 7, 1, 1, 146, 146);
extinguisher.text.reg = {
  look: "A fire extinguisher.",
  use: "Slow down chief. Where's the fire?"};
extinguisher.init(breakRoom);

var cupboard = new RoomObject("cupboard", 4, 2, 1, 91, 91, "container");
cupboard.item = laxative;
cupboard.text.reg = {
  use: "Huh, there's a bottle of laxative in here."};
cupboard.init(breakRoom);

/*  WIP

    var self = new Npc("Me", player.x, player.y);
    self.text.reg.look = "I'd need a mirror to do that.";
    self.text.reg.use = "Uh... that can wait until after work.";
*/
