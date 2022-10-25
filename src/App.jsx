import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import {
  useGLTF,
  OrbitControls,
  Center,
  softShadows,
  PivotControls,
} from "@react-three/drei";
import "./App.css";
import Model from "./component/Room";
import { angleToRadians } from "../src/utils/angle";

function App() {
  return (
    <Canvas
      id="three-canvas-container"
      shadows
      camera={{ position: [10, 9, 10], fov: 20 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[2.5, 5, 5]}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-5, 5, 5, -5, 1, 50]}
        />
      </directionalLight>

      <mesh scale={20} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry />
        <shadowMaterial transparent opacity={0.5} />
      </mesh>

      <PivotControls
        rotation={[0, -Math.PI / 2, 0]}
        anchor={[1, -1, -1]}
        scale={75}
        depthTest={false}
        fixed
        lineWidth={2}
      >
        <mesh castShadow receiveShadow position={[-1, 0.5, 1]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial />
        </mesh>
      </PivotControls>

      <PivotControls
        anchor={[1, 1, 1]}
        rotation={[Math.PI, -Math.PI / 2, 0]}
        scale={0.75}
      >
        <Center top scale={1} position={[38, 0, 1.4]}>
          <Model />
        </Center>
      </PivotControls>

      <OrbitControls makeDefault />
    </Canvas>
  );
}

export default App;
