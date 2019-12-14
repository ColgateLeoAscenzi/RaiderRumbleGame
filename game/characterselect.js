var heldDown1 = {left: false, right: false, up: false, down:false};
var heldDown2 = {left: false, right: false, up: false, down:false};

var charSelectHitboxes = [];
var selectableChars = [];
var p1Model, p2Model;

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
    selectableChars.push(newChar);
    newChar.position.x += i*30-90;
    newChar.position.y = 40.5;

    var charSelectHitGeom = new THREE.BoxGeometry(10,15,10,1,1,1);
    var charSelectHitMat = new THREE.MeshPhongMaterial({color: 0xff0000, transparent: true, opacity:0});
    var charSelectHitMesh = new THREE.Mesh(charSelectHitGeom,charSelectHitMat);
    charSelectHitMesh.userData = {character: characters[i]}

    characterSelectScene.add(charSelectHitMesh);
    charSelectHitboxes.push(charSelectHitMesh);
    charSelectHitMesh.position.x += i*30-90;
    charSelectHitMesh.position.y = 44;
    charSelectHitMesh.position.z += 10;

    //add p1 select images
    var charSelect = document.createElement("div");
    charSelect.id = "p"+(i+1)+"Select";
    charSelect.innerHTML = "Player "+(i+1)+": "+characters[i].name;
    charSelectCont.appendChild(charSelect);
  }

  buildSelectors();
  buildCapture();
  window.onkeydown = handleCharSelKeyDown;
  window.onkeyup = handleCharSelKeyUp;

  characterSelectLoop();
}

function buildSelectors(){
    var p1SelectorGeom = new THREE.CylinderGeometry(3,3,1, 19);
    var p1SelectorMat = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('images/menu/player1Selector.jpg')});
    p1SelectorMesh = new THREE.Mesh(p1SelectorGeom,p1SelectorMat);
    p1SelectorMesh.userData = {name:  "player1"}
    characterSelectScene.add(p1SelectorMesh);

    p1SelectorMesh.position.set(-93,40,7);
    p1SelectorMesh.rotation.set(radians(90),radians(90),0);

    var p2SelectorGeom = new THREE.CylinderGeometry(3,3,1, 19);
    var p2SelectorMat = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('images/menu/player2Selector.jpg')});
    p2SelectorMesh = new THREE.Mesh(p2SelectorGeom,p2SelectorMat);
    p2SelectorMesh.userData = {name:  "player2"}
    characterSelectScene.add(p2SelectorMesh);

    p2SelectorMesh.position.set(-63,40,6);
    p2SelectorMesh.rotation.set(radians(90),radians(90),0);
}

function buildCapture(){
  var p1CaptureGeom = new THREE.BoxGeometry(100,5,10);
  var p1CaptureMat = new THREE.MeshPhongMaterial({color:0x272e92});
  var p1CaptureMesh = new THREE.Mesh(p1CaptureGeom,p1CaptureMat);

  characterSelectScene.add(p1CaptureMesh);
  p1CaptureMesh.position.set(-53,-20,0);

  var p2CaptureGeom = new THREE.BoxGeometry(100,5,10);
  var p2CaptureMat = new THREE.MeshPhongMaterial({color:0xb60e16});
  var p2CaptureMesh = new THREE.Mesh(p2CaptureGeom,p2CaptureMat);

  characterSelectScene.add(p2CaptureMesh);
  p2CaptureMesh.position.set(56,-20,0);


}



function checkCollision(selector, hitboxArray){
  //checks collision between the selector coin and all of the hitboxes,
  //if one is selected, then it returns the associated player
  var bbox = new THREE.BoxHelper(selector, 0xff0000);
  var selectorHit = new THREE.Box3().setFromObject(bbox);

  for(var i = 0; i < hitboxArray.length; i++){
    var bboxHit = new THREE.BoxHelper(hitboxArray[i], 0xff0000);
    var hitBoxHit = new THREE.Box3().setFromObject(bboxHit);

    if(selectorHit.intersectsBox(hitBoxHit)){
      if(selector.userData.name == "player1"){
        selectedPlayer1 = hitboxArray[i].userData.character;
        p1Model = selectedPlayer1.model.clone();
        selector.position.z += 12;
        characterSelectScene.add(p1Model);
        p1Model.position.set(selector.position.x, selector.position.y, selector.position.z-4);
        p1Model.userData = {heldBy: "player1", selected: true}
      }
      if(selector.userData.name == "player2"){
        selectedPlayer2 = hitboxArray[i].userData.character;
        p2Model = selectedPlayer2.model.clone();
        selector.position.z += 12;
        characterSelectScene.add(p2Model);
        p2Model.position.set(selector.position.x, selector.position.y, selector.position.z-4);
        p2Model.userData = {heldBy: "player2", selected: true}
      }
    }

  }

}


function updatePositions(){

  if(heldDown1.left){
    if(p1SelectorMesh.position.x -1 > -112){
      p1SelectorMesh.position.x -=1;
      if(p1Model != undefined){
        p1Model.position.x-=1;
      }
    }
  }
  if(heldDown1.right){
    if(p1SelectorMesh.position.x + 1 < 112){
      p1SelectorMesh.position.x +=1;
      if(p1Model != undefined){
        p1Model.position.x+=1;
      }
    }
  }
  if(heldDown1.up){
    if(p1SelectorMesh.position.y + 1 < 55){
      p1SelectorMesh.position.y +=1;
      if(p1Model != undefined){
        p1Model.position.y+=1;
      }
    }
  }
  if(heldDown1.down){
    if(p1SelectorMesh.position.y - 1 > -21){
      p1SelectorMesh.position.y -=1;
      if(p1Model != undefined){
        p1Model.position.y-=1;
      }
    }
  }

  if(heldDown2.left){
    if(p2SelectorMesh.position.x -1 > -112){
      p2SelectorMesh.position.x -=1;
      if(p2Model != undefined){
        p2Model.position.x-=1;
      }
    }
  }
  if(heldDown2.right){
    if(p2SelectorMesh.position.x + 1 < 112){
      p2SelectorMesh.position.x +=1;
      if(p2Model != undefined){
        p2Model.position.x+=1;
      }
    }
  }
  if(heldDown2.up){
    if(p2SelectorMesh.position.y + 1 < 55){
      p2SelectorMesh.position.y +=1;
      if(p2Model != undefined){
        p2Model.position.y+=1;
      }
    }
  }
  if(heldDown2.down){
    if(p2SelectorMesh.position.y - 1 > -21){
      p2SelectorMesh.position.y -=1;
      if(p2Model != undefined){
        p2Model.position.y-=1;
      }
    }
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
  if(keyEvent.key == "j"){
    checkCollision(p1SelectorMesh, charSelectHitboxes);
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
  if(keyEvent.key == "1"){
    checkCollision(p2SelectorMesh, charSelectHitboxes);
  }

  if(keyEvent.key == " "){
    if(selectedPlayer1!= undefined && selectedPlayer2 !=undefined){
      if(p1InPosition && p2InPosition){
      }
    }
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
