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

export const LineWrapper = styled.div`
  width: 100%;
  position: relative;
  z-index: 10;
`;

export const DialogueText = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 98px;
  font-weight: bold;
  position: relative;
  align-items: center;

  span {
    color: #019fe3;
    opacity: 0;
    transition: 0.2s;
    width: 100%;
  }
`;

export const DialogueBoxWrapper = styled.div`
  background: rgba(255, 255, 255, 0.5);
  width: 98px;
  height: 98px;
  flex-shrink: 0;
  border: 3px solid white;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    background: white;
    top: 50%;
    width: 42px;
    height: 3px;
    z-index: 20;
  }
`;

export const DialogueWrapper = styled.div`
  position: absolute;
  cursor: pointer;
  display: flex;
  color: black;
  pointer-events: all;

  line {
    stroke: white;
  }

  :hover {
    line {
      stroke: #019fe3;
    }

    ${DialogueBoxWrapper} {
      border-color: #019fe3;

      &::before {
        background: #019fe3;
      }
    }

    ${DialogueText} {
      span {
        opacity: 1;
      }
    }

    &:before {
      background: #019fe3;
    }
  }

  &::before {
    content: "";
    position: absolute;
    background: white;
    width: 10px;
    height: 10px;
    z-index: 20;
  }

  &.top-left {
    flex-direction: row-reverse;
    transform: translateX(-100%);

    ${LineWrapper} {
      height: calc(100% - 50px);
      padding-top: 50px;
    }

    ${DialogueBoxWrapper} {
      margin-right: 40px;

      &:before {
        left: calc(100% + 3px);
        top: calc(50% - 2px);
      }
    }

    ${DialogueText} {
      padding: 1px 10px 0 0;
      text-align: right;
    }

    &:before {
      right: -5px;
      bottom: -5px;
    }
  }

  &.bottom-left {
    flex-direction: row-reverse;
    transform: translateX(-100%);
    align-items: flex-end;

    ${LineWrapper} {
      height: calc(100% - 50px);
      padding-bottom: 50px;
    }

    ${DialogueBoxWrapper} {
      margin-right: 40px;

      &:before {
        left: calc(100% + 3px);
      }
    }

    ${DialogueText} {
      padding: 1px 10px 0 0;
      text-align: right;
    }

    &:before {
      right: -5px;
      top: -5px;
    }
  }

  &.bottom-right {
    flex-direction: row;
    transform: translateX(-100%);
    align-items: flex-end;

    ${LineWrapper} {
      height: calc(100% - 50px);
      padding-bottom: 50px;
    }

    ${DialogueBoxWrapper} {
      margin-left: 40px;

      &:before {
        right: calc(100% + 3px);
      }
    }

    ${DialogueText} {
      padding: 1px 0 0 10px;
      text-align: left;
    }

    &:before {
      left: -5px;
      top: -5px;
    }
  }

  &.top-right {
    flex-direction: row;

    ${LineWrapper} {
      height: calc(100% - 50px);
      padding-top: 50px;
    }

    ${DialogueBoxWrapper} {
      margin-left: 40px;

      &:before {
        right: calc(100% + 3px);
        top: calc(50% - 2px);
      }
    }

    ${DialogueText} {
      padding: 1px 0 0 10px;
    }

    &:before {
      left: -5px;
      bottom: -5px;
    }
  }
`;

export const StyledCanvas = styled(Canvas)`
  background-color: #ede0d4;
  height: 100vh !important;
  color: white;
  overflow: hidden;

  > div > div {
    transform: none !important;
  }
  h1 {
    position: absolute;
  }
`;

export const ColorPicker = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 12px;
    display: block;
  }
`;

export const StyledModal = styled.div`
  position: fixed;
  box-sizing: border-box;
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
  background: white;
  right: 0;
  top: 0;
  height: 100%;
  width: 600px;
  right: -600px;
  transition: right 0.2s;
  z-index: 100;
  padding: 24px 32px;
  display: flex;
  flex-direction: row;
  align-items: center;

  > div {
    width: 100%;
  }

  &.active {
    right: 0;
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
