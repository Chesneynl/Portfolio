import React, { useRef, useLayoutEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model() {
  const group = useRef();
  const { scene } = useGLTF("/models/Room-glb.gltf");

  const clonedScene = useMemo(() => scene.clone(), []);
  useLayoutEffect(() => {
    clonedScene.traverse((o) => {
      console.log({o})
      if (o.name === 'bg') {
        o.visible = false
      }
    });
  }, [clonedScene]);
  return <primitive object={clonedScene} />;
}

useGLTF.preload("/models/Room-glb.gltf");

// import React, { useRef } from 'react'
// import { useGLTF } from '@react-three/drei'

// export default function Model() {
//   const group = useRef()
//   const gltf = useGLTF('/models/Room-glb.gltf')
//   return (
//     <primitive ref={group} object={gltf.scene} dispose={null} />
//   )
// }

// useGLTF.preload('/models/Room-glb.gltf')
