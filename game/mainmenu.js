var devParameters;
var params;

function titleScreenLoop(){

    if(!titleClicked){
      requestAnimationFrame(titleScreenLoop);
    }
    else{
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
    mainMenuCont.innerHTML = "<div id='raider-rumble'>"
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
     +"<div style='background-color:black; display:block; height: 20%; width: 1000%; position:absolute; bottom:0%;'>"
       +"<div id='start' style='color:white; position:relative; bottom: -10%; left: 3%; font-size:50px'> Press any button to start!</div>"
       +"<div style='color:white; position:relative; bottom: -50%; left:0%;font-size:20px'> Presented by Merge Conflict Studios</div>"
     +"</div>"
    container.appendChild(mainMenuCont);

    document.onkeydown = handleTitleKeyDown;
  titleScreenLoop();
}

function handleTitleKeyDown(keyEvent){
    if(keyEvent.key != "." && !devMode){
        titleClicked= true;
    }
    else{
        if(!devMode){
            params = new devParameters();
            const datGui  = new dat.GUI({ autoPlace: true });
            datGui.domElement.id = 'gui'
            folder = datGui.addFolder(`Quick Select`);

            folder.add(params,"selectedPlayer1");
            folder.add(params,"selectedPlayer2");
            folder.add(params,"isDay");
            folder.add(params,"omegaOn");
            folder.add(params,"stage");
            folder.add(params,"submit");
            devMode = true;
        }
        // else{
        //     devMode = false;
        //     params = undefined;
        //     var boxVar = document.getElementById("gui");
        //     boxVar.parentNode.removeChild(boxVar);
        // }

    }
}

function setDevParams(){
    selectedPlayer1 = eval(params.selectedPlayer1);
    selectedPlayer2 = eval(params.selectedPlayer2);
    console.log(selectedPlayer2);
    isDay = params.isDay;
    omegaOn = params.omegaOn;
    selectedStageDat = eval(params.stage);
    stage = eval(params.stage);
    console.log(stage);

    titleClicked = true;
}
