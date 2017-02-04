//WIP: just using a clean file for ease of access, will be added to relevant .js when complete

//on interact with gameObject
function dialogue()
{
	var textBG = new Image();
	textBG.onload = function()
	{
		surface.drawImage(textBG, 10, 10);
		surface.fillText("TEXT", 20, 20);
		//"TEXT" to be replaced with relevant gameObject.text/dialogue
	};
	textBG.src = "img/textBG.png";
};
