var Colors = {
    black:0x222222,
    red:0xff1100,
    grey: 0xb0a896,
    white: 0xffffff,
    green: 0x02aa20,
    colgateMaroon: 0x821019,
    winterGray: 0xd2d4d6,
    colgateRed: 0xE10028,
    pinguBlue: 0x4f69b8,
    pinguGray: 0xd9d1e4,
    pinguBrown: 0x482a25,
    pinguOrange: 0xd26617,
    pinguBlack: 0x19181e,
    coinColor: 0xf2be75,

};

function createBasicCharacterMesh(x, y, z) {
  this.mesh      = new THREE.Object3D();
  this.mesh.name = "ColgateRaider";

// BACKGROUND REMOVE LATER
  var geomBox = new THREE.BoxGeometry(10, 10, 0.2, 1, 1, 1);
  var matBox  = new THREE.MeshPhongMaterial(
                             { color : Colors.grey})

  var box = new THREE.Mesh(geomBox, matBox);

  box.castShadow = true;
  box.receiveShadow = true;

  // this.mesh.add(box);
  //HAT mesh
  this.mesh.hat = new THREE.Object3D();
  var hatBox = new THREE.BoxGeometry(6.5,2.5,6.5, 1,1,1);
  var hatMat = new THREE.MeshPhongMaterial(
                             { color : Colors.colgateMaroon});

  var hatBase = new THREE.Mesh(hatBox, hatMat);

  this.mesh.hat.add(hatBase);

  this.mesh.hat.hatMiddle = new THREE.Object3D();
  var hatMiddleBox = new THREE.BoxGeometry(3,2.5,6.5, 1,1,1);
  var hatMiddleMat = new THREE.MeshPhongMaterial(
                             { color : Colors.colgateMaroon});

  var hatMiddleBase = new THREE.Mesh(hatMiddleBox, hatMiddleMat);
  this.mesh.hat.hatMiddle.add(hatMiddleBase);
  this.mesh.hat.hatMiddle.position.set(0,2,0);
  this.mesh.hat.add(this.mesh.hat.hatMiddle);
  this.mesh.hat.position.set(0,8,0);


  //HEAD Mesh with eyes
  this.mesh.head = new THREE.Object3D();

  var headBox = new THREE.BoxGeometry(6,6,6, 1,1,1);
  var headMat = new THREE.MeshPhongMaterial(
                            { color : Colors.grey});

  var headTop = new THREE.Mesh(headBox, headMat);
  this.mesh.head.add(headTop);

  this.mesh.head.position.y = y + 4.5;

  this.mesh.head.leftEye = new THREE.Object3D();

  var eyeBox = new THREE.BoxGeometry(1,1.5,0.8, 1,1,1);
  var eyeMat = new THREE.MeshPhongMaterial(
                            { color : Colors.black});

  //add eyemesh to eye object
  var lefteye = new THREE.Mesh(eyeBox, eyeMat);
  this.mesh.head.leftEye.add(lefteye);
  this.mesh.head.leftEye.position.set(-1.4,0,3);

  this.mesh.head.rightEye = this.mesh.head.leftEye.clone();
  this.mesh.head.rightEye.position.set(1.4,0,3);
  this.mesh.head.add(this.mesh.head.rightEye);

  this.mesh.head.add(this.mesh.head.leftEye);

  //TORSO made of shirt material
  this.mesh.torso = new THREE.Object3D();

  var torsoBox = new THREE.BoxGeometry(6,4,2, 1,1,1);
  var torsoMat = new THREE.MeshPhongMaterial(
                             { color : Colors.colgateMaroon});

  var shirt = new THREE.Mesh(torsoBox, torsoMat);
  this.mesh.torso.add(shirt);

  this.mesh.torso.position.y = y-0.6;

  //create the arm
  this.mesh.torso.rightArm = new THREE.Object3D();
  var armBox = new THREE.BoxGeometry(2,3,2, 1,1,1);
  var armMat = new THREE.MeshPhongMaterial({ color: Colors.colgateMaroon});

  var rightarm = new THREE.Mesh(armBox, armMat);
  this.mesh.torso.rightArm.add(rightarm);
  this.mesh.torso.rightArm.position.set(-4, 0.5, 0);


  //create the hand
  this.mesh.torso.rightArm.rightHand = new THREE.Object3D();
  var handBox = new THREE.BoxGeometry(2,1,2, 1,1,1);
  var handMat = new THREE.MeshPhongMaterial({ color: Colors.black});

  var righthand = new THREE.Mesh(handBox, handMat);

  //add the hand model to hand object
  this.mesh.torso.rightArm.rightHand.add(righthand);
  this.mesh.torso.rightArm.rightHand.position.y = -2;

  //add hand object to arm object
  this.mesh.torso.rightArm.add(this.mesh.torso.rightArm.rightHand);

  //add the arm to the torso
  this.mesh.torso.add(this.mesh.torso.rightArm);

  //create left arm
  this.mesh.torso.leftArm = this.mesh.torso.rightArm.clone();
  this.mesh.torso.leftArm.position.set(4, 0.5,0);
  //add the left arm
  this.mesh.torso.add(this.mesh.torso.leftArm);

  //create the coin in his hand
  this.mesh.torso.rightArm.rightHand.coin = new THREE.Object3D();
  var coinBox = new THREE.CylinderGeometry(2,2,1, 19);
  var coinMat = new THREE.MeshPhongMaterial({ color: Colors.coinColor});

  var coinBase = new THREE.Mesh(coinBox, coinMat);
  this.mesh.torso.rightArm.rightHand.coin.add(coinBase);
  this.mesh.torso.rightArm.rightHand.coin.rotation.set(1.57,0,0);
  this.mesh.torso.rightArm.rightHand.coin.position.set(-1.0,-0.5,1);
  this.mesh.torso.rightArm.rightHand.add(this.mesh.torso.rightArm.rightHand.coin);

  //legs added to base of torso
  var legBox = new THREE.BoxGeometry(2.25, 2.75, 1.9, 1, 1,1);
  var legMat = new THREE.MeshPhongMaterial(
                             { color : Colors.black});

  this.mesh.torso.rightLeg = new THREE.Mesh(legBox, legMat);
  this.mesh.torso.add(this.mesh.torso.rightLeg);
  this.mesh.torso.rightLeg.position.set(x-1.9,y-3.25,z)

  this.mesh.torso.leftLeg = this.mesh.torso.rightLeg.clone();
  this.mesh.torso.add(this.mesh.torso.leftLeg);
  this.mesh.torso.leftLeg.position.set(x+1.9,y-3.25,z)

  this.mesh.add(this.mesh.torso);
  this.mesh.add(this.mesh.head);
  this.mesh.add(this.mesh.hat);


  this.mesh.position.set(x,y,z);
  return this.mesh;

}

