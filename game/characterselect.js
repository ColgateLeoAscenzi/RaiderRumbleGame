var heldDown1 = {left: false, right: false, up: false, down:false};
var heldDown2 = {left: false, right: false, up: false, down:false};

function characterSelectLoop(){


    updatePositions();


    if(!charactersSelected){
      requestAnimationFrame(characterSelectLoop);
    }
    else{
        buildStageSelect();
    }

      renderer.render(characterSelectScene, characterSelectCamera);
}

function buildCharacterSelect(){
  var characters = [basicCharacter, pingu];

  characterSelectScene = new THREE.Scene();
  characterSelectCamera.position.set(0,50,250);
  characterSelectCamera.lookAt(0,0,0);
  noonLights(characterSelectScene);

  //get container add select images
  var container = document.getElementById("container");
  var charSelectCont = document.createElement("div");
  charSelectCont.id = "pSelectContainer";
  container.appendChild(charSelectCont);

  //character selection platforms, 2 characters
  for(var i = 0; i < 2; i++){
    var playerStandMesh = createBasicBoxMesh(1+Math.random()*3);
    characterSelectScene.add(playerStandMesh);
    playerStandMesh.position.x += i*30-90;
    playerStandMesh.position.y = 30;
    var newChar = characters[i].model.clone();
    characterSelectScene.add(newChar);
    newChar.position.x += i*30-90;
    newChar.position.y = 40.5;

    //add p1 select images
    var charSelect = document.createElement("div");
    charSelect.id = "p"+(i+1)+"Select";
    charSelect.innerHTML = "Player "+(i+1)+": "+characters[i].name;
    charSelectCont.appendChild(charSelect);
  }

  buildSelectors();
  window.onkeydown = handleCharSelKeyDown;
  window.onkeyup = handleCharSelKeyUp;

  characterSelectLoop();
}

function buildSelectors(){
    var p1SelectorGeom = new THREE.CylinderGeometry(3,3,1, 19);
    var p1SelectorMat = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('images/menu/player1Selector.jpg')});
    p1SelectorMesh = new THREE.Mesh(p1SelectorGeom,p1SelectorMat);
    characterSelectScene.add(p1SelectorMesh);

    p1SelectorMesh.position.set(-93,40,7);
    p1SelectorMesh.rotation.set(radians(90),radians(90),0);

    var p2SelectorGeom = new THREE.CylinderGeometry(3,3,1, 19);
    var p2SelectorMat = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('images/menu/player2Selector.jpg')});
    p2SelectorMesh = new THREE.Mesh(p2SelectorGeom,p2SelectorMat);
    characterSelectScene.add(p2SelectorMesh);

    p2SelectorMesh.position.set(-63,40,6);
    p2SelectorMesh.rotation.set(radians(90),radians(90),0);

}

function updatePositions(){
  if(heldDown1.left){
    p1SelectorMesh.position.x -=1;
  }
  if(heldDown1.right){
    p1SelectorMesh.position.x +=1;
  }
  if(heldDown1.up){
    p1SelectorMesh.position.y +=1;
  }
  if(heldDown1.down){
    p1SelectorMesh.position.y -=1;
  }

  if(heldDown2.left){
    p2SelectorMesh.position.x -=1;
  }
  if(heldDown2.right){
    p2SelectorMesh.position.x +=1;
  }
  if(heldDown2.up){
    p2SelectorMesh.position.y +=1;
  }
  if(heldDown2.down){
    p2SelectorMesh.position.y -=1;
  }



}

function handleCharSelKeyDown(keyEvent){
  if(keyEvent.key == "a"){
    heldDown1.left = true;
  }
  if(keyEvent.key == "d"){
    heldDown1.right = true;
  }
  if(keyEvent.key == "s"){
    heldDown1.down = true;
  }
  if(keyEvent.key == "w"){
    heldDown1.up = true;
  }

  if(keyEvent.key == "ArrowLeft"){
    heldDown2.left = true;
  }
  if(keyEvent.key == "ArrowRight"){
    heldDown2.right = true;
  }
  if(keyEvent.key == "ArrowDown"){
    heldDown2.down = true;
  }
  if(keyEvent.key == "ArrowUp"){
    heldDown2.up = true;
  }
}

function handleCharSelKeyUp(keyEvent){
  if(keyEvent.key == "a"){
    heldDown1.left = false;
  }
  if(keyEvent.key == "d"){
    heldDown1.right = false;
  }
  if(keyEvent.key == "s"){
    heldDown1.down = false;
  }
  if(keyEvent.key == "w"){
    heldDown1.up = false;
  }

  if(keyEvent.key == "ArrowLeft"){
    heldDown2.left = false;
  }
  if(keyEvent.key == "ArrowRight"){
    heldDown2.right = false;
  }
  if(keyEvent.key == "ArrowDown"){
    heldDown2.down = false;
  }
  if(keyEvent.key == "ArrowUp"){
    heldDown2.up = false;
  }
}
