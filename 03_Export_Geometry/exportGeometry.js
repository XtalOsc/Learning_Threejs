var example = (function(){
  "use strict";

  var scene = new THREE.Scene(),
      renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
      light = new THREE.PointLight(0xFFFFFF),
      camera,
      sphere;

      function initScene(){
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("webgl-container").appendChild(renderer.domElement);

        scene.add(light);

        camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 1000);

        camera.position.z=80;
        scene.add(camera);

        var material = new THREE.MeshBasicMaterial({
          color: 0x0000FF,
          wireframe: true
        });

        sphere = new THREE.Mesh(
          new THREE.BoxGeometry(20, 10, 10), material
        );//end sphere

        sphere.name = "sphere";

        var exporter = new THREE.GeometryExporter();
        var exportedSphereObject = exporter.parse(sphere.geometry);
        var serializedExportedSphere = JSON.stringify(exportedSphereObject);

        console.log(serializedExportedSphere);
        console.log(JSON.stringify(serializedExportedSphere));

        var loader = new THREE.JSONLoader();
        var model = loader.parse(JSON.parse(serializedExportedSphere));
        var mesh = new THREE.Group(model.geometry, material);

        scene.add(mesh);

        render();
      }//end initScene()

      function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }//end render()

      window.onload = initScene;

      return {
        scene:scene
      }
})();//end example