function createPinguMesh(x, y, z) {
  this.mesh      = new THREE.Object3D();
  this.mesh.name = "Pingu";

// BACKGROUND REMOVE LATER
  var geomBox = new THREE.BoxGeometry(10, 10, 0.2, 1, 1, 1);
  var matBox  = new THREE.MeshPhongMaterial(
                             { color : Colors.grey})

  var box = new THREE.Mesh(geomBox, matBox);

  box.castShadow = true;
  box.receiveShadow = true;

  // this.mesh.add(box);
  //HAT mesh
  this.mesh.hat = new THREE.Object3D();
  var hatBox = new THREE.BoxGeometry(5.2,1.5,5.2, 1,1,1);

  var colorsOfFacesOfHat = [new THREE.MeshPhongMaterial({ color : Colors.pinguBlue}), new THREE.MeshPhongMaterial({ color : Colors.pinguBlue}),
      new THREE.MeshPhongMaterial({ color : Colors.pinguBlack}), new THREE.MeshPhongMaterial({ color : Colors.pinguBlue}),
      new THREE.MeshPhongMaterial({ color : Colors.pinguBlue}), new THREE.MeshPhongMaterial({ color : Colors.pinguBlue})];

  var hatBase = new THREE.Mesh(hatBox, colorsOfFacesOfHat);

  this.mesh.hat.add(hatBase);

  this.mesh.hat.tail = new THREE.Object3D();

  var hatTailBox = new THREE.BoxGeometry(2,2,2, 1,1,1);
  var hatTailMat = new THREE.MeshPhongMaterial(
                            { color : Colors.pinguBlue});

   var hatTailBase = new THREE.Mesh(hatTailBox, hatTailMat);
   this.mesh.hat.tail.add(hatTailBase);

   this.mesh.hat.tail.firstRibbon = new THREE.Object3D();

   var ribbonBox = new THREE.BoxGeometry(1.5,1.5,3, 1,1,1);
   var ribbonMat = new THREE.MeshPhongMaterial(
                             { color : Colors.pinguBlue});

    var firstRibbonBase = new THREE.Mesh(ribbonBox, ribbonMat);
    this.mesh.hat.tail.firstRibbon.add(firstRibbonBase);
    this.mesh.hat.tail.firstRibbon.position.set(0,0.5,-2);
    this.mesh.hat.tail.add(this.mesh.hat.tail.firstRibbon);

   this.mesh.hat.tail.position.z = z - 3;
   this.mesh.hat.add(this.mesh.hat.tail);

   this.mesh.hat.position.y = y + 7;

  //HEAD Mesh with eyes
  this.mesh.head = new THREE.Object3D();

  var headBox = new THREE.BoxGeometry(5,3.5,5, 1,1,1);
  var headMat = new THREE.MeshPhongMaterial(
                            { color : Colors.pinguGray});

  var colorsOfFacesOfHead = [new THREE.MeshPhongMaterial({ color : Colors.pinguBlack}), new THREE.MeshPhongMaterial({ color : Colors.pinguBlack}),
                              new THREE.MeshPhongMaterial({ color : Colors.pinguBlack}), new THREE.MeshPhongMaterial({ color : Colors.pinguBlack}),
                             new THREE.MeshPhongMaterial({ color : Colors.pinguGray}), new THREE.MeshPhongMaterial({ color : Colors.pinguBlack})];

  var headTop = new THREE.Mesh(headBox, colorsOfFacesOfHead);
  this.mesh.head.add(headTop);

  this.mesh.head.position.y = y + 4;

  this.mesh.head.leftEye = new THREE.Object3D();

  var eyeBox = new THREE.BoxGeometry(1,1.5,0.5, 1,1,1);
  var eyeMat = new THREE.MeshPhongMaterial(
                            { color : Colors.black});

  //add eyemesh to eye object
  var lefteye = new THREE.Mesh(eyeBox, eyeMat);
  this.mesh.head.leftEye.add(lefteye);
  this.mesh.head.leftEye.position.set(-1.4,0.5,3);

  this.mesh.head.rightEye = this.mesh.head.leftEye.clone();
  this.mesh.head.rightEye.position.set(1.4,0.5,3);
  this.mesh.head.add(this.mesh.head.rightEye);

  this.mesh.head.add(this.mesh.head.leftEye);

  this.mesh.head.beak = new THREE.Object3D();
  var beakBox = new THREE.ConeGeometry(1,2,5);
  var beakMat = new THREE.MeshPhongMaterial(
                            { color : Colors.pinguOrange});
  var beakBase = new THREE.Mesh(beakBox, beakMat);

  this.mesh.head.beak.add(beakBase);
  this.mesh.head.beak.position.set(0,-1,3.25);
  this.mesh.head.beak.rotation.set(1.57,0,0);

  this.mesh.head.add(this.mesh.head.beak);

  //TORSO made of shirt material
  this.mesh.torso = new THREE.Object3D();

  var torsoBox = new THREE.BoxGeometry(6,6,6, 1,1,1);
  var torsoMat = new THREE.MeshPhongMaterial(
                             { color : Colors.pinguGray});

  var colorsOfFacesOfTorso = [new THREE.MeshPhongMaterial({ color : Colors.pinguBlack}),
                                new THREE.MeshPhongMaterial({ color : Colors.pinguBlack}),
                                new THREE.MeshPhongMaterial({ color : Colors.pinguBlack}),
                                new THREE.MeshPhongMaterial({ color : Colors.pinguBlack}),
                               new THREE.MeshPhongMaterial({ color : Colors.pinguGray}),
                               new THREE.MeshPhongMaterial({ color : Colors.pinguBlack})];

  var shirt = new THREE.Mesh(torsoBox, colorsOfFacesOfTorso);
  this.mesh.torso.add(shirt);

  this.mesh.torso.position.y = y-0.6;

  //create the arm
  this.mesh.torso.rightArm = new THREE.Object3D();
  var armBox = new THREE.BoxGeometry(1.5,3,2, 1,1,1);
  var armMat = new THREE.MeshPhongMaterial({ color: Colors.pinguBlack});

  var rightarm = new THREE.Mesh(armBox, armMat);
  this.mesh.torso.rightArm.add(rightarm);
  this.mesh.torso.rightArm.position.set(-4, 0.5, 0);


  //create the hand
  this.mesh.torso.rightArm.rightHand = new THREE.Object3D();
  var handBox = new THREE.BoxGeometry(1.5,1,2, 1,1,1);
  var handMat = new THREE.MeshPhongMaterial({ color: Colors.pinguBlack});

  var righthand = new THREE.Mesh(handBox, handMat);

  //add the hand model to hand object
  this.mesh.torso.rightArm.rightHand.add(righthand);
  this.mesh.torso.rightArm.rightHand.position.y = -2;

  //add hand object to arm object
  this.mesh.torso.rightArm.add(this.mesh.torso.rightArm.rightHand);

  //add the arm to the torso
  this.mesh.torso.add(this.mesh.torso.rightArm);

  //create left arm
  this.mesh.torso.leftArm = this.mesh.torso.rightArm.clone();
  this.mesh.torso.leftArm.position.set(4, 0.5,0);
  //add the left arm
  this.mesh.torso.add(this.mesh.torso.leftArm);

  this.mesh.torso.rightArm.rightHand.sword = new THREE.Object3D();
  var swordBaseBox = new THREE.BoxGeometry(2,1,2,1,1,1);
  var swordBaseMat = new THREE.MeshPhongMaterial({ color: Colors.pinguBrown});
  var swordBase = new THREE.Mesh(swordBaseBox, swordBaseMat);

  this.mesh.torso.rightArm.rightHand.sword.add(swordBase);

  this.mesh.torso.rightArm.rightHand.sword.swordTop = new THREE.Object3D();
  var swordTopBox = new THREE.BoxGeometry(1.5,5,1.5,1,1,1);
  var swordTopMat = new THREE.MeshPhongMaterial({ color: Colors.pinguBrown});
  var swordTopBase = new THREE.Mesh(swordTopBox, swordTopMat);

  this.mesh.torso.rightArm.rightHand.sword.swordTop.add(swordTopBase);
  this.mesh.torso.rightArm.rightHand.sword.swordTop.position.set(0,1.5,0);
  this.mesh.torso.rightArm.rightHand.sword.add(this.mesh.torso.rightArm.rightHand.sword.swordTop);
  this.mesh.torso.rightArm.rightHand.sword.position.set(-0.4,1,0.7);
  this.mesh.torso.rightArm.rightHand.sword.rotation.set(0,0,0.6);
  this.mesh.torso.rightArm.rightHand.add(this.mesh.torso.rightArm.rightHand.sword);

  //legs added to base of torso
  var legBox = new THREE.BoxGeometry(2.25, 2, 1.9, 1, 1,1);
  var legMat = new THREE.MeshPhongMaterial(
                             { color : Colors.pinguOrange});

  this.mesh.torso.rightLeg = new THREE.Mesh(legBox, legMat);
  this.mesh.torso.add(this.mesh.torso.rightLeg);
  this.mesh.torso.rightLeg.position.set(x-1.9,y-3.25,z)


  this.mesh.torso.leftLeg = this.mesh.torso.rightLeg.clone();
  this.mesh.torso.add(this.mesh.torso.leftLeg);
  this.mesh.torso.leftLeg.position.set(x+1.9,y-3.25,z)

  this.mesh.torso.position.y;
  this.mesh.head.position.y+=0.25;
  this.mesh.hat.position.y-=0.2;
  this.mesh.add(this.mesh.torso);
  this.mesh.add(this.mesh.head);
  this.mesh.add(this.mesh.hat);

  this.mesh.position.set(x,y,z);
  return this.mesh;

}


//hitbox
function createBasicCharacterBounding(x,y,z){

  this.mesh      = new THREE.Object3D();
  this.mesh.name = "basicCharacterBounding";

	  // Create the Cabin
  var geomBox = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
  var matBox  = new THREE.MeshPhongMaterial(
                             { color : Colors.red,wireframe: true});

  var box = new THREE.Mesh(geomBox, matBox);

  this.mesh.add(box);
  this.mesh.position.set(x,y,z);

  return this.mesh;

}

function createBasicAttackModel(){
    this.mesh      = new THREE.Object3D();
    this.mesh.name = "basicAttackMesh";

        // Create the Cabin
    var geomHBox = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
    var matHBox  = new THREE.MeshPhongMaterial(
                               { color : Colors.red, opacity: 1, transparent: true});

    var boxH = new THREE.Mesh(geomHBox, matHBox);

    this.mesh.add(boxH);

    return this.mesh;
}
