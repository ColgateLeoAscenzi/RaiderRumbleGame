var stageCBlock;
var perssonBlock;
var perssonTop;
var tayLorBlock;
var topMeshes = [];
var time = 0;
//THIS IS THE STAGE SELECT LOOP
function stageSelectLoop(){
    if(controllersConnected){
        stageSelectButtons();
    }
    time+= 1;
   stageSelectCamera.lookAt(0,0,0);
    stageSelectCamera.position.set(0,800,0);
    if(isDay && omegaOn){
        document.getElementById("stageSelectBox").innerHTML =  "<div>Click a Stage!</div>"
        +"<div class = 'stageSelectInfo'>Time of Day: Day</div>"
        +"<div class = 'stageSelectInfo'>Mode: Omega</div>";
        document.getElementById("stageSelectBox").style.color = "white";
    }
    else if(isDay && !omegaOn){
        document.getElementById("stageSelectBox").innerHTML =  "<div>Click a Stage!</div>"
        +"<div class = 'stageSelectInfo'>Time of Day: Day</div>"
        +"<div class = 'stageSelectInfo'>Mode: Classic</div>";
        document.getElementById("stageSelectBox").style.color = "white";

    }
    else if(!isDay && omegaOn){
        document.getElementById("stageSelectBox").innerHTML =  "<div>Click a Stage!</div>"
        +"<div class = 'stageSelectInfo'>Time of Day: Night</div>"
        +"<div class = 'stageSelectInfo'>Mode: Omega</div>";
        document.getElementById("stageSelectBox").style.color = "white";
    }
    else{
        document.getElementById("stageSelectBox").innerHTML =  "<div>Click a Stage!</div>"
        +"<div class = 'stageSelectInfo'>Time of Day: Night</div>"
        +"<div class = 'stageSelectInfo'>Mode: Classic</div>";
        document.getElementById("stageSelectBox").style.color = "white";
    }

    if(!stageSelected){
      requestAnimationFrame(stageSelectLoop);
    }
    else{
      inStageSelect = false;
      stageSelected = false;
      HIGHLITED = undefined;
      selectableStages = [];
      topMeshes =[];


      var help = document.getElementById("myModal");
      help.parentNode.removeChild(help);
      
      initializeWorld();
      var boxVar = document.getElementById("stageSelectBox");
      boxVar.parentNode.removeChild(boxVar);


    }

  renderer.render(mapScene, stageSelectCamera);

  raycaster.setFromCamera( mouse, stageSelectCamera );

// calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects(selectableStages);

  if ( intersects.length > 0 ) {
      if ( HIGHLITED != intersects[ 0 ].object ) {
          if ( HIGHLITED ) {
            HIGHLITED.material.emissive.setHex( HIGHLITED.currentHex );
          }
          HIGHLITED = intersects[ 0 ].object;
          HIGHLITED.currentHex = HIGHLITED.material.emissive.getHex();
          HIGHLITED.material.emissive.setHex(0xff0000);
          HIGHLITED.material.opacity = 0.8;

      }
  } else {
      if ( HIGHLITED ){
        HIGHLITED.material.emissive.setHex( HIGHLITED.currentHex );
        HIGHLITED.material.opacity = 0.8;

        //undo something
      }
      HIGHLITED = null;
  }

}


