var example = (function(){
  "use strict";

  var scene = new THREE.Scene(),
      renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
      light = new THREE.AmbientLight(0xFFFFFF),
      camera,
      box;

      function initScene(){
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("webgl-container").appendChild(renderer.domElement);

        scene.add(light);

        camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 1000);

        camera.position.z=100;
        scene.add(camera);

        box = new THREE.Mesh(
          new THREE.BoxGeometry(20, 20, 20),
          new THREE.MeshBasicMaterial({color: 0xFF0000})
        );//end box

        box.name = "box";
        scene.add(box);
        render();
      }//end initScene()

      function render() {
        box.rotation.x += .01;
        box.rotation.y += .01;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }//end render()

      window.onload = initScene;

      return {
        scene:scene
      }
})();//end example
