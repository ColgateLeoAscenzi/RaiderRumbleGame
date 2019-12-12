var raycaster = new THREE.Raycaster();
//bottom looking, left and right
var intBL, intBR;
//left looking top and bottom
var intLT, intLB;
//right looking top and bottom
var intRT, intRB;

var oldRays = [];


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
  for(var i = 0; i < stage.players.length; i++){
    var farAwayPoint = new THREE.Vector3();


    var intersects =[];
    //will be bottom left then bottom right,
    //right bottom, right top,
    //left bottom, left top
    var pVec1 = new THREE.Vector3();
    var pVec2 = new THREE.Vector3();
    var intersects1 = [];
    var intersects2 = [];

    //left
    if(arrEqual(direction, [1,0,0])){
      //far left
      farAwayPoint.x = -1;
      farAwayPoint.y = 0;
      farAwayPoint.z = 0;

      pVec1.x = stage.players[i].x-(2*stage.players[i].width)/5;
      pVec1.y = stage.players[i].y-(2*stage.players[i].height)/5;
      pVec1.z = stage.players[i].z;
      raycaster.set(pVec1, farAwayPoint.normalize());
      intersects1 = raycaster.intersectObjects(stage.blockAMeshes);

      pVec2.x = stage.players[i].x-(2*stage.players[i].width)/5;
      pVec2.y = stage.players[i].y+(2*stage.players[i].height)/5;
      pVec2.z = stage.players[i].z;
      raycaster.set(pVec2, farAwayPoint.normalize());
      intersects2 = raycaster.intersectObjects(stage.blockAMeshes);

      var pointA = pVec1;
      var pointB = new THREE.Vector3();
      pointB.addVectors ( pointA, farAwayPoint.normalize().multiplyScalar( 20 ) );
      drawRay(pointA, pointB, 0xff0000);
      var pointA = pVec2;
      var pointB = new THREE.Vector3();
      pointB.addVectors ( pointA, farAwayPoint.normalize().multiplyScalar( 20 ) );
      drawRay(pointA, pointB, 0xff0000);

    }
    //right
    else if(arrEqual(direction, [-1,0,0])){
      //far right
      farAwayPoint.x = 1;
      farAwayPoint.y = 0;
      farAwayPoint.z = 0;

      //current right below
      pVec1.x = stage.players[i].x+(2*stage.players[i].width)/5;
      pVec1.y = stage.players[i].y-(2*stage.players[i].height)/5;
      pVec1.z = stage.players[i].z;
      raycaster.set(pVec1, farAwayPoint.normalize());
      intersects1 = raycaster.intersectObjects(stage.blockAMeshes);
      //current right top
      pVec2.x = stage.players[i].x+(2*stage.players[i].width)/5;
      pVec2.y = stage.players[i].y+(2*stage.players[i].height)/5;
      pVec2.z = stage.players[i].z;
      raycaster.set(pVec2, farAwayPoint.normalize());
      intersects2 = raycaster.intersectObjects(stage.blockAMeshes);

      //draw right below
      var pointA = pVec1;
      var pointB = new THREE.Vector3();
      pointB.addVectors ( pointA, farAwayPoint.normalize().multiplyScalar( 20 ) );
      drawRay(pointA, pointB, 0x00ff00);
      //draw right top
      var pointA = pVec2;
      var pointB = new THREE.Vector3();
      pointB.addVectors ( pointA, farAwayPoint.normalize().multiplyScalar( 20 ) );
      drawRay(pointA, pointB, 0x00ff00);

    }
    //below
    else if(arrEqual(direction, [0,1,0])){
      farAwayPoint.x = 0;
      farAwayPoint.y = -1;
      farAwayPoint.z = 0;

      pVec1.x = stage.players[i].x-(2*stage.players[i].width)/5;
      pVec1.y = stage.players[i].y-(2*stage.players[i].height)/5;
      pVec1.z = stage.players[i].z;
      raycaster.set(pVec1, farAwayPoint.normalize());
      intersects1 = raycaster.intersectObjects(stage.blockAMeshes);

      pVec2.x = stage.players[i].x+(2*stage.players[i].width)/5;
      pVec2.y = stage.players[i].y-(2*stage.players[i].height)/5;
      pVec2.z = stage.players[i].z;
      raycaster.set(pVec2, farAwayPoint.normalize());
      intersects2 = raycaster.intersectObjects(stage.blockAMeshes);

      var pointA = pVec1;
      var pointB = new THREE.Vector3();
      pointB.addVectors ( pointA, farAwayPoint.normalize().multiplyScalar( 20 ) );
      drawRay(pointA, pointB, 0x0000ff);

      var pointA = pVec2;
      var pointB = new THREE.Vector3();
      pointB.addVectors ( pointA, farAwayPoint.normalize().multiplyScalar( 20 ) );
      drawRay(pointA, pointB, 0x0000ff);

    }
    //above
    else if(arrEqual(direction, [0,-1,0])){
      farAwayPoint.x = 0;
      farAwayPoint.y = 1;
      farAwayPoint.z = 0;

      pVec1.x = stage.players[i].x-(2*stage.players[i].width)/5;
      pVec1.y = stage.players[i].y+(2*stage.players[i].height)/5;
      pVec1.z = stage.players[i].z;
      raycaster.set(pVec1, farAwayPoint.normalize());
      intersects1 = raycaster.intersectObjects(stage.blockAMeshes);

      pVec2.x = stage.players[i].x+(2*stage.players[i].width)/5;
      pVec2.y = stage.players[i].y+(2*stage.players[i].height)/5;
      pVec2.z = stage.players[i].z;
      raycaster.set(pVec2, farAwayPoint.normalize());
      intersects2 = raycaster.intersectObjects(stage.blockAMeshes);

      var pointA = pVec1;
      var pointB = new THREE.Vector3();
      pointB.addVectors ( pointA, farAwayPoint.normalize().multiplyScalar( 20 ) );
      drawRay(pointA, pointB, 0xff00ff);

      var pointA = pVec2;
      var pointB = new THREE.Vector3();
      pointB.addVectors ( pointA, farAwayPoint.normalize().multiplyScalar( 20 ) );
      drawRay(pointA, pointB, 0xff00ff);

    }

    intersects = determineClosest(intersects1, intersects2);

    if ( intersects != undefined) {
        if(intersects.length > 0){
            //players[i].boxBelow = intersects[0].object;
        if(direction[1] == 1){
          stage.players[i].boxBelow = intersects[0].object;
        }
        //stage.players[i].boxLeft = intersects[0].object;
        if(direction[0] == 1){
          stage.players[i].boxLeft = intersects[0].object;
        }
        //players[i].boxRight = intersects[0].object;
        if(direction[0] == -1){
          stage.players[i].boxRight = intersects[0].object;
        }
        if(direction[1] == -1){
            if(intersects[0].object.userData.type != "platform"){
                stage.players[i].boxAbove = intersects[0].object;
            }
            else{
                stage.players[i].boxAbove = undefined;
            }
        }
      }
      else{
        //players[i].boxBelow = undefined;
        if(direction[1] == 1){
          stage.players[i].boxBelow = undefined;
        }
        //players[i].boxLeft = undefined;
        if(direction[0] == 1){
          stage.players[i].boxLeft = undefined;
        }
        if(direction[0] == -1){
          stage.players[i].boxRight = undefined;
        }
        if(direction[1] == -1){
          stage.players[i].boxAbove = undefined;
        }
      }

    } else {
        //players[i].boxBelow = undefined;
        if(direction[1] == 1){
          stage.players[i].boxBelow = undefined;
        }
        //players[i].boxLeft = undefined;
        if(direction[0] == 1){
          stage.players[i].boxLeft = undefined;
        }
        if(direction[0] == -1){
          stage.players[i].boxRight = undefined;
        }
        if(direction[1] == -1){
          stage.players[i].boxAbove = undefined;
        }
    }
  }


}

function determineClosest(arr1, arr2){
  if(arr1.length > 0 && arr2.length > 0){
      if(arr1[0].distance < arr2[0].distance){
          return arr1;
      }
      else{
          return arr2;
      }
      console.log("Both exist but neither is closer");
      return arr1;
  }
  else if(!(arr1.length > 0) && arr2.length > 0){
    return arr2;
  }
  else if(!(arr2.length > 0) && arr1.length > 0){
    return arr1;
  }
  else if(!(arr1.length > 0) && !(arr2.length > 0)){
    return undefined;
  }
  console.log("none of these three cases exist");
  return arr1;
}

function drawRay(pointA, pointB, color){
 //  if(drawRays){
 //      var geometry = new THREE.Geometry();
 //      geometry.vertices.push( pointA );
 //      geometry.vertices.push( pointB );
 //      var material = new THREE.LineBasicMaterial( { color : color } );
 //      var intLT = new THREE.Line(geometry, material);
 //      stage.scene.add(intLT);
 //      setTimeout(function(){stage.scene.remove(intLT)}, 25);
 //      setTimeout(function(){intLT.geometry.dispose();}, 25);
 // }
}
