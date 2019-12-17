var RESET = false;
var ATTACK = true;
var anh = {
    name: "Anh",
    model: createAnhMesh(0,0,0),
    hitBox: createBasicCharacterBounding(0,0,0),
    canAAttack: [true, true, true, true, true],
    canBAttack: [true, true, true, true],
    hitByA: [false, false, false, false, false],
    hitByB: [false, false, false, false],
    init: function(){
        var keys = Object.keys(charProto);
        for(var i = 0; i < keys.length; i++){
            this[keys[i]] = charProto[keys[i]];
        }
        //spawn location
        this.name = "Anh"

        this.zs = createZ(stage, stage.maximumX + 300, stage.maximumY + 300, 0);
        this.music = createMusic(stage, stage.maximumX + 300, stage.maximumY + 300, 0);

        this.heldKeys = {up: false, down: false, left: false, right: false, attack1: false,
        attack2: false}

        this.basicAttackObj = anhBasic;
        this.specialAttackObj = anhSpecial;
        this.damageDeal = 0;

        this.maxJumpCt = 4;

    },
    resetAll: function(){

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
        if(!this.onGround){
            if(this.isPlayer1){
                player1Info.inAirDuration += 1/60;
            }
            else{
                player2Info.inAirDuration += 1/60;
            }
        }
      //stage.p1spot.position.set(this.x,this.y+50, 10);
      //console.log(stage.player1Spot);
       //stage.player1Spot.position.set(this.x,this.y+50, 10);
       if(!isDay){
           if(!this.isPlayer1){
               stage.player2SpotTarget.position.set(this.x, this.y + 10, -10);
               stage.player2Spot.target = stage.player2SpotTarget;
           }
           else{
               stage.player1SpotTarget.position.set(this.x, this.y + 10, -10);
               stage.player1Spot.target = stage.player1SpotTarget;
           }

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

        if(this.isHit){
          this.hitFrames -= 1;
          if(this.sleeping){
              this.sleeping = false;
              this.basicAttackFrames = 0;
          }
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

        if(this.heldKeys.right && !this.heldKeys.left && !this.isHit && !this.heldKeys.attack1 && !this.heldKeys.attack2 && !this.sleeping && !this.isHit){
            this.walkRight();
        }
        if(this.heldKeys.left && !this.heldKeys.right && !this.isHit && !this.heldKeys.attack1 && !this.heldKeys.attack2 && !this.sleeping && !this.isHit){
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
        if(this.canBasicAttack && !this.sleeping){
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
        if(this.canBasicAttack && !this.sleeping){
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

          if(this.basicAttackFrames <= 0){
              this.basicAttackFrames = 25;
              this.canAAttack[A] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByA[A] = false;
          }
      }

      if(!this.canAAttack[FA]){
          this.basicAttackFrames-=1;
          if(this.basicAttackFrames <= 0){
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
          if(this.basicAttackFrames <= 0){
              this.basicAttackFrames = 25;
              this.canAAttack[DA] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByA[DA] = false;
          }
      }

      if(!this.canAAttack[UA]){
          this.basicAttackFrames-=1;
          if(this.basicAttackFrames <= 0){
              this.basicAttackFrames = 25;
              this.canAAttack[UA] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByA[UA] = false;
          }
      }

      if(!this.canAAttack[NA]){
          this.basicAttackFrames-=1;
          if(this.basicAttackFrames <= 0){
              this.basicAttackFrames = 25;
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
          if(this.basicAttackFrames <= 0){
              this.basicAttackFrames = 25;
              this.canBAttack[SS] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByB[SS] = false;
          }
      }

      if(!this.canBAttack[US]){
          this.basicAttackFrames-=1;
          if(this.basicAttackFrames <= 0){
              this.basicAttackFrames = 25;
              this.canBAttack[US] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByB[US] = false;
          }
      }
      if(!this.canBAttack[DS]){
          this.sleeping = true;
          this.basicAttackFrames-=1;

          var c = ((this.specialAttackObj.attackFrames[DS]-this.basicAttackFrames)/this.specialAttackObj.attackFrames[DS]);
          this.zs.position.set(this.x-5,this.y+5,this.z);
          if(c < 0.25){
            this.model.rotation.z = 4*c*1.57;
          }
          var kd = 6;
          if(this.basicAttackFrames > this.specialAttackObj.attackFrames[DS] - 5){
            if((this.x <= this.otherPlayer.x + kd && this.x >= this.otherPlayer.x-kd) && (this.y <= this.otherPlayer.y +kd && this.y >= this.otherPlayer.y-kd) && (this.z <= this.otherPlayer.z +kd && this.z >= this.otherPlayer.z-kd)){
                if(this.isPlayer1){
                    player1Info.damageDealt+=130;
                }
                else{
                    player2Info.damageDealt+=130;
                }
              this.otherPlayer.percentage += 130;
              this.checkHit(DS,"B");
            }
          }

          this.model.head.leftEye.scale.y = 0.1;
          this.model.head.rightEye.scale.y = 0.1;

          if(this.basicAttackFrames <= 0){
              this.model.rotation.z = 0;
              this.model.head.leftEye.scale.y = 1;
              this.model.head.rightEye.scale.y = 1;
              this.sleeping = false;
              this.zs.position.set(stage.maximumX + 300, stage.maximumY + 300, 0);
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
        var attackCast = false;
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
              attackCast = true;
              newAttackFrame = this.basicAttackObj.attackFrames[FA];
              this.canAAttack[FA] = false;
              this.canBasicAttack = false;
            }
        }
        if(this.facingL && this.heldKeys.left && this.heldKeys.attack1 && !this.onGround && this.canBasicAttack){
          if(this.canAAttack[FA] == true){
              attackCast = true;
              newAttackFrame = this.basicAttackObj.attackFrames[FA];
              this.canAAttack[FA] = false;
              this.canBasicAttack = false;
            }
        }
        if(this.facingL && this.heldKeys.right && this.heldKeys.attack1 && !this.onGround && this.canBasicAttack){
          if(this.canAAttack[BA] == true){
              attackCast = true;
            newAttackFrame = this.basicAttackObj.attackFrames[BA];
            this.canAAttack[BA] = false;
            this.canBasicAttack = false;
          }
        }
        if(this.facingR && this.heldKeys.left && this.heldKeys.attack1 && !this.onGround && this.canBasicAttack){
          if(this.canAAttack[BA] == true){
              attackCast = true;
            newAttackFrame = this.basicAttackObj.attackFrames[BA];
            this.canAAttack[BA] = false;
            this.canBasicAttack = false;
          }
        }
        if(this.heldKeys.down && this.heldKeys.attack1 && !this.onGround && this.canBasicAttack){
          if(this.canAAttack[DA] == true){
              attackCast = true;
            newAttackFrame = this.basicAttackObj.attackFrames[DA];
            this.canAAttack[DA] = false;
            this.canBasicAttack = false;
          }
        }
        if(this.heldKeys.up && this.heldKeys.attack1 && !this.onGround && this.canBasicAttack){
          if(this.canAAttack[UA] == true){
              attackCast = true;
            newAttackFrame = this.basicAttackObj.attackFrames[UA];
            this.canAAttack[UA] = false;
            this.canBasicAttack = false;
          }
        }
        if(!this.heldKeys.left && !this.heldKeys.right && !this.heldKeys.up && !this.heldKeys.down && this.heldKeys.attack1 && !this.onGround && this.canBasicAttack){
            if(this.canAAttack[NA] == true){
                attackCast = true;
              newAttackFrame = this.basicAttackObj.attackFrames[NA];
              this.canAAttack[NA] = false;
              this.canBasicAttack = false;
          }
        }

        //basic attack ground
        if(this.heldKeys.attack1 && this.onGround && this.canBasicAttack){
            if(this.canAAttack[A] == true){
                attackCast = true;
             newAttackFrame = this.basicAttackObj.attackFrames[A];
             this.canAAttack[A] = false;
             this.canBasicAttack = false;
          }
        }

        //special attacks
        if((this.heldKeys.right || this.heldKeys.left) && this.heldKeys.attack2 && this.canBasicAttack){
          if(this.canBAttack[SS] == true){
              attackCast = true;
           newAttackFrame = this.specialAttackObj.attackFrames[SS];
           this.canBAttack[SS] = false;
           this.canBasicAttack = false;
        }


        }
        if((!this.heldKeys.down && !this.heldKeys.up && !this.heldKeys.left && !this.heldKeys.right) && this.heldKeys.attack2 && this.canBasicAttack){
          if(this.canBAttack[S] == true){
              attackCast = true;
             newAttackFrame = this.specialAttackObj.attackFrames[S];
             this.canBAttack[S] = false;
             this.canBasicAttack = false;
          }

        }
        if(this.heldKeys.down && this.heldKeys.attack2 && this.canBasicAttack){
          if(this.canBAttack[DS] == true){
              attackCast = true;
             newAttackFrame = this.specialAttackObj.attackFrames[DS];
             this.canBAttack[DS] = false;
             this.canBasicAttack = false;
          }
        }
        if(this.heldKeys.up && this.heldKeys.attack2 && this.canBasicAttack){
            if(this.canBAttack[US] == true){
                attackCast = true;
             newAttackFrame = this.specialAttackObj.attackFrames[US];
             this.canBAttack[US] = false;
             this.canBasicAttack = false;
          }
      }

      this.basicAttackFrames = newAttackFrame;

      if(attackCast){
          if(this.isPlayer1){
              player1Info.totalAttacksCast +=1;
          }
          else{
              player2Info.totalAttacksCast +=1;
          }
      }

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
          if(this.isPlayer1){
              player1Info.totalAttacksHit += 1;
          }
          else{
              player2Info.totalAttacksHit += 1;
          }
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
          if(this.isPlayer1){
              player1Info.totalAttacksHit += 1;
          }
          else{
              player2Info.totalAttacksHit += 1;
          }
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
           if(this.isPlayer1){
               player1Info.damageDealt+=damageToDeal;
           }
           else{
               player2Info.damageDealt+=damageToDeal;
           }
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

function createZ(stage, x, y, z) {

  /*
    z18z17z16
        z15
       z14
    z13z12z11
  */
    var zMesh = new THREE.Mesh();
    var z1 = new THREE.Mesh();

    var z11 = particles.particlePalette.sleepPiece.clone();
    z1.add(z11);
    z11.position.x += 2;
    var z12 = particles.particlePalette.sleepPiece.clone();
    z1.add(z12);
    var z13 = particles.particlePalette.sleepPiece.clone();
    z1.add(z13);
    z13.position.x -= 2;
    var z14 = particles.particlePalette.sleepPiece.clone();
    z1.add(z14);
    z14.position.x -= 1.2;
    z14.position.y += 2;
    var z15 = particles.particlePalette.sleepPiece.clone();
    z1.add(z15);
    z15.position.x += 1.2;
    z15.position.y += 4;
    var z16 = particles.particlePalette.sleepPiece.clone();
    z1.add(z16);
    z16.position.x += 2;
    z16.position.y += 6;
    var z17 = particles.particlePalette.sleepPiece.clone();
    z1.add(z17);
    z17.position.y += 6;
    var z18 = particles.particlePalette.sleepPiece.clone();
    z1.add(z18);
    z18.position.x -= 2;
    z18.position.y += 6;

    z2 = z1.clone();
    z3 = z1.clone();

    z1.scale.set(0.3,0.3,0.3);
    zMesh.add(z1);
    z2.scale.set(0.45,0.45,0.45);
    zMesh.add(z2);
    z2.position.set(-1.4,2.5,0);
    z3.scale.set(0.55,0.55,0.55);
    zMesh.add(z3);
    z3.position.set(1.8,7.2,0);


    stage.scene.add(zMesh);

    zMesh.position.set(x,y,z);
    return zMesh;
}

function createMusic(stage, x, y, z) {
    var arrToReturn = [];
    for(var i = 0; i < 27; i++) {
        var temp = particles.particlePalette.musicPiece.clone();

        arrToReturn.push(temp);
        stage.scene.add(temp);
    }
    return arrToReturn;
}

var anh1 = {
    name: "Anh",
    model: createAnhMesh(0,0,0),
    hitBox: createBasicCharacterBounding(0,0,0),
    canAAttack: [true, true, true, true, true],
    canBAttack: [true, true, true, true],
    hitByA: [false, false, false, false, false],
    hitByB: [false, false, false, false],
    init: function(){
        var keys = Object.keys(charProto);
        for(var i = 0; i < keys.length; i++){
            this[keys[i]] = charProto[keys[i]];
        }
        //spawn location
        this.name = "Anh"

        this.zs = createZ(stage, stage.maximumX + 300, stage.maximumY + 300, 0);
        this.music = createMusic(stage, stage.maximumX + 300, stage.maximumY + 300, 0);

        this.heldKeys = {up: false, down: false, left: false, right: false, attack1: false,
        attack2: false}

        this.basicAttackObj = anhBasic;
        this.specialAttackObj = anhSpecial;
        this.damageDeal = 0;

        this.maxJumpCt = 4;

    },
    resetAll: function(){

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
        if(!this.onGround){
            if(this.isPlayer1){
                player1Info.inAirDuration += 1/60;
            }
            else{
                player2Info.inAirDuration += 1/60;
            }
        }
      //stage.p1spot.position.set(this.x,this.y+50, 10);
      //console.log(stage.player1Spot);
       //stage.player1Spot.position.set(this.x,this.y+50, 10);
       if(!isDay){
           if(!this.isPlayer1){
               stage.player2SpotTarget.position.set(this.x, this.y + 10, -10);
               stage.player2Spot.target = stage.player2SpotTarget;
           }
           else{
               stage.player1SpotTarget.position.set(this.x, this.y + 10, -10);
               stage.player1Spot.target = stage.player1SpotTarget;
           }

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

        if(this.isHit){
          this.hitFrames -= 1;
          if(this.sleeping){
              this.sleeping = false;
              this.basicAttackFrames = 0;
          }
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

        if(this.heldKeys.right && !this.heldKeys.left && !this.isHit && !this.heldKeys.attack1 && !this.heldKeys.attack2 && !this.sleeping && !this.isHit){
            this.walkRight();
        }
        if(this.heldKeys.left && !this.heldKeys.right && !this.isHit && !this.heldKeys.attack1 && !this.heldKeys.attack2 && !this.sleeping && !this.isHit){
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
        if(this.canBasicAttack && !this.sleeping){
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
        if(this.canBasicAttack && !this.sleeping){
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

          if(this.basicAttackFrames <= 0){
              this.basicAttackFrames = 25;
              this.canAAttack[A] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByA[A] = false;
          }
      }

      if(!this.canAAttack[FA]){
          this.basicAttackFrames-=1;
          if(this.basicAttackFrames <= 0){
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
          if(this.basicAttackFrames <= 0){
              this.basicAttackFrames = 25;
              this.canAAttack[DA] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByA[DA] = false;
          }
      }

      if(!this.canAAttack[UA]){
          this.basicAttackFrames-=1;
          if(this.basicAttackFrames <= 0){
              this.basicAttackFrames = 25;
              this.canAAttack[UA] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByA[UA] = false;
          }
      }

      if(!this.canAAttack[NA]){
          this.basicAttackFrames-=1;
          if(this.basicAttackFrames <= 0){
              this.basicAttackFrames = 25;
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
          if(this.basicAttackFrames <= 0){
              this.basicAttackFrames = 25;
              this.canBAttack[SS] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByB[SS] = false;
          }
      }

      if(!this.canBAttack[US]){
          this.basicAttackFrames-=1;
          if(this.basicAttackFrames <= 0){
              this.basicAttackFrames = 25;
              this.canBAttack[US] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByB[US] = false;
          }
      }
      if(!this.canBAttack[DS]){
          this.sleeping = true;
          this.basicAttackFrames-=1;

          var c = ((this.specialAttackObj.attackFrames[DS]-this.basicAttackFrames)/this.specialAttackObj.attackFrames[DS]);
          this.zs.position.set(this.x-5,this.y+5,this.z);
          if(c < 0.25){
            this.model.rotation.z = 4*c*1.57;
          }
          var kd = 6;
          if(this.basicAttackFrames > this.specialAttackObj.attackFrames[DS] - 5){
            if((this.x <= this.otherPlayer.x + kd && this.x >= this.otherPlayer.x-kd) && (this.y <= this.otherPlayer.y +kd && this.y >= this.otherPlayer.y-kd) && (this.z <= this.otherPlayer.z +kd && this.z >= this.otherPlayer.z-kd)){
                if(this.isPlayer1){
                    player1Info.damageDealt+=130;
                }
                else{
                    player2Info.damageDealt+=130;
                }
              this.otherPlayer.percentage += 130;
              this.checkHit(DS,"B");
            }
          }

          this.model.head.leftEye.scale.y = 0.1;
          this.model.head.rightEye.scale.y = 0.1;

          if(this.basicAttackFrames <= 0){
              this.model.rotation.z = 0;
              this.model.head.leftEye.scale.y = 1;
              this.model.head.rightEye.scale.y = 1;
              this.sleeping = false;
              this.zs.position.set(stage.maximumX + 300, stage.maximumY + 300, 0);
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
        var attackCast = false;
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
              attackCast = true;
              newAttackFrame = this.basicAttackObj.attackFrames[FA];
              this.canAAttack[FA] = false;
              this.canBasicAttack = false;
            }
        }
        if(this.facingL && this.heldKeys.left && this.heldKeys.attack1 && !this.onGround && this.canBasicAttack){
          if(this.canAAttack[FA] == true){
              attackCast = true;
              newAttackFrame = this.basicAttackObj.attackFrames[FA];
              this.canAAttack[FA] = false;
              this.canBasicAttack = false;
            }
        }
        if(this.facingL && this.heldKeys.right && this.heldKeys.attack1 && !this.onGround && this.canBasicAttack){
          if(this.canAAttack[BA] == true){
              attackCast = true;
            newAttackFrame = this.basicAttackObj.attackFrames[BA];
            this.canAAttack[BA] = false;
            this.canBasicAttack = false;
          }
        }
        if(this.facingR && this.heldKeys.left && this.heldKeys.attack1 && !this.onGround && this.canBasicAttack){
          if(this.canAAttack[BA] == true){
              attackCast = true;
            newAttackFrame = this.basicAttackObj.attackFrames[BA];
            this.canAAttack[BA] = false;
            this.canBasicAttack = false;
          }
        }
        if(this.heldKeys.down && this.heldKeys.attack1 && !this.onGround && this.canBasicAttack){
          if(this.canAAttack[DA] == true){
              attackCast = true;
            newAttackFrame = this.basicAttackObj.attackFrames[DA];
            this.canAAttack[DA] = false;
            this.canBasicAttack = false;
          }
        }
        if(this.heldKeys.up && this.heldKeys.attack1 && !this.onGround && this.canBasicAttack){
          if(this.canAAttack[UA] == true){
              attackCast = true;
            newAttackFrame = this.basicAttackObj.attackFrames[UA];
            this.canAAttack[UA] = false;
            this.canBasicAttack = false;
          }
        }
        if(!this.heldKeys.left && !this.heldKeys.right && !this.heldKeys.up && !this.heldKeys.down && this.heldKeys.attack1 && !this.onGround && this.canBasicAttack){
            if(this.canAAttack[NA] == true){
                attackCast = true;
              newAttackFrame = this.basicAttackObj.attackFrames[NA];
              this.canAAttack[NA] = false;
              this.canBasicAttack = false;
          }
        }

        //basic attack ground
        if(this.heldKeys.attack1 && this.onGround && this.canBasicAttack){
            if(this.canAAttack[A] == true){
                attackCast = true;
             newAttackFrame = this.basicAttackObj.attackFrames[A];
             this.canAAttack[A] = false;
             this.canBasicAttack = false;
          }
        }

        //special attacks
        if((this.heldKeys.right || this.heldKeys.left) && this.heldKeys.attack2 && this.canBasicAttack){
          if(this.canBAttack[SS] == true){
              attackCast = true;
           newAttackFrame = this.specialAttackObj.attackFrames[SS];
           this.canBAttack[SS] = false;
           this.canBasicAttack = false;
        }


        }
        if((!this.heldKeys.down && !this.heldKeys.up && !this.heldKeys.left && !this.heldKeys.right) && this.heldKeys.attack2 && this.canBasicAttack){
          if(this.canBAttack[S] == true){
              attackCast = true;
             newAttackFrame = this.specialAttackObj.attackFrames[S];
             this.canBAttack[S] = false;
             this.canBasicAttack = false;
          }

        }
        if(this.heldKeys.down && this.heldKeys.attack2 && this.canBasicAttack){
          if(this.canBAttack[DS] == true){
              attackCast = true;
             newAttackFrame = this.specialAttackObj.attackFrames[DS];
             this.canBAttack[DS] = false;
             this.canBasicAttack = false;
          }
        }
        if(this.heldKeys.up && this.heldKeys.attack2 && this.canBasicAttack){
            if(this.canBAttack[US] == true){
                attackCast = true;
             newAttackFrame = this.specialAttackObj.attackFrames[US];
             this.canBAttack[US] = false;
             this.canBasicAttack = false;
          }
      }

      this.basicAttackFrames = newAttackFrame;

      if(attackCast){
          if(this.isPlayer1){
              player1Info.totalAttacksCast +=1;
          }
          else{
              player2Info.totalAttacksCast +=1;
          }
      }

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
          if(this.isPlayer1){
              player1Info.totalAttacksHit += 1;
          }
          else{
              player2Info.totalAttacksHit += 1;
          }
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
          if(this.isPlayer1){
              player1Info.totalAttacksHit += 1;
          }
          else{
              player2Info.totalAttacksHit += 1;
          }
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
           if(this.isPlayer1){
               player1Info.damageDealt+=damageToDeal;
           }
           else{
               player2Info.damageDealt+=damageToDeal;
           }
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

function createZ(stage, x, y, z) {

  /*
    z18z17z16
        z15
       z14
    z13z12z11
  */
    var zMesh = new THREE.Mesh();
    var z1 = new THREE.Mesh();

    var z11 = particles.particlePalette.sleepPiece.clone();
    z1.add(z11);
    z11.position.x += 2;
    var z12 = particles.particlePalette.sleepPiece.clone();
    z1.add(z12);
    var z13 = particles.particlePalette.sleepPiece.clone();
    z1.add(z13);
    z13.position.x -= 2;
    var z14 = particles.particlePalette.sleepPiece.clone();
    z1.add(z14);
    z14.position.x -= 1.2;
    z14.position.y += 2;
    var z15 = particles.particlePalette.sleepPiece.clone();
    z1.add(z15);
    z15.position.x += 1.2;
    z15.position.y += 4;
    var z16 = particles.particlePalette.sleepPiece.clone();
    z1.add(z16);
    z16.position.x += 2;
    z16.position.y += 6;
    var z17 = particles.particlePalette.sleepPiece.clone();
    z1.add(z17);
    z17.position.y += 6;
    var z18 = particles.particlePalette.sleepPiece.clone();
    z1.add(z18);
    z18.position.x -= 2;
    z18.position.y += 6;

    z2 = z1.clone();
    z3 = z1.clone();

    z1.scale.set(0.3,0.3,0.3);
    zMesh.add(z1);
    z2.scale.set(0.45,0.45,0.45);
    zMesh.add(z2);
    z2.position.set(-1.4,2.5,0);
    z3.scale.set(0.55,0.55,0.55);
    zMesh.add(z3);
    z3.position.set(1.8,7.2,0);


    stage.scene.add(zMesh);

    zMesh.position.set(x,y,z);
    return zMesh;
}

function createMusic(stage, x, y, z) {
    var arrToReturn = [];
    for(var i = 0; i < 27; i++) {
        var temp = particles.particlePalette.musicPiece.clone();

        arrToReturn.push(temp);
        stage.scene.add(temp);
    }
    return arrToReturn;
}
