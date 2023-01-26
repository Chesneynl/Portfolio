import styled from "styled-components";

export const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  gap: 16px;
  width: 100%;
  height: 50px;
  padding: 0 40px;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  z-index: 100;

  a {
    color: white;
    text-decoration: none;
  }
`;
