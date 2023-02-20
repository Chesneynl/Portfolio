import React, { useEffect, useState } from "react";
import Sketch from "react-p5";

var cols, rows;
var scl = 20;
var w;
var h;

var flying = 0;

var terrain = [];

export default (props) => {
  function setup(p5, canvasParentRef) {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL).parent(
      canvasParentRef
    );
    w = p5.windowWidth;
    h = p5.windowHeight;
    cols = w / scl;
    rows = h / scl;

    for (var x = 0; x < cols; x++) {
      terrain[x] = [];
      for (var y = 0; y < rows; y++) {
        terrain[x][y] = 0; //specify a default value for now
      }
    }
  }

  function draw(p5) {
    flying -= 0.01;
    var yoff = flying;
    for (var y = 0; y < rows; y++) {
      var xoff = 0;
      for (var x = 0; x < cols; x++) {
        terrain[x][y] = p5.map(p5.noise(xoff, yoff), 0, 1, -100, 100);
        xoff += 0.2;
      }
      yoff += 0.2;
    }

    p5.background(0);
    p5.translate(0, 50);
    p5.rotateX(p5.PI / 3);
    // p5.fill(200, 200, 200, 150);

    p5.noFill();
    p5.translate(-w / 2, -h / 2);
    for (var y = 0; y < rows - 1; y++) {
      p5.beginShape(p5.TRIANGLE_STRIP);
      for (var x = 0; x < cols; x++) {
        let color = p5.map(terrain[x][y], -100, 100, 0, 255);
        let color2 = p5.map(terrain[x][y + 1], -100, 100, 0, 255);
        // p5.noStroke();
        p5.fill(color, 0, 50);
        p5.vertex(x * scl, y * scl, terrain[x][y]);
        p5.fill(color, 0, 50);
        p5.vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
      }
      p5.endShape();
    }
  }

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
