import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useState, useEffect, useRef } from "react";
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
import Room from "./components/Room";
import Lights from "./components/Lights";
import Floor from "./components/Floor";
import {
  WelcomeMessage,
  StyledCanvas,
  CloseButton,
  Container,
} from "./App.styled";
import { angleToRadians } from "../src/utils/angle";
import Chair from "./components/Chair";
import * as THREE from "three";
import Camera from "./components/Camera";
import React from "react";
import Scene from "./components/Scene";

const PAGES = 5;

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function App() {
  const { progress } = useProgress();

  return (
    <>
      <Scene />
    </>
  );
}

export default App;
