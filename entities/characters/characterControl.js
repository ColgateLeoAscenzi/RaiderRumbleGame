var RESET=!1,ATTACK=!0,raider={name:"Raider",model:createBasicCharacterMesh(0,0,0),secondRaider:createBasicCharacterMesh(0,0,0).torso.rightArm.rightHand.coin,hitBox:createBasicCharacterBounding(0,0,0),canAAttack:[!0,!0,!0,!0,!0,!0],canBAttack:[!0,!0,!0,!0],hitByA:[!1,!1,!1,!1,!1],hitByB:[!1,!1,!1,!1],init:function(){for(var t=Object.keys(charProto),s=0;s<t.length;s++)this[t[s]]=charProto[t[s]];this.name="Raider",stage.scene.add(this.secondRaider),this.secondRaider.position.set(stage.maximumX+300,stage.maximumY+300,0),this.heldKeys={up:!1,down:!1,left:!1,right:!1,attack1:!1,attack2:!1},this.basicAttackObj=raiderBasic,this.specialAttackObj=raiderSpecial,this.damageDeal=0},setSpawn:function(){this.isPlayer1?(this.x=stage.player1SpawnX,this.y=stage.player1SpawnY,this.z=stage.player1SpawnZ):(this.x=stage.player2SpawnX,this.y=stage.player2SpawnY,this.z=stage.player2SpawnZ)},update:function(){if(this.onGround||(this.isPlayer1?player1Info.inAirDuration+=1/60:player2Info.inAirDuration+=1/60),isDay||(this.isPlayer1?(stage.player1SpotTarget.position.set(this.x,this.y+10,-10),stage.player1Spot.target=stage.player1SpotTarget):(stage.player2SpotTarget.position.set(this.x,this.y+10,-10),stage.player2Spot.target=stage.player2SpotTarget)),this.hitbbox=(new THREE.Box3).setFromObject(this.hitBox),null!=this.boxBelow?this.minDown=this.boxBelow.position.y+this.boxBelow.userData.height/2+this.height/2:this.minDown=-1e3,null!=this.boxLeft?this.minLeft=this.boxLeft.position.x+this.boxLeft.userData.width/2+this.width/2:this.minLeft=-1e3,null!=this.boxRight?this.minRight=this.boxRight.position.x-this.boxRight.userData.width/2-this.width/2:this.minRight=1e3,null!=this.boxAbove?this.minUp=this.boxAbove.position.y-this.boxAbove.userData.height/2-this.height/2:this.minUp=1e5,this.isHit&&(this.hitFrames-=1,this.sleeping=!1),this.hitFrames<0&&(this.isHit=!1),this.yVel-.075<-1.6&&(this.yVel=-1.6),this.yVel-=.075,this.x+=this.xVel,this.y+=this.yVel,this.xVel>8||this.yVel>8){var t=this.model.clone();stage.scene.add(t),setTimeout(function(){stage.scene.remove(t)},50)}this.heldKeys.up&&this.heldKeys.attack2&&this.canRecover&&!this.isRecover&&(this.sleeping||(this.recover(),this.canJump=!1)),!this.heldKeys.right||this.heldKeys.left||this.isHit||this.heldKeys.attack1||this.heldKeys.attack2||this.walkRight(),!this.heldKeys.left||this.heldKeys.right||this.isHit||this.heldKeys.attack1||this.heldKeys.attack2||this.walkLeft(),this.movingR||this.movingL||!this.onGround||this.isHit||(this.xVel=.7*this.xVel),this.movingR||this.movingL||this.onGround||this.isHit||(this.xVel=.99*this.xVel),Math.abs(this.xVel)<5e-4&&(this.xVel=0),this.y<this.minDown&&(this.y=this.minDown,this.canJump=!0,this.jumpCt=0,this.onGround=!0,this.canRecover=!0,this.isRecover=!1),this.y>this.minUp&&(this.y=this.minUp,this.yVel=0),this.x<this.minLeft&&(this.x=this.minLeft),this.x>this.minRight&&(this.x=this.minRight),0==this.stock?(this.model.position.set(1e3,1e3,0),this.hitBox.position.set(1e3,1e3,0)):(this.model.position.set(this.x,this.y,0),this.hitBox.position.set(this.x,this.y+4,0)),this.y>this.minDown&&(this.onGround=!1)},animate:function(){if(this.isRecoiling&&(this.recoilFrames-=1,this.recoilFrames<=0&&(this.recoilFrames=this.recoilFrameDefault,this.isRecoiling=!1)),this.facingR&&(this.model.rotation.y=.5),this.facingL&&(this.model.rotation.y=-.5),!this.movingR&&!this.movingL||0==this.xVel||this.isHit?(this.model.torso.rightLeg.position.y=-3,this.model.torso.leftLeg.position.y=-3,this.model.torso.rightLeg.rotation.x=0,this.model.torso.leftLeg.rotation.x=0,this.model.torso.rightArm.rotation.x=0,this.model.torso.leftArm.rotation.x=-0,this.canAAttack[A]&&!this.isHit&&(this.model.rotation.z=0)):(this.walkStyle1?(this.model.torso.rightLeg.position.y=.5*Math.sin(.5*stage.timer)-3,this.model.torso.leftLeg.position.y=-3-.5*Math.sin(.5*stage.timer)):this.walkStyle2?(this.model.torso.rightLeg.rotation.x=.3*Math.sin(.5*stage.timer),this.model.torso.leftLeg.rotation.x=-.3*Math.sin(.5*stage.timer)):this.walkStyle3&&(this.model.torso.rightLeg.position.y=.5*Math.sin(.2*stage.timer)-3,this.model.torso.leftLeg.position.y=-3-.5*Math.sin(.2*stage.timer),this.model.rotation.z=.1*Math.sin(.2*stage.timer)),this.model.torso.rightArm.rotation.x=.3*Math.sin(.5*stage.timer),this.model.torso.leftArm.rotation.x=-.3*Math.sin(.5*stage.timer),this.canAAttack[A]&&(this.model.rotation.z=0)),stage.timer%500==0?(this.model.head.rightEye.scale.set(1,.2,1),this.model.head.leftEye.scale.set(1,.2,1)):(this.model.head.rightEye.scale.set(1,1,1),this.model.head.leftEye.scale.set(1,1,1)),!this.canAAttack[A]){this.basicAttackFrames-=1;var t=(this.basicAttackObj.attackFrames[A]-this.basicAttackFrames)/this.basicAttackObj.attackFrames[A];if(this.facingL?(this.model.torso.rightArm.rotation.z=radians(-120*t),this.model.torso.rightArm.rightHand.coin.position.x=-10*t,this.basicAttackFrames<=this.basicAttackObj.attackFrames[A]/2?this.model.torso.rightArm.rightHand.coin.position.y-=1:this.basicAttackFrames>this.basicAttackObj.attackFrames[A]/2&&this.basicAttackFrames<=5.5*this.basicAttackObj.attackFrames[A]/10&&(this.model.torso.rightArm.rightHand.coin.position.x+=1,this.model.torso.rightArm.rightHand.coin.position.y-=1),this.model.torso.rightArm.rightHand.coin.scale.set(3.5*t,3.5*t,3.5*t)):(this.model.torso.leftArm.rotation.set(-1.57,0,0),this.model.torso.leftArm.position.x=4.5,this.model.torso.leftArm.position.z=1.5,this.model.torso.leftArm.scale.set(1.5,1.5,1.5)),this.facingL){var s=new THREE.BoxHelper(this.model.torso.rightArm.rightHand.coin,16711680);this.attackbbox=(new THREE.Box3).setFromObject(s),this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)&&this.checkHit(A,"A"),hitBoxesOn&&(stage.scene.add(s),setTimeout(function(){s.geometry.dispose()},50),setTimeout(function(){stage.scene.remove(s)},50))}else{s=new THREE.BoxHelper(this.model.torso.leftArm,16711680);this.attackbbox=(new THREE.Box3).setFromObject(s),this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)&&this.checkHit(A,"A"),hitBoxesOn&&(stage.scene.add(s),setTimeout(function(){s.geometry.dispose()},50),setTimeout(function(){stage.scene.remove(s)},50))}this.basicAttackFrames<=0&&(this.basicAttackFrames=25,this.model.torso.rightArm.rotation.z=0,this.model.torso.leftArm.position.x=4,this.model.torso.rightArm.rightHand.coin.position.x=0,this.model.torso.rightArm.rightHand.coin.position.y=0,this.model.torso.rightArm.rightHand.coin.scale.set(1,1,1),this.model.torso.leftArm.rotation.set(0,0,0),this.model.torso.leftArm.position.z=0,this.model.torso.leftArm.scale.set(1,1,1),this.canAAttack[A]=!0,this.canBasicAttack=!0,this.otherPlayer.hitByA[A]=!1)}if(!this.canAAttack[FA]){this.basicAttackFrames-=1;t=(this.basicAttackObj.attackFrames[FA]-this.basicAttackFrames)/this.basicAttackObj.attackFrames[FA];this.facingL?(this.model.torso.rightArm.rotation.z=45,this.model.torso.leftArm.rotation.z=45,this.x-1.8>=this.minLeft&&(this.x-=1.8)):(this.model.torso.leftArm.rotation.z=-45,this.model.torso.rightArm.rotation.z=-45,this.x+1.8<=this.minRight&&(this.x+=1.8));s=new THREE.BoxHelper(this.model,16711680);this.attackbbox=(new THREE.Box3).setFromObject(s),this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)&&this.checkHit(FA,"A"),hitBoxesOn&&(stage.scene.add(s),setTimeout(function(){s.geometry.dispose()},50),setTimeout(function(){stage.scene.remove(s)},50)),this.basicAttackFrames<=0&&(this.model.torso.leftArm.rotation.z=0,this.model.torso.rightArm.rotation.z=0,this.model.torso.rightArm.scale.set(1,1,1),this.model.torso.leftArm.scale.set(1,1,1),this.basicAttackFrames=25,this.canAAttack[FA]=!0,this.canBasicAttack=!0,this.otherPlayer.hitByA[FA]=!1)}if(this.canAAttack[BA]||(this.basicAttackFrames-=1,this.basicAttackFrames<=0&&(this.basicAttackFrames=25,this.canAAttack[BA]=!0,this.canBasicAttack=!0,this.otherPlayer.hitByA[BA]=!1)),!this.canAAttack[DA]){this.basicAttackFrames-=1;var i=(this.basicAttackObj.attackFrames[DA]-this.basicAttackFrames)/this.basicAttackObj.attackFrames[DA];this.model.rotation.x=90,this.model.rotation.y=12*i;s=new THREE.BoxHelper(this.model.torso,16711680);this.attackbbox=(new THREE.Box3).setFromObject(s),this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)&&this.checkHit(DA,"A"),hitBoxesOn&&(stage.scene.add(s),setTimeout(function(){s.geometry.dispose()},50),setTimeout(function(){stage.scene.remove(s)},50)),this.basicAttackFrames<=0&&(this.basicAttackFrames=25,this.model.rotation.x=0,this.model.rotation.y=0,this.canAAttack[DA]=!0,this.canBasicAttack=!0,this.otherPlayer.hitByA[DA]=!1)}if(!this.canAAttack[UA]){this.basicAttackFrames-=1;t=(this.basicAttackObj.attackFrames[UA]-this.basicAttackFrames)/this.basicAttackObj.attackFrames[UA];this.model.hat.position.y+=1,this.model.hat.rotation.y=8*t;s=new THREE.BoxHelper(this.model.hat,16711680);this.attackbbox=(new THREE.Box3).setFromObject(s),this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)&&this.checkHit(UA,"A"),hitBoxesOn&&(stage.scene.add(s),setTimeout(function(){s.geometry.dispose()},50),setTimeout(function(){stage.scene.remove(s)},50)),this.basicAttackFrames<=0&&(this.basicAttackFrames=25,this.model.hat.position.y=8,this.model.hat.rotation.y=0,this.canAAttack[UA]=!0,this.canBasicAttack=!0,this.otherPlayer.hitByA[UA]=!1)}if(!this.canAAttack[NA]){this.basicAttackFrames-=1;var a=(this.basicAttackObj.attackFrames[NA]-this.basicAttackFrames)/this.basicAttackObj.attackFrames[NA];if(this.model.scale.set(.5,.5,.5),this.model.hat.scale.set(3.5,3.5,2),this.model.hat.rotation.z=12*a,this.model.hat.position.y-=.34,this.basicAttackFrames<this.basicAttackObj.attackFrames[NA]-2){s=new THREE.BoxHelper(this.model.hat,16711680);this.attackbbox=(new THREE.Box3).setFromObject(s),this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)&&this.checkHit(NA,"A"),hitBoxesOn&&(stage.scene.add(s),setTimeout(function(){s.geometry.dispose()},50),setTimeout(function(){stage.scene.remove(s)},50))}this.basicAttackFrames<=0&&(this.basicAttackFrames=25,this.model.scale.set(1,1,1),this.model.hat.scale.set(1,1,1),this.model.hat.rotation.z=0,this.model.hat.position.y=8,this.canAAttack[NA]=!0,this.canBasicAttack=!0,this.otherPlayer.hitByA[NA]=!1)}if(!this.canBAttack[S]){this.basicAttackFrames-=1;this.basicAttackObj.attackFrames[NA],this.basicAttackFrames,this.basicAttackObj.attackFrames[NA];this.model.torso.leftArm.rotation.z=-75,this.model.torso.rightArm.rotation.z=75,this.model.torso.leftArm.scale.set(1,1.5,1),this.model.torso.rightArm.scale.set(1,1.5,1);s=new THREE.BoxHelper(this.model,16711680);this.attackbbox=(new THREE.Box3).setFromObject(s),this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)&&this.checkHit(S,"B"),hitBoxesOn&&(stage.scene.add(s),setTimeout(function(){s.geometry.dispose()},50),setTimeout(function(){stage.scene.remove(s)},50)),this.basicAttackFrames<=0&&(this.model.torso.leftArm.rotation.z=0,this.model.torso.rightArm.rotation.z=0,this.model.torso.leftArm.scale.set(1,1,1),this.model.torso.rightArm.scale.set(1,1,1),this.model.rotation.z=0,this.basicAttackFrames=25,this.canBAttack[S]=!0,this.canBasicAttack=!0,this.otherPlayer.hitByB[S]=!1)}if(!this.canBAttack[SS]){this.basicAttackFrames-=1,this.basicAttackFrames!=this.specialAttackObj.attackFrames[SS]-1||this.isRecover?(this.specialAttackObj.castedRight||(this.basicAttackFrames>12.5&&(this.secondRaider.position.x-=2.5),this.basicAttackFrames<12.5&&(this.secondRaider.position.x+=2.5)),this.specialAttackObj.castedRight&&(this.basicAttackFrames>12.5&&(this.secondRaider.position.x+=2.5),this.basicAttackFrames<12.5&&(this.secondRaider.position.x-=2.5))):(this.facingL&&(this.specialAttackObj.castedRight=!1,this.secondRaider.position.set(this.x,this.y,this.z)),this.facingR&&(this.specialAttackObj.castedRight=!0,this.secondRaider.position.set(this.x,this.y,this.z))),coinToss(ATTACK,this.secondRaider);s=new THREE.BoxHelper(this.secondRaider,16711680);this.attackbbox=(new THREE.Box3).setFromObject(s),this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)&&this.checkHit(SS,"B"),hitBoxesOn&&(stage.scene.add(s),setTimeout(function(){s.geometry.dispose()},50),setTimeout(function(){stage.scene.remove(s)},50)),this.basicAttackFrames<=0&&(coinToss(RESET,this.secondRaider),this.basicAttackFrames=25,this.canBAttack[SS]=!0,this.canBasicAttack=!0,this.otherPlayer.hitByB[SS]=!1,this.secondRaider.position.set(stage.maximumX+300,stage.maximumY+300,0))}if(!this.canBAttack[US]){this.basicAttackFrames-=1,this.model.hat.scale.set(1.5,1.5,1.5),this.model.hat.rotation.y+=.78;var e=new THREE.BoxGeometry(8,8,8,1,1,1),h=new THREE.MeshPhongMaterial({emissive:0,opacity:1,transparent:!0,map:(new THREE.TextureLoader).load("images/gateLogo.png")}),o=new THREE.Mesh(e,h).clone();o.position.set(this.x,this.y,this.z),stage.scene.add(o),setTimeout(function(){stage.scene.remove(o)},28),setTimeout(function(){o.geometry.dispose()},28);s=new THREE.BoxHelper(this.model.hat,16711680);this.attackbbox=(new THREE.Box3).setFromObject(s),this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)&&this.checkHit(US,"B"),hitBoxesOn&&(stage.scene.add(s),setTimeout(function(){s.geometry.dispose()},50),setTimeout(function(){stage.scene.remove(s)},50)),this.basicAttackFrames<=0&&(this.model.hat.scale.set(1,1,1),this.basicAttackFrames=25,this.model.hat.rotation.y=0,this.canBAttack[US]=!0,this.canBasicAttack=!0,this.otherPlayer.hitByB[US]=!1)}this.canBAttack[DS]||(this.basicAttackFrames-=1,this.basicAttackFrames<=0&&(this.basicAttackFrames=25,this.canBAttack[DS]=!0,this.canBasicAttack=!0,this.otherPlayer.hitByB[DS]=!1))},walkRight:function(){this.movingR=!0,this.facingR=!0,this.facingL=!1,this.xVel+=this.xAccel,this.xVel>this.maxXVel&&(this.xVel=this.maxXVel),this.isHit=!1},walkLeft:function(){this.movingL=!0,this.facingL=!0,this.facingR=!1,this.xVel-=this.xAccel,this.xVel<-this.maxXVel&&(this.xVel=-this.maxXVel),this.isHit=!1},jump:function(){this.sleeping||(this.jumpCt==this.maxJumpCt&&(this.canJump=!1),this.canJump&&(this.isHit||(this.jumpCt+=1,this.yVel=this.jumpSpeed,this.onGround=!1,this.isHit=!1)))},drop:function(){},recover:function(){this.isRecover=!0,this.yVel=this.recoverVel,this.canRecover=!1,this.isHit=!1},doAnyAttack:function(){var t=!1;if(this.canBasicAttack&&!this.isHit&&!this.isRecover){var s=0;this.heldKeys.up&&this.heldKeys.attack2&&this.canRecover&&!this.isRecover&&(this.recover(),this.canJump=!1),this.facingR&&this.heldKeys.right&&this.heldKeys.attack1&&!this.onGround&&this.canBasicAttack&&this.canAAttack[FA]&&(t=!0,s=this.basicAttackObj.attackFrames[FA],this.canAAttack[FA]=!1,this.canBasicAttack=!1),this.facingL&&this.heldKeys.left&&this.heldKeys.attack1&&!this.onGround&&this.canBasicAttack&&1==this.canAAttack[FA]&&(t=!0,s=this.basicAttackObj.attackFrames[FA],this.canAAttack[FA]=!1,this.canBasicAttack=!1),this.facingL&&this.heldKeys.right&&this.heldKeys.attack1&&!this.onGround&&this.canBasicAttack&&1==this.canAAttack[BA]&&(t=!0,s=this.basicAttackObj.attackFrames[BA],this.canAAttack[BA]=!1,this.canBasicAttack=!1),this.facingR&&this.heldKeys.left&&this.heldKeys.attack1&&!this.onGround&&this.canBasicAttack&&1==this.canAAttack[BA]&&(t=!0,s=this.basicAttackObj.attackFrames[BA],this.canAAttack[BA]=!1,this.canBasicAttack=!1),this.heldKeys.down&&this.heldKeys.attack1&&!this.onGround&&this.canBasicAttack&&1==this.canAAttack[DA]&&(t=!0,s=this.basicAttackObj.attackFrames[DA],this.canAAttack[DA]=!1,this.canBasicAttack=!1),this.heldKeys.up&&this.heldKeys.attack1&&!this.onGround&&this.canBasicAttack&&1==this.canAAttack[UA]&&(t=!0,s=this.basicAttackObj.attackFrames[UA],this.canAAttack[UA]=!1,this.canBasicAttack=!1),this.heldKeys.left||this.heldKeys.right||this.heldKeys.up||this.heldKeys.down||!this.heldKeys.attack1||this.onGround||!this.canBasicAttack||1==this.canAAttack[NA]&&(t=!0,s=this.basicAttackObj.attackFrames[NA],this.canAAttack[NA]=!1,this.canBasicAttack=!1),this.heldKeys.attack1&&this.onGround&&this.canBasicAttack&&1==this.canAAttack[A]&&(t=!0,s=this.basicAttackObj.attackFrames[A],this.canAAttack[A]=!1,this.canBasicAttack=!1),(this.heldKeys.right||this.heldKeys.left)&&this.heldKeys.attack2&&this.canBasicAttack&&1==this.canBAttack[SS]&&(t=!0,s=this.specialAttackObj.attackFrames[SS],this.canBAttack[SS]=!1,this.canBasicAttack=!1),this.heldKeys.down||this.heldKeys.up||this.heldKeys.left||this.heldKeys.right||!this.heldKeys.attack2||!this.canBasicAttack||1==this.canBAttack[S]&&(t=!0,s=this.specialAttackObj.attackFrames[S],this.canBAttack[S]=!1,this.canBasicAttack=!1),this.heldKeys.down&&this.heldKeys.attack2&&this.canBasicAttack&&1==this.canBAttack[DS]&&(t=!0,s=this.specialAttackObj.attackFrames[DS],this.canBAttack[DS]=!1,this.canBasicAttack=!1),this.heldKeys.up&&this.heldKeys.attack2&&this.canBasicAttack&&1==this.canBAttack[US]&&(t=!0,s=this.specialAttackObj.attackFrames[US],this.canBAttack[US]=!1,this.canBasicAttack=!1),this.basicAttackFrames=s,t&&(this.isPlayer1?player1Info.totalAttacksCast+=1:player2Info.totalAttacksCast+=1)}},checkHit:function(t,s){"A"==s?this.otherPlayer.hitByA[t]||(damageToDeal=this.basicAttackObj.damage[t],angleToApply=this.basicAttackObj.launchAngle[t],tKnockback=calculateKnockback(this.otherPlayer.percentage,this.basicAttackObj.damage[t],this.otherPlayer.weight,this.basicAttackObj.scaling,this.basicAttackObj.knockback),this.otherPlayer.isHit=!0,this.isPlayer1?player1Info.totalAttacksHit+=1:player2Info.totalAttacksHit+=1,this.otherPlayer.hitByA[t]=!0,this.doKnockBack(damageToDeal,angleToApply,tKnockback)):this.otherPlayer.hitByB[t]||(damageToDeal=this.specialAttackObj.damage[t],angleToApply=this.specialAttackObj.launchAngle[t],tKnockback=calculateKnockback(this.otherPlayer.percentage,this.specialAttackObj.damage[t],this.otherPlayer.weight,this.specialAttackObj.scaling,this.specialAttackObj.knockback),this.otherPlayer.isHit=!0,this.isPlayer1?player1Info.totalAttacksHit+=1:player2Info.totalAttacksHit+=1,this.otherPlayer.hitByB[t]=!0,this.doKnockBack(damageToDeal,angleToApply,tKnockback))},doKnockBack:function(t,s,i){var a,e,h=new THREE.Vector2;h.x=this.otherPlayer.x-this.x,h.y=this.otherPlayer.y-this.y,h=h.normalize(),a=Math.cos(radians(s))*h.x-Math.sin(radians(s))*h.y,e=Math.sin(radians(s))*h.x+Math.cos(radians(s))*h.y,h.x=a,h.y=Math.abs(e),h=h.normalize(),this.isPlayer1?player1Info.damageDealt+=t:player2Info.damageDealt+=t,this.otherPlayer.percentage+=t,this.otherPlayer.xVel=.5*i*h.x,this.otherPlayer.yVel=.5*i*h.y,this.otherPlayer.hitFrames=2*t,this.otherPlayer.xVel>0?this.otherPlayer.model.rotation.z=-1.57:this.otherPlayer.model.rotation.z=1.57}},raider1={name:"Raider",model:createBasicCharacterMesh(0,0,0),secondRaider:createBasicCharacterMesh(0,0,0).torso.rightArm.rightHand.coin,hitBox:createBasicCharacterBounding(0,0,0),canAAttack:[!0,!0,!0,!0,!0,!0],canBAttack:[!0,!0,!0,!0],hitByA:[!1,!1,!1,!1,!1],hitByB:[!1,!1,!1,!1],init:function(){for(var t=Object.keys(charProto),s=0;s<t.length;s++)this[t[s]]=charProto[t[s]];this.name="Raider",stage.scene.add(this.secondRaider),this.secondRaider.position.set(stage.maximumX+300,stage.maximumY+300,0),this.heldKeys={up:!1,down:!1,left:!1,right:!1,attack1:!1,attack2:!1},this.basicAttackObj=raiderBasic,this.specialAttackObj=raiderSpecial,this.damageDeal=0},setSpawn:function(){this.isPlayer1?(this.x=stage.player1SpawnX,this.y=stage.player1SpawnY,this.z=stage.player1SpawnZ):(this.x=stage.player2SpawnX,this.y=stage.player2SpawnY,this.z=stage.player2SpawnZ)},update:function(){if(this.onGround||(this.isPlayer1?player1Info.inAirDuration+=1/60:player2Info.inAirDuration+=1/60),isDay||(this.isPlayer1?(stage.player1SpotTarget.position.set(this.x,this.y+10,-10),stage.player1Spot.target=stage.player1SpotTarget):(stage.player2SpotTarget.position.set(this.x,this.y+10,-10),stage.player2Spot.target=stage.player2SpotTarget)),this.hitbbox=(new THREE.Box3).setFromObject(this.hitBox),null!=this.boxBelow?this.minDown=this.boxBelow.position.y+this.boxBelow.userData.height/2+this.height/2:this.minDown=-1e3,null!=this.boxLeft?this.minLeft=this.boxLeft.position.x+this.boxLeft.userData.width/2+this.width/2:this.minLeft=-1e3,null!=this.boxRight?this.minRight=this.boxRight.position.x-this.boxRight.userData.width/2-this.width/2:this.minRight=1e3,null!=this.boxAbove?this.minUp=this.boxAbove.position.y-this.boxAbove.userData.height/2-this.height/2:this.minUp=1e5,this.isHit&&(this.hitFrames-=1,this.sleeping=!1),this.hitFrames<0&&(this.isHit=!1),this.yVel-.075<-1.6&&(this.yVel=-1.6),this.yVel-=.075,this.x+=this.xVel,this.y+=this.yVel,this.xVel>8||this.yVel>8){var t=this.model.clone();stage.scene.add(t),setTimeout(function(){stage.scene.remove(t)},50)}this.heldKeys.up&&this.heldKeys.attack2&&this.canRecover&&!this.isRecover&&(this.sleeping||(this.recover(),this.canJump=!1)),!this.heldKeys.right||this.heldKeys.left||this.isHit||this.heldKeys.attack1||this.heldKeys.attack2||this.walkRight(),!this.heldKeys.left||this.heldKeys.right||this.isHit||this.heldKeys.attack1||this.heldKeys.attack2||this.walkLeft(),this.movingR||this.movingL||!this.onGround||this.isHit||(this.xVel=.7*this.xVel),this.movingR||this.movingL||this.onGround||this.isHit||(this.xVel=.99*this.xVel),Math.abs(this.xVel)<5e-4&&(this.xVel=0),this.y<this.minDown&&(this.y=this.minDown,this.canJump=!0,this.jumpCt=0,this.onGround=!0,this.canRecover=!0,this.isRecover=!1),this.y>this.minUp&&(this.y=this.minUp,this.yVel=0),this.x<this.minLeft&&(this.x=this.minLeft),this.x>this.minRight&&(this.x=this.minRight),0==this.stock?(this.model.position.set(1e3,1e3,0),this.hitBox.position.set(1e3,1e3,0)):(this.model.position.set(this.x,this.y,0),this.hitBox.position.set(this.x,this.y+4,0)),this.y>this.minDown&&(this.onGround=!1)},animate:function(){if(this.isRecoiling&&(this.recoilFrames-=1,this.recoilFrames<=0&&(this.recoilFrames=this.recoilFrameDefault,this.isRecoiling=!1)),this.facingR&&(this.model.rotation.y=.5),this.facingL&&(this.model.rotation.y=-.5),!this.movingR&&!this.movingL||0==this.xVel||this.isHit?(this.model.torso.rightLeg.position.y=-3,this.model.torso.leftLeg.position.y=-3,this.model.torso.rightLeg.rotation.x=0,this.model.torso.leftLeg.rotation.x=0,this.model.torso.rightArm.rotation.x=0,this.model.torso.leftArm.rotation.x=-0,this.canAAttack[A]&&!this.isHit&&(this.model.rotation.z=0)):(this.walkStyle1?(this.model.torso.rightLeg.position.y=.5*Math.sin(.5*stage.timer)-3,this.model.torso.leftLeg.position.y=-3-.5*Math.sin(.5*stage.timer)):this.walkStyle2?(this.model.torso.rightLeg.rotation.x=.3*Math.sin(.5*stage.timer),this.model.torso.leftLeg.rotation.x=-.3*Math.sin(.5*stage.timer)):this.walkStyle3&&(this.model.torso.rightLeg.position.y=.5*Math.sin(.2*stage.timer)-3,this.model.torso.leftLeg.position.y=-3-.5*Math.sin(.2*stage.timer),this.model.rotation.z=.1*Math.sin(.2*stage.timer)),this.model.torso.rightArm.rotation.x=.3*Math.sin(.5*stage.timer),this.model.torso.leftArm.rotation.x=-.3*Math.sin(.5*stage.timer),this.canAAttack[A]&&(this.model.rotation.z=0)),stage.timer%500==0?(this.model.head.rightEye.scale.set(1,.2,1),this.model.head.leftEye.scale.set(1,.2,1)):(this.model.head.rightEye.scale.set(1,1,1),this.model.head.leftEye.scale.set(1,1,1)),!this.canAAttack[A]){this.basicAttackFrames-=1;var t=(this.basicAttackObj.attackFrames[A]-this.basicAttackFrames)/this.basicAttackObj.attackFrames[A];if(this.facingL?(this.model.torso.rightArm.rotation.z=radians(-120*t),this.model.torso.rightArm.rightHand.coin.position.x=-10*t,this.basicAttackFrames<=this.basicAttackObj.attackFrames[A]/2?this.model.torso.rightArm.rightHand.coin.position.y-=1:this.basicAttackFrames>this.basicAttackObj.attackFrames[A]/2&&this.basicAttackFrames<=5.5*this.basicAttackObj.attackFrames[A]/10&&(this.model.torso.rightArm.rightHand.coin.position.x+=1,this.model.torso.rightArm.rightHand.coin.position.y-=1),this.model.torso.rightArm.rightHand.coin.scale.set(3.5*t,3.5*t,3.5*t)):(this.model.torso.leftArm.rotation.set(-1.57,0,0),this.model.torso.leftArm.position.x=4.5,this.model.torso.leftArm.position.z=1.5,this.model.torso.leftArm.scale.set(1.5,1.5,1.5)),this.facingL){var s=new THREE.BoxHelper(this.model.torso.rightArm.rightHand.coin,16711680);this.attackbbox=(new THREE.Box3).setFromObject(s),this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)&&this.checkHit(A,"A"),hitBoxesOn&&(stage.scene.add(s),setTimeout(function(){s.geometry.dispose()},50),setTimeout(function(){stage.scene.remove(s)},50))}else{s=new THREE.BoxHelper(this.model.torso.leftArm,16711680);this.attackbbox=(new THREE.Box3).setFromObject(s),this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)&&this.checkHit(A,"A"),hitBoxesOn&&(stage.scene.add(s),setTimeout(function(){s.geometry.dispose()},50),setTimeout(function(){stage.scene.remove(s)},50))}this.basicAttackFrames<=0&&(this.basicAttackFrames=25,this.model.torso.rightArm.rotation.z=0,this.model.torso.leftArm.position.x=4,this.model.torso.rightArm.rightHand.coin.position.x=0,this.model.torso.rightArm.rightHand.coin.position.y=0,this.model.torso.rightArm.rightHand.coin.scale.set(1,1,1),this.model.torso.leftArm.rotation.set(0,0,0),this.model.torso.leftArm.position.z=0,this.model.torso.leftArm.scale.set(1,1,1),this.canAAttack[A]=!0,this.canBasicAttack=!0,this.otherPlayer.hitByA[A]=!1)}if(!this.canAAttack[FA]){this.basicAttackFrames-=1;t=(this.basicAttackObj.attackFrames[FA]-this.basicAttackFrames)/this.basicAttackObj.attackFrames[FA];this.facingL?(this.model.torso.rightArm.rotation.z=45,this.model.torso.leftArm.rotation.z=45,this.x-1.8>=this.minLeft&&(this.x-=1.8)):(this.model.torso.leftArm.rotation.z=-45,this.model.torso.rightArm.rotation.z=-45,this.x+1.8<=this.minRight&&(this.x+=1.8));s=new THREE.BoxHelper(this.model,16711680);this.attackbbox=(new THREE.Box3).setFromObject(s),this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)&&this.checkHit(FA,"A"),hitBoxesOn&&(stage.scene.add(s),setTimeout(function(){s.geometry.dispose()},50),setTimeout(function(){stage.scene.remove(s)},50)),this.basicAttackFrames<=0&&(this.model.torso.leftArm.rotation.z=0,this.model.torso.rightArm.rotation.z=0,this.model.torso.rightArm.scale.set(1,1,1),this.model.torso.leftArm.scale.set(1,1,1),this.basicAttackFrames=25,this.canAAttack[FA]=!0,this.canBasicAttack=!0,this.otherPlayer.hitByA[FA]=!1)}if(this.canAAttack[BA]||(this.basicAttackFrames-=1,this.basicAttackFrames<=0&&(this.basicAttackFrames=25,this.canAAttack[BA]=!0,this.canBasicAttack=!0,this.otherPlayer.hitByA[BA]=!1)),!this.canAAttack[DA]){this.basicAttackFrames-=1;var i=(this.basicAttackObj.attackFrames[DA]-this.basicAttackFrames)/this.basicAttackObj.attackFrames[DA];this.model.rotation.x=90,this.model.rotation.y=12*i;s=new THREE.BoxHelper(this.model.torso,16711680);this.attackbbox=(new THREE.Box3).setFromObject(s),this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)&&this.checkHit(DA,"A"),hitBoxesOn&&(stage.scene.add(s),setTimeout(function(){s.geometry.dispose()},50),setTimeout(function(){stage.scene.remove(s)},50)),this.basicAttackFrames<=0&&(this.basicAttackFrames=25,this.model.rotation.x=0,this.model.rotation.y=0,this.canAAttack[DA]=!0,this.canBasicAttack=!0,this.otherPlayer.hitByA[DA]=!1)}if(!this.canAAttack[UA]){this.basicAttackFrames-=1;t=(this.basicAttackObj.attackFrames[UA]-this.basicAttackFrames)/this.basicAttackObj.attackFrames[UA];this.model.hat.position.y+=1,this.model.hat.rotation.y=8*t;s=new THREE.BoxHelper(this.model.hat,16711680);this.attackbbox=(new THREE.Box3).setFromObject(s),this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)&&this.checkHit(UA,"A"),hitBoxesOn&&(stage.scene.add(s),setTimeout(function(){s.geometry.dispose()},50),setTimeout(function(){stage.scene.remove(s)},50)),this.basicAttackFrames<=0&&(this.basicAttackFrames=25,this.model.hat.position.y=8,this.model.hat.rotation.y=0,this.canAAttack[UA]=!0,this.canBasicAttack=!0,this.otherPlayer.hitByA[UA]=!1)}if(!this.canAAttack[NA]){this.basicAttackFrames-=1;var a=(this.basicAttackObj.attackFrames[NA]-this.basicAttackFrames)/this.basicAttackObj.attackFrames[NA];if(this.model.scale.set(.5,.5,.5),this.model.hat.scale.set(3.5,3.5,2),this.model.hat.rotation.z=12*a,this.model.hat.position.y-=.34,this.basicAttackFrames<this.basicAttackObj.attackFrames[NA]-2){s=new THREE.BoxHelper(this.model.hat,16711680);this.attackbbox=(new THREE.Box3).setFromObject(s),this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)&&this.checkHit(NA,"A"),hitBoxesOn&&(stage.scene.add(s),setTimeout(function(){s.geometry.dispose()},50),setTimeout(function(){stage.scene.remove(s)},50))}this.basicAttackFrames<=0&&(this.basicAttackFrames=25,this.model.scale.set(1,1,1),this.model.hat.scale.set(1,1,1),this.model.hat.rotation.z=0,this.model.hat.position.y=8,this.canAAttack[NA]=!0,this.canBasicAttack=!0,this.otherPlayer.hitByA[NA]=!1)}if(!this.canBAttack[S]){this.basicAttackFrames-=1;this.basicAttackObj.attackFrames[NA],this.basicAttackFrames,this.basicAttackObj.attackFrames[NA];this.model.torso.leftArm.rotation.z=-75,this.model.torso.rightArm.rotation.z=75,this.model.torso.leftArm.scale.set(1,1.5,1),this.model.torso.rightArm.scale.set(1,1.5,1);s=new THREE.BoxHelper(this.model,16711680);this.attackbbox=(new THREE.Box3).setFromObject(s),this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)&&this.checkHit(S,"B"),hitBoxesOn&&(stage.scene.add(s),setTimeout(function(){s.geometry.dispose()},50),setTimeout(function(){stage.scene.remove(s)},50)),this.basicAttackFrames<=0&&(this.model.torso.leftArm.rotation.z=0,this.model.torso.rightArm.rotation.z=0,this.model.torso.leftArm.scale.set(1,1,1),this.model.torso.rightArm.scale.set(1,1,1),this.model.rotation.z=0,this.basicAttackFrames=25,this.canBAttack[S]=!0,this.canBasicAttack=!0,this.otherPlayer.hitByB[S]=!1)}if(!this.canBAttack[SS]){this.basicAttackFrames-=1,this.basicAttackFrames!=this.specialAttackObj.attackFrames[SS]-1||this.isRecover?(this.specialAttackObj.castedRight||(this.basicAttackFrames>12.5&&(this.secondRaider.position.x-=2.5),this.basicAttackFrames<12.5&&(this.secondRaider.position.x+=2.5)),this.specialAttackObj.castedRight&&(this.basicAttackFrames>12.5&&(this.secondRaider.position.x+=2.5),this.basicAttackFrames<12.5&&(this.secondRaider.position.x-=2.5))):(this.facingL&&(this.specialAttackObj.castedRight=!1,this.secondRaider.position.set(this.x,this.y,this.z)),this.facingR&&(this.specialAttackObj.castedRight=!0,this.secondRaider.position.set(this.x,this.y,this.z))),coinToss(ATTACK,this.secondRaider);s=new THREE.BoxHelper(this.secondRaider,16711680);this.attackbbox=(new THREE.Box3).setFromObject(s),this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)&&this.checkHit(SS,"B"),hitBoxesOn&&(stage.scene.add(s),setTimeout(function(){s.geometry.dispose()},50),setTimeout(function(){stage.scene.remove(s)},50)),this.basicAttackFrames<=0&&(coinToss(RESET,this.secondRaider),this.basicAttackFrames=25,this.canBAttack[SS]=!0,this.canBasicAttack=!0,this.otherPlayer.hitByB[SS]=!1,this.secondRaider.position.set(stage.maximumX+300,stage.maximumY+300,0))}if(!this.canBAttack[US]){this.basicAttackFrames-=1,this.model.hat.scale.set(1.5,1.5,1.5),this.model.hat.rotation.y+=.78;var e=new THREE.BoxGeometry(8,8,8,1,1,1),h=new THREE.MeshPhongMaterial({emissive:0,opacity:1,transparent:!0,map:(new THREE.TextureLoader).load("images/gateLogo.png")}),o=new THREE.Mesh(e,h).clone();o.position.set(this.x,this.y,this.z),stage.scene.add(o),setTimeout(function(){stage.scene.remove(o)},28),setTimeout(function(){o.geometry.dispose()},28);s=new THREE.BoxHelper(this.model.hat,16711680);this.attackbbox=(new THREE.Box3).setFromObject(s),this.attackbbox.intersectsBox(this.otherPlayer.hitbbox)&&this.checkHit(US,"B"),hitBoxesOn&&(stage.scene.add(s),setTimeout(function(){s.geometry.dispose()},50),setTimeout(function(){stage.scene.remove(s)},50)),this.basicAttackFrames<=0&&(this.model.hat.scale.set(1,1,1),this.basicAttackFrames=25,this.model.hat.rotation.y=0,this.canBAttack[US]=!0,this.canBasicAttack=!0,this.otherPlayer.hitByB[US]=!1)}this.canBAttack[DS]||(this.basicAttackFrames-=1,this.basicAttackFrames<=0&&(this.basicAttackFrames=25,this.canBAttack[DS]=!0,this.canBasicAttack=!0,this.otherPlayer.hitByB[DS]=!1))},walkRight:function(){this.movingR=!0,this.facingR=!0,this.facingL=!1,this.xVel+=this.xAccel,this.xVel>this.maxXVel&&(this.xVel=this.maxXVel),this.isHit=!1},walkLeft:function(){this.movingL=!0,this.facingL=!0,this.facingR=!1,this.xVel-=this.xAccel,this.xVel<-this.maxXVel&&(this.xVel=-this.maxXVel),this.isHit=!1},jump:function(){this.sleeping||(this.jumpCt==this.maxJumpCt&&(this.canJump=!1),this.canJump&&(this.isHit||(this.jumpCt+=1,this.yVel=this.jumpSpeed,this.onGround=!1,this.isHit=!1)))},drop:function(){},recover:function(){this.isRecover=!0,this.yVel=this.recoverVel,this.canRecover=!1,this.isHit=!1},doAnyAttack:function(){var t=!1;if(this.canBasicAttack&&!this.isHit&&!this.isRecover){var s=0;this.heldKeys.up&&this.heldKeys.attack2&&this.canRecover&&!this.isRecover&&(this.recover(),this.canJump=!1),this.facingR&&this.heldKeys.right&&this.heldKeys.attack1&&!this.onGround&&this.canBasicAttack&&this.canAAttack[FA]&&(t=!0,s=this.basicAttackObj.attackFrames[FA],this.canAAttack[FA]=!1,this.canBasicAttack=!1),this.facingL&&this.heldKeys.left&&this.heldKeys.attack1&&!this.onGround&&this.canBasicAttack&&1==this.canAAttack[FA]&&(t=!0,s=this.basicAttackObj.attackFrames[FA],this.canAAttack[FA]=!1,this.canBasicAttack=!1),this.facingL&&this.heldKeys.right&&this.heldKeys.attack1&&!this.onGround&&this.canBasicAttack&&1==this.canAAttack[BA]&&(t=!0,s=this.basicAttackObj.attackFrames[BA],this.canAAttack[BA]=!1,this.canBasicAttack=!1),this.facingR&&this.heldKeys.left&&this.heldKeys.attack1&&!this.onGround&&this.canBasicAttack&&1==this.canAAttack[BA]&&(t=!0,s=this.basicAttackObj.attackFrames[BA],this.canAAttack[BA]=!1,this.canBasicAttack=!1),this.heldKeys.down&&this.heldKeys.attack1&&!this.onGround&&this.canBasicAttack&&1==this.canAAttack[DA]&&(t=!0,s=this.basicAttackObj.attackFrames[DA],this.canAAttack[DA]=!1,this.canBasicAttack=!1),this.heldKeys.up&&this.heldKeys.attack1&&!this.onGround&&this.canBasicAttack&&1==this.canAAttack[UA]&&(t=!0,s=this.basicAttackObj.attackFrames[UA],this.canAAttack[UA]=!1,this.canBasicAttack=!1),this.heldKeys.left||this.heldKeys.right||this.heldKeys.up||this.heldKeys.down||!this.heldKeys.attack1||this.onGround||!this.canBasicAttack||1==this.canAAttack[NA]&&(t=!0,s=this.basicAttackObj.attackFrames[NA],this.canAAttack[NA]=!1,this.canBasicAttack=!1),this.heldKeys.attack1&&this.onGround&&this.canBasicAttack&&1==this.canAAttack[A]&&(t=!0,s=this.basicAttackObj.attackFrames[A],this.canAAttack[A]=!1,this.canBasicAttack=!1),(this.heldKeys.right||this.heldKeys.left)&&this.heldKeys.attack2&&this.canBasicAttack&&1==this.canBAttack[SS]&&(t=!0,s=this.specialAttackObj.attackFrames[SS],this.canBAttack[SS]=!1,this.canBasicAttack=!1),this.heldKeys.down||this.heldKeys.up||this.heldKeys.left||this.heldKeys.right||!this.heldKeys.attack2||!this.canBasicAttack||1==this.canBAttack[S]&&(t=!0,s=this.specialAttackObj.attackFrames[S],this.canBAttack[S]=!1,this.canBasicAttack=!1),this.heldKeys.down&&this.heldKeys.attack2&&this.canBasicAttack&&1==this.canBAttack[DS]&&(t=!0,s=this.specialAttackObj.attackFrames[DS],this.canBAttack[DS]=!1,this.canBasicAttack=!1),this.heldKeys.up&&this.heldKeys.attack2&&this.canBasicAttack&&1==this.canBAttack[US]&&(t=!0,s=this.specialAttackObj.attackFrames[US],this.canBAttack[US]=!1,this.canBasicAttack=!1),this.basicAttackFrames=s,t&&(this.isPlayer1?player1Info.totalAttacksCast+=1:player2Info.totalAttacksCast+=1)}},checkHit:function(t,s){"A"==s?this.otherPlayer.hitByA[t]||(damageToDeal=this.basicAttackObj.damage[t],angleToApply=this.basicAttackObj.launchAngle[t],tKnockback=calculateKnockback(this.otherPlayer.percentage,this.basicAttackObj.damage[t],this.otherPlayer.weight,this.basicAttackObj.scaling,this.basicAttackObj.knockback),this.otherPlayer.isHit=!0,this.isPlayer1?player1Info.totalAttacksHit+=1:player2Info.totalAttacksHit+=1,this.otherPlayer.hitByA[t]=!0,this.doKnockBack(damageToDeal,angleToApply,tKnockback)):this.otherPlayer.hitByB[t]||(damageToDeal=this.specialAttackObj.damage[t],angleToApply=this.specialAttackObj.launchAngle[t],tKnockback=calculateKnockback(this.otherPlayer.percentage,this.specialAttackObj.damage[t],this.otherPlayer.weight,this.specialAttackObj.scaling,this.specialAttackObj.knockback),this.otherPlayer.isHit=!0,this.isPlayer1?player1Info.totalAttacksHit+=1:player2Info.totalAttacksHit+=1,this.otherPlayer.hitByB[t]=!0,this.doKnockBack(damageToDeal,angleToApply,tKnockback))},doKnockBack:function(t,s,i){var a,e,h=new THREE.Vector2;h.x=this.otherPlayer.x-this.x,h.y=this.otherPlayer.y-this.y,h=h.normalize(),a=Math.cos(radians(s))*h.x-Math.sin(radians(s))*h.y,e=Math.sin(radians(s))*h.x+Math.cos(radians(s))*h.y,h.x=a,h.y=Math.abs(e),h=h.normalize(),this.isPlayer1?player1Info.damageDealt+=t:player2Info.damageDealt+=t,this.otherPlayer.percentage+=t,this.otherPlayer.xVel=.5*i*h.x,this.otherPlayer.yVel=.5*i*h.y,this.otherPlayer.hitFrames=2*t,this.otherPlayer.xVel>0?this.otherPlayer.model.rotation.z=-1.57:this.otherPlayer.model.rotation.z=1.57}};function coinToss(t,s){t?s.scale.set(2.5,2.5,2.5):(s.scale.set(1,1,1),s.position.x=0)}
