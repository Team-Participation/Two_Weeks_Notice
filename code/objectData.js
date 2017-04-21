var ceo = new Npc("CEO", 0, 5, "right");

var delivery = new Npc("Delivery", 0, 5, "right");

var boss = new Npc("Bruce", 12, 2, "down");

var reception = new Npc("Bridget", 7, 6, "left");
reception.text.reg.look = "Bridget, we never intended for her to be a stereotype.";
reception.dlog[0] = {	text: "BRIDGET: 'What do you want?'",
                         options:	[	{	reply: "<1> 'How's your day?'", next: 1},
                                     { reply: "<2> 'You, in the back seat of my Corolla.'", next: 2}]};
reception.dlog[1] = {	text: "BRIDGET: 'Whatever.'", next: 0};
reception.dlog[2] = {	text: "BRIDGET: 'In your dreams, creep.'",
                         options:	[	{	reply: "<1> 'Feelsbadman.'", next: 1},
                                     { reply: "<2> 'Been there, done that.'", next: 3}]};
reception.dlog[3] = {text: "BRIDGET: 'Like, eww.'", next: 0};
reception.dlog[4] = {text: "BRIDGET: 'Ugh, every year Bruce makes me order the chopped liver and every year he's the only one who eats it.'", next: 5};
reception.dlog[5] = {text: "BRIDGET: '...yes and one pastrami party platter...'", next: 6};
reception.dlog[6] = {text: "(She's on the phone)", next: 4, flag: {id: "talkReception", used: false}};
reception.dlog[7] = {text: "BRIDGET: 'Don't you have work to do?'", next: 7};
reception.dlog[8] = {text: "BRIDGET: 'Not now!'", next: 8};

var moron = new Npc("Chad", 16, 6, "left");
moron.text.reg.look = "Chad, the boss's dimwitted son. A walking example of why humans stopped letting their leaders be chosen by bloodline.";
moron.dlog[0] = {text: "OSWALD: 'Do you mind? We're in the middle of something here.'", next: 0};
moron.dlog[1] = {
    text: "CHAD: 'thx 4 gettin rid of the buzzkill scro'",
    options: [ {
            reply: "<1> 'Why is Oswald driving your dad around?'", next: 2
        }, {
            reply: "<2> 'I didn't do anything.'", next: 3
        }
    ]
};
moron.dlog[2] = {text: "CHAD: 'dunno scro'", next: 4};
moron.dlog[3] = {text: "CHAD: 'k scro'", next: 4};
moron.dlog[4] = {text: "CHAD: 'tryna frag here scro'", next: 4, flag: {id: "talkMoron", used: false}};

var weeb = new Npc("Oswald", 13, 6, "right");
weeb.text.reg.look = "That's Oswald from sales. He's... like any other guy, only more so.";
weeb.dlog[0] = {
    text: "OSWALD: 'I don't have time to talk. As the assistant manager, I have very important business to conduct.'",
    options: [ {
        reply: "<1> 'I thought you were assistant TO THE manager.'", next: 1
    }, {
        reply: "<2> 'Uh... okay.'", next: 2
    } ]
};
weeb.dlog[1] = {text: "OSWALD: 'This is hardly the time to be debating semantics.'", next: 3, flag: {id: "talkWeeb", used: false}};
weeb.dlog[2] = {text: "OSWALD: 'Thanks.'", next: 3, flag: {id: "talkWeeb", used: false}};
weeb.dlog[3] = {text: "OSWALD: '...'", next: 4};
weeb.dlog[4] = {text: "(He's ignoring you.)", next: 3};

var partner = new Npc("Greg", 16, 11, "left");
partner.text.reg.look = "My sales partner Greg. He's strictly business. I wonder what he thinks about having to work with me.";
partner.dlog[0] = {
    text: "GREG: 'Hey, you got any leads? Come on, you gotta help old Gil out! They're gonna foreclose on me!'",
    options: [ {
        reply: "<1> 'I thought your name was Greg.'", next: 1
    }, {
        reply: "<2> 'Uh, I have to go over there now.'", next: 1
    } ]
};
partner.dlog[1] = {text: "GREG: '...'", next: 0};

