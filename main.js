// import './style.css';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// // Setup

// const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// const renderer = new THREE.WebGLRenderer({
//   canvas: document.querySelector('#bg'),
// });

// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
// camera.position.setZ(30);
// camera.position.setX(-3);

// renderer.render(scene, camera);

// // Torus

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

// // Lights

// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(5, 5, 5);

// const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(pointLight, ambientLight);

// // Helpers

// // const lightHelper = new THREE.PointLightHelper(pointLight)
// // const gridHelper = new THREE.GridHelper(200, 50);
// // scene.add(lightHelper, gridHelper)

// // const controls = new OrbitControls(camera, renderer.domElement);

// function addStar() {
//   const geometry = new THREE.SphereGeometry(0.25, 24, 24);
//   const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
//   const star = new THREE.Mesh(geometry, material);

//   const [x, y, z] = Array(3)
//     .fill()
//     .map(() => THREE.MathUtils.randFloatSpread(100));

//   star.position.set(x, y, z);
//   scene.add(star);
// }

// Array(200).fill().forEach(addStar);

// // Background

// const spaceTexture = new THREE.TextureLoader().load('./assets/space.jpg');
// scene.background = spaceTexture;

// // Avatar

// const jeffTexture = new THREE.TextureLoader().load('./assets/jeff.png');

// const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));

// scene.add(jeff);

// // Moon

// const moonTexture = new THREE.TextureLoader().load('./assets/moon.jpg');
// const normalTexture = new THREE.TextureLoader().load('./assets/normal.jpg');

// const moon = new THREE.Mesh(
//   new THREE.SphereGeometry(3, 32, 32),
//   new THREE.MeshStandardMaterial({
//     map: moonTexture,
//     normalMap: normalTexture,
//   })
// );

// scene.add(moon);

// moon.position.z = 30;
// moon.position.setX(-10);

// jeff.position.z = -5;
// jeff.position.x = 2;

// // Scroll Animation

// function moveCamera() {
//   const t = document.body.getBoundingClientRect().top;
//   moon.rotation.x += 0.05;
//   moon.rotation.y += 0.075;
//   moon.rotation.z += 0.05;

//   jeff.rotation.y += 0.01;
//   jeff.rotation.z += 0.01;

//   camera.position.z = t * -0.01;
//   camera.position.x = t * -0.0002;
//   camera.rotation.y = t * -0.0002;
// }

// document.body.onscroll = moveCamera;
// moveCamera();

// // Animation Loop

// function animate() {
//   requestAnimationFrame(animate);

//   torus.rotation.x += 0.01;
//   torus.rotation.y += 0.005;
//   torus.rotation.z += 0.01;

//   moon.rotation.x += 0.005;

//   // controls.update();

//   renderer.render(scene, camera);
// }

// animate();


import {
  DoubleSide,
  PCFSoftShadowMap,
  MeshPhysicalMaterial,
  TextureLoader,
  FloatType,
  PMREMGenerator,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  ACESFilmicToneMapping,
  sRGBEncoding,
  Mesh,
  SphereGeometry,
  MeshBasicMaterial,
  Vector2,
  DirectionalLight,
  Clock,
  RingGeometry,
  Vector3,
  PlaneGeometry,
  CameraHelper,
  Group,
} from "https://cdn.skypack.dev/three@0.137";
import { RGBELoader } from "https://cdn.skypack.dev/three-stdlib@2.8.5/loaders/RGBELoader";
import { OrbitControls } from "https://cdn.skypack.dev/three-stdlib@2.8.5/controls/OrbitControls";
import { GLTFLoader } from "https://cdn.skypack.dev/three-stdlib@2.8.5/loaders/GLTFLoader";
import anime from 'https://cdn.skypack.dev/animejs@3.2.1';

const scene = new Scene();

let sunBackground = document.querySelector(".sun-background");
let moonBackground = document.querySelector(".moon-background");

const ringsScene = new Scene();

const camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(0, 15, 50);

const ringsCamera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
ringsCamera.position.set(0, 0, 50);

const renderer = new WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = ACESFilmicToneMapping;
renderer.outputEncoding = sRGBEncoding;
renderer.physicallyCorrectLights = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const sunLight = new DirectionalLight(
  new Color("#FFFFFF").convertSRGBToLinear(),
  3.5,
);
sunLight.position.set(10, 20, 10);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 512;
sunLight.shadow.mapSize.height = 512;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 100;
sunLight.shadow.camera.left = -10;
sunLight.shadow.camera.bottom = -10;
sunLight.shadow.camera.top = 10;
sunLight.shadow.camera.right = 10;
scene.add(sunLight);

