var Colors = {
    black:0x222222,
    red:0xff1100,
    grey: 0xb0a896,
    white: 0xffffff,
    green: 0x02aa20,
    colgateMaroon: 0x821019,
    winterGray: 0xd2d4d6,
    colgateRed: 0xE10028

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


  this.mesh.position.set(x,y,z);
  return this.mesh;

}


function createBasicCharacterBounding(x,y,z){

  this.mesh      = new THREE.Object3D();
  this.mesh.name = "basicCharacterBounding";

	  // Create the Cabin
  var geomBox = new THREE.BoxGeometry(10, 20, 10, 1, 1, 1);
  var matBox  = new THREE.MeshPhongMaterial(
                             { color : Colors.red,wireframe: true});

  var box = new THREE.Mesh(geomBox, matBox);

  this.mesh.add(box);
  this.mesh.position.set(x,y,z);


  return this.mesh;

};
