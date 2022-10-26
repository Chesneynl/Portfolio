import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import {
  useGLTF,
  OrbitControls,
  Center,
  softShadows,
  Environment,
  PivotControls,
  useScroll,
  ScrollControls,
  Scroll,
} from "@react-three/drei";
import "./App.css";
import Room from "./component/Room";
import Lights from "./component/Lights";
import Floor from "./component/Floor";
import { angleToRadians } from "../src/utils/angle";

// softShadows();

// const useStore = create((set) => ({
//   position: [0, 0, 10],
//   setPosition: (position) => set({ position }),
// }));

function App() {
  return (
    <Canvas
      id="three-canvas-container"
      shadows
      dpr={[1, 2]}
      // orthographic
      camera={{ position: [7.5, 7, 7.5], fov: 30 }}
    >
      <Scene />
      {/* <OrbitControls makeDefault /> */}
    </Canvas>
  );
}

function Scene() {
  return (
    <ScrollControls
      pages={3} // Each page takes 100% of the height of the canvas
      distance={3} // A factor that increases scroll bar travel (default: 1)
      damping={4} // Friction, higher is faster (default: 4)
      infinite={false} // Can also scroll infinitely (default: false)
    >
      <Lights />
      <Floor />
      <Room />
      <Scroll html>
        <h1>First page</h1>
        <h1 style={{ top: "100vh" }}>Second page</h1>
        <h1 style={{ top: "200vh" }}>Third page</h1>
      </Scroll>
    </ScrollControls>
  );
}

export default App;
