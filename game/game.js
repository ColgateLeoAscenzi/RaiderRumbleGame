axis2//COLORS
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
var titleClicked = false;
var selectingTitle = true;


//mode boolean
var inModeSelect = false;
var modeSelected = false;
var SELECTEDMODE;

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
var gameStarted = false;

//postgame boolean
var inPostGame = false;
var gameOver = false;
var roundOver = false;

var player1Info = {
    damageDealt: 0,
    damageReceived: 0,
    inAirDuration: 0,
    totalAttacksCast: 0,
    totalAttacksHit: 0,
}
var player2Info = {
    damageDealt: 0,
    damageReceived: 0,
    inAirDuration: 0,
    totalAttacksCast: 0,
    totalAttacksHit: 0,
}



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
      if(stage.snowing){
          rotateSnow();
      }
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

      roundOver = false;
      gameOver = false;
      inGame = false;
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

var controllersConnected = false;


function doUpdates(){
    if(controllersConnected){
        updateInputsPlayer1();
        updateInputsPlayer2();
    }


      stage.player1.update();
      stage.player1.animate();

      stage.player2.update();
      stage.player2.animate();

    stage.update();

}
let interval;

function initGame() {

  THREEx.FullScreen.bindKey({ charCode : 'l'.charCodeAt(0) });
  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;

  setUpGamePads();


  buildTitleScreen();

}

var p1GamePadR = [false, false, false, false];
var p1GamePadL = [false, false, false, false];
var p1Control = [0,0,0,0];

var p2GamePadR = [false, false, false, false];
var p2GamePadL = [false, false, false, false];
var p2Control = [0,0,0,0];


//creates the stage and calls the main loop
function initializeWorld(){
    inGame = true;
    contols = undefined;

    player1Info = {
        damageDealt: 0,
        damageReceived: 0,
        inAirDuration: 0,
        totalAttacksCast: 0,
        totalAttacksHit: 0,
    }
    player2Info = {
        damageDealt: 0,
        damageReceived: 0,
        inAirDuration: 0,
        totalAttacksCast: 0,
        totalAttacksHit: 0,
    }


    if(!devMode){
        stage = selectedStage.stageData;
    }
    //omegaOn = selectedStage.omega;
    //isDay = selectedStage.daytime;
    stage.init();
    console.log(stage);

    camera.lookAt(stage.stageBlocks[0].model.position.x,stage.stageBlocks[0].model.position.y+10,stage.stageBlocks[0].model.position.z);

    //just if game starts use this


    var listener = new THREE.AudioListener();
    var audio = new THREE.Audio( listener );

    //Music load
    console.log(stage.bgm);
    mediaElement = new Audio(stage.bgm);
    mediaElement.loop = true;

    loop();
}

function setUpGamePads(){
    window.addEventListener("gamepadconnected", function(e) {
      controllersConnected = true;
      const gamepad = e.gamepad;
      console.log(`Gamepad connected at index ${gamepad.index}: ${gamepad.id}.
                  ${gamepad.buttons.length} buttons, ${gamepad.axes.length} axes.`);
    });

    if (!('ongamepadconnected' in window)) {
      // No gamepad events available, poll instead.
      interval = setInterval(pollGamepads, 10);
    }

}
var pressedButtons1 = [];
var axis1 = [];

var pressedButtons2 = [];
var axis2 = [];

var allAxis = [];

function pollGamepads() {
  // Grab a list of gamepads that are currently connected or a empty array
  const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
  pressedButtons = [];
  // Loop through all gamepads connect to the computer
  for(let g = 0; g < gamepads.length; g++) {
      if(g == 1){
          pressedButtons1 = [];
          axis1 = [];
      }
      if(g == 2){
          pressedButtons2 = [];
          axis2 = [];
      }
    const gp = gamepads[g];
    if(!!gp) {
      // Loop through all gamepad buttons pick out pressed ones
      for(let b = 0; b < gp.buttons.length; b++) {

        if(gp.buttons[b].pressed) {
            if(g == 0){
                pressedButtons1[b] = true;
            }
            if(g == 1){
                pressedButtons2[b] = true;
            }
        }
        else{
            if(g == 0){
                pressedButtons1[b] = false;
            }
            if(g == 1){
                pressedButtons2[b] = false;
            }
        }

      }

      for(let a = 0; a < gp.axes.length; a++){
          if(gp.axes[a]){
              if(g == 0){
                  axis1[a] = gp.axes[a];
              }
              if(g == 1){
                  axis2[a] = gp.axes[a];
              }
          }
      }

    }

  }


}

