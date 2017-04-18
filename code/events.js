var flag = []; // event scripting flags

var fadeActive = false;
var fadeDir = 1;
var opacity = 0;

function setFade()
{
    fadeActive = true;
}

function fade()
{
    opacity += fadeDir * 0.02;
    if (opacity <= 0)
    {
        opacity = 0;
        fadeActive = false;
        fadeDir = 1;
    }
    if (opacity >= 1)
    {
        opacity = 1;
        fadeActive = false;
        fadeDir = -1;
    }
    document.getElementById("gameScreen").style.opacity = opacity;
    document.getElementById("gameScreen").style.filter = 'alpha(opacity=' + opacity * 100 + ")";
}

function CheckFlags()
{
    for (i = 0; i < flag.length; i++)
    {
        if (!flag[i].used)
        {
            switch (flag[i].id)
            {
                case "checkedPC":
                flag[i].used = true;
                cutScene.driver.checkPoints++;
                break;
                case "talkWaifu":
                flag[i].used = true;
                cutScene.driver.checkPoints++;
                break;
                case "talkWeeb":
                flag[i].used = true;
                cutScene.driver.checkPoints++;
                break;
                case "talkMoron":
                flag[i].used = true;
                cutScene.delivery.checkPoints++;
                break;
                case "talkWaifu2":
                flag[i].used = true;
                cutScene.delivery.checkPoints++;
                break;
                case "talkReception":
                flag[i].used = true;
                cutScene.delivery.checkPoints++;
                break;
                case "fedDog":
                flag[i].used = true;
                cutScene.dogchase.checkPoints++;
                break;
                case "emptiedMayo":
                flag[i].used = true;
                cutScene.psycho.checkPoints++;
                break;
                case "usedMayo":
                flag[i].used = true;
                cutScene.OnRoomSwitch = function()
                {
                    cutScene.active;
                    cutScene.party.checkPoints++;
                };
                break;
            }
        }
    }
    if (cutScene.driver.checkPoints == 3)
    {
        cutScene.driver.init();
    }
    if (cutScene.delivery.checkPoints == 3)
    {
        cutScene.delivery.init();
    }
    if (cutScene.dogchase.checkPoints == 1)
    {
        cutScene.dogchase.init();
    }
    if (cutScene.psycho.checkPoints == 1)
    {
        cutScene.psycho.init();
    }
    if (cutScene.party.checkPoints == 1)
    {
        cutScene.party.init();
    }
}

var cutScene =
{
    id: null,
    active: false,
    wait: false,
    Scene: function() // scene class
    {
        this.flag = false;
        this.dlogIdx = 0;
        this.checkPoints = 0;
        this.init = function()
        {
            cutScene.active = true;
            cutScene.id = this;
            this.flag = true;
            this.checkPoints = 0;
            this.initExtra();
        },
        this.initExtra = function() {},
        this.run = function()
        {
            dlog.Clear();
            if (this.dlogIdx !== null)
            {
                dlog.Push(this.dlog[this.dlogIdx].text);
            }
            else
            {
                cutScene.active = false;
                cutScene.id = null;
            }
            if (!cutScene.wait)
            {
                if (keyHandler.lastKey !== null)
                {
                    if (this.dlog[this.dlogIdx].action !== undefined)
                    {
                        this[this.dlog[this.dlogIdx].action]();
                        this.dlog[this.dlogIdx].action = undefined;
                    }
                    this.dlogIdx = this.dlog[this.dlogIdx].next;
                    keyHandler.lastKey = null;
                }
            }
        }
    },
    OnRoomSwitch: function()
    {
        // to be modified by code to launch special triggers
    }
};

