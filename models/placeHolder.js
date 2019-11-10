var Colors = {
    black:0x000000
};

function createPlaceHolderMesh(){

  this.mesh      = new THREE.Object3D();
  this.mesh.name = "placeHolder";

	  // Create the Cabin
  var geomBox = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
  var matBox  = new THREE.MeshPhongMaterial(
                             { color : Colors.black,
                             shading : THREE.FlatShading });

  var box = new THREE.Mesh(geomBox, matBox);

  box.castShadow = true;
  box.receiveShadow = true;

  this.mesh.add(box);

  return this.mesh;

};
