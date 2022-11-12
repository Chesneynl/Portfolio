import {
  Html,
  OrbitControls,
  PresentationControls,
  useScroll,
} from "@react-three/drei";
import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React from "react";
import { ClickToShow, ViewButton } from "../App.styled";

export default function Chair({
  nodes,
  color,
  materials,
  isFocused,
  setFocusMesh,
  pillowColor,
  position,
}) {
  const data = useScroll();
  const [showButtons, setShowButtons] = useState(false);

  useFrame(({ camera }) => {
    const scrollAmount = data.scroll.current;
    if (scrollAmount > 0.32 && scrollAmount < 0.55) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  });

  return (
    <>
      <OrbitControls
        enabled={isFocused} // the controls can be disabled by setting this to false
      />
      <group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Chair.geometry}
          material={materials.Material}
          position={position}
          rotation={[0, Math.PI / 2, 0]}
          scale={0.95}
        >
          <axesHelper />
          {!isFocused ? (
            <Html position={[-1, 1, 0]} transform>
              <ClickToShow className={showButtons ? "active" : ""}>
                Chair
                <ViewButton
                  onClick={() => {
                    setFocusMesh("chair");
                  }}
                >
                  View
                </ViewButton>
              </ClickToShow>
            </Html>
          ) : (
            <Html position={[-1, 1, 0]} transform>
              <ClickToShow className={"active"}>
                <ViewButton
                  onClick={() => {
                    setFocusMesh(null);
                  }}
                >
                  Close
                </ViewButton>
              </ClickToShow>
            </Html>
          )}

          <meshStandardMaterial color={color} />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Couch_legs001.geometry}
            material={materials.Table}
            position={[-0.39, 0, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cushion002.geometry}
            material={materials.Material}
            position={[-0.39, 0.59, -0.08]}
            rotation={[1.15, 0, 0]}
            scale={[0.35, 0.13, 0.32]}
          >
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Pillow002.geometry}
            material={pillowColor}
            position={[-0.15, 0.47, 0.19]}
            rotation={[-2.67, -1.25, 2.51]}
          />
        </mesh>
      </group>
    </>
  );
}
