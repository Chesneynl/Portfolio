import ReactDOM from "react-dom";
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

export default function MeshWithLabel({
  mesh,
  position = "top-left",
  onClick,
}) {
  const meshRef = useRef();
  const [screenPosition, setScreenPosition] = useState({ x: 0, y: 0 });
  const dialogueBoxHeight = 200;
  const dialogueBoxWidth = 400;
  const topOffset = ["top-left", "top-right"].includes(position)
    ? -dialogueBoxHeight
    : 0;
  const leftOffset = position === "bottom-right" ? dialogueBoxWidth : 0;

  const { camera } = useThree();

  function getStrokeDirection() {
    switch (position) {
      case "top-left":
        return { x1: "0", y1: "0", x2: "100%", y2: "100%" };
      case "bottom-left":
        return { x1: "0", y1: "100%", x2: "100%", y2: "0" };
      case "bottom-right":
        return { x1: "100%", y1: "100%", x2: "0", y2: "0" };
      case "top-right":
        return { x1: "0", y1: "100%", x2: "100%", y2: "0" };
    }
  }

  const HtmlContent = () => {
    return (
      <DialogueWrapper
        className={position}
        onClick={onClick}
        style={{
          height: dialogueBoxHeight,
          width: dialogueBoxWidth,
          left: leftOffset,
          top: topOffset,
        }}
      >
        <LineWrapper>
          <svg style={{ width: "100%", height: "100%" }}>
            <line {...getStrokeDirection()} style={{ strokeWidth: "3" }} />
          </svg>
        </LineWrapper>
        <DialogueBoxWrapper>
          <span>Model img</span>
        </DialogueBoxWrapper>

        <DialogueText>
          <div>BEAUTIFULL CLEAN COCKPIT</div>
          <span>DISCOVER</span>
        </DialogueText>
      </DialogueWrapper>
    );
  };

  return (
    <Html>
      <HtmlContent />
    </Html>
  );
}