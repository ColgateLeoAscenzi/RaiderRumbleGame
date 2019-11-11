var basicBox = {
    x: 0,
    y: 0,
    z: 0,
    height: 10,
    width: 10,
    model: createBasicBoxMesh(),
    hitBox: createBasicBoxBounding(),
    hitBoxEnabled: false,
    update: function(){
        if(this.hitBoxEnabled){
            scene.add(this.hitBox);
        }
        else{
            scene.remove(this.hitBox);
        }

    }
}
