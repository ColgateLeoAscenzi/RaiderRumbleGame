//noonLights and nightLights incomplete

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
  var matBox  = new THREE.MeshLambertMaterial(
                             {color : 0xf6ca97, map: new THREE.TextureLoader().load('images/Persson.jpg')});



  var box = new THREE.Mesh(geomBox, matBox);
  box.material.side = THREE.BackSide;
  scene.add(box);



  //need to add colors to object instead of having them hardcoded
  var ambientLight = new THREE.PointLight(Colors.white, 0.3);
  ambientLight.position.set(0,0,100);
  scene.add(ambientLight);

   var directLight = new THREE.PointLight(0xfbe8c9, 0.8);
   directLight.position.set(0, 0, -90);
   scene.add(directLight);

   var directLight = new THREE.PointLight(0xdddddd, 0.6);
   directLight.position.set(0, -50, 20);
   scene.add(directLight);

   var ambientLight = new THREE.AmbientLight(0xf6ca97, 0.2);
   scene.add(ambientLight);
}

function nightLights(scene) {

  var geomBox = new THREE.BoxGeometry(10000, 10000, 10000, 10, 10, 10);
  var matBox  = new THREE.MeshPhongMaterial(
                             { color : 0xfff4f3});
  var box = new THREE.Mesh(geomBox, matBox);
  box.material.side = THREE.BackSide;
  scene.add(box);



  // var ambientLight = new THREE.AmbientLight(0x5d3667, 0.3);
  // //ambientLight.position.set(0,0,100);
  // scene.add(ambientLight);

  var star1 = new THREE.PointLight(0xfff4f3, 0.7);
  star1.position.set(100, 100, -100);

  var lightbulb = new THREE.Mesh(
    new THREE.SphereGeometry( 10, 16, 8 ),
    new THREE.MeshPhongMaterial( { color: 0xfff4f3 } )
  );
  lightbulb.position.set(100, 100, -0);
  scene.add(star1);
  scene.add(lightbulb);


  // var star2 = new THREE.PointLight(0xafc9ff, 0.7);
  // star2.position.set(50, 50, 0);
  // scene.add(star1);

}
