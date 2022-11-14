import React, { useCallback, useMemo, useRef } from "react";
import { createRoot } from "react-dom/client";
import { OrbitControls } from "@react-three/drei";
import { extend, Canvas, useFrame, useThree } from "@react-three/fiber";
import { Color, PMREMGenerator, Quaternion, Vector3 } from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import Raymarcher from "three-raymarcher";
import { StyledCanvas } from "../App.styled";

extend({ Raymarcher });

const { operations, shapes } = Raymarcher;

function Scene() {
  const layers = useRef(
    Array.from({ length: 3 }, (v, l) => {
      const position = new Vector3(0, l * 2.5, 0);
      const scale = new Vector3().setScalar(2 + Math.random());

      return [
        {
          color: new Color(Math.random() * 0xffffff),
          operation: operations.union,
          position,
          rotation: new Quaternion(0, 0, 0, 1),
          scale,
          shape: shapes.box,
        },
        {
          color: new Color(Math.random() * 0xffffff),
          operation: l % 2 ? operations.union : operations.substraction,
          position: new Vector3(l === 1 ? l * 1 : 0, l * 2.5, 0),
          rotation: new Quaternion(0, 0, 0, 1),
          scale: scale.clone(),
          shape: shapes.sphere,
        },
      ];
    })
  );

  useFrame(({ clock }) => {
    layers.current.forEach((layer, l) =>
      layer.forEach((entity, e) => {
        entity.scale.setScalar(
          1.5 +
            Math.sin(clock.oldTime / 1000 + l * 1.5) * 0.5 +
            e * (0.125 + (l % 2 ? e * 0.5 : 0))
        );
      })
    );
  });
  const { gl } = useThree();
  const envMap = useMemo(
    () => new PMREMGenerator(gl).fromScene(new RoomEnvironment()).texture,
    [gl]
  );
  const randomize = useCallback(
    ({ entity }) => entity.color.setHex(Math.random() * 0xffffff),
    []
  );
  return (
    <raymarcher
      onClick={randomize}
      userData-layers={layers.current}
      userData-envMap={envMap}
      userData-envMapIntensity={0.6}
      userData-roughness={0.0}
    />
  );
}

export default function RayMarcher() {
  return (
    <StyledCanvas
      //   frameloop="demand"
      id="three-canvas-container"
      shadows
      dpr={[1, 2]}
      camera={{ fov: 40 }}
    >
      <OrbitControls />
      <Scene />
    </StyledCanvas>
  );
}
