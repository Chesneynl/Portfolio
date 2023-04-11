import React from "react";
import { Circle, Float, Html, Sphere, useTexture } from "@react-three/drei";
import { SuggestMe } from "../App.styled";

export default function Picture() {
  const texture = useTexture("me.jpg");

  return (
    <>
      <Circle args={[2.3, 64]} position={[0, 0, -0.3]} castShadow>
        <meshBasicMaterial color="#ffffff" />
      </Circle>
      <Circle args={[2, 64]} castShadow>
        <meshStandardMaterial map={texture} />
      </Circle>
    </>
  );
}
