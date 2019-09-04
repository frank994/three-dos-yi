
var mesh, renderer, scene, camera, controls;

init();
animate();

function init() {

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // scene
    scene = new THREE.Scene();
    
    // camera
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 15, 20, 30 );
    scene.add( camera );

    // controls
    // controls = new THREE.OrbitControls( camera, renderer.domElement );
    // var controls = new THREE.OrbitControls( camera, renderer.domElement );
    // controls.minDistance = 30;
    // controls.maxDistance = 50;

    // ambient
    scene.add( new THREE.AmbientLight( 0x222222 ) );
    
    // light
    var light = new THREE.PointLight( 0xffffff, 1 );
    camera.add( light );

    // axes
    scene.add( new THREE.AxisHelper( 20 ) );

    // material
    var material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide });

    // mesh a
    var geometry = new THREE.PlaneGeometry( 10, 10, 4, 4 );
    mesh = new THREE.Mesh( geometry, material.clone() );
    mesh.material.color.set( 0xff0000 ); //red
    mesh.renderOrder = 0; // <=================== new
    mesh.position.z = - 10;
    scene.add( mesh );

    // mesh b
    var geometry = new THREE.BoxGeometry( 2, 2, 2 );
    mesh = new THREE.Mesh( geometry, material.clone() );
    mesh.material.color.set( 0x606060 ); //grey
    mesh.renderOrder = 2;
    mesh.position.z = 0;
    scene.add( mesh );

    // mesh c
    var geometry = new THREE.BoxGeometry( 3, 3, 3 );
    mesh = new THREE.Mesh( geometry, material.clone() );
    mesh.material.color.set( 0x0000ff ); //blue
    mesh.material.colorWrite = false; // <================= new
    mesh.renderOrder = 1;
    mesh.position.z = 10;
    scene.add( mesh );

}

function animate() {

    requestAnimationFrame( animate );

    render();

}

function render() {

    renderer.render( scene, camera );

}