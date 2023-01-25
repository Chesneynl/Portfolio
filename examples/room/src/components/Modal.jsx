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
import { StyledModal, ColorPicker } from "../App.styled";
import React from "react";

function Modal({ focusMesh, selecteColors, setSelecteColors }) {
  return (
    <StyledModal className={focusMesh ? "active" : ""}>
      {focusMesh === "chair" && (
        <div>
          <ColorPicker>
            <span>Chair</span>
            <SketchPicker
              color={selecteColors.chair}
              onChange={(color) =>
                setSelecteColors({ ...selecteColors, chair: color.hex })
              }
            />
          </ColorPicker>
          <ColorPicker>
            <span>Cushion</span>
            <SketchPicker
              color={selecteColors.chairCushion}
              onChange={(color) =>
                setSelecteColors({ ...selecteColors, chairCushion: color.hex })
              }
            />
          </ColorPicker>
        </div>
      )}
      {focusMesh === "plant" && (
        <div>
          <ColorPicker>
            <span>Plant</span>
            <SketchPicker
              color={selecteColors.plant}
              onChange={(color) =>
                setSelecteColors({ ...selecteColors, plant: color.hex })
              }
            />
          </ColorPicker>
          <ColorPicker>
            <span>Pot</span>
            <SketchPicker
              color={selecteColors.pot}
              onChange={(color) =>
                setSelecteColors({ ...selecteColors, pot: color.hex })
              }
            />
          </ColorPicker>
        </div>
      )}

      {focusMesh === "donut" && (
        <div>
          <ColorPicker>
            <span>Sprinkles</span>
            <SketchPicker
              color={selecteColors.sprinkles}
              onChange={(color) =>
                setSelecteColors({ ...selecteColors, sprinkles: color.hex })
              }
            />
          </ColorPicker>
          <ColorPicker>
            <span>Glaze</span>
            <SketchPicker
              color={selecteColors.donutGlaze}
              onChange={(color) =>
                setSelecteColors({ ...selecteColors, donutGlaze: color.hex })
              }
            />
          </ColorPicker>
        </div>
      )}
    </StyledModal>
  );
}

export default Modal;
