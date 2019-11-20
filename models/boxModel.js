var Colors = {
    black:0x000000,
    red:0xff1100,
    grey: 0xc7c9c8,
    green: 0x00ff00,
    brown: 0x3b331f
};
function createBasicBoxMesh(){

  this.mesh      = new THREE.Object3D();
  this.mesh.name = "basicBox";
  this.isCollideBottom = true;
  this.isCollideLeft = true;
  this.isCollideRight = true;
  this.isCollideTop = true;

	  // Create the Cabin
  var geomBox = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
  var matBox  = new THREE.MeshPhongMaterial(
                             { color : Colors.grey});


  var box = new THREE.Mesh(geomBox, matBox);

  box.castShadow = true;
  box.receiveShadow = true;


  return box;
};

function createDirtBlockMesh(){

  this.mesh      = new THREE.Object3D();
  this.mesh.name = "dirtBlock";
  this.isCollideBottom = true;
  this.isCollideLeft = true;
  this.isCollideRight = true;
  this.isCollideTop = true;

	  // Create the Cabin
  var geomBox = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
  var matBox  = new THREE.MeshPhongMaterial(
                             { color : Colors.brown});


  var box = new THREE.Mesh(geomBox, matBox);

  box.castShadow = true;
  box.receiveShadow = true;

  return box;
};

function createPlatformMesh(){

  this.mesh      = new THREE.Object3D();
  this.mesh.name = "platform";
  this.isCollideBottom = false;
  this.isCollideLeft = true;
  this.isCollideRight = true;
  this.isCollideTop = true;

	  // Create the Cabin
  var geomBox = new THREE.BoxGeometry(10, 5, 10, 1, 1, 1);
  var matBox  = new THREE.MeshPhongMaterial(
                             { color : Colors.grey});


  var box = new THREE.Mesh(geomBox, matBox);

  box.castShadow = true;
  box.receiveShadow = true;


  return box;
};

function createBasicBoxBounding(){

  this.mesh      = new THREE.Object3D();
  this.mesh.name = "basicBoxBounding";

	  // Create the Cabin
  var geomBox = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
  var matBox  = new THREE.MeshPhongMaterial(
                             { color : Colors.red, wireframe: true});

  var box = new THREE.Mesh(geomBox, matBox);


  return box;

};
