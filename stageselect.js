//builds the colgate map with locations to play on
function buildStageSelect(){
  mapScene = new THREE.Scene();
  sunsetLights(mapScene);


  var planeGeom = new THREE.BoxGeometry(10,10,10,1,1,1);
  var planeMat = new THREE.MeshPhongMaterial({color: 0xffffff, opacity: 0.1, transparent: true});
  var planeMesh = new THREE.Mesh(planeGeom, planeMat);
  planeMesh.userData = {stageData:stageA, omega: false};
  mapScene.add(planeMesh);
  selectableStages.push(planeMesh);

  var planeGeom2 = new THREE.BoxGeometry(10,10,10,1,1,1);
  var planeMat2 = new THREE.MeshPhongMaterial({color: 0x00ff00});
  var planeMesh2 = new THREE.Mesh(planeGeom2, planeMat2);
  planeMesh2.userData = {stageData:stageA, omega: true};
  mapScene.add(planeMesh2);
  planeMesh2.position.y += 10;
  selectableStages.push(planeMesh2);

  var planeGeom3 = new THREE.BoxGeometry(10,10,10,1,1,1);
  var planeMat3 = new THREE.MeshPhongMaterial({color: 0x0000ff});
  var planeMesh3 = new THREE.Mesh(planeGeom3, planeMat3);
  planeMesh3.userData = {stageData:stageB, omega: false};
  mapScene.add(planeMesh3);
  planeMesh3.position.x += 20;
  selectableStages.push(planeMesh3);

  var planeGeom4 = new THREE.BoxGeometry(10,10,10,1,1,1);
  var planeMat4 = new THREE.MeshPhongMaterial({color: 0xff00ff});
  var planeMesh4 = new THREE.Mesh(planeGeom4, planeMat4);
  planeMesh4.userData = {stageData:stageB, omega: true};
  mapScene.add(planeMesh4);
  planeMesh4.position.x += 20;
  planeMesh4.position.y += 10;
  selectableStages.push(planeMesh4);

  var mapGeom = new THREE.BoxGeometry(500,10,500,1,1,1);
  var mapMat  = new THREE.MeshPhongMaterial(
                              {color : 0xf6ca97, map: new THREE.TextureLoader().load('images/overviewmap2x.png')});
  var mapMesh = new THREE.Mesh(mapGeom, mapMat);

  mapMesh.position.y -= 10;

  mapScene.add(mapMesh);

  camera.lookAt(0,0,0);
}
