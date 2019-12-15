var RESET = false;
var ATTACK = true;
var raider = {
    name: "Raider",
    model: createBasicCharacterMesh(0,0,0),
    secondRaider: createBasicCharacterMesh(0,0,0).torso.rightArm.rightHand.coin,
    secondHat: createBasicCharacterMesh(0,0,0).hat,
    hitBox: createBasicCharacterBounding(0,0,0),
    canAAttack: [true, true, true, true, true, true],
    canBAttack: [true, true, true, true],
    hitByA: [false, false, false, false, false],
    hitByB: [false, false, false, false],
    init: function(){
        var keys = Object.keys(charProto);
        for(var i = 0; i < keys.length; i++){
            this[keys[i]] = charProto[keys[i]];
        }
        //spawn location
        this.name = "Raider"

        stage.scene.add(this.secondRaider);
        this.secondRaider.position.set(stage.maximumX +300,stage.maximumY + 300,0);
        this.secondHat.position.set(stage.maximumX +300,stage.maximumY + 300,0);

        this.heldKeys = {up: false, down: false, left: false, right: false, attack1: false,
        attack2: false}

        this.basicAttackObj = raiderBasic;
        this.specialAttackObj = raiderSpecial;
        this.damageDeal = 0;



    },
    setSpawn: function(){
        if(this.isPlayer1){
            this.x = stage.player1SpawnX;
            this.y = stage.player1SpawnY;
            this.z = stage.player1SpawnZ;
        }
        else{
            this.x = stage.player2SpawnX;
            this.y = stage.player2SpawnY;
            this.z = stage.player2SpawnZ;
        }
    },
    update: function(){
      //stage.p1spot.position.set(this.x,this.y+50, 10);
      //console.log(stage.player1Spot);
       //stage.player1Spot.position.set(this.x,this.y+50, 10);
       if(stage.night){
         stage.player1SpotTarget.position.set(this.x, this.y + 10, -10);
         stage.player1Spot.target = stage.player1SpotTarget;
       }
       //stage.player1Spot.copy(stage.player1SpotTarget.position);
       // stage.player1SpotTarget.position.set(stage.player1Spot.position.x, stage.player1Spot.position.y + 10, 40);


        // checks and sets the lowsest current point
        this.hitbbox = new THREE.Box3().setFromObject(this.hitBox);
        if(this.boxBelow != undefined){
            this.minDown = this.boxBelow.position.y + this.boxBelow.userData.height/2 + this.height/2;
        }
        else{
            this.minDown = -1000;
        }

        if(this.boxLeft != undefined){
            this.minLeft = this.boxLeft.position.x + this.boxLeft.userData.width/2 + this.width/2;
        }
        else{
            this.minLeft = -1000;
        }

        if(this.boxRight != undefined){
            this.minRight = this.boxRight.position.x-  this.boxRight.userData.width/2 - this.width/2;
        }
        else{
            this.minRight = 1000;
        }

        if(this.boxAbove != undefined){
          this.minUp = this.boxAbove.position.y - this.boxAbove.userData.height/2 - this.height/2;
        }
        else{
          this.minUp = 100000;
        }

        // if(this.hitBoxEnabled){
        //     this.hitBox.position.x = this.x;
        //     this.hitBox.position.y = this.y;
        //     this.hitBox.position.z = this.z;
        //     stage.scene.add(this.hitBox);
        // }
        // else{
        //     stage.scene.remove(this.hitBox);
        // }

        if(this.isHit){
          this.hitFrames -= 1;
          this.sleeping = false;
        }
        if(this.hitFrames < 0){
          this.isHit = false;
        }

        //maximum gravity acceleration
        if(this.yVel - 0.075 < -1.6){
            this.yVel = -1.6;
        }
        // else{
            this.yVel -= 0.075;
        // }

        //changes box position
        this.x += this.xVel;
        this.y += this.yVel;

        if(this.xVel > 8 || this.yVel > 8){
          var trail = this.model.clone();
          stage.scene.add(trail);
          setTimeout(function(){stage.scene.remove(trail)}, 50);
        }


        //other held keys
        if(this.heldKeys.up && this.heldKeys.attack2 && this.canRecover && !this.isRecover){
          if(!this.sleeping){
            this.recover();
            this.canJump = false;
          }
        }

        if(this.heldKeys.right && !this.heldKeys.left && !this.isHit && !this.heldKeys.attack1 && !this.heldKeys.attack2){
            this.walkRight();
        }
        if(this.heldKeys.left && !this.heldKeys.right && !this.isHit && !this.heldKeys.attack1 && !this.heldKeys.attack2){
            this.walkLeft();
        }
        //dampen left and right movement on floor
        if(!this.movingR && !this.movingL && this.onGround && !this.isHit){
          this.xVel = this.xVel*0.7;
        }
        if(!this.movingR && !this.movingL && !this.onGround && !this.isHit){
          this.xVel = this.xVel*0.99;
        }
        if(Math.abs(this.xVel) < 0.0005){
          this.xVel = 0;
        }
        // decrease airspeed
        // if(!this.jumping){
        //   // this.yVel = this.yVel*0.9;
        // }

        //doesn't let user pass below boxes
        if(this.y < this.minDown){
          this.y = this.minDown;
          this.canJump = true;
          this.jumpCt = 0;
          this.onGround = true;
          this.canRecover = true;
          this.isRecover = false;
        }
        if(this.y > this.minUp){
          this.y = this.minUp;
          this.yVel = 0;
        }
        if(this.x < this.minLeft){
          this.x = this.minLeft;
        }
        if(this.x > this.minRight){
          this.x = this.minRight;
        }

        //updates models position and hitbox
        if(this.stock == 0){
          this.model.position.set(1000,1000,0);
          this.hitBox.position.set(1000,1000,0);
        }
        else{
          this.model.position.set(this.x, this.y, 0);
          this.hitBox.position.set(this.x, this.y+4, 0);
        }

        if(this.y > this.minDown){
          this.onGround = false;
        }


    },
    animate: function(){
      if(this.isRecoiling){
        this.recoilFrames -= 1;
        if(this.recoilFrames <= 0){
          this.recoilFrames = this.recoilFrameDefault;
          this.isRecoiling = false;
        }
      }
      //direction changes
      if(this.facingR){
        this.model.rotation.y = 0.5;
      }
      if(this.facingL){
        this.model.rotation.y = -0.5;
      }


      //walking changes
      if((this.movingR || this.movingL) && this.xVel != 0 && !this.isHit){
        //alternates legs up and down between 0.5 and -0.5 from the original place
        if(this.walkStyle1){
          this.model.torso.rightLeg.position.y = -3 + 0.5*Math.sin(stage.timer*0.5);
          this.model.torso.leftLeg.position.y =  -3 - 0.5*Math.sin(stage.timer*0.5);
        }
        else if(this.walkStyle2){
          this.model.torso.rightLeg.rotation.x = 0.3*Math.sin(stage.timer*0.5);
          this.model.torso.leftLeg.rotation.x = - 0.3*Math.sin(stage.timer*0.5);
        }
        else if(this.walkStyle3){
          this.model.torso.rightLeg.position.y = -3 + 0.5*Math.sin(stage.timer*0.2);
          this.model.torso.leftLeg.position.y =  -3 - 0.5*Math.sin(stage.timer*0.2);
          this.model.rotation.z = 0.1*Math.sin(stage.timer*0.2);

        }

        //arm changes
        this.model.torso.rightArm.rotation.x = 0.3*Math.sin(stage.timer*0.5);
        this.model.torso.leftArm.rotation.x = - 0.3*Math.sin(stage.timer*0.5);
        //


        //to reset animation from attack
        if(this.canAAttack[A]){
            this.model.rotation.z = 0;
        }
      }

      //default
      else{
        //reset leg position and rotation
        this.model.torso.rightLeg.position.y = -3;
        this.model.torso.leftLeg.position.y =  -3;
        this.model.torso.rightLeg.rotation.x = 0;
        this.model.torso.leftLeg.rotation.x =  0;

        //arm reset
        this.model.torso.rightArm.rotation.x = 0;
        this.model.torso.leftArm.rotation.x = - 0;

        //to reset animation from attack
        if(this.canAAttack[A] && !this.isHit){
            this.model.rotation.z = 0;
        }
      }


      //blinking
      if(stage.timer%500 == 0){
        this.model.head.rightEye.scale.set(1,0.2,1);
        this.model.head.leftEye.scale.set(1,0.2,1);
      }
      else{
        this.model.head.rightEye.scale.set(1,1,1);
        this.model.head.leftEye.scale.set(1,1,1);
      }


      if(!this.canAAttack[A]){
          this.basicAttackFrames-=1;

          //ANIMATIONS GO HERE
          var c = (this.basicAttackObj.attackFrames[A]-this.basicAttackFrames)/(this.basicAttackObj.attackFrames[A]); //Make this a global?

          if(this.facingL){
            this.model.torso.rightArm.rotation.z = radians(-120*c);
            this.model.torso.rightArm.rightHand.coin.position.x = c*-10; //Tried to make it even, not too far
            if(this.basicAttackFrames <= this.basicAttackObj.attackFrames[A]/2){
              this.model.torso.rightArm.rightHand.coin.position.y -= 1;
            }
            else if (this.basicAttackFrames > this.basicAttackObj.attackFrames[A]/2 && this.basicAttackFrames <= 5.5*this.basicAttackObj.attackFrames[A]/10){
              this.model.torso.rightArm.rightHand.coin.position.x += 1;
              this.model.torso.rightArm.rightHand.coin.position.y -= 1;
            }

            this.model.torso.rightArm.rightHand.coin.scale.set(c*3.5,c*3.5,c*3.5);
          }

          else{

                this.model.torso.leftArm.rotation.set(-1.57,0,0);
                this.model.torso.leftArm.position.x = 4.5;
                this.model.torso.leftArm.position.z = 1.5;
                this.model.torso.leftArm.scale.set(1.5,1.5,1.5);

          }

          //HITBOX CHECK GOES HERE
          if(this.facingL){
            var bbox = new THREE.BoxHelper(this.model.torso.rightArm.rightHand.coin, 0xff0000) //same check
            this.attackbbox = new THREE.Box3().setFromObject(bbox);

            if(this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)){
              this.checkHit(A,"A");
            }

            if(hitBoxesOn){
              stage.scene.add(bbox);
              setTimeout(function(){bbox.geometry.dispose();}, 50);
              setTimeout(function(){  stage.scene.remove(bbox);}, 50);
            }
          }
          else{
            var bbox = new THREE.BoxHelper(this.model.torso.leftArm, 0xff0000)
            this.attackbbox = new THREE.Box3().setFromObject(bbox);

            if(this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)){
              this.checkHit(A,"A");
            }

            if(hitBoxesOn){
              stage.scene.add(bbox);
              setTimeout(function(){bbox.geometry.dispose();}, 50);
              setTimeout(function(){  stage.scene.remove(bbox);}, 50);
            }
          }


          if(this.basicAttackFrames <= 0){
            //RESET GOES HERE
              this.basicAttackFrames = 25;
              this.model.torso.rightArm.rotation.z = 0;
              this.model.torso.leftArm.position.x = 4;
              this.model.torso.rightArm.rightHand.coin.position.x = 0;
              this.model.torso.rightArm.rightHand.coin.position.y = 0;
              this.model.torso.rightArm.rightHand.coin.scale.set(1,1,1);
              this.model.torso.leftArm.rotation.set(0,0,0);
              this.model.torso.leftArm.position.z = 0;
              this.model.torso.leftArm.scale.set(1,1,1);

              this.canAAttack[A] = true;
              //WE need this check for the general case of casing a spell
              //all the specific can attacks are needed for animation distinction
              this.canBasicAttack = true;
              this.otherPlayer.hitByA[A] = false;
          }
      }

      if(!this.canAAttack[FA]){
                this.basicAttackFrames-=1;
                //ANIMATIONS GO HERE
                var c = ((this.basicAttackObj.attackFrames[FA]-this.basicAttackFrames)/this.basicAttackObj.attackFrames[FA]);

                if(!this.facingL){
                  //this.model.position.x =c*2; Camera follws player movements, currently impossible.
                  this.model.torso.leftArm.rotation.z = -45;
                  this.model.torso.rightArm.rotation.z = -45;

                  if(this.x + 1.8 <= this.minRight){
                    this.x+=1.8
                  }

                }

                else{
                  //this.model.position.x = c*2;
                  this.model.torso.rightArm.rotation.z = 45;
                  this.model.torso.leftArm.rotation.z = 45;
                  if(this.x - 1.8 >= this.minLeft){
                    this.x-=1.8
                  }
                }



                var bbox = new THREE.BoxHelper(this.model, 0xff0000)
                this.attackbbox = new THREE.Box3().setFromObject(bbox);

                if(this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)){
                  this.checkHit(FA,"A");
                }

                if(hitBoxesOn){
                  stage.scene.add(bbox);
                  setTimeout(function(){bbox.geometry.dispose();}, 50);
                  setTimeout(function(){  stage.scene.remove(bbox);}, 50);
                }


                //HITBOX CHECK GOES HERE
                if(this.basicAttackFrames <= 0){
                  this.model.torso.leftArm.rotation.z = 0;
                  this.model.torso.rightArm.rotation.z = 0;

                  this.model.torso.rightArm.scale.set(1,1,1);
                  this.model.torso.leftArm.scale.set(1,1,1);

                    this.basicAttackFrames = 25;
                    this.canAAttack[FA] = true;
                    this.canBasicAttack = true;
                    this.otherPlayer.hitByA[FA] = false;
                }

        }

      if(!this.canAAttack[BA]){
          this.basicAttackFrames-=1;
          if(this.basicAttackFrames <= 0){
              this.basicAttackFrames = 25;
              this.canAAttack[BA] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByA[BA] = false;
          }
      }

      if(!this.canAAttack[DA]){
          this.basicAttackFrames-=1;

          var cD = (this.basicAttackObj.attackFrames[DA]-this.basicAttackFrames)/(this.basicAttackObj.attackFrames[DA]);

          this.model.rotation.x = 90;
          this.model.rotation.y = cD*12;


          var bbox = new THREE.BoxHelper(this.model.torso, 0xff0000)
          this.attackbbox = new THREE.Box3().setFromObject(bbox);

          if(this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)){
            this.checkHit(DA,"A");
          }

          if(hitBoxesOn){
            stage.scene.add(bbox);
            setTimeout(function(){bbox.geometry.dispose();}, 50);
            setTimeout(function(){  stage.scene.remove(bbox);}, 50);
          }


          if(this.basicAttackFrames <= 0){
              this.basicAttackFrames = 25;
              this.model.rotation.x = 0;
              this.model.rotation.y = 0;
              this.canAAttack[DA] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByA[DA] = false;
          }
      }

      if(!this.canAAttack[UA]){
          this.basicAttackFrames-=1;
          var c = (this.basicAttackObj.attackFrames[UA]-this.basicAttackFrames)/(this.basicAttackObj.attackFrames[UA]);

          this.model.hat.position.y += 1;
          this.model.hat.rotation.y = c*8;


          var bbox = new THREE.BoxHelper(this.model.hat, 0xff0000)
          this.attackbbox = new THREE.Box3().setFromObject(bbox);

          if(this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)){
            this.checkHit(UA,"A");
          }

          if(hitBoxesOn){
            stage.scene.add(bbox);
            setTimeout(function(){bbox.geometry.dispose();}, 50);
            setTimeout(function(){  stage.scene.remove(bbox);}, 50);
          }

          if(this.basicAttackFrames <= 0){
              this.basicAttackFrames = 25; //def change length.
              this.model.hat.position.y = 8;
              this.model.hat.rotation.y = 0;
              this.canAAttack[UA] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByA[UA] = false;
          }
      }
      if(!this.canAAttack[NA]){
          this.basicAttackFrames-=1;
          var na = (this.basicAttackObj.attackFrames[NA]-this.basicAttackFrames)/(this.basicAttackObj.attackFrames[NA]);

          // this.secondHat.position.set(this.x, this.y, this.z); //Hit boxes right on this one it seems, but hat no appear.
          // this.secondHat.scale.set(3,3,1.5);
          // this.secondHat.rotation.z = na*12;
          // this.secondHat.position.y -= 2;

          this.model.scale.set(.5,.5,.5);
          this.model.hat.scale.set(3.5,3.5,2);  //Hitboxes weird. Can see legs
          this.model.hat.rotation.z = na*12;
          this.model.hat.position.y -= .34;


          if(this.basicAttackFrames < this.basicAttackObj.attackFrames[NA] - 2){
            var bbox = new THREE.BoxHelper(this.model.hat, 0xff0000)
            this.attackbbox = new THREE.Box3().setFromObject(bbox);

            if(this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)){
              this.checkHit(NA,"A");
            }

            if(hitBoxesOn){
              stage.scene.add(bbox);
              setTimeout(function(){bbox.geometry.dispose();}, 50);
              setTimeout(function(){  stage.scene.remove(bbox);}, 50);
            }
          }



          if(this.basicAttackFrames <= 0){
              this.basicAttackFrames = 25;
              this.model.scale.set(1,1,1);
              this.model.hat.scale.set(1,1,1);
              this.model.hat.rotation.z = 0;
              this.model.hat.position.y = 8;

              // this.secondHat.position.set(stage.maximumX +300,stage.maximumY + 300,0);
              // this.secondHat.scale.set(1,1,1);
              // this.secondHat.rotation.z = na*12;
              // this.secondHat.position.y -= .2;



              this.canAAttack[NA] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByA[NA] = false;
          }
      }

      if(!this.canBAttack[S]){
          this.basicAttackFrames-=1;
          if(this.basicAttackFrames <= 0){
              this.basicAttackFrames = 25;
              this.canBAttack[S] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByB[S] = false;
          }
      }


      if(!this.canBAttack[SS]){
        this.basicAttackFrames-=1;
        if(this.basicAttackFrames == this.specialAttackObj.attackFrames[SS] - 1 && !this.isRecover){
          if(this.facingL) {
            this.specialAttackObj.castedRight = false;
            this.secondRaider.position.set(this.x, this.y, this.z);
          }
          if(this.facingR) {
            this.specialAttackObj.castedRight = true;
            this.secondRaider.position.set(this.x, this.y, this.z);
          }
        }

        else{
          if(!this.specialAttackObj.castedRight) {
            if(this.basicAttackFrames > 12.5){
              this.secondRaider.position.x -=2.5;
            }
            if(this.basicAttackFrames < 12.5){
              this.secondRaider.position.x +=2.5;
            }
          }
          if(this.specialAttackObj.castedRight) {
            if(this.basicAttackFrames > 12.5){
              this.secondRaider.position.x +=2.5;
            }
            if(this.basicAttackFrames < 12.5){
              this.secondRaider.position.x -=2.5;
            }
          }
        }

        coinToss(ATTACK, this.secondRaider);

        var bbox = new THREE.BoxHelper(this.secondRaider, 0xff0000)
        this.attackbbox = new THREE.Box3().setFromObject(bbox);

        if(this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)){
          this.checkHit(SS,"B");
        }

        if(hitBoxesOn){
          stage.scene.add(bbox);
          setTimeout(function(){bbox.geometry.dispose();}, 50);
          setTimeout(function(){  stage.scene.remove(bbox);}, 50);
        }

          if(this.basicAttackFrames <= 0){

            //coinToss(RESET, this.model);
            coinToss(RESET, this.secondRaider);

              this.basicAttackFrames = 25;
              this.canBAttack[SS] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByB[SS] = false;
              this.secondRaider.position.set(stage.maximumX + 300,stage.maximumY + 300,0);
          }
      }

      if(!this.canBAttack[US]){
               this.basicAttackFrames-=1;

               this.model.hat.scale.set(1.5,1.5,1.5);
               this.model.hat.rotation.y += 0.78;

               var geomHBox1 = new THREE.BoxGeometry(8,8,8, 1, 1, 1);
               var matHBox1  = new THREE.MeshPhongMaterial(
                                          { emissive : 0x000000, opacity: 1, transparent: true
                                          ,map: new THREE.TextureLoader().load('images/gateLogo.png')});

               var boxH1 = new THREE.Mesh(geomHBox1, matHBox1).clone();

               boxH1.position.set(this.x,this.y,this.z);
               stage.scene.add(boxH1);
               setTimeout(function(){stage.scene.remove(boxH1)}, 28);
               setTimeout(function(){boxH1.geometry.dispose()}, 28);


               var bbox = new THREE.BoxHelper(this.model.hat, 0xff0000)
               this.attackbbox = new THREE.Box3().setFromObject(bbox);

               if(this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)){
                 this.checkHit(US,"B");
               }

               if(hitBoxesOn){
                 stage.scene.add(bbox);
                 setTimeout(function(){bbox.geometry.dispose();}, 50);
                 setTimeout(function(){  stage.scene.remove(bbox);}, 50);
               }

               if(this.basicAttackFrames <= 0){
                   this.model.hat.scale.set(1,1,1);
                   this.basicAttackFrames = 25;
                   this.model.hat.rotation.y = 0;
                   this.canBAttack[US] = true;
                   this.canBasicAttack = true;
                   this.otherPlayer.hitByB[US] = false;
               }
           }


      if(!this.canBAttack[DS]){
          this.basicAttackFrames-=1;
          if(this.basicAttackFrames <= 0){
              this.basicAttackFrames = 25;
              this.canBAttack[DS] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByB[DS] = false;
          }
      }

    },
    walkRight: function(){
      this.movingR = true;
      this.facingR = true;
      this.facingL = false;
      //you can touch the ground to revert momentum, hurts ankles
      // if(this.xVel < 0 && !this.isHit){
      //     this.xVel = 0;
      // }
      this.xVel += this.xAccel;
      if(this.xVel > this.maxXVel){
          this.xVel = this.maxXVel;
      }
      this.isHit = false;
    },
    walkLeft: function(){
      this.movingL = true;
      this.facingL = true;
      this.facingR = false;
      this.xVel -= this.xAccel;
      if(this.xVel < -this.maxXVel){
          this.xVel = -this.maxXVel;
      }
      this.isHit = false;
    },
    jump: function(){
      if(!this.sleeping){
      if(this.jumpCt == this.maxJumpCt){
        this.canJump = false;
      }
      if(this.canJump){
          if(!this.isHit){
            this.jumpCt+=1;
            this.yVel = this.jumpSpeed;
            this.onGround = false;
            this.isHit = false;
          }
        }
    }
    },
    drop: function(){
    },
    recover: function(){
      this.isRecover = true;
      this.yVel = this.recoverVel;
      this.canRecover = false;
      this.isHit = false;
    },
    doAnyAttack: function(){
      //A function that checks the key inputs and assigns the appropriate booleans,
      //and frame counts to the arrays
      if(this.canBasicAttack && !this.isHit && !this.isRecover){
        var newAttackFrame = 0;

        if(this.heldKeys.up && this.heldKeys.attack2 && this.canRecover && !this.isRecover){
          this.recover();
          this.canJump = false;
        }

        //basic attack air
        if(this.facingR && this.heldKeys.right && this.heldKeys.attack1 && !this.onGround && this.canBasicAttack){
            if(this.canAAttack[FA]){
              console.log("Forward Air");
              newAttackFrame = this.basicAttackObj.attackFrames[FA];
              this.canAAttack[FA] = false;
              this.canBasicAttack = false;
            }
        }
        if(this.facingL && this.heldKeys.left && this.heldKeys.attack1 && !this.onGround && this.canBasicAttack){
          if(this.canAAttack[FA] == true){
              console.log("Forward Air");
              newAttackFrame = this.basicAttackObj.attackFrames[FA];
              this.canAAttack[FA] = false;
              this.canBasicAttack = false;
            }
        }
        if(this.facingL && this.heldKeys.right && this.heldKeys.attack1 && !this.onGround && this.canBasicAttack){
          if(this.canAAttack[BA] == true){
            console.log("Back Air");
            newAttackFrame = this.basicAttackObj.attackFrames[BA];
            this.canAAttack[BA] = false;
            this.canBasicAttack = false;
          }
        }
        if(this.facingR && this.heldKeys.left && this.heldKeys.attack1 && !this.onGround && this.canBasicAttack){
          if(this.canAAttack[BA] == true){
            console.log("Back Air");
            newAttackFrame = this.basicAttackObj.attackFrames[BA];
            this.canAAttack[BA] = false;
            this.canBasicAttack = false;
          }
        }
        if(this.heldKeys.down && this.heldKeys.attack1 && !this.onGround && this.canBasicAttack){
          if(this.canAAttack[DA] == true){
            console.log("Down Air");
            newAttackFrame = this.basicAttackObj.attackFrames[DA];
            this.canAAttack[DA] = false;
            this.canBasicAttack = false;
          }
        }
        if(this.heldKeys.up && this.heldKeys.attack1 && !this.onGround && this.canBasicAttack){
          if(this.canAAttack[UA] == true){
            console.log("Up Air");
            newAttackFrame = this.basicAttackObj.attackFrames[UA];
            this.canAAttack[UA] = false;
            this.canBasicAttack = false;
          }
        }
        if(!this.heldKeys.left && !this.heldKeys.right && !this.heldKeys.up && !this.heldKeys.down && this.heldKeys.attack1 && !this.onGround && this.canBasicAttack){
            if(this.canAAttack[NA] == true){
              console.log("Neutral Air");
              newAttackFrame = this.basicAttackObj.attackFrames[NA];
              this.canAAttack[NA] = false;
              this.canBasicAttack = false;
          }
        }

        //basic attack ground
        if(this.heldKeys.attack1 && this.onGround && this.canBasicAttack){
            if(this.canAAttack[A] == true){
             console.log("Basic");
             newAttackFrame = this.basicAttackObj.attackFrames[A];
             this.canAAttack[A] = false;
             this.canBasicAttack = false;
          }
        }

        //special attacks
        if((this.heldKeys.right || this.heldKeys.left) && this.heldKeys.attack2 && this.canBasicAttack){
          if(this.canBAttack[SS] == true){
           console.log("Side Special");
           newAttackFrame = this.specialAttackObj.attackFrames[SS];
           this.canBAttack[SS] = false;
           this.canBasicAttack = false;
        }


        }
        if((!this.heldKeys.down && !this.heldKeys.up && !this.heldKeys.left && !this.heldKeys.right) && this.heldKeys.attack2 && this.canBasicAttack){
          if(this.canBAttack[S] == true){
             console.log("Neutral Special");
             newAttackFrame = this.specialAttackObj.attackFrames[S];
             this.canBAttack[S] = false;
             this.canBasicAttack = false;
          }

        }
        if(this.heldKeys.down && this.heldKeys.attack2 && this.canBasicAttack){
          if(this.canBAttack[DS] == true){
             console.log("Down Special");
             newAttackFrame = this.specialAttackObj.attackFrames[DS];
             this.canBAttack[DS] = false;
             this.canBasicAttack = false;
          }
        }
        if(this.heldKeys.up && this.heldKeys.attack2 && this.canBasicAttack){
            if(this.canBAttack[US] == true){
             console.log("Up Special");
             newAttackFrame = this.specialAttackObj.attackFrames[US];
             this.canBAttack[US] = false;
             this.canBasicAttack = false;
          }
      }

      this.basicAttackFrames = newAttackFrame;

       }

    },
    checkHit: function(attackType, moveType){
      //recieves the call from the animation code and the hitbox produced during,
      //animation, checks what type of move it's hit by, calculates damage and then
      //ccalls the function that does knockback
      if(moveType == "A"){
        if(!this.otherPlayer.hitByA[attackType]){
          damageToDeal = this.basicAttackObj.damage[attackType];
          angleToApply = this.basicAttackObj.launchAngle[attackType];
          tKnockback = calculateKnockback(this.otherPlayer.percentage, this.basicAttackObj.damage[attackType],this.otherPlayer.weight,this.basicAttackObj.scaling, this.basicAttackObj.knockback);

          this.otherPlayer.isHit = true;
          this.otherPlayer.hitByA[attackType] = true;
          this.doKnockBack(damageToDeal, angleToApply, tKnockback);
          // this.isRecoiling = true;
          // this.recoilFrames = this.recoilFrameDefault;
          // this.basicAttackFrames = 1;
        }
      }
      else{
        if(!this.otherPlayer.hitByB[attackType]){
          damageToDeal = this.specialAttackObj.damage[attackType];
          angleToApply = this.specialAttackObj.launchAngle[attackType];
          tKnockback = calculateKnockback(this.otherPlayer.percentage, this.specialAttackObj.damage[attackType],this.otherPlayer.weight,this.specialAttackObj.scaling, this.specialAttackObj.knockback);

          this.otherPlayer.isHit = true;
          this.otherPlayer.hitByB[attackType] = true;
          this.doKnockBack(damageToDeal, angleToApply, tKnockback);
          // this.isRecoiling = true;
          // this.recoilFrames = this.recoilFrameDefault;
          // this.basicAttackFrames = 1;
        }
      }
    },
    doKnockBack: function(damageToDeal, angleToApply, tKnockback){
        //calculating the knockback
          var knockbackVec = new THREE.Vector2();

           knockbackVec.x = this.otherPlayer.x - this.x;
           knockbackVec.y = this.otherPlayer.y - this.y;
           knockbackVec= knockbackVec.normalize();

           var newX, newY;
           newX = Math.cos(radians(angleToApply)) * knockbackVec.x - Math.sin(radians(angleToApply)) * knockbackVec.y;
           newY = Math.sin(radians(angleToApply))* knockbackVec.x + Math.cos(radians(angleToApply)) * knockbackVec.y;

           knockbackVec.x = newX;
           knockbackVec.y = Math.abs(newY);

           knockbackVec = knockbackVec.normalize();
           //applying the knockback
          this.otherPlayer.percentage += damageToDeal;
          this.otherPlayer.xVel = tKnockback*0.5*knockbackVec.x;
          this.otherPlayer.yVel = tKnockback*0.5*knockbackVec.y;

          // console.log(tKnockback*0.5*knockbackVec.x, tKnockback*0.5*knockbackVec.y);
          this.otherPlayer.hitFrames = damageToDeal*2;

          if(this.otherPlayer.xVel > 0){

            this.otherPlayer.model.rotation.z = -1.57;
          }
          else{
            this.otherPlayer.model.rotation.z = 1.57;
          }
    }

}

function coinToss(attackBoolean, model) {
  if(attackBoolean) {

    model.scale.set(2.5,2.5,2.5);

  }

  else {

    model.scale.set(1,1,1);
    model.position.x = 0;

  }


}
