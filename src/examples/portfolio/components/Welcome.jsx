import React, { useEffect, useRef } from "react";
import { Center, Html, Text, useScroll } from "@react-three/drei";
import gsap from "gsap";
import { useFrame } from "@react-three/fiber";

export default function Welcome({ timeline }) {
  const hiImRef = useRef();
  const nameRef = useRef();
  const textRef = useRef();
  const data = useScroll();

  useEffect(() => {
    gsap.from(hiImRef.current.position, {
      x: 10,
      duration: 1,
      ease: "power4.out",
    });

    gsap.from(nameRef.current.position, {
      x: 10,
      duration: 1,
      delay: 0.2,
      ease: "power4.out",
    });

    gsap.from(hiImRef.current.material, { opacity: 0, duration: 1 }, 0);
    gsap.from(nameRef.current.material, { opacity: 0, duration: 1 }, 0);

    timeline.to(
      textRef.current.position,
      {
        y: 5,
        ease: "power4.out",
        duration: 0.3,
      },
      0
    );
    timeline.to(
      hiImRef.current.material,
      {
        opacity: 0,
        ease: "power4.out",
        duration: 0.2,
      },
      0.1
    );
    timeline.to(
      nameRef.current.material,
      {
        opacity: 0,
        ease: "power4.out",
        duration: 0.2,
      },
      0.1
    );
  }, []);

  useFrame(({ camera }) => {
    timeline.progress(data.offset);
  });

  //   0
  // :
  // "#fc354c"
  // 1
  // :
  // "#29221f"
  // 2
  // :
  // "#13747d"
  // 3
  // :
  // "#0abfbc"
  // 4
  // :
  // "#fcf7c5"
  return (
    <>
      <Text
        position={[-2, 0, 0]}
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
          Chesney
        </Text>
        <Text
          ref={nameRef}
          position={[0, 0.22, 0]}
          anchorY="top"
          anchorX="left"
          font={"fonts/bebas.ttf"}
        >
          Buitendijk
          <meshBasicMaterial color={"#13747d"} />
        </Text>
      </Text>
    </>
  );
}
