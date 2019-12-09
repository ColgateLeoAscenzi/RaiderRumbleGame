var Colors = {
    black:0x000000,
    red:0xff1100,
    grey: 0xc7c9c8,
    green: 0x00ff00,
    brown: 0x3b331f,
    perssonBrown: 0x575042,
    brickGlue: 0xDDD5C2,
    perssonLightBrown: 0x81715A,
    perssonDarkBrown: 0x4D423D
};
function createBasicBoxMesh(){

  this.mesh      = new THREE.Object3D();
  this.mesh.name = "basicBox";

	  // Create the Cabin
  var geomBox = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
  var matBox  = new THREE.MeshPhongMaterial(
                             { color : Colors.grey});

  var box = new THREE.Mesh(geomBox, matBox);

  box.castShadow = true;
  box.receiveShadow = true;
  box.userData ={type: "floor", height: 10, width:10};

  return box;
};

function createDirtBlockMesh(){

  this.mesh      = new THREE.Object3D();
  this.mesh.name = "dirtBlock";


	  // Create the Cabin
  var geomBox = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
  var matBox  = new THREE.MeshPhongMaterial(
                             { color : Colors.brown});


  var box = new THREE.Mesh(geomBox, matBox);

  box.castShadow = true;
  box.receiveShadow = true;
  box.userData ={type: "floor", height: 10, width:10};


  return box;
};

function createPlatformMesh(){

  this.mesh      = new THREE.Object3D();
  this.mesh.name = "platform";

	  // Create the Cabin
  var geomBox = new THREE.BoxGeometry(10, 5, 10, 1, 1, 1);
  var matBox  = new THREE.MeshPhongMaterial(
                             { color : Colors.grey});
  var box = new THREE.Mesh(geomBox, matBox);

  var beegBrickGeo = new THREE.BoxGeometry(5,2.5,2, 1, 1, 1);

  var medBrickGeo = new THREE.BoxGeometry(2.5,2.5,2, 1, 1, 1);

  var smolBrickGeo = new THREE.BoxGeometry(1,2.5,2, 1, 1, 1);

  var brickMat  = new THREE.MeshPhongMaterial(
                             { color : Colors.red});

  var brick1Mat  = new THREE.MeshPhongMaterial(
                             { color : Colors.green});

  var brick2Mat  = new THREE.MeshPhongMaterial(
                             { color : Colors.brickGlue});

  var brick = new THREE.Mesh(beegBrickGeo, brick1Mat);

  box.add(brick);

  brick.position.set(-1,1,5);

  // var brick1 = new THREE.Mesh(beegBrickGeo, brick1Mat);
  // brick1.position.set(0,2,9);
  //
  // box.add(brick1);
  //
  //
  // var brick3 = new THREE.Mesh(medBrickGeo, brick2Mat);
  // brick3.position.set(-4,2,9);
  //
  // box.add(brick3);
  //
  // var brick4 = new THREE.Mesh(smolBrickGeo, brick2Mat);
  // brick4.position.set(3,2,9);
  //
  // box.add(brick4);

  //the rest of the bottom bricks

  // var brick5 = new THREE.Mesh(beegBrickGeo, brick1Mat);
  // brick5.position.set(1.5,0,9);
  //
  // box.add(brick5);
  //
  // var brick6 = new THREE.Mesh(medBrickGeo, brick2Mat);
  // brick6.position.set(3.8,0,9);
  //
  // box.add(brick6);
  //
  // var brick7 = new THREE.Mesh(medBrickGeo, brick2Mat);
  // brick7.position.set(-1,0,9);
  //
  // box.add(brick7);
  //
  // var brick8 = new THREE.Mesh(smolBrickGeo, brick2Mat);
  // brick8.position.set(6,0,9);
  //
  // box.add(brick8);

  box.castShadow = true;
  box.receiveShadow = true;
  box.userData ={type: "platform", height: 5, width:10};

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

function createPlatformBoxBounding(){

  this.mesh      = new THREE.Object3D();
  this.mesh.name = "basicBoxBounding";

	  // Create the Cabin
  var geomBox = new THREE.BoxGeometry(10, 5, 10, 1, 1, 1);
  var matBox  = new THREE.MeshPhongMaterial(
                             { color : Colors.red, wireframe: true});

  var box = new THREE.Mesh(geomBox, matBox);

  return box;

};
