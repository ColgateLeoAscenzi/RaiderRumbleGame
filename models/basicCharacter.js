var Colors = {
    black:0x222222,
    red:0xff1100,
    grey: 0xb0a896,
    white: 0xffffff,
};

function createBasicCharacterMesh(x,y,z){

  this.mesh      = new THREE.Object3D();
  this.mesh.name = "basicCharacter";

	  // Create the Cabin
  var geomBox = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
  var matBox  = new THREE.MeshPhongMaterial(
                             { color : Colors.black})

  var box = new THREE.Mesh(geomBox, matBox);

  box.castShadow = true;
  box.receiveShadow = true;

  this.mesh.add(box);
  this.mesh.position.set(x,y,z);


  return this.mesh;

};


function createBasicCharacterBounding(x,y,z){

  this.mesh      = new THREE.Object3D();
  this.mesh.name = "basicCharacterBounding";

	  // Create the Cabin
  var geomBox = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
  var matBox  = new THREE.MeshPhongMaterial(
                             { color : Colors.red,wireframe: true});

  var box = new THREE.Mesh(geomBox, matBox);

  this.mesh.add(box);
  this.mesh.position.set(x,y,z);


  return this.mesh;

};
