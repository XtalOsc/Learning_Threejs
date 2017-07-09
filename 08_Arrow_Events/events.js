var example = (function(){
  "use strict";

  var scene = new THREE.Scene(),
      renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
      light = new THREE.AmbientLight(0xFFFFFF),
      camera,
      plane,
      box;

      function initScene(){
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("webgl-container").appendChild(renderer.domElement);

        scene.add(light);

        camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 1000);

        camera.position.z=200;
        scene.add(camera);

        box = new THREE.Mesh(
          new THREE.BoxGeometry(20, 20, 20),
          new THREE.MeshBasicMaterial({color: 0xFF0000})
        );//end box

        box.name = "box";
        scene.add(box);

        var texture = THREE.ImageUtils.loadTexture('grass.jpeg');
        var planeMaterial = new THREE.MeshPhongMaterial({
          map: texture,
          side: THREE.DoubleSide
        });//end planeMaterial

        plane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), planeMaterial);
        plane.rotation.x = 90 * (Math.PI / 180);
        plane.position.y = -10;
        plane.name ="plane";

        scene.add(plane);

        render();
      }//end initScene()

      function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }//end render()

      function checkKey(e) {
        var left = 37,
        up = 38,
        right = 39,
        down = 40,
        increment = 1;

        e = e || window.event;

        if (e.keyCode == up) {
          camera.position.z -= increment;
        }
        else if (e.keyCode == down) {
          camera.position.z += increment;
        }
        else if (e.keyCode == left) {
          camera.position.x -= increment;
        }
        else if (e.keyCode == right) {
          camera.position.x += increment;
        }
      }//end checkKey()
      window.onkeydown = checkKey;
      window.onload = initScene;

      return {
        scene:scene
      }
})();//end example
