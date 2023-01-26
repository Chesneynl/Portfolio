import React from "react";
import { Link } from "react-router-dom";
import { MenuContainer } from "./Menu.styled";

function Menu() {
  return (
    <MenuContainer>
      <Link to="/room">Room</Link>
      <Link to="/cube-shader">Cube Shader</Link>
    </MenuContainer>
  );
}

export default Menu;
