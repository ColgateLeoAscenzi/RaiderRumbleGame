function titleScreenLoop(){
    if(!titleClicked){
      requestAnimationFrame(titleScreenLoop);
    }
    else{
        buildModeSelect();
    }

      renderer.render(titleScene, camera);
}

function buildTitleScreen(){
  titleScene = new THREE.Scene();
  camera.position.set(0,0,900);
  camera.lookAt(0,0,0);
  sunsetLights(titleScene);

  // //BACKGROUND of map
  var titleGeom = new THREE.BoxGeometry(WIDTH,HEIGHT,1,1,1,1);
  var titleMat  = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('images/menu/titlescreen.png')});
  var titleMesh = new THREE.Mesh(titleGeom, titleMat);
  titleScene.add(titleMesh);

  titleScreenLoop();
}
