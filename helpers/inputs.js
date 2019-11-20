function handleKeyUp(keyEvent){
    // if(keyEvent.key == "h"){
    //     hitBoxes(blocks, false);
    // }
    if(keyEvent.key == "a"){
    //moving left
        stage.player1.heldKeys.left = false;
        stage.player1.movingL = false;
    }
    if(keyEvent.key == "d"){
    //moving right
        stage.player1.heldKeys.right = false;
        stage.player1.movingR = false;
    }
    if(keyEvent.key == "w"){
    //jumping
        stage.player1.heldKeys.up = false;
        stage.player1.jumping = false;
    }




    //player2
    if(keyEvent.key == "ArrowLeft"){
    //moving left
        stage.player2.heldKeys.left = false;
        stage.player2.movingL = false;
    }
    if(keyEvent.key == "ArrowRight"){
    //moving right
        stage.player2.heldKeys.right = false;
        stage.player2.movingR = false;
    }
    if(keyEvent.key == "ArrowUp"){
    //jumping
        stage.player2.heldKeys.up = false;
        stage.player2.jumping = false;
    }


}
function handleKeyDown(keyEvent){

   if(keyEvent.key == "h"){
       drawRays = !drawRays;
       if(!hitBoxesOn){
           hitBoxesOn = true;
           console.log("hitboxes on");
           toggleHitBoxes(stage.stageHitBoxes, true);
       }
       else{
           hitBoxesOn = false;
           console.log("hitboxes off");
           toggleHitBoxes(stage.stageHitBoxes, false);
       }
   }

   if(keyEvent.key == "p"){
     if(trackPlayer){
       trackPlayer = false;
     }
     else{
       trackPlayer = true;
     }
   }



   //player 1 control
   if(stage.player1.canMove){
     if(keyEvent.key == "a"){
       //moving left
       stage.player1.heldKeys.left = true;
       stage.player1.walkLeft();
     }
     if(keyEvent.key == "d"){
       //moving right
       stage.player1.heldKeys.right = true;
       stage.player1.walkRight();
     }
     if(keyEvent.key == "w"){
       //jumping
       stage.player1.heldKeys.up = true;
       stage.player1.jump();

     }
     if(keyEvent.key == "j"){
       stage.player1.heldKeys.attack1 = true;
       stage.player1.basicAttack();
     }

   }


  //player2 controls
  if(stage.player2.canMove){
    if(keyEvent.key == "ArrowLeft"){
      //moving left
      stage.player2.heldKeys.right = true;
      stage.player2.walkLeft();
    }
    if(keyEvent.key == "ArrowRight"){
      //moving right
      stage.player2.heldKeys.right = true;
      stage.player2.walkRight();
    }
    if(keyEvent.key == "ArrowUp"){
      //jumping
      stage.player2.heldKeys.up = true;
      stage.player2.jump();
    }
    if(keyEvent.key == "1"){
        stage.player2.heldKeys.attack1 = true;
        stage.player2.basicAttack();
    }
  }


}

//visualization
function toggleHitBoxes(objArr, enable){
    if(enable){
        for(var i = 0; i < objArr.length; i++){
            stage.scene.add(objArr[i]);
        }
    }
    else{
        for(var i = 0; i < objArr.length; i++){
            stage.scene.remove(objArr[i]);
        }
    }

}



function onMouseMove(event){
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onMouseDown(event){
  if (HIGHLITED){
    selectedStage = HIGHLITED.userData;
    stageSelected = true;
  }
}


// function handleTapDown(event){
//     mouse.x = (event.touches[0].clientX / window.innerWidth ) * 2 - 1;
//     mouse.y = - (event.touches[0].clientY / window.innerHeight ) * 2 + 1;
//     //player 1 control
//     if(mouse.x < -0.3 && mouse.y < -0.2){
//       //moving left
//       stage.player1.movingL = true;
//       stage.player1.facingL = true;
//       stage.player1.facingR = false;
//       stage.player1.xVel = -stage.player1.walkSpeed;
//     }
//     if(mouse.x > 0.3 && mouse.y < -0.2){
//         stage.player1.movingR = true;
//         stage.player1.facingR = true;
//         stage.player1.facingL = false;
//         stage.player1.xVel = stage.player1.walkSpeed;
//     }
//     if(mouse.y > 0.2){
//         if(stage.player1.jumpCt == stage.player1.maxJumpCt){
//             stage.player1.canJump = false;
//           }
//           if(stage.player1.canJump){
//             stage.player1.jumping = true;
//             stage.player1.yVel = stage.player1.jumpSpeed;
//             stage.player1.jumpCt +=1;
//             stage.player1. onGround = false;
//           }
//     }
//
// }
//
// function handleTapUp(event){
//
//     mouse.x = ( event.changedTouches[0].clientX / window.innerWidth ) * 2 - 1;
//     mouse.y = - ( event.changedTouches[0].clientY / window.innerHeight ) * 2 + 1;
//     //player 1 control
//     if(mouse.x < -0.3 && mouse.y < -0.2){
//         stage.player1.movingL = false;
//     }
//     if(mouse.x > 0.3 && mouse.y < -0.2){
//         stage.player1.movingR = false;
//     }
//     if(mouse.y > 0.2){
//         stage.player1.jumping = false;
//     }
//
//
// }