var waifu = new Npc("Emily", 7, 12, "down");
waifu.text.reg.look = "Emily works in accounting. She's one of the few people here I can call a friend.";
waifu.dlog[0] = {
    text: "EMILY: 'What's up?'",
    options: [ {
        reply: "<1> 'Wasn't the traffic awful this morning?'", next: 1
    }, {
        reply: "<2> 'The one-eyed trouser snake.'", next: 2
    } ]
};
waifu.dlog[1] = {
    text: "EMILY: 'I thought we were good enough friends to not have to resort to that kind of bullshit office small talk.'",
    options: [ {
        reply: "<1> 'Marry me...'", next: 3
    }, {
        reply: "<2> 'My B.'", next: 3
    } ]
};
waifu.dlog[2] = {
    text: "EMILY: 'I'm not the correct NPC for that response.'",
    options: [ {
        reply: "<1> 'What's an NPC?'", next: 3
    }, {
        reply: "<2> 'My B.'", next: 3
    } ]
};
waifu.dlog[3] = {text: "EMILY: (*＾▽＾)／", next: 0, flag: {id: "talkWaifu", used: false}};
waifu.dlog[4] = {
    text: "EMILY: 'What's up?'",
    options: [ {
        reply: "<1> 'Apparently Oswald is the boss's personal chaffeur now?'", next: 5
    }, {
        reply: "<2> 'Sorry about earlier, I wasn't quite myself.", next: 6
    } ]
};
waifu.dlog[5] = {
    text: "EMILY: 'You didn't hear this from me, but word is someone couldn't pass a breathalyzer test.'",
    options: [ {
        reply: "<1> 'Well damn.'", next: 9
    }, {
        reply: "<2> 'You're kidding!'", next: 7
    } ]
};
waifu.dlog[6] = {
    text: "EMILY: 'It's okay, you've barely been playing for ten minutes so I figured you were still a noob.'",
    options: [ {
        reply: "<1> 'Huh?'", next: 10
    }, {
        reply: "<2> 'Dude, stop breaking the fourth wall.'", next: 10
    } ]
};
waifu.dlog[7] = {
    text: "EMILY: 'Would I lie to you?'",
    options: [ {
        reply: "<1> 'Well damn.'", next: 9
    }, {
        reply: "<2> 'Um, yes?'", next: 8
    } ]
};
waifu.dlog[8] = {text: "EMILY: 'Cross my heart!' (>_^)b", next: 4, flag: {id: "talkWaifu2", used: false}};
waifu.dlog[9] = {text: "EMILY: 'I know right?!' (* ﾟ□ ﾟ )", next: 4, flag: {id: "talkWaifu2", used: false}};
waifu.dlog[10] = {text: "EMILY: (*＾▽＾)／", next: 4, flag: {id: "talkWaifu2", used: false}};

var techie = new Npc("Boris", 4, 12, "down");
techie.text.reg.use = "Are you out of your mind?";
techie.text.reg.look = "Boris is in charge of IT around here, but he spends most of his time at his desk yelling 'sookah bullyat'. Frankly he scares me.";
techie.dlog[0] = {text: "BORIS: 'Hallo my friend. I am DLC!'", next: 0};

var hrlady = new Npc("Sue", 1, 12, "down");
hrlady.text.reg.look = "Sue 'Mrs. Robinson' Robinson. Head of human resources. How ironic.";
hrlady.dlog[0] = {text: "SUE: 'Hi, I'm a DLC!'", next: 0};

