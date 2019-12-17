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

    if(HIGHLITED){
      if(HIGHLITED.userData.isTop){
          HIGHLITED.position.y = 15 + 10*Math.sin(time*0.1);
      }
    }
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
          HIGHLITED.material.emissive.setHex(0x00ccff);
          HIGHLITED.material.opacity = 0.8;
          var container = document.getElementById("container");
          var mapInfo = document.createElement("div");
          mapInfo.id = "mapBox";
          console.log(mouse.x, mouse.y, WIDTH, HEIGHT);
          if(mouse.x < 0){
            mapInfo.style.left = 100-Math.abs(mouse.x*100)+"%";
          }
          else{
            mapInfo.style.right = 100-(mouse.x*100)+"%";
          }
          mapInfo.style.top = "40%";
          mapInfo.style.position = "absolute";
          mapInfo.innerHTML = "TESTING";
          container.appendChild(mapInfo);


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

  // var perssonGeom = new THREE.TorusGeometry( 10, ( 10 * 0.25), 2, 12 );
  // var perssonMat = new THREE.MeshPhongMaterial({color: 0x00ccff, emissive: 0x00ccff});
  // perssonBlock = new THREE.Mesh(perssonGeom, perssonMat);
  // perssonBlock.position.set(-75,10,-65);
  // perssonBlock.rotation.set(1.57,0,0);
  // mapScene.add(perssonBlock);
  //
  // perssonBlock.userData = {stageData:stageA, isTop: false};
  // selectableStages.push(perssonBlock);


  perssonTop = new THREE.Mesh(new THREE.ConeGeometry(10,20,32),new THREE.MeshPhongMaterial({color: 0xff0000, emissive: 0x00ccff, opacity: 0.8, transparent: true}));
  perssonTop.position.set(-75,15,-65);
  perssonTop.rotation.set(2.53,2.09,0);
  mapScene.add(perssonTop);

  perssonTop.userData = {stageData:stageA, isTop: true};
  selectableStages.push(perssonTop);
  topMeshes.push(perssonTop);

  //
  // var fieldOfDreamsGeom = new THREE.TorusGeometry( 15, ( 15 * 0.25), 2, 12 );
  // var fieldOfDreamsMat = new THREE.MeshPhongMaterial({color: 0x00ccff, emissive: 0x00ccff});
  // stageCBlock = new THREE.Mesh(fieldOfDreamsGeom, fieldOfDreamsMat);
  // stageCBlock.userData = {stageData:stageB, isTop: false};
  // mapScene.add(stageCBlock);
  // stageCBlock.position.set(48,11,132);
  // stageCBlock.scale.set(1,1,1);
  // stageCBlock.rotation.set(1.57,0,0);
  // selectableStages.push(stageCBlock);


  fieldOfDreamsTop = new THREE.Mesh(new THREE.ConeGeometry(10,20,32),new THREE.MeshPhongMaterial({color: 0xff0000, emissive: 0x00ccff, opacity: 0.8, transparent: true}));
  fieldOfDreamsTop.position.set(48,15,132);
  fieldOfDreamsTop.rotation.set(21.94,14.03,30.50);
  mapScene.add(fieldOfDreamsTop);
  fieldOfDreamsTop.userData = {stageData:stageB, isTop: true};
  selectableStages.push(fieldOfDreamsTop);
  topMeshes.push(fieldOfDreamsTop);

  //
  // var taylorLakeGeom = new THREE.TorusGeometry( 15, ( 15 * 0.25), 2, 12 );
  // var taylorLakeMat = new THREE.MeshPhongMaterial({color: 0x00ccff, emissive: 0x00ccff});
  // tayLorBlock = new THREE.Mesh(taylorLakeGeom, taylorLakeMat);
  // tayLorBlock.userData = {stageData:stageC, isTop: false};
  // mapScene.add(tayLorBlock);
  // tayLorBlock.position.set(-212,10,-151);
  // tayLorBlock.scale.set(1,1,1);
  // tayLorBlock.rotation.set(1.57,0,0);
  // selectableStages.push(tayLorBlock);


  taylorTop = new THREE.Mesh(new THREE.ConeGeometry(10,20,32),new THREE.MeshPhongMaterial({color: 0xff0000, emissive: 0x00ccff, opacity: 0.8, transparent: true}));
  taylorTop.position.set(-212,15,-151);
  taylorTop.rotation.set(18.45,4.34,28.41);
  mapScene.add(taylorTop);
  taylorTop.userData = {stageData:stageC, isTop: true};
  selectableStages.push(taylorTop);
  topMeshes.push(taylorTop);



  var container = document.getElementById("container");
  var stageModeBox = document.createElement("div");
  stageModeBox.id = "stageSelectBox";
  stageModeBox.innerHTML = "<div>Click a Stage!</div>"
  +"<div class = 'stageSelectInfo'>Time of Day: Day</div>"
  +"<div class = 'stageSelectInfo'>Mode: Omega</div>";
  container.appendChild(stageModeBox);

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
