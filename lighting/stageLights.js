//noonLights incomplete

function noonLights(scene) {
    // Create the Skybox
  var geomBox = new THREE.BoxGeometry(10000, 10000, 10000, 10, 10, 10);
  var matBox  = new THREE.MeshPhongMaterial(
                             { color : 0xafc5ff});
  var box = new THREE.Mesh(geomBox, matBox);
  box.material.side = THREE.BackSide;
  scene.add(box);
  //
  var ambientLight = new THREE.PointLight(Colors.white, 1);
  ambientLight.position.set(0,50,-20);
  scene.add(ambientLight);
  //
  //  var directLight = new THREE.PointLight(0xfbe8c9, 1.0);
  //  directLight.position.set(0, 0, -90);
  //  scene.add(directLight);
  //
  //
   // var ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
   // scene.add(ambientLight);

}


function sunsetLights(scene) {
    // Create the Skybox


  var geomBox = new THREE.BoxGeometry(10000, 10000, 10000, 10, 10, 10);
  var matBox  = new THREE.MeshPhongMaterial(
                             {color : 0xf6ca97, map: new THREE.TextureLoader().load('images/PERSONA_20th.png')});


  var box = new THREE.Mesh(geomBox, matBox);
  box.material.side = THREE.BackSide;
  scene.add(box);


  var ambientLight = new THREE.PointLight(Colors.white, 0.1);
  ambientLight.position.set(0,0,100);
  scene.add(ambientLight);

   var directLight = new THREE.PointLight(0xfbe8c9, 1.0);
   directLight.position.set(0, 0, -90);
   scene.add(directLight);


   var ambientLight = new THREE.AmbientLight(0xf6ca97, 0.4);
   scene.add(ambientLight);
}
