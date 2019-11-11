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
  camera.position.x = 50;
  camera.position.z = 50;
  camera.position.y = 50;

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

function createBox(x, y, z) {
  basicBoxMesh = basicBox.model.clone();
  basicBoxMesh.position.set(x, y, z);
  basicBox.x = x;
  basicBox.y = y;
  basicBox.z = z;
  scene.add(basicBoxMesh);
  blocks.push(basicBox);

  basicHitBoxMesh = basicBox.hitBox.clone();
  basicHitBoxMesh.position.set(x, y, z);

  hitBoxes.push(basicHitBoxMesh);

}

function loop() {
  doUpdates();
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

function doUpdates(){
    for(var i = 0; i < blocks.length; i++){
        blocks[i].update();
    }
}


function init() {
  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;

  createScene();
  
  //x
  for(var i = 0; i < 4; i++){
      createBox(i*basicBox.width*1.5, 0, 0);
  }
  //y
  for(var i = 0; i < 4; i++){
      createBox(0, i*basicBox.width*1.5, 0);
  }
  //z generation
  for(var i = 0; i < 4; i++){
      createBox(0, 0, i*basicBox.width*1.5);
  }
  console.log(blocks[0]);
  camera.lookAt(blocks[0].model.position);

  loop();
}

function handleKeyUp(keyEvent){
    // if(keyEvent.key == "h"){
    //     hitBoxes(blocks, false);
    // }

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
