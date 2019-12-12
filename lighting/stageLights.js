var starColors = {
  white: 0xffffff,
  red: 0xffebd1,
  blue: 0xcad8ff,
};

//noonLights and nightLights incomplete

function noonLights(scene) {
    // Create the Skybox
  var geomBox = new THREE.BoxGeometry(10000, 10000, 10000, 10, 10, 10);
  var matBox  = new THREE.MeshBasicMaterial(
                             { color : 0x87ceeb});
  var box = new THREE.Mesh(geomBox, matBox);
  box.material.side = THREE.BackSide;
  scene.add(box);
  //
  var ambientLight = new THREE.PointLight(Colors.white, 1);
  ambientLight.position.set(0,50,-20);
  scene.add(ambientLight);

}


function sunsetLights(scene) {
    // Create the Skybox
  var geomBox = new THREE.BoxGeometry(10000, 10000, 10000, 10, 10, 10);


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

  stage.night = true;

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

}



function createFollowSpotlights() {

  var stageCover = new THREE.Mesh(
    new THREE.PlaneGeometry( 1000, 1000),
    new THREE.MeshPhongMaterial( { color: 0xdddddd, opacity: 0.1, transparent: true,
    side: THREE.DoubleSide } )
  );
  stageCover.position.set(0, 0, 10);
  stage.scene.add(stageCover);


  var player1_spotlight_target = new THREE.Mesh(
    new THREE.PlaneGeometry( 1, 1),
    new THREE.MeshLambertMaterial( { color: 0xdddddd, opacity: 0.01, transparent: true,
    side: THREE.DoubleSide } )
  );

  player1_spotlight_target.position.set(stage.player1.x, stage.player1.y+10, -10);
  stage.scene.add(player1_spotlight_target);

  var player1_spotlight = new THREE.SpotLight(0xcccccc);
  player1_spotlight.position.set(stage.player1.x + 10, stage.player1.y-10, 40);
  player1_spotlight.castShadow = true;
  player1_spotlight.angle = 0.5;
  //player1_spotlight.distance = 16;
  //player1_spotlight.decay = 2;
  player1_spotlight.penumbra = 0;
  player1_spotlight.target = player1_spotlight_target;
  //stage.scene.add(player1_spotlight);
  player1_spotlight_target.add(player1_spotlight);
  //
  stage.player1Spot = player1_spotlight;
  stage.player1SpotTarget = player1_spotlight_target;



  var player2_spotlight_target = new THREE.Mesh(
    new THREE.PlaneGeometry( 1, 1),
    new THREE.MeshLambertMaterial( { color: 0xdddddd, opacity: 0.01, transparent: true,
    side: THREE.DoubleSide } )
  );

  player2_spotlight_target.position.set(stage.player2.x - 10, stage.player2.y+10, -10);
  stage.scene.add(player2_spotlight_target);

  var player2_spotlight = new THREE.SpotLight(0xcccccc);
  player2_spotlight.position.set(stage.player2.x - 10, stage.player2.y-10, 40);
  player2_spotlight.castShadow = true;
  player2_spotlight.angle = 0.5;
  //player2_spotlight.distance = 16;
  //player2_spotlight.decay = 2;
  player2_spotlight.penumbra = 0;
  player2_spotlight.target = player2_spotlight_target;
  //stage.scene.add(player2_spotlight);
  player2_spotlight_target.add(player2_spotlight);
  //
  stage.player2Spot = player2_spotlight;
  stage.player2SpotTarget = player2_spotlight_target;


}
