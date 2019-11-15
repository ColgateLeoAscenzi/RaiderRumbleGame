var Colors = {
    black:0x222222,
    red:0xff1100,
    grey: 0xb0a896,
    white: 0xffffff,
    green: 0x02aa20
};

function createBasicCharacterMesh(x,y,z){

  this.mesh      = new THREE.Object3D();
  this.mesh.name = "basicCharacter";

// BACKGROUND REMOVE LATER
  var geomBox = new THREE.BoxGeometry(10, 20, 0.5, 1, 1, 1);
  var matBox  = new THREE.MeshPhongMaterial(
                             { color : Colors.grey})

  var box = new THREE.Mesh(geomBox, matBox);

  box.castShadow = true;
  box.receiveShadow = true;

  // this.mesh.add(box);



  //TORSO amde of shirt material
  this.mesh.torso = new THREE.Object3D();

  var torsoBox = new THREE.BoxGeometry(7,10,5, 1,1,1);
  var torsoMat = new THREE.MeshPhongMaterial(
                             { color : Colors.green});

  var shirt = new THREE.Mesh(torsoBox, torsoMat);
  this.mesh.torso.add(shirt);

  this.mesh.torso.position.y = y-1.75;


  //legs adde to base of torso
  var legBox = new THREE.BoxGeometry(3, 3, 3, 1, 1,1);
  var legMat = new THREE.MeshPhongMaterial(
                             { color : Colors.black});

  this.mesh.torso.leg = new THREE.Mesh(legBox, legMat);
  this.mesh.torso.add(this.mesh.torso.leg);
  this.mesh.torso.leg.position.set(x-3.5,y-6.5,z)


  this.mesh.torso.leftleg = this.mesh.torso.leg.clone();
  this.mesh.torso.add(this.mesh.torso.leftleg);
  this.mesh.torso.leftleg.position.set(x+3.5,y-6.5,z)



  this.mesh.add(this.mesh.torso);


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
