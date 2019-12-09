var BlockColors = {
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
                             { color : BlockColors.grey});

  var box = new THREE.Mesh(geomBox, matBox);
    var snow = new THREE.Mesh(new THREE.BoxGeometry(11,1.2,10,1,1,1), new THREE.MeshPhongMaterial({color: 0xffffff, emissive: 0xaaaaaa}));
    box.add(snow);
    snow.position.set(0,5.4,0);

    var beegBrickGeo = new THREE.BoxGeometry(5,2.5,2, 1, 1, 1);

    var medBrickGeo = new THREE.BoxGeometry(2.75,2.5,2, 1, 1, 1);

    var smolBrickGeo = new THREE.BoxGeometry(1.75,2.5,2, 1, 1, 1);

    var brickMat  = new THREE.MeshPhongMaterial(
                               { color : BlockColors.perssonBrown});

    var brick1Mat  = new THREE.MeshPhongMaterial(
                               { color : BlockColors.perssonDarkBrown});

    var brick2Mat  = new THREE.MeshPhongMaterial(
                               { color : BlockColors.perssonLightBrown});

    var brick = new THREE.Mesh(beegBrickGeo, brick1Mat);

    box.add(brick);

    brick.position.set(-2.4,1.4,5);

    var brick1 = new THREE.Mesh(medBrickGeo, brick2Mat);
    brick1.position.set(2.3,2.3,5);
    brick1.scale.set(1.2,1.2,1.2);

    box.add(brick1);

    var brick3 = new THREE.Mesh(smolBrickGeo, brickMat);
    brick3.position.set(4,-1.8,5);

    box.add(brick3);

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
                             { color : BlockColors.grey});


  var box = new THREE.Mesh(geomBox, matBox);

  var beegBrickGeo = new THREE.BoxGeometry(5,2.5,2, 1, 1, 1);

  var medBrickGeo = new THREE.BoxGeometry(2.75,2.5,2, 1, 1, 1);

  var smolBrickGeo = new THREE.BoxGeometry(1.75,2.5,2, 1, 1, 1);

  var brickMat  = new THREE.MeshPhongMaterial(
                             { color : BlockColors.perssonBrown});

  var brick1Mat  = new THREE.MeshPhongMaterial(
                             { color : BlockColors.perssonDarkBrown});

  var brick2Mat  = new THREE.MeshPhongMaterial(
                             { color : BlockColors.perssonLightBrown});

  var brick = new THREE.Mesh(beegBrickGeo, brick1Mat);

  box.add(brick);

  brick.position.set(-2.4,1.4,5);

  var brick1 = new THREE.Mesh(medBrickGeo, brick2Mat);
  brick1.position.set(2.3,2.3,5);
  brick1.scale.set(1.2,1.2,1.2);

  box.add(brick1);

  var brick3 = new THREE.Mesh(smolBrickGeo, brickMat);
  brick3.position.set(4,-1.8,5);

  box.add(brick3);

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
                             { color : BlockColors.grey});

  var box = new THREE.Mesh(geomBox, matBox);
  var snow = new THREE.Mesh(new THREE.BoxGeometry(9.9,1.2,9.9,1,1,1), new THREE.MeshPhongMaterial({color: 0xffffff, emissive: 0xaaaaaa}));
  box.add(snow);
  snow.position.set(0,2.4,0);


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
                             { color : BlockColors.red, wireframe: true});

  var box = new THREE.Mesh(geomBox, matBox);

  return box;

};

function createPlatformBoxBounding(){

  this.mesh      = new THREE.Object3D();
  this.mesh.name = "basicBoxBounding";

	  // Create the Cabin
  var geomBox = new THREE.BoxGeometry(10, 5, 10, 1, 1, 1);
  var matBox  = new THREE.MeshPhongMaterial(
                             { color : BlockColors.red, wireframe: true});

  var box = new THREE.Mesh(geomBox, matBox);

  return box;

};
