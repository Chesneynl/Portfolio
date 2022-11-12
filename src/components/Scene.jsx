import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useState, useEffect, useRef } from "react";
import {
  useGLTF,
  OrbitControls,
  Center,
  softShadows,
  Environment,
  useScroll,
  Html,
  useProgress,
  ScrollControls,
  PresentationControls,
  Scroll,
} from "@react-three/drei";
import Room from "./Room";
import Lights from "./Lights";
import Floor from "./Floor";
import {
  WelcomeMessage,
  StyledCanvas,
  CloseButton,
  Container,
} from "../App.styled";
import Chair from "./Chair";
import * as THREE from "three";
import Camera from "./Camera";
import React from "react";

const PAGES = 5;

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function Scene() {
  return (
    <StyledCanvas
      // frameloop="demand"
      id="three-canvas-container"
      shadows
      dpr={[1, 2]}
      camera={{ fov: 40 }}
    >
      <Suspense fallback={null}>
        <RoomScene />
      </Suspense>
    </StyledCanvas>
  );
}

function RoomScene() {
  const [focusMesh, setFocusMesh] = useState(false);
  const [focusAnimationDone, setFocusAnimationDone] = useState(false);
  const { progress } = useProgress();
  const { materials, nodes } = useGLTF("/models/Room-glb.gltf");
  const chairPosition = new THREE.Vector3(-0.91, 0.55, 0.24);

  useFrame(({ camera }) => {
    if (focusMesh === "chair" && !focusAnimationDone) {
      camera.position.lerp(new THREE.Vector3(2, 2, 0), 0.1);
      camera.lookAt(
        new THREE.Vector3(
          chairPosition.x - 0.4,
          chairPosition.y + 0.3,
          chairPosition.z + 0.5
        )
      );
      camera.updateProjectionMatrix();
    }
  });

  return (
    <>
      <Lights />

      <Room
        hide={focusMesh}
        pages={PAGES}
        materials={materials}
        nodes={nodes}
      />
      <ScrollControls
        enabled={!focusMesh}
        pages={PAGES} // Each page takes 100% of the height of the canvas
        distance={1} // A factor that increases scroll bar travel (default: 1)
        damping={5} // Friction, higher is faster (default: 4)
        infinite={false} // Can also scroll infinitely (default: false)
      >
        <Chair
          color="red"
          nodes={nodes}
          isFocused={focusMesh === "chair"}
          setFocusMesh={setFocusMesh}
          materials={materials}
          position={[-0.91, 0.55, 0.24]}
          pillowColor={
            new THREE.MeshLambertMaterial({
              color: "#fae716",
            })
          }
        />

        <Floor />

        {!focusMesh && (
          <Scroll>
            <Camera pages={PAGES} materials={materials} nodes={nodes} />
          </Scroll>
        )}
      </ScrollControls>
    </>
  );
}

export default Scene;
