import { Suspense, useState, useTransition } from "react";
import {
  useGLTF,
  Html,
  useProgress,
  ScrollControls,
  Scroll,
} from "@react-three/drei";
import Lights from "./Lights";
import Floor from "./Floor";
import { StyledCanvas } from "../App.styled";

import React from "react";
import BikeModel from "./BikeModel";
import { useFrame } from "@react-three/fiber";

const PAGES = 5;

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function Shimano() {
  const [activePart, setActivePart] = useState(null);

  return (
    <>
      <Suspense fallback={null}>
        {activePart && (
          <div
            className="yoyo"
            style={{
              position: "absolute",
              top: "55px",
              right: "10px",
              color: "white",
              fontSize: "4.5rem",
              fontWeight: "bold",
              zIndex: "100",
              cursor: "pointer",
            }}
            onClick={() => setActivePart(null)}
          >
            X
          </div>
        )}
        <StyledCanvas
          // frameloop="demand"

          id="three-canvas-container"
          shadows
          dpr={[1, 2]}
          camera={{
            fov: 40,
          }}
        >
          <Lights />
          <Floor />
          <BikeModel activePart={activePart} setActivePart={setActivePart} />
        </StyledCanvas>
      </Suspense>
    </>
  );
}

export default Shimano;
