//COLORS
var Colors = {
    skyBlue: 0x86ebcc,
    ground: 0x332609,
    golden: 0xebaf2a,
    white: 0xffffff,
    grey: 0xb0a896
};

// THREEJS RELATED VARIABLES

var scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer, container;

var hitBoxesOn = false;
var trackPlayer = true;
var confettiOn = false;
var mobileMode = false;

//TESTING RAYCASTING
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(), INTERSECTED, INTERSECTEDLEFT,INTERSECTEDRIGHT;

//SCREEN & MOUSE VARIABLES

var HEIGHT, WIDTH

//INIT THREE JS, SCREEN AND MOUSE EVENTS

function createScene() {

  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene();

  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 10000;
  camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );
  //
  var hemisphereLight = new THREE.HemisphereLight(Colors.white, Colors.ground, 1);
  scene.add(hemisphereLight);

  var directLight = new THREE.DirectionalLight(Colors.white, 1);
  directLight.position.set(-50, 50, 50);
  scene.add(directLight);


  scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

  //isometric
  // camera.position.x = 50;
  // camera.position.z = 50;
  // camera.position.y = 50;
  camera.position.x = 0;
  camera.position.z = 80;
  camera.position.y = 40;

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  container = document.getElementById('glcanvas');
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', handleWindowResize, false);
  window.addEventListener('mousemove', onMouseMove, false);

}

// HANDLE SCREEN EVENTS

function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}


//creation
var basicBoxMesh;
var blocks = [];
var blockMeshes = [];
var hitBoxes = [];
var player1;

var boxBelow;
var boxAbove;
var boxLeft;
var boxRight;



function createBox(x, y, z) {

  basicBoxMesh = basicBox.model.clone();
  basicBoxMesh.material = new THREE.MeshPhongMaterial(
                             { color : Colors.grey});
  basicBoxMesh.position.set(x, y, z);
  // basicBox.x = x;
  // basicBox.y = y;
  // basicBox.z = z;
  scene.add(basicBoxMesh);
  blocks.push(basicBox);
  blockMeshes.push(basicBoxMesh);

  basicHitBoxMesh = basicBox.hitBox.clone();
  basicHitBoxMesh.position.set(x, y, z);

  hitBoxes.push(basicHitBoxMesh);

}



function createSimpleMap(){
  for(var i = -5; i < 6; i++){
    if(i == -5 || i == 5){
      createBox(i*basicBox.width, basicBox.height, 0);
      createBox(i*basicBox.width, basicBox.height*2, 0);
    }
    if(i == 0){
      createBox(i*basicBox.width, 0, 0);
      createBox(i*basicBox.width, basicBox.height*3, 0);
    }
    else{
      createBox(i*basicBox.width, 0, 0);
    }
  }
}
function createPlayer1(x, y, z){
  player1 = basicCharacter;
  player1Mesh = player1.model;
  // player1Mesh.position.set(x, y, z);

  player1HitBoxMesh = player1.hitBox;
  // player1HitBoxMesh.position.set(x, y, z)
  hitBoxes.push(player1HitBoxMesh);

  scene.add(player1Mesh);
}

var confetti = [];
function createConfetti(){
    //add confetti
      var geometry = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);

      for ( var i = 0; i < 2000; i ++ ) {

          var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

          object.position.x = Math.random() * 800 - 400;
          object.position.y = Math.random() * 800 - 400;
          object.position.z = Math.random() * 800 - 400;

          object.rotation.x = Math.random() * 2 * Math.PI;
          object.rotation.y = Math.random() * 2 * Math.PI;
          object.rotation.z = Math.random() * 2 * Math.PI;

          object.scale.x = Math.random() + 0.5;
          object.scale.y = Math.random() + 0.5;
          object.scale.z = Math.random() + 0.5;

          scene.add( object );
          confetti.push(object);

      }
}

function loop() {
  doUpdates();
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
  if(trackPlayer){
    camera.position.set(player1.model.position.x,player1.model.position.y+50,player1.model.position.z+80);
    if(player1.model.position.x < 0){
      camera.lookAt(player1.model.position.x*+player1.model.position.x*-0.01,player1.model.position.y,player1.model.position.z);

    }
    else{
      camera.lookAt(player1.model.position.x*+player1.model.position.x*0.01,player1.model.position.y,player1.model.position.z);

    }

  }
  else{
    camera.position.set(0, 40, 80);
    camera.lookAt(blocks[0].model.position.x,blocks[0].model.position.y+25,blocks[0].model.position.z);
  }

  lookBelow();
  lookRight()
  lookLeft()


}

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

