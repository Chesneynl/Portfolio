import RoomScene from "./examples/room/components/RoomScene.jsx";
import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CubeShader from "./examples/cubeShader/CubeShader.jsx";
import Menu from "./menu/Menu.jsx";
import RayMarching from "./examples/rayMarching/RayMarching.jsx";

const PAGES = 5;

function App() {
  return (
    <div>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="room" element={<RoomScene />} />
          <Route path="cube-shader" element={<CubeShader />} />
          <Route path="ray-marching" element={<RayMarching />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
