import styled from "styled-components";

import { Canvas } from "@react-three/fiber";

export const WelcomeMessage = styled.div`
  position: absolute;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  font-size: 48px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0f544e;

  &.active {
    opacity: 0;
    transition: opacity 4s;
  }
`;

export const StyledCanvas = styled(Canvas)`
  background-color: #0f544e;
  height: 100vh !important;
  color: white;
  overflow: hidden;

  h1 {
    position: absolute;
  }
`;

export const ViewButton = styled.div`
  cursor: pointer;
  display: block;
  font-size: 5px;
  background: black;
  border-radius: 20px;
  text-align: center;
  padding: 2px 0px;
  margin-top: 3px;
  width: 29px;

  &:hover {
    background: white;
    color: black;
  }
`;

export const ClickToShow = styled.div`
  opacity: 0;
  transition: opacity 1s;

  &.active {
    opacity: 1;
  }
`;

export const ModelLabel = styled.div`
  cursor: pointer;
  outline: none;
  border: none;
  font-size: 8px;
  font-weight: 300;
  background: black;
  color: #f0f0f0;
  padding: 2px 10px;
  border-radius: 20px;
  letter-spacing: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const CloseButton = styled.div`
  height: 20px;
  background: red;
  display: block;
  position: absolute;
  padding: 5px 20px;
  right: 0;
  top: 0;
  z-index: 999;
  cursor: pointer;
`;

export const Container = styled.div`
  position: relative;
`;
