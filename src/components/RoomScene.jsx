import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useState, useEffect, useRef } from "react";
import { SketchPicker } from "react-color";
import {
  useGLTF,
  OrbitControls,
  Center,
  softShadows,
  Environment,
  useScroll,
  Html,
  useProgress,
  ScrollControls,
  PresentationControls,
  Scroll,
} from "@react-three/drei";
import Room from "./Room";
import Lights from "./Lights";
import Floor from "./Floor";
import {
  WelcomeMessage,
  StyledCanvas,
  CloseButton,
  Container,
  ColorPicker,
} from "../App.styled";
import Chair from "./Chair";
import * as THREE from "three";
import Camera from "./Camera";
import React from "react";
import Plant from "./Plant";
import Donut from "./Donut";
import Modal from "./Modal";

const PAGES = 5;

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function RoomScene() {
  const [focusMesh, setFocusMesh] = useState(null);
  const [selecteColors, setSelecteColors] = useState({
    chair: "#D0C6C6",
    chairCushion: "#e9edc9",
    pot: "#A59476",
    plant: "#299359",
    donutGlaze: "#F97AAF",
    sprinkles: "#78D7B1",
    donutColor: "#E5BF82",
  });
  const [focusAnimationDone, setFocusAnimationDone] = useState(false);
  const { progress } = useProgress();
  const { materials, nodes } = useGLTF("/models/Room-glb.gltf");

  return (
    <>
      <Modal
        focusMesh={focusMesh}
        selecteColors={selecteColors}
        setSelecteColors={setSelecteColors}
      />
      <StyledCanvas
        // frameloop="demand"
        id="three-canvas-container"
        shadows
        dpr={[1, 2]}
        camera={{ fov: 40 }}
      >
        <Suspense fallback={null}>
          <Lights />

          <Room materials={materials} nodes={nodes} />
          <ScrollControls
            pages={PAGES} // Each page takes 100% of the height of the canvas
            distance={1} // A factor that increases scroll bar travel (default: 1)
            damping={5} // Friction, higher is faster (default: 4)
            infinite={false} // Can also scroll infinitely (default: false)
          >
            <Chair
              color={selecteColors.chair}
              nodes={nodes}
              setFocusMesh={setFocusMesh}
              materials={materials}
              pillowColor={selecteColors.chairCushion}
            />

            <Plant
              potColor={selecteColors.pot}
              plantColor={selecteColors.plant}
              nodes={nodes}
              setFocusMesh={setFocusMesh}
              materials={materials}
            />

            <Donut
              sprinkleColor={selecteColors.sprinkles}
              nodes={nodes}
              color={selecteColors.donutColor}
              donutColor={selecteColors.donutGlaze}
              setFocusMesh={setFocusMesh}
            />

            <Floor />

            <Scroll>
              <Camera pages={PAGES} materials={materials} nodes={nodes} />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </StyledCanvas>
    </>
  );
}

export default RoomScene;
