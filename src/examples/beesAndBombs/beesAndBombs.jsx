import React, { useEffect, useState } from "react";
import Sketch from "react-p5";

let angle = 0;
let w = 24;
let ma;

export default (props) => {
  function setup(p5, canvasParentRef) {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL).parent(
      canvasParentRef
    );
    ma = p5.atan(1 / p5.sqrt(2));
  }

  function draw(p5) {
    p5.background(100);
    let z = 600;
    p5.ortho(-z, z, -z, z, 0, 2000);

    p5.rotateX(-p5.QUARTER_PI);
    p5.rotateY(-p5.QUARTER_PI);
    // p5.rotateY(ma);

    let offset = 0;
    for (let z = 0; z < p5.height; z += w) {
      for (let x = 0; x < p5.width; x += w) {
        p5.push();
        let a = angle + offset;
        let h = p5.map(p5.sin(a), -1, 1, 0, 100);

        p5.translate(x - p5.width / 2, 0, z - p5.height / 2);
        p5.normalMaterial();
        p5.box(w - 2, h, w - 2);
        p5.pop();
      }
      offset += 0.1;
    }

    angle += 0.1;
  }

  const windowResized = (p5) => {
    // p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    // p5.background(0);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};
