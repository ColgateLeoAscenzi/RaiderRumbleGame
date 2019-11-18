//character2
var pingu = {
    x: 10,
    //0.1 is a smoothing factor added for the rays
    // y: 10.1,
    y: 10,
    z: 0,
    height: 10,
    width: 10,
    xVel: 0,
    yVel: 0,
    stock: 3,
    weight: 10,
    percentage: 0,
    isHit: false,
    movingR: false,
    movingL: false,
    jumping: false,
    facingR: false,
    facingL: false,
    model: createPinguMesh(0, 0, 0),
    hitBox: createBasicCharacterBounding(0, 0, 0),
    hitBoxEnabled: false,
    canJump: true,
    jumpCt: 0,
    maxJumpCt: 3,
    jumpSpeed: 1.6,
    walkSpeed: 1.2,
    onGround: true,
    minDown: -100,
    minLeft: -100,
    minRight: 100,
    minUp: 100,
    boxBelow: undefined,
    boxAbove: undefined,
    boxLeft: undefined,
    boxRight:undefined,
    canBasicAttack: true,
    basicAttackFrames: 25,
    basicAttackModel: createBasicAttackModel(),
    walkStyle1: true,
    canMove: false,
    update: function(){
        //this.model.children[2].position.x = this.x*2;

        // checks and sets the lowsest current point
        if(this.boxBelow != undefined){
            this.minDown = this.boxBelow.position.y + 10/2 + this.height/2;
        }
        else{
            this.minDown = -1000;
        }

        if(this.boxLeft != undefined){
            this.minLeft = this.boxLeft.position.x + 10/2 + this.width/2;
        }
        else{
            this.minLeft = -1000;
        }

        if(this.boxRight != undefined){
            this.minRight = this.boxRight.position.x-10/2 - this.width/2;
        }
        else{
            this.minRight = 1000;
        }

        if(this.boxAbove != undefined){
          this.minUp = this.boxAbove.position.y - 10/2 - this.height/2;
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

        if(this.y < -40){
          // alert("you died");
          this.y = 10;
          this.x = 10;
          this.xVel = 0;
          this.yVel = 0;
          this.stock-=1;
          this.percentage = 0;
        }
        //updates models position and hitbox
        this.model.position.set(this.x, this.y, 0);
        this.hitBox.position.set(this.x, this.y, 0);




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

        // //head reset
        // this.model.head.rotation.z = 0;
        // this.model.head.rotation.y = 0;
        //body reset
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
  basicAttack: function(){

      if(this.canBasicAttack){
          var attackBox = this.basicAttackModel.clone();
          if(this.facingL){
              attackBox.position.set(this.x-10, this.y, this.z);
              //HARDED CODED CHANGE THIS
              if(stage.player1.x < this.x && stage.player1.x > this.x - 20){
                  if(stage.player1.y > this.y - this.height/2 && stage.player1.y < this.y +this.height/2){
                      stage.player1.percentage += 5;
                      stage.player1.xVel = stage.player1.percentage*-0.1;
                      stage.player1.yVel = stage.player1.percentage*0.1*0.33;
                      stage.player1.isHit = true;
                  }
              }
          }
          else{
              attackBox.position.set(this.x+10, this.y, this.z);
              if(stage.player1.x > this.x && stage.player1.x < this.x + 20){
                  if(stage.player1.y > this.y - this.height/2 && stage.player1.y < this.y +this.height/2){
                      stage.player1.percentage += 5;
                      stage.player1.xVel = stage.player1.percentage*0.1;
                      stage.player1.yVel = stage.player1.percentage*0.1*0.33;
                      stage.player1.isHit = true;
                  }
              }
          }
          stage.scene.add(attackBox);
          setTimeout(function(){stage.scene.remove(attackBox);}, 100);

          this.canBasicAttack = false;

      }

  }
}
