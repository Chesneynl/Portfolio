import React, { useEffect, useRef } from "react";
import { Center, Html, Text } from "@react-three/drei";
import gsap from "gsap";
import { useFrame } from "@react-three/fiber";

export default function Welcome() {
  const textRef = useRef();
  const nameRef = useRef();

  // useEffect(() => {
  //   setTimeout(() => {
  //     const words = document.querySelectorAll(".word-1");

  //     gsap.from(words, {
  //       duration: 1,
  //       y: "100%",
  //       // stagger: 0.1,
  //       ease: "power4.out",
  //       // repeat: -1,
  //       onRepeat: () => {
  //         console.log("Animation repeat!");
  //       },
  //       onComplete: () => {
  //         console.log("Animation complete!");
  //       },
  //     });
  //   }, 10);
  // }, []);

  // useFrame(() => {
  //   gsap.to(textRef.current.position, {
  //     // y: 1,
  //     duration: 1,
  //     yoyo: true,
  //     repeat: -1,
  //   });
  // });

  useEffect(() => {
    // Use GSAP to animate the text
    gsap.from(textRef.current.position, { x: 10, duration: 1, ease: "linear" });
  }, []);

  return (
    <>
      <Text
        ref={textRef}
        position={[-2, 0, 0]}
        anchorX="center"
        anchorY="middle"
      >
        <Text anchorY="bottom" anchorX="left" font={"fonts/bebas.ttf"}>
          Hi, I'm
        </Text>
        <Text
          position={[0, 0.22, 0]}
          anchorY="top"
          anchorX="left"
          font={"fonts/bebas.ttf"}
        >
          Chesney
          <meshBasicMaterial color={"#4295c7"} />
        </Text>
      </Text>
    </>
  );
}
