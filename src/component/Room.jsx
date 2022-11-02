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
  PivotControls,
  useScroll,
} from "@react-three/drei";
import { angleToRadians } from "../utils/angle";

const graciousColors = {
  floor: "#0B9A74",
  walls: "#1e3064",
  couch: "#F7BC5F",
  chair: "#F7BC5F",
  rug: "#F8CD88",
  pillow: "#0B9A74",
  plate: "#FFE8C2",
  pot: "#FFE8C2",
  lamp: "#F7BC5F",
  sideTable: "#c89e54",
};

const happyHorzionsColors = {
  floor: "#fae716",
  walls: "#050634",
  couch: "#abb8c3",
  chair: "#abb8c3",
  rug: "#F8CD88",
  pillow: "#fae716",
  plate: "#FFE8C2",
  pot: "#FFE8C2",
  lamp: "#fae716",
  sideTable: "#c89e54",
};

export default function Room({ pages }) {
  const ref = useRef();
  const data = useScroll();

  const [selectedColors, setSelectedColors] = useState(graciousColors);
  const [animationPercentage, setAnimationPercentage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { materials, nodes } = useGLTF("/models/Room-glb.gltf");

  const couchPosition = new THREE.Vector3(-0.91, 0.55, 0.24);
  const potPosition = new THREE.Vector3(-0.87, 1.32, -0.95);
  const currentObjectVectors = [
    {
      cameraPosition: new THREE.Vector3(5, 5, 5),
      cameraLookAt: new THREE.Vector3(0, 1.3, 0),
      object: "startingCamera",
    },
    {
      cameraPosition: new THREE.Vector3(3, 3, 3),
      cameraLookAt: new THREE.Vector3(0, 1.3, 0),
      object: "SceneMoveIn",
    },
    {
      cameraPosition: new THREE.Vector3(2, 2, 0),
      cameraLookAt: new THREE.Vector3(
        couchPosition.x - 0.4,
        couchPosition.y + 0.3,
        couchPosition.z + 0.5
      ),
      object: "chair",
    },
    {
      cameraPosition: new THREE.Vector3(0, 2, 0.4),
      cameraLookAt: new THREE.Vector3(
        potPosition.x,
        potPosition.y + 0.05,
        potPosition.z + 0.1
      ),
      object: "plant",
    },
  ];

  const lerp = currentObjectVectors[currentPage - 1].cameraPosition.lerp(
    currentObjectVectors[currentPage].cameraPosition,
    animationPercentage
  );
  const lookAtCamera = currentObjectVectors[currentPage - 1].cameraLookAt.lerp(
    currentObjectVectors[currentPage].cameraLookAt,
    animationPercentage
  );
  const amountOfAnimations = pages - 1;
  const percentagePerAnimation = 1 / amountOfAnimations;

  useFrame((state) => {
    const scrollAmount = data.scroll.current;
    let animPercentage = 0;
    let page = currentPage;

    const startingPercentage =
      scrollAmount - percentagePerAnimation * (page - 1);
    const goToPercentage = [1, pages - 1].includes(page)
      ? percentagePerAnimation
      : 1 - percentagePerAnimation * page;

    animPercentage = startingPercentage / goToPercentage;

    if (animPercentage < 0 && currentPage - 1 !== 0) {
      page = currentPage - 1;
      // animPercentage = 1;
    }
    if (animPercentage >= 1 && currentPage + 1 !== pages) {
      // animPercentage = 0;
      page = currentPage + 1;
    }

    setCurrentPage(Math.max(0, Math.min(pages, page)));
    setAnimationPercentage(Math.max(0, Math.min(1, animPercentage)));

    state.camera.position.set(lerp.x, lerp.y, lerp.z);
    state.camera.lookAt(lookAtCamera.x, lookAtCamera.y, lookAtCamera.z);
  });

  return (
    <group dispose={null}>
      <mesh
        receiveShadow
        geometry={nodes.Walls.geometry}
        material={materials.Material}
        position={[0.04, 1.8, 0.07]}
        rotation={[Math.PI, 0, Math.PI]}
      >
        <meshStandardMaterial color={selectedColors.walls} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Floor.geometry}
        position={[0.04, 1.8, 0.07]}
      >
        <meshStandardMaterial color={selectedColors.floor} />
      </mesh>
      <mesh
        castShadow
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
        geometry={nodes.Couch.geometry}
        position={[0.5, 0.55, -0.95]}
        scale={0.95}
      >
        <meshStandardMaterial color={selectedColors.couch} />
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
          material={materials.Material}
          position={[-0.39, 0.59, -0.08]}
          rotation={[1.15, 0, 0]}
          scale={[0.35, 0.13, 0.32]}
        >
          <meshStandardMaterial color={selectedColors.couch} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cushion001.geometry}
          material={materials.Material}
          position={[0.38, 0.59, -0.08]}
          rotation={[1.15, 0, 0]}
          scale={[0.35, 0.13, 0.32]}
        >
          <meshStandardMaterial color={selectedColors.couch} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pillow.geometry}
          position={[-0.62, 0.41, 0.29]}
          rotation={[0.11, 0.49, -0.27]}
        >
          <meshStandardMaterial color={selectedColors.pillow} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pillow001.geometry}
          position={[0.6, 0.4, 0.24]}
          rotation={[-2.46, 1.3, 2.62]}
        >
          <meshStandardMaterial color={selectedColors.pillow} />
        </mesh>
      </mesh>
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        geometry={nodes.Chair.geometry}
        material={materials.Material}
        position={[-0.91, 0.55, 0.24]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.95}
      >
        <meshStandardMaterial color={selectedColors.chair} />
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
          <meshStandardMaterial color={selectedColors.chair} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pillow002.geometry}
          material={materials.Pillows}
          position={[-0.15, 0.47, 0.19]}
          rotation={[-2.67, -1.25, 2.51]}
        >
          <meshStandardMaterial color={selectedColors.pillow} />
        </mesh>
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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Lamp.geometry}
        position={[-0.84, 2.69, -1.45]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color={selectedColors.lamp} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere.geometry}
          material={nodes.Sphere.material}
          position={[-0.01, 0.33, 0.35]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.12}
        >
          <meshStandardMaterial color={selectedColors.lamp} />
        </mesh>
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
        geometry={nodes.Donut.geometry}
        material={materials["Material.012"]}
        position={[0.8, 0.79, 0.59]}
        rotation={[-0.03, 0.07, 0.14]}
        scale={0.7}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Torus016.geometry}
          material={materials["Material.011"]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_2.geometry}
            material={materials["Material.014"]}
            position={[0.12, 0.04, -0.05]}
            rotation={[1.22, -0.71, -2.41]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_2.geometry}
            material={materials["Material.015"]}
            position={[0.13, 0.03, -0.01]}
            rotation={[1.38, -1.1, -2.71]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_2.geometry}
            material={nodes.Cube017_2.material}
            position={[0.14, 0.02, -0.01]}
            rotation={[1.02, -1.36, -2.05]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_3.geometry}
            material={materials["Material.014"]}
            position={[0.12, 0.04, -0.05]}
            rotation={[1.22, -0.71, 2.26]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_3.geometry}
            material={materials["Material.015"]}
            position={[0.13, 0.03, -0.01]}
            rotation={[1.38, -1.1, 2.11]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_3.geometry}
            material={nodes.Cube017_3.material}
            position={[0.11, 0.05, -0.01]}
            rotation={[1.54, -0.34, 1.31]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_4.geometry}
            material={materials["Material.014"]}
            position={[0.07, 0.05, -0.03]}
            rotation={[1.7, 0.32, -0.49]}
            scale={0}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_4.geometry}
            material={materials["Material.015"]}
            position={[0.09, 0.05, -0.01]}
            rotation={[1.57, 0.04, -1.55]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_4.geometry}
            material={nodes.Cube017_4.material}
            position={[0.11, 0.05, -0.01]}
            rotation={[1.54, -0.34, 1.23]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_5.geometry}
            material={materials["Material.014"]}
            position={[0.04, 0.02, -0.02]}
            rotation={[2.28, 1.01, 0.74]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_5.geometry}
            material={materials["Material.015"]}
            position={[0.11, 0.03, -0.08]}
            rotation={[0.72, -0.81, 0.18]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_5.geometry}
            material={nodes.Cube017_5.material}
            position={[0.09, 0.05, -0.07]}
            rotation={[1.37, -0.27, -2.63]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_6.geometry}
            material={materials["Material.014"]}
            position={[0.05, 0.05, -0.06]}
            rotation={[1.84, 0.21, -2.98]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_6.geometry}
            material={materials["Material.015"]}
            position={[0.08, 0.05, -0.05]}
            rotation={[1.59, 0.03, 1.3]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_6.geometry}
            material={nodes.Cube017_6.material}
            position={[0.09, 0.05, -0.07]}
            rotation={[1.37, -0.27, -1.62]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_7.geometry}
            material={materials["Material.014"]}
            position={[0.05, 0.05, -0.06]}
            rotation={[1.84, 0.21, 0.64]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_7.geometry}
            material={materials["Material.015"]}
            position={[0.08, 0.05, -0.05]}
            rotation={[1.59, 0.03, 1.28]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_7.geometry}
            material={nodes.Cube017_7.material}
            position={[0.09, 0.05, -0.07]}
            rotation={[1.37, -0.27, -0.67]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_8.geometry}
            material={materials["Material.014"]}
            position={[0.05, 0.05, -0.06]}
            rotation={[1.84, 0.21, 0.61]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_8.geometry}
            material={materials["Material.015"]}
            position={[0.06, 0.03, -0.12]}
            rotation={[0.5, -0.38, 1.25]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_8.geometry}
            material={nodes.Cube017_8.material}
            position={[0.05, 0.05, -0.1]}
            rotation={[1.26, -0.14, -0.76]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_9.geometry}
            material={materials["Material.014"]}
            position={[0.01, 0.05, -0.08]}
            rotation={[1.91, 0.05, 1.22]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_9.geometry}
            material={materials["Material.015"]}
            position={[0.04, 0.05, -0.09]}
            rotation={[1.61, 0.02, 0.93]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_9.geometry}
            material={nodes.Cube017_9.material}
            position={[0.05, 0.05, -0.1]}
            rotation={[1.26, -0.14, 0.4]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_10.geometry}
            material={materials["Material.014"]}
            position={[-0.05, 0.04, -0.12]}
            rotation={[0.83, 0.27, 2.39]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_10.geometry}
            material={materials["Material.015"]}
            position={[-0.01, 0.03, -0.13]}
            rotation={[0.47, 0.09, 2.23]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_10.geometry}
            material={nodes.Cube017_10.material}
            position={[-0.01, 0.02, -0.14]}
            rotation={[0.22, 0.09, 1.13]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_11.geometry}
            material={materials["Material.014"]}
            position={[-0.03, 0.05, -0.07]}
            rotation={[1.89, -0.13, 0.62]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_11.geometry}
            material={materials["Material.015"]}
            position={[-0.01, 0.05, -0.09]}
            rotation={[1.61, 0, -0.96]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_11.geometry}
            material={nodes.Cube017_11.material}
            position={[-0.01, 0.04, -0.06]}
            rotation={[2.26, -0.06, -2.4]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_12.geometry}
            material={materials["Material.014"]}
            position={[-0.1, 0.04, -0.08]}
            rotation={[1.03, 0.59, 2.05]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_12.geometry}
            material={materials["Material.015"]}
            position={[-0.08, 0.03, -0.11]}
            rotation={[0.55, 0.55, 2.64]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_12.geometry}
            material={nodes.Cube017_12.material}
            position={[-0.08, 0.02, -0.11]}
            rotation={[0.23, 0.63, 2.76]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_13.geometry}
            material={materials["Material.014"]}
            position={[-0.1, 0.04, -0.08]}
            rotation={[1.03, 0.59, 0.98]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_13.geometry}
            material={materials["Material.015"]}
            position={[-0.08, 0.03, -0.11]}
            rotation={[0.55, 0.55, 2.63]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_13.geometry}
            material={nodes.Cube017_13.material}
            position={[-0.08, 0.02, -0.11]}
            rotation={[0.23, 0.63, 3.1]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_14.geometry}
            material={materials["Material.014"]}
            position={[-0.1, 0.04, -0.08]}
            rotation={[1.03, 0.59, -1.95]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_14.geometry}
            material={materials["Material.015"]}
            position={[-0.05, 0.05, -0.08]}
            rotation={[1.6, -0.02, 2.85]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_14.geometry}
            material={nodes.Cube017_14.material}
            position={[-0.07, 0.05, -0.09]}
            rotation={[1.29, 0.19, 1.25]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_15.geometry}
            material={materials["Material.014"]}
            position={[-0.06, 0.05, -0.05]}
            rotation={[1.79, -0.27, 0.91]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_15.geometry}
            material={materials["Material.015"]}
            position={[-0.05, 0.05, -0.08]}
            rotation={[1.6, -0.02, 0.74]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_15.geometry}
            material={nodes.Cube017_15.material}
            position={[-0.07, 0.05, -0.09]}
            rotation={[1.29, 0.19, 0.37]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_16.geometry}
            material={materials["Material.014"]}
            position={[-0.06, 0.05, -0.05]}
            rotation={[1.79, -0.27, -3.02]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_16.geometry}
            material={materials["Material.015"]}
            position={[-0.03, 0.03, -0.04]}
            rotation={[2.43, -0.5, 1.37]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_16.geometry}
            material={nodes.Cube017_16.material}
            position={[-0.13, 0.02, -0.06]}
            rotation={[0.49, 1.09, -0.08]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_17.geometry}
            material={materials["Material.014"]}
            position={[-0.12, 0.04, -0.02]}
            rotation={[1.44, 0.77, -2.47]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_17.geometry}
            material={materials["Material.015"]}
            position={[-0.12, 0.03, -0.06]}
            rotation={[0.89, 0.95, 2.06]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_17.geometry}
            material={nodes.Cube017_17.material}
            position={[-0.13, 0.02, -0.06]}
            rotation={[0.49, 1.09, 0.66]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_18.geometry}
            material={materials["Material.014"]}
            position={[-0.08, 0.05, -0.01]}
            rotation={[1.62, -0.34, -2.03]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_18.geometry}
            material={materials["Material.015"]}
            position={[-0.09, 0.05, -0.04]}
            rotation={[1.59, -0.04, 2.89]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_18.geometry}
            material={nodes.Cube017_18.material}
            position={[-0.14, 0.02, 0.01]}
            rotation={[2.12, 1.35, -1.24]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_19.geometry}
            material={materials["Material.014"]}
            position={[-0.12, 0.04, 0.05]}
            rotation={[1.93, 0.71, 0.62]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_19.geometry}
            material={materials["Material.015"]}
            position={[-0.13, 0.03, 0.01]}
            rotation={[1.77, 1.1, -2.6]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_19.geometry}
            material={nodes.Cube017_19.material}
            position={[-0.14, 0.02, 0.01]}
            rotation={[2.12, 1.35, -1.58]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_20.geometry}
            material={materials["Material.014"]}
            position={[-0.12, 0.04, 0.05]}
            rotation={[1.93, 0.71, 0.9]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_20.geometry}
            material={materials["Material.015"]}
            position={[-0.13, 0.03, 0.01]}
            rotation={[1.77, 1.1, -2.46]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_20.geometry}
            material={nodes.Cube017_20.material}
            position={[-0.14, 0.02, 0.01]}
            rotation={[2.12, 1.35, -2.29]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_21.geometry}
            material={materials["Material.014"]}
            position={[-0.07, 0.05, 0.03]}
            rotation={[1.44, -0.32, -1.3]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_21.geometry}
            material={materials["Material.015"]}
            position={[-0.09, 0.05, 0.01]}
            rotation={[1.57, -0.04, 3.07]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_21.geometry}
            material={nodes.Cube017_21.material}
            position={[-0.11, 0.05, 0.01]}
            rotation={[1.6, 0.34, -1.21]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_22.geometry}
            material={materials["Material.014"]}
            position={[-0.04, 0.02, 0.02]}
            rotation={[0.86, -1.01, -1.44]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_22.geometry}
            material={materials["Material.015"]}
            position={[-0.05, 0.03, 0]}
            rotation={[1.43, -0.95, -2.05]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_22.geometry}
            material={nodes.Cube017_22.material}
            position={[-0.11, 0.02, 0.08]}
            rotation={[2.79, 0.92, -2.66]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_23.geometry}
            material={materials["Material.014"]}
            position={[-0.08, 0.04, 0.1]}
            rotation={[2.23, 0.45, 1.5]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_23.geometry}
            material={materials["Material.015"]}
            position={[-0.11, 0.03, 0.08]}
            rotation={[2.43, 0.81, -1.65]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_23.geometry}
            material={nodes.Cube017_23.material}
            position={[-0.11, 0.02, 0.08]}
            rotation={[2.79, 0.92, 2.88]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_24.geometry}
            material={materials["Material.014"]}
            position={[-0.05, 0.05, 0.06]}
            rotation={[1.3, -0.21, 2.08]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_24.geometry}
            material={materials["Material.015"]}
            position={[-0.04, 0.03, 0.03]}
            rotation={[0.88, -0.73, -0.09]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_24.geometry}
            material={nodes.Cube017_24.material}
            position={[-0.06, 0.02, 0.13]}
            rotation={[2.95, 0.41, 0.96]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_25.geometry}
            material={materials["Material.014"]}
            position={[-0.02, 0.04, 0.13]}
            rotation={[2.34, 0.14, 1.31]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_25.geometry}
            material={materials["Material.015"]}
            position={[-0.06, 0.03, 0.12]}
            rotation={[2.64, 0.39, 2.8]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_25.geometry}
            material={nodes.Cube017_25.material}
            position={[-0.06, 0.02, 0.13]}
            rotation={[2.95, 0.41, 0.98]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_26.geometry}
            material={materials["Material.014"]}
            position={[-0.02, 0.04, 0.13]}
            rotation={[2.34, 0.14, 2.58]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_26.geometry}
            material={materials["Material.015"]}
            position={[-0.04, 0.05, 0.09]}
            rotation={[1.53, -0.02, 0.74]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_26.geometry}
            material={nodes.Cube017_26.material}
            position={[-0.03, 0.04, 0.06]}
            rotation={[0.93, -0.27, 3.07]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_27.geometry}
            material={materials["Material.014"]}
            position={[0.06, 0.04, 0.11]}
            rotation={[2.28, -0.33, 1.11]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_27.geometry}
            material={materials["Material.015"]}
            position={[0.04, 0.03, 0.13]}
            rotation={[2.65, -0.26, -0.95]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_27.geometry}
            material={nodes.Cube017_27.material}
            position={[0.08, 0.02, 0.11]}
            rotation={[2.95, -0.69, -1.58]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_28.geometry}
            material={materials["Material.014"]}
            position={[0.1, 0.04, 0.08]}
            rotation={[2.11, -0.59, -0.41]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_28.geometry}
            material={materials["Material.015"]}
            position={[0.06, 0.05, 0.08]}
            rotation={[1.54, 0.03, 2.88]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_28.geometry}
            material={nodes.Cube017_28.material}
            position={[0.07, 0.05, 0.09]}
            rotation={[1.83, -0.21, 0]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_29.geometry}
            material={materials["Material.014"]}
            position={[0.06, 0.05, 0.05]}
            rotation={[1.36, 0.27, -0.78]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_29.geometry}
            material={materials["Material.015"]}
            position={[0.06, 0.05, 0.08]}
            rotation={[1.54, 0.03, 2.85]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_29.geometry}
            material={nodes.Cube017_29.material}
            position={[0.07, 0.05, 0.09]}
            rotation={[1.83, -0.21, -2.07]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_30.geometry}
            material={materials["Material.014"]}
            position={[0.06, 0.05, 0.05]}
            rotation={[1.36, 0.27, -2.14]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_30.geometry}
            material={materials["Material.015"]}
            position={[0.12, 0.03, 0.06]}
            rotation={[2.26, -0.95, 0.92]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_30.geometry}
            material={nodes.Cube017_30.material}
            position={[0.13, 0.02, 0.06]}
            rotation={[2.66, -1.09, 0.06]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_31.geometry}
            material={materials["Material.014"]}
            position={[0.12, 0.04, 0.02]}
            rotation={[1.71, -0.77, -2.9]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_31.geometry}
            material={materials["Material.015"]}
            position={[0.12, 0.03, 0.06]}
            rotation={[2.26, -0.95, 1.65]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_31.geometry}
            material={nodes.Cube017_31.material}
            position={[0.1, 0.05, 0.05]}
            rotation={[1.72, -0.31, 2.35]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_32.geometry}
            material={materials["Material.014"]}
            position={[0.11, 0.01, 0.09]}
            rotation={[-2.79, -0.81, -1.19]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_32.geometry}
            material={materials["Material.015"]}
            position={[-0.05, 0, 0.13]}
            rotation={[-2.12, 0.06, -2.28]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_32.geometry}
            material={nodes.Cube017_32.material}
            position={[-0.1, 0, 0.08]}
            rotation={[-0.54, -0.7, 0.65]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_33.geometry}
            material={materials["Material.014"]}
            position={[-0.1, -0.01, 0.09]}
            rotation={[-2.56, 0.78, -0.66]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_33.geometry}
            material={materials["Material.015"]}
            position={[0, 0.03, 0.05]}
            rotation={[0.62, 0, 2.11]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_33.geometry}
            material={nodes.Cube017_33.material}
            position={[0, 0.05, 0.11]}
            rotation={[1.9, 0, 0.93]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_34.geometry}
            material={materials["Material.014"]}
            position={[0.02, 0.05, 0.08]}
            rotation={[1.24, 0.07, -1.26]}
            scale={0.01}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube016_34.geometry}
            material={materials["Material.015"]}
            position={[0, 0.05, 0.1]}
            rotation={[1.53, 0, 0.72]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube017_34.geometry}
            material={nodes.Cube017_34.material}
            position={[0, 0.02, 0.14]}
            rotation={[2.96, 0, 0.34]}
            scale={[0, 0.01, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube015_35.geometry}
            material={materials["Material.014"]}
            position={[0.02, 0.04, 0.13]}
            rotation={[2.33, -0.15, 1.44]}
            scale={0.01}
          />
        </mesh>
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
        geometry={nodes.Pot.geometry}
        material={nodes.Pot.material}
        position={[-0.87, 1.32, -0.95]}
        scale={[0.11, 0.09, 0.11]}
      >
        <meshStandardMaterial color={selectedColors.pot} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube020.geometry}
          material={materials["Material.008"]}
          position={[0.02, 0.51, 0]}
          rotation={[Math.PI, -1.4, Math.PI]}
          scale={[0.22, 0.27, 0.32]}
        />
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

useGLTF.preload("/models/Room-glb.gltf");
