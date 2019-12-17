//damage codes
// normal attack
var A = 0;
//neutral, forward, back, up, down air attack
var NA  = 1; FA = 2; BA = 3; UA = 4; DA = 5;
//special, side special, up special, down special
var S = 0; SS = 1; US = 2; DS = 3;


var raiderBasic = {
  //add knockback based on type of attack, also add
  knockback: 10,
  scaling: 0.1,
  damage: [2,5,5,5,5,5],
  successive: 0,
  //in degrees measured from 0, right ray
  launchAngle: [10, 20, 20, 20, 0, 0],
  attackFrames: [11, 25, 25, 25, 25, 25]
}

var pinguBasic = {
  knockback: 10,
  scaling: 0.1,
  damage: [2,5,5,5,5,5],
  successive: 0,
  launchAngle: [10, 20, 20, 20, 0, 0],
  attackFrames: [11, 25, 25, 25, 25, 25]
}

var anhBasic = {
  //add knockback based on type of attack, also add
  knockback: 10,
  scaling: 0.1,
  damage: [2,5,5,5,5,5],
  successive: 0,
  //in degrees measured from 0, right ray
  launchAngle: [10, 20, 20, 20, 0, 0],
  attackFrames: [11, 25, 25, 25, 25, 25]
}

var raiderSpecial = {
  knockback: 20,
  scaling: 0.1,
  damage: [2,5,0,2],
  successive: 0,
  launchAngle: [20, 0, 30, 0],
  attackFrames: [25, 25, 25, 25]
}

var pinguSpecial = {
  knockback: 20,
  scaling: 0.1,
  damage: [2,2,0,2],
  successive: 0,
  launchAngle: [20, 0, 30, 0],
  attackFrames: [25, 25, 25, 25],
  castedRight: false,
}

var anhSpecial = {
  knockback: 20,
  scaling: 0.1,
  damage: [2,2,0,5],
  successive: 0,
  launchAngle: [20, 0, 30, 90],
  attackFrames: [25, 25, 25, 80]
}


function calculateKnockback(percent, damage, weight, scaling, base){
  //uses the current percent of the hit player,
  //the damage of the move,
  //the weight of the hit player, the scaling and base knockbacks of the move
  //to calculate the speed of knockback on the player
  knockback = (((((percent/10 + (percent*damage)/20)*weight*1.4)+18)*scaling)+base)*0.03


  return knockback;
}
