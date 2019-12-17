var stageA = {
    init: function(){
        var keys = Object.keys(stageProto);
        for(var i = 0; i < keys.length; i++){
            this[keys[i]] = charProto[keys[i]];
        }

        //THESE VARIABLES NEED TO BE INIT FIRST FOR SOME REASON/
        //I THINK IT'S CAUSE OF WEBPAGE LOAD TIME
        this.bgm = './sounds/My happy song Nicholas w lott.mp3';
        this.skyBoxURL = './images/Persson_sunset.png'

        this.omega = omegaOn;
        this.blockA = basicBox1;
        this.blockB = dirtBlock1;
        this.blockC = platformBlock;
        this.blockD = grassBox;
        this.blockE = grassBoxB;

        this.night = false;
        this.snowing = false;


        this.stageBlocks = [];
        this.blockAMeshes = [];
        this.stageHitBoxes = [];
        this.players = [],
        this.timer =  0,
        this.timerLast = 0,
        this.timerIncrement = 0,
        this.maxTim = 120,

        this.minimumY = -80,
        this.maximumY = 280,
        this.minimumX = -300,
        this.maximumX = 300,
        this.player1SpawnX = -10;
        this.player1SpawnY = 10;
        this.player1SpawnZ = 0;
        this.player2SpawnX = 10;
        this.player2SpawnY = 10;
        this.player2SpawnZ = 0;
        this.createScene();
        if(omegaOn){
            this.populateOmega();
        }
        else{
            this.populateScene();
        }
        this.player1 = selectedPlayer1;
        this.player1.init();
        this.player1.isPlayer1 = true;
        this.player1.setSpawn();
        this.player2 = selectedPlayer2;
        this.player2.init();
        this.player2.setSpawn();
        this.player2.isPlayer1 = false;
        createPlayer1(this.player1SpawnX, this.player1SpawnY, this.player1SpawnZ, this);
        createPlayer2(this.player2SpawnX, this.player2SpawnX, this.player2SpawnZ, this);


        this.player1.otherPlayer = this.player2;
        this.player2.otherPlayer = this.player1;
        this.player1.hitbbox = new THREE.Box3().setFromObject(this.player1.hitBox);
        this.player2.hitbbox = new THREE.Box3().setFromObject(this.player2.hitBox);

        this.createSpotLights();

        this.startTimer();
        // createFollowSpotlights();
        //I THINK IT'S CAUSE OF WEBPAGE LOAD TIME
    },
    createScene: function(){
        this.scene = new THREE.Scene();

        //cindy model testing white light
        // var newLight = new THREE.PointLight(0xffffff,1);
        // newLight.position.set(0,50,50);
        // this.scene.add(newLight);

        if(isDay){
            var r = Math.random();
            if(r < 0.8){
                noonLights(this.scene);
            }
            else{
                sunsetLights(this.scene, this.skyBoxURL);
            }
          $(document.getElementById("theBody")).css("color","black");
        }
        else{
          nightLights(this.scene);
          $(document.getElementById("theBody")).css("color","white");
        }
        //sunsetLights(this.scene);

        // noonLights(this.scene);
        // generateSnow();
        //nightLights(this.scene);

    },
    populateScene: function(){
        //replace the block with blockA
        for(var i = -10; i < 11; i++){
            if(i == -10 || i == 10){
                createBox(i*this.blockA.width,this.blockA.height, 0, this.blockA, this);
                createBox(i*this.blockA.width, this.blockA.height*2, 0, this.blockA, this);
            }
            if(i == -4 || i == -3 || i == -2 || i == 2 || i == 3 || i == 4){
                createBox(i*this.blockC.width, this.blockC.height*8, 0, this.blockC, this);
            }
            createBox(i*this.blockA.width, 0, 0, stage.blockA, this);
        }
        //createBox(0, 50, 0, stage.blockE);
    },
    populateOmega: function(){
        //create floor out of block a
        for(var i = -10; i < 11; i++){
          if(i == -10 || i == 10){
              createBox(i*this.blockC.width,-this.blockA.height/4, 0, this.blockC, this);
              createBox(i*this.blockC.width, this.blockA.height/4, 0, this.blockC, this);
          }
          else{
            var decide = Math.random();
            if(decide < 0.25){
              this.blockA = basicBox1;
            }
            else if(decide < 0.50){
              this.blockA = basicBox2;
            }
            else if(decide < 0.75){
              this.blockA = basicBox3;
            }
            else{
              this.blockA = basicBox4;
            }
            createBox(i*this.blockA.width, 0, 0, this.blockA, this);
          }
        }
        //create underside out of block b
        for(var j = 1; j< 5; j++ ){
            for(var i = -10+j; i < 11-j; i++){
                var decide = Math.random();
                if(decide < 0.25){
                  this.blockB = dirtBlock1;
                }
                else if(decide < 0.50){
                  this.blockB = dirtBlock2;
                }
                else if(decide < 0.75){
                  this.blockB = dirtBlock3;
                }
                else{
                  this.blockB = dirtBlock4;
                }
                createBox(i*this.blockB.width, -j*this.blockB.height, 0, this.blockB, this);
            }
        }
        for(var i = -10+j; i < 11-j; i++){
            if(i == -4 || i == -3 || i == -2 || i == 2 || i == 3 || i == 4){
                createBox(i*this.blockA.width, this.blockA.height*4, 0, this.blockC, this);
            }
        }
        //create platforms out of block C
    },
    update: function(){
      //console.log(this.player1Spot);
        if(countDown){
            document.getElementById("timerBox").innerHTML = "Time: " +((this.maxTime)-Math.floor(this.timer/60));
            this.timer+= this.timerIncrement;
            if((this.maxTime)-Math.floor(this.timer/60) == 0){
                document.getElementById("timerBox").innerHTML = "GO!";
                this.player1.canMove = true;
                this.player2.canMove = true;
                this.maxTime = 120;
                this.timer = 0;
                gameStarted = true;
                countDown = false;
            }
        }

        if(!roundOver && gameStarted){

            this.timer+= this.timerIncrement;
            document.getElementById("timerBox").innerHTML = "Time: " +((this.maxTime)-Math.floor(this.timer/60));

            for(var i = 0; i < this.stageBlocks.length; i++){
                this.stageBlocks[i].update();
            }
            //rotateSnow();
            if(this.maxTime - Math.floor(this.timer/60) == 0){
                roundOver = true;
                roundOver = true;
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
              stage.players[i].isHit = false;
            }
        }

        var stockString1 = ""
        for(var i = 0; i < this.player1.stock; i++){
          stockString1+="<i class='fas fa-heart' style='color:violet'></i> "
        }
        var stockString2 = ""
        for(var i = 0; i < this.player2.stock; i++){
          stockString2+="<i class='fas fa-heart' style='color:violet'></i> "
        }

        for(var i = 0; i < this.players.length; i++){
          if(this.players[i].percentage < 40){
            if(isDay){
              color = "black:"
            }
            else{
              color = "white";
            }
          }
          else if(this.players[i].percentage < 60){
            color = "yellow";
          }
          else if(this.players[i].percentage < 80){
            color = "orange";
          }
          else{
            color = "red"
          }


          if(i == 0){
            player1Box.innerHTML = "<div id = 'player1Name'>"+this.player1.name+ "</div>" + "<div id = 'player1Stock'"+
                                      stockString1+"</div>" + "<div id ='player1Percent' style = 'color: "+color+";'>"+this.player1.percentage +"%</div>";
          }
          else{
            player2Box.innerHTML = "<div id = 'player2Name'>"+this.player2.name+ "</div>" + "<div id = 'player2Stock'"+
                                      stockString2+"</div>" + "<div id ='player2Percent' style = 'color: "+color+";'>"+this.player2.percentage +"%</div>";
          }

        }



        if(this.player1.stock == 0 || this.player2.stock == 0){
            roundOver = true;
            roundOver = true;
        }

        if(roundOver){
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
        this.timer = 0;
        this.timerIncrement = 1;
        var container = document.getElementById("container");
        var timerBox = document.createElement("div");
        timerBox.id = "timerBox";
        timerBox.innerHTML = "Time: " +((this.maxTime)- Math.floor(this.timer/60));
        container.appendChild(timerBox);
        countDown = true;
        this.maxTime = 3;

        var player1Box = document.createElement("div");
        player1Box.id = "player1Box";
        player1Box.innerHTML = "Stock: "+this.player1.stock+ "<br>Percent: "+this.player1.percentage;
        container.appendChild(player1Box);

        var player2Box = document.createElement("div");
        player2Box.id = "player2Box";
        player2Box.innerHTML = "Stock: "+this.player2.stock+"<br>Percent: "+this.player2.percentage;
        container.appendChild(player2Box);

    },
    createSpotLights: function(){
      if (this.night) createFollowSpotlights();
    }
}
