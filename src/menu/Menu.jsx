import React from "react";
import { Link } from "react-router-dom";
import { MenuContainer } from "./Menu.styled";

function Menu() {
  return (
    <MenuContainer>
      <Link to="/">Room</Link>
      <Link to="/flow-field">Flow Field</Link>
      <Link to="/pixel-paint">Pixel Paint</Link>
      <Link to="/perlin">Perlin</Link>
      {/* <Link to="/cardioid">Cardioid</Link> */}
      <Link to="/wave">Wave</Link>
    </MenuContainer>
  );
}

export default Menu;
