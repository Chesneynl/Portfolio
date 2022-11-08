import { Html, useScroll } from "@react-three/drei";
import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import anime from "animejs";

export default function Chair({
  nodes,
  color,
  materials,
  pillowColor,
  position,
}) {
  const data = useScroll();
  const animation = useRef(null);
  console.log("Chair".replace(/\S/g, "<span class='letter'>$&</span>"));

  useFrame((state) => {});

  useEffect(() => {
    if (animation.current) {
      animation.current = anime
        .timeline({ loop: true })
        .add({
          targets: ".ml2 .letter",
          scale: [4, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: "easeOutExpo",
          duration: 950,
          delay: (el, i) => 70 * i,
        })
        .add({
          targets: ".ml2",
          opacity: 0,
          duration: 1000,
          easing: "easeOutExpo",
          delay: 1000,
        });
    }
  }, []);

  return (
    <group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Chair.geometry}
        material={materials.Material}
        position={position}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.95}
      >
        <Html position={[-1, 1, 0]} transform>
          <div ref={animation} className="ml2">
            <span class="letter">C</span>
            <span class="letter">h</span>
            <span class="letter">a</span>
            <span class="letter">i</span>
            <span class="letter">r</span>
          </div>
        </Html>
        <meshStandardMaterial color={color} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Couch_legs001.geometry}
          material={materials.Table}
          position={[-0.39, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cushion002.geometry}
          material={materials.Material}
          position={[-0.39, 0.59, -0.08]}
          rotation={[1.15, 0, 0]}
          scale={[0.35, 0.13, 0.32]}
        >
          <meshStandardMaterial color={color} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pillow002.geometry}
          material={pillowColor}
          position={[-0.15, 0.47, 0.19]}
          rotation={[-2.67, -1.25, 2.51]}
        />
      </mesh>
    </group>
  );
}