// updates all stage.stageBlocks
function updateInputsPlayer1(){

    if(inCharSelect){

    }

    if(stage.player1.canMove){
        if(pressedButtons1[0]){
          stage.player1.heldKeys.attack2 = true;
          stage.player1.doAnyAttack();
        }
        if(!pressedButtons1[0]){
          stage.player1.heldKeys.attack2 = false;
        }

        if(pressedButtons1[1]){
          stage.player1.heldKeys.attack1 = true;
          stage.player1.doAnyAttack();
        }
        if(!pressedButtons1[1]){
          stage.player1.heldKeys.attack1 = false;
        }

        if(pressedButtons1[2] || pressedButtons1[3]){
          stage.player1.heldKeys.up = true;
          stage.player1.jump();
        }
        if(!pressedButtons1[2]){
          stage.player1.heldKeys.up = false;
        }
        if(!pressedButtons1[3]){
          stage.player1.heldKeys.up = false;
        }

        if(axis1.length == 2){
            if(axis1[0] < -0.5){
                stage.player1.heldKeys.left = true;
                stage.player1.heldKeys.right = false;
                stage.player1.movingR = false;
            }
            else if(axis1[0] > 0.5){
                stage.player1.heldKeys.right = true;
                stage.player1.heldKeys.left = false;
                stage.player1.movingL = false;
            }

            if(axis1[1] > -0.8){
                stage.player1.heldKeys.down = true;
                stage.player1.heldKeys.up = false;
                stage.player1.jumping = false;
            }
            else if(axis1[1] < 0.8){
                stage.player1.heldKeys.up = true;
                stage.player1.heldKeys.down = false;
                if(stage.player1.heldKeys.up && stage.player1.heldKeys.attack2 && stage.player1.canRecover && !stage.player1.isRecover){
                  if(!stage.player1.sleeping){
                    stage.player1.recover();
                    stage.player1.canJump = false;
                  }
                }
                stage.player1.jump();
            }
        }
        else{
            stage.player1.heldKeys.left = false;
            stage.player1.heldKeys.down = false;
            stage.player1.heldKeys.right = false;
            stage.player1.heldKeys.up = false;
            stage.player1.movingL = false;
            stage.player1.movingR = false;
        }
        if(pressedButtons1[13]){
            stage.player1.heldKeys.down = true;
        }
        if(!pressedButtons1[13]){
            stage.player1.heldKeys.down = false;
        }

        // if(pressedButtons1[14]){
        //     stage.player1.heldKeys.left = true;
        // }
        // if(!pressedButtons1[14]){
        //     stage.player1.heldKeys.left = false;
        //     stage.player1.movingL = false;
        // }

        // if(pressedButtons1[15]){
        //     stage.player1.heldKeys.right = true;
        // }
        // if(!pressedButtons1[15]){
        //     stage.player1.heldKeys.right = false;
        //     stage.player1.movingR = false;
        // }

        if(pressedButtons1[12]){
            stage.player1.heldKeys.up = true;
            stage.player1.jump();
        }
        if(!pressedButtons1[12]){
            stage.player1.heldKeys.up = false;
        }

    }

}

function updateInputsPlayer2(){
    if(stage.player2.canMove){
        if(pressedButtons2[0]){
          stage.player2.heldKeys.attack2 = true;
          stage.player2.doAnyAttack();
        }
        if(!pressedButtons2[0]){
          stage.player2.heldKeys.attack2 = false;
        }

        if(pressedButtons2[1]){
          stage.player2.heldKeys.attack1 = true;
          stage.player2.doAnyAttack();
        }
        if(!pressedButtons2[1]){
          stage.player2.heldKeys.attack1 = false;
        }

        if(pressedButtons2[2] || pressedButtons2[3]){
          stage.player2.heldKeys.up = true;
          stage.player2.jump();
        }
        if(!pressedButtons2[2]){
          stage.player2.heldKeys.up = false;
        }
        if(!pressedButtons2[3]){
          stage.player2.heldKeys.up = false;
        }

        if(axis2.length == 2){
            if(axis2[0] < -0.5){
                stage.player2.heldKeys.left = true;
                stage.player2.heldKeys.right = false;
                stage.player2.movingR = false;
            }
            else if(axis2[0] > 0.5){
                stage.player2.heldKeys.right = true;
                stage.player2.heldKeys.left = false;
                stage.player2.movingL = false;
            }

            if(axis2[1] > -0.8){
                stage.player2.heldKeys.down = true;
                stage.player2.heldKeys.up = false;
                stage.player2.jumping = false;
            }
            else if(axis2[1] < 0.8){
                stage.player2.heldKeys.up = true;
                stage.player2.heldKeys.down = false;
                if(stage.player2.heldKeys.up && stage.player2.heldKeys.attack2 && stage.player2.canRecover && !stage.player2.isRecover){
                  if(!stage.player2.sleeping){
                    stage.player2.recover();
                    stage.player2.canJump = false;
                  }
                }
                stage.player2.jump();
            }
        }
        else{
            stage.player2.heldKeys.left = false;
            stage.player2.heldKeys.down = false;
            stage.player2.heldKeys.right = false;
            stage.player2.heldKeys.up = false;
            stage.player2.movingL = false;
            stage.player2.movingR = false;
        }
        if(pressedButtons2[13]){
            stage.player2.heldKeys.down = true;
        }
        if(!pressedButtons2[13]){
            stage.player2.heldKeys.down = false;
        }

        // if(pressedButtons2[14]){
        //     stage.player2.heldKeys.left = true;
        // }
        // if(!pressedButtons2[14]){
        //     stage.player2.heldKeys.left = false;
        //     stage.player2.movingL = false;
        // }

        // if(pressedButtons2[15]){
        //     stage.player2.heldKeys.right = true;
        // }
        // if(!pressedButtons2[15]){
        //     stage.player2.heldKeys.right = false;
        //     stage.player2.movingR = false;
        // }

        if(pressedButtons2[12]){
            stage.player2.heldKeys.up = true;
            stage.player2.jump();
        }
        if(!pressedButtons2[12]){
            stage.player2.heldKeys.up = false;
        }
    }



}
