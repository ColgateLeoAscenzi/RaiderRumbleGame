var heldDown1, heldDown2;

var charSelectHitboxes;
var selectableChars;
var p1Model, p2Model;

var gravity = 2;

var lockInMessage;

var timee = 0;
var timeeP = 0;

var modalDismissed = false;

function cleanUpDivs(){
        var boxVar = document.getElementById("lockInReady");
        if(boxVar != undefined){
            boxVar.parentNode.removeChild(boxVar);
        }

        boxVar = document.getElementById("characterSelectBanner");
        if(boxVar != undefined){
            boxVar.parentNode.removeChild(boxVar);
        }

        boxVar = document.getElementById("pSelectContainer");
        if(boxVar != undefined){
            boxVar.parentNode.removeChild(boxVar);
        }
}

function characterSelectLoop(){
    timee+= 1;

    updatePositions();

    updateGrabbedPlayers();
    if(controllersConnected){
        updateP1Controller();
        updateP2Controller();
    }

    if(!modalDismissed){

    }


    //checks to see if it shoudld display message
    if(p1InPosition && p2InPosition && !lockInMessage && (p1Model == undefined && p2Model == undefined)){
        var container = document.getElementById("container");
        var lockInDiv = document.createElement("div");
        lockInDiv.id = "lockInReady";
        if(!controllersConnected){
            lockInDiv.innerHTML = "Ready to Rumble! Press Space To Begin!"
        }
        else{
            lockInDiv.innerHTML = "Ready to Rumble! Press B To Begin!"
        }
        container.appendChild(lockInDiv);
        lockInMessage = true;
    }
    else if(((!p1InPosition) || (!p1InPosition)) && lockInMessage){
        var boxVar = document.getElementById("lockInReady");
        if(boxVar != undefined){
            boxVar.parentNode.removeChild(boxVar);
        }
        lockInMessage = false;
    }


    if(!charactersSelected){
      requestAnimationFrame(characterSelectLoop);
    }
    else{
        inCharSelect = false;
        p1InPosition = false;
        p2InPosition = false;
        charactersSelected = false;
        lockInMessage = false;

        cleanUpDivs();

        var help = document.getElementById("myModal");
        help.parentNode.removeChild(help);

        buildStageSelect();
    }

      renderer.render(characterSelectScene, characterSelectCamera);
}

