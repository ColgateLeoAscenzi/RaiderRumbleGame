//builds the colgate map with locations to play on
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



  camera.lookAt(0,0,0);
}
