var basicCharacter = {
    model: createBasicCharacterMesh(0,0,0),
    hitBox: createBasicCharacterBounding(0,0,0),
    basicAttackModel: createBasicAttackModel(),
    init: function(){
        var keys = Object.keys(charProto);
        for(var i = 0; i < keys.length; i++){
            this[keys[i]] = charProto[keys[i]];
        }
        //spawn location
        this.x = -10;
        this.y = 10;
        this.name = "Raider"

        this.heldKeys = {up: false, down: false, left: false, right: false, attack1: false,
        attack2: false}

        this.basicAttackObj = raiderBasic;
        this.specialAttackObj = raiderSpecial;
        this.damageDeal = 0;


    },
    update: function(){
        // checks and sets the lowsest current point
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

        if(this.hitBoxEnabled){
            this.hitBox.position.x = this.x;
            this.hitBox.position.y = this.y;
            this.hitBox.position.z = this.z;
            stage.scene.add(this.hitBox);
        }
        else{
            stage.scene.remove(this.hitBox);
        }

        if(this.isHit){
          this.hitFrames -= 1;
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


        //other held keys
        if(this.heldKeys.up && this.heldKeys.attack2 && this.canRecover && !this.isRecover){
          this.recover();
          this.canJump = false;
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
          this.hitBox.position.set(this.x, this.y, 0);
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
        if(this.canBasicAttack){
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
        if(this.canBasicAttack && !this.isHit){
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


      if(!this.canBasicAttack){
          this.basicAttackFrames-=1;
          this.model.rotation.z -= 0.4;


          if(this.basicAttackFrames == 0){
              this.basicAttackFrames = 25;
              this.canBasicAttack = true;
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
      if(this.jumpCt == this.maxJumpCt){
        this.canJump = false;
      }
      if(this.canJump){
        this.jumpCt+=1;
        this.yVel = this.jumpSpeed;
        this.onGround = false;
        this.isHit = false;
      }
    },
    drop: function(){
    },
    recover: function(){
      this.isRecover = true;
      this.yVel = 4;
      this.canRecover = false;
      this.isHit = false;
    },
    doAnyAttack: function(){
      //DO ALL MOTION HEREE
      var tKnockback = 0;
      var damageToDeal = 0;
      var angleToApply = 0;
      var newAttackFrame = 0;

      if(this.heldKeys.up && this.heldKeys.attack2 && this.canRecover && !this.isRecover){
        this.recover();
        this.canJump = false;
      }

      var attackBox = this.basicAttackObj.attackHitBox.clone();
      // attackBox.position.set(this.x+5, this.y, this.z);

      //basic attack air
      if(this.facingR && this.heldKeys.right && this.heldKeys.attack1 && !this.onGround){
          console.log("Forward Air");
          damageToDeal = this.basicAttackObj.damage[FA];
          angleToApply = this.basicAttackObj.launchAngle[FA];
          newAttackFrame = this.basicAttackObj.attackFrames[FA];
          tKnockback = calculateKnockback(this.otherPlayer.percentage, this.basicAttackObj.damage[FA],
              this.otherPlayer.weight,this.basicAttackObj.scaling, this.basicAttackObj.knockback);

          attackBox = this.basicAttackObj.attackHitBox.clone();
          attackBox.position.set(this.x+10, this.y, this.z);
          if(this.otherPlayer.x > this.x && this.otherPlayer.x < this.x + 20){
              if(this.otherPlayer.y > this.y - this.height/2 && this.otherPlayer.y < this.y +7*this.height/10){
                this.otherPlayer.isHit = true;
              }
          }

      }
      if(this.facingL && this.heldKeys.left && this.heldKeys.attack1 && !this.onGround){
          console.log("Forward Air");
          damageToDeal = this.basicAttackObj.damage[FA];
          angleToApply = this.basicAttackObj.launchAngle[FA];
          newAttackFrame = this.basicAttackObj.attackFrames[FA];
         tKnockback = calculateKnockback(this.otherPlayer.percentage, this.basicAttackObj.damage[FA],
             this.otherPlayer.weight,this.basicAttackObj.scaling, this.basicAttackObj.knockback);

          attackBox = this.basicAttackObj.attackHitBox.clone();
          attackBox.position.set(this.x-10, this.y, this.z);
          if(this.otherPlayer.x < this.x && this.otherPlayer.x > this.x - 20){
              if(this.otherPlayer.y > this.y - this.height/2 && this.otherPlayer.y < this.y +7*this.height/10){
                this.otherPlayer.isHit = true;
              }
          }
      }
      if(this.facingL && this.heldKeys.right && this.heldKeys.attack1 && !this.onGround){
          console.log("Back Air");
          damageToDeal = this.basicAttackObj.damage[BA];
          angleToApply = this.basicAttackObj.launchAngle[BA];
          newAttackFrame = this.basicAttackObj.attackFrames[BA];
          tKnockback = calculateKnockback(this.otherPlayer.percentage, this.basicAttackObj.damage[BA],
              this.otherPlayer.weight,this.basicAttackObj.scaling, this.basicAttackObj.knockback);

          attackBox = this.basicAttackObj.attackHitBox.clone();
          attackBox.position.set(this.x+10, this.y, this.z);
          if(this.otherPlayer.x > this.x && this.otherPlayer.x < this.x + 20){
              if(this.otherPlayer.y > this.y - this.height/2 && this.otherPlayer.y < this.y +7*this.height/10){
                this.otherPlayer.isHit = true;
              }
          }
      }
      if(this.facingR && this.heldKeys.left && this.heldKeys.attack1 && !this.onGround){
          console.log("Back Air");
          damageToDeal = this.basicAttackObj.damage[BA];
          angleToApply = this.basicAttackObj.launchAngle[BA];
          newAttackFrame = this.basicAttackObj.attackFrames[BA];
          tKnockback = calculateKnockback(this.otherPlayer.percentage, this.basicAttackObj.damage[BA],
              this.otherPlayer.weight,this.basicAttackObj.scaling, this.basicAttackObj.knockback);

          attackBox = this.basicAttackObj.attackHitBox.clone();
          attackBox.position.set(this.x-10, this.y, this.z);
          if(this.otherPlayer.x < this.x && this.otherPlayer.x > this.x - 20){
              if(this.otherPlayer.y > this.y - this.height/2 && this.otherPlayer.y < this.y +7*this.height/10){
                this.otherPlayer.isHit = true;
              }
          }
      }
      if(this.heldKeys.down && this.heldKeys.attack1 && !this.onGround){
          console.log("Down Air");
          damageToDeal = this.basicAttackObj.damage[DA];
          angleToApply = this.basicAttackObj.launchAngle[DA];
          newAttackFrame = this.basicAttackObj.attackFrames[DA];
          tKnockback = calculateKnockback(this.otherPlayer.percentage, this.basicAttackObj.damage[DA],
              this.otherPlayer.weight,this.basicAttackObj.scaling, this.basicAttackObj.knockback);

          attackBox = this.basicAttackObj.attackHitBox.clone();
          attackBox.position.set(this.x, this.y-10, this.z);
          if(this.otherPlayer.x > this.x - this.width/2 && this.otherPlayer.x < this.x + this.width/2){
              if(this.otherPlayer.y < this.y - this.height/2 && this.otherPlayer.y > this.y - 20){
                this.otherPlayer.isHit = true;
              }
          }
      }
      if(this.heldKeys.up && this.heldKeys.attack1 && !this.onGround){
          console.log("Up Air");
          damageToDeal = this.basicAttackObj.damage[UA];
          angleToApply = this.basicAttackObj.launchAngle[UA];
          newAttackFrame = this.basicAttackObj.attackFrames[UA];
          tKnockback = calculateKnockback(this.otherPlayer.percentage, this.basicAttackObj.damage[UA],
              this.otherPlayer.weight,this.basicAttackObj.scaling, this.basicAttackObj.knockback);

          attackBox = this.basicAttackObj.attackHitBox.clone();
          attackBox.position.set(this.x, this.y+10, this.z);
          if(this.otherPlayer.x > this.x - this.width/2 && this.otherPlayer.x < this.x + this.width/2){
              if(this.otherPlayer.y > this.y + this.height/2 && this.otherPlayer.y < this.y + 20){
                this.otherPlayer.isHit = true;
              }
          }
      }
      if(!this.heldKeys.left && !this.heldKeys.right && !this.heldKeys.up && !this.heldKeys.down && this.heldKeys.attack1 && !this.onGround){
          console.log("Neutral Air");
         damageToDeal = this.basicAttackObj.damage[NA];
         angleToApply = this.basicAttackObj.launchAngle[NA];
         newAttackFrame = this.basicAttackObj.attackFrames[NA];
         tKnockback = calculateKnockback(this.otherPlayer.percentage, this.basicAttackObj.damage[NA],
             this.otherPlayer.weight,this.basicAttackObj.scaling, this.basicAttackObj.knockback);

        attackBox = this.basicAttackObj.attackHitBox.clone();
        attackBox.position.set(this.x, this.y, this.z);
        attackBox.scale.set(1.5,1.5,1.5);
        if(this.otherPlayer.x > this.x && this.otherPlayer.x < this.x){
            if(this.otherPlayer.y > this.y - this.height/2 && this.otherPlayer.y < this.y +this.height/2){
              this.otherPlayer.isHit = true;
            }
        }
      }

      //basic attack ground
      if(this.heldKeys.attack1 && this.onGround){
         console.log("Basic");
         damageToDeal = this.basicAttackObj.damage[A];
         angleToApply = this.basicAttackObj.launchAngle[A];
         newAttackFrame = this.basicAttackObj.attackFrames[A];
         tKnockback = calculateKnockback(this.otherPlayer.percentage, this.basicAttackObj.damage[A],
             this.otherPlayer.weight,this.basicAttackObj.scaling, this.basicAttackObj.knockback);

        attackBox = this.basicAttackObj.attackHitBox.clone();
        if(this.facingL){
          attackBox.position.set(this.x-10, this.y, this.z);
          if(this.otherPlayer.x < this.x && this.otherPlayer.x > this.x - 20){
              if(this.otherPlayer.y > this.y - this.height/2 && this.otherPlayer.y < this.y +7*this.height/10){
                this.otherPlayer.isHit = true;
              }
          }
        }
        else if(this.facingR){
          attackBox.position.set(this.x+10, this.y, this.z);
          if(this.otherPlayer.x > this.x && this.otherPlayer.x < this.x + 20){
              if(this.otherPlayer.y > this.y - this.height/2 && this.otherPlayer.y < this.y +7*this.height/10){
                this.otherPlayer.isHit = true;
              }
          }
        }
        else{
          attackBox.position.set(this.x, this.y, this.z);
          attackBox.scale.set(1.5,1.5,1.5);
          if(this.otherPlayer.x > this.x - this.height/2 && this.otherPlayer.x < this.x + this.width/2){
              if(this.otherPlayer.y > this.y - this.height/2 && this.otherPlayer.y < this.y +7*this.height/10){
                this.otherPlayer.isHit = true;
              }
          }
        }
      }

      //special attacks
      if((this.heldKeys.right || this.heldKeys.left) && this.heldKeys.attack2){
         console.log("Side Special");
         damageToDeal = this.specialAttackObj.damage[SS];
         angleToApply = this.specialAttackObj.launchAngle[SS];
         newAttackFrame = this.specialAttackObj.attackFrames[SS];
         tKnockback = calculateKnockback(this.otherPlayer.percentage, this.specialAttackObj.damage[SS],
             this.otherPlayer.weight,this.specialAttackObj.scaling, this.specialAttackObj.knockback);

        attackBox = this.specialAttackObj.attackHitBox.clone();
        if(this.otherPlayer.x > this.x && this.otherPlayer.x < this.x + 20){
            if(this.otherPlayer.y > this.y - this.height/2 && this.otherPlayer.y < this.y +7*this.height/10){
              this.otherPlayer.isHit = true;
            }
        }
        if(this.facingL){
          attackBox.position.set(this.x-15, this.y, this.z);
          if(this.otherPlayer.x < this.x && this.otherPlayer.x > this.x - 10){
              if(this.otherPlayer.y > this.y - this.height/2 - 5 && this.otherPlayer.y < this.y +this.height/2 + 5){
                  this.otherPlayer.isHit = true;
              }
          }
        }
        else if(this.facingR){
          attackBox.position.set(this.x+15, this.y, this.z);
          if(this.otherPlayer.x > this.x && this.otherPlayer.x < this.x + 10){
              if(this.otherPlayer.y > this.y - this.height/2 -5 && this.otherPlayer.y < this.y +this.height/2 + 5){
                  this.otherPlayer.isHit = true;
              }
          }
        }
        else{
          attackBox.position.set(this.x, this.y, this.z);
          if(this.otherPlayer.x > this.x - this.width/4 && this.otherPlayer.x < this.x + this.width/4){
              if(this.otherPlayer.y > this.y - this.height/2 -5 && this.otherPlayer.y < this.y +this.height/2 + 5){
                  this.otherPlayer.isHit = true;
              }
          }
        }


      }
      if((!this.heldKeys.down && !this.heldKeys.up && !this.heldKeys.left && !this.heldKeys.right) && this.heldKeys.attack2){
         console.log("Neutral Special");
         damageToDeal = this.specialAttackObj.damage[S];
         angleToApply = this.specialAttackObj.launchAngle[S];
         newAttackFrame = this.specialAttackObj.attackFrames[S];
         tKnockback = calculateKnockback(this.otherPlayer.percentage, this.specialAttackObj.damage[S],
             this.otherPlayer.weight,this.specialAttackObj.scaling, this.specialAttackObj.knockback);

        attackBox = this.specialAttackObj.attackHitBox.clone();
        attackBox.position.set(this.x+10, this.y, this.z);

        if(this.facingL){
          attackBox.position.set(this.x-5, this.y, this.z);
          if(this.otherPlayer.x < this.x && this.otherPlayer.x > this.x - 10){
              if(this.otherPlayer.y > this.y - this.height/2 - 5 && this.otherPlayer.y < this.y +this.height/2 + 5){
                  this.otherPlayer.isHit = true;
              }
          }
        }
        else if(this.facingR){
          attackBox.position.set(this.x+5, this.y, this.z);
          if(this.otherPlayer.x > this.x && this.otherPlayer.x < this.x + 10){
              if(this.otherPlayer.y > this.y - this.height/2 -5 && this.otherPlayer.y < this.y +this.height/2 + 5){
                  this.otherPlayer.isHit = true;
              }
          }
        }
        else{
          attackBox.position.set(this.x, this.y, this.z);
          if(this.otherPlayer.x > this.x - this.width/4 && this.otherPlayer.x < this.x + this.width/4){
              if(this.otherPlayer.y > this.y - this.height/2 -5 && this.otherPlayer.y < this.y +this.height/2 + 5){
                  this.otherPlayer.isHit = true;
              }
          }
        }

      }
      if(this.heldKeys.down && this.heldKeys.attack2){
         console.log("Down Special");
         damageToDeal = this.specialAttackObj.damage[DS];
         angleToApply = this.specialAttackObj.launchAngle[DS];
         newAttackFrame = this.specialAttackObj.attackFrames[DS];
         tKnockback = calculateKnockback(this.otherPlayer.percentage, this.specialAttackObj.damage[DS],
             this.otherPlayer.weight,this.specialAttackObj.scaling, this.specialAttackObj.knockback);

        attackBox = this.specialAttackObj.attackHitBox.clone();
        attackBox.position.set(this.x, this.y-10, this.z);
        attackBox.rotation.z = -1.57;
        if(this.otherPlayer.x > this.x - this.width/2 && this.otherPlayer.x < this.x + this.width/2){
            if(this.otherPlayer.y > this.y - this.height/2 - 15 && this.otherPlayer.y < this.y - this.height/2){
              this.otherPlayer.isHit = true;
            }
        }
      }
      if(this.heldKeys.up && this.heldKeys.attack2){
         console.log("Up Special");
         damageToDeal = this.specialAttackObj.damage[US];
         angleToApply = this.specialAttackObj.launchAngle[US];
         newAttackFrame = this.specialAttackObj.attackFrames[DS];
         tKnockback = calculateKnockback(this.otherPlayer.percentage, this.specialAttackObj.damage[US],
             this.otherPlayer.weight,this.specialAttackObj.scaling, this.specialAttackObj.knockback);

        attackBox = this.specialAttackObj.attackHitBox.clone();
        attackBox.position.set(this.x, this.y+10, this.z);
        attackBox.rotation.z = -1.57;
        if(this.otherPlayer.x > this.x - this.width/2 && this.otherPlayer.x < this.x + this.width/2){
            if(this.otherPlayer.y < this.y + this.height/2 + 15 && this.otherPlayer.y > this.y + 3*this.height/2){
              this.otherPlayer.isHit = true;
            }
        }
      }

      stage.scene.add(attackBox);
      setTimeout(function(){stage.scene.remove(attackBox);}, 100);

      this.canBasicAttack = false;



      this.basicAttackFrames = newAttackFrame;


      //ADDING THE KNOCKBACK
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


       if(this.otherPlayer.isHit){
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

}