cutScene.driver = new cutScene.Scene();
cutScene.driver.dlog =
[
    {text: "BRUCE: 'Oswald!'", next: 1},
    {text: "BRUCE: 'I forgot my speech. I need you to drive me back home.'", next: 2},
    {text: "OSWALD: 'Right now? I need to make sure Chad is ready for our big client meeting this afternoon.'", next: 3},
    {text: "BRUCE: 'He's a Burns, he was born ready. Besides, you ARE the assistant to the manager.", next: 4},
    {text: "OSWALD: '...'", next: 5},
    {text: "BRUCE: 'Bridget! Don't forget to order the food for the party.'", next: 6},
    {text: "BRIDGET: 'Whatever...'", next: null, action: "end"}
];
cutScene.driver.initExtra = function()
{
    boss.init(mainRoom);
    for (i = 0; i < game.player.room.npcs.length; i++)
    {
        if (game.player.room.npcs[i].id == "Bruce")
        {
            game.player.room.npcs[i].commands = ["down"];
        }
        if (game.player.room.npcs[i].id == "Oswald")
        {
            game.player.room.npcs[i].direction = "up";
        }
    }
};
cutScene.driver.end = function()
{
    for (i = 0; i < game.player.room.npcs.length; i++)
    {
        if (game.player.room.npcs[i].id == "Bruce")
        {
            game.player.room.npcs[i].commands = ["left", "left", "left", "left"] ;
        }
        if (game.player.room.npcs[i].id == "Oswald")
        {
            game.player.room.npcs[i].commands = ["up", "up", "left", "left"];
        }
        if (game.player.room.npcs[i].id == "Chad")
        {
            game.player.room.npcs[i].dlogIdx = 1;
        }
        if (game.player.room.npcs[i].id == "Bridget")
        {
            game.player.room.npcs[i].dlogIdx = 4;
        }
        if (game.player.room.npcs[i].id == "Emily")
        {
            game.player.room.npcs[i].dlogIdx = 4;
        }
    }
    setTimeout(setFade, 1000);
    setTimeout(cutScene.driver.endLoad, 2000);
};
cutScene.driver.endLoad = function()
{
    setFade();
    for (i = 0; i < game.player.room.npcs.length; i++)
    {
        if (game.player.room.npcs[i].id == "Bruce")
        {
            game.player.room.npcs[i].setPos(-1, -1, "left");
        }
        if (game.player.room.npcs[i].id == "Oswald")
        {
            game.player.room.npcs[i].setPos(-1, -1, "left");
        }
    }
}

cutScene.delivery = new cutScene.Scene();
cutScene.delivery.dlog =
[
    {text: "DELIVERY GUY: 'Yo! I got a delivery here for Philmore-Queensmum. Ay, you Philmore?'", next: 1},
    {text: "BRIDGET: 'On the counter is fine.'", next: 2, action: "leave"},
    {text: "BRIDGET: 'Hey, can you give me a hand?'", next: 3, action: "transition"},
    {text: "BRIDGET: 'Thanks, I'll take it from here.'", next: null, action: "end"},
];
cutScene.delivery.initExtra = function()
{
    delivery.init(mainRoom);
    for (i = 0; i < game.player.room.npcs.length; i++)
    {
        if (game.player.room.npcs[i].id == "Delivery")
        {
            game.player.room.npcs[i].commands = ["right", "right", "right", "right", "right"];
        }
    }
};
cutScene.delivery.leave = function()
{
    for (i = 0; i < game.player.room.npcs.length; i++)
    {
        for (i = 0; i < game.player.room.npcs.length; i++)
        {
            if (game.player.room.npcs[i].id == "Delivery")
            {
                game.player.room.npcs[i].commands = ["left", "left", "left", "left", "left", "left"];
            }
        }
    }
    setTimeout(setFade, 1000);
};
cutScene.delivery.transition = function()
{
    setTimeout(cutScene.delivery.transitionLoad, 1000);
};
cutScene.delivery.transitionLoad = function()
{
    for (i = 0; i < game.player.room.npcs.length; i++)
    {
        if (game.player.room.npcs[i].id == "Bridget")
        {
            game.player.room.npcs[i].swapRoom(breakRoom, 2, 4, "left");
        }
    }
    game.player.swapRoom("break", 1, 5, "right");
};
cutScene.delivery.end = function()
{
    for (i = 0; i < game.player.room.npcs.length; i++)
    {
        if (game.player.room.npcs[i].id == "Bridget")
        {
            game.player.room.npcs[i].direction = "down";
            game.player.room.npcs[i].dlogIdx = 7;
        }
    }
    cheese.init(breakRoom);
    fruitsalad.init(breakRoom);
    pastrami.init(breakRoom);
    liver.init(breakRoom);
    pie.init(breakRoom);
    fish.init(breakRoom);
};

