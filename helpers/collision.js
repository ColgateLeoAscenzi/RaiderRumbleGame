var raycaster = new THREE.Raycaster();
var INTERSECTED, INTERSECTEDLEFT, INTERSECTEDRIGHT;


function arrEqual(arr1, arr2){
  if(arr1.length!= arr2.length){return false;}
  for(var i = 0; i < arr1.length;i++){
    if(arr1[i] != arr2[i]){
      return false;
    }
  }
  return true;
}

//left = [1,0,0];
//right = [-1,0,0];
//below = [0,1,0];
function lookDirection(direction){
  // var pVec;
  // creates a vector from the player to some point way below
  var positionBelow = new THREE.Vector3();
  positionBelow.x = player1.x-(1000*direction[0]);
  positionBelow.y = player1.y-(1000*direction[1]);
  positionBelow.z = player1.z-(1000*direction[2]);

  if(arrEqual(direction, [1,0,0]) || arrEqual(direction, [-1,0,0])){
    var intersects =[]
    var pVec = new THREE.Vector3();
    pVec.x = player1.x-player1.width/2+0.01;
    pVec.y = player1.y-player1.height/2+0.01;
    pVec.z = player1.z;
    raycaster.set(pVec, positionBelow.normalize());
    // calculate objects intersecting the picking ray
    intersects = raycaster.intersectObjects(blockMeshes);
  }
  else if(arrEqual(direction, [0,1,0])){
    //cast one from bottom left
    var intersects =[];
    var pVecBL = new THREE.Vector3();
    pVecBL.x = player1.x-player1.width/2+0.01;
    pVecBL.y = player1.y-player1.height/2+0.01;
    pVecBL.z = player1.z;
    raycaster.set(pVecBL, positionBelow.normalize());
    var intersectsBL = raycaster.intersectObjects(blockMeshes);

    //set from bottom right
    var pVecBR = new THREE.Vector3();
    pVecBR.x = player1.x+player1.width/2-0.01;
    pVecBR.y = player1.y-player1.height/2+0.01;
    pVecBR.z = player1.z;
    raycaster.set(pVecBR, positionBelow.normalize());
    var intersectsBR = raycaster.intersectObjects(blockMeshes);

    // if(intersectsBL[0] > intersectsBR[0]){
    //   intersects.push(intersectsBL[0]);
    // }
    // else{
    //   intersects.push(intersectsBR[0]);
    // }
    // console.log(intersectsBL[0],intersectsBR[0]);
    intersects.push(intersectsBL[0]);
  }

  // console.log(pVec);
  //casts a ray from player to point below

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
