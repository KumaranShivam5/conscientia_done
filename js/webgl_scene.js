var camera, scene, fogcolor;
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
camera.position.set(50,0,0);

// scene

scene = new THREE.Scene();
fogColor = new THREE.Color(0x000010);
scene.background = fogColor;
scene.fog = new THREE.Fog(fogColor, 2500, 2500);

var ambientLight = new THREE.AmbientLight(0x00ff00, 0.5);
scene.add( ambientLight );

var pointLight = new THREE.PointLight(0x29C7D5, 5);
camera.add( pointLight );
scene.add(camera);


var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.TorusGeometry(3, 3, 3, 10);
var material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true
});
var materialMonk = new THREE.MeshLambertMaterial({
    wireframe: true
});
var cube = new THREE.Mesh(geometry, material);
cube.scale.set(3, 3, 3);
cube.position.z = -10;
// scene.add(cube);

var monkey;

var city;
var loader = new THREE.OBJLoader();
loader.load('../iist_complete_final.obj', function (object) {
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = materialMonk;
            monkey = object;
        }
    });
    object.position.set(0,0,0);
    object.scale.set(1,1,1);
    object.rotation.x = 0;
    scene.add(object);
    city = object;





});



window.addEventListener('mousemove', function (e) {
    var mouse3D = new THREE.Vector3(
        (event.clientX / window.innerWidth) * 150 - 75,
        -10, 0);

    city.lookAt(mouse3D);
    //ship.lookAt(mouse3D);
});

var amb_light = new THREE.AmbientLight( 0x404040,0.5 ); // soft white light
scene.add( amb_light);
var light_blue = new THREE.PointLight(0x00ff40, 100, 5000);
light_blue.position.set(0, 0, 0);
scene.add(light_blue);
var light_red = new THREE.PointLight(0x10ff10, 100, 1000);
light_red.position.set(0, 0, 0);
scene.add( light_red );
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}





function animate() {
    requestAnimationFrame(animate);
    cube.rotation.y += 0.01;

    
    //cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();