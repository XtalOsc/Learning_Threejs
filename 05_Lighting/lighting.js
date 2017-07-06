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

    plane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200),
    new THREE.MeshPhongMaterial({
      color: 0x0088AA,
      specular: 0x003344,
      shininess: 100,
      shading: THREE.FlatShading,
      side: THREE.DoubleSide
    }));//end plane

    plane.rotation.x = 90 * (Math.PI / 180);
    plane.position.y = -10;
    plane.name = "plane";
    plane.receiveShadow = true;

    scene.add(plane);

    light = new THREE.DirectionalLight(new THREE.Color("#FFF"));

    light.position.set(0, 50, 0);
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    scene.add(light);

    cube = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20),
      new THREE.MeshLambertMaterial({color: '#FFF'})
    );//end cube

    cube.position.y = 10;
    cube.name = "cube";
    cube.castShadow = true;

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
