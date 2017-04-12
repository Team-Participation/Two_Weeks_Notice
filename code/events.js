var flag = []; // event scripting flags

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
}

var cutScene =
{
    id: null,
    active: false,
    Scene: function() // scene class
    {
        this.dlogIdx = 0;
        this.checkPoints = 0;
        this.init = function()
        {
            cutScene.active = true;
            cutScene.id = this;
            this.checkPoints = 0;
            this.initExtra();
        },
        this.initExtra = function() {},
        this.run = function()
        {
            writing.clear();
            if (this.dlogIdx !== null)
            {
                drawTextBox(this.dlog[this.dlogIdx].text);
            }
            else
            {
                cutScene.active = false;
                cutScene.id = null;
            }
            if (keyHandler.lastKey !== null)
            {
                if (this.dlog[this.dlogIdx].action !== undefined)
                {
                    this[this.dlog[this.dlogIdx].action]();
                }
                this.dlogIdx = this.dlog[this.dlogIdx].next;
                keyHandler.lastKey = null;
            }
        }
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
};
cutScene.driver.end = function()
{
    for (i = 0; i < game.player.room.npcs.length; i++)
    {
        if (game.player.room.npcs[i].id == "Bruce")
        {
            game.player.room.npcs[i].x = -1;
            game.player.room.npcs[i].y = -1;
        }
        if (game.player.room.npcs[i].id == "Oswald")
        {
            game.player.room.npcs[i].x = -1;
            game.player.room.npcs[i].y = -1;
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
};

cutScene.delivery = new cutScene.Scene();
cutScene.delivery.dlog =
[
    {text: "DELIVERY MAN: 'Yo! I got a delivery here for Philmore-Queensmum. Ay, you Philmore?'", next: 1},
    {text: "BRIDGET: 'On the counter is fine.'", next: 2, action: "leave"},
    {text: "BRIDGET: 'Hey, can you give me a hand?'", next: 3, action: "transition"},
    {text: "BRIDGET: 'I'll take it from here.'", next: null, action: "end"},
];
cutScene.delivery.initExtra = function()
{
    ceo.init(mainRoom);
};
cutScene.delivery.leave = function()
{
    for (i = 0; i < game.player.room.npcs.length; i++)
    {
        if (game.player.room.npcs[i].id == "CEO")
        {
            game.player.room.npcs[i].x = -1;
            game.player.room.npcs[i].y = -1;
        }
    }
};
cutScene.delivery.transition = function()
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
};
