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
var mouse = new THREE.Vector2(), INTERSECTED;

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
  for(var i = -4; i < 5; i++){
    if(i == -4 || i == 4){
      createBox(i*basicBox.width, basicBox.height, 0);
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

function doUpdates(){
  // updates all blocks
    for(var i = 0; i < blocks.length; i++){
        blocks[i].update();
    }

    player1.update();
}


function initGame() {
  console.log(window.innerWidth, window.innerHeight);

  if(window.innerWidth < 1000 && window.innerHeight < 600){
      console.log("mobile detected");
      mobileMode = true;
      var container = document.getElementById("container");
      var leftButton = document.createElement("div");
      leftButton.id = "leftButton";
      leftButton.innerHTML = "LEFT";
      container.appendChild(leftButton);

      var rightButton = document.createElement("div");
      rightButton.id = "rightButton";
      rightButton.innerHTML = "RIGHT";
      container.appendChild(rightButton);

      var topButton = document.createElement("div");
      topButton.id = "topButton";
      topButton.innerHTML = "JUMP";
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
