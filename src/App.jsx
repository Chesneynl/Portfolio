import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import {
  useGLTF,
  OrbitControls,
  Center,
  softShadows,
  Environment,
  PivotControls,
  useScroll,
  Html,
  useProgress,
  ScrollControls,
  PresentationControls,
  Scroll,
} from "@react-three/drei";
import Room from "./components/Room";
import Lights from "./components/Lights";
import Floor from "./components/Floor";
import {
  WelcomeMessage,
  StyledCanvas,
  CloseButton,
  Container,
} from "./App.tsx";
import { angleToRadians } from "../src/utils/angle";
import Chair from "./components/Chair";
import * as THREE from "three";

const PAGES = 5;

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function App() {
  const { progress } = useProgress();
  console.log({ progress });

  return (
    <>
      <StyledCanvas
        // frameloop="demand"
        id="three-canvas-container"
        shadows
        dpr={[1, 2]}
        camera={{ fov: 40 }}
      >
        <Suspense fallback={null}></Suspense>
      </StyledCanvas>
    </>
  );
}

function Scene() {
  const [focusMesh, setFocusMesh] = useState(false);
  const { progress } = useProgress();
  const { materials, nodes } = useGLTF("/models/Room-glb.gltf");

  useThree(({ camera }) => {
    if (focusMesh) {
      camera.position.set(2.4, 1, -0.8);
    }
  });

  return (
    <>
      <Lights />
      {focusMesh ? (
        <>
          <Chair
            color="red"
            nodes={nodes}
            materials={materials}
            position={[0, -0.3, -0.35]}
            pillowColor={
              new THREE.MeshLambertMaterial({
                color: "#fae716",
              })
            }
          />
          <axesHelper args={[2, 2, 2]} />
          <Html fullscreen>
            <CloseButton onClick={() => setFocusMesh(false)}>Close</CloseButton>
          </Html>
          <OrbitControls />
        </>
      ) : (
        <ScrollControls
          pages={PAGES} // Each page takes 100% of the height of the canvas
          distance={1} // A factor that increases scroll bar travel (default: 1)
          damping={5} // Friction, higher is faster (default: 4)
          infinite={false} // Can also scroll infinitely (default: false)
        >
          <Floor />
          <Room pages={PAGES} materials={materials} nodes={nodes} />
          <Scroll html style={{ width: "100%" }}>
            <WelcomeMessage
              className={
                progress === 100 ? "welcome-message active" : "welcome-message"
              }
            >
              Welcome
            </WelcomeMessage>
            <h1 style={{ top: "100vh" }}>Room page</h1>
            <h1 style={{ top: "200vh" }} onClick={() => setFocusMesh(true)}>
              Chair page Click to show
            </h1>
            <h1 style={{ top: "300vh" }}>Plant page</h1>
            <h1 style={{ top: "400vh" }}>Donut page</h1>
          </Scroll>
        </ScrollControls>
      )}
    </>
  );
}

export default App;
