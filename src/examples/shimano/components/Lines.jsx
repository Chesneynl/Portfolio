import React, { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import { Vector2, Vector3 } from "three";
import {
  DialogueBoxWrapper,
  DialogueText,
  DialogueWrapper,
  LineWrapper,
} from "../App.styled";

export default function MeshWithLabel({ mesh, position = "" }) {
  const meshRef = useRef();
  const [screenPosition, setScreenPosition] = useState({ x: 0, y: 0 });
  const dialogueBoxHeight = 200;

  useFrame(() => {
    if (!mesh || !mesh.current) return;

    // get the position of the mesh
    const worldPosition = new Vector3();
    const meshPosition = mesh.current.getWorldPosition(worldPosition);

    // project the position onto the screen
    const screenPosition = meshPosition.project(camera);

    // convert the screen position to CSS coordinates
    const x = ((screenPosition.x + 1) / 2) * window.innerWidth;
    const y = ((-screenPosition.y + 1) / 2) * window.innerHeight;

    setScreenPosition({ x, y });
  });

  const { camera } = useThree();

  const HtmlContent = () => {
    return (
      <DialogueWrapper
        className={position}
        style={{
          left: screenPosition.x,
          height: dialogueBoxHeight,
          width: 400,
          top: screenPosition.y - dialogueBoxHeight,
        }}
      >
        <LineWrapper>
          <svg style={{ width: "100%", height: "100%" }}>
            <line
              x1="0"
              y1="100%"
              x2="100%"
              y2="0"
              style={{ stroke: "rgb(255,255,255)", strokeWidth: "3" }}
            />
          </svg>
        </LineWrapper>
        <DialogueBoxWrapper>
          <span>Model img</span>
        </DialogueBoxWrapper>
        <DialogueText>BEAUTIFULL CLEAN COCKPIT</DialogueText>
      </DialogueWrapper>
    );
  };

  return (
    <>
      <group>
        <Html>
          <HtmlContent />
        </Html>
      </group>
    </>
  );
}
