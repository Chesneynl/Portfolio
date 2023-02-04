import RoomScene from "./examples/room/components/RoomScene.jsx";
import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CubeShader from "./examples/cubeShader/CubeShader.jsx";
import Menu from "./menu/Menu.jsx";
import RayMarching from "./examples/rayMarching/RayMarching.jsx";
import RayMarching2 from "./examples/rayMarching-2/RayMarching2.jsx";
import VerticesMove from "./examples/verticesMove/VerticesMove.jsx";
import Shimano from "./examples/shimano/components/Shimano.jsx";

const PAGES = 5;

function App() {
  return (
    <div>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="room" element={<RoomScene />} />
          <Route path="cube-shader" element={<CubeShader />} />
          <Route path="vertices-shader" element={<VerticesMove />} />
          <Route path="shimano" element={<Shimano />} />
          <Route path="ray-marching" element={<RayMarching />} />
          <Route path="ray-marching-2" element={<RayMarching2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
