function uiController() {
    this.room = new room();
};

uiController.prototype.newLevel = function(){
    
};

uiController.prototype.drawInitial = function(){
    states.menuStates[states.initial].enter();
    states.currentState = "menu";
}

uiController.prototype.updateMenu = function(){
    menuEst.updateMenu();
}

uiController.prototype.drawMenu = function(){
    menuEst.drawMenu();
}

uiController.prototype.wallCollision = function(playerNextPos){
    return this.room.wallCollision(playerNextPos);
}

uiController.prototype.objectCollision = function(playerNextPos){
    return this.room.objectCollision(playerNextPos);
}

uiController.prototype.initSprites = function(){
    this.room.initSprites();
}

uiController.prototype.initObjects = function(){
    this.room.initObjects();
}

uiController.prototype.createWalls = function(){
    this.room.createWalls();
}

uiController.prototype.drawRoom = function(){
    this.room.drawRoom();
}

uiController.prototype.drawObjects = function(layerCode){
    this.room.drawObjects(layerCode);
}