import { Suspense } from "react";
import { Html, OrbitControls, useProgress } from "@react-three/drei";
import Lights from "./components/Lights";
import Floor from "./components/Floor";
import { StyledCanvas } from "./App.styled";

import React from "react";
import Wave from "./components/Wave";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function WaveScene() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <StyledCanvas
          // frameloop="demand"
          id="three-canvas-container"
          shadows
          dpr={[1, 2]}
          camera={{
            fov: 40,
            position: [-40, 20, 30],
          }}
        >
          <OrbitControls />
          <Wave />
          <Lights />
          <Floor />
        </StyledCanvas>
      </Suspense>
    </>
  );
}

export default WaveScene;
