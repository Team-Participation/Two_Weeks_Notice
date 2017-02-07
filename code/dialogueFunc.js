//WIP: just using a clean file for ease of access, will be added to relevant .js when complete
//?include function in update for mashing "B" to exit/cancel/back

//on interact with gameObject
function dialogue()
{
	var textBG = new Image();
	textBG.onload = function()
	{
		surface.drawImage(textBG, 10, 10);
		surface.fillText("TEXT", 20, 20);
		//"TEXT" to be replaced with relevant gameObject.text/dialogue
		//?display lookText first
		//gameObject.lookText, 20, 20
		//if interact && lookText displayed && canSpeak = false
			//remove lookText
			//gameObject.failSpeak, 20, 20
		//else
			//remove lookText
			//gameObject.dialogue[0], 20, 20
	};
	textBG.src = "img/textBG.png";
};
