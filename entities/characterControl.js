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

        //DO ALL MOTION HEREE
        if(this.heldKeys.up && this.heldKeys.attack2 && this.canRecover && !this.isRecover){
          this.recover();
          this.canJump = false;
        }

        //dampen left and right movement on floor
        if(!this.movingR && !this.movingL && this.onGround){
          this.xVel = this.xVel*0.7;
        }
        if(!this.movingR && !this.movingL && !this.onGround){
          this.xVel = this.xVel*0.98;
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
      if((this.movingR || this.movingL) && this.xVel != 0){
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
        if(this.canBasicAttack){
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
      this.xVel = this.walkSpeed;
    },
    walkLeft: function(){
      this.movingL = true;
      this.facingL = true;
      this.facingR = false;
      this.xVel = -this.walkSpeed;
    },
    jump: function(){
      if(this.jumpCt == this.maxJumpCt){
        this.canJump = false;
      }
      if(this.canJump){
        this.jumpCt+=1;
        this.yVel = this.jumpSpeed;
        this.onGround = false;
      }
    },
    drop: function(){

    },
    recover: function(){
      this.isRecover = true;
      this.yVel = 4;
      this.canRecover = false;
    },
    basicAttack: function(){
        //keeping track

        if(this.canBasicAttack){
            var attackBox = this.basicAttackModel.clone();
            if(this.facingL){
                attackBox.position.set(this.x-10, this.y, this.z);
                if(this.otherPlayer.x < this.x && this.otherPlayer.x > this.x - 20){
                    if(this.otherPlayer.y > this.y - this.height/2 && this.otherPlayer.y < this.y +this.height/2){
                        this.otherPlayer.percentage += 5;
                        this.otherPlayer.xVel = this.otherPlayer.percentage*-0.1;
                        this.otherPlayer.yVel = this.otherPlayer.percentage*0.1*0.33;
                        this.otherPlayer.isHit = true;
                    }
                }
            }
            else{
                attackBox.position.set(this.x+10, this.y, this.z);
                if(this.otherPlayer.x > this.x && this.otherPlayer.x < this.x + 20){
                    if(this.otherPlayer.y > this.y - this.height/2 && this.otherPlayer.y < this.y +this.height/2){
                        this.otherPlayer.percentage += 5;
                        this.otherPlayer.xVel = this.otherPlayer.percentage*0.1;
                        this.otherPlayer.yVel = this.otherPlayer.percentage*0.1*0.33;
                        this.otherPlayer.isHit = true;
                    }
                }
            }
            stage.scene.add(attackBox);
            setTimeout(function(){stage.scene.remove(attackBox);}, 100);

            this.canBasicAttack = false;

        }

    },
    specialAttack: function(){
        //keeping track

        if(this.canBasicAttack){
            var attackBox = this.basicAttackModel.clone();
            if(this.facingL){
                attackBox.position.set(this.x-10, this.y, this.z);
                if(this.otherPlayer.x < this.x && this.otherPlayer.x > this.x - 20){
                    if(this.otherPlayer.y > this.y - this.height/2 && this.otherPlayer.y < this.y +this.height/2){
                        this.otherPlayer.percentage += 5;
                        this.otherPlayer.xVel = this.otherPlayer.percentage*-0.1;
                        this.otherPlayer.yVel = this.otherPlayer.percentage*0.1*0.33;
                        this.otherPlayer.isHit = true;
                    }
                }
            }
            else{
                attackBox.position.set(this.x+10, this.y, this.z);
                if(this.otherPlayer.x > this.x && this.otherPlayer.x < this.x + 20){
                    if(this.otherPlayer.y > this.y - this.height/2 && this.otherPlayer.y < this.y +this.height/2){
                        this.otherPlayer.percentage += 5;
                        this.otherPlayer.xVel = this.otherPlayer.percentage*0.1;
                        this.otherPlayer.yVel = this.otherPlayer.percentage*0.1*0.33;
                        this.otherPlayer.isHit = true;
                    }
                }
            }
            stage.scene.add(attackBox);
            setTimeout(function(){stage.scene.remove(attackBox);}, 100);

            this.canBasicAttack = false;

        }

    }
}
