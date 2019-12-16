var basicBox1 = {
    height: 10,
    width: 10,
    model: createBasicBoxMesh(1),
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

var basicBox2 = {
    height: 10,
    width: 10,
    model: createBasicBoxMesh(2),
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

var basicBox3 = {
    height: 10,
    width: 10,
    model: createBasicBoxMesh(3),
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

var basicBox4 = {
    height: 10,
    width: 10,
    model: createBasicBoxMesh(4),
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

var grassBox = {
    height: 10,
    width: 10,
    model: createGrassMesh(),
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

var grassBoxB = {
    height: 10,
    width: 10,
    model: createGrassMeshB(),
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

var dirtBlock1 = {
    height: 10,
    width: 10,
    model: createDirtBlockMesh(1),
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
var dirtBlock2 = {
    height: 10,
    width: 10,
    model: createDirtBlockMesh(2),
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
var dirtBlock3 = {
    height: 10,
    width: 10,
    model: createDirtBlockMesh(3),
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
var dirtBlock4 = {
    height: 10,
    width: 10,
    model: createDirtBlockMesh(4),
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
var dirtBlockB = {
    height: 10,
    width: 10,
    model: createDirtBlockMeshB(),
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

var cloudIco = {
    height: 10,
    width: 10,
    model: createCloudMesh(),
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

var iceBlock = {
    height: 10,
    width: 10,
    model: createIceBlockMesh(),
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

var waterBlock = {
    height: 10,
    width: 10,
    model: createWaterBlockMesh(),
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

var woodBlock = {
    height: 10,
    width: 10,
    model: createWoodBlockMesh(),
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
