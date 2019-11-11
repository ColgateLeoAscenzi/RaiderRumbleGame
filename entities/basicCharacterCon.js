var basicCharacter = {
    x: 0,
    y: 10,
    z: 0,
    xVel: 0,
    yVel: 0,
    movingR: false,
    movingL: false,
    jumping: false,
    model: undefined,
    hitBox: undefined,
    hitBoxEnabled: false,
    canJump: true,
    jumpCt: 0,
    init: function(){
      this.model = createBasicCharacterMesh(this.x, this.y, this.z);
      this.hitBox = createBasicCharacterBounding(this.x, this.y, this.z);
    },
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

        this.yVel -= 0.05;

        this.x += this.xVel;
        this.y += this.yVel;



        //dampen left and right movement
        if(!this.movingR && !this.movingL){
          this.xVel = this.xVel*0.9;
        }
        // decrease airspeed
        if(!this.jumping){
          this.yVel = this.yVel*0.9;
        }

        //HARD CODED FLOOR
        if(this.y < 10){
          this.y = 10;
          this.canJump = true;
          this.jumpCt = 0;
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
