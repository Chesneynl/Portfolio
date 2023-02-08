import React, { useEffect, useState } from "react";
import Sketch from "react-p5";

export default (props) => {
  let pixelsCoords = [];
  const boxSize = 18;
  let pixelsAdded = 0;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

    let centerX = p5.width / 2;
    let centerY = p5.height / 2;

    p5.background(0);
    p5.fill(0, 0, 0);
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
        console.log(pixelsAdded / 255);
        const randomRed = p5.constrain(pixelsAdded / 8, 0, 255);
        const randomGreen = p5.constrain(pixelsAdded / 8 - randomRed, 0, 255);
        const randomBlue = p5.constrain(
          pixelsAdded / 8 - randomRed - randomGreen,
          0,
          188
        );
        p5.stroke(randomRed, randomGreen, randomBlue);
        p5.fill(randomRed, randomGreen, randomBlue);
        p5.square(
          filteredPossiblePixels[j].x,
          filteredPossiblePixels[j].y,
          boxSize
        );
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

  const mouseReleased = (p5) => {
    p5.noiseSeed(p5.millis());
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);
  };

  const onScreen = (v, p5) => {
    return v.x >= 0 && v.x <= p5.width && v.y >= 0 && v.y <= p5.height;
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      mouseReleased={mouseReleased}
    />
  );
};
