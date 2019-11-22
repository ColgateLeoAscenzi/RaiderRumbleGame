//damage codes
// normal attack
var A = 0;
//neutral, forward, back, up, down air attack
var NA  = 1; FA = 2; BA = 3; UA = 4; DA = 5;
//special, side special, up special, down special
var S = 0; SS = 1; US = 2; DS = 3;


var raiderBasic = {
  attackModel: createBasicAttackModel(),
  attackHitBox: createBasicAttackModel(),
  //add knockback based on type of attack, also add
  knockback: 10,
  scaling: 0.1,
  damage: [5,5,5,5,5,5],
  successive: 0
}

var pinguBasic = {
  attackModel: createBasicAttackModel(),
  attackHitBox: createBasicAttackModel(),
  knockback: 10,
  scaling: 0.1,
  damage: [5,5,5,5,5,5],
  successive: 0
}

var raiderSpecial = {
  attackModel: createSpecialAttackModel(),
  attackHitBox: createBasicAttackModel(),
  knockback: 20,
  scaling: 0.1,
  damage: [2,2,0,2],
  successive: 0
}

var pinguSpecial = {
  attackModel: createSpecialAttackModel(),
  attackHitBox: createBasicAttackModel(),
  knockback: 20,
  scaling: 0.1,
  damage: [2,2,0,2],
  successive: 0
}


function calculateKnockback(percent, damage, weight, scaling, base){
  //uses the current percent of the hit player,
  //the damage of the move,
  //the weight of the hit player, the scaling and base knockbacks of the move
  //to calculate the speed of knockback on the player
  knockback = (((((percent/10 + (percent*damage)/20)*weight*1.4)+18)*scaling)+base)*0.08


  return knockback;
}
