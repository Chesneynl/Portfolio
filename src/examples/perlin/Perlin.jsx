import React, { useEffect, useState } from "react";
import Sketch from "react-p5";

export default (props) => {
  let pallete = ["#ccd5ae", "#e9edc9", "#d4a373", "#faedcd", "#fefae0"];
  let pixelSize = 10;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  };

  const draw = (p5) => {
    var scalingFactor = 0.01;
    for (let x = 0; x < p5.width; x += pixelSize) {
      for (let y = 0; y < p5.height; y += pixelSize) {
        const n = p5.noise(
          x * scalingFactor,
          y * scalingFactor,
          p5.frameCount * 0.05
        );
        let randomIndex = Math.floor(p5.map(n, 0, 1, 0, 5));
        let color = pallete[randomIndex];
        let endColor =
          randomIndex + 1 > pallete.length - 1
            ? p5.color(pallete[0])
            : p5.color(pallete[randomIndex + 1]);

        const finalColor = p5.lerpColor(p5.color(color), p5.color(endColor), n);
        p5.stroke(finalColor);
        p5.fill(finalColor);
        p5.rect(x, y, pixelSize, pixelSize);
      }
    }
  };

  const mouseReleased = (p5) => {
    p5.noiseSeed(p5.millis());
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);
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
