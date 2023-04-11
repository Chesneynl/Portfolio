import React from "react";
import { Text } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { SuggestMe } from "../App.styled";
import { useFrame } from "@react-three/fiber";

export default function Welcome() {
  const { colorProps, scaleProps } = useSpring({
    colorProps: {
      color: "red" || "white",
      config: { duration: 1000 },
    },
    scaleProps: {
      scale: [3, 3, 3],
      config: { duration: 1000 },
    },
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const scaleFactor = Math.sin(t * 2) + 1;
    // Update the animated properties here
    scaleProps.scale = [scaleFactor, scaleFactor, scaleFactor];
  });

  return (
    <a.mesh>
      <Text
        color={colorProps.color}
        scale={scaleProps.scale}
        font="calibri"
        anchorX="center"
        anchorY="middle"
      >
        Hi, i'm{"\n"}Chesney
      </Text>
    </a.mesh>
  );
}
