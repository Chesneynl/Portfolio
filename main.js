const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1 );
const renderer = new THREE.WebGLRenderer({antialias: true, alpha: false});
const controls = new THREE.OrbitControls( camera, renderer.domElement );
const scene = new THREE.Scene();
const group = new THREE.Group();

function initi() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);

    camera.position.set(4, 4, 4)

    controls.update();
    
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;

        camera.updateProjectionMatrix();
    })

    const loader = new THREE.GLTFLoader();


    // Load a glTF resource
    loader.load(
      // resource URL
      '/blender/room.gltf',
      // called when the resource is loaded
      function ( gltf ) {

        scene.add( gltf.scene );

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

        console.log({gltf})

      },
      // called while loading is progressing
      function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
      // called when loading has errors
      function ( error ) {

        console.log( 'An error happened' );

      }
    );


    const light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 4, 4, 4 ); //default; light shining from top
    light.castShadow = true; // default false
    scene.add( light );

    console.log({loader});

    scene.add( camera )
}

initi();

var render = function() {
    requestAnimationFrame(render);

    controls.update();

    renderer.render(scene, camera);
}

render()