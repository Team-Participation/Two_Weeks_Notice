/*
function for making new objects inherit from existing objects
*/

if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

function item (id) // default ui item class, all src images must follow naming convention
{
  this.id = id;
  this.canUse = false;
  this.aimg = new Image();
  this.oimg = new Image();
  this.aimg.src = "assets/gui/" + id + "A.png";
  this.oimg.src = "assets/gui/" + id + ".png";
}

function roomObject (id, x, y, z, tileID, tileIDalt, useType) // default room interactable object class
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
    timedText();
  };
  this.talk = function()
  {
    drawTextBox(this.text.active.talk);
    timedText();
  };
  this.use = function()
  {
    switch (this.useType)
    {
    case "item":
      delete firstRoom.BGArray[this.y][this.x][this.z];
      addObjectInv(this.item);
      drawTextBox(this.text.active.use);
      timedText();
      break;
    case "container":
      drawTextBox(this.text.active.use);
      timedText();
      if (!this.alt)
      {
        addObjectInv(this.item);
        this.text.active = this.text.alt;
        firstRoom.BGArray[this.y][this.x][this.z] = this.tileIDalt;
        this.alt = true;
      }
      break;
    case "dispenser":
      addObjectInv(this.item);
      drawTextBox(this.text.active.use);
      timedText();
      break;
    default:
      drawTextBox(this.text.active.use);
      timedText();
      break;
    }
  };
  this.spUse = function(item)
  {
    if (this.alt)
    {
      drawTextBox(this.text.active.sp);
      timedText();
      this.text.active = this.text.reg;
      firstRoom.BGArray[this.y][this.x][this.z] = this.tileID;
      this.alt = false;
    }
    else
    {
      drawTextBox(this.text.active.sp);
      timedText();
      this.text.active = this.text.alt;
      firstRoom.BGArray[this.y][this.x][this.z] = this.tileIDalt;
      this.alt = true;
    }
  };
}

var goldfish = new item("goldfish");

var fishbowl = new roomObject("fishbowl", 6, 7, 2, 124, 134, "container");
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
fishbowl.init(firstRoom);


var watercooler = new roomObject("watercooler", 9, 8, 2, 125, 126);
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
watercooler.init(firstRoom);
