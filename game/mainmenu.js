var devParameters;
var params;

function titleScreenLoop(){

    if(!titleClicked){
      requestAnimationFrame(titleScreenLoop);
    }
    else{
        inMainMenu = false;
        devParameters = undefined;
        params = undefined;
        selectingTitle = false;

        var boxVar = document.getElementById("mainMenuContainer");
        boxVar.parentNode.removeChild(boxVar);
        if(!devMode){
            buildModeSelect();
        }
        else{
            var boxVar = document.getElementById("gui");
            boxVar.parentNode.removeChild(boxVar);

            var container = document.getElementById("container");
            var webglwindow = document.createElement("div");
            webglwindow.id = "glcanvas";
            container.appendChild(webglwindow);
            createCameraRender();
            initializeWorld();
        }
    }

}

function buildTitleScreen(){
    inMainMenu = true;
    devParameters = function(){
        this.selectedPlayer1 = "pingu";
        this.selectedPlayer2 = "raider";
        this.isDay = true;
        this.omegaOn = true;
        this.selectedStageDat = "stageA";
        this.stage = "stageA";
        this.submit = function(){setDevParams()};
    }


    var container = document.getElementById("container");
    var mainMenuCont = document.createElement("div");
    mainMenuCont.id = "mainMenuContainer";
    mainMenuCont.innerHTML = "<div id='raider-rumble' style = 'overflow:hidden'>"
     +"<div style='position:relative; top:12%; left:10%; font-size:300px; color:#821019; display:inline;'> R </div>"
     +"<div style='position:relative; top:12%; left:10%; font-size:300px; color:#821019;display:inline;'> A </div>"
     +"<div style='position:relative; top:12%; left:10%; font-size:300px; color:#821019;display:inline;'> I </div>"
     +"<div style='position:relative; top:12%; left:10%; font-size:300px; color:#821019;display:inline;'> D </div>"
     +"<div style='position:relative; top:12%; left:10%; font-size:300px; color:#821019;display:inline;'> E </div>"
     +"<div style='position:relative; top:12%; left:10%; font-size:300px; color:#821019;display:inline;'> R </div>"
     +"<br/>"
     +"<div style='position:relative; top:0%; left:10%; font-size:300px; color:white;display:inline;'> R </div>"
     +"<div style='position:relative; top:15%; left:10%; font-size:300px; color:white;display:inline;'> U </div>"
     +"<div style='position:relative; top:15%; left:10%; font-size:300px; color:white;display:inline;'> M </div>"
     +"<div style='position:relative; top:15%; left:10%; font-size:300px; color:white;display:inline;'> B </div>"
     +"<div style='position:relative; top:15%; left:10%; font-size:300px; color:white;display:inline;'> L </div>"
     +"<div style='position:relative; top:15%; left:10%; font-size:300px; color:white;display:inline;'> E </div>"
     +"</div>"
     +"<div style='background-color:black; display:block; height: 20%; width: 100%; position:absolute; bottom:0%;'>"
       +"<div id='start' style='color:white; position:relative; bottom: -10%; left: 30%; font-size:50px; width:50%'> Press any button to start!</div>"
       +"<div style='color:white; position:relative; bottom: -50%; left:0%;font-size:20px'> Presented by Merge Conflict Studios</div>"
     +"</div>"
    container.appendChild(mainMenuCont);

  titleScreenLoop();
}

function setDevParams(){
    selectedPlayer1 = eval(params.selectedPlayer1);
    selectedPlayer2 = eval(params.selectedPlayer2);
    isDay = params.isDay;
    omegaOn = params.omegaOn;
    selectedStageDat = eval(params.stage);
    stage = eval(params.stage);

    titleClicked = true;
}
