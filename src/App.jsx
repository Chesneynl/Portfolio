import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import RoomScene from "./examples/room/RoomScene.jsx";
import Menu from "./menu/Menu.jsx";
import RayMarching from "./examples/rayMarching/RayMarching.jsx";
import RayMarching2 from "./examples/rayMarching-2/RayMarching2.jsx";
import Shimano from "./examples/shimano/components/Shimano.jsx";
import WaveScene from "./examples/wave/WaveScene.jsx";
import FlowField from "./examples/flowField/FlowField.jsx";

const PAGES = 5;

function App() {
  return (
    <div>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route index element={<RoomScene />} />
          <Route path="wave" element={<WaveScene />} />
          <Route path="flow-field" element={<FlowField />} />
          <Route path="shimano" element={<Shimano />} />
          <Route path="ray-marching" element={<RayMarching />} />
          <Route path="ray-marching-2" element={<RayMarching2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
