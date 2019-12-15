//character2
var RESET = false;
var ATTACK = true;
var pingu = {
    name: "Pingu",
    model: createPinguMesh(0,0,0),
    secondary: createPinguMesh(0,0,0),
    hitBox: createPinguBounding(0,0,0),
    canAAttack: [true, true, true, true, true, true],
    canBAttack: [true, true, true, true],
    hitByA: [false, false, false, false, false],
    hitByB: [false, false, false, false],
    init: function(){
        var keys = Object.keys(charProto);
        for(var i = 0; i < keys.length; i++){
            this[keys[i]] = charProto[keys[i]];
        }

        this.name = "Pingu";
        stage.scene.add(this.secondary);
        this.hearts = createHearts(stage, stage.maximumX + 300, stage.maximumY + 300, 0);
        this.secondary.position.set(stage.maximumX +300,stage.maximumY + 300,0);
        this.recoverVel = 3.5;
        this.jumpSpeed = 2;
        this.heldKeys = {up: false, down: false, left: false, right: false, attack1: false,
        attack2: false}

        this.basicAttackObj = pinguBasic;
        this.specialAttackObj = pinguSpecial;


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
      this.hitbbox = new THREE.Box3().setFromObject(this.hitBox);

      if(stage.night){
        stage.player2SpotTarget.position.set(this.x, this.y + 10, -10);
        stage.player2Spot.target = stage.player2SpotTarget;
      }


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
          this.model.position.set(this.x, this.y, this.z);
          this.hitBox.position.set(this.x, this.y+2, this.z);
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
      if(!this.canAAttack[A]){

        var d = 1 - ((this.recoilFrameDefault-this.recoilFrames)/this.recoilFrameDefault);
        var c = ((this.basicAttackObj.attackFrames[A]-this.basicAttackFrames)/this.basicAttackObj.attackFrames[A]);

          if(!this.isRecoiling){
            this.basicAttackFrames-=1;
            //ANIMATIONS GO HERE
            if(this.facingL){
                if(c< 0.25){
                    this.model.torso.rightArm.scale.set(1+c*0.6*4,1+c*0.6*4,1+c*0.6*4);
                    this.model.torso.rightArm.rightHand.sword.scale.set(1,1+1*c*4,1);
                }
                this.model.torso.rightArm.rotation.z += 0.1;
            }
            else{
                if(c< 0.25){
                    this.model.torso.leftArm.scale.set(1.6,2,1.6);
                }
                else{
                    this.model.torso.leftArm.rotation.z = c*radians(180);
                }
            }
          }
          else{
            //recoil reset
            if(this.facingL){
              this.model.torso.rightArm.scale.set(1+c*d*0.6,1+c*d*0.6,1+c*d*0.6);
              this.model.torso.rightArm.rightHand.sword.scale.set(1,1+c*d*1,1);
              this.model.torso.rightArm.rotation.z = d*this.model.torso.rightArm.rotation.z;
            }
            else{
              this.model.torso.leftArm.scale.set(1+c*d*0.6,1+c*d*0.6,1+c*d*0.6);
              this.model.torso.leftArm.rotation.z = d*this.model.torso.leftArm.rotation.z;
            }

          }


          // HITBOX CHECK GOES HERE
          if(this.facingL){
            var bbox = new THREE.BoxHelper(this.model.torso.rightArm.rightHand.sword, 0xff0000)
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
            //normal reset goes here
              this.model.torso.rightArm.scale.set(1,1,1);
              this.model.torso.leftArm.scale.set(1,1,1);
              this.model.torso.rightArm.rightHand.sword.scale.set(1,1,1);
              this.model.torso.rightArm.rotation.z = 0;
              this.model.torso.leftArm.rotation.z = 0;

              this.basicAttackFrames = 25;
              this.canAAttack[A] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByA[A] = false;
          }
      }

      if(!this.canAAttack[FA]){
          this.basicAttackFrames-=1;

          var c = ((this.basicAttackObj.attackFrames[FA]-this.basicAttackFrames)/this.basicAttackObj.attackFrames[FA]);
          if(this.facingL){
            if(c< 0.25){
              this.model.rotation.z = 4*c*1.57;
              this.model.torso.rightArm.scale.set(1.6,1.6,1.6);
              this.model.torso.rightArm.rightHand.sword.scale.set(1,2.2,1);
              this.model.torso.rightArm.rotation.z -= 0.1;
            }
            else{
              this.model.rotation.x = 3*c*3.14;
            }

            if(this.x - 1.8 >= this.minLeft){
              this.x-=1.8
            }
          }
          else{
            if(c< 0.25){
              this.model.rotation.z = -4*c*1.57;
              this.model.torso.rightArm.scale.set(1.6,1.6,1.6);
              this.model.torso.rightArm.rightHand.sword.scale.set(1,2.2,1);
              this.model.torso.rightArm.rotation.z -= 0.1;
            }
            else{
              this.model.rotation.x = 3*c*3.14;
            }
            if(this.x + 1.8 <= this.minRight){
              this.x+=1.8
            }
          }

          var bbox = new THREE.BoxHelper(this.model.torso.rightArm.rightHand.sword, 0xff0000);
          this.attackbbox = new THREE.Box3().setFromObject(bbox);

          if(this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)){
            this.checkHit(FA,"A");
          }

          if(hitBoxesOn){
            stage.scene.add(bbox);
            setTimeout(function(){bbox.geometry.dispose();}, 50);
            setTimeout(function(){  stage.scene.remove(bbox);}, 50);
          }


          if(this.basicAttackFrames <= 0){
            this.model.rotation.z = 0;
            this.model.rotation.x = 0;
            this.model.torso.rightArm.rotation.z = 0;
            this.model.torso.rightArm.scale.set(1,1,1);
            this.model.torso.leftArm.scale.set(1,1,1);
            this.model.torso.rightArm.rightHand.sword.scale.set(1,1,1);
              this.basicAttackFrames = 25;
              this.canAAttack[FA] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByA[FA] = false;
          }
      }

      if(!this.canAAttack[BA]){

        var d = 1 - ((this.recoilFrameDefault-this.recoilFrames)/this.recoilFrameDefault);
        var c = ((this.basicAttackObj.attackFrames[BA]-this.basicAttackFrames)/this.basicAttackObj.attackFrames[BA]);

        this.basicAttackFrames-=1;

        if(this.facingL){
            if(c< 0.25){
                this.model.torso.rightArm.scale.set(1+c*0.6*4,1+c*0.6*4,1+c*0.6*4);
                this.model.torso.rightArm.rightHand.sword.scale.set(1,1+1*c*4,1);
            }
            this.model.torso.rightArm.rotation.z += 0.1;
        }
        else{
            if(c< 0.25){
                this.model.torso.leftArm.scale.set(1.6,2,1.6);
            }
            else{
                this.model.torso.leftArm.rotation.z = c*radians(180);
            }
        }



          // HITBOX CHECK GOES HERE
          if(this.facingL){
            var bbox = new THREE.BoxHelper(this.model.torso.rightArm.rightHand.sword, 0xff0000)
            this.attackbbox = new THREE.Box3().setFromObject(bbox);

            if(this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)){
              this.checkHit(BA,"A");
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
              this.checkHit(BA,"A");
            }

            if(hitBoxesOn){
              stage.scene.add(bbox);
              setTimeout(function(){bbox.geometry.dispose();}, 50);
              setTimeout(function(){  stage.scene.remove(bbox);}, 50);
            }
          }

          if(this.basicAttackFrames <= 0){
            //normal reset goes here
              this.model.torso.rightArm.scale.set(1,1,1);
              this.model.torso.leftArm.scale.set(1,1,1);
              this.model.torso.rightArm.rightHand.sword.scale.set(1,1,1);
              this.model.torso.rightArm.rotation.z = 0;
              this.model.torso.leftArm.rotation.z = 0;

              this.basicAttackFrames = 25;
              this.canAAttack[BA] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByA[BA] = false;
          }
      }

      if(!this.canAAttack[DA]){
          this.basicAttackFrames-=1;

          var c = ((this.basicAttackObj.attackFrames[DA]-this.basicAttackFrames)/this.basicAttackObj.attackFrames[DA]);

          this.model.torso.rightLeg.scale.set(1.1,1,3);
          this.model.torso.leftLeg.scale.set(1.1,1,3);

          this.model.torso.rightLeg.rotation.x = -c*Math.sin(0.5*this.basicAttackFrames);
          this.model.torso.leftLeg.rotation.x = c*Math.sin(0.5*this.basicAttackFrames);


          var bbox1 = new THREE.BoxHelper(this.model.torso.rightLeg, 0xff0000)
          this.attackbbox = new THREE.Box3().setFromObject(bbox1);

          if(this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)){
            this.checkHit(DA,"A");
          }
          var bbox2 = new THREE.BoxHelper(this.model.torso.leftLeg, 0xff0000)
          this.attackbbox = new THREE.Box3().setFromObject(bbox2);

          if(this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)){
            this.checkHit(DA,"A");
          }

          if(hitBoxesOn){
            stage.scene.add(bbox1);
            setTimeout(function(){bbox1.geometry.dispose();}, 50);
            setTimeout(function(){  stage.scene.remove(bbox1);}, 50);
            stage.scene.add(bbox2);
            setTimeout(function(){bbox2.geometry.dispose();}, 50);
            setTimeout(function(){  stage.scene.remove(bbox2);}, 50);
          }


          if(this.basicAttackFrames <= 0){

            this.model.torso.rightLeg.scale.set(1,1,1);
            this.model.torso.leftLeg.scale.set(1,1,1);



              this.basicAttackFrames = 25;
              this.canAAttack[DA] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByA[DA] = false;
          }
      }

      if(!this.canAAttack[UA]){
          this.basicAttackFrames-=1;
          var c = ((this.basicAttackObj.attackFrames[UA]-this.basicAttackFrames)/this.basicAttackObj.attackFrames[UA]);

          this.model.torso.rightArm.scale.set(1+c*0.6,1+c*0.6,1+c*0.6);
          this.model.torso.rightArm.rightHand.sword.scale.set(1,2,1);

          if(c < 0.25){
            this.model.torso.rightArm.rotation.z = -8*c*1.57;
            this.model.torso.rightArm.rightHand.sword.rotation.z = 7.8*c*1.57;
            this.model.torso.rightArm.rightHand.sword.position.x += 0.01;
            this.model.torso.rightArm.rightHand.sword.position.y -= 0.05;
            this.model.torso.rightArm.rightHand.sword.position.z -= 0.2;
          }
          else{
              this.model.rotation.y = c*radians(720);
          }




          var bbox = new THREE.BoxHelper(this.model.torso.rightArm.rightHand.sword, 0xff0000)
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

              this.model.torso.rightArm.scale.set(1,1,1);
              this.model.torso.leftArm.scale.set(1,1,1);
              this.model.torso.rightArm.rightHand.sword.scale.set(1,1,1);
              this.model.torso.rightArm.rightHand.sword.position.set(-0.4,1,0.7);
              this.model.torso.rightArm.rightHand.sword.rotation.set(0,0,0.6);
              this.model.torso.rightArm.rotation.z = 0;
              this.model.rotation.y = 0;



              this.basicAttackFrames = 25;
              this.canAAttack[UA] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByA[UA] = false;
          }
      }

      if(!this.canAAttack[NA]){
          this.basicAttackFrames-=1;

          var c = ((this.basicAttackObj.attackFrames[NA]-this.basicAttackFrames)/this.basicAttackObj.attackFrames[NA]);

          this.model.rotation.z =  2*c*Math.PI;
          this.model.torso.rightArm.scale.set(1+c*0.6,1+c*0.6,1+c*0.6);
          this.model.torso.rightArm.rightHand.sword.scale.set(1,2,1);
          this.model.torso.rightArm.rotation.z += 0.1;


          var bbox = new THREE.BoxHelper(this.model.torso.rightArm.rightHand.sword, 0xff0000)
          this.attackbbox = new THREE.Box3().setFromObject(bbox);

          if(this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)){
            this.checkHit(NA,"A");
          }

          if(hitBoxesOn){
            stage.scene.add(bbox);
            setTimeout(function(){bbox.geometry.dispose();}, 50);
            setTimeout(function(){  stage.scene.remove(bbox);}, 50);
          }

          if(this.basicAttackFrames <= 0){

            this.model.rotation.z =  0
            this.model.torso.rightArm.scale.set(1,1,1);
            this.model.torso.rightArm.rightHand.sword.scale.set(1,1,1);
            this.model.torso.rightArm.rotation.z = 0.1;

              this.basicAttackFrames = 25;
              this.canAAttack[NA] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByA[NA] = false;
          }
      }

      if(!this.canBAttack[S]){
          this.basicAttackFrames-= 1.5;

          dabbing(ATTACK, this.model);

          var bbox = new THREE.BoxHelper(this.model, 0xff0000)
          this.attackbbox = new THREE.Box3().setFromObject(bbox);

          if(this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)){
            this.checkHit(S,"B");
          }

          if(hitBoxesOn){
            stage.scene.add(bbox);
            setTimeout(function(){bbox.geometry.dispose();}, 50);
            setTimeout(function(){  stage.scene.remove(bbox);}, 50);
          }

          if(this.basicAttackFrames <= 0){
            dabbing(RESET, this.model);
              this.basicAttackFrames = 25;
              this.canBAttack[S] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByB[S] = false;
          }
      }
      if(!this.canBAttack[SS]){
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

        var bbox = new THREE.BoxHelper(this.secondary, 0xff0000)
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

            dabbing(RESET, this.model);
            dabbing(RESET, this.secondary);

              this.basicAttackFrames = 25;
              this.canBAttack[SS] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByB[SS] = false;
              this.secondary.position.set(stage.maximumX + 300,stage.maximumY + 300,0);
          }
      }
      if(!this.canBAttack[US]){
          this.basicAttackFrames-=2.5;
          this.model.rotation.y += 0.78;

          var geomHBox1 = new THREE.BoxGeometry(1.5,1.5,1.5, 1, 1, 1);
          var matHBox1  = new THREE.MeshPhongMaterial(
                                     { emissive : 0xff0000 * Math.random(), opacity: 1, transparent: true});

          var boxH1 = new THREE.Mesh(geomHBox1, matHBox1).clone();

          boxH1.position.set(5+this.x-10*Math.random(),-5+this.y-8*Math.random(),this.z);
          stage.scene.add(boxH1);
          setTimeout(function(){stage.scene.remove(boxH1)}, 50);
          setTimeout(function(){boxH1.geometry.dispose()}, 50);


          var bbox = new THREE.BoxHelper(this.model, 0xff0000)
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
              this.model.rotation.y = 0;
              this.basicAttackFrames = 25;
              this.canBAttack[US] = true;
              this.canBasicAttack = true;
              this.otherPlayer.hitByB[US] = false;
          }
      }
      if(!this.canBAttack[DS]){
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

          this.model.scale.set(c*2.5,c*2.5,1);
          var bbox = new THREE.BoxHelper(this.model, 0xff0000);
          this.attackbbox = new THREE.Box3().setFromObject(bbox);
          this.model.scale.set(1,1,1);

          // this.attackbbox.min.x-=50;
          // this.attackbbox.max.x+=50;

          if(this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)){
            this.checkHit(DS,"B");
          }

          if(hitBoxesOn){
            stage.scene.add(bbox);
            setTimeout(function(){bbox.geometry.dispose();}, 50);
            setTimeout(function(){  stage.scene.remove(bbox);}, 50);
          }

          if(this.basicAttackFrames <= 0){
              heartHelper(this.hearts, false, stage.maximumX +300, stage.maximumY+300, 0);
              this.basicAttackFrames = 25;
              this.model.torso.rightArm.rotation.y = 0;
              this.model.torso.rightArm.rightHand.sword.rotation.set(0,0,0.6);
              this.model.torso.rightArm.rightHand.sword.position.z = 0.7;
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
    if(!this.isHit){
      this.isRecover = true;
      this.yVel = this.recoverVel;
      this.canRecover = false;
      this.isHit = false;
    }
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
        // this.recoilFrames = this.basicAttackObj.attackFrames[attackType] - this.basicAttackFrames +this.basicAttackObj.attackFrames[attackType]/2;
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
        // this.recoilFrames = this.specialAttackObj.attackFrames[attackType] - this.basicAttackFrames + this.specialAttackObj.attackFrames[attackType]/2;
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
