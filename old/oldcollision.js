var raycaster = new THREE.Raycaster();
var INTERSECTED,INTERSECTEDLEFT,INTERSECTEDRIGHT;

var boxes = [boxBelow, boxLeft, boxRight];

//left = [1,0,0];
//right = [-1,0,0];
//below = [0,1,0];
function lookDirection(direction){
  // creates a vector from the player to some point way below
  var positionBelow = new THREE.Vector3();
  positionBelow.x = player1.x-1000*direction[0];
  positionBelow.y = player1.y-1000*direction[1];
  positionBelow.z = player1.z-1000*direction[2];

  //casts a ray from player to point below
  raycaster.set(player1, positionBelow.normalize());
  // calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects(blockMeshes);

  if ( intersects.length > 0 ) {
      if ( INTERSECTED != intersects[ 0 ].object ) {
          if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
          INTERSECTED = intersects[ 0 ].object;
          INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
          INTERSECTED.material.emissive.setHex( 0xff0000 );
          //boxBelow = intersects[0].object;
          if(direction[1] == 1){
            boxes[0] = intersects[0].object;
          }
          //boxLeft = intersects[0].object;
          if(direction[0] == 1){
            boxes[1] = intersects[0].object;
          }
          //boxRight = intersects[0].object;
          if(direction[0] == -1){
            boxes[2] = intersects[0].object;
          }

      }
  } else {
      if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
      INTERSECTED = null;
      //boxBelow = undefined;
      if(direction[1] == 1){
        boxes[0] = undefined;
      }
      //boxLeft = undefined;
      if(direction[0] == 1){
        boxes[1] = undefined;
      }
      if(direction[0] == -1){
        boxes[2] = undefined;
      }
  }

  belowBox = boxes[0];
  boxLeft = boxes[1];
  boxRight = boxes[2];

}










/////////////////
function lookBelow(){
    // creates a vector from the player to some point way below
    var positionBelow = new THREE.Vector3();
    positionBelow.x = player1.x;
    positionBelow.y = player1.y-1000;
    positionBelow.z = player1.z;

    //casts a ray from player to point below
    raycaster.set(player1, positionBelow.normalize());

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(blockMeshes);
    // finds the intersections and colors them for testing, adds to the below box
    if ( intersects.length > 0 ) {
        if ( INTERSECTED != intersects[ 0 ].object ) {
            if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
            INTERSECTED = intersects[ 0 ].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex( 0xff0000 );
            boxBelow = intersects[0].object;
        }
    } else {
        if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        INTERSECTED = null;
        boxBelow = undefined;
    }
}
function lookRight(){
    // creates a vector from the player to some point way below
    var positionBelow = new THREE.Vector3();
    positionBelow.x = player1.x+1000;
    positionBelow.y = player1.y;
    positionBelow.z = player1.z;

    //casts a ray from player to point below
    raycaster.set(player1, positionBelow.normalize());

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(blockMeshes);
    // finds the intersections and colors them for testing, adds to the below box
    if ( intersects.length > 0 ) {
        if ( INTERSECTEDRIGHT != intersects[ 0 ].object ) {
            if ( INTERSECTEDRIGHT ) INTERSECTEDRIGHT.material.emissive.setHex( INTERSECTEDRIGHT.currentHex );
            INTERSECTEDRIGHT = intersects[ 0 ].object;
            INTERSECTEDRIGHT.currentHex = INTERSECTEDRIGHT.material.emissive.getHex();
            INTERSECTEDRIGHT.material.emissive.setHex( 0xff0000 );
            boxRight = intersects[0].object;
        }
    } else {
        if ( INTERSECTEDRIGHT ) INTERSECTEDRIGHT.material.emissive.setHex( INTERSECTEDRIGHT.currentHex );
        INTERSECTEDRIGHT = null;
        boxRight = undefined;
    }
}
function lookLeft(){
    // creates a vector from the player to some point way below
    var positionBelow = new THREE.Vector3();
    positionBelow.x = player1.x-1000;
    positionBelow.y = player1.y;
    positionBelow.z = player1.z;

    //casts a ray from player to point below
    raycaster.set(player1, positionBelow.normalize());

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(blockMeshes);
    // finds the intersections and colors them for testing, adds to the below box
    if ( intersects.length > 0 ) {
        if ( INTERSECTEDLEFT != intersects[ 0 ].object ) {
            if ( INTERSECTEDLEFT ) INTERSECTEDLEFT.material.emissive.setHex( INTERSECTEDLEFT.currentHex );
            INTERSECTEDLEFT = intersects[ 0 ].object;
            INTERSECTEDLEFT.currentHex = INTERSECTEDLEFT.material.emissive.getHex();
            INTERSECTEDLEFT.material.emissive.setHex( 0xff0000 );
            boxLeft = intersects[0].object;
        }
    } else {
        if ( INTERSECTEDLEFT ) INTERSECTEDLEFT.material.emissive.setHex( INTERSECTEDLEFT.currentHex );
        INTERSECTEDLEFT = null;
        boxLeft = undefined;
    }
}
