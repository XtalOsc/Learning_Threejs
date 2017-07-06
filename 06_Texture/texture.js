var example = (function() {

  "use strict";

  var scene = new THREE.Scene(),
  renderer = new THREE.WebGLRenderer(),
  camera,
  light,
  cube,
  plane;

  function initScene() {

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    document.getElementById("webgl-container").appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);

    camera.position.z = 170;
    camera.position.y = 20;

    scene.add(camera);

    light = new THREE.AmbientLight("#FFF")

    scene.add(light);

    cube = new THREE.Mesh(new THREE.BoxGeometry(40, 40, 40),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('content/crate.jpg')
    }));//end cube

    cube.position.set(0, 20, 0);
    cube.name = "cube";

    scene.add(cube);

    render();
  };//end initScene()

  function render() {

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };//end render


  window.onload = initScene;

  return {
    scene: scene
  }//end return

})();//end example
