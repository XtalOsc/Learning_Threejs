var example = (function(){
  "use strict";

  var scene = new THREE.Scene(),
      renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
      light = new THREE.AmbientLight(0xFFFFFF),
      camera,
      objects = [],
      sphere1,
      sphere2,
      width = 800,
      height = 600;

      function initScene(){
        renderer.setSize(width, height);
        document.getElementById("webgl-container").appendChild(renderer.domElement);

        scene.add(light);

        camera = new THREE.PerspectiveCamera(35, width/height, 1, 1000);

        camera.position.z=150;
        scene.add(camera);

        sphere1 = new THREE.Mesh(
          new THREE.SphereGeometry(20, 16, 16),
          new THREE.MeshBasicMaterial({color:0xFF0000,})
        );//end sphere1
        sphere1.position.set(-25, 0, 0);
        objects.push(sphere1);
        sphere2 = new THREE.Mesh(
          new THREE.SphereGeometry(20, 16, 16),
          new THREE.MeshBasicMaterial({color:0x00FF00})
        );//end sphere2
        sphere2.position.set(25, 0, 0);
        objects.push(sphere2);
        scene.add(sphere1);
        scene.add(sphere2);

        render();
      }//end initScene()

      function render() {

        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }//end render()

      function onDocumentMouseDown(event) {
        var projector = new THREE.Projector();

        var mouseClickVector= new THREE.Vector3(
          (event.clientX/width) * 2 - 1,
          (event.clientY/height) * 2 + 1,
          0.5);//end mouseClickVector
        mouseClickVector.unproject(camera);

        var raycaster = new THREE.Raycaster(camera.position, mouseClickVector.sub(camera.position).normalize());

        var intersects = raycaster.intersectObjects(objects);

        if (intersects.length > 0) {
          intersects[0].object.material.color.setHex(Math.random() * 0xFFFFFF);
        }//end if
      }//end onDocumentMouseDown()

      window.onload = initScene;
      window.addEventListener('mousedown', onDocumentMouseDown, false);

      return {
        scene:scene
      }
})();//end example
