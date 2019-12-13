var SPEED = 0.05

function generateSnow() {

  stage.snow = new THREE.Group();

  for (var i = 0; i < 100; i++) {
    var snowColor;

    var snowShape = new THREE.Mesh(
      new THREE.SphereGeometry( 1, 1, 1 ),
      new THREE.MeshBasicMaterial( { color: 0xffffff } )
    );

  var x_position = (Math.round(Math.random()) * 2 - 1) * Math.floor(Math.random() * 300);
  var y_position = Math.floor(Math.random() * 100) + 30;
  var z_position = (Math.round(Math.random()) * 2 - 1) * (Math.floor(Math.random() * 100) + 30);

    snowShape.position.set(x_position, y_position, z_position);
    stage.scene.add(snowShape);
  }


 }

 function rotateSnow() {
    stage.snow.rotateX = SPEED * 2;
    stage.snow.rotateY = SPEED * 2;
    stage.snow.rotateZ = SPEED * 2;
    console.log("rotating");
 }