cutScene.dogchase = new cutScene.Scene();
cutScene.dogchase.dlog =
[
    {text: "DOGGY: Woof! Woof!'", next: 1},
    {text: "BRIDGET: 'Doggy! Sit!'", next: 2},
    {text: "DOGGY: 'Arf?'", next: 3},
    {text: "BRIDGET: 'Damn it!'", next: null, action: "end"},
];
cutScene.dogchase.initExtra = function()
{
    for (i = 0; i < game.player.room.npcs.length; i++)
    {
        if (game.player.room.npcs[i].id == "Doggy")
        {
            game.player.room.npcs[i].setPos(10, 7, "right");
            game.player.room.npcs[i].commands = doggy.commandCache;
        }
    }
    for (i = 0; i < breakRoom.npcs.length; i++)
    {
        if (breakRoom.npcs[i].id == "Bridget")
        {
            breakRoom.npcs[i].setPos(20, 11, "left");
            breakRoom.npcs[i].commands = ["left", "up", "up", "left", "left"];
            game.player.room.npcs.push(breakRoom.npcs[i]);
            breakRoom.npcs.splice(i, 1);

        }
    }
};
cutScene.dogchase.end = function()
{
    for (i = 0; i < breakRoom.objects.length; i++)
    {
        if (breakRoom.objects[i].id == "cheese")
        {
            breakRoom.objects[i].text.active = breakRoom.objects[i].text.alt;
        }
        if (breakRoom.objects[i].id == "fruitsalad")
        {
            breakRoom.objects[i].text.active = breakRoom.objects[i].text.alt;
        }
        if (breakRoom.objects[i].id == "pastrami")
        {
            breakRoom.objects[i].text.active = breakRoom.objects[i].text.alt;
        }
        if (breakRoom.objects[i].id == "liver")
        {
            breakRoom.objects[i].text.active = breakRoom.objects[i].text.alt;
        }
        if (breakRoom.objects[i].id == "pie")
        {
            breakRoom.objects[i].text.active = breakRoom.objects[i].text.alt;
        }
        if (breakRoom.objects[i].id == "fish")
        {
            breakRoom.objects[i].text.active = breakRoom.objects[i].text.alt;
        }
    }
    for (i = 0; i < game.player.room.npcs.length; i++)
    {
        if (game.player.room.npcs[i].id == "Bridget")
        {
            game.player.room.npcs[i].dlogIdx = 8;
        }
    }
};

cutScene.psycho = new cutScene.Scene();
cutScene.psycho.dlog =
[
    {text: "'You either really want him to suffer...'", next: 1},
    {text: "'Or you're willing to risk a man's life just to see what I have to say.'", next: 2},
    {text: "'Either way...'", next: 3},
    {text: "'You're messed up dude.'", next: null},
];