const moonLight = new DirectionalLight(
  new Color("#77ccff").convertSRGBToLinear(),
  0,
);
moonLight.position.set(-10, 20, 10);
moonLight.castShadow = true;
moonLight.shadow.mapSize.width = 512;
moonLight.shadow.mapSize.height = 512;
moonLight.shadow.camera.near = 0.5;
moonLight.shadow.camera.far = 100;
moonLight.shadow.camera.left = -10;
moonLight.shadow.camera.bottom = -10;
moonLight.shadow.camera.top = 10;
moonLight.shadow.camera.right = 10;
scene.add(moonLight);

// // Create a helper for the shadow camera (optional)
// const helper = new CameraHelper( light.shadow.camera );
// scene.add( helper );

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.dampingFactor = 0.05;
controls.enableDamping = true;

let mousePos = new Vector2(0,0);

(async function () {
  let pmrem = new PMREMGenerator(renderer);
  let envmapTexture = await new RGBELoader()
    .setDataType(FloatType)
    .loadAsync("assets/old_room_2k.hdr");  // thanks to https://polyhaven.com/hdris !
  let envMap = pmrem.fromEquirectangular(envmapTexture).texture;

  let textures = {
    // thanks to https://free3d.com/user/ali_alkendi !
    bump: await new TextureLoader().loadAsync("assets/earthbump.jpg"),
    map: await new TextureLoader().loadAsync("assets/earthmap.jpg"),
    spec: await new TextureLoader().loadAsync("assets/earthspec.jpg"),
    planeTrailMask: await new TextureLoader().loadAsync("assets/mask.png"),
  };

  // Important to know!
  // textures.map.encoding = sRGBEncoding;

  let sphere = new Mesh(
    new SphereGeometry(10, 70, 70),
    new MeshPhysicalMaterial({
      map: textures.map,
      roughnessMap: textures.spec,
      bumpMap: textures.bump,
      bumpScale: 0.05,
      envMap,
      envMapIntensity: 0.4,
      sheen: 1,
      sheenRoughness: 0.75,
      sheenColor: new Color("#ff8a00").convertSRGBToLinear(),
      clearcoat: 0.5,
    }),
  );
  sphere.sunEnvIntensity = 0.4;
  sphere.moonEnvIntensity = 0.1;
  sphere.rotation.y += Math.PI * 1.25;
  sphere.receiveShadow = true;
  scene.add(sphere);


  const ring1 = new Mesh(
    new RingGeometry(15, 13.5, 80, 1, 0),
    new MeshPhysicalMaterial({
      color: new Color("#FFCB8E").convertSRGBToLinear().multiplyScalar(200),
      roughness: 0.25,
      envMap,
      envMapIntensity: 1.8,
      side: DoubleSide,
      transparent: true,
      opacity: 0.35,
    })
  );
  ring1.name = "ring";
  ring1.sunOpacity = 0.35;
  ring1.moonOpacity = 0.03;
  ringsScene.add(ring1);

  const ring2 = new Mesh(
    new RingGeometry(16.5, 15.75, 80, 1, 0), 
    new MeshBasicMaterial({
      color: new Color("#FFCB8E").convertSRGBToLinear(),
      transparent: true,
      opacity: 0.5,
      side: DoubleSide,
    })
  );
  ring2.name = "ring";
  ring2.sunOpacity = 0.35;
  ring2.moonOpacity = 0.1;
  ringsScene.add(ring2);

  const ring3 = new Mesh(
    new RingGeometry(18, 17.75, 80),
    new MeshBasicMaterial({
      color: new Color("#FFCB8E").convertSRGBToLinear().multiplyScalar(50),
      transparent: true,
      opacity: 0.5,
      side: DoubleSide,
    })
  );
  ring3.name = "ring";
  ring3.sunOpacity = 0.35;
  ring3.moonOpacity = 0.03;
  ringsScene.add(ring3);

  // https://sketchfab.com/3d-models/cartoon-plane-f312ec9f87794bdd83630a3bc694d8ea#download
  // "Cartoon Plane" (https://skfb.ly/UOLT) by antonmoek is licensed under Creative Commons Attribution 
  // (http://creativecommons.org/licenses/by/4.0/).
  let plane = (await new GLTFLoader().loadAsync("assets/plane/scene.glb")).scene.children[0];
  let planesData = [
    makePlane(plane, textures.planeTrailMask, envMap, scene),
    makePlane(plane, textures.planeTrailMask, envMap, scene),
    makePlane(plane, textures.planeTrailMask, envMap, scene),
    makePlane(plane, textures.planeTrailMask, envMap, scene),
    makePlane(plane, textures.planeTrailMask, envMap, scene),
  ];


  let daytime = true;
  let animating = false;
  window.addEventListener("mousemove", (e) => {
    if(animating) return;
    
    let anim = [0, 1];

    if(e.clientX > (innerWidth - 200) && !daytime) {
      anim = [1, 0];
    } else if(e.clientX < 200 && daytime) {
      anim = [0, 1];
    } else {
      return;
    }

    animating = true;

    let obj = { t: 0 };
    anime({
      targets: obj,
      t: anim,
      complete: () => {
        animating = false;
        daytime = !daytime;
      },
      update: () => {
        sunLight.intensity = 3.5 * (1-obj.t);
        moonLight.intensity = 3.5 * obj.t;

        sunLight.position.setY(20 * (1-obj.t));
        moonLight.position.setY(20 * obj.t);

        sphere.material.sheen = (1-obj.t);
        scene.children.forEach((child) => {
          child.traverse((object) => {
            if(object instanceof Mesh && object.material.envMap) {
              object.material.envMapIntensity = object.sunEnvIntensity * (1-obj.t) + object.moonEnvIntensity * obj.t;
            }
          });
        });
      
        ringsScene.children.forEach((child, i) => {
          child.traverse((object) => {
            object.material.opacity = object.sunOpacity * (1-obj.t) + object.moonOpacity * obj.t;
          });
        });

        sunBackground.style.opacity = 1-obj.t;
        moonBackground.style.opacity = obj.t;
      },
      easing: 'easeInOutSine',
      duration: 500,
    });
  });


  let clock = new Clock();

  renderer.setAnimationLoop(() => {

    let delta = clock.getDelta();
    sphere.rotation.y += delta * 0.05;

    controls.update();
    renderer.render(scene, camera);

    ring1.rotation.x = ring1.rotation.x * 0.95 + mousePos.y * 0.05 * 1.2;
    ring1.rotation.y = ring1.rotation.y * 0.95 + mousePos.x * 0.05 * 1.2;

    ring2.rotation.x = ring2.rotation.x * 0.95 + mousePos.y * 0.05 * 0.375;
    ring2.rotation.y = ring2.rotation.y * 0.95 + mousePos.x * 0.05 * 0.375;

    ring3.rotation.x = ring3.rotation.x * 0.95 - mousePos.y * 0.05 * 0.275;
    ring3.rotation.y = ring3.rotation.y * 0.95 - mousePos.x * 0.05 * 0.275;


    planesData.forEach(planeData => {
      let plane = planeData.group;
    
      plane.position.set(0,0,0);
      plane.rotation.set(0,0,0);
      plane.updateMatrixWorld();
      /**
       * idea: first rotate like that:
       * 
       *          y-axis
       *  airplane  ^
       *      \     |     /
       *       \    |    /
       *        \   |   /
       *         \  |  /
       *     angle ^
       * 
       * then at the end apply a rotation on a random axis
       */           
      planeData.rot += delta * 0.25;
      plane.rotateOnAxis(planeData.randomAxis, planeData.randomAxisRot); // random axis
      plane.rotateOnAxis(new Vector3(0, 1, 0), planeData.rot);    // y-axis rotation
      plane.rotateOnAxis(new Vector3(0, 0, 1), planeData.rad);    // this decides the radius
      plane.translateY(planeData.yOff);
      plane.rotateOnAxis(new Vector3(1,0,0), +Math.PI * 0.5);
    });

    renderer.autoClear = false;
    renderer.render(ringsScene, ringsCamera);
    renderer.autoClear = true;
  });
})();

