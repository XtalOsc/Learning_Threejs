var example = (function(){
  "use strict";

  var scene = new THREE.Scene(),
      renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
      light = new THREE.AmbientLight(0xFFFFFF),
      camera,
      controls,
      clock = new THREE.Clock(),
      plane,
      box;

      function initScene(){
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("webgl-container").appendChild(renderer.domElement);

        scene.add(light);

        camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 1000);

        camera.position.z=300;
        scene.add(camera);

        box = new THREE.Mesh(
          new THREE.BoxGeometry(20, 20, 20),
          new THREE.MeshBasicMaterial({color:0xFF0000})
        );//end box

        var texture = THREE.ImageUtils.loadTexture('content/grass.jpeg');
        var planeMaterial = new THREE.MeshPhongMaterial({
          map: texture,
          side: THREE.DoubleSide
        });//end planeMaterial

        plane = new THREE.Mesh(new THREE.PlaneGeometry(800, 800), planeMaterial);
        plane.rotation.x = 90 * (Math.PI / 180);
        plane.position.y = -10;
        plane.name ="plane";

        scene.add(plane);
        scene.add(box);

        controls = new THREE.FlyControls(camera);
        controls.movementSpeed = 100;
        controls.domElement = document.getElementById("webgl-container");
        controls.rollSpeed = Math.PI / 24;

        render();
      }//end initScene()

      function render() {
        var delta = clock.getDelta();
        controls.update(delta);

        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }//end render()


      window.onload = initScene;

      return {
        scene:scene
      }
})();//end example
