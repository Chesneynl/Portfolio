import { Html, useProgress } from "@react-three/drei";
import React from "react";
import RoomScene from "./components/RoomScene";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const PAGES = 5;

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function App() {
  const { progress } = useProgress();

  return <RoomScene />;
}

export default App;
