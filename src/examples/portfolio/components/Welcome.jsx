import React, { useEffect, useRef } from "react";
import { Html, Text } from "@react-three/drei";
import gsap from "gsap";

export default function Welcome() {
  const textRef = useRef();
  const nameRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      const words = document.querySelectorAll(".word-1");

      gsap.from(words, {
        duration: 1,
        y: "100%",
        // stagger: 0.1,
        ease: "power4.out",
        // repeat: -1,
        onRepeat: () => {
          console.log("Animation repeat!");
        },
        onComplete: () => {
          console.log("Animation complete!");
        },
      });
    }, 10);
  }, []);

  return (
    <>
      <Html center position={[0, 0, -50]}>
        <div className="line-wrapper">
          <div className="word-1">Hi, i'm</div>
        </div>
        <div className="line-wrapper">
          <div className="word-1 my-name">Chesney</div>
        </div>
      </Html>
    </>
  );
}