var doggy = new Npc("Doggy", 7, 7, "down");
doggy.commandCache = ["right", "right", "right", "down", "down", "down", "left", "left", "left", "up", "up", "up"];
doggy.timer = 0;
doggy.use = function()
{
    this.talk();
};
doggy.Update = function()
{
    if(this.time == 0 && this.commands.length != 0)
    {
        this.move(this.commands[this.timer]);
        this.timer++;
        if (this.timer == 12)
            this.timer = 0;
    }
    else if(this.time == 30)
    {
        this.time = 0;
    }
    else if(this.time != 0)
    {
        this.time++;
    }
};
doggy.text.reg.look = "Free at last!";
doggy.text.reg.use = "DOGGY: 'Woof!'";
doggy.dlog[0] = {text: "He suddenly looks full of energy.", next: 1};
doggy.dlog[1] = {
    text: "DOGGY: 'Woof!'",
    options: [ {
        reply: "<1> Pet him.", next: 2
    }, {
        reply: "<2> 'Hi Doggy!'", next: 3
    } ]
};
doggy.dlog[2] = {text: "DOGGY: 'Woof!'~He starts running around.", next: 6, flag: {id: "fedDog", used: false}};
doggy.dlog[3] = {
    text: "DOGGY: 'Oh hi Johnny I didn't know it was you.'",
    options: [ {
        reply: "<1> 'That's me!'", next: 4
    }, {
        reply: "<2> 'Huh?'", next: 2
    } ]
};
doggy.dlog[4] = {
    text: "DOGGY: 'That'll be eighteen dol-'",
    options: [ {
        reply: "<1> 'Here you go! Keep the change!'", next: 5
    }, {
        reply: "<2> 'Huh?'", next: 2
    } ]
};
doggy.dlog[5] = {
    text: "DOGGY: 'You're my favourite customer!'",
    options: [ {
        reply: "<1> 'Hi Doggy!'", next: 3
    }, {
        reply: "<2> 'Huh?'", next: 2
    } ]
};
doggy.dlog[6] = {text: "DOGGY: 'Woof!'", next: 6};

reception.init(mainRoom);
weeb.init(mainRoom);
moron.init(mainRoom);
partner.init(mainRoom);
waifu.init(mainRoom);
techie.init(mainRoom);
hrlady.init(mainRoom)

var goldfish = new Item("goldfish");
var jarMayo = new Item("jarMayo");
var jarEmpty = new Item("jarEmpty");
var wieners = new Item("wieners");
var laxative = new Item("laxative");

var myComp = new RoomObject("myComp", 14, 10, 2, 131, 131);
myComp.text.reg = {
    look: "My 'work' station.",
    use: "for checkTile"
};
myComp.use = function()
{
    dlog.Clear();
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
        dlog.Push(this.dlog[this.dlogIdx].text);
        for (var i = 0; i < this.dlog[this.dlogIdx].options.length; i++) // go through reply options
        {
            dlog.Push(this.dlog[this.dlogIdx].options[i].reply);
        }
    }
    else
    {
        dlog.Push(this.dlog[this.dlogIdx].text);
        this.dlogIdx = 0; // reset to start
        dlog.id = null;
    }
};
myComp.dlogIdx = 0;
myComp.dlog = [];
myComp.dlog[0] = {
    text: "C:\\USERS\\PLAYERJUAN\\~_waiting for input...",
    options: [ {
            reply: "<1> Today's event reminders", next: 1
        }, {
            reply: "<2> Check email", next: 2
        }, {
            reply: "<3> Consult 'Two Weeks Notice' walkthrough", next: 3
        }
    ]
};
myComp.dlog[1] = {text: "12:00PM Employee Appreciation Lunch Party", flag: {id: "checkedPC", used: false}};
myComp.dlog[2] = {text: "Six new forwards from Bruce. Wonderful."};
myComp.dlog[3] = {text: "Look for clues on how to sabotage sales."};
myComp.init(mainRoom);

var dogCage = new RoomObject("dogCage", 8, 6, 1, 127, 128);
dogCage.usedWith = "wieners";
dogCage.text.reg = {
    look: "Poor guy. At least it's better than being in a handbag.",
    use: "You pet the dog. He looks hungry.~DOGGY: '...'",
    talk: "DOGGY: 'Arf?'",
    sp: "BRIDGET: 'Hey! What are you doing?'"
};
dogCage.spUse = function()
{
    if (!cutScene.delivery.flag)
    {
        dlog.Push(dogCage.text.active.sp);
        dlog.active = true;
    }
    else
    {
        game.player.room.BGArray[this.y][this.x][this.z] = this.tileIDalt;
        this.text.active = this.text.alt;
        this.alt = true;
        doggy.init(mainRoom);
        doggy.talk();
        return true;
    }
};
dogCage.init(mainRoom);

var meetingDoor = new RoomObject("meetingDoor", 7, 1, 11, 11);
meetingDoor.text.reg =
{
    look: "'Meeting Room Booking Sheet'~'2:00PM Oswald + Chad, Client Meeting'",
    use: "It's locked."
};
meetingDoor.init(mainRoom);

var bossDoor = new RoomObject("bossDoor", 12, 1, 11, 11);
bossDoor.text.reg =
{
    look: "'Bruce J. Burns'~'Regional Branch Manager'",
    use: "It's locked."
};
bossDoor.init(mainRoom);

var copier1 = new RoomObject("copier1", 17, 2, 59, 59);
copier1.text.reg =
{
    look: "An all-in-one office paper thing.",
    use: "Jammed as usual."
};
copier1.init(mainRoom);

var copier2 = new RoomObject("copier2", 10, 12, 59, 59);
copier2.text.reg =
{
    look: "Another all-in-one office paper thing.",
    use: "It spat out a blank sheet of paper. Rad."
};
copier2.init(mainRoom);

var fishbowl = new RoomObject("fishbowl", 6, 7, 2, 124, 134, "container");
fishbowl.item = goldfish;
fishbowl.usedWith = "goldfish";
fishbowl.text.reg =
{
    look: "Unprocessed fish sticks.",
    use: "Took the goldfish.",
    talk: "It stares back with a blank expression."
};
fishbowl.text.alt =
{
    look: "No time for regrets.",
    use: "Really? The bowl too?",
    talk: "But nobody came.",
    sp: "I'm really not a bad person."
};
fishbowl.init(mainRoom);

var watercooler = new RoomObject("watercooler", 9, 8, 2, 125, 126);
watercooler.usedWith = "goldfish";
watercooler.text.reg =
{
    look: "For making uncomfortable small talk.",
    use: "I'm not thirsty.",
    talk: "It's even more awkward by yourself.",
    sp: "You put the gold fish in the water cooler."
};
watercooler.text.alt =
{
    look: "No time for regrets.",
    use: "Now I'm really not thirsty.",
    talk: "This is more tolerable than usual."
};
watercooler.init(mainRoom);

var fridge = new RoomObject("fridge", 6, 2, 1, 95, 95, "container");
fridge.item = wieners;
fridge.usedWith = "goldfish";
fridge.text.reg =
{
    use: "All I have in here are some wieners.",
    sp: "...you need help dude."
};
fridge.text.alt =
{
    use: "Nothing else in here belongs to me.",
    sp: "...you need help dude."
};
fridge.spUse = function()
{
    dlog.Push(fridge.text.active.sp);
    dlog.active = true;
    return false;
};
fridge.init(breakRoom);

var jarjarbg = new RoomObject("jarjarbg", 3, 1, 2, 148, 147, "item");
jarjarbg.item = jarMayo;
jarjarbg.text.reg =
{
    look: "Yuck, this jar of mayo looks like it was left out all weekend.",
    use: "Ugh, it's rancid. Someone could get very sick eating this."
};
jarjarbg.init(breakRoom);

