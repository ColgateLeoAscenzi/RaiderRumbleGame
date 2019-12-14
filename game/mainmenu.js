function titleScreenLoop(){
    if(!titleClicked){
      requestAnimationFrame(titleScreenLoop);
    }
    else{
        var boxVar = document.getElementById("mainMenuContainer");
        boxVar.parentNode.removeChild(boxVar);
        titleScene.dispose();
        buildModeSelect();
    }

      renderer.render(titleScene, camera);
}

function buildTitleScreen(){
    titleScene = new THREE.Scene();

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
       +"<div style='color:white; position:relative; bottom: -10%; left: 3%; font-size:50px'> Press any button to start!</div>"
       +"<div style='color:white; position:relative; bottom: -50%; left:0%;font-size:20px'> Presented by Merge Conflicts Studios</div>"
     +"</div>"
    container.appendChild(mainMenuCont);


  titleScreenLoop();
}