function doUpdates(){
  // updates all blocks
    for(var i = 0; i < blocks.length; i++){
        blocks[i].update();
    }

    player1.update();
}


function initGame() {
  console.log(window.innerWidth, window.innerHeight);
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  if(check){
      console.log("mobile detected");
      mobileMode = true;
      var container = document.getElementById("container");
      var leftButton = document.createElement("div");
      leftButton.id = "leftButton";
      container.appendChild(leftButton);

      var rightButton = document.createElement("div");
      rightButton.id = "rightButton";
      container.appendChild(rightButton);

      var topButton = document.createElement("div");
      topButton.id = "topButton";
      container.appendChild(topButton);
  }
  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;

  if(mobileMode){
      document.ontouchstart = handleTapDown;
      document.ontouchend = handleTapUp;
  }

  createScene();

  //Build a platform spreading across the x direction
  createSimpleMap();
  camera.lookAt(blocks[0].model.position.x,blocks[0].model.position.y+10,blocks[0].model.position.z);

  createPlayer1(0, 10, 0);


  loop();
}

function handleTapDown(event){
    mouse.x = (event.touches[0].clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - (event.touches[0].clientY / window.innerHeight ) * 2 + 1;
    //player 1 control
    if(mouse.x < -0.3 && mouse.y < -0.2){
      //moving left
      player1.movingL = true;
      player1.xVel = -player1.walkSpeed;
    }
    if(mouse.x > 0.3 && mouse.y < -0.2){
        player1.movingR = true;
        player1.xVel = player1.walkSpeed;
    }
    if(mouse.y > 0.2){
        if(player1.jumpCt == player1.maxJumpCt){
            player1.canJump = false;
          }
          if(player1.canJump){
            player1.jumping = true;
            player1.yVel = player1.jumpSpeed;
            player1.jumpCt +=1;
            player1. onGround = false;
          }
    }

}

function handleTapUp(event){

    mouse.x = ( event.changedTouches[0].clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.changedTouches[0].clientY / window.innerHeight ) * 2 + 1;
    //player 1 control
    if(mouse.x < -0.3 && mouse.y < -0.2){
        player1.movingL = false;
    }
    if(mouse.x > 0.3 && mouse.y < -0.2){
        player1.movingR = false;
    }
    if(mouse.y > 0.2){
        player1.jumping = false;
    }


}


function handleKeyUp(keyEvent){
    // if(keyEvent.key == "h"){
    //     hitBoxes(blocks, false);
    // }
    if(keyEvent.key == "a"){
      //moving left
      player1.movingL = false;
    }
    if(keyEvent.key == "d"){
      //moving right
      player1.movingR = false;
    }
    if(keyEvent.key == "w"){
      //jumping
      player1.jumping = false;
    }

}
function handleKeyDown(keyEvent){

   if(keyEvent.key == "h"){
       if(!hitBoxesOn){
           hitBoxesOn = true;
           console.log("hitboxes on");
           toggleHitBoxes(hitBoxes, true);
       }
       else{
           hitBoxesOn = false;
           console.log("hitboxes off");
           toggleHitBoxes(hitBoxes, false);
       }
   }

   if(keyEvent.key == "p"){
     if(trackPlayer){
       trackPlayer = false;
     }
     else{
       trackPlayer = true;
     }
   }

   if(keyEvent.key == "o"){
       if(confettiOn){
           confettiOn = false;
           for(var i = 0; i < confetti.length; i++){
               scene.remove(confetti[i]);
           }
       }
       else{
           createConfetti();
           confettiOn = true;
       }
   }


   //player 1 control
   if(keyEvent.key == "a"){
     //moving left
     player1.movingL = true;
     player1.xVel = -player1.walkSpeed;
   }
   if(keyEvent.key == "d"){
     //moving right
     player1.movingR = true;
     player1.xVel = player1.walkSpeed;
   }
   if(keyEvent.key == "w"){
     //jumping
     if(player1.jumpCt == player1.maxJumpCt){
       player1.canJump = false;
     }
     if(player1.canJump){
       player1.jumping = true;
       player1.yVel = player1.jumpSpeed;
       player1.jumpCt +=1;
       player1. onGround = false;
     }
   }

}

function toggleHitBoxes(objArr, enable){
    console.log(objArr);
    if(enable){
        for(var i = 0; i < objArr.length; i++){
            scene.add(objArr[i]);
        }
    }
    else{
        for(var i = 0; i < objArr.length; i++){
            scene.remove(objArr[i]);
        }
    }

}



function onMouseMove(event){
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
