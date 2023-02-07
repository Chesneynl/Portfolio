import { Suspense, useState, useTransition } from "react";
import {
  useGLTF,
  Html,
  useProgress,
  ScrollControls,
  Scroll,
} from "@react-three/drei";
import Room from "./components/Room";
import Lights from "./components/Lights";
import Floor from "./components/Floor";
import { StyledCanvas } from "./App.styled";
import Chair from "./components/Chair";
import Camera from "./components/Camera";
import React from "react";
import Plant from "./components/Plant";
import Donut from "./components/Donut";
import Modal from "./components/Modal";

const PAGES = 5;

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function RoomScene() {
  const [isPending, startTransition] = useTransition();
  const [focusMesh, setFocusMesh] = useState(null);
  const [selecteColors, setSelecteColors] = useState({
    chair: "#D5A3A3",
    chairCushion: "#D6E28D",
    pot: "#A59476",
    plant: "#299359",
    donutGlaze: "#F97AAF",
    sprinkles: "#78D7B1",
    donutColor: "#E5BF82",
  });
  const { materials, nodes } = useGLTF("/models/Room-glb.gltf");

  if (isPending) {
    return <Loader />;
  }

  return (
    <>
      <Suspense fallback={null}>
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
        </StyledCanvas>
      </Suspense>
    </>
  );
}

export default RoomScene;
