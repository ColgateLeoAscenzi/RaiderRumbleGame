var Colors = {
    black:0x000100,
    red:0xff1100,
    grey: 0xb0a896
};

function createBasicCharacterMesh(){

  this.mesh      = new THREE.Object3D();
  this.mesh.name = "basicCharacter";

	  // Create the Cabin
  var geomBox = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
  var matBox  = new THREE.MeshPhongMaterial(
                             { color : Colors.black,
                             shading : THREE.FlatShading});

  var box = new THREE.Mesh(geomBox, matBox);

  box.castShadow = true;
  box.receiveShadow = true;

  this.mesh.add(box);

  return this.mesh;

};

function createBasicCharacterBounding(){

  this.mesh      = new THREE.Object3D();
  this.mesh.name = "basicCharacterBounding";

	  // Create the Cabin
  var geomBox = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
  var matBox  = new THREE.MeshPhongMaterial(
                             { color : Colors.red,
                             shading : THREE.FlatShading,
                              wireframe: true});

  var box = new THREE.Mesh(geomBox, matBox);

  this.mesh.add(box);

  return this.mesh;

};
