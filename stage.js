var stage = {

  blockA: undefined,
  blockB: undefined,
  gravity: -0.75,
  scene: undefined,
  minimumY: 0,
  height: 0,
  width: 0,
  airResistance: 0,
  init: function(){
    this.scene = this.createScene();
  },
  createScene: function(){
    return new THREE.Scene();
  },
  populateScene: function(){
    //replace the block with blockA
    for(var i = -5; i < 6; i++){
      if(i == -5 || i == 5){
        createBox(i*basicBox.width, basicBox.height, 0);
        createBox(i*basicBox.width, basicBox.height*2, 0);
      }
      if(i == 0){
        createBox(i*basicBox.width, 0, 0);
        createBox(i*basicBox.width, basicBox.height*3, 0);
      }
      else{
        createBox(i*basicBox.width, 0, 0);
      }
    }
  }
}
