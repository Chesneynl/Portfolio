import { useMemo, useRef } from "react";
import { Html, useProgress } from "@react-three/drei";

import React from "react";
import { useFrame } from "@react-three/fiber";

const PAGES = 5;

const vertexShader = `
  uniform float u_time;
  varying vec3 pos;
  varying vec4 vPos;
  float ampl = 4.0;

  void main() {
    vec4 result;
    pos = position;
    result = vec4( position.x, ampl*sin(position.z/4.0 + u_time) + position.y, position.z, 1.0);
    vPos = result;
    gl_Position = projectionMatrix * modelViewMatrix * result;
  }
`;
const fragmentShader = `
  varying vec3 pos;
  varying vec4 vPos;
  uniform float u_time;
  uniform vec3 u_color_a;

  void main() {
    vec3 color = vec3(1.0, 1.0, 1.0);
    float normalY = (vPos.y + 6.0) / 11.0;
    float normalX = (vPos.x + 12.0) / 12.0;
    float normalZ = (vPos.z + 12.0) / 12.0;

    float colorX = 0.8 * normalY;
    float colorY = sin( normalY + u_time) * normalY;
    float colorZ = cos((normalZ) * normalY + u_time) * sin(u_time) * normalY;


    if (vPos.x == 0.0) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }  else {
      gl_FragColor = vec4( vec3(colorX, colorY, colorZ) , 1.0);
    }
  }
`;

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function Template() {
  const mesh = useRef();
  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 1.0,
      },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[30, 4, 30, 30, 4, 30]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default Template;
