var vshader = `



  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;
var fshader = `
uniform vec2 u_resolution;
uniform float u_time;

float opUnion( float d1, float d2 )
{
    return min(d1,d2);
}

float opSubtraction( float d1, float d2 )
{
    return max(-d1,d2);
}

float opIntersection( float d1, float d2 )
{
    return max(d1,d2);
}

float opSmoothUnion( float d1, float d2, float k )
{
    float h = max(k-abs(d1-d2),0.0);
    return min(d1, d2) - h*h*0.25/k;
}

float opSmoothSubtraction( float d1, float d2, float k )
{
    return -opSmoothUnion(d1,-d2,k);
    
    //float h = max(k-abs(-d1-d2),0.0);
    //return max(-d1, d2) + h*h*0.25/k;
}

float opSmoothIntersection( float d1, float d2, float k )
{
    return -opSmoothUnion(-d1,-d2,k);

    //float h = max(k-abs(d1-d2),0.0);
    //return max(d1, d2) + h*h*0.25/k;
}

//-------------------------------------------------

float sdSphere( in vec3 p, in float r )
{
    return length(p)-r;
}


float sdRoundBox( vec3 p, vec3 b, float r )
{
  vec3 d = abs(p) - b;
  return min(max(d.x,max(d.y,d.z)),0.0) + length(max(d,0.0)) - r;
}

//---------------------------------

float map(in vec3 pos)
{
    float d = 1e10;
    
    
    float an = sin(u_time);

    // opUnion
    {
    vec3 q = pos - vec3(-2.0,0.0,-1.3);
    float d1 = sdSphere( q-vec3(0.0,0.5+0.3*an,0.0), 0.55 );
    float d2 = sdRoundBox(q, vec3(0.6,0.2,0.7), 0.1 ); 
    float dt = opUnion(d1,d2);
    d = min( d, dt );
  	}
    
    // opSmoothUnion
    {
    vec3 q = pos - vec3(-2.0,0.0,1.0);
    float d1 = sdSphere( q-vec3(0.0,0.5+0.3*an,0.0), 0.55 );
    float d2 = sdRoundBox(q, vec3(0.6,0.2,0.7), 0.1 ); 
    float dt = opSmoothUnion(d1,d2, 0.25);
    d = min( d, dt );
    }


    // opSubtraction
    {
    vec3 q = pos - vec3(0.0,0.0,-1.3);
    float d1 = sdSphere( q-vec3(0.0,0.5+0.3*an,0.0), 0.55 );
    float d2 = sdRoundBox(q, vec3(0.6,0.2,0.7), 0.1 ); 
    float dt = opSubtraction(d1,d2);
    d = min( d, dt );
    }

    // opSmoothSubtraction
    {
    vec3 q = pos - vec3(0.0,0.0,1.0);
    float d1 = sdSphere( q-vec3(0.0,0.5+0.3*an,0.0), 0.55 );
    float d2 = sdRoundBox(q, vec3(0.6,0.2,0.7), 0.1 ); 
    float dt = opSmoothSubtraction(d1,d2, 0.25);
    d = min( d, dt );
    }

    // opIntersection
    {
    vec3 q = pos - vec3(2.0,0.0,-1.3);
    float d1 = sdSphere( q-vec3(0.0,0.5+0.3*an,0.0), 0.55 );
    float d2 = sdRoundBox(q, vec3(0.6,0.2,0.7), 0.1 ); 
    float dt = opIntersection(d1,d2);
    d = min( d, dt );
    }
    
    // opSmoothIntersection
    {
    vec3 q = pos - vec3(2.0,0.0,1.0);
    float d1 = sdSphere( q-vec3(0.0,0.5+0.3*an,0.0), 0.55 );
    float d2 = sdRoundBox(q-vec3(0.0,0.5,0.0), vec3(0.6,0.2,0.7), 0.1 ); 
    float dt = opSmoothIntersection(d1,d2, 0.25);
    d = min( d, dt );
    }

    return d;
}

// https://iquilezles.org/articles/normalsSDF
vec3 calcNormal( in vec3 pos )
{
    const float ep = 0.0001;
    vec2 e = vec2(1.0,-1.0)*0.5773;
    return normalize( e.xyy*map( pos + e.xyy*ep ) + 
					  e.yyx*map( pos + e.yyx*ep ) + 
					  e.yxy*map( pos + e.yxy*ep ) + 
					  e.xxx*map( pos + e.xxx*ep ) );
}

// https://iquilezles.org/articles/rmshadows
float calcSoftshadow( in vec3 ro, in vec3 rd, float tmin, float tmax, const float k )
{
	float res = 1.0;
    float t = tmin;
    for( int i=0; i<50; i++ )
    {
		float h = map( ro + rd*t );
        res = min( res, k*h/t );
        t += clamp( h, 0.02, 0.20 );
        if( res<0.005 || t>tmax ) break;
    }
    return clamp( res, 0.0, 1.0 );
}


#define AA 2

void main()
{
   vec3 tot = vec3(0.0);
    
    #if AA>1
    for( int m=0; m<AA; m++ )
    for( int n=0; n<AA; n++ )
    {
        // pixel coordinates
        vec2 o = vec2(float(m),float(n)) / float(AA) - 0.5;
        vec2 p = (-u_resolution.xy + 2.0*(gl_FragCoord.xy+o))/u_resolution.y;
        #else    
        vec2 p = (-u_resolution.xy + 2.0*gl_FragCoord)/u_resolution.y;
        #endif
 
        vec3 ro = vec3(0.0,4.0,8.0);
        vec3 rd = normalize(vec3(p-vec2(0.0,1.8),-3.5));

        float t = 7.0;
        for( int i=0; i<64; i++ )
        {
            vec3 p = ro + t*rd;
            float h = map(p);
            if( abs(h)<0.001 || t>11.0 ) break;
            t += h;
        }

        vec3 col = vec3(0.0);

        if( t<11.0 )
        {
            vec3 pos = ro + t*rd;
            vec3 nor = calcNormal(pos);
            vec3  lig = normalize(vec3(1.0,0.8,-0.2));
            float dif = clamp(dot(nor,lig),0.0,1.0);
            float sha = calcSoftshadow( pos, lig, 0.001, 1.0, 16.0 );
            float amb = 0.5 + 0.5*nor.y;
            col = vec3(0.05,0.1,0.15)*amb + 
                  vec3(1.00,0.9,0.80)*dif*sha;
        }

        col = sqrt( col );
	    tot += col;
    #if AA>1
    }
    tot /= float(AA*AA);
    #endif

	gl_FragColor = vec4( tot, 1.0 );
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
