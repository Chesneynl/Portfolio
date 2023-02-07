var vshader = `
  uniform float u_time;
  varying vec3 pos;
  varying vec4 vPos;
  float ampl = 4.0;

  void main() {
    vec4 result;
    pos = position;
    result = vec4( position.x, ampl*sin(position.z/4.0 + u_time) + position.y, position.z, 1.0);
    vPos = result;
    gl_Position = projectionMatrix * modelViewMatrix * result;
  }
`;
var fshader = `

  varying vec3 pos;
  varying vec4 vPos;
  uniform float u_time;
  uniform vec3 u_color_a;

  void main() {
    vec3 color = vec3(1.0, 1.0, 1.0);
    float normalY = (vPos.y + 6.0) / 11.0;
    float normalX = (vPos.x + 12.0) / 12.0;
    float normalZ = (vPos.z + 12.0) / 12.0;

    float colorX = 0.8 * normalY;
    float colorY = sin( normalY + u_time) * normalY;
    float colorZ = cos((normalZ) * normalY + u_time) * sin(u_time) * normalY;


    if (vPos.x == 0.0) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }  else {
      gl_FragColor = vec4( vec3(colorX, colorY, colorZ) , 1.0);
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
scene.background = new THREE.Color(0xb5faea);
scene.add(ambient);
scene.add(light);

// const axesHelper = new THREE.AxesHelper(30);
// scene.add(axesHelper);

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
var geometry = new THREE.BoxGeometry(30, 4, 30, 30, 4, 30);

var material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vshader,
  fragmentShader: fshader,
  lights: true,
  wireframe: false,
});
camera.position.z = 30;
camera.position.x = -50;
camera.position.y = 20;
camera.lookAt(new THREE.Vector3(0, 0, 0));

var ball = new THREE.Mesh(geometry, material);

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
