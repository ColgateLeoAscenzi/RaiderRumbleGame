var stageC= {
    init: function(){
        var keys = Object.keys(stageProto);
        for(var i = 0; i < keys.length; i++){
            this[keys[i]] = charProto[keys[i]];
        }

        //THESE VARIABLES NEED TO BE INIT FIRST FOR SOME REASON/
        //I THINK IT'S CAUSE OF WEBPAGE LOAD TIME
        this.bgm = './sounds/My happy song Nicholas w lott.mp3';

        //this.skyBoxURL = './images/testbeach1.jpg'

        this.omega = omegaOn;
        this.blockA = iceBlock;
        this.blockB = waterBlock;
        this.blockC = woodBlock;

        this.snowing = true;

        this.stageBlocks = [];
        this.blockAMeshes = [];
        this.stageHitBoxes = [];
        this.players = [],
        this.timer =  0,
        this.timerIncrement = 0,
        this.maxTim = 180,

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
        //I THINK IT'S CAUSE OF WEBPAGE LOAD TIME
    },
    createScene: function(){
        this.scene = new THREE.Scene();

        if(isDay){
          noonLights(this.scene);
          $(document.getElementById("theBody")).css("color","black");

        }
        else{
          nightLights(this.scene);
          $(document.getElementById("theBody")).css("color","white");

        }

    },
    populateScene: function(){
        //replace the block with blockA
        console.log(this.blockA);
        for(var i = -10; i < 11; i++){
            createBox(i*this.blockA.width, 0, 0, this.blockA, this);
            createBox(i*this.blockA.width, 0, -1*this.blockA.width, this.blockA, this);
            createBox(i*this.blockA.width, 0, -2*this.blockA.width, this.blockA, this);
            createBox(i*this.blockA.width, 0, -3*this.blockA.width, this.blockA, this);
        }
        for(var i = -11; i > -40; i--) {
          createBox(i*this.blockA.width, -1*this.blockA.width, -1*this.blockA.width, this.blockA, this);
          createBox(-1*i*this.blockA.width, -1*this.blockA.width, -1*this.blockA.width, this.blockA, this);
        }

        //water
        createBox(0, -10.5*this.blockA.height, 0, this.blockB, this);

        //trees
        for (var x = -9; x < 10; x+=3) {
          for (var y= 1; y < 6; y++) {
              createBox(x*this.blockC.height, y*this.blockC.height, -2*this.blockC.width, this.blockC, this);
          }
        }

        generateSnow();
        //createBox(0, 50, 0, stage.blockE);
    },
    populateOmega: function(){
        //create floor out of block a

       // createBox(0, 0, 0, this.blockB, this);

        for(var i = -10; i < 11; i++){
            createBox(i*this.blockA.width, 0, 0, this.blockA, this);
            createBox(i*this.blockA.width, 0, -2*this.blockA.width, this.blockA, this);
        }

        for (var i = -40; i < 40; i++) {
          createBox(x*this.blockA.width, -1*this.blockA.width, -1*this.blockA.width, this.blockA, this);
        }


        //create underside out of block b
        for(var j = 1; j< 5; j++ ){
            for(var i = -10+j; i < 11-j; i++){
                var choice = Math.random();
                createBox(i*this.blockA.width, -j*this.blockA.height, 0, this.blockA, this);
            }
        }
        // for(var i = -10+j; i < 11-j; i++){
        //     if(i == -4 || i == -3 || i == -2 || i == 2 || i == 3 || i == 4){
        //
        //         createBox(i*this.blockA.width, this.blockA.height*4, 0, this.blockA, this);
        //
        //         createBox(i*this.blockA.width, this.blockA.height*7, -12, this.blockA, this);
        //     }
        // }

        //create surrounding water


        // for (var x= -10; x > -40; x--) {
        //   for (var y = 0; y > -2; y--) {
        //       createBox(x*this.blockB.width, y*this.blockB.height, 0, this.blockB, this);
        //       createBox(-x*this.blockB.width, y*this.blockB.height, 0, this.blockB, this);
        //   }
        // }
        //
        // for (var x= -9; x > -40; x--) {
        //       createBox(x*this.blockB.width, -2*this.blockB.height, 0, this.blockB, this);
        //       createBox(-x*this.blockB.width, -2*this.blockB.height, 0, this.blockB, this);
        // }
        //
        // for (var x= -8; x > -40; x--) {
        //       createBox(x*this.blockB.width, -3*this.blockB.height, 0, this.blockB, this);
        //       createBox(-x*this.blockB.width, -3*this.blockB.height, 0, this.blockB, this);
        // }
        //
        // for (var x= -7; x > -40; x--) {
        //       createBox(x*this.blockB.width, -4*this.blockB.height, 0, this.blockB, this);
        //       createBox(-x*this.blockB.width, -4*this.blockB.height, 0, this.blockB, this);
        // }
        //
        // for (var x= 0; x > -40; x--) {
        //   for (var y = -5; y > -15; y--) {
        //       createBox(x*this.blockB.width, y*this.blockB.height, 0, this.blockB, this);
        //       createBox(-x*this.blockB.width, y*this.blockB.height, 0, this.blockB, this);
        //   }
        // }



        //trees

        for (var x = -9; x < 10; x+=3) {
          for (var y= 1; y < 6; y++) {
              createBox(x*this.blockC.height, y*this.blockC.height, -2*this.blockC.width, this.blockC, this);
          }
        }



        generateSnow();
        //create platforms out of block C
    },
    update: function(){
        if(countDown){
            document.getElementById("timerBox").innerHTML = "Time: " +((this.maxTime)-Math.floor(this.timer/60));
            this.timer+= this.timerIncrement;
            if((this.maxTime)-Math.floor(this.timer/60) == 0){
                document.getElementById("timerBox").innerHTML = "GO!";
                this.player1.canMove = true;
                this.player2.canMove = true;
                this.maxTime = 180;
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
            if(this.maxTime - Math.floor(this.timer/60) == 0){
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
        this.timerIncrement = 1;
        this.timer = 0;
        var container = document.getElementById("container");
        var timerBox = document.createElement("div");
        timerBox.id = "timerBox";
        timerBox.innerHTML = "Time: " +((this.maxTime)- Math.floor(this.timer/60));
        container.appendChild(timerBox);
        countDown = true;
        this.maxTime = 3;

        var player1Box = document.createElement("div");
        player1Box.id = "player1Box";
        player1Box.innerHTML = "<div id='player1Stock'>Stock: "+this.player1.stock+ "</div>"+"<div id='player1Percent'>Percent: "+this.player1.percentage +"</div>";
        container.appendChild(player1Box);

        var player2Box = document.createElement("div");
        player2Box.id = "player2Box";
        player2Box.innerHTML = "<div id ='player2Stock'> Stock: "+this.player2.stock+"</div>" +"<div id ='player2Percent'>Percent: "+this.player2.percentage+"</div>";
        container.appendChild(player2Box);

    },
    createSpotLights: function(){
      if (this.night) createFollowSpotlights();
    }
}
