var example = (function() {

  "use strict";

  var scene = new THREE.Scene(),
  renderer = new THREE.WebGLRenderer(),
  camera,
  light,
  plane;

  function initScene() {

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById("webgl-container").appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);

    camera.position.z = 150;
    camera.position.y = -5;

    scene.add(camera);

    var texture = THREE.ImageUtils.loadTexture('content/fire.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    texture.repeat.set(50, 50);

    plane = new THREE.Mesh(new THREE.PlaneGeometry(3400, 3400),
    new THREE.MeshPhongMaterial({
        shininess: 100,
        map: texture,
        side: THREE.DoubleSide
      })//end THREE.MeshPhongMaterial
    );//end plane

    plane.rotation.x = 90 * (Math.PI / 180);
    plane.position.y = -10;

    plane.name = "plane";

    scene.add(plane);

    light = new THREE.DirectionalLight(new THREE.Color("#FFEE00"));
    light.position.set(0, 50, 0);

    scene.add(light);

    render();
  };//end initScene()

  function alterGeometry(){
    for (var i = 1; i <= plane.geometry.vertices.length - 1; i++) {
      var random = Math.floor((Math.random() * 10) - 1) / 50;
      plane.geometry.vertices[i].z += random;
    };//end for
    plane.geometry.verticesNeedUpdate = true;
    plane.material.needsUpdate = true;
  }//end alterGeometry()

  function render() {
    var random = Math.floor((Math.random() * 10) - 1);
    if (random > 9) {
      alterGeometry();
    }//end if
    if (plane) {
      plane.material.map.offset.x += .005;
      plane.material.map.offset.y += .005;
    }//end if

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };//end render

  window.onload = initScene;

  return {
    scene: scene
  }//end return

})();//end example
