
//THIS IS THE STAGE SELECT LOOP
function stageSelectLoop(){
   stageSelectCamera.lookAt(0,0,0);
    stageSelectCamera.position.set(0,800,0);
    if(isDay && omegaOn){
        document.getElementById("stageSelectBox").innerHTML =  "Time of Day: Day<br>Mode: Omega";
        document.getElementById("stageSelectBox").style.color = "black";
    }
    else if(isDay && !omegaOn){
        document.getElementById("stageSelectBox").innerHTML =  "Time of Day: Day<br>Mode: Normal";
        document.getElementById("stageSelectBox").style.color = "black";

    }
    else if(!isDay && omegaOn){
        document.getElementById("stageSelectBox").innerHTML =  "Time of Day: Night<br>Mode: Omega";
        document.getElementById("stageSelectBox").style.color = "white";
    }
    else{
        document.getElementById("stageSelectBox").innerHTML =  "Time of Day: Night<br>Mode: Normal";
        document.getElementById("stageSelectBox").style.color = "white";
    }

    if(!stageSelected){
      requestAnimationFrame(stageSelectLoop);
    }
    else{
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
          HIGHLITED.material.opacity = 0;
          currentSpotLight = new THREE.SpotLight(0xff00ff, 0.4);
          currentSpotLight.angle = radians(30);
          currentSpotLight.target = HIGHLITED;

          currentSpotLight.position.set(HIGHLITED.position.x, 40, HIGHLITED.position.z);
          mapScene.add(currentSpotLight);
          currentLights.push(currentSpotLight);
      }
  } else {
      if ( HIGHLITED ){
        HIGHLITED.material.emissive.setHex( HIGHLITED.currentHex );
        HIGHLITED.material.opacity = 0;
        mapScene.remove(currentSpotLight);
      }
      HIGHLITED = null;
  }

}


function buildStageSelect(){
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

  var perssonGeom = new THREE.BoxGeometry(35,10,20,1,1,1);
  var perssonMat = new THREE.MeshPhongMaterial({color: 0xffffff, opacity: 0, transparent: true});
  var perssonBlock = new THREE.Mesh(perssonGeom, perssonMat);
  perssonBlock.userData = {stageData:stageA};
  mapScene.add(perssonBlock);
  perssonBlock.position.set(-75,10,-65);
  perssonBlock.rotation.set(radians(-30),radians(68),radians(0));

  selectableStages.push(perssonBlock);


  var fieldOfDreamsGeom = new THREE.BoxGeometry(200,20,50,1,1,1);
  var fieldOfDreamsMat = new THREE.MeshPhongMaterial({color: 0xffffff, opacity: 0, transparent: true});
  var fieldOfDreamsBlock = new THREE.Mesh(fieldOfDreamsGeom, fieldOfDreamsMat);
  fieldOfDreamsBlock.userData = {stageData:stageB};
  mapScene.add(fieldOfDreamsBlock);
  fieldOfDreamsBlock.position.set(50,20,140);
  fieldOfDreamsBlock.rotation.set(radians(-10),radians(35),radians(0));
  selectableStages.push(fieldOfDreamsBlock);


  var container = document.getElementById("container");
  var stageModeBox = document.createElement("div");
  stageModeBox.id = "stageSelectBox";
  stageModeBox.innerHTML = "Time of Day: Day<br>Mode: Normal";
  container.appendChild(stageModeBox);

  stageSelectLoop();

}
