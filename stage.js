
var stageA = {
    player1: undefined,
    player1Mesh: undefined,
    player1HitBoxMesh: undefined,
    player2: undefined,
    blockA: basicBox,
    basicBoxAMesh: undefined,
    basicHitBoxAMesh: undefined,
    blockB: undefined,
    gravity: -0.75,
    scene: undefined,
    minimumY: 0,
    height: 0,
    width: 0,
    airResistance: 0,
    stageHitBoxes: [],
    stageBlocks:  [],
    blockAMeshes: [],
    timer: 0,
    init: function(){
        this.createScene();
        this.populateScene();
        createPlayer1(0, 10, 0);
    },
    createScene: function(){
        this.scene = new THREE.Scene();
        var ambientLight = new THREE.AmbientLight(Colors.white, 0.1);
        this.scene.add(ambientLight);

        var directLight = new THREE.PointLight(Colors.white, 1.2);
        directLight.position.set(0, 80, 90);
        this.scene.add(directLight);

        this.scene.fog = new THREE.Fog(Colors.skyBlue, -100, -950);

    },
    populateScene: function(){
        //replace the block with blockA
        for(var i = -5; i < 6; i++){
            if(i == -5 || i == 5){
                createBoxA(i*this.blockA.width,this.blockA.height, 0);
                createBoxA(i*this.blockA.width, this.blockA.height*2, 0);
            }
            if(i == 0){
                createBoxA(i*this.blockA.width, 0, 0);
                createBoxA(i*this.blockA.width, this.blockA.height*3, 0);
            }
            else{
                createBoxA(i*this.blockA.width, 0, 0);
            }
        }
    },
    update: function(){
        this.timer+= 1;
    }
}


function createBoxA(x, y, z) {

    stageA.basicBoxAMesh = basicBox.model.clone();
    stageA.basicBoxAMesh.material = new THREE.MeshPhongMaterial({ color : Colors.grey});
    stageA.basicBoxAMesh.position.set(x, y, z);
    stageA.scene.add(stageA.basicBoxAMesh);
    stageA.stageBlocks.push(stageA.blockA);
    stageA.blockAMeshes.push(stageA.basicBoxAMesh);

    stageA.basicHitBoxAMesh = basicBox.hitBox.clone();

    stageA.basicHitBoxAMesh.position.set(x, y, z);

    stageA.stageHitBoxes.push(stageA.basicHitBoxAMesh);

}

function createPlayer1(x, y, z){
  stageA.player1 = basicCharacter;
  stageA.player1Mesh = stageA.player1.model;
  // player1Mesh.position.set(x, y, z);
  stageA.player1HitBoxMesh = stageA.player1.hitBox;
  stageA.player1HitBoxMesh.position.set(x, y, z)
  stageA.stageHitBoxes.push(stageA.player1HitBoxMesh);

  stageA.scene.add(stageA.player1Mesh);
}
