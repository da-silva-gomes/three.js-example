import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'

let scene,
  camera,
  renderer,
  loader,
  material,
  mesh,
  geo,
  mat,
  wireframeSegment;

init();

function init() {
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  scene = new THREE.Scene();
  loader = new STLLoader();

  material = new THREE.MeshPhongMaterial({
    color: 0xe8e8e8,
    emissive: 0xe8e8e8,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });

  loader.load(
    '../src/assets/dino.stl',
    function (geometry) {
      mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(-5, -5, 6);
      mesh.rotation.set(- Math.PI / 2, 0 , 0);
      mesh.scale.set(0.2, 0.2, 0.2);

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      scene.add(mesh);

      geo = new THREE.WireframeGeometry(mesh.geometry);
      mat = new THREE.LineBasicMaterial({ color: 0xdeff14, linewidth: 10 });
      wireframeSegment = new THREE.LineSegments(geo, mat);
      mesh.add(wireframeSegment);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded')
    },
    (error) => {
      console.log(error);
    }
  );

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff, 0);
  document.body.appendChild(renderer.domElement);
}



function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.01;
}

animate();
