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

    postGameScene = new THREE.Scene();

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

    postGameLoop();

}

function playAgain(){
    //RESET ALL VARIABLES
    inPostGame = false;
    buildCharacterSelect();
}
