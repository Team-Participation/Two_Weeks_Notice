function inventory(){
    this.slots = new inventorySlot(11);
    this.pickUpItm = function(itemObj) {
        var itemStored = this.slots.findIndex(function(inventorySlot){return inventorySlot.item.name == itemObj.name});
        if(itemStored == -1){
            var emptySlot = this.slots.findIndex(function(inventorySlot){return inventorySlot.item === null});
            if(emptySlot == -1){
                console.log("Inventory Full");
                return false;
            }else{
                this.slots(emptySlot).item = itemObj;
                return true;
            }
        }else{
            this.slots(itemStored).quantity++;
            return true;
        }
    };
    this.checkMoveItm = function(slotSel, slotRem) {
        if(slot < 0 || slot > 11){
            error = 221; //error code for surpassing allowed inventory size
            console.log("surpassed allowed inventory size");
            return false;
        }else if(this.slots(slotSel).item === null || this.slots(slotSel).item == this.slots(slotRem).item){
            return true;
        }else{
            return false;
        }
    };
    this.moveItm = function(slotSel, slotRem) {
        if(slot < 0 || slot > 11){
            error = 221; //error code for surpassing allowed inventory size
            console.log("surpassed allowed inventory size");
            return false;
        }else if(slotSel == slotRem){
            return true;
        }else if(this.slots(slotSel).item === null){
            this.slots(slotSel) = this.slots(slotRem);
            this.slots(slotRem).reset();
        }else if(this.slots(slotSel).item !== null){
            this.tempSlot = this.slots(slotSel);
            this.slots(slotSel) = this.slots(slotRem);
            this.slots(slotRem) = this.tempSlot;
        }
    };
}

function inventorySlot(){
    this.item = null;
    this.quantity = 0;
    this.reset = function() {
        this.item = null;
        this.quantity = 0;
    };

}