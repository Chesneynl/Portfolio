import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import RoomScene from "./examples/room/RoomScene.jsx";
import Menu from "./menu/Menu.jsx";
import RayMarching from "./examples/rayMarching/RayMarching.jsx";
import RayMarching2 from "./examples/rayMarching-2/RayMarching2.jsx";
import Shimano from "./examples/shimano/components/Shimano.jsx";
import WaveScene from "./examples/wave/WaveScene.jsx";
import FlowField from "./examples/flowField/FlowField.jsx";
import Perlin from "./examples/perlin/Perlin.jsx";
import Cardioid from "./examples/cardioid/Cardioid.jsx";
import Sphere from "./examples/sphere/Sphere.jsx";
import Terrain from "./examples/terrain/Terrain.jsx";
import FlowFieldCircle from "./examples/flowFieldCircle/flowFieldCircle.jsx";

const PAGES = 5;

function App() {
  return (
    <div>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route index element={<FlowField />} />
          <Route path="flow-field-circle" element={<FlowFieldCircle />} />
          <Route path="room" element={<RoomScene />} />
          <Route path="wave" element={<WaveScene />} />
          <Route path="terrain" element={<Terrain />} />
          <Route path="shimano" element={<Shimano />} />
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
