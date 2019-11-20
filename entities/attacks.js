var attackProto = {
  knockback: 10,
  scaling: 0.1,
  damage: 5,
  successive: 0
}

var raiderBasic = {
  attackModel: createBasicAttackModel(),
  attackHitBox: createBasicAttackModel(),
  knockback: 10,
  scaling: 0.1,
  damage: 5,
  successive: 0
}

var pinguBasic = {
  attackModel: createBasicAttackModel(),
  attackHitBox: createBasicAttackModel(),
  knockback: 10,
  scaling: 0.1,
  damage: 5,
  successive: 0
}

var raiderSpecial = {
  attackModel: createBasicAttackModel(),
  attackHitBox: createBasicAttackModel(),
  knockback: 20,
  scaling: 0.1,
  damage: 2,
  successive: 0
}

var pinguSpecial = {
  attackModel: createBasicAttackModel(),
  attackHitBox: createBasicAttackModel(),
  knockback: 20,
  scaling: 0.1,
  damage: 2,
  successive: 0
}


function calculateKnockback(percent, damage, weight, scaling, base){
  //uses the current percent of the hit player,
  //the damage of the move,
  //the weight of the hit player, the scaling and base knockbacks of the move
  //to calculate the speed of knockback on the player
  knockback = (((((percent/10 + (percent*damage)/20)*weight*1.4)+18)*scaling)+base)*0.02


  return knockback;
}
