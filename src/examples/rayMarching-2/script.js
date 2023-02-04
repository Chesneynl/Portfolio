var vshader = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;
var fshader = `
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

const int MAX_MARCHING_STEPS = 255;
const float MIN_DIST = 0.0;
const float MAX_DIST = 100.0;
const float PRECISION = 0.001;

float sdSphere(vec3 p, float r, vec3 offset  )
{
  return length(p - offset) - r;
}

float sdFloor(vec3 p) {
  return p.y + 1.;
}

float sdScene(vec3 p) {
  float sphereLeft = sdSphere(p, 1., vec3(-1.5, 0, -2));
  float sphereRight = sdSphere(p, 1., vec3(1.5, 0, -2));
  float res = min(sphereLeft, sphereRight);
  res = min(res, sdFloor(p));
  return res;
}

float rayMarch(vec3 ro, vec3 rd, float start, float end) {
  float depth = start;

  for (int i = 0; i < MAX_MARCHING_STEPS; i++) {
    vec3 p = ro + depth * rd;
    float d = sdScene(p);
    depth += d;
    if (d < PRECISION || depth > end) break;
  }

  return depth;
}

vec3 calcNormal(vec3 p) {
  vec2 e = vec2(1.0, -1.0) * 0.0005; // epsilon
  float r = 1.; // radius of sphere
  return normalize(
    e.xyy * sdScene(p + e.xyy) +
    e.yyx * sdScene(p + e.yyx) +
    e.yxy * sdScene(p + e.yxy) +
    e.xxx * sdScene(p + e.xxx));
}

void main()
{
  vec2 uv = (gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
  vec3 backgroundColor = vec3(0.835, 1, 1);

  vec3 col = vec3(0);
  vec3 ro = vec3(0, 0, 3); // ray origin that represents camera position
  vec3 rd = normalize(vec3(uv, -1)); // ray direction

  float d = rayMarch(ro, rd, MIN_DIST, MAX_DIST); // distance to sphere

  if (d > MAX_DIST) {
    col =  backgroundColor; // ray didn't hit anything
  } else {
    vec3 p = ro + rd * d; // point on sphere we discovered from ray marching
    vec3 normal = calcNormal(p);
    vec3 lightPosition = vec3(2, 2, 7);
    vec3 lightDirection = normalize(lightPosition - p);

    // Calculate diffuse reflection by taking the dot product of 
    // the normal and the light direction.
    float dif = clamp(dot(normal, lightDirection), 0.3, 1.);

    // Multiply the diffuse reflection value by an orange color and add a bit
    // of the background color to the sphere to blend it more with the background.
    col = dif * vec3(1, 0.58, 0.29) + backgroundColor * .2;

  }

  // Output to screen
  gl_FragColor = vec4(col, 1.0);
}


`;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
camera.position.z = 100;

var renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
var cubeShaderContainer = document.getElementById("ray-marching-container");
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
var geometry = new THREE.BoxGeometry(30, 30, 30, 30, 30, 30);
var bgGeometry = new THREE.PlaneBufferGeometry(500, 500, 1000);

var material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vshader,
  fragmentShader: fshader,
  lights: true,
  wireframe: false,
});

var bgMaterial = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vshader,
  fragmentShader: fshader,
  lights: true,
  side: THREE.FrontSide,
  wireframe: false,
});

var bg = new THREE.Mesh(bgGeometry, bgMaterial);
bg.position.z = -35;
scene.add(bg);

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
