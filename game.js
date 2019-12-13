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

var omegaOn;

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
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}






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
  // console.log(window.innerWidth, window.innerHeight);
  // var check = false;
  // (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  // if(check){
  //     console.log("mobile detected");
  //     mobileMode = true;
  //     var container = document.getElementById("container");
  //     var leftButton = document.createElement("div");
  //     leftButton.id = "leftButton";
  //     container.appendChild(leftButton);
  //
  //     var rightButton = document.createElement("div");
  //     rightButton.id = "rightButton";
  //     container.appendChild(rightButton);
  //
  //     var topButton = document.createElement("div");
  //     topButton.id = "topButton";
  //     container.appendChild(topButton);
  // }


  // if(mobileMode){
  //     document.ontouchstart = handleTapDown;
  //     document.ontouchend = handleTapUp;
  // }


  // document.onload = onMouseMove();
  createCameraRender();
  stats.begin();

  controls = new THREE.OrbitControls(camera, renderer.domElement );
  THREEx.FullScreen.bindKey({ charCode : 'l'.charCodeAt(0) });

  buildStageSelect();
  stageSelectLoop();
  stats.end();
  //make a camera and renderer
  // createCameraRender();
  //selected a stage!!
  // initializeWorld();

}

//continues to display the stage select until stage selected is true, then renders that
function stageSelectLoop(){

    if(!stageSelected){
      requestAnimationFrame(stageSelectLoop);
    }
    else{
      initializeWorld();
    }

  controls.update();

  renderer.render(mapScene, camera);

  raycaster.setFromCamera( mouse, camera );

// calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects(selectableStages);

  if ( intersects.length > 0 ) {
      if ( HIGHLITED != intersects[ 0 ].object ) {
          if ( HIGHLITED ) HIGHLITED.material.emissive.setHex( HIGHLITED.currentHex );
          HIGHLITED = intersects[ 0 ].object;
          HIGHLITED.currentHex = HIGHLITED.material.emissive.getHex();
          HIGHLITED.material.emissive.setHex( 0xff0000 );
      }
  } else {
      if ( HIGHLITED ) HIGHLITED.material.emissive.setHex( HIGHLITED.currentHex );
      HIGHLITED = null;
  }

}

//creates the stage and calls the main loop
function initializeWorld(){
    contols = undefined;
    stage = selectedStage.stageData;
    selectedStageDat = stage;
    omegaOn = selectedStage.omega;
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
