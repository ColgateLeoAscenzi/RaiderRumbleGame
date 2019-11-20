var stageA = {
    init: function(){
        var keys = Object.keys(stageProto);
        for(var i = 0; i < keys.length; i++){
            this[keys[i]] = charProto[keys[i]];
        }

        //THESE VARIABLES NEED TO BE INIT FIRST FOR SOME REASON/
        //I THINK IT'S CAUSE OF WEBPAGE LOAD TIME
        this.blockA = basicBox;
        this.stageBlocks = [];
        this.blockAMeshes = [];
        this.stageHitBoxes = [];
        this.players = [],
        this.timer =  0,
        this.timerIncrement = 0,
        this.maxTim = 120,
        this.createScene();
        this.populateScene();
        this.player1 = basicCharacter;
        this.player1.init();
        this.player2 = pingu;
        this.player2.init();
        createPlayer1(0, 10, 0);
        createPlayer2(0, 10, 0);
        this.player1.otherPlayer = this.player2;
        this.player2.otherPlayer = this.player1;
        this.startTimer();
        //I THINK IT'S CAUSE OF WEBPAGE LOAD TIME
    },
    createScene: function(){
        this.scene = new THREE.Scene();

        sunsetLights(this.scene);
        //noonLights(this.scene);


    },
    populateScene: function(){
        //replace the block with blockA
        for(var i = -10; i < 11; i++){
            if(i == -10 || i == 10){
                createBoxA(i*this.blockA.width,this.blockA.height, 0);
                createBoxA(i*this.blockA.width, this.blockA.height*2, 0);
            }
            if(i == -4 || i == -3 || i == -2 || i == 2 || i == 3 || i == 4){
                createBoxA(i*this.blockA.width, this.blockA.height*4, 0);
            }
            createBoxA(i*this.blockA.width, 0, 0);
        }
    },
    update: function(){
        if(countDown){
            document.getElementById("timerBox").innerHTML = "Time: " +((this.maxTime)-Math.floor(this.timer/75));
            this.timer+= this.timerIncrement;
            if((this.maxTime)-Math.floor(this.timer/75) == 0){
                document.getElementById("timerBox").innerHTML = "GO!";
                this.player1.canMove = true;
                this.player2.canMove = true;
                this.maxTime = 120;
                this.timer = 0;
                gameStarted = true;
                countDown = false;
            }
        }
        if(!gameOver && gameStarted){
            this.timer+= this.timerIncrement;
            document.getElementById("timerBox").innerHTML = "Time: " +((this.maxTime)-Math.floor(this.timer/75));

            for(var i = 0; i < this.stageBlocks.length; i++){
                this.stageBlocks[i].update();
            }
            if(this.maxTime - Math.floor(this.timer/75) == 0){
                gameOver = true;
            }
        }
        //Player x and y checks

        for(let i =0; i<stage.players.length; i++){
            if(stage.players[i].y >= stage.maximumY || stage.players[i].y <= stage.minimumY ||
              stage.players[i].x >= stage.maximumX || stage.players[i].x <= stage.minimumX){

              stage.players[i].y = 10;
              stage.players[i].x = 0;
              stage.players[i].xVel = 0;
              stage.players[i].yVel = 0;
              stage.players[i].stock -=1;
              stage.players[i].percentage = 0;
            }
        }



        player1Box.innerHTML = "Stock: "+this.player1.stock+"<br>Percent: "+this.player1.percentage;
        player2Box.innerHTML = "Stock: "+this.player2.stock+"<br>Percent: "+this.player2.percentage;

        if(this.player1.stock == 0 || this.player2.stock == 0){
            gameOver = true;
        }

        if(gameOver){
            this.player1.canMove = false;
            this.player2.canMove = false;
            if(this.player1.stock > this.player2.stock){
                document.getElementById("timerBox").innerHTML = "GAME!<br>Player 1 Wins!";
                winner = 1;
            }
            else if(this.player2.stock > this.player1.stock){
                document.getElementById("timerBox").innerHTML = "GAME!<br>Player 2 Wins!";
                winner = 2;
            }
            else{
                document.getElementById("timerBox").innerHTML = "GAME!<br>It's a tie!";
            }
        }



    },
    startTimer: function(){
        this.timerIncrement = 1;
        var container = document.getElementById("container");
        var timerBox = document.createElement("div");
        timerBox.id = "timerBox";
        timerBox.innerHTML = "Time: " +((this.maxTime)- Math.floor(this.timer/75));
        container.appendChild(timerBox);
        countDown = true;
        this.maxTime = 3;

        var player1Box = document.createElement("div");
        player1Box.id = "player1Box";
        player1Box.innerHTML = "Stock: "+this.player1.stock+"<br>Percent: "+this.player1.percentage;
        container.appendChild(player1Box);

        var player2Box = document.createElement("div");
        player2Box.id = "player2Box";
        player2Box.innerHTML = "Stock: "+this.player2.stock+"<br>Percent: "+this.player2.percentage;
        container.appendChild(player2Box);

    }
}



function createBoxA(x, y, z) {

    stageA.basicBoxAMesh = basicBox.model.clone();
    stageA.basicBoxAMesh.material = new THREE.MeshPhongMaterial({ color : Colors.white});
    stageA.basicBoxAMesh.position.set(x, y, z);
    stageA.scene.add(stageA.basicBoxAMesh);
    stageA.stageBlocks.push(stageA.blockA);
    stageA.blockAMeshes.push(stageA.basicBoxAMesh);

    stageA.basicHitBoxAMesh = basicBox.hitBox.clone();

    stageA.basicHitBoxAMesh.position.set(x, y, z);

    stageA.stageHitBoxes.push(stageA.basicHitBoxAMesh);

}

function createPlayer1(x, y, z){
  stageA.players.push(stageA.player1);
  stageA.player1Mesh = stageA.player1.model;
  // player1Mesh.position.set(x, y, z);
  stageA.player1HitBoxMesh = stageA.player1.hitBox;
  stageA.player1HitBoxMesh.position.set(x, y, z)
  stageA.stageHitBoxes.push(stageA.player1HitBoxMesh);

  stageA.scene.add(stageA.player1Mesh);
}

function createPlayer2(x, y, z){
  stageA.players.push(stageA.player2);
  stageA.player2Mesh = stageA.player2.model;
  // player1Mesh.position.set(x, y, z);
  stageA.player2HitBoxMesh = stageA.player2.hitBox;
  stageA.player2HitBoxMesh.position.set(x, y, z)
  stageA.stageHitBoxes.push(stageA.player2HitBoxMesh);

  stageA.scene.add(stageA.player2Mesh);
}
