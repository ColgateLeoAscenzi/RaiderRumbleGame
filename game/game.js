//COLORS
var Colors = {
    skyBlue: 0x86ebcc,
    ground: 0x332609,
    golden: 0xebaf2a,
    white: 0xffffff,
    grey: 0xc7c9c8
};

// THREEJS RELATED VARIABLES

var camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer, container;

var stage;

var omegaOn = false;
var isDay = true;

var HIGHLITED;

var stageSelected = false;
var selectedStage;

var mediaElement;
var playingM = false;

var hitBoxesOn = false;
var trackPlayer = false;
var mobileMode = false;
var drawRays = false;
var gameOver = false;
var gameStarted = false;
var countDown = false;
var winner = -1;

var mapScene;

var selectedStageDat;

var currentLights = [];
var currentSpotLight = undefined;

//TESTING RAYCASTING
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var controls;

var selectableStages = [];


//DEBUGGING
// var stats = new Stats();
// stats.showPanel(1);
// document.body.appendChild(stats.dom);
var stats;

//var player1_spotlight = new THREE.SpotLight(0xffffff);


// stats = new Stats();
// stats.domElement.style.position = 'absolute';
// stats.domElement.style.bottom = '0px';
// stats.domElement.style.zIndex = 100;
//document.getElementById('container').appendChild( stats.domElement );


//SCREEN & MOUSE VARIABLES

var HEIGHT, WIDTH

//INIT THREE JS, SCREEN AND MOUSE EVENTS

function createCameraRender() {

  HEIGHT = window.innerHeight-20;
  WIDTH = window.innerWidth-20;

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
  camera.position.x = 0;
  camera.position.z = 120;
  camera.position.y = 40;

  stageSelectCamera = new THREE.PerspectiveCamera(
      30,
      aspectRatio,
      nearPlane,
      farPlane
    );

  stageSelectCamera.position.x = 0;
  stageSelectCamera.position.z = 120;
  stageSelectCamera.position.y = 40;

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  container = document.getElementById('glcanvas');
  container.appendChild(renderer.domElement);


  window.addEventListener('resize', handleWindowResize, false);
  window.addEventListener('mousemove', onMouseMove, false);
  window.addEventListener('mousedown', onMouseDown, false);

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  stats.domElement.style.zIndex = 100;
  container.appendChild(stats.domElement);

}

// HANDLE SCREEN EVENTS

function handleWindowResize() {
  HEIGHT = window.innerHeight-20;
  WIDTH = window.innerWidth-20;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
  stageSelectCamera.aspect = WIDTH / HEIGHT;
  stageSelectCamera.updateProjectionMatrix();
}


//THIS IS THE GAME LOOP
function loop() {
  doUpdates();
  renderer.render(stage.scene, camera);
  // console.log(renderer.info.memory);
  stats.update();
  requestAnimationFrame(loop);
  if(!gameOver){
    if(trackPlayer){
      camera.position.set(stage.player1.model.position.x,stage.player1.model.position.y+50,stage.player1.model.position.z+120);
      if(stage.player1.model.position.x < 0){
        camera.lookAt(stage.player1.model.position.x*+stage.player1.model.position.x*-0.005,stage.player1.model.position.y,stage.player1.model.position.z);
      }
      else{
        camera.lookAt(stage.player1.model.position.x*+stage.player1.model.position.x*0.005,stage.player1.model.position.y,stage.player1.model.position.z);

      }

    }
    else{
      camera.position.set((stage.player1.model.position.x+stage.player2.model.position.x)/2,(stage.player1.model.position.y+stage.player2.model.position.y)/2+50,stage.player1.model.position.z+120+Math.abs(stage.player1.model.position.x-stage.player2.model.position.x)*0.1);
      camera.lookAt((stage.player1.model.position.x+stage.player2.model.position.x)/2,(stage.player1.model.position.y+stage.player2.model.position.y)/2,stage.stageBlocks[0].model.position.z);
      if(camera.position.x < -90){
          camera.position.x = -90;
      }
      if(camera.position.x > 90){
          camera.position.x = 90;
      }
      if(camera.position.y < -40){
          camera.position.y = -40;
      }
      if(camera.position.y > 100){
          camera.position.y = 100;
      }
    }
  }
  else{
    if(winner == -1){
      camera.position.set((stage.player1.model.position.x+stage.player2.model.position.x)/2,(stage.player1.model.position.y+stage.player2.model.position.y)/2+50,stage.player1.model.position.z+120);
      camera.lookAt((stage.player1.model.position.x+stage.player2.model.position.x)/2,(stage.player1.model.position.y+stage.player2.model.position.y)/2,stage.stageBlocks[0].model.position.z);
    }
    else if(winner == 1){
      camera.position.set(stage.player1.model.position.x,stage.player1.model.position.y+0,stage.player1.model.position.z+50);
      camera.lookAt(stage.player1.model.position.x,stage.player1.model.position.y,stage.player1.model.position.z);
    }
    else if(winner == 2){
      camera.position.set(stage.player2.model.position.x,stage.player2.model.position.y+0,stage.player2.model.position.z+50);
      camera.lookAt(stage.player2.model.position.x,stage.player2.model.position.y,stage.player2.model.position.z);
    }
  }

  lookDirection([1,0,0]);
  lookDirection([-1,0,0]);
  lookDirection([0,1,0]);
  lookDirection([0,-1,0]);

}



function doUpdates(){
  // updates all stage.stageBlocks

      stage.player1.update();
      stage.player1.animate();

      stage.player2.update();
      stage.player2.animate();

    stage.update();
}


function initGame() {

  // document.onload = onMouseMove();
  createCameraRender();
  stats.begin();

  controls = new THREE.OrbitControls(camera, renderer.domElement );
  THREEx.FullScreen.bindKey({ charCode : 'l'.charCodeAt(0) });

  // How far you can orbit vertically, upper and lower limits.
    // Range is 0 to Math.PI radians.
    controls.minPolarAngle = 0; // radians
    controls.maxPolarAngle = Math.PI/4; // radians

    // How far you can orbit horizontally, upper and lower limits.
    // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
    controls.minAzimuthAngle = 0; // radians
    controls.maxAzimuthAngle = 0; // radians

    controls.minDistance = 150;
    controls.maxDistance = 200;

    controls.enabled = false;
    controls.autoRotateSpeed = 3;

  document.onkeydown = handleMapKeyDown;
  document.onkeyup = handleMapKeyUp;
  buildStageSelect();
  stageSelectLoop();
  stats.end();
  //make a camera and renderer
  // createCameraRender();
  //selected a stage!!
  // initializeWorld();

}



//creates the stage and calls the main loop
function initializeWorld(){
    contols = undefined;
    stage = selectedStage.stageData;
    selectedStageDat = stage;
    //omegaOn = selectedStage.omega;
    //isDay = selectedStage.daytime;
    stage.init();
    console.log(stage);

    camera.lookAt(stage.stageBlocks[0].model.position.x,stage.stageBlocks[0].model.position.y+10,stage.stageBlocks[0].model.position.z);

    //just if game starts use this
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    var listener = new THREE.AudioListener();
    var audio = new THREE.Audio( listener );

    //Music load
    console.log(stage.bgm);
    mediaElement = new Audio(stage.bgm);
    mediaElement.loop = true;

    loop();
}
