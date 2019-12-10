var starColors = {
  white: 0xffffff,
  red: 0xffebd1,
  blue: 0xcad8ff,
};

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

  // var matBox  = new THREE.MeshPhongMaterial(
  //                            {color : 0xf6ca97, map: new THREE.TextureLoader().load('images/PERSONA_20th.png')});
 var matBox  = new THREE.MeshPhongMaterial(
                            {color : 0xf6ca97});



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
  var matBox  = new THREE.MeshLambertMaterial(
                             { color : 0x000000});
  var box = new THREE.Mesh(geomBox, matBox);
  box.material.side = THREE.BackSide;
  scene.add(box);


  var ambientLight = new THREE.AmbientLight(0x5d3667, 0.3);
  scene.add(ambientLight);

  var star1 = new THREE.PointLight(0xfff4f3, 1);
  star1.position.set(100, 100, -100);
  scene.add(star1);

  for (var i = 0; i < 100; i++) {
    var starColor;
    //var random_color_selector = Math.round(Math.random() * 3) + 1;

    switch (random_color_selector = Math.round(Math.random() * 3) + 1) {
      case 1:
        starColor = starColors.white;
        break;
      case 2:
        starColor = starColors.red;
        break;
      case 3:
        starColor = starColors.blue;
    }


    var starShape = new THREE.Mesh(
      new THREE.SphereGeometry( 1, 1, 1 ),
      new THREE.MeshBasicMaterial( { color: starColor } )
    );

  var x_position = (Math.round(Math.random()) * 2 - 1) * Math.floor(Math.random() * 300);
  var y_position = Math.floor(Math.random() * 100) + 30;
  var z_position = -1 * (Math.floor(Math.random() * 100) + 70);

    starShape.position.set(x_position, y_position, z_position);
    stage.scene.add(starShape);
  }

  // var player1_spotlight = new THREE.SpotLight(0xffffff);
  // player1_spotlight.position.set(0,0, 10);
  // player1_spotlight.castShadow = true;
  // player1_spotlight.angle = 0.35;
  // //player1_spotlight.distance = 16;
  // //player1_spotlight.decay = 2;
  // player1_spotlight.penumbra = 0.7;
  //
  // scene.add(player1_spotlight);



  // var star2 = new THREE.PointLight(0xafc9ff, 0.7);
  // star2.position.set(50, 50, 0);
  // scene.add(star1);

}



function createFollowSpotlights() {

  var player1_spotlight = new THREE.SpotLight(0xffffff);
  player1_spotlight.position.set(stage.player1.x - 10 , stage.player1.y, 10);
  player1_spotlight.castShadow = true;
  player1_spotlight.angle = 0.35;
  //player1_spotlight.distance = 16;
  //player1_spotlight.decay = 2;
  player1_spotlight.penumbra = 0;
  //player1_spotlight.target = stage.player1;
  var player1Target = new THREE.Mesh(
    new THREE.SphereGeometry( 0, 0, 0 ),
    new THREE.MeshBasicMaterial( { color: 0x000000 } )
  );
  player1Target.position.set(stage.player1.x, stage.player1.y, -1);
  stage.scene.add(player1Target);
  player1_spotlight.target = player1Target;
  stage.scene.add(player1_spotlight);

  var player2_spotlight = new THREE.SpotLight(0xffffff);
  player2_spotlight.position.set(stage.player2.x + 10, stage.player2.y, 10);
  player2_spotlight.castShadow = true;
  player2_spotlight.angle = 0.35;
  //player1_spotlight.distance = 16;
  //player1_spotlight.decay = 2;
  player2_spotlight.penumbra = 0;

  stage.scene.add(player2_spotlight);

}
