
function generateSnow() {

  stage.snow = new THREE.Group();

  for (var i = 0; i < 1000; i++) {
    var snowColor;

    var snowShape = new THREE.Mesh(
      new THREE.SphereBufferGeometry( 1, 1, 1 ),
      new THREE.MeshBasicMaterial( { color: 0xffffff } )
    );

  var x_position = (Math.round(Math.random()) * 2 - 1) * Math.floor(Math.random() * 400);
  var y_position = (Math.round(Math.random()) * 2 - 1) * Math.floor(Math.random() * 900);
  var z_position = (Math.round(Math.random()) * 2 - 1) * (Math.floor(Math.random() * 100) + 30);

    snowShape.position.set(x_position, y_position, z_position);
    stage.snow.add(snowShape);
  }

  stage.scene.add(stage.snow);


 }

 function rotateSnow() {
    //stage.snow.rotation.x += SPEED;
    //stage.snow.rotation.x += 0.003;
    if (stage.snow.position.y <= -850){
      stage.snow.position.y = 0;
    }
    stage.snow.translateY(-3);
    // stage.snow.rotation.y += SPEED * 2;
    // stage.snow.rotation.z += SPEED* 10;
    // // console.log("rotating");
 }
