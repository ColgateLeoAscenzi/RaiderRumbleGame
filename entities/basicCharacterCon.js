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
    update: function(){
        if(this.hitBoxEnabled){
            this.hitBox.position.x = this.x;
            this.hitBox.position.y = this.y;
            this.hitBox.position.z = this.z;
            scene.add(this.hitBox);
        }
        else{
            scene.remove(this.hitBox);
        }


        this.yVel -= 0.075;

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


        // HARD CODED FLOOR
        if(this.y < 10){
          this.y = 10;
          this.canJump = true;
          this.jumpCt = 0;
          this.onGround = true;
        }
        if(this.y < -40){
          alert("you died");
          this.y = 10;
          this.x = 0;
        }
        if(this.x < -30){
          this.x = -30;
        }
        if(this.x > 30){
          this.x = 30;
        }

        this.model.position.set(this.x, this.y, 0);
        this.hitBox.position.set(this.x, this.y, 0);




    }
}
