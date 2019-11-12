var basicCharacter = {
    x: 0,
    y: 10,
    z: 0,
    xVel: 0,
    yVel: 0,
    movingR: false,
    movingL: false,
    jumping: false,
    model: createBasicCharacterMesh(0, 0, 0),
    hitBox: createBasicCharacterBounding(0, 0, 0),
    hitBoxEnabled: false,
    canJump: true,
    jumpCt: 0,
    maxJumpCt: 2,
    jumpSpeed: 1.8,
    walkSpeed: 1,
    onGround: true,
    minDown: 0,
    minLeft: -10,
    minRight: 10,
    update: function(){

        // checks and sets the lowsest current point
        if(boxBelow != undefined){
            this.minDown = boxBelow.position.y + 10;
        }
        else{
            this.minDown = -100;
        }

        if(boxLeft != undefined){
            this.minLeft = boxLeft.position.x + 10;
        }
        else{
            this.minLeft = -100;
        }

        if(boxRight != undefined){
            this.minRight = boxRight.position.x-10;
        }
        else{
            this.minRight = 100;
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
          this.xVel = this.xVel*0.8;
        }
        if(!this.movingR && !this.movingL && !this.onGround){
          this.xVel = this.xVel*0.98;
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
        if(this.y < -40){
          // alert("you died");
          this.y = 10;
          this.x = 0;
        }
        if(this.x < this.minLeft){
          this.x = this.minLeft;
        }
        if(this.x > this.minRight){
          this.x = this.minRight;
        }
        // if(this.x < -50){
        //   this.x = -50;
        // }
        // if(this.x > 50){
        //   this.x = 50;
        // }


        //updates models position and hitbox
        this.model.position.set(this.x, this.y, 0);
        this.hitBox.position.set(this.x, this.y, 0);



    }
}
