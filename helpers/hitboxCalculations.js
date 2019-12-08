function drawbbox(bboxMesh){
  selectedStageDat.scene.add(bboxMesh);
}

function removebbox(bboxMesh){
  selectedStageDat.scene.remove(bboxMesh);
  bboxMesh.geometry.dispose();
}
