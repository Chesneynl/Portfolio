import React from "react";
import { Link } from "react-router-dom";
import { MenuContainer } from "./Menu.styled";

function Menu() {
  return (
    <MenuContainer>
      <Link to="/">Room</Link>
      <Link to="/cube-shader">Cube Shader</Link>
      <Link to="/wave">Wave</Link>
    </MenuContainer>
  );
}

export default Menu;
