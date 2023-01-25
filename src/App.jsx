import { Html, useProgress } from "@react-three/drei";
import RoomScene from "./examples/room/components/RoomScene.jsx";
import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CubeShader from "./examples/cubeShader/CubeShader.jsx";

const PAGES = 5;

function App() {
  const { progress } = useProgress();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="room" element={<RoomScene />} />
        <Route path="cube-shader" element={<CubeShader />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