function buildCharacterSelect(){
  inCharSelect = true;

  var characters = [[raider, raider1], [pingu,pingu1], [anh,anh1]];
  heldDown1 = {left: false, right: false, up: false, down:false};
  heldDown2 = {left: false, right: false, up: false, down:false};
  selectedPlayer1 = undefined;
  selectedPlayer2 = undefined;
  p1SelectorMesh = undefined;
  p2SelectorMesh = undefined;
  charSelectHitboxes = undefined;

  charSelectHitboxes = [];
  selectableChars = [];
  lockInMessage = false;

  characterSelectScene = new THREE.Scene();
  characterSelectCamera.position.set(0,55,250);
  characterSelectCamera.lookAt(0,0,0);
  noonLights(characterSelectScene);

  //get container add select images
  var container = document.getElementById("container");
  var charSelectCont = document.createElement("div");
  charSelectCont.id = "pSelectContainer";
  container.appendChild(charSelectCont);

  var charSelBan = document.createElement("div");
  charSelBan.id = "characterSelectBanner";
  charSelBan.innerHTML = "Choose a Character!"
  container.appendChild(charSelBan)

  //character selection platforms, 2 characters
  for(var i = 0; i < characters.length; i++){
    var playerStandMesh = createBasicBoxMesh(1+Math.random()*3);
    characterSelectScene.add(playerStandMesh);
    playerStandMesh.position.x = i*30-90;
    playerStandMesh.position.y = 28;

    var newChar = characters[i][0].model.clone();
    characterSelectScene.add(newChar);
    selectableChars.push(newChar);
    newChar.position.x = i*30-90;
    newChar.position.y = 38.5;

    var charSelectHitGeom1 = new THREE.BoxGeometry(10,15,10,1,1,1);
    var charSelectHitMat1 = new THREE.MeshPhongMaterial({color: 0xff0000, transparent: true, opacity:0});
    var charSelectHitMesh1 = new THREE.Mesh(charSelectHitGeom1,charSelectHitMat1);
    charSelectHitMesh1.userData = {character: characters[i]}

    characterSelectScene.add(charSelectHitMesh1);
    charSelectHitboxes.push(charSelectHitMesh1);
    charSelectHitMesh1.position.x = i*30-90;
    charSelectHitMesh1.position.y = 44;
    charSelectHitMesh1.position.z = 10;

  }

  for(var i = 0; i < numPlayers; i++){
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

  if(helpOn){
    var container = document.getElementById("container");
    var modalDiv = document.createElement("div");
    modalDiv.class = "modal";
    modalDiv.innerHTML = '<div class="modal-content" id = "myModal"><div class="modal-header"><h2>Character Select Help</h2></div><div class="modal-body"><p>Player 1</p><p>WASD to move, J to select</p>'+
                        '<p>Player 2</p><p>Arrow Keys to move, 1 to select</p>'+
                        '<p>Hover your circle over a player model and then press select to grab</p><p>Drag player over the bottom boxes and then press select again to drop</p>'+
                        '<div class="modal-footer1" id = "closeButton"><h3>Close Help</h3></div>'+
                        '<div class="modal-footer2" id = "noHelp"><h3>Don\'t Show Again</h3></div></div>';
    container.appendChild(modalDiv)


    var modal = document.getElementById("myModal");

    modal.style.display = "block";

    var close = document.getElementById("closeButton");
    close.onclick = function(event) {
      modal.style.display = "none";
    }
    var helpButton = document.getElementById("noHelp");
    helpButton.onclick = function(event) {
      modal.style.display = "none";
      helpOn = false;
    }
  }


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
  var p1CaptureGeom = new THREE.BoxGeometry(300,5,10);
  var p1CaptureMat = new THREE.MeshPhongMaterial({color:0x272e92});
  var p1CaptureMesh = new THREE.Mesh(p1CaptureGeom,p1CaptureMat);

  characterSelectScene.add(p1CaptureMesh);
  p1CaptureMesh.position.set(150,-20,10);

  var p2CaptureGeom = new THREE.BoxGeometry(300,5,10);
  var p2CaptureMat = new THREE.MeshPhongMaterial({color:0xb60e16});
  var p2CaptureMesh = new THREE.Mesh(p2CaptureGeom,p2CaptureMat);

  characterSelectScene.add(p2CaptureMesh);
  p2CaptureMesh.position.set(-150,-20,10);

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

        //first destroy any data that was originally there
        selectedPlayer1 = undefined;
        p1InPosition = false;

        var p1SelectBox = document.getElementById("p1Select");
        p1SelectBox.innerHTML = "<div id = 'p1SelectName'>Player 1: ?</div>"
        var player1ImgBox = document.createElement("img");
        player1ImgBox.id = "player1Img";
        player1ImgBox.src = "./images/characters/unselected.png"
        player1ImgBox.style.height = "90%";
        p1SelectBox.appendChild(player1ImgBox);


        //then reset data
        grabbedPlayer1 = hitboxArray[i].userData.character[0];
        p1Model = grabbedPlayer1.model.clone();
        selector.position.z = 19;
        characterSelectScene.add(p1Model);
        p1Model.position.set(selector.position.x, selector.position.y, selector.position.z-4);
        p1Model.userData = {heldBy: "player1", selected: true, velocity: 0, name:grabbedPlayer1.name}
        selector.userData.grabbing = true;
      }
      if(selector.userData.name == "player2"){

        //destroy data
        selectedPlayer2 = undefined;
        p2InPosition = false;

        var p2SelectBox = document.getElementById("p2Select");
        p2SelectBox.innerHTML = "<div id = 'p2SelectName'>Player 2: ?</div>"
        var player2ImgBox = document.createElement("img");
        player2ImgBox.id = "player2Img";
        player2ImgBox.src = "./images/characters/unselected.png"
        player2ImgBox.style.height = "90%";
        p2SelectBox.appendChild(player2ImgBox);


        grabbedPlayer2 = hitboxArray[i].userData.character[1];
        console.log(hitboxArray[i]);
        p2Model = grabbedPlayer2.model.clone();
        selector.position.z = 17;
        characterSelectScene.add(p2Model);
        p2Model.position.set(selector.position.x, selector.position.y, selector.position.z-4);
        p2Model.userData = {heldBy: "player2", selected: true, velocity: 0, name:grabbedPlayer2.name}
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
    if(selector.userData.name == "player1"){
        selector.position.z = 7;
    }
    else{
        selector.position.z = 6;
    }


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
            if(p1Model.position.y < -25 && p1Model.position.x < 0){
                var p1SelectBox = document.getElementById("p1Select");
                p1SelectBox.innerHTML = "<div id = 'p1SelectName'>Player 1: "+p1Model.userData.name+"</div>"
                var player1ImgBox = document.createElement("img");
                player1ImgBox.id = "player1Img";
                player1ImgBox.src = "./images/characters/"+p1Model.userData.name+"Small.png"
                player1ImgBox.style.height = "90%";
                selectedPlayer1 = grabbedPlayer1;
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
            if(p2Model.position.y < -25 && p2Model.position.x > 0){
                var p2SelectBox = document.getElementById("p2Select");
                p2SelectBox.innerHTML = "<div id = 'p2SelectName'>Player 2: "+p2Model.userData.name+"</div>"
                var player2ImgBox = document.createElement("img");
                player2ImgBox.id = "player2Img";
                player2ImgBox.src = "./images/characters/"+p2Model.userData.name+"Small.png"
                player2ImgBox.style.height = "90%";
                selectedPlayer2 = grabbedPlayer2;
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

function updateP2Controller(){
    if(inCharSelect){
        if(axis2.length == 2){
            if(axis2[0] < -0.5){
                heldDown2.left = true;
                heldDown2.right = false;
            }
            else if(axis2[0] > 0.5){
                heldDown2.right = true;
                heldDown2.left = false;
            }

            if(axis2[1] < -0.8){
                heldDown2.up = true;
                heldDown2.down = false;
            }
            else if(axis2[1] > 0.8){
                heldDown2.down = true;
                heldDown2.up = false;

            }
        }
        else{
            heldDown2.left = false;
            heldDown2.right = false;
            heldDown2.up = false;
            heldDown2.down = false;
        }

        if(pressedButtons2[1]){
            if(timee - timeeP > 30){
                timeeP = timee;
                if(!p2SelectorMesh.userData.grabbing){
                    checkCollision(p2SelectorMesh, charSelectHitboxes);
                }
                else{
                    dropPlayer(p2SelectorMesh, p2Model);
                }
            }
        }
        if(pressedButtons2[0]){
          if(selectedPlayer1!= undefined && selectedPlayer2 !=undefined){
            if(p1InPosition && p2InPosition){
                charactersSelected = true;
            }
          }
        }
    }
}

function updateP1Controller(){
    if(inCharSelect){
        if(axis1.length == 2){
            if(axis1[0] < -0.5){
                heldDown1.left = true;
                heldDown1.right = false;
            }
            else if(axis1[0] > 0.5){
                heldDown1.right = true;
                heldDown1.left = false;
            }

            if(axis1[1] < -0.5){
                heldDown1.up = true;
                heldDown1.down = false;

            }
            else if(axis1[1] > 0.5){
                heldDown1.down = true;
                heldDown1.up = false;
            }
        }
        else{
            heldDown1.left = false;
            heldDown1.right = false;
            heldDown1.up = false;
            heldDown1.down = false;
        }


        if(pressedButtons1[1]){
            if(timee - timeeP > 30){
                timeeP = timee;
                if(!p1SelectorMesh.userData.grabbing){
                    checkCollision(p1SelectorMesh, charSelectHitboxes);
                }
                else{
                    dropPlayer(p1SelectorMesh, p1Model);
                }
            }

        }
        if(pressedButtons1[0]){
          if(selectedPlayer1!= undefined && selectedPlayer2 !=undefined){
            if(p1InPosition && p2InPosition){
                charactersSelected = true;
            }
          }
        }
    }
}
