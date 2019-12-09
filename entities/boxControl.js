var basicBox = {
    height: 10,
    width: 10,
    model: createBasicBoxMesh(),
    hitBox: createBasicBoxBounding(),
    hitBoxEnabled: false,
    grabbable: true,
    update: function(){
        if(this.hitBoxEnabled){
            stage.scene.add(this.hitBox);
        }
        else{
            stage.scene.remove(this.hitBox);
        }

    }
}

var dirtBlock = {
    height: 10,
    width: 10,
    model: createDirtBlockMesh(),
    hitBox: createBasicBoxBounding(),
    hitBoxEnabled: false,
    update: function(){
        if(this.hitBoxEnabled){
            stage.scene.add(this.hitBox);
        }
        else{
            stage.scene.remove(this.hitBox);
        }
    }
}

var platformBlock = {
    height: 5,
    width: 10,
    model: createPlatformMesh(),
    hitBox: createPlatformBoxBounding(),
    hitBoxEnabled: false,
    update: function(){
        if(this.hitBoxEnabled){
            stage.scene.add(this.hitBox);
        }
        else{
            stage.scene.remove(this.hitBox);
        }

    }
}
