var example = (function(){
  "use strict";

Physijs.scripts.worker = 'physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

  var scene = new Physijs.Scene(),
      renderer = new THREE.WebGLRenderer(),
      light = new THREE.AmbientLight(0xFFFFFF),
      camera,
      box,
      ground;

      function initScene(){
        scene.setGravity(new THREE.Vector3(0, -50, -10));
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("webgl-container").appendChild(renderer.domElement);

        scene.add(light);

        camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 1000);

        camera.position.set(60, 50, 60);
        camera.lookAt(scene.position);
        scene.add(camera);

        var boxMaterial = Physijs.createMaterial(
          new THREE.MeshBasicMaterial({color: 0xFF0000}),
          0, //friction
          .8 //restitution/bounciness
        );//end boxMaterial

        box = new Physijs.BoxMesh(
          new THREE.CubeGeometry(15, 15, 15),
          boxMaterial
        );

        box.position.y = 40;
        box.rotation.z = 90;
        box.rotation.y = 50;

        scene.add(box);

        box.addEventListener('collision', function (
            otherObject,
            relativeVelocity,
            relativeRotation,
            contactNormal) {

            if (otherObject.name == "ground") {
                alert('hit ground')
            }//end if

        });//box.addEventListener function

          var groundMaterial = Physijs.createMaterial(
          new THREE.MeshBasicMaterial({color: 0x008888}),
          0, //friction
          .6 //restitution/bounciness
        );//end groundMaterial

        ground = new Physijs.BoxMesh(
          new THREE.CubeGeometry(150, 5, 150),
          groundMaterial,
          0
        );//end ground

        ground.name = 'ground';
        ground.position.y = -25;
        scene.add(ground);

        requestAnimationFrame(render);
      }//end initScene()


      function render() {
        scene.simulate();

        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }//end render()

      window.onload = initScene;

})();//end example
