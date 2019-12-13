var stageB= {
    init: function(){
        var keys = Object.keys(stageProto);
        for(var i = 0; i < keys.length; i++){
            this[keys[i]] = charProto[keys[i]];
        }

        //THESE VARIABLES NEED TO BE INIT FIRST FOR SOME REASON/
        //I THINK IT'S CAUSE OF WEBPAGE LOAD TIME
        this.bgm = './sounds/My happy song Nicholas w lott.mp3';



        this.omega = omegaOn;
        this.blockA = grassBox;
        this.blockB = dirtBlockB;
        this.blockC = cloudIco;

        this.stageBlocks = [];
        this.blockAMeshes = [];
        this.stageHitBoxes = [];
        this.players = [],
        this.timer =  0,
        this.timerIncrement = 0,
        this.maxTim = 120,

        this.minimumY = -80,
        this.maximumY = 280,
        this.minimumX = -300,
        this.maximumX = 300,
        this.createScene();
        if(omegaOn){
            this.populateOmega();
        }
        else{
            this.populateScene();
        }
        this.player1 = basicCharacter;
        this.player1.init();
        this.player2 = pingu;
        this.player2.init();
        createPlayer1(0, 10, 0, stageB);
        createPlayer2(0, 10, 0, stageB);
        this.player1.otherPlayer = this.player2;
        this.player2.otherPlayer = this.player1;
        this.player1.hitbbox = new THREE.Box3().setFromObject(this.player1.hitBox);
        this.player2.hitbbox = new THREE.Box3().setFromObject(this.player2.hitBox);

        this.startTimer();
        //I THINK IT'S CAUSE OF WEBPAGE LOAD TIME
    },
    createScene: function(){
        this.scene = new THREE.Scene();

        if(isDay){
          sunsetLights(this.scene);
          document.getElementById("theBody").css("color","black");

        }
        else{
          nightLights(this.scene);
          document.getElementById("theBody").css("color","white");

        }

        // noonLights(this.scene);
        // nightLights(this.scene);

    },
    populateScene: function(){
        //replace the block with blockA
        for(var i = -10; i < 11; i++){
            if(i == -8 || i == 8){
                createBox(i*this.blockA.width,this.blockA.height, 0, this.blockA, stageB);
                createBox(i*this.blockA.width, this.blockA.height*2, 0, this.blockA, stageB);
            }
            if(i == -4 || i == -3 || i == -2 || i == 2 || i == 3 || i == 4){

                createBox(i*this.blockC.width, this.blockC.height*8, 0, this.blockC, stageB);

                createBox(i*this.blockC.width, this.blockC.height*7, -12, this.blockC, stageB);
            }
            createBox(i*this.blockA.width, 0, 0, this.blockA, stageB);
        }
        //createBox(0, 50, 0, stage.blockE);
    },
    populateOmega: function(){
        //create floor out of block a

        for(var i = -10; i < 11; i++){
          if(i == -10 || i == 10){
              createBox(i*this.blockC.width,-this.blockA.height/4, 0, this.blockC, stageB);
              createBox(i*this.blockC.width, this.blockA.height/4, 0, this.blockC, stageB);
          }
          else{
            createBox(i*this.blockA.width, 0, 0, this.blockA, stageB);
          }
        }
        //create underside out of block b
        for(var j = 1; j< 5; j++ ){
            for(var i = -10+j; i < 11-j; i++){
                var choice = Math.random();
                createBox(i*this.blockA.width, -j*this.blockB.height, 0, this.blockB, stageB);
            }
        }
        for(var i = -10+j; i < 11-j; i++){
            if(i == -4 || i == -3 || i == -2 || i == 2 || i == 3 || i == 4){

                createBox(i*this.blockA.width, this.blockA.height*4, 0, this.blockC, stageB);

                createBox(i*this.blockA.width, this.blockA.height*7, -12, this.blockC, stageB);
            }
        }
        //create platforms out of block C
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

        var stockString1 = ""
        for(var i = 0; i < this.player1.stock; i++){
          stockString1+="<i class='fas fa-heart' style='color:violet'></i> "
        }
        var stockString2 = ""
        for(var i = 0; i < this.player2.stock; i++){
          stockString2+="<i class='fas fa-heart' style='color:violet'></i> "
        }
        if(this.player1.percentage >= 80) {

          player1Box.innerHTML = "<div id = 'player1Name'>"+this.player1.name+ "</div>" + "<div id = 'player1Stock'"+
                                  stockString1+"</div>" + "<div id ='player1Percent' style = 'color: red;'> Percent: "+this.player1.percentage +"</div>";

        } else {

          player1Box.innerHTML = "<div id = 'player1Name'>"+this.player1.name+ "</div>" + "<div id = 'player1Stock'"+
                                  stockString1+"</div>" + "<div id ='player1Percent'> Percent: "+this.player1.percentage +"</div>";

        }

        if(this.player2.percentage >= 80) {

          player2Box.innerHTML =  "<div id = 'player2Name'>"+ this.player2.name+"</div>"+ "<div id = 'player2Stock'" +
                                  stockString2+"</div>"+ "<div id= 'player2Percent' style = 'color: red;'> Percent: " +this.player2.percentage + "</div>";

        } else {

          player2Box.innerHTML =  "<div id = 'player2Name'>"+ this.player2.name+"</div>"+ "<div id = 'player2Stock'" +
                                  stockString2+"</div>"+ "<div id= 'player2Percent'> Percent: " +this.player2.percentage + "</div>";

        }

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
        player1Box.innerHTML = "<div id='player1Stock'>Stock: "+this.player1.stock+ "</div>"+"<div id='player1Percent'>Percent: "+this.player1.percentage +"</div>";
        container.appendChild(player1Box);

        var player2Box = document.createElement("div");
        player2Box.id = "player2Box";
        player2Box.innerHTML = "<div id ='player2Stock'> Stock: "+this.player2.stock+"</div>" +"<div id ='player2Percent'>Percent: "+this.player2.percentage+"</div>";
        container.appendChild(player2Box);

    }
}