function buildStageSelect(){
  inStageSelect = true;
  time = 0;
  mapScene = new THREE.Scene();
  stageSelectLightsDay(mapScene);

  //BACKGROUND of map
  var mapGeom = new THREE.BoxGeometry(500,10,500,1,1,1);
  var mapMat  = new THREE.MeshPhongMaterial(
                              {color : 0xf6ca97, map: new THREE.TextureLoader().load('images/overviewmap2x.png')});
  var mapMesh = new THREE.Mesh(mapGeom, mapMat);

  mapMesh.position.y -= 10;

  mapScene.add(mapMesh);


  var mapBackGeom = new THREE.BoxGeometry(10000,10,10000,1,1,1);
  var mapBackMat  = new THREE.MeshPhongMaterial(
                              {color : 0xf6ca97, map: new THREE.TextureLoader().load('images/mapbottom.png')});
  var mapBackMesh = new THREE.Mesh(mapBackGeom, mapBackMat);

  mapBackMesh.position.y -= 20;
  mapBackMesh.position.x -= 2000;
  mapBackMesh.position.z -= 2000;

  mapScene.add(mapBackMesh);

  //each clickable block

  var perssonGeom = new THREE.TorusGeometry( 10, ( 10 * 0.25), 2, 12 );
  var perssonMat = new THREE.MeshPhongMaterial({color: 0x00ccff, emissive: 0x00ccff});
  perssonBlock = new THREE.Mesh(perssonGeom, perssonMat);
  perssonBlock.position.set(-75,10,-65);
  perssonBlock.rotation.set(1.57,0,0);
  mapScene.add(perssonBlock);

  perssonBlock.userData = {stageData:stageA};
  selectableStages.push(perssonBlock);


  perssonTop = new THREE.Mesh(new THREE.TetrahedronGeometry(6, 0),new THREE.MeshPhongMaterial({color: 0x00ccff, emissive: 0x00ccff}));
  perssonTop.position.set(-75,25,-65);
  perssonTop.rotation.set(0,0,0);
  mapScene.add(perssonTop);

  perssonTop.userData = {stageData:stageA};
  selectableStages.push(perssonTop);
  topMeshes.push(perssonTop);


  var fieldOfDreamsGeom = new THREE.TorusGeometry( 15, ( 15 * 0.25), 2, 12 );
  var fieldOfDreamsMat = new THREE.MeshPhongMaterial({color: 0x00ccff, emissive: 0x00ccff});
  stageCBlock = new THREE.Mesh(fieldOfDreamsGeom, fieldOfDreamsMat);
  stageCBlock.userData = {stageData:stageB};
  mapScene.add(stageCBlock);
  stageCBlock.position.set(48,11,132);
  stageCBlock.scale.set(1,1,1);
  stageCBlock.rotation.set(1.57,0,0);
  selectableStages.push(stageCBlock);


  fieldOfDreamsTop = new THREE.Mesh(new THREE.TetrahedronGeometry(10, 0),new THREE.MeshPhongMaterial({color: 0x00ccff, emissive: 0x00ccff}));
  fieldOfDreamsTop.position.set(48,25,132);
  mapScene.add(fieldOfDreamsTop);
  fieldOfDreamsTop.userData = {stageData:stageB};
  selectableStages.push(fieldOfDreamsTop);
  topMeshes.push(fieldOfDreamsTop);


  var taylorLakeGeom = new THREE.TorusGeometry( 15, ( 15 * 0.25), 2, 12 );
  var taylorLakeMat = new THREE.MeshPhongMaterial({color: 0x00ccff, emissive: 0x00ccff});
  tayLorBlock = new THREE.Mesh(taylorLakeGeom, taylorLakeMat);
  tayLorBlock.userData = {stageData:stageC};
  mapScene.add(tayLorBlock);
  tayLorBlock.position.set(-212,10,-151);
  tayLorBlock.scale.set(1,1,1);
  tayLorBlock.rotation.set(1.57,0,0);
  selectableStages.push(tayLorBlock);


  taylorTop = new THREE.Mesh(new THREE.TetrahedronGeometry(10, 0),new THREE.MeshPhongMaterial({color: 0x00ccff, emissive: 0x00ccff}));
  taylorTop.position.set(-212,25,-151);
  mapScene.add(taylorTop);
  taylorTop.userData = {stageData:stageC};
  selectableStages.push(taylorTop);
  topMeshes.push(taylorTop);



  var container = document.getElementById("container");
  var stageModeBox = document.createElement("div");
  stageModeBox.id = "stageSelectBox";
  stageModeBox.innerHTML = "<div>Click a Stage!</div>"
  +"<div class = 'stageSelectInfo'>Time of Day: Day</div>"
  +"<div class = 'stageSelectInfo'>Mode: Omega</div>";
  container.appendChild(stageModeBox);


  if(helpOn){
    var container = document.getElementById("container");
    var modalDiv = document.createElement("div");
    modalDiv.class = "modal";
    modalDiv.innerHTML = '<div class="modal-content" id = "myModal"><div class="modal-header"><h2>Stage Select Help</h2></div><div class="modal-body"><p>Click on a blue beacon to select a stage!</p>'+
                        '<p>Use up and down arrow to change time of day</p><p>Use right and left arrow to change map mode</p>'+
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

  stageSelectLoop();

}

function stageSelectButtons(){
    if((pressedButtons1[0] || pressedButtons2[0] ) && time > 10){
          HIGHLITED = stageCBlock;
          selectedStage = HIGHLITED.userData;
          stageSelected = true;
    }
    else if((pressedButtons1[1]  || pressedButtons2[1]) && time > 10){
        HIGHLITED = perssonBlock;
        selectedStage = HIGHLITED.userData;
        stageSelected = true;
    }
    else if((pressedButtons1[2]  || pressedButtons2[2]) && time > 10){
        HIGHLITED = tayLorBlock;
        selectedStage = HIGHLITED.userData;
        stageSelected = true;
    }


    if((pressedButtons1[14] || pressedButtons2[14] ) && time > 10){
          omegaOn = true;
    }
    else if((pressedButtons1[15]  || pressedButtons2[15]) && time > 10){
        omegaOn = false;
    }
    else if((pressedButtons1[12]  || pressedButtons2[12]) && time > 10){
        isDay = true;
    }
    else if((pressedButtons1[13]  || pressedButtons2[13]) && time > 10){
        isDay = false;
    }

}
