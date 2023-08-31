import React, { useEffect, useRef } from "react";
import { Center, Html, Text, useScroll } from "@react-three/drei";
import gsap from "gsap";
import { useFrame } from "@react-three/fiber";

export default function Skills({ timeline }) {
  const hiImRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    timeline
      .to(textRef.current.position, {
        x: 0,
        ease: "power4.out",
        duration: 0.3,
      })
      .to(hiImRef.current.material, {
        opacity: 1,
        ease: "power4.out",
        duration: 0.2,
      })
      .to(textRef.current.position, {
        x: -10,
        ease: "power4.out",
        duration: 0.2,
      });
  }, []);

  return (
    <>
      <Text
        position={[30, 0, 0]}
        anchorX="center"
        anchorY="middle"
        ref={textRef}
      >
        <Text
          ref={hiImRef}
          anchorY="middle"
          anchorX="center"
          font={"fonts/bebas.ttf"}
        >
          <meshBasicMaterial color={"#fc354c"} />
          Skills
        </Text>
      </Text>
    </>
  );
}
