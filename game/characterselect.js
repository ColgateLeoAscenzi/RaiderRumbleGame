var heldDown1 = {left: false, right: false, up: false, down:false};
var heldDown2 = {left: false, right: false, up: false, down:false};

var charSelectHitboxes = [];
var selectableChars = [];
var p1Model, p2Model;

var gravity = 2;

function characterSelectLoop(){

    updatePositions();

    updateGrabbedPlayers()

    if(!charactersSelected){
      requestAnimationFrame(characterSelectLoop);
    }
    else{
        document.onkeydown = handleMapKeyDown;
        document.onkeyup = handleMapKeyUp;

        var boxVar = document.getElementById("pSelectContainer");
        boxVar.parentNode.removeChild(boxVar);

        buildStageSelect();
    }

      renderer.render(characterSelectScene, characterSelectCamera);
}

function buildCharacterSelect(){
  var characters = [raider, pingu, anh];

  characterSelectScene = new THREE.Scene();
  characterSelectCamera.position.set(0,55,250);
  characterSelectCamera.lookAt(0,0,0);
  noonLights(characterSelectScene);

  //get container add select images
  var container = document.getElementById("container");
  var charSelectCont = document.createElement("div");
  charSelectCont.id = "pSelectContainer";
  container.appendChild(charSelectCont);

  //character selection platforms, 2 characters
  for(var i = 0; i < characters.length; i++){
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
    charSelect.innerHTML = "<div id = 'p1SelectBox'>Player "+(i+1)+": ?</div>";
    charSelectCont.appendChild(charSelect);

    var playerImg = document.createElement("img");
    playerImg.id = "player"+(i+1)+"Img";
    playerImg.src = "./images/characters/unselected.png";
    playerImg.style.height = "90%";
    charSelect.appendChild(playerImg);
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
    p1SelectorMesh.userData = {name:  "player1", grabbing: false}
    characterSelectScene.add(p1SelectorMesh);

    p1SelectorMesh.position.set(-93,40,7);
    p1SelectorMesh.rotation.set(radians(90),radians(90),0);

    var p2SelectorGeom = new THREE.CylinderGeometry(3,3,1, 19);
    var p2SelectorMat = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('images/menu/player2Selector.jpg')});
    p2SelectorMesh = new THREE.Mesh(p2SelectorGeom,p2SelectorMat);
    p2SelectorMesh.userData = {name:  "player2", grabbing: false}
    characterSelectScene.add(p2SelectorMesh);

    p2SelectorMesh.position.set(-63,40,6);
    p2SelectorMesh.rotation.set(radians(90),radians(90),0);
}

function buildCapture(){
  var p1CaptureGeom = new THREE.BoxGeometry(100,5,10);
  var p1CaptureMat = new THREE.MeshPhongMaterial({color:0x272e92});
  var p1CaptureMesh = new THREE.Mesh(p1CaptureGeom,p1CaptureMat);

  characterSelectScene.add(p1CaptureMesh);
  p1CaptureMesh.position.set(-53,-20,10);

  var p2CaptureGeom = new THREE.BoxGeometry(100,5,10);
  var p2CaptureMat = new THREE.MeshPhongMaterial({color:0xb60e16});
  var p2CaptureMesh = new THREE.Mesh(p2CaptureGeom,p2CaptureMat);

  characterSelectScene.add(p2CaptureMesh);
  p2CaptureMesh.position.set(56,-20,10);

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
        p1Model.userData = {heldBy: "player1", selected: true, velocity: 0, name:selectedPlayer1.name}
        selector.userData.grabbing = true;
      }
      if(selector.userData.name == "player2"){
        selectedPlayer2 = hitboxArray[i].userData.character;
        p2Model = selectedPlayer2.model.clone();
        selector.position.z += 12;
        characterSelectScene.add(p2Model);
        p2Model.position.set(selector.position.x, selector.position.y, selector.position.z-4);
        p2Model.userData = {heldBy: "player2", selected: true, velocity: 0, name:selectedPlayer2.name}
        selector.userData.grabbing = true;
      }
    }


  }

}

function dropPlayer(selector, playerClone){
    selector.userData.grabbing = false;
    playerClone.userData.heldBy = "";
    playerClone.userData.selected = false;

    if(selector.userData.name == "player1"){
        if(playerClone.position.x < 0){
            p1InPosition = true;
        }
    }
    else{
        if(playerClone.position.x > 0){
            p2InPosition = true;
        }
    }
    selector.position.z -= 12;

}


