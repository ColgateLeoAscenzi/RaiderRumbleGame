var raycaster = new THREE.Raycaster();
var INTERSECTED, INTERSECTEDLEFT, INTERSECTEDRIGHT;


//left = [1,0,0];
//right = [-1,0,0];
//below = [0,1,0];
function lookDirection(direction){
  // creates a vector from the player to some point way below
  var positionBelow = new THREE.Vector3();
  positionBelow.x = player1.x-(1000*direction[0]);
  positionBelow.y = player1.y-(1000*direction[1]);
  positionBelow.z = player1.z-(1000*direction[2]);

  var pVec = new THREE.Vector3();
  pVec.x = player1.x;
  pVec.y = player1.y-7.5;
  pVec.z = player1.z;
  // console.log(pVec);
  //casts a ray from player to point below
  raycaster.set(pVec, positionBelow.normalize());
  // calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects(blockMeshes);
  // console.log(direction);
  // console.log(intersects);

  if ( intersects.length > 0 ) {
      // if ( INTERSECTED != intersects[ 0 ].object ) {
      //     if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
      //     INTERSECTED = intersects[ 0 ].object;
      //     INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      //     INTERSECTED.material.emissive.setHex( 0xff0000 );
          //boxBelow = intersects[0].object;
      if(direction[1] == 1){
        boxBelow = intersects[0].object;
      }
      //boxLeft = intersects[0].object;
      if(direction[0] == 1){
        boxLeft = intersects[0].object;
      }
      //boxRight = intersects[0].object;
      if(direction[0] == -1){
        boxRight = intersects[0].object;
      }

      // }
  } else {
      // if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
      // INTERSECTED = null;
      //boxBelow = undefined;
      if(direction[1] == 1){
        boxBelow = undefined;
      }
      //boxLeft = undefined;
      if(direction[0] == 1){
        boxLeft = undefined;
      }
      if(direction[0] == -1){
        boxRight = undefined;
      }
  }

  // belowBox = boxes[0];
  // boxLeft = boxes[1];
  // boxRight = boxes[2];

}
