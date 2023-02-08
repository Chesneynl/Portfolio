import React, { useEffect, useState } from "react";
import Sketch from "react-p5";

export default (props) => {
  let points = [];

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

    for (let i = 0; i < 20; i++) {
      points.push(p5.createVector(p5.random(p5.width), p5.random(p5.height)));
    }
  };

  const draw = (p5) => {
    p5.strokeWeight(8);
    for (let i = 0; i < points.length; i++) {
      p5.stroke(255, 255, 0);
      p5.point(points[i].x, points[i].y);
    }

    for (let x = 0; x < p5.width; x++) {
      for (let y = 0; y < p5.height; y++) {
        let closestPoint = null;
        let closestDist = p5.width;
        for (let i = 0; i < points.length; i++) {
          let point = points[i];
          let d = p5.dist(x, y, point.x, point.y);
          if (d < closestDist) {
            closestPoint = i;
            closestDist = d;
          }
        }
        p5.stroke(closestPoint * 50);
        p5.point(x, y);
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
