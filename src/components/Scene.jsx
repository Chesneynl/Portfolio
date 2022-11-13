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
  Modal,
  ColorPicker,
} from "../App.styled";
import Chair from "./Chair";
import * as THREE from "three";
import Camera from "./Camera";
import React from "react";
import Pot from "./Pot";

const PAGES = 5;

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function RoomScene() {
  const [focusMesh, setFocusMesh] = useState(null);
  const [selecteColors, setSelecteColors] = useState({
    chair: "#F7BC5F",
    chairCushion: "#0B9A74",
    pot: "#FFE8C2",
  });
  const [focusAnimationDone, setFocusAnimationDone] = useState(false);
  const { progress } = useProgress();
  const { materials, nodes } = useGLTF("/models/Room-glb.gltf");

  const chairPosition = new THREE.Vector3(-0.91, 0.55, 0.24);

  return (
    <>
      <Modal className={focusMesh ? "active" : ""}>
        <div>
          <ColorPicker>
            <span>Chair</span>
            <SketchPicker
              color={selecteColors.chair}
              onChangeComplete={(color) =>
                setSelecteColors({ ...selecteColors, chair: color.hex })
              }
            />
          </ColorPicker>
          <ColorPicker>
            <span>Cushion</span>
            <SketchPicker
              color={selecteColors.chairCushion}
              onChangeComplete={(color) =>
                setSelecteColors({ ...selecteColors, chairCushion: color.hex })
              }
            />
          </ColorPicker>
        </div>
      </Modal>
      <StyledCanvas
        // frameloop="demand"
        id="three-canvas-container"
        shadows
        dpr={[1, 2]}
        camera={{ fov: 40 }}
      >
        <Suspense fallback={null}>
          <Lights />

          <Room hide={focusMesh} materials={materials} nodes={nodes} />
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

            {/* <Pot
              color={selecteColors.pot}
              nodes={nodes}
              setFocusMesh={setFocusMesh}
              materials={materials}
            /> */}

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
