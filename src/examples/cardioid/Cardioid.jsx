import React, { useEffect, useState } from "react";
import Sketch from "react-p5";

export default (props) => {
  let pallete = ["#ccd5ae", "#e9edc9", "#d4a373", "#faedcd", "#fefae0"];
  let total = 200;
  let factor = 0;
  let r;
  const Y_AXIS = 1;
  const X_AXIS = 2;
  let b1, b2;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    r = p5.constrain(p5.windowWidth / 2 - 80, 0, 350);

    b1 = p5.color(204, 102, 200);
    b2 = p5.color(204, 102, 220);
  };

  const draw = (p5) => {
    for (let i = 0; i < p5.width; i++) {
      let inter = p5.map(i, 0, p5.width, 0, 1);
      let c = p5.lerpColor(p5.color("#fefae0"), p5.color("#faedcd"), inter);
      p5.stroke(c);
      p5.line(i, 0, i, p5.height);
    }

    let total = p5.map(p5.mouseX, 0, p5.width, 5, 200);
    factor += 0.01;

    p5.translate(p5.width / 2, p5.height / 2);
    p5.stroke("#14213d");
    p5.noFill();
    p5.circle(0, 0, r * 2);

    // for (let i = 0; i < total; i++) {
    //   let v = getVector(p5, i, total);
    //   p5.fill(255);
    //   p5.circle(v.x, v.y, 16);
    // }

    for (let i = 0; i < total; i++) {
      let a = getVector(p5, i, total);
      let b = getVector(p5, i * factor, total);

      p5.stroke("#14213d");
      p5.line(a.x, a.y, b.x, b.y);
    }
  };

  const getVector = (p, i, total) => {
    let angle = p.map(i % total, 0, total, 0, p.TWO_PI);
    let v = p5.Vector.fromAngle(angle - p.PI);

    v.mult(r);
    return v;
  };

  const mouseReleased = (p5) => {
    p5.noiseSeed(p5.millis());
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    r = p5.constrain(p5.windowWidth / 2 - 80, 0, 350);
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
