function modeSelectLoop(){
    if(!modeSelected){
      requestAnimationFrame(modeSelectLoop);
    }
    else{
        document.onkeydown = handleMapKeyDown;
        document.onkeyup = handleMapKeyUp;
        buildCharacterSelect();
    }

  renderer.render(modeScene, modeSelectCamera);

  raycaster.setFromCamera( mouse, modeSelectCamera );

// calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects(modeBlocks);
  if ( intersects.length > 0 ) {

      if ( SELECTEDMODE != intersects[ 0 ].object ) {
          if ( SELECTEDMODE ) {
            SELECTEDMODE.material.emissive.setHex( SELECTEDMODE.currentHex );
          }
          SELECTEDMODE = intersects[ 0 ].object;
          SELECTEDMODE.currentHex = SELECTEDMODE.material.emissive.getHex();
          SELECTEDMODE.material.emissive.setHex(0x333333);
      }
  } else {
      if ( SELECTEDMODE ){
        SELECTEDMODE.material.emissive.setHex( SELECTEDMODE.currentHex );

      }
      SELECTEDMODE = null;
  }

}

function buildModeSelect(){
  modeScene = new THREE.Scene();
  modeSelectCamera.position.set(0,0,22);
  modeSelectCamera.lookAt(0,0,0);
  sunsetLights(modeScene);

  // //BACKGROUND of map
  var playGameGeom = new THREE.BoxGeometry(20,20,10,1,1,1);
  var playGameMat  = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('images/menu/playgameButton.png')});
  var playGameMesh = new THREE.Mesh(playGameGeom, playGameMat);
  playGameMesh.userData = {mode:"playGame"}
  modeScene.add(playGameMesh);
  modeBlocks.push(playGameMesh);

  playGameMesh.position.x -=10;

  var controlsGeom = new THREE.BoxGeometry(20,20,10,1,1,1);
  var controlsMap  = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('images/menu/controlsButton.png')});
  var controlsMesh = new THREE.Mesh(controlsGeom, controlsMap);

  controlsMesh.userData = {mode:"controls"}
  modeScene.add(controlsMesh);
  modeBlocks.push(controlsMesh);


  controlsMesh.position.x += 10;

  modeSelectLoop();
}
