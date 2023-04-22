import React, { useEffect, useRef } from "react";
import { Center, Html, Text } from "@react-three/drei";
import gsap from "gsap";
import { useFrame } from "@react-three/fiber";

export default function Welcome() {
  const hiImRef = useRef();
  const nameRef = useRef();

  useEffect(() => {
    gsap.from(hiImRef.current.position, {
      x: 6,
      duration: 1,
      ease: "power4.out",
    });

    gsap.from(nameRef.current.position, {
      x: 6,
      duration: 1,
      delay: 0.2,
      ease: "power4.out",
    });

    gsap.from(hiImRef.current.material, { opacity: 0, duration: 1 });
    gsap.from(nameRef.current.material, { opacity: 0, duration: 1.5 });
  }, []);

  return (
    <>
      <Text position={[-2, 0, 0]} anchorX="center" anchorY="middle">
        <Text
          ref={hiImRef}
          anchorY="bottom"
          anchorX="left"
          font={"fonts/bebas.ttf"}
        >
          Hi, I'm
        </Text>
        <Text
          ref={nameRef}
          position={[0, 0.22, 0]}
          anchorY="top"
          anchorX="left"
          font={"fonts/bebas.ttf"}
        >
          Chesney
          <meshBasicMaterial color={"#1d4e89"} />
        </Text>
      </Text>
    </>
  );
}
