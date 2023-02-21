import React, { useEffect, useState } from "react";
import Sketch from "react-p5";

var particles = [];
var n = 1000; //number of particle
var noiseScale = 800; //noise scale;

export default (props) => {
  function setup(p5, canvasParentRef) {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL).parent(
      canvasParentRef
    );

    p5.background(0);
    p5.noiseDetail(2, 0.75);

    for (var i = 0; i < n; i++) {
      var particle = new Object();
      particle.pos = p5.createVector(p5.random(p5.width), p5.random(p5.height));
      particles.push(particle); //add particle to particle list
    }
  }

  //get gradient vector
  function curl(x, y, p5) {
    var EPSILON = 0.1; //sampling interval
    //Find rate of change in X direction
    var n1 = p5.noise(x + EPSILON, y);
    var n2 = p5.noise(x - EPSILON, y);
    //Average to find approximate derivative
    var cx = (n1 - n2) / (2 * EPSILON);

    //Find rate of change in Y direction
    n1 = p5.noise(x, y + EPSILON);
    n2 = p5.noise(x, y - EPSILON);

    //Average to find approximate derivative
    var cy = (n1 - n2) / (2 * EPSILON);

    //return new createVector(cx, cy);//gradient toward higher position
    return new p5.createVector(cy, -cx); //rotate 90deg
  }

  function draw(p5) {
    p5.translate(-p5.width / 2, -p5.height / 2);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i]; //pick a particle

      var brightness = 0;

      // for(var j=0; j<particles.length; j++){
      //   if(i != j){
      //     var d = dist(p.pos.x, p.pos.y, particles[j].pos.x, particles[j].pos.y);
      //     if(d < 5){
      //       brightness += map(d, 0, 10, 255, 0);
      //     }
      //   }
      // }

      var xPosition = p.pos.x / noiseScale;
      var yPosition = p.pos.y / noiseScale;
      var noisePos = p5.noise(xPosition, yPosition);

      var rColor = p5.map(noisePos, 0, 0.5, 0, 60);
      var gColor = p5.map(noisePos, 0, 0.5, 0, 180);
      var bColor = p5.map(noisePos, 0, 0.5, 150, 0);

      p5.colorMode(p5.HSB, 90);
      p5.stroke(rColor, gColor, bColor);
      p.pos.add(curl(xPosition, yPosition, p5));
      p5.point(p.pos.x, p.pos.y);
    }
  }

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};
