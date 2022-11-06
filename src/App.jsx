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
  Scroll,
} from "@react-three/drei";
import "./App.css";
import Room from "./component/Room";
import Lights from "./component/Lights";
import Floor from "./component/Floor";
import { angleToRadians } from "../src/utils/angle";

const PAGES = 5;

function Loader() {
  const { progress } = useProgress();
  console.log({ progress });
  return <Html center>{progress} % loaded</Html>;
}

function App() {
  return (
    <Canvas
      frameloop="demand"
      performance={{ min: 0.5 }}
      id="three-canvas-container"
      shadows
      dpr={[1, 2]}
      camera={{ fov: 40 }}
    >
      <Suspense fallback={<Loader />}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}

function Scene() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <ScrollControls
      pages={PAGES} // Each page takes 100% of the height of the canvas
      distance={1} // A factor that increases scroll bar travel (default: 1)
      damping={5} // Friction, higher is faster (default: 4)
      infinite={false} // Can also scroll infinitely (default: false)
    >
      <Lights />
      <Floor />
      <Room pages={PAGES} />
      <Scroll html style={{ width: "100%" }}>
        <div className={loaded ? "welcome-message active" : "welcome-message"}>
          Welcome
        </div>
        <h1 style={{ top: "100vh" }}>Room page</h1>
        <h1 style={{ top: "200vh" }}>Chair page</h1>
        <h1 style={{ top: "300vh" }}>Plant page</h1>
        <h1 style={{ top: "400vh" }}>Donut page</h1>
      </Scroll>
    </ScrollControls>
  );
}

export default App;
