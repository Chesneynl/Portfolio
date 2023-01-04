import React, {
  useRef,
  useState,
  useLayoutEffect,
  useMemo,
  useEffect,
} from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Center,
  softShadows,
  Environment,
  PresentationControls,
  Html,
  useScroll,
} from "@react-three/drei";
import Chair from "./Chair";
import { angleToRadians } from "../utils/angle";

const graciousColors = {
  floor: "#946B53",
  donut: "#0B9A74",
  walls: "#cb997e",
  couch: "#C1C3C4",
  chair: "#BABABA",
  rug: "#cb997e",
  pillow: "#e9edc9",
  plate: "#FFE8C2",
  pot: "#FFE8C2",
  sideTable: "#d4a373",
};

export default function Room({ nodes, materials }) {
  const ref = useRef();
  const data = useScroll();

  const [selectedColors, setSelectedColors] = useState(graciousColors);

  const walls = new THREE.MeshLambertMaterial({ color: selectedColors.walls });
  const floor = new THREE.MeshLambertMaterial({ color: selectedColors.floor });
  const couch = new THREE.MeshLambertMaterial({ color: selectedColors.couch });
  const pillow = new THREE.MeshLambertMaterial({
    color: selectedColors.pillow,
  });

  return (
    <group dispose={null}>
      <mesh
        receiveShadow
        geometry={nodes.Walls.geometry}
        material={walls}
        position={[0.04, 1.8, 0.07]}
        rotation={[Math.PI, 0, Math.PI]}
      />

      <mesh
        castShadow
        receiveShadow
        material={floor}
        geometry={nodes.Floor.geometry}
        position={[0.04, 1.8, 0.07]}
      />

      <mesh
        receiveShadow
        geometry={nodes.Rug.geometry}
        material={materials.Material}
        position={[0.54, 0.46, 0.62]}
      >
        <meshStandardMaterial color={selectedColors.rug} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        material={couch}
        geometry={nodes.Couch.geometry}
        position={[0.5, 0.55, -0.95]}
        scale={0.95}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Couch_legs.geometry}
          material={materials.Table}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cushion.geometry}
          material={couch}
          position={[-0.39, 0.59, -0.08]}
          rotation={[1.15, 0, 0]}
          scale={[0.35, 0.13, 0.32]}
        ></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cushion001.geometry}
          material={couch}
          position={[0.38, 0.59, -0.08]}
          rotation={[1.15, 0, 0]}
          scale={[0.35, 0.13, 0.32]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pillow.geometry}
          material={pillow}
          position={[-0.62, 0.41, 0.29]}
          rotation={[0.11, 0.49, -0.27]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pillow001.geometry}
          material={pillow}
          position={[0.6, 0.4, 0.24]}
          rotation={[-2.46, 1.3, 2.62]}
        />
      </mesh>
      <group position={[0.28, 2.3, -1.42]} scale={0.78}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube008.geometry}
          material={materials["Material.016"]}
        />
        <mesh castShadow receiveShadow geometry={nodes.Cube008_1.geometry}>
          <meshStandardMaterial color={selectedColors.sideTable} />
        </mesh>
      </group>
      <group
        position={[-0.05, 1.8, 0.07]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.92, 0.92, 0.78]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube009.geometry}
          material={materials["Material.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube009_1.geometry}
          material={materials["Material.003"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curtain_holder.geometry}
        material={materials.Table}
        position={[-1.42, 2.93, 0.93]}
        scale={0.02}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curtain_rod.geometry}
        material={materials.Table}
        position={[-1.45, 2.93, -0.04]}
        scale={[0.03, 0.02, 0.03]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curtain.geometry}
        material={materials.Pillows}
        position={[-1.14, 2.37, 0.6]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Torus001.geometry}
          material={materials["Material.006"]}
          position={[-0.16, 0.63, -0.21]}
          rotation={[Math.PI / 2, 0, 0.36]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Torus002.geometry}
          material={materials["Material.006"]}
          position={[-0.17, 0.63, -0.12]}
          rotation={[Math.PI / 2, 0, 2.77]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Torus003.geometry}
          material={materials["Material.006"]}
          position={[-0.16, 0.63, -0.08]}
          rotation={[Math.PI / 2, 0, 0.36]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Torus004.geometry}
          material={materials["Material.006"]}
          position={[-0.17, 0.63, 0.01]}
          rotation={[Math.PI / 2, 0, 2.77]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Torus005_1.geometry}
          material={materials["Material.006"]}
          position={[-0.16, 0.63, 0.05]}
          rotation={[Math.PI / 2, 0, 0.36]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Torus006.geometry}
          material={materials["Material.006"]}
          position={[-0.17, 0.63, 0.14]}
          rotation={[Math.PI / 2, 0, 2.77]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Torus007.geometry}
          material={materials["Material.006"]}
          position={[-0.16, 0.63, 0.2]}
          rotation={[Math.PI / 2, 0, 0.36]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curtain_holder001.geometry}
        material={materials.Table}
        position={[-1.42, 2.93, -1]}
        scale={0.02}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curtain001.geometry}
        material={materials.Pillows}
        position={[-1.14, 2.37, -0.65]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Torus008.geometry}
          material={materials["Material.006"]}
          position={[-0.16, 0.63, -0.21]}
          rotation={[Math.PI / 2, 0, 0.36]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Torus009.geometry}
          material={materials["Material.006"]}
          position={[-0.17, 0.63, -0.12]}
          rotation={[Math.PI / 2, 0, 2.77]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Torus010.geometry}
          material={materials["Material.006"]}
          position={[-0.16, 0.63, -0.08]}
          rotation={[Math.PI / 2, 0, 0.36]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Torus011.geometry}
          material={materials["Material.006"]}
          position={[-0.17, 0.63, 0.01]}
          rotation={[Math.PI / 2, 0, 2.77]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Torus012.geometry}
          material={materials["Material.006"]}
          position={[-0.16, 0.63, 0.05]}
          rotation={[Math.PI / 2, 0, 0.36]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Torus013.geometry}
          material={materials["Material.006"]}
          position={[-0.17, 0.63, 0.14]}
          rotation={[Math.PI / 2, 0, 2.77]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Torus014.geometry}
          material={materials["Material.006"]}
          position={[-0.16, 0.63, 0.2]}
          rotation={[Math.PI / 2, 0, 0.36]}
        />
      </mesh>

      <group position={[-1.45, 2.51, 1.17]} rotation={[0, 0, -Math.PI / 2]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002.geometry}
          material={materials["Material.007"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002_1.geometry}
          material={materials["Material.009"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_1.geometry}
          material={materials["Material.010"]}
          position={[0, -0.03, 0]}
          rotation={[0, 0, Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials["Material.010"]}
          position={[0, -0.03, 0]}
          rotation={[0, -0.79, Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002_1.geometry}
          material={materials["Material.010"]}
          position={[0, -0.03, 0]}
          rotation={[0, -1.55, Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials["Material.010"]}
          position={[0, -0.03, 0]}
          rotation={[Math.PI, -0.79, -Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004_2.geometry}
          material={materials["Material.010"]}
          position={[0, -0.03, 0]}
          rotation={[-Math.PI, -0.01, -Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube005.geometry}
          material={materials["Material.010"]}
          position={[0, -0.03, 0]}
          rotation={[-Math.PI, 0.78, -Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube006.geometry}
          material={materials["Material.010"]}
          position={[0, -0.03, 0]}
          rotation={[Math.PI, 1.56, -Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube007.geometry}
          material={materials["Material.010"]}
          position={[0, -0.03, 0]}
          rotation={[0, 0.76, Math.PI / 2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube008_2.geometry}
          material={materials["Material.003"]}
          position={[-0.01, 0, -0.03]}
          rotation={[0, 0.4, Math.PI / 2]}
          scale={[-0.01, -0.01, -0.06]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube009_2.geometry}
          material={materials["Material.003"]}
          position={[-0.03, 0, 0.04]}
          rotation={[-Math.PI, 0.57, -Math.PI / 2]}
          scale={[-0.01, -0.01, -0.09]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube010.geometry}
          material={materials["Material.003"]}
          position={[0.03, 0, -0.01]}
          rotation={[0, -1.27, Math.PI / 2]}
          scale={[-0.01, 0, -0.08]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Coffee_table.geometry}
        material={materials.Table}
        position={[0.61, 0.46, 0.59]}
        scale={[0.89, 0.55, 0.55]}
      >
        <meshStandardMaterial color={selectedColors.sideTable} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Coffeee_mug.geometry}
        position={[0.42, 0.75, 0.59]}
        scale={[0.08, 0.05, 0.06]}
      >
        <meshStandardMaterial color={selectedColors.plate} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle001_1.geometry}
          material={nodes.Circle001_1.material}
          scale={[0.84, 1, 1]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle.geometry}
        position={[0.42, 0.74, 0.59]}
        scale={0.04}
      >
        <meshStandardMaterial color={selectedColors.plate} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle002.geometry}
        position={[0.76, 0.74, 0.59]}
        scale={0.06}
      >
        <meshStandardMaterial color={selectedColors.plate} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Side_table.geometry}
        position={[-0.87, 1.18, -0.95]}
      >
        <meshStandardMaterial color={selectedColors.sideTable} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube011.geometry}
          position={[0, -0.03, 0]}
          scale={0.03}
        >
          <meshStandardMaterial color={selectedColors.sideTable} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube012.geometry}
          position={[0, -0.03, 0]}
          rotation={[0, 1.57, 0]}
          scale={0.03}
        >
          <meshStandardMaterial color={selectedColors.sideTable} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube013.geometry}
          position={[-0.02, -0.03, 0]}
          rotation={[-Math.PI, 0.02, -Math.PI]}
          scale={0.03}
        >
          <meshStandardMaterial color={selectedColors.sideTable} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube014.geometry}
          position={[0, -0.03, 0]}
          rotation={[0, -1.54, 0]}
          scale={0.03}
        >
          <meshStandardMaterial color={selectedColors.sideTable} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_1.geometry}
          position={[0, -0.03, 0]}
          scale={0.95}
        >
          <meshStandardMaterial color={selectedColors.sideTable} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002_2.geometry}
          position={[0, -0.48, 0]}
          scale={0.95}
        >
          <meshStandardMaterial color={selectedColors.sideTable} />
        </mesh>
      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube015.geometry}
        material={materials["Material.014"]}
        position={[73.73, 1.77, -0.34]}
        scale={0.26}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube016.geometry}
        material={materials["Material.015"]}
        position={[74.45, 1.77, -0.34]}
        scale={[0.17, 0.49, 0.17]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube017.geometry}
        material={nodes.Cube017.material}
        position={[75.01, 1.77, -0.34]}
        scale={[0.17, 0.49, 0.17]}
      />
    </group>
  );
}
