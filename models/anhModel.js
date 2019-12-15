var AnhColors = {
    black: 0x000000,
    anhHat: 0x999999,
    anhSkin: 0xb0a896,
    anhJacket: 0x7D807E,
    anhShirt: 0xBBBFBD,
};


function createAnhMesh(x, y, z) {
  this.mesh      = new THREE.Object3D();
  this.mesh.name = "Anh";

  this.mesh.hat = new THREE.Object3D();
  var hatBox = new THREE.BoxGeometry(6.3,2.5,6.3, 1,1,1);
  var hatMat = new THREE.MeshPhongMaterial(
                             { color : AnhColors.anhHat});

  var hatBase = new THREE.Mesh(hatBox, hatMat);

  this.mesh.hat.add(hatBase);

  this.mesh.hat.hatMiddle = new THREE.Object3D();
  var hatMiddleBox = new THREE.BoxGeometry(5.8,1.8,6, 1,1,1);
  var hatMiddleMat = new THREE.MeshPhongMaterial(
                             { color : AnhColors.anhHat});

  var hatMiddleBase = new THREE.Mesh(hatMiddleBox, hatMiddleMat);
  this.mesh.hat.hatMiddle.add(hatMiddleBase);
  this.mesh.hat.hatMiddle.position.set(0,1.65,0);
  this.mesh.hat.add(this.mesh.hat.hatMiddle);
  this.mesh.hat.position.set(0,8,0);


  //HEAD Mesh with eyes
  this.mesh.head = new THREE.Object3D();

  var headBox = new THREE.BoxGeometry(6,6,6, 1,1,1);
  var headMat = new THREE.MeshPhongMaterial(
                            { color : AnhColors.anhSkin});

  var headTop = new THREE.Mesh(headBox, headMat);
  this.mesh.head.add(headTop);

  this.mesh.head.position.y = y + 4.5;

  this.mesh.head.leftEye = new THREE.Object3D();

  var eyeBox = new THREE.BoxGeometry(1,1.5,0.8, 1,1,1);
  var eyeMat = new THREE.MeshPhongMaterial(
                            { color : AnhColors.black});

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

  var torsoBox = new THREE.BoxGeometry(6,4,1, 1,1,1);
  var torsoMat = new THREE.MeshPhongMaterial(
                             { color : AnhColors.anhShirt});

  var shirt = new THREE.Mesh(torsoBox, torsoMat);
  this.mesh.torso.add(shirt);

  this.mesh.torso.position.y = y-0.6;


  this.mesh.torso.leftJacket = new THREE.Object3D();
  var leftJacketBox = new THREE.BoxGeometry(2.5,4,0.8, 1,1,1);
  var leftJacketMat = new THREE.MeshPhongMaterial(
                             { color : AnhColors.anhJacket});
  var leftJacketFlap = new THREE.Mesh(leftJacketBox, leftJacketMat);
  this.mesh.torso.leftJacket.add(leftJacketFlap);
  this.mesh.torso.leftJacket.position.set(-1.75,0,0.9);
  this.mesh.torso.add(this.mesh.torso.leftJacket);


  this.mesh.torso.rightJacket = new THREE.Object3D();
  var rightJacketBox = new THREE.BoxGeometry(2.5,4,0.8, 1,1,1);
  var rightJacketMat = new THREE.MeshPhongMaterial(
                             { color : AnhColors.anhJacket});
  var rightJacketFlap = new THREE.Mesh(rightJacketBox, rightJacketMat);
  this.mesh.torso.rightJacket.add(rightJacketFlap);
  this.mesh.torso.rightJacket.position.set(1.75,0,0.9);
  this.mesh.torso.add(this.mesh.torso.rightJacket);


  //create the arm
  this.mesh.torso.rightArm = new THREE.Object3D();
  var armBox = new THREE.BoxGeometry(2,3,2, 1,1,1);
  var armMat = new THREE.MeshPhongMaterial({ color: AnhColors.anhJacket});

  var rightarm = new THREE.Mesh(armBox, armMat);
  this.mesh.torso.rightArm.add(rightarm);
  this.mesh.torso.rightArm.position.set(-4, 0.5, 0);


  //create the hand
  this.mesh.torso.rightArm.rightHand = new THREE.Object3D();
  var handBox = new THREE.BoxGeometry(2,1,2, 1,1,1);
  var handMat = new THREE.MeshPhongMaterial({ color: AnhColors.black});

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


  var legBox = new THREE.BoxGeometry(2.25, 2.75, 1.9, 1, 1,1);
  var legMat = new THREE.MeshPhongMaterial(
                             { color : AnhColors.black});

  this.mesh.torso.rightLeg = new THREE.Mesh(legBox, legMat);
  this.mesh.torso.add(this.mesh.torso.rightLeg);
  this.mesh.torso.rightLeg.position.set(x-1.75,y-3.25,z)

  this.mesh.torso.leftLeg = this.mesh.torso.rightLeg.clone();
  this.mesh.torso.add(this.mesh.torso.leftLeg);
  this.mesh.torso.leftLeg.position.set(x+1.75,y-3.25,z)

  this.mesh.add(this.mesh.torso);
  this.mesh.add(this.mesh.head);
  this.mesh.add(this.mesh.hat);


  this.mesh.position.set(x,y,z);
  return this.mesh;
}
