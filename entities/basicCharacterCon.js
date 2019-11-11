var basicCharacter = {
    x: 0,
    y: 0,
    z: 0,
    model: createBasicCharacterMesh(),
    hitBox: createBasicCharacterBounding(),
    hitBoxEnabled: false,
    update: function(){
        if(this.hitBoxEnabled){
            this.hitBox.position.x = this.x;
            this.hitBox.position.y = this.y;
            this.hitBox.position.z = this.z;
            scene.add(this.hitBox);
        }
        else{
            scene.remove(this.hitBox);
        }
    }
}