function nr() {
  return Math.random() * 2 - 1;
}

function makePlane(planeMesh, trailTexture, envMap, scene) {
  let plane = planeMesh.clone();
  plane.scale.set(0.001, 0.001, 0.001);
  plane.position.set(0,0,0);
  plane.rotation.set(0,0,0);
  plane.updateMatrixWorld();

  plane.traverse((object) => {
    if(object instanceof Mesh) {
      object.material.envMap = envMap;
      object.sunEnvIntensity = 1;
      object.moonEnvIntensity = 0.3;
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });
  
  let trail = new Mesh(
    new PlaneGeometry(1, 2),
    new MeshPhysicalMaterial({
      envMap,
      envMapIntensity: 3,

      roughness: 0.4,
      metalness: 0,
      transmission: 1,

      transparent: true,
      opacity: 1,
      alphaMap: trailTexture,
    })
  );
  trail.sunEnvIntensity = 3;
  trail.moonEnvIntensity = 0.7;
  trail.rotateX(Math.PI);
  trail.translateY(1.1);

  let group = new Group();
  group.add(plane);
  group.add(trail);

  scene.add(group);

  return {
    group,
    yOff: 10.5 + Math.random() * 1.0,
    rot: Math.PI * 2,  // just to set a random starting point
    rad: Math.random() * Math.PI * 0.45 + Math.PI * 0.05,
    randomAxis: new Vector3(nr(), nr(), nr()).normalize(),
    randomAxisRot: Math.random() * Math.PI * 2,
  };
}

window.addEventListener("mousemove", (e) => {
  let x = e.clientX - innerWidth * 0.5; 
  let y = e.clientY - innerHeight * 0.5;

  mousePos.x = x * 0.0003;
  mousePos.y = y * 0.0003;
});