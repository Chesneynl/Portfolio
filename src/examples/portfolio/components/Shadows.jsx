import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import React from "react";

export default function Shadows() {
  return (
    <AccumulativeShadows
      temporal
      frames={Infinity}
      alphaTest={1}
      blend={200}
      limit={300}
      scale={25}
      position={[0, 0, 0]}
    >
      <RandomizedLight
        amount={1}
        mapSize={512}
        radius={5}
        ambient={0.5}
        position={[-10, 10, 5]}
        size={10}
        bias={0.001}
      />
    </AccumulativeShadows>
  );
}
