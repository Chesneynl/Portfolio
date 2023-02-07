import React, { useEffect, useState } from "react";
import Sketch from "react-p5";

export default (props) => {
  let particles = [];
  const num = 1000;

  const noiseScale = 0.01 / 2;

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

    for (let i = 0; i < num; i++) {
      const v1 = p5.createVector(p5.random(p5.width), p5.random(p5.height));

      particles.push(v1);
    }

    // p5.stroke(255);
    // For a cool effect try uncommenting this line
    // And comment out the background() line in draw
    p5.stroke(255, 50);
    p5.clear();
  };

  const draw = (p5) => {
    for (let i = 0; i < num; i++) {
      let p = particles[i];
      let red = p5.map(p.x, 0, 255, 0, 255); // map the x-position to a range of red values
      let green = p5.map(p.x, 0, p5.width, 255, 0); // map the x-position to a range of green values
      let blue = p5.map(p.y, 0, p5.width, 0, 255); // map the x-position to a range of blue values
      p5.stroke(red, green, blue);
      p5.point(p.x, p.y);
      let n = p5.noise(
        p.x * noiseScale,
        p.y * noiseScale,
        p5.frameCount * noiseScale * noiseScale
      );
      let a = p5.TAU * n;
      p.x += p5.cos(a);
      p.y += p5.sin(a);
      if (!onScreen(p, p5) && p5.frameCount < 1000) {
        p.x = p5.random(p5.width);
        p.y = p5.random(p5.height);
      }
    }
  };

  const mouseReleased = (p5) => {
    p5.noiseSeed(p5.millis());
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
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
