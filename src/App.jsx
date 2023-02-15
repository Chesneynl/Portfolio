import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import RoomScene from "./examples/room/RoomScene.jsx";
import Menu from "./menu/Menu.jsx";
import RayMarching from "./examples/rayMarching/RayMarching.jsx";
import RayMarching2 from "./examples/rayMarching-2/RayMarching2.jsx";
import Shimano from "./examples/shimano/components/Shimano.jsx";
import WaveScene from "./examples/wave/WaveScene.jsx";
import FlowField from "./examples/flowField/FlowField.jsx";
import PixelPaint from "./examples/pixelPaint/PixelPaint.jsx";
import VoronoiDiagram from "./examples/voronoi/VoronoiDiagram.jsx";
import Perlin from "./examples/perlin/Perlin.jsx";
import Cardioid from "./examples/cardioid/Cardioid.jsx";
import Sphere from "./examples/sphere/Sphere.jsx";

const PAGES = 5;

function App() {
  return (
    <div>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route index element={<FlowField />} />
          <Route path="room" element={<RoomScene />} />
          <Route path="wave" element={<WaveScene />} />
          <Route path="pixel-paint" element={<PixelPaint />} />
          <Route path="shimano" element={<Shimano />} />
          <Route path="voronoi" element={<VoronoiDiagram />} />
          <Route path="perlin" element={<Perlin />} />
          <Route path="cardioid" element={<Cardioid />} />
          <Route path="sphere" element={<Sphere />} />
          <Route path="ray-marching" element={<RayMarching />} />
          <Route path="ray-marching-2" element={<RayMarching2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
