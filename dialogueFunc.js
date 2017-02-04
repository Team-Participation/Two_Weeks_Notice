function dialogue()
{
	var textBG = new Image();
	textBG.onload = function()
	{
		surface.drawImage(textBG, 10, 10);
		surface.fillText("TEXT", 20, 20);
		//"TEXT" to be replaced with relevant get text
	};
	textBG.src = "img/textBG.png";
};