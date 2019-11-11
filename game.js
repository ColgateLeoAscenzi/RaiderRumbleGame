//COLORS
var Colors = {
    skyBlue: 0x86ebcc,
    ground: 0x332609,
    golden: 0xebaf2a
};

// THREEJS RELATED VARIABLES

var scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer, container;

var hitBoxesOn = false;

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

  var hemisphereLight = new THREE.HemisphereLight(Colors.skyBlue, Colors.ground, 1);
  scene.add(hemisphereLight);

  var directLight = new THREE.DirectionalLight(Colors.golden, 1);
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
var hitBoxes = [];
var player1;

function createBox(x, y, z) {
  basicBoxMesh = basicBox.model.clone();
  basicBoxMesh.position.set(x, y, z);
  // basicBox.x = x;
  // basicBox.y = y;
  // basicBox.z = z;
  scene.add(basicBoxMesh);
  blocks.push(basicBox);

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
  player1.init();
  player1Mesh = player1.model;
  // player1Mesh.position.set(x, y, z);

  player1HitBoxMesh = player1.hitBox;
  // player1HitBoxMesh.position.set(x, y, z)
  hitBoxes.push(player1HitBoxMesh);

  scene.add(player1Mesh);
}

function loop() {
  doUpdates();
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
  camera.lookAt(player1.model.position);
}

function doUpdates(){
  //updates all blocks
    for(var i = 0; i < blocks.length; i++){
        blocks[i].update();
    }

    player1.update();
}


function initGame() {
  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;

  createScene();

  //Build a platform spreading across the x direction
  createSimpleMap();
  camera.lookAt(blocks[0].model.position);

  createPlayer1(0, 10, 0)

  loop();
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

   if(keyEvent.key == "a"){
     //moving left
     player1.movingL = true;
     player1.xVel = -1;
   }
   if(keyEvent.key == "d"){
     //moving right
     player1.movingR = true;
     player1.xVel = 1;
   }
   if(keyEvent.key == "w"){
     //jumping
     if(player1.jumpCt == 2){
       player1.canJump = false;
     }
     if(player1.canJump){
       player1.jumping = true;
       player1.yVel = 1;
       player1.jumpCt +=1;
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
