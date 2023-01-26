const vshader = `
#include <common>
#include <lights_pars_begin>

uniform float u_time;
uniform float u_radius;

varying vec3 vPosition;
varying vec3 vLightIntensity;

float getDelta(){
  return ((sin(u_time)+1.0)/2.0);
}

void main() {
  float delta = getDelta();
  vec3 vLightFront;
  vec3 vLightBack;
  vec3 objectNormal = delta * normal + (1.0 - delta) * normalize(position);

  #include <defaultnormal_vertex>
  #include <begin_vertex>
  #include <project_vertex>
  #include <lights_lambert_vertex>

  vLightIntensity = vLightFront + vLightBack + ambientLightColor;
  vPosition = position;

  vec3 v = normalize(position) * u_radius;
  vec3 pos = delta * position + (1.0 - delta) * v;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}
`;
const fshader = `
varying vec3 vLightIntensity;
uniform float u_time;

void main()
{
  vec3 color = vec3(((cos(u_time)+1.0)/2.0), ((sin(u_time)+1.0)/2.0), ((sin(u_time)+1.0)/2.0));
  gl_FragColor = vec4(vLightIntensity * color, 1.0);
}
`;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
camera.position.z = 100;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const clock = new THREE.Clock();

// Lights
const ambient = new THREE.HemisphereLight(0x444444, 0x111111, 1);
const light = new THREE.DirectionalLight(0xcccccc, 0.8);
light.position.set(0, 6, 2);
scene.add(ambient);
scene.add(light);

// Uniforms
const uniforms = THREE.UniformsUtils.merge([
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
const geometry = new THREE.BoxGeometry(30, 30, 30, 30, 30, 30);
const bgGeometry = new THREE.PlaneBufferGeometry(500, 500, 1000);

const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vshader,
  fragmentShader: fshader,
  lights: true,
  wireframe: false,
});

const bgMaterial = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: `
    varying vec2 vUv;
    
    void main()
    {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
  `,
  fragmentShader: `
    uniform float u_time;
    varying vec2 vUv;
    uniform vec3 u_color_a;
    uniform vec3 u_color_b;


    float random (vec2 st) {
        return fract(sin(dot(st, vec2(12.9898,78.233)))
                    * 43758.5453123);
    }

    float noise (vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
  
      // Four corners in 2D of a tile
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
  
      // Smooth Interpolation
  
      // Cubic Hermine Curve.  Same as SmoothStep()
      vec2 u = f*f*(3.0-2.0*f);
      // u = smoothstep(0.,1.,f);
  
      // Mix 4 coorners percentages
      return mix(a, b, u.x) +
              (c - a)* u.y * (1.0 - u.x) +
              (d - b) * u.x * u.y;
  }

    float getDelta(float delay){
      return ((sin(u_time + delay)+1.0)/2.0);
    }
    
    void main()
    {
      vec2 st = vUv;

      // Scale the coordinate system to see
      // some noise in action
      vec2 pos = vec2(st*6.0);
      pos.y -= u_time;
  
      // Use the noise function
      float n = noise(pos);


      vec3 color = mix(vec3(getDelta(2.0), getDelta(0.3), getDelta(0.6)), vec3(getDelta(1.3), getDelta(1.6), getDelta(1.3)), n);
  
      gl_FragColor = vec4(color, 1.0);
    }
  `,
  lights: true,
  side: THREE.FrontSide,
  wireframe: false,
});

const ball = new THREE.Mesh(geometry, material);
const bg = new THREE.Mesh(bgGeometry, bgMaterial);
bg.position.z = -35;
scene.add(ball);
scene.add(bg);

composer = null;

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

  if (composer) {
    composer.setSize(window.innerWidth, window.innerHeight);
  }
}

function animate() {
  requestAnimationFrame(animate);
  uniforms.u_time.value += clock.getDelta();

  ball.rotation.x += 0.003;
  ball.rotation.y += 0.003;
  ball.rotation.z += 0.003;

  if (composer) {
    composer.render();
  } else {
    renderer.render(scene, camera);
  }
}
