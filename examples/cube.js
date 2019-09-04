import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ConvexBufferGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js';

let scene, camera, renderer, cube, group;
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  renderer = new THREE.WebGLRenderer({ antilias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.sortObjects = false;
  document.body.appendChild(renderer.domElement);
  // lights
  const pointLights = new THREE.PointLight();
  scene.add(pointLights);

  // cube
  const geometry = new THREE.BoxGeometry( 4, 4, 4 );
  const material = new THREE.MeshBasicMaterial({ color: '#fff' });
  cube = new THREE.Mesh( geometry, material );
  cube.renderOrder = 0;
  // scene.add(cube);
  // add group
  group = new THREE.Group();
  scene.add(group);
  // add points
  const loader = new THREE.TextureLoader();
  const texture = loader.load('textures/sprites/disc.png');
  const vertices = geometry.vertices;
  const pointsMaterial = new THREE.PointsMaterial({
    color: 0x0080ff,
    map: texture,
    size: 1,
    alphaTest: 0.5,
  });
  const pointsGeometry = new THREE.BufferGeometry().setFromPoints(vertices);
  const points = new THREE.Points(pointsGeometry, pointsMaterial);
  group.add(points);



  // add sides 
  const meshMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    opacity: 0.5,
    transparent: true,
  });
  const meshGeometry = new ConvexBufferGeometry(vertices);
  var mesh = new THREE.Mesh(meshGeometry, meshMaterial);
  mesh.material.side = THREE.BackSide;
  mesh.renderOrder = 0;
  group.add(mesh);

  mesh = new THREE.Mesh(meshGeometry, meshMaterial.clone());
  mesh.material.side = THREE.FrontSide;
  mesh.renderOrder = 1;
  group.add(mesh);

  // var meshMaterial = new THREE.MeshLambertMaterial({
  //   color: 0xffffff,
  //   opacity: 0.5,
  //   transparent: true
  // });
  // var meshGeometry = new ConvexBufferGeometry(vertices);
  // var mesh = new THREE.Mesh(meshGeometry, meshMaterial);
  // mesh.material.side = THREE.BackSide; // back faces
  // mesh.renderOrder = 0;
  // group.add(mesh);
  // var mesh = new THREE.Mesh(meshGeometry, meshMaterial.clone());
  // mesh.material.side = THREE.FrontSide; // front faces
  // mesh.renderOrder = 1;
  // group.add(mesh);
  // const pints = new THREE.Points()
  // var pointsMaterial = new THREE.PointsMaterial({
  //   color: 0x0080ff,
  //   map: texture,
  //   size: 1,
  //   alphaTest: 0.5
  // });
  // var pointsGeometry = new THREE.BufferGeometry().setFromPoints(vertices);
  // var points = new THREE.Points(pointsGeometry, pointsMaterial);
  // group.add(points);
  // // circle
  const circleGeometry = new THREE.CircleGeometry(1, 32);
  const circleMaterial = new THREE.MeshBasicMaterial({ color: '#f00' });
  const circle = new THREE.Mesh(circleGeometry, circleMaterial);
  circle.renderOrder = 2;
  scene.add(circle);


  // add control
  const control = new OrbitControls(camera, renderer.domElement);
  control.maxDistance = 50;
  control.minDistance = 5;
  control.maxPolarAngle = Math.PI / 2;

  camera.position.z = 5;
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
function animate() {
  requestAnimationFrame(animate);
  // group.rotation.y += 0.005;
  group.position.z += 0.005;
  renderer.render(scene, camera);
}

init();
animate();
