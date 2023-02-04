var vshader = `
  uniform float u_time;
  varying vec3 vPosition;


 // create a noise functions that randomly changes the z position of the vertices
  float cnoise(vec3 p) {
    float c = 0.0;
    for (int i = 0; i < 3; i++) {
      c += sin(p.x + p.y + p.z + u_time * 0.1);
      p *= 2.0;
    }
    return c;
  }

  
  
  void main() {
    vPosition = position;
    vec3 newPosition = position + normal * cnoise(position + u_time);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    
  }
`;
var fshader = `
  uniform float u_time;
  varying vec3 vPosition;

  vec3 color_1 = vec3(1.0, 0.0, 0.0);
  vec3 color_2 = vec3(1.0, 0.0, 1.0);


  void main() {
    if (vPosition.z > 1.0) { 
      gl_FragColor = vec4(mix(color_1, color_2, sin(u_time * 0.1)), 1.0);
    } else {
      gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
    }
  }
`;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
camera.position.z = 900;

var renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.physicallyCorrectLights = true;
renderer.setSize(window.innerWidth, window.innerHeight);
var cubeShaderContainer = document.getElementById("cube-shader-container");
// document.body.appendChild(renderer.domElement);
cubeShaderContainer.appendChild(renderer.domElement);
const controls = new THREE.OrbitControls(camera, renderer.domElement);

var clock = new THREE.Clock();

// Lights
var ambient = new THREE.HemisphereLight(0x444444, 0x111111, 1);
var light = new THREE.DirectionalLight(0xcccccc, 0.8);
light.position.set(0, 6, 2);
scene.add(ambient);
scene.add(light);

// Uniforms
var uniforms = THREE.UniformsUtils.merge([
  THREE.UniformsLib["common"],
  THREE.UniformsLib["lights"],
]);
uniforms.u_time = { value: 0.0 };
uniforms.u_mouse = { value: { x: 0.0, y: 0.0 } };
uniforms.u_resolution = { value: { x: 0, y: 0 } };
uniforms.u_radius = { value: 20.0 };
uniforms.u_color_a = { value: new THREE.Color(0xffff00) };
uniforms.u_color_b = { value: new THREE.Color(0xf0ffff) };

// Objects
var geometry = new THREE.PlaneBufferGeometry(500, 500, 1000);

var material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vshader,
  fragmentShader: fshader,
  lights: true,
  wireframe: false,
});

var ball = new THREE.Mesh(geometry, material);
ball.position.z = -35;
scene.add(ball);

onWindowResize();
if ("ontouchstart" in window) {
  document.addEventListener("touchmove", move);
} else {
  window.addEventListener("resize", onWindowResize, false);
  document.addEventListener("mousemove", move);
}

function move(evt) {
  uniforms.u_mouse.value.x = evt.touches ? evt.touches[0].clientX : evt.clientX;
  uniforms.u_mouse.value.y = evt.touches ? evt.touches[0].clientY : evt.clientY;
}

animate();

function onWindowResize(event) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.x = window.innerWidth;
  uniforms.u_resolution.value.y = window.innerHeight;
}

function animate() {
  requestAnimationFrame(animate);
  uniforms.u_time.value += clock.getDelta();

  renderer.render(scene, camera);
}