var television = new RoomObject("television", 11, 1, 1, 143, 143);
television.text.reg =
{
    look: "Permanently tuned to the company propaganda channel."
};
television.init(breakRoom);

var snackMachine = new RoomObject("snackMachine", 8, 2, 1, 96, 96);
snackMachine.text.reg =
{
    look: "Salty carbs.",
    use: "I gave all my change to a homeless man this morning.~Just kidding, I'm broke."
};
snackMachine.init(breakRoom);

var sodaMachine = new RoomObject("sodaMachine", 9, 2, 1, 97, 97);
sodaMachine.text.reg =
{
    look: "Sweet carbs.",
    use: "I gave all my change to a homeless man this morning.~Just kidding, I'm broke."
};
sodaMachine.init(breakRoom);

var coffeeMaker = new RoomObject("coffeeMaker", 4, 1, 2, 144, 144);
coffeeMaker.usedWith = "laxative";
coffeeMaker.text.reg =
{
    look: "Productivity, in liquid form",
    use: "That would be counterproductive to me trying to be counterproductive.",
    sp: "Heh."
};
coffeeMaker.text.alt =
{
    look: "Productivity, in liquid form. Heh.",
    use: "Did you damage the part of your brain that handles short term memory?"
};
coffeeMaker.init(breakRoom);

var microwave = new RoomObject("microwave", 5, 1, 2, 145, 145);
microwave.usedWith = "goldfish";
microwave.text.reg =
{
    use: "Beep, boop.",
    sp: "...you need help dude."
};
microwave.spUse = function()
{
    dlog.Push(fridge.text.active.sp);
    dlog.active = true;
    return false;
};
microwave.init(breakRoom);

var extinguisher = new RoomObject("extinguisher", 7, 1, 1, 146, 146);
extinguisher.text.reg =
{
    look: "A fire extinguisher.",
    use: "Slow down chief. Where's the fire?"
};
extinguisher.init(breakRoom);

var cupboard = new RoomObject("cupboard", 4, 2, 1, 91, 91, "container");
cupboard.item = laxative;
cupboard.text.reg =
{
    use: "Huh, there's a bottle of laxative in here."
};
cupboard.init(breakRoom);

var cheese = new RoomObject("cheese", 2, 5, 2, 150, 150);
cheese.usedWith = "jarMayo";
cheese.text.reg = {
    look: "Some assorted cheeses.",
    use: "BRIDGET: 'Hey! Get away from that!'",
    sp: "BRIDGET: 'Hey! Get away from that!'"
};
cheese.text.alt = {
    look: "Some assorted cheeses.",
    use: "Where are your manners?",
    sp: "Uh, no. I plan on having some of that."
};
cheese.spUse = function()
{
    dlog.Push(this.text.active.sp);
    dlog.active = true;
};

var fruitsalad = new RoomObject("fruitsalad", 3, 5, 2, 151, 151);
fruitsalad.usedWith = "jarMayo";
fruitsalad.text.reg = {
    look: "An assorted fruit platter.",
    use: "BRIDGET: 'Hey! Get away from that!'",
    sp: "BRIDGET: 'Hey! Get away from that!'"
};
fruitsalad.text.alt = {
    look: "An assorted fruit platter.",
    use: "Where are your manners?",
    sp: "Uh, no. I plan on having some of that."
};
fruitsalad.spUse = function()
{
    dlog.Push(this.text.active.sp);
    dlog.active = true;
};

var pastrami = new RoomObject("pastrami", 4, 5, 2, 152, 152);
pastrami.usedWith = "jarMayo";
pastrami.text.reg = {
    look: "Finely sliced pastrami on rye.",
    use: "BRIDGET: 'Hey! Get away from that!'",
    sp: "BRIDGET: 'Hey! Get away from that!'"
};
pastrami.text.alt = {
    look: "Finely sliced pastrami on rye.",
    use: "Where are your manners?",
    sp: "Uh, no. I plan on having some of that."
};
pastrami.spUse = function()
{
    dlog.Push(this.text.active.sp);
    dlog.active = true;
};

