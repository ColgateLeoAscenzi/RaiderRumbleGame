//character2
var RESET = false;
var ATTACK = true;
var pingu = {
    model: createPinguMesh(0,0,0),
    secondary: createPinguMesh(0,0,0),
    hitBox: createBasicCharacterBounding(0,0,0),
    basicAttackModel: createBasicAttackModel(),
    canAAttack: [true, true, true, true, true],
    canBAttack: [true, true, true, true],
    init: function(){
        var keys = Object.keys(charProto);
        for(var i = 0; i < keys.length; i++){
            this[keys[i]] = charProto[keys[i]];
        }
        //spawn location
        this.x = 10;
        this.y = 10;
        this.name = "Pingu";
        selectedStageDat.scene.add(this.secondary);
        this.hearts = createHearts(selectedStageDat, selectedStageDat.maximumX + 300, selectedStageDat.maximumY + 300, 0);
        this.secondary.position.set(selectedStageDat.maximumX +300,selectedStageDat.maximumY + 300,0);
        this.recoverVel = 3.5;
        this.jumpSpeed = 2;
        this.heldKeys = {up: false, down: false, left: false, right: false, attack1: false,
        attack2: false}

        this.basicAttackObj = pinguBasic;
        this.specialAttackObj = pinguSpecial;

    },
    update: function(){
        //this.model.children[2].position.x = this.x*2;

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
        if(this.heldKeys.right && !this.heldKeys.left && !this.isHit){
            this.walkRight();
        }
        if(this.heldKeys.left && !this.heldKeys.right && !this.isHit){
            this.walkLeft();
        }


        //dampen left and right movement on floor
        if(!this.movingR && !this.movingL && this.onGround && !this.isHit){
          this.xVel = this.xVel*0.7;
        }
        if(!this.movingR && !this.movingL && !this.onGround && !this.isHit){
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
      if(this.facingR && this.canBAttack[US]){
        this.model.rotation.y = 0.5;
      }
      if(this.facingL && this.canBAttack[US]){
        this.model.rotation.y = -0.5;
      }



      //walking changes
      if((this.movingR || this.movingL) && this.xVel != 0 && !this.isHit){
        //alternates legs up and down between 0.5 and -0.5 from the original place
        if(this.walkStyle1){
            this.model.torso.rightLeg.rotation.x = 0.4*Math.sin(stage.timer*0.7);
            this.model.torso.leftLeg.rotation.x = - 0.4*Math.sin(stage.timer*0.7);
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
      //BEGIN ATTACK ANIMATIONS
      if(!this.canAAttack[A]){ //General
        // var geomHBox1 = new THREE.BoxGeometry(1.5,1.5,1.5, 1, 1, 1);
        // var matHBox1  = new THREE.MeshPhongMaterial(
        //                            { color : 0xaaaaaa, opacity: 1, transparent: true});
        //
        // var boxH1 = new THREE.Mesh(geomHBox1, matHBox1).clone();
        var swordParticleBox = particles.particlePalette.sword;

          this.basicAttackFrames-=1;
          if(this.facingL){
            this.model.torso.rightArm.scale.set(1.6,1.6,1.6);
            this.model.torso.rightArm.rightHand.sword.scale.set(1,2,1);
            this.model.torso.rightArm.rotation.z += 0.1;

            var swordPos = this.model.torso.rightArm.rightHand.sword.getWorldPosition();
            var swordRot = this.model.torso.rightArm.rightHand.sword.getWorldRotation();
            swordParticleBox.position.set(-5+this.x-12*Math.random(),-3+this.y+15*Math.random(),this.z);

            selectedStageDat.scene.add(swordParticleBox);
            setTimeout(function(){selectedStageDat.scene.remove(swordParticleBox)}, 50);

            // selectedStageDat.scene.add();
            var bbox = new THREE.BoxHelper(this.model.torso.rightArm.rightHand.sword, 0xff0000);
            if(hitBoxesOn){
              selectedStageDat.scene.add(bbox);
              setTimeout(function(){bbox.geometry.dispose();}, 50);
              setTimeout(function(){  selectedStageDat.scene.remove(bbox);}, 50);
            }

          }
          if(this.facingR){
            this.model.torso.leftArm.scale.set(1.6,1.6,1.6);

          }
          if(this.basicAttackFrames <= 0){
              this.model.torso.rightArm.scale.set(1,1,1);
              this.model.torso.leftArm.scale.set(1,1,1);
              this.model.torso.rightArm.rightHand.sword.scale.set(1,1,1);
              this.model.torso.rightArm.rotation.z = 0;

              this.basicAttackFrames = 25;
              this.canAAttack[A] = true;
              this.canBasicAttack = true;
          }
      }

      if(!this.canAAttack[FA]){ //General
          this.basicAttackFrames-=1;
          if(this.facingL){
            this.model.torso.rightArm.scale.set(1.6,1.6,1.6);
            this.model.torso.rightArm.rightHand.sword.scale.set(1,2,1);
            this.model.torso.rightArm.rotation.z += 0.1;
          }
          if(this.facingR){
            this.model.torso.leftArm.scale.set(1.6,1.6,1.6);

          }

          if(this.basicAttackFrames <= 0){
            this.model.torso.rightArm.rotation.z = 0;
            this.model.torso.rightArm.scale.set(1,1,1);
            this.model.torso.leftArm.scale.set(1,1,1);
              this.basicAttackFrames = 25;
              this.canAAttack[FA] = true;
              this.canBasicAttack = true;
          }
      }

      if(!this.canAAttack[BA]){ //General
          this.basicAttackFrames-=1;
          if(this.basicAttackFrames <= 0){
              this.basicAttackFrames = 25;
              this.canAAttack[BA] = true;
              this.canBasicAttack = true;
          }
      }

      if(!this.canAAttack[DA]){ //General
          this.basicAttackFrames-=1;
          if(this.basicAttackFrames <= 0){
              this.basicAttackFrames = 25;
              this.canAAttack[DA] = true;
              this.canBasicAttack = true;
          }
      }

      if(!this.canAAttack[UA]){ //General
          this.basicAttackFrames-=1;
          if(this.basicAttackFrames <= 0){
              this.basicAttackFrames = 25;
              this.canAAttack[UA] = true;
              this.canBasicAttack = true;
          }
      }

      if(!this.canAAttack[NA]){ //General
          this.basicAttackFrames-=1;
          if(this.basicAttackFrames <= 0){
              this.basicAttackFrames = 25;
              this.canAAttack[NA] = true;
              this.canBasicAttack = true;
          }
      }

      if(!this.canBAttack[S]){ //General
          this.basicAttackFrames-= 1.5;

          dabbing(ATTACK, this.model);

          if(this.basicAttackFrames <= 0){
            dabbing(RESET, this.model);
              this.basicAttackFrames = 25;
              this.canBAttack[S] = true;
              this.canBasicAttack = true;
          }
      }
      if(!this.canBAttack[SS]){ //General
        this.basicAttackFrames-=1;
        // dabbing(ATTACK, modelClone);

        dabbing(ATTACK, this.model);
        if(this.basicAttackFrames == this.specialAttackObj.attackFrames[SS] - 1 && !this.isRecover){
          if(this.facingL) {
            this.specialAttackObj.castedRight = false;
            this.secondary.position.set(this.x, this.y, this.z);
          }
          if(this.facingR) {
            this.specialAttackObj.castedRight = true;
            this.secondary.position.set(this.x, this.y, this.z);
          }
        }
        else{
          if(!this.specialAttackObj.castedRight) {
            this.secondary.position.x -=2.5;
          }
          if(this.specialAttackObj.castedRight) {
            this.secondary.position.x +=2.5;
          }
        }

        dabbing(ATTACK, this.secondary);

          if(this.basicAttackFrames <= (this.specialAttackObj.attackFrames[SS]/2)){

            dabbing(RESET, this.model);
            dabbing(RESET, this.secondary);

              this.basicAttackFrames = 25;
              this.canBAttack[SS] = true;
              this.canBasicAttack = true;
              this.secondary.position.set(selectedStageDat.maximumX + 300,selectedStageDat.maximumY + 300,0);
          }
      }
      if(!this.canBAttack[US]){ //General
          this.basicAttackFrames-=2.5;
          this.model.rotation.y += 0.78;

          var geomHBox1 = new THREE.BoxGeometry(1.5,1.5,1.5, 1, 1, 1);
          var matHBox1  = new THREE.MeshPhongMaterial(
                                     { emissive : 0xff0000 * Math.random(), opacity: 1, transparent: true});

          var boxH1 = new THREE.Mesh(geomHBox1, matHBox1).clone();

          boxH1.position.set(5+this.x-10*Math.random(),-5+this.y-8*Math.random(),this.z);
          selectedStageDat.scene.add(boxH1);
          setTimeout(function(){selectedStageDat.scene.remove(boxH1)}, 50);

          if(this.basicAttackFrames <= 0){
              this.model.rotation.y = 0;
              this.basicAttackFrames = 25;
              this.canBAttack[US] = true;
              this.canBasicAttack = true;
          }
      }
      if(!this.canBAttack[DS]){ //General
          this.basicAttackFrames-=1;
          //current percentage funished
          var c = ((this.specialAttackObj.attackFrames[DS]-this.basicAttackFrames)/this.specialAttackObj.attackFrames[DS]);
          //a signle percetange
          var p = 1/this.specialAttackObj.attackFrames[DS];
          // this.model.scale.set(5,5,5);
          this.model.torso.rightArm.rotation.x = radians(-120*c);
          this.model.torso.rightArm.rightHand.sword.rotateOnWorldAxis(new THREE.Vector3(1,0,0), radians(90*p));
          this.model.torso.rightArm.rightHand.sword.rotateOnWorldAxis(new THREE.Vector3(0,0,1), radians(-90*p));


          // var heartPart = particles.particlePalette.heartPiece;
          heartHelper(this.hearts, true, this.x, this.y, this.z);

          if(this.basicAttackFrames <= 0){
              heartHelper(this.hearts, false, selectedStageDat.maximumX +300, selectedStageDat.maximumY+300, 0);
              this.basicAttackFrames = 25;
              this.model.torso.rightArm.rotation.y = 0;
              this.model.torso.rightArm.rightHand.sword.rotation.set(0,0,0.6);
              this.model.torso.rightArm.rightHand.sword.position.z = 0.7;
              this.canBAttack[DS] = true;
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



      if(!this.isHit){

        this.jumpCt+=1;
        this.yVel = this.jumpSpeed;
        this.onGround = false;
        this.isHit = false;
      }
    }
  },
  drop: function(){
  },
  recover: function(){
    if(!this.isHit){
      this.isRecover = true;
      this.yVel = this.recoverVel;
      this.canRecover = false;
      this.isHit = false;
    }
  },
  doAnyAttack: function(){
    //DO ALL MOTION HEREE
    if(this.canBasicAttack && !this.isHit && !this.isRecover){
      var tKnockback = 0;
      var damageToDeal = 0;
      var angleToApply = 0;
      var newAttackFrame = 0;

      if(this.heldKeys.up && this.heldKeys.attack2 && this.canRecover && !this.isRecover){
        this.recover();
        this.canJump = false;
      }

      var attackBox = undefined;
      // attackBox.position.set(this.x+5, this.y, this.z);

      //basic attack air
      if(this.facingR && this.heldKeys.right && this.heldKeys.attack1 && !this.onGround){
          if(this.canAAttack[FA]){
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
            this.canAAttack[FA] = false;
            this.canBasicAttack = false;
          }
      }
      if(this.facingL && this.heldKeys.left && this.heldKeys.attack1 && !this.onGround){
        if(this.canAAttack[FA] == true){
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
            this.canAAttack[FA] = false;
            this.canBasicAttack = false;
          }
      }
      if(this.facingL && this.heldKeys.right && this.heldKeys.attack1 && !this.onGround){
        if(this.canAAttack[BA] == true){
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
          this.canAAttack[BA] = false;
          this.canBasicAttack = false;
        }
      }
      if(this.facingR && this.heldKeys.left && this.heldKeys.attack1 && !this.onGround){
        if(this.canAAttack[BA] == true){
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
          this.canAAttack[BA] = false;
          this.canBasicAttack = false;
        }
      }
      if(this.heldKeys.down && this.heldKeys.attack1 && !this.onGround){
        if(this.canAAttack[DA] == true){
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
          this.canAAttack[DA] = false;
          this.canBasicAttack = false;
        }
      }
      if(this.heldKeys.up && this.heldKeys.attack1 && !this.onGround){
        if(this.canAAttack[UA] == true){
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
          this.canAAttack[UA] = false;
          this.canBasicAttack = false;
        }
      }
      if(!this.heldKeys.left && !this.heldKeys.right && !this.heldKeys.up && !this.heldKeys.down && this.heldKeys.attack1 && !this.onGround){
          if(this.canAAttack[NA] == true){
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
          this.canAAttack[NA] = false;
          this.canBasicAttack = false;
        }
      }

      //basic attack ground
      if(this.heldKeys.attack1 && this.onGround){
          if(this.canAAttack[A] == true){
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
          this.canAAttack[A] = false;
          this.canBasicAttack = false;
        }
      }

      //special attacks
      if((this.heldKeys.right || this.heldKeys.left) && this.heldKeys.attack2){
        if(this.canBAttack[SS] == true){
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
        this.canBAttack[SS] = false;
        this.canBasicAttack = false;
      }


      }
      if((!this.heldKeys.down && !this.heldKeys.up && !this.heldKeys.left && !this.heldKeys.right) && this.heldKeys.attack2){
        if(this.canBAttack[S] == true){
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
          this.canBAttack[S] = false;
          this.canBasicAttack = false;
        }

      }
      if(this.heldKeys.down && this.heldKeys.attack2){
        if(this.canBAttack[DS] == true){
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
          this.canBAttack[DS] = false;
          this.canBasicAttack = false;
        }
      }
      if(this.heldKeys.up && this.heldKeys.attack2){
          if(this.canBAttack[US] == true){
           console.log("Up Special");
           damageToDeal = this.specialAttackObj.damage[US];
           angleToApply = this.specialAttackObj.launchAngle[US];
           newAttackFrame = this.specialAttackObj.attackFrames[US];
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
          this.canBAttack[US] = false;
          this.canBasicAttack = false;
        }
    }

      if(attackBox != undefined){
        stage.scene.add(attackBox);
        setTimeout(function(){stage.scene.remove(attackBox);}, 100);
      }

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
}

function dabbing(attackBoolean, model) {
  if(attackBoolean) {

    model.torso.rightArm.rotation.z = -1.96;
    model.torso.rightArm.rightHand.sword.rotation.z = 2.75;
    model.torso.leftArm.rotation.z = -1.96;
    model.torso.leftArm.position.z = 2.5;
    model.torso.leftArm.position.y = 3;
    model.torso.leftArm.position.x = 2;
    model.rotation.z = -0.39;

  }

  else {

    model.torso.rightArm.rotation.z = 0;
    model.torso.rightArm.rightHand.sword.rotation.z = 0.6;
    model.torso.leftArm.rotation.z = 0;
    model.torso.leftArm.position.z = 0;
    model.torso.leftArm.position.y = 0.5;
    model.torso.leftArm.position.x = 4;

  }


}

function createHearts(stage, x, y, z) {
    var arrToReturn = [];
    for(var i = 0; i < 22; i++) {

        var temp = particles.particlePalette.heartPiece.clone();

        arrToReturn.push(temp);
        stage.scene.add(temp);
    }

    return arrToReturn;

}

function heartHelper(heartsArr, show, x, y, z) {
        var d = 2.5;
        z  = z+8
        y = y-3.4;
        var ti = pingu.basicAttackFrames;
        var tf = pingu.specialAttackObj.attackFrames[DS];
        var c = (tf-ti)/tf;

        if(show){
          //top half, up and out, down and out

          heartsArr[0].position.set(x,y+10,z);
          heartsArr[1].position.set(x+d*c,y+10+d*c,z);
          heartsArr[2].position.set(x-d*c,y+10+d*c,z);
          heartsArr[3].position.set(x+d*c*2,y+10+2*d*c,z);
          heartsArr[4].position.set(x-d*c*2,y+10+2*d*c,z);
          heartsArr[5].position.set(x+d*c*3,y+10+2*d*c,z);
          heartsArr[6].position.set(x-d*c*3,y+10+2*d*c,z);
          heartsArr[7].position.set(x+d*c*4,y+10+d*c,z);
          heartsArr[8].position.set(x-d*c*4,y+10+d*c,z);
          heartsArr[9].position.set(x+d*c*5,y+10,z);
          heartsArr[10].position.set(x-d*c*5,y+10,z);

          //middle inward slope
          heartsArr[11].position.set(x+d*c*4.5,y+10-d*c,z);
          heartsArr[12].position.set(x-d*c*4.5,y+10-d*c,z);
          heartsArr[13].position.set(x+d*c*4,y+10-2*d*c,z);
          heartsArr[14].position.set(x-d*c*4,y+10-2*d*c,z);
          heartsArr[15].position.set(x+d*c*3,y+10-3*d*c,z);
          heartsArr[16].position.set(x-d*c*3,y+10-3*d*c,z);
          heartsArr[17].position.set(x+d*c*2,y+10-4*d*c,z);
          heartsArr[18].position.set(x-d*c*2,y+10-4*d*c,z);
          heartsArr[19].position.set(x+d*c,y+10-4.5*d*c,z);
          heartsArr[20].position.set(x-d*c,y+10-4.5*d*c,z);

          //bottom tip
          heartsArr[21].position.set(x,y+10-5*d*c,z);

        }
        else{
          for(var i = 0; i < heartsArr.length; i++){
              heartsArr[i].position.set(x,y,z);
          }
        }



}
