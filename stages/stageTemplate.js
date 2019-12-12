var stageProto = {
    player1: undefined,
    player1Mesh: undefined,
    player1HitBoxMesh: undefined,
    player2: undefined,
    player2Mesh: undefined,
    player2HitBoxMesh: undefined,
    players: [],
    basicBoxAMesh: undefined,
    basicHitBoxAMesh: undefined,
    blockB: undefined,
    gravity: -0.75,
    scene: undefined,
    minimumY: -40,
    maximumY: 180,
    minimumX: -200,
    maximumX: 200,
    height: 0,
    width: 0,
    airResistance: 0,
    stageHitBoxes: [],
    stageBlocks:  [],
    blockAMeshes: [],
    timer: 0,
    timerIncrement: 0,
    maxTime: 120,
    skyBoxURL: ""
}

function createBox(x, y, z, blockType, stageRef) {

    stageRef.basicBoxAMesh = blockType.model.clone();
    // stageRef.basicBoxAMesh.material = new THREE.MeshPhongMaterial({ color : Colors.white});
    stageRef.basicBoxAMesh.position.set(x, y, z);
    stageRef.scene.add(stageRef.basicBoxAMesh);
    stageRef.stageBlocks.push(blockType);
    stageRef.blockAMeshes.push(stageRef.basicBoxAMesh);

    stageRef.basicHitBoxAMesh = blockType.hitBox.clone();

    stageRef.basicHitBoxAMesh.position.set(x, y, z);

    stageRef.stageHitBoxes.push(stageRef.basicHitBoxAMesh);

}

function createPlayer1(x, y, z, stageRef){
  stageRef.players.push(stageRef.player1);
  stageRef.player1Mesh = stageRef.player1.model;
  // player1Mesh.position.set(x, y, z);
  stageRef.player1HitBoxMesh = stageRef.player1.hitBox;
  stageRef.player1HitBoxMesh.position.set(x, y, z)
  stageRef.stageHitBoxes.push(stageRef.player1HitBoxMesh);

  stageRef.scene.add(stageRef.player1Mesh);
}

function createPlayer2(x, y, z, stageRef){
  stageRef.players.push(stageRef.player2);
  stageRef.player2Mesh = stageRef.player2.model;
  // player1Mesh.position.set(x, y, z);
  stageRef.player2HitBoxMesh = stageRef.player2.hitBox;
  stageRef.player2HitBoxMesh.position.set(x, y, z)
  stageRef.stageHitBoxes.push(stageRef.player2HitBoxMesh);

  stageRef.scene.add(stageRef.player2Mesh);
}
