var example = (function(){
  "use strict";

  var scene = new THREE.Scene(),
      renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
      light = new THREE.AmbientLight(0xFFFFFF),
      camera,
      box1,
      box2,
      width=800,
      height=600;

      function initScene(){
        renderer.setSize(width, height);
        document.getElementById("webgl-container").appendChild(renderer.domElement);

        scene.add(light);

        camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 1000);

        camera.position.z=200;
        scene.add(camera);

        box1 = new THREE.Mesh(
          new THREE.BoxGeometry(20, 20, 20),
          new THREE.MeshBasicMaterial({color: 0xFFFF00})
        );//end box1

        box1.name = "box1";
        box1.geometry.computeBoundingBox();

        box2 = new THREE.Mesh(
          new THREE.BoxGeometry(20, 20, 20),
          new THREE.MeshBasicMaterial({color: 0x0000FF})
        );//end box2

        box2.name = "box2";
        box2.position.x = 40;
        box2.geometry.computeBoundingBox();

        scene.add(box1);
        scene.add(box2);

        render();
      }//end initScene()


      function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }//end render()

      function checkKey(e) {
        var left = 37, up = 38, right = 39, down = 40, increment = 5;
        e = e || window.event;

        if (e.keyCode == up){
          box1.position.z -= increment;
        }//end if up
        else if (e.keyCode == down){
          box1.position.z += increment;
        }//end else if down
        if (e.keyCode == left){
          box1.position.x -= increment;
        }//end if left
        else if (e.keyCode == right){
          box1.position.x += increment;
        }//end else if right
        checkForCollision();
      }//end checkKey()

      function checkForCollision() {
        var box1Position = new THREE.Box3().setFromObject (box1);
        var box2Position = new THREE.Box3().setFromObject (box2);

        if(box1Position.isIntersectionBox(box2Position)) {
          document.querySelector('h1').textContent='Boxes Touching';
        }//end if
        else {
          document.querySelector('h1').textContent='Boxes Not Touching';
        }//end else
      }//end checkForCollision()

      window.onload = initScene;
      window.onkeydown = checkKey;

      return {
        scene:scene,
        box1:box1,
        box2:box2
      }
})();//end example