var pie = new RoomObject("pie", 8, 5, 2, 154, 154);
pie.usedWith = "jarMayo";
pie.text.reg = {
    look: "A freshly baked apple pie.",
    use: "BRIDGET: 'Hey! Get away from that!'",
    sp: "BRIDGET: 'Hey! Get away from that!'"
};
pie.text.alt = {
    look: "A freshly baked apple pie.",
    use: "Where are your manners?",
    sp: "Uh, no. I plan on having some of that."
};
pie.spUse = function()
{
    dlog.Push(this.text.active.sp);
    dlog.active = true;
};

var fish = new RoomObject("fish", 9, 5, 2, 155, 155);
fish.usedWith = "jarMayo";
fish.text.reg = {
    look: "Gefilte fish. Oy vey!",
    use: "BRIDGET: 'Hey! Get away from that!'",
    sp: "BRIDGET: 'Hey! Get away from that!'"
};
fish.text.alt = {
    look: "Gefilte fish. Oy vey!",
    use: "Where are your manners?",
    sp: "Uh, no. I plan on having some of that."
};
fish.spUse = function()
{
    dlog.Push(this.text.active.sp);
    dlog.active = true;
};

var liver = new RoomObject("liver", 7, 5, 2, 153, 153);
liver.usedWith = "jarMayo";
liver.useIdx = 0;
liver.text.reg = {
    look: "Chopper liver. Yuck!",
    use: "BRIDGET: 'Hey! Get away from that!'",
    sp: "BRIDGET: 'Hey! Get away from that!'"
};
liver.text.alt = {
    look: "Chopper liver. Yuck!",
    use: "Oh hell no.",
    sp: "You mix some mayo in with the chopped liver."
};
liver.spUse = function()
{
    if (!cutScene.dogchase.flag)
    {
        dlog.Push(this.text.active.sp);
        dlog.active = true;
    }
    else
    {
        switch (this.useIdx)
        {
            case 0:
            this.useIdx++;
            dlog.Push(this.text.active.sp);
            flag.push({id:"usedMayo", used: false});
            dlog.active = true;
            break;
            case 1:
            this.useIdx++;
            dlog.Push(this.text.active.sp);
            dlog.active = true;
            break;
            case 2:
            this.useIdx++;
            dlog.Push(this.text.active.sp);
            dlog.Push("...~'That looks like enough.'");
            dlog.active = true;
            break;
            case 3:
            this.useIdx++;
            dlog.Push(this.text.active.sp);
            dlog.Push("...~'Really, I think that's enough.'");
            dlog.active = true;
            break;
            case 4:
            this.useIdx++;
            dlog.Push(this.text.active.sp);
            dlog.Push("...~'I don't want to make him too sick.'");
            dlog.active = true;
            break;
            case 5:
            this.useIdx++;
            dlog.Push(this.text.active.sp);
            dlog.Push("...~'This is a level of sociopathy I'm uncomfortable with.'");
            dlog.active = true;
            break;
            case 6:
            this.useIdx++;
            dlog.Push(this.text.active.sp);
            dlog.Push("...");
            dlog.active = true;
            break;
            case 7:
            this.useIdx++;
            dlog.Push(this.text.active.sp);
            dlog.Push("...");
            dlog.active = true;
            break;
            case 8:
            dlog.Push(this.text.active.sp);
            dlog.Push("...~The jar is now empty.");
            dlog.active = true;
            flag.push({id:"emptiedMayo", used: false});
            return true;
            break;
        }
    }
};

/*  WIP

var self = new Npc("Me", player.x, player.y);
self.text.reg.look = "I'd need a mirror to do that.";
self.text.reg.use = "Uh... that can wait until after work.";
*/
