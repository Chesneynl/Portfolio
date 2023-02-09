import React from "react";
import { Link } from "react-router-dom";
import { MenuContainer } from "./Menu.styled";

function Menu() {
  return (
    <MenuContainer>
      <Link to="/room">Room</Link>
      <Link to="/">Flow Field</Link>
      <Link to="/pixel-paint">Pixel Paint</Link>
      <Link to="/perlin">Perlin</Link>
      {/* <Link to="/cardioid">Cardioid</Link> */}
      <Link to="/wave">Wave</Link>
    </MenuContainer>
  );
}

export default Menu;