function updatePositions(){

  if(heldDown1.left){
    if(p1SelectorMesh.position.x -1 > -112){
      p1SelectorMesh.position.x -=1;
      if(p1Model != undefined){
          if(p1Model.userData.heldBy != ""){
              p1Model.position.x-=1;
          }
      }
    }
  }
  if(heldDown1.right){
    if(p1SelectorMesh.position.x + 1 < 112){
      p1SelectorMesh.position.x +=1;
      if(p1Model != undefined){
          if(p1Model.userData.heldBy != ""){
              p1Model.position.x+=1;
          }
      }
    }
  }
  if(heldDown1.up){
    if(p1SelectorMesh.position.y + 1 < 55){
      p1SelectorMesh.position.y +=1;
      if(p1Model != undefined){
          if(p1Model.userData.heldBy != ""){
              p1Model.position.y+=1;
          }
      }
    }
  }
  if(heldDown1.down){
    if(p1SelectorMesh.position.y - 1 > -21){
      p1SelectorMesh.position.y -=1;
      if(p1Model != undefined){
          if(p1Model.userData.heldBy != ""){
              p1Model.position.y-=1;
          }
      }
    }
  }

  if(heldDown2.left){
    if(p2SelectorMesh.position.x -1 > -112){
      p2SelectorMesh.position.x -=1;
      if(p2Model != undefined){
          if(p2Model.userData.heldBy != ""){
              p2Model.position.x-=1;
          }
      }
    }
  }
  if(heldDown2.right){
    if(p2SelectorMesh.position.x + 1 < 112){
      p2SelectorMesh.position.x +=1;
      if(p2Model != undefined){
          if(p2Model.userData.heldBy != ""){
              p2Model.position.x+=1;
          }
      }
    }
  }
  if(heldDown2.up){
    if(p2SelectorMesh.position.y + 1 < 55){
      p2SelectorMesh.position.y +=1;
      if(p2Model != undefined){
          if(p2Model.userData.heldBy != ""){
              p2Model.position.y+=1;
          }
      }
    }
  }
  if(heldDown2.down){
    if(p2SelectorMesh.position.y - 1 > -21){
      p2SelectorMesh.position.y -=1;
      if(p2Model != undefined){
          if(p2Model.userData.heldBy != ""){
              p2Model.position.y-=1;
          }
      }
    }
  }

}

function updateGrabbedPlayers(){
    if(p1Model != undefined){
        if(p1Model.userData.selected == false){
            if(p1Model.position.y < -25){
                var p1SelectBox = document.getElementById("p1Select");
                p1SelectBox.innerHTML = "<div id = 'p1SelectName'>Player 1: "+p1Model.userData.name+"</div>"
                var player1ImgBox = document.createElement("img");
                player1ImgBox.id = "player1Img";
                player1ImgBox.src = "./images/characters/"+p1Model.userData.name+"Small.png"
                player1ImgBox.style.height = "90%";
                p1SelectBox.appendChild(player1ImgBox);
                characterSelectScene.remove(p1Model);
                p1Model = undefined;
            }
            else{
                p1Model.position.y -= p1Model.userData.velocity;
                if(p1Model.userData.velocity < gravity){
                    p1Model.userData.velocity += 0.1;
                }
            }
        }
    }

    if(p2Model != undefined){
        if(p2Model.userData.selected == false){
            if(p2Model.position.y < -25){
                var p2SelectBox = document.getElementById("p2Select");
                p2SelectBox.innerHTML = "<div id = 'p2SelectName'>Player 2: "+p2Model.userData.name+"</div>"
                var player2ImgBox = document.createElement("img");
                player2ImgBox.id = "player2Img";
                player2ImgBox.src = "./images/characters/"+p2Model.userData.name+"Small.png"
                player2ImgBox.style.height = "90%";
                p2SelectBox.appendChild(player2ImgBox);
                characterSelectScene.remove(p2Model);
                p2Model = undefined;
            }
            else{
                p2Model.position.y -= p2Model.userData.velocity;
                if(p2Model.userData.velocity < gravity){
                    p2Model.userData.velocity += 0.1;
                }
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
      if(!p1SelectorMesh.userData.grabbing){
          checkCollision(p1SelectorMesh, charSelectHitboxes);
      }
      else{
          dropPlayer(p1SelectorMesh, p1Model);
      }
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
      if(!p2SelectorMesh.userData.grabbing){
          checkCollision(p2SelectorMesh, charSelectHitboxes);
      }
      else{
          dropPlayer(p2SelectorMesh, p2Model);
      }
  }

  if(keyEvent.key == " "){
    if(selectedPlayer1!= undefined && selectedPlayer2 !=undefined){
      if(p1InPosition && p2InPosition){
          charactersSelected = true;
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