cutScene.party = new cutScene.Scene();
cutScene.party.npcState = mainRoom.npcs;
cutScene.party.dlog =
[
    {text: "BRUCE: 'Listen up!'", next: 1},
    {text: "BRUCE: 'As you all know the company is paying to stuff you all with fat and carbs in honour of \"employee appreciation\" day.'", next: 2},
    {text: "BRUCE: 'So I’d \"appreciate\" if you would all find yourselves at the break room. Pronto.'", next: 3, action: "transition1"},
    {text: "BRUCE: '...so in conclusion, Philmore-Queensmum is proud to have you all as part of our family...'", next: 4},
    {text: "BRUCE: '...and we value each and every one of you...'", next: 5},
    {text: "BRUCE: '...et cetera, et cetera. Let's eat already.'", next: 6},
    {text: "'I can get behind that.'", next: 7},
    {text: "BRUCE: 'Too bad employee appreciation day wasn’t in two weeks instead.'", next: 8},
    {text: "BRUCE: 'We might have had the budget for some matzo ball soup! Haha, am I right?'", next: 9},
    {text: "EMILY: 'You're unbelievable.'", next: 10},
    {text: "BRUCE: 'Lighten up, it was a joke. Have some of this chopped liver, it’s fantastic.'", next: 11},
    {text: "EMILY: 'I'm fine, thanks.'", next: 12},
    {text: "BRUCE: 'Hmph, your loss.'", next: 13},
    {text: "BRUCE: 'Mmm, they made it extra creamy this time.'", next: 14},
    {text: "BRUCE: 'Oswald!'", next: 15},
    {text: "BRUCE: 'Get me a beer!'", next: 16},
    {text: "OSWALD: 'Sir, you know we’re not supposed to have alcohol in the workplace.'", next: 17},
    {text: "BRUCE: 'Is this a party or what? Come on, they’re in the bottom shelf. You’re having one too.''", next: 18},
    {text: "OSWALD: 'I have my client meeting in less than an hour.'", next: 19},
    {text: "BRUCE: 'Yeah and you could use some loosening up.'", next: 20},
    {text: "BRUCE: 'You look like you’re squeezing coal into diamonds back there.'", next: 21},
    {text: "BRUCE: 'Let’s go team! Bottoms up!'", next: 22, action: "transition2"},
    {text: "BUSINESSMAN: 'Hello, I'm here on behalf of Moriarty Estates Winery.'", next: 23},
    {text: "BRIDGET: 'Yes, one moment please.'", next: 24},
    {text: "*ring ring*", next: 25},
    {text: "OSWALD: 'Yes?'", next: 26},
    {text: "BRIDGET: 'Your two o'clock is here.'", next: 27, action: "boss"},
    {text: "BRUCE: 'Oswald!'", next: 28, action: "attn"},
    {text: "BRUCE: 'I don’t feel so good.'", next: 29},
    {text: "BRUCE: *hic* 'I need you to take me to the hospital.'", next: 30},
    {text: "OSWALD: 'Sir, the Moriarty people are here.'", next: 31},
    {text: "BRUCE: 'I’m serious. Urgh, I’ve never felt so sick in my life!'", next: 32},
    {text: "OSWALD: 'Sir, you’ve just had too much to drink. Have some water and lie down in your office for a bit.'", next: 33},
    {text: "BRUCE: *hic* 'I did not have too much!'", next: 34, action: "meet"},
    {text: "BRUCE: 'Gentlemen, thank you for coming. *hic* I am Bruce J. Burns and this is my son Chadwick.'", next: 35},
    {text: "BUSINESSMAN: 'It's a pleasure to meet both of you.'", next: 36},
    {text: "CHAD: 'sup'", next: 37},
    {text: "BRUCE: 'It will be his pleasure to speak with you today on behalf of our organization.'", next: 38, action: "turn"},
    {text: "BRUCE: 'Oswald, let's go.'", next: 39},
    {text: "OSWALD: '...'", next: null, action: "end"},
];
cutScene.party.initExtra = function()
{
    cutScene.OnRoomSwitch = function() {};
    for (i = 0; i < game.player.room.npcs.length; i++)
    {
        if (game.player.room.npcs[i].id == "Bruce")
        {
            game.player.room.npcs[i].setPos(-1, 4, "right");
            game.player.room.npcs[i].commands = ["right", "right", "right", "right"]
        }
        if (game.player.room.npcs[i].id == "Oswald")
        {
            game.player.room.npcs[i].setPos(-1, 3, "right");
            game.player.room.npcs[i].commands = ["right", "right", "right", "right"]
        }
    }
};
cutScene.party.transition1 = function()
{
    fadeActive = true;
    setTimeout(cutScene.party.transition1Load, 1000);
};
cutScene.party.transition1Load = function()
{
    for (i = 0; i < game.player.room.npcs.length; i++)
    {
        if (game.player.room.npcs[i].id == "Bruce")
        {
            game.player.room.npcs[i].setPos(-1, -1, "right");
        }
    }
    boss.init(breakRoom, 5, 3, "down");
    reception.init(breakRoom, 2, 7, "up");
    partner.init(breakRoom, 3, 7, "up");
    moron.init(breakRoom, 4, 7, "up");
    waifu.init(breakRoom, 5, 7, "up");
    weeb.init(breakRoom, 7, 7, "up");
    hrlady.init(breakRoom, 8, 7, "up");
    techie.init(breakRoom, 9, 7, "up");
    game.player.swapRoom("break", 6, 8, "up");
};
cutScene.party.transition2 = function()
{
    fadeActive = true;
    setTimeout(cutScene.party.transition2Load, 1000);
};
cutScene.party.transition2Load = function()
{
    game.player.swapRoom("main", 13, 12, "right");
    ceo.init(mainRoom);
    reception.init(mainRoom, 7, 6, "left");
    partner.init(mainRoom, 16, 11, "right");
    moron.init(mainRoom, 16, 6, "left");
    waifu.init(mainRoom, 7, 12, "up");
    weeb.init(mainRoom, 13, 6, "right");
    hrlady.init(mainRoom, 1, 12, "up");
    techie.init(mainRoom, 4, 12, "up");
    dogCage.init(mainRoom);
    for (i = 0; i < game.player.room.npcs.length; i++)
    {
        if (game.player.room.npcs[i].id == "Bruce")
        {
            game.player.room.npcs[i].setPos(-1, -1, "right");
        }
        if (game.player.room.npcs[i].id == "CEO")
        {
            game.player.room.npcs[i].commands = ["right", "right", "right", "right", "right"];
        }
    }
};
cutScene.party.attn = function()
{
    for (i = 0; i < game.player.room.npcs.length; i++)
    {
        if (game.player.room.npcs[i].id == "Oswald")
        {
            game.player.room.npcs[i].setPos(13, 6, "up");
        }
    }
};
cutScene.party.boss = function()
{
    for (i = 0; i < game.player.room.npcs.length; i++)
    {
        if (game.player.room.npcs[i].id == "Bruce")
        {
            game.player.room.npcs[i].setPos(12, 2, "down");
            game.player.room.npcs[i].commands = ["down"];
        }
    }
};
cutScene.party.meet = function()
{
    for (i = 0; i < game.player.room.npcs.length; i++)
    {
        if (game.player.room.npcs[i].id == "Bruce")
        {
            game.player.room.npcs[i].setPos(5, 4, "down");
        }
        if (game.player.room.npcs[i].id == "Oswald")
        {
            game.player.room.npcs[i].setPos(6, 4, "left");
        }
        if (game.player.room.npcs[i].id == "Chad")
        {
            game.player.room.npcs[i].setPos(6, 3, "left");
        }
        if (game.player.room.npcs[i].id == "CEO")
        {
            game.player.room.npcs[i].setPos(5, 5, "up");
        }
    }
    if (cutScene.psycho.flag)
    {
        this.dlog[37] = {text: "BRUCE: 'It will be his pleasure to speak with you today on beha- HUURRRGHH!'", next: 38};
        this.dlog[38] = {text: "BRIDGET: 'Oh, GROSS!'", next: 39};
        this.dlog[39] = {text: "OSWALD: 'Senpai no!'", next: 40};
        this.dlog[40] = {text: "OSWALD: 'I mean... Jesus Christ Bridget, call an ambulance!'", next: 41};
        this.dlog[41] = {text: "BUSINESSMAN: 'Oh dear. I think we had better be on our way.", next: null, action: "end"};
    }
};
cutScene.party.turn = function()
{
    for (i = 0; i < game.player.room.npcs.length; i++)
    {
        if (game.player.room.npcs[i].id == "Bruce")
        {
            game.player.room.npcs[i].setPos(5, 4, "right");
        }
    }
};
cutScene.party.end = function()
{
    game.context.clearRect(0, 0, game.width, game.height);
    states.currentState = "menu";
    alert("End of day 1!");
};
