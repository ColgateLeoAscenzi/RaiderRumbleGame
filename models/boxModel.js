var BlockColors={black:0,red:16716032,grey:13093320,green:65280,brown:3879711,perssonBrown:5722178,brickGlue:14538178,perssonLightBrown:8483162,perssonDarkBrown:5063229,perssonTan:10057545,perssonGrey:9474192,iceBlue:13955577,waterBlue:30654,woodBrown:9988929};function createBasicBoxMesh(e){var o=new THREE.Mesh(new THREE.BoxGeometry(11,2,10,1,1,1),new THREE.MeshPhongMaterial({color:16777215,emissive:11184810})),r=createDirtBlockMesh(e);return r.add(o),o.position.set(0,5.4,0),r}function createGrassMesh(){this.mesh=new THREE.Object3D,this.mesh.name="grassBox";var e=new THREE.BoxGeometry(10,10,10,1,1,1),o=new THREE.MeshPhongMaterial({color:16173719,map:(new THREE.TextureLoader).load("images/fieldDirtTexture.png")}),r=new THREE.Mesh(e,o),n=new THREE.BoxGeometry(10,1,10,1,1,1),s=new THREE.MeshPhongMaterial({color:4368466});n0=new THREE.Mesh(n,s),n0.position.set(0,5.5,0),r.add(n0);var a=1+Math.floor(5*Math.random()),t=new THREE.BoxGeometry(.5,a,.5,1,1,1),h=new THREE.MeshPhongMaterial({color:4368466});n1=new THREE.Mesh(t,h),n1.position.set(1,5.5,-3),r.add(n1),a=1+7*Math.random();var E=new THREE.BoxGeometry(.5,a,.5,1,1,1),l=new THREE.MeshPhongMaterial({color:4368466});n2=new THREE.Mesh(E,l),n2.position.set(2,5.5,-1),r.add(n2),a=1+6*Math.random();var i=new THREE.BoxGeometry(.5,a,.5,1,1,1),w=new THREE.MeshPhongMaterial({color:4368466});n3=new THREE.Mesh(i,w),n3.position.set(0,5.5,2),r.add(n3),ry=1+6*Math.random();var c=new THREE.BoxGeometry(.5,a,.5,1,1,1),M=new THREE.MeshPhongMaterial({color:4368466});n4=new THREE.Mesh(c,M),n4.position.set(0,5.5,3),r.add(n4),ry=1+4*Math.random();new THREE.BoxGeometry(.5,a,.5,1,1,1),new THREE.MeshPhongMaterial({color:4368466});n5=new THREE.Mesh(c,M),n5.position.set(4.4,5.5,4.2),r.add(n5),ry=1+4*Math.random();new THREE.BoxGeometry(.5,a,.5,1,1,1),new THREE.MeshPhongMaterial({color:4368466});return n5=new THREE.Mesh(c,M),n5.position.set(3,5.5,3),r.add(n5),r.castShadow=!0,r.receiveShadow=!0,r.userData={type:"floor",height:10,width:10},r}function createGrassMeshB(){this.mesh=new THREE.Object3D,this.mesh.name="grassBoxB";var e=new THREE.BoxGeometry(10,10,10,1,1,1),o=new THREE.MeshPhongMaterial({color:16173719,map:(new THREE.TextureLoader).load("images/grassTexture.jpg")}),r=new THREE.Mesh(e,o);return r.castShadow=!0,r.receiveShadow=!0,r.userData={type:"floor",height:10,width:10},r}function createCloudMesh(){this.mesh=new THREE.Object3D,this.mesh.name="cloudIco";var e=new THREE.IcosahedronGeometry(5.5,1),o=new THREE.MeshPhongMaterial({color:16777215,transparent:!0,opacity:.64,emissive:5592405,map:(new THREE.TextureLoader).load("images/whiteNoise.jpg")}),r=new THREE.Mesh(e,o);return r.castShadow=!0,r.receiveShadow=!0,r.userData={type:"floor",height:10,width:10},r}function createDirtBlockMesh(e){this.mesh=new THREE.Object3D,this.mesh.name="dirtBlock";var o=new THREE.BoxGeometry(10,10,10,1,1,1),r=new THREE.MeshPhongMaterial({color:BlockColors.grey}),n=new THREE.Mesh(o,r),s=new THREE.BoxGeometry(5,2.5,2,1,1,1),a=new THREE.BoxGeometry(4.5,2.5,2,1,1,1),t=new THREE.BoxGeometry(2.75,2.5,2,1,1,1),h=new THREE.BoxGeometry(1.75,2.5,2,1,1,1);if(1==e)var E=new THREE.MeshPhongMaterial({color:BlockColors.perssonBrown}),l=new THREE.MeshPhongMaterial({color:BlockColors.perssonGrey}),i=new THREE.MeshPhongMaterial({color:BlockColors.perssonLightBrown}),w=new THREE.MeshPhongMaterial({color:BlockColors.perssonTan}),c=(new THREE.MeshPhongMaterial({color:BlockColors.perssonGrey}),new THREE.MeshPhongMaterial({color:BlockColors.perssonGrey}));else if(2==e)E=new THREE.MeshPhongMaterial({color:BlockColors.perssonBrown}),l=new THREE.MeshPhongMaterial({color:BlockColors.perssonDarkBrown}),w=new THREE.MeshPhongMaterial({color:BlockColors.perssonLightBrown}),i=new THREE.MeshPhongMaterial({color:BlockColors.perssonTan}),c=new THREE.MeshPhongMaterial({color:BlockColors.perssonGrey}),new THREE.MeshPhongMaterial({color:BlockColors.brown});else if(3==e)E=new THREE.MeshPhongMaterial({color:BlockColors.perssonBrown}),c=new THREE.MeshPhongMaterial({color:BlockColors.perssonDarkBrown}),w=new THREE.MeshPhongMaterial({color:BlockColors.perssonLightBrown}),l=new THREE.MeshPhongMaterial({color:BlockColors.perssonTan}),i=new THREE.MeshPhongMaterial({color:BlockColors.perssonGrey}),new THREE.MeshPhongMaterial({color:BlockColors.brown});else E=new THREE.MeshPhongMaterial({color:BlockColors.perssonBrown}),w=new THREE.MeshPhongMaterial({color:BlockColors.perssonDarkBrown}),i=new THREE.MeshPhongMaterial({color:BlockColors.perssonLightBrown}),l=new THREE.MeshPhongMaterial({color:BlockColors.perssonTan}),c=new THREE.MeshPhongMaterial({color:BlockColors.perssonGrey}),new THREE.MeshPhongMaterial({color:BlockColors.brown});var M=new THREE.Mesh(s,l);n.add(M),M.position.set(-2.4,0,4.3),M.scale.set(1.1,1.1,1);var T=new THREE.Mesh(t,i);T.position.set(2.5,0,4.3),T.scale.set(1.1,1.1,1),n.add(T);var H=new THREE.Mesh(h,E);H.position.set(-3.7,-3.2,4.3),H.scale.set(1.3,1.1,1),n.add(H);var R=new THREE.Mesh(s,w);R.position.set(1.2,-3.2,4.3),R.scale.set(1.2,1.1,1),n.add(R);var B=new THREE.Mesh(a,c);B.position.set(2.2,3.4,4.3),n.add(B);var d=new THREE.Mesh(a,w);return d.position.set(-2.8,3.4,4.3),n.add(d),n.castShadow=!0,n.receiveShadow=!0,n.userData={type:"floor",height:10,width:10},n}function createDirtBlockMeshB(){this.mesh=new THREE.Object3D,this.mesh.name="dirtBlockB";var e=new THREE.BoxGeometry(10,10,10,1,1,1),o=new THREE.MeshPhongMaterial({color:16173719,map:(new THREE.TextureLoader).load("images/dirtUnder.png")}),r=new THREE.Mesh(e,o);return r.castShadow=!0,r.receiveShadow=!0,r.userData={type:"floor",height:10,width:10},r}function createPlatformMesh(){this.mesh=new THREE.Object3D,this.mesh.name="platform";var e=new THREE.BoxGeometry(10,5,10,1,1,1),o=new THREE.MeshPhongMaterial({color:BlockColors.grey}),r=new THREE.Mesh(e,o),n=new THREE.Mesh(new THREE.BoxGeometry(9.9,1.2,9.9,1,1,1),new THREE.MeshPhongMaterial({color:16777215,emissive:11184810}));return r.add(n),n.position.set(0,2.4,0),r.castShadow=!0,r.receiveShadow=!0,r.userData={type:"platform",height:5,width:10},r}function createBasicBoxBounding(){this.mesh=new THREE.Object3D,this.mesh.name="basicBoxBounding";var e=new THREE.BoxGeometry(10,10,10,1,1,1),o=new THREE.MeshPhongMaterial({color:BlockColors.red,wireframe:!0});return new THREE.Mesh(e,o)}function createPlatformBoxBounding(){this.mesh=new THREE.Object3D,this.mesh.name="basicBoxBounding";var e=new THREE.BoxGeometry(10,5,10,1,1,1),o=new THREE.MeshPhongMaterial({color:BlockColors.red,wireframe:!0});return new THREE.Mesh(e,o)}function createIceBlockMesh(){this.mesh=new THREE.Object3D,this.mesh.name="iceBlockMesh";var e=new THREE.BoxGeometry(10,10,10,1,1,1),o=new THREE.MeshPhongMaterial({color:BlockColors.iceBlue}),r=new THREE.Mesh(e,o);return r.castShadow=!0,r.receiveShadow=!0,r.userData={type:"floor",height:10,width:10},r}function createWaterBlockMesh(){this.mesh=new THREE.Object3D,this.mesh.name="waterBlockMesh";var e=new THREE.BoxGeometry(2200,200,10,1,1,1),o=new THREE.MeshPhongMaterial({color:BlockColors.waterBlue,transparent:!0,opacity:.95}),r=new THREE.Mesh(e,o);return r.castShadow=!0,r.receiveShadow=!0,r.userData={type:"floor",height:10,width:10},r}function createWoodBlockMesh(){this.mesh=new THREE.Object3D,this.mesh.name="woodBlockMesh";var e=new THREE.BoxGeometry(10,10,10,1,1,1),o=new THREE.MeshPhongMaterial({color:BlockColors.woodBrown}),r=new THREE.Mesh(e,o),n=new THREE.BoxGeometry(1,1,1,1,1,1),s=new THREE.MeshBasicMaterial({color:16776960}),a=new THREE.Mesh(n,s),t=new THREE.Mesh(n,s),h=new THREE.Mesh(n,s),E=new THREE.Mesh(n,s);return a.position.set(-3,-3,5),r.add(a),t.position.set(-1,-1,5),r.add(t),h.position.set(1,1,5),r.add(h),E.position.set(3,3,5),r.add(E),r.castShadow=!0,r.receiveShadow=!0,r.userData={type:"floor",height:10,width:10},r}
