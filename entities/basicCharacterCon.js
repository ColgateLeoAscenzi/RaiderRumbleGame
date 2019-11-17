var basicCharacter = {
    x: 0,
    //0.1 is a smoothing factor added for the rays
    // y: 10.1,
    y: 10,
    z: 0,
    height: 10,
    width: 10,
    xVel: 0,
    yVel: 0,
    movingR: false,
    movingL: false,
    jumping: false,
    facingR: false,
    facingL: false,
    model: createBasicCharacterMesh(0, 0, 0),
    hitBox: createBasicCharacterBounding(0, 0, 0),
    hitBoxEnabled: false,
    canJump: true,
    jumpCt: 0,
    maxJumpCt: 2,
    jumpSpeed: 1.8,
    walkSpeed: 1,
    onGround: true,
    minDown: -100,
    minLeft: -100,
    minRight: 100,
    minUp: 100,
    timeTick: 0,
    walkStyle1: true,
    update: function(){
      this.timeTick += 1;
        //this.model.children[2].position.x = this.x*2;

        // checks and sets the lowsest current point
        if(boxBelow != undefined){
            this.minDown = boxBelow.position.y + 10/2 + player1.height/2;
        }
        else{
            this.minDown = -1000;
        }

        if(boxLeft != undefined){
            this.minLeft = boxLeft.position.x + 10/2 + player1.width/2;
        }
        else{
            this.minLeft = -1000;
        }

        if(boxRight != undefined){
            this.minRight = boxRight.position.x-10/2 - player1.width/2;
        }
        else{
            this.minRight = 1000;
        }

        if(boxAbove != undefined){
          this.minUp = boxAbove.position.y - 10/2 - player1.height/2;
        }
        else{
          this.minUp = 100000;
        }


        if(this.hitBoxEnabled){
            this.hitBox.position.x = this.x;
            this.hitBox.position.y = this.y;
            this.hitBox.position.z = this.z;
            scene.add(this.hitBox);
        }
        else{
            scene.remove(this.hitBox);
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
          this.x = 0;
          this.xVel = 0;
          this.yVel = 0;
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
          this.model.torso.rightLeg.position.y = -3 + 0.5*Math.sin(this.timeTick*0.5);
          this.model.torso.leftLeg.position.y =  -3 - 0.5*Math.sin(this.timeTick*0.5);
        }
        else if(this.walkStyle2){
          this.model.torso.rightLeg.rotation.x = 0.3*Math.sin(this.timeTick*0.5);
          this.model.torso.leftLeg.rotation.x = - 0.3*Math.sin(this.timeTick*0.5);
        }
        else if(this.walkStyle3){
          this.model.torso.rightLeg.position.y = -3 + 0.5*Math.sin(this.timeTick*0.2);
          this.model.torso.leftLeg.position.y =  -3 - 0.5*Math.sin(this.timeTick*0.2);
          this.model.rotation.z = 0.1*Math.sin(this.timeTick*0.2);

        }

        //arm changes
        this.model.torso.rightArm.rotation.x = 0.3*Math.sin(this.timeTick*0.5);
        this.model.torso.leftArm.rotation.x = - 0.3*Math.sin(this.timeTick*0.5);
        //
        // //headchanges
        // this.model.head.rotation.z = 0.08*Math.sin(this.timeTick*0.2);
        // this.model.head.rotation.y = 0.08*Math.sin(this.timeTick*0.2);
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
        this.model.rotation.z = 0;
      }

      //blinking
      if(this.timeTick%500 == 0){
        this.model.head.rightEye.scale.set(1,0.2,1);
        this.model.head.leftEye.scale.set(1,0.2,1);
      }
      else{
        this.model.head.rightEye.scale.set(1,1,1);
        this.model.head.leftEye.scale.set(1,1,1);
      }




      // console.log(this.model.torso.leg.position.y);

    }
}
