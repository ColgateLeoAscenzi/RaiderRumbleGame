var Colors = {
    black:0x222222,
    red:0xff1100,
    grey: 0xb0a896,
    white: 0xffffff,
};

function createBasicCharacterMesh(x,y,z){

  this.mesh      = new THREE.Object3D();
  this.mesh.name = "basicCharacter";

// BACKGROUND REMOVE LATER
  var geomBox = new THREE.BoxGeometry(10, 20, 2, 1, 1, 1);
  var matBox  = new THREE.MeshPhongMaterial(
                             { color : Colors.grey})

  var box = new THREE.Mesh(geomBox, matBox);

  box.castShadow = true;
  box.receiveShadow = true;

  this.mesh.add(box);

//HEART REMOVE LATER
  var geomBox = new THREE.BoxGeometry(3, 3, 3, 1, 1, 1);
  var matBox  = new THREE.MeshPhongMaterial(
                             { color : Colors.red})

  var heart = new THREE.Mesh(geomBox, matBox);

  heart.position.set(x,y,z);
  this.mesh.add(heart);

  //TORSO

  var legObj = new THREE.Object3D();

  var legBox = new THREE.BoxGeometry(3, 2, 3, 1, 1,1);
  var legMat = new THREE.MeshPhongMaterial(
                             { color : Colors.black});

  legObj.mesh = new THREE.Mesh(legBox, legMat);

  legObj.mesh.name = "leg";
  legObj.mesh.position.set(x-4,y-9,z);
  this.mesh.add(legObj.mesh);

  var leg2 = legObj.mesh.clone();
  leg2.position.x += 8;
  this.mesh.add(leg2);


  var footBox = new THREE.BoxGeometry(3, 0.5, 3, 1, 1,1);
  var footMat = new THREE.MeshPhongMaterial(
                             { color : Colors.red});

  var foot = new THREE.Mesh(footBox, footMat);

  legObj.add(foot);


  this.mesh.position.set(x,y,z);
  return this.mesh;

};


function createBasicCharacterBounding(x,y,z){

  this.mesh      = new THREE.Object3D();
  this.mesh.name = "basicCharacterBounding";

	  // Create the Cabin
  var geomBox = new THREE.BoxGeometry(10, 20, 10, 1, 1, 1);
  var matBox  = new THREE.MeshPhongMaterial(
                             { color : Colors.red,wireframe: true});

  var box = new THREE.Mesh(geomBox, matBox);

  this.mesh.add(box);
  this.mesh.position.set(x,y,z);


  return this.mesh;

};
