import React, { useEffect, useRef } from "react";
import { Center, Html, Text, useScroll } from "@react-three/drei";
import gsap from "gsap";
import { useFrame } from "@react-three/fiber";

export default function Frontned({ timeline }) {
  const hiImRef = useRef();
  const nameRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    timeline
      .to(textRef.current.position, {
        y: 0,
        ease: "power4.out",
        duration: 0.2,
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
        position={[-2, -5, 0]}
        anchorX="center"
        anchorY="middle"
        ref={textRef}
      >
        <Text
          ref={hiImRef}
          anchorY="bottom"
          anchorX="left"
          font={"fonts/bebas.ttf"}
        >
          <meshBasicMaterial color={"#fc354c"} />
          Frontend
        </Text>
        <Text
          ref={nameRef}
          position={[0, 0.22, 0]}
          anchorY="top"
          anchorX="left"
          font={"fonts/bebas.ttf"}
        >
          Developer
          <meshBasicMaterial color={"#fc354c"} />
        </Text>
      </Text>
    </>
  );
}
