function modeSelectLoop(){
    if(!modeSelected){
      requestAnimationFrame(modeSelectLoop);
    }
    else{
        inModeSelect = false;
        
        var boxVar = document.getElementById("modeContainer");
        boxVar.parentNode.removeChild(boxVar);

        var container = document.getElementById("container");
        var webglwindow = document.createElement("div");
        webglwindow.id = "glcanvas";
        container.appendChild(webglwindow);

        createCameraRender();
        buildCharacterSelect();
    }

}

function buildModeSelect(){

    inModeSelect = true;

    var container = document.getElementById("container");
    var modeCont = document.createElement("div");
    modeCont.id = "modeContainer";
    modeCont.innerHTML = "<div id='options'>Options</div>"
    +"<div id='line'> </div>"
    +"<div id='play-game'>"
    +"<div id='play' style='bottom:35%; left:15%;'>Play</div>"
    +"<div id='game'style='bottom:20%; left:15%;'>Game</div>"
    +"<div>"

    document.body.style.overflow = "hidden";

    container.appendChild(modeCont);


    var playGame = document.getElementById("play-game");
    playGame.addEventListener('mousedown', startGame, false);


  modeSelectLoop();
}

function startGame(){
    modeSelected = true;
}
