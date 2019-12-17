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

    console.log(player1Info);
    console.log(player2Info);

    noonLights(postGameScene);
    for(var i = 0; i < stage.players.length; i++){
        var playerStandMesh = createBasicBoxMesh(1+Math.random()*3);
        postGameScene.add(playerStandMesh);
        playerStandMesh.position.x = -15 + i*25;
        playerStandMesh.position.y = 0;
        playerStandMesh.position.z = 0;

        postGameScene.add(stage.players[i].model);
        stage.players[i].model.position.set(-15+i*25, 10, 0);

    }

    renderer.render(postGameScene, postGameCamera);

    postGameCamera.position.set(0,0,10);
    postGameCamera.lookAt(0,0,0);

    var container = document.getElementById("container");
    for(var i = 0; i < numPlayers; i++){
        var statsDiv = document.createElement("div");
        statsDiv.id = "p"+(i+1)+"Stats";
        var pMessage = "";
        // if(i == 0){
        //     for(var j = 0; j < )
        // }
        statsDiv.innerHTML = "Ready to Rumble! Press Space To Begin!"
        container.appendChild(statsDiv);
    }


    postGameLoop();

}

function playAgain(){
    //RESET ALL VARIABLES
    inPostGame = false;
    buildCharacterSelect();
}
