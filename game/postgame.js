var postGameScene;

function postGameLoop(){
    postGameCamera.position.set(0,15,45);
    postGameCamera.lookAt(0,0,0);

    if(inPostGame){
        requestAnimationFrame(postGameLoop);
        renderer.render(postGameScene, postGameCamera);
    }

}

function buildPostGame(){

    inPostGame = true;
    gameStarted = false;

    postGameScene = new THREE.Scene();

    player1Info.damageReceived = player2Info.damageDealt;
    player2Info.damageReceived = player1Info.damageDealt;

    var playerInfos = [player1Info, player2Info];
    console.log(player1Info);
    console.log(player2Info);

    noonLights(postGameScene);
    for(var i = 0; i < stage.players.length; i++){
        var playerStandMesh = createBasicBoxMesh(1+Math.random()*3);
        postGameScene.add(playerStandMesh);
        playerStandMesh.position.x = -25 + i*45;
        playerStandMesh.position.y = 0;
        playerStandMesh.position.z = 0;

        postGameScene.add(stage.players[i].model);
        stage.players[i].model.position.set(-25+i*45, 10, 0);

    }

    renderer.render(postGameScene, postGameCamera);

    postGameCamera.position.set(0,0,10);
    postGameCamera.lookAt(0,0,0);

    var container = document.getElementById("container");

    var statsCont = document.createElement("div");
    statsCont.id = "statsContainer";
    container.appendChild(statsCont);

    for(var i = 0; i < numPlayers; i++){
        var statsDiv = document.createElement("div");
        statsDiv.id = "p"+(i+1)+"Stats";
        var pMessage = "";
        // if(i == 0){
        //     for(var j = 0; j < )
        // }
        statsDiv.innerHTML = "<br style = 'position:relative;left:40%;font-size:1.0em;'>Stats:"
        +"<br style = 'font-size:1.0em;'>Damage Dealt: "+playerInfos[i].damageDealt+" %"
        +"<br style = 'font-size:1.0em;'>Damage Recieved: "+playerInfos[i].damageReceived+" %"
        +"<br style = 'font-size:1.0em;'>Total Attacks: "+playerInfos[i].totalAttacksCast+""
        +"<br style = 'font-size:1.0em;'>Total Attacks Hit: "+playerInfos[i].totalAttacksHit+""
        +"<br style = 'font-size:1.0em;'>Hit Percentage: "+Math.round(100*(playerInfos[i].totalAttacksHit/playerInfos[i].totalAttacksCast))+" %"
        statsCont.appendChild(statsDiv);
    }

    var lockInDiv = document.createElement("div");
    lockInDiv.id = "lockInReady";
    lockInDiv.innerHTML = "Press Space to Play Again!"
    lockInDiv.style.width = "25%";
    lockInDiv.style.left = "35%";
    container.appendChild(lockInDiv);

    var charSelBan = document.createElement("div");
    charSelBan.id = "characterSelectBanner";
    charSelBan.innerHTML = "Game! Duration: "+stage.timer;
    container.appendChild(charSelBan)


    postGameLoop();

}

function playAgain(){
    //RESET ALL VARIABLES

    boxVar = document.getElementById("lockInReady");
    if(boxVar != undefined){
        boxVar.parentNode.removeChild(boxVar);
    }

    boxVar = document.getElementById("characterSelectBanner");
    if(boxVar != undefined){
        boxVar.parentNode.removeChild(boxVar);
    }

    for(var i = 0; i < numPlayers; i++){
        boxVar = document.getElementById("p"+(i+1)+"Stats");
        if(boxVar != undefined){
            boxVar.parentNode.removeChild(boxVar);
        }
    }
    inPostGame = false;
    buildCharacterSelect();
}
