let scene, camera, renderer, cube;
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  renderer = new THREE.WebGLRenderer({ antilias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.sortObjects = false;
  document.body.appendChild(renderer.domElement);


  // cube
  const geometry = new THREE.BoxGeometry( 2, 2, 2 );
  const material = new THREE.MeshBasicMaterial({ color: '#fff' });
  cube = new THREE.Mesh( geometry, material );
  cube.renderOrder = 0;
  scene.add(cube);

  // circle
  const circleGeometry = new THREE.CircleGeometry(1, 32);
  const circleMaterial = new THREE.MeshBasicMaterial({ color: '#f00' });
  const circle = new THREE.Mesh(circleGeometry, circleMaterial);
  circle.renderOrder = 1;
  scene.add(circle);

  camera.position.z = 5;
  // camera.position.z = 5;
  
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
let x = 0;
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

window.addEventListener('resize', onWindowResize, false);
init();
animate();
