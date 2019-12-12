var particles = {
  particlePalette: {
    sword: new THREE.Mesh(new THREE.BoxGeometry(1.5,1.5,1.5, 1, 1, 1), new THREE.MeshPhongMaterial({ color : 0xaaaaaa, opacity: 1, transparent: true})).clone(),
    heartPiece: new THREE.Mesh(new THREE.BoxGeometry(2,2,2, 1, 1, 1), new THREE.MeshPhongMaterial({ color : 0xaa0000, opacity: 1, transparent: true, emissive: 0xff7dc2})).clone()
  }
}
