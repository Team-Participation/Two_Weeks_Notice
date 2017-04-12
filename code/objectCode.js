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
    this.init = function(target)
    {
        this.text.active = this.text.reg;
        target.objects.push(this);
        target.BGArray[this.y][this.x][this.z] = this.tileID;
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
    this.dlog = [{text: "...", next: 0}];
    this.direction = dir; // direction the npc faces
    this.moves = false; // whether or not the npc moves around randomly
    this.time = 0; // controls render position during tile movement
    this.totalTime = 30; // total time it takes for the npc to move 1 tile
    this.init = function(target)
    {
        this.text.active = this.text.reg;
        target.npcs.push(this);
    };
    this.swapRoom = function(target, x, y, dir)
    {
        if (dir !== undefined)
        {
            this.direction = dir;
        }
        this.x = x;
        this.y = y;
        target.npcs.push(this);
        var i = game.player.room.npcs.indexOf(this);
        game.player.room.npcs.splice(i, 1);
    },
    this.talk = function() // this version works around drawTextBox in current state
    {
        writing.clear();
        dlog.active = true;
        if (this.dlog[this.dlogIdx].flag !== undefined)
        {
            var b = true;
            for (i = 0; i < flag.length; i++)
            {
                if (flag[i].id == this.dlog[this.dlogIdx].flag.id)
                    var b = false;
            }
            if (b)
                flag.push(this.dlog[this.dlogIdx].flag);
        }
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
            this.dlogIdx = this.dlog[this.dlogIdx].next; // reset node
            dlog.id = null;
        }
    };
}
Npc.prototype = Object.create(RoomObject.prototype);

Player.prototype.dlogAdvance = function()
{
    for (i = 0; i < this.room.objects.length; i++)
    {
      if (this.room.objects[i].id == dlog.id)
      {
        switch (keyHandler.lastKey)
        {
          case 49:
          this.room.objects[i].dlogIdx = this.room.objects[i].dlog[this.room.objects[i].dlogIdx].options[0].next;
          keyHandler.lastKey = null;
          this.room.objects[i].use(); // continue until terminal node
          break;
          case 50:
          this.room.objects[i].dlogIdx = this.room.objects[i].dlog[this.room.objects[i].dlogIdx].options[1].next;
          keyHandler.lastKey = null;
          this.room.objects[i].use(); // continue until terminal node
          break;
          case 51:
          this.room.objects[i].dlogIdx = this.room.objects[i].dlog[this.room.objects[i].dlogIdx].options[2].next;
          keyHandler.lastKey = null;
          this.room.objects[i].use(); // continue until terminal node
          break;
        }
      }
    }
    for (i = 0; i < this.room.npcs.length; i++)
    {
      if (this.room.npcs[i].id == dlog.id)
      {
        switch (keyHandler.lastKey)
        {
          case 49:
          this.room.npcs[i].dlogIdx = this.room.npcs[i].dlog[this.room.npcs[i].dlogIdx].options[0].next;
          keyHandler.lastKey = null;
          this.room.npcs[i].talk(); // continue until terminal node
          break;
          case 50:
          this.room.npcs[i].dlogIdx = this.room.npcs[i].dlog[this.room.npcs[i].dlogIdx].options[1].next;
          keyHandler.lastKey = null;
          this.room.npcs[i].talk(); // continue until terminal node
          break;
        }
      }
    }
}
