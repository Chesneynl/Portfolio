import React, { useEffect, useState } from "react";
import Sketch from "react-p5";

export default (props) => {
  let pixelsCoords = [];
  let colorPallet = [
    ["#cdb4db", "#ffc8dd", "#ffafcc", "#bde0fe", "#a2d2ff"],
    ["#8ecae6", "#219ebc", "#023047", "#ffb703", "#fb8500"],
    ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"],
    ["#2b2d42", "#8d99ae", "#edf2f4", "#ef233c", "#d90429"],
    ["#ff99c8", "#fcf6bd", "#d0f4de", "#a9def9", "#e4c1f9"],
  ];
  let selectedPallete;

  const boxSize = 18;
  let pixelsAdded = 0;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    selectedPallete = colorPallet[Math.floor(p5.random(colorPallet.length))];

    let centerX = p5.width / 2;
    let centerY = p5.height / 2;

    p5.background(0);
    p5.fill(selectedPallete[Math.floor(p5.random(5))]);
    p5.square(centerX, centerY, boxSize);

    pixelsCoords.push({ x: centerX, y: centerY });
  };

  const draw = (p5) => {
    if (pixelsAdded === (p5.width * p5.height) / boxSize) return;

    const p = pixelsCoords[p5.frameCount - 1];
    let allPossiblePixels = [
      { x: p.x + boxSize, y: p.y },
      { x: p.x + boxSize, y: p.y + boxSize },
      { x: p.x - boxSize, y: p.y },
      { x: p.x - boxSize, y: p.y - boxSize },
      { x: p.x, y: p.y + boxSize },
      { x: p.x - boxSize, y: p.y + boxSize },
      { x: p.x, y: p.y - boxSize },
      { x: p.x + boxSize, y: p.y - boxSize },
    ];
    let filteredPossiblePixels = allPossiblePixels.filter((v) =>
      onScreen(v, p5)
    );

    for (let j = 0; j < filteredPossiblePixels.length; j++) {
      const alreadyAdded = checkPoint(
        filteredPossiblePixels[j].x,
        filteredPossiblePixels[j].y
      );
      if (!alreadyAdded) {
        const xPos = filteredPossiblePixels[j].x;
        const yPos = filteredPossiblePixels[j].y;

        let n = p5.noise(xPos, yPos, p5.frameCount);
        let randomIndex = p5.map(n, 0, 1, 0, 5);

        const randomColor = selectedPallete[Math.floor(randomIndex)];

        p5.stroke(randomColor);
        p5.fill(randomColor);
        p5.square(xPos, yPos, boxSize);
        pixelsAdded++;
        pixelsCoords.push(filteredPossiblePixels[j]);
      }
    }
  };

  const checkPoint = (x, y) => {
    for (let i = 0; i < pixelsCoords.length; i++) {
      if (pixelsCoords[i].x === x && pixelsCoords[i].y === y) {
        return true;
      }
    }
    return false;
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);
  };

  const onScreen = (v, p5) => {
    return v.x >= 0 && v.x <= p5.width && v.y >= 0 && v.y <= p5.height;
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};
