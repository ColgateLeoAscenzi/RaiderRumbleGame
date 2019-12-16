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
var characterSelectCamera;

var numPlayers = 2;
var omegaOn = false;
var isDay = true;

var mediaElement;
var playingM = false;
var hitBoxesOn = false;
var trackPlayer = false;
var mobileMode = false;
var drawRays = false;
var devMode = false;
var statsOn;
var stats;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var controls;




var modes = ["normal", "options"];
var modeBlocks = [];


//menu boolean
var inMainMenu = false;
var selectingTitle = true;
var titleClicked = false;


//mode boolean
var inModeSelect = false;
var modeSelected = false;

//character boolean
var inCharSelect = false;
var p1InPosition = false
var p2InPosition = false;
var charactersSelected = false;
var selectedPlayer1, selectedPlayer2;
var p1SelectorMesh, p2SelectorMesh;
var characterSelectScene;

//stage boolean
var inStageSelect = false;
var stageSelected = false;
var HIGHLITED;
var selectableStages = [];
var selectedStage;
var stage;
var mapScene;
var currentLights = [];
var currentSpotLight = undefined;

//game booleans
var inGame = false;
var countDown = false;
var winner = -1;

//postgame boolean
var inPostGame = false;
var gameOver = false;
var roundOver = false;




//SCREEN & MOUSE VARIABLES

var HEIGHT, WIDTH

//INIT THREE JS, SCREEN AND MOUSE EVENTS

function createCameraRender() {

  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

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

  modeSelectCamera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );

  characterSelectCamera = new THREE.PerspectiveCamera(
      25,
      aspectRatio,
      nearPlane,
      farPlane
    );

    postGameCamera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
    );



  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  container = document.getElementById('glcanvas');
  container.appendChild(renderer.domElement);


  window.addEventListener('resize', handleWindowResize, false);
  window.addEventListener('mousemove', onMouseMove, false);
  window.addEventListener('mousedown', onMouseDown, false);


}

// HANDLE SCREEN EVENTS

function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();

  stageSelectCamera.aspect = WIDTH / HEIGHT;
  stageSelectCamera.updateProjectionMatrix();

  characterSelectCamera.aspect = WIDTH / HEIGHT;
  characterSelectCamera.updateProjectionMatrix();


  postGameCamera.aspect = WIDTH / HEIGHT;
  postGameCamera.updateProjectionMatrix();

}


//THIS IS THE GAME LOOP
function loop() {
  doUpdates();
  renderer.render(stage.scene, camera);
  // console.log(renderer.info);
  if(statsOn){
      stats.update();
  }

  if(!roundOver){
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



      lookDirection([1,0,0]);
      lookDirection([-1,0,0]);
      lookDirection([0,1,0]);
      lookDirection([0,-1,0]);

  }
  else{

      var boxVar = document.getElementById("timerBox");
      boxVar.parentNode.removeChild(boxVar);

      boxVar = document.getElementById("player1Box");
      boxVar.parentNode.removeChild(boxVar);

      boxVar = document.getElementById("player2Box");
      boxVar.parentNode.removeChild(boxVar);

      buildPostGame();
  }


  // if(winner == -1){
  //   camera.position.set((stage.player1.model.position.x+stage.player2.model.position.x)/2,(stage.player1.model.position.y+stage.player2.model.position.y)/2+50,stage.player1.model.position.z+120);
  //   camera.lookAt((stage.player1.model.position.x+stage.player2.model.position.x)/2,(stage.player1.model.position.y+stage.player2.model.position.y)/2,stage.stageBlocks[0].model.position.z);
  // }
  // else if(winner == 1){
  //   camera.position.set(stage.player1.model.position.x,stage.player1.model.position.y+0,stage.player1.model.position.z+50);
  //   camera.lookAt(stage.player1.model.position.x,stage.player1.model.position.y,stage.player1.model.position.z);
  // }
  // else if(winner == 2){
  //   camera.position.set(stage.player2.model.position.x,stage.player2.model.position.y+0,stage.player2.model.position.z+50);
  //   camera.lookAt(stage.player2.model.position.x,stage.player2.model.position.y,stage.player2.model.position.z);
  // }


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

  THREEx.FullScreen.bindKey({ charCode : 'l'.charCodeAt(0) });
  buildTitleScreen();

}



//creates the stage and calls the main loop
function initializeWorld(){
    contols = undefined;
    if(!devMode){
        stage = selectedStage.stageData;
    }
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
