import * as THREE from 'three';
var STLLoader = require('three-stl-loader')(THREE);

let scene,
  camera,
  renderer,
  loader,
  material,
  mesh,
  geometry;

init();

function init() {
  camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  scene = new THREE.Scene();
  // geometry = new THREE.IcosahedronGeometry();

  // for (var i = 0, l = geometry.vertices.length; i < l; i++) {
  //   // we'll move the x & y position of each vertice by a random amount
  //   geometry.vertices[i].x += -1 + Math.random() * 2;
  //   geometry.vertices[i].y += -1 + Math.random() * 2;
  // };
  loader = new STLLoader();

  material = new THREE.MeshBasicMaterial({
    color: 0xdeff14,
  });

  // mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);

  loader.load(
    './../assets/dino.stl',
    function (geometry) {
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded')
    },
    (error) => {
      console.log(error);
    }
  );

  console.log(scene);

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
