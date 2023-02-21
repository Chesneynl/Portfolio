import React from "react";
import { Link } from "react-router-dom";
import { MenuContainer } from "./Menu.styled";

function Menu() {
  return (
    <MenuContainer>
      <Link to="/">Flow Field</Link>
      <Link to="/flow-field-circle">Flow Field Circle</Link>
      <Link to="/room">Room</Link>
      {/* <Link to="/pixel-paint">Pixel Paint</Link> */}
      {/* <Link to="/perlin">Perlin</Link> */}
      <Link to="/cardioid">Cardioid</Link>
      <Link to="/sphere">Sphere</Link>
      <Link to="/terrain">Terrain</Link>
      {/* <Link to="/wave">Wave</Link> */}
    </MenuContainer>
  );
}

export default Menu;
