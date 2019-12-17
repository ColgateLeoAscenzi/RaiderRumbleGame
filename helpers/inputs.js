function handleKeyUp(keyEvent){
    // if(keyEvent.key == "h"){
    //     hitBoxes(blocks, false);
    // }
    if(inGame){
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
        if(keyEvent.key == "s"){
        //jumping
            stage.player1.heldKeys.down = false;
        }
        if(keyEvent.key == "j"){
        //jumping
            stage.player1.heldKeys.attack1 = false;
        }
        if(keyEvent.key == "k"){
        //jumping
            stage.player1.heldKeys.attack2 = false;
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
        }
        if(keyEvent.key == "ArrowDown"){
        //jumping
            stage.player2.heldKeys.down = false;
            stage.player2.jumping = false;
        }
        if(keyEvent.key == "1"){
        //jumping
            stage.player2.heldKeys.attack1 = false;
        }
        if(keyEvent.key == "2"){
        //jumping
            stage.player2.heldKeys.attack2 = false;
        }

    }

    if(inCharSelect){
        if(keyEvent.key == "a"){
          heldDown1.left = false;
        }
        if(keyEvent.key == "d"){
          heldDown1.right = false;
        }
        if(keyEvent.key == "s"){
          heldDown1.down = false;
        }
        if(keyEvent.key == "w"){
          heldDown1.up = false;
        }

        if(keyEvent.key == "ArrowLeft"){
          heldDown2.left = false;
        }
        if(keyEvent.key == "ArrowRight"){
          heldDown2.right = false;
        }
        if(keyEvent.key == "ArrowDown"){
          heldDown2.down = false;
        }
        if(keyEvent.key == "ArrowUp"){
          heldDown2.up = false;
        }
    }




}
function handleKeyDown(keyEvent){
    if(inGame){
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

        if(keyEvent.key == "."){
            if(statsOn){
                var boxVar = document.getElementById("stats");
                boxVar.parentNode.removeChild(boxVar);
                stats.end();
            }
            else{
                stats = new Stats();
                stats.domElement.style.position = 'absolute';
                stats.domElement.style.bottom = '0px';
                stats.domElement.style.zIndex = 100;
                stats.domElement.id = "stats";
                container.appendChild(stats.domElement);
                stats.begin();
            }
            statsOn = !statsOn;
        }

        if(keyEvent.key == "p"){
          if(trackPlayer){
            trackPlayer = false;
          }
          else{
            trackPlayer = true;
          }
        }
        //Music keydown key press
        if(keyEvent.key == "m"){
          console.log("Playing "+stage.bgm);
          if(!playingM){
            mediaElement.play();
            playingM = true;
          }
          else if (playingM){
            mediaElement.pause();
            playingM = false;
          }
        }



        //player 1 control
        if(stage.player1.canMove){
          if(keyEvent.key == "a"){
            //moving left
            stage.player1.heldKeys.left = true;
            // stage.player1.walkLeft();
          }
          if(keyEvent.key == "d"){
            //moving right
            stage.player1.heldKeys.right = true;
            // stage.player1.walkRight();
          }
          if(keyEvent.key == "w"){
            //jumping
            stage.player1.heldKeys.up = true;
            stage.player1.jump();
            this.isGrabLedge = false;
            this.grabLedgeTimer = 100;
          }
          if(keyEvent.key == "s"){
            //jumping
            stage.player1.heldKeys.down = true;
          }
          if(keyEvent.key == "j"){
              stage.player1.heldKeys.attack1 = true;
              stage.player1.doAnyAttack();

          }
          if(keyEvent.key == "k"){
              stage.player1.heldKeys.attack2 = true;
              stage.player1.doAnyAttack();
          }

        }


       //player2 controls
       if(stage.player2.canMove){
         if(keyEvent.key == "ArrowLeft"){
           //moving left
           stage.player2.heldKeys.left = true;
         }
         if(keyEvent.key == "ArrowRight"){
           //moving right
           stage.player2.heldKeys.right = true;
         }
         if(keyEvent.key == "ArrowUp"){
           //jumping
           stage.player2.heldKeys.up = true;
           stage.player2.jump();
         }
         if(keyEvent.key == "ArrowDown"){
           //jumping
           stage.player2.heldKeys.down = true;
         }
         if(keyEvent.key == "1"){
             stage.player2.heldKeys.attack1 = true;
             stage.player2.doAnyAttack();
         }
         if(keyEvent.key == "2"){
             stage.player2.heldKeys.attack2 = true;
             stage.player2.doAnyAttack();
         }
       }
    }

  if(inStageSelect){

      if(keyEvent.key == "ArrowUp"){
        isDay = true;
        removeLights(mapScene);
        stageSelectLightsDay(mapScene);

      }

      if(keyEvent.key == "ArrowDown"){
        isDay = false;
        removeLights(mapScene);
        stageSelectLightsNight(mapScene);
      }

      if(keyEvent.key == "ArrowLeft"){
        omegaOn = true;

      }

      if(keyEvent.key == "ArrowRight"){
        omegaOn = false;

      }
  }
  if(inPostGame){
      if(keyEvent.key == " " || keyEvent.key == "Enter"){
          playAgain();
      }
  }

  if(inMainMenu){
      if(keyEvent.key != "Alt" && keyEvent.key != "Shift" && keyEvent.key != "Tab" && keyEvent.key != "l"){
          if(keyEvent.key != "." && !devMode){
              titleClicked= true;
          }
          else{
              if(!devMode){
                  params = new devParameters();
                  const datGui  = new dat.GUI({ autoPlace: true });
                  datGui.domElement.id = 'gui'
                  folder = datGui.addFolder(`Quick Select`);

                  folder.add(params,"selectedPlayer1");
                  folder.add(params,"selectedPlayer2");
                  folder.add(params,"isDay");
                  folder.add(params,"omegaOn");
                  folder.add(params,"stage");
                  folder.add(params,"submit");
                  devMode = true;
              }
              // else{
              //     devMode = false;
              //     params = undefined;
              //     var boxVar = document.getElementById("gui");
              //     boxVar.parentNode.removeChild(boxVar);
              // }

          }
      }
  }

  if(inCharSelect){
      if(keyEvent.key == "a"){
        heldDown1.left = true;
      }
      if(keyEvent.key == "d"){
        heldDown1.right = true;
      }
      if(keyEvent.key == "s"){
        heldDown1.down = true;
      }
      if(keyEvent.key == "w"){
        heldDown1.up = true;
      }
      if(keyEvent.key == "j"){
          if(!p1SelectorMesh.userData.grabbing){
              checkCollision(p1SelectorMesh, charSelectHitboxes);
          }
          else{
              dropPlayer(p1SelectorMesh, p1Model);
          }
      }

      if(keyEvent.key == "ArrowLeft"){
        heldDown2.left = true;
      }
      if(keyEvent.key == "ArrowRight"){
        heldDown2.right = true;
      }
      if(keyEvent.key == "ArrowDown"){
        heldDown2.down = true;
      }
      if(keyEvent.key == "ArrowUp"){
        heldDown2.up = true;
      }
      if(keyEvent.key == "1"){
          if(!p2SelectorMesh.userData.grabbing){
              checkCollision(p2SelectorMesh, charSelectHitboxes);
          }
          else{
              dropPlayer(p2SelectorMesh, p2Model);
          }
      }

      if(keyEvent.key == " "){
        if(selectedPlayer1!= undefined && selectedPlayer2 !=undefined){
          if(p1InPosition && p2InPosition){
              charactersSelected = true;
          }
        }
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

    stage.player1.addedHitBox = true;
    stage.player2.addedHitBox = true;
    stage.player1.hitBoxEnabled = true;
    stage.player2.hitBoxEnabled = true;

}


function onMouseMove(event){
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onMouseDown(event){
    if(inStageSelect){
        if (HIGHLITED){
          selectedStage = HIGHLITED.userData;
          stageSelected = true;
        }
    }
    if(inModeSelect){
        if(SELECTEDMODE){
            if(SELECTEDMODE.userData.mode == "playGame"){
                modeSelected = true;
            }
        }
    }
    if(inMainMenu){
        if(selectingTitle){
            selectingTitle = false;
            titleClicked = true;
        }
    }
}
