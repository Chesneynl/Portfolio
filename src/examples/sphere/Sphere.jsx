import React, { useEffect, useState } from "react";
import Sketch from "react-p5";

let r = 200;
let density;
let densitySlider;

let thetaMax, phiMax;
let thetaMaxSlider, phiMaxSlider;

let frequency, frequency2;
let frequencySlider, frequencySlider2;

let sliders;

let select;

export default (props) => {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL).parent(
      canvasParentRef
    );
    // p5.createCanvas(700, 700, p5.WEBGL).parent(canvasParentRef);
    p5.angleMode(p5.DEGREES);
    p5.colorMode(p5.HSB);

    p5.stroke(199, 80, 88);
    p5.strokeWeight(3);
    p5.noFill();

    sliders = p5.createDiv("Select Sphere");
    sliders.style("color", "white");
    sliders.style("position", "fixed");
    sliders.style("bottom", "10px");
    sliders.style("right", "10px");

    select = p5.createSelect();
    select.style("display", "block");
    select.option("Normal Sphere");
    select.option("Spherical Spiral");
    select.option("Sphere Lissajous");
    select.option("Bumpy Sphere");
    select.option("Explosion");
    select.option("Hour Glass");
    select.option("Flower Field");
    select.option("Bullet");
    select.option("Universe");
    // select.selected("Normal Sphere");
    select.selected("Universe");
    select.parent(sliders);

    thetaMax = p5.createDiv();
    thetaMaxSlider = p5.createSlider(0, 360, 360, 1);
    thetaMax.parent(sliders);
    thetaMaxSlider.parent(sliders);
    thetaMax.style("display", "none");
    thetaMaxSlider.style("display", "none");

    phiMax = p5.createDiv();
    phiMaxSlider = p5.createSlider(0, 180, 180, 1);
    phiMax.parent(sliders);
    phiMaxSlider.parent(sliders);
    phiMax.style("display", "none");
    phiMaxSlider.style("display", "none");

    density = p5.createDiv();
    densitySlider = p5.createSlider(3, 62, 24, 1);
    density.parent(sliders);
    densitySlider.parent(sliders);
    density.style("display", "none");
    densitySlider.style("display", "none");

    frequency = p5.createDiv();
    frequencySlider = p5.createSlider(1, 10, 1, 0.01);
    frequency.parent(sliders);
    frequencySlider.parent(sliders);
    frequency.style("display", "none");
    frequencySlider.style("display", "none");

    frequency2 = p5.createDiv();
    frequencySlider2 = p5.createSlider(1, 10, 1, 0.01);
    frequency2.parent(sliders);
    frequencySlider2.parent(sliders);
    frequency2.style("display", "none");
    frequencySlider2.style("display", "none");
  };

  const draw = (p5) => {
    p5.background(230, 50, 15);
    p5.orbitControl(4, 4, 1);

    p5.rotateY(90);
    p5.rotateZ(65);

    console.log(select.value());

    switch (select.value()) {
      case "Normal Sphere":
        resetDivs();
        thetaMax.show();
        thetaMaxSlider.show();
        phiMax.show();
        phiMaxSlider.show();
        density.show();
        densitySlider.show();
        normalSphere(p5);
        break;
      case "Bumpy Sphere":
        resetDivs();
        thetaMax.show();
        thetaMaxSlider.show();
        phiMax.show();
        phiMaxSlider.show();
        bumpySphere(p5);
        break;
      case "Spherical Spiral":
        resetDivs();
        thetaMax.show();
        thetaMaxSlider.show();
        density.show();
        densitySlider.show();
        sphericalSpiral(p5);
        break;
      case "Bullet":
        resetDivs();
        thetaMax.show();
        thetaMaxSlider.show();
        phiMax.show();
        phiMaxSlider.show();
        bullet(p5);
        break;
      case "Flower Field":
        resetDivs();
        thetaMax.show();
        thetaMaxSlider.show();
        phiMax.show();
        phiMaxSlider.show();
        flowerField(p5);
        break;
      case "Hour Glass":
        resetDivs();
        thetaMax.show();
        thetaMaxSlider.show();
        phiMax.show();
        phiMaxSlider.show();
        hourGlass(p5);
        break;
      case "Explosion":
        resetDivs();
        thetaMax.show();
        thetaMaxSlider.show();
        phiMax.show();
        phiMaxSlider.show();
        explosion(p5);
        break;
      case "Universe":
        resetDivs();
        thetaMax.show();
        thetaMaxSlider.show();
        phiMax.show();
        phiMaxSlider.show();
        universe(p5);
        break;
      case "Sphere Lissajous":
        resetDivs();
        frequency.show();
        frequencySlider.show();
        frequency2.show();
        frequencySlider2.show();
        sphericaLissajous(p5);
        break;
    }

    thetaMax.html("Theta Max: " + thetaMaxSlider.value());
    phiMax.html("Phi Max: " + phiMaxSlider.value());

    let displayDensity = p5.int(p5.map(densitySlider.value(), 3, 62, 1, 60));
    density.html("Density: " + displayDensity);

    frequency.html("Frequency: " + frequencySlider.value());
    frequency2.html("Frequency2: " + frequencySlider2.value());
  };

  function resetDivs() {
    thetaMax.hide();
    thetaMaxSlider.hide();
    phiMax.hide();
    phiMaxSlider.hide();
    density.hide();
    densitySlider.hide();
    frequency.hide();
    frequencySlider.hide();
    frequency2.hide();
    frequencySlider2.hide();
  }

  function normalSphere(p5) {
    for (
      let phi = 0;
      phi < phiMaxSlider.value();
      phi += 180 / densitySlider.value()
    ) {
      p5.beginShape();
      for (
        let theta = 0;
        theta < thetaMaxSlider.value();
        theta += 360 / densitySlider.value()
      ) {
        let x = r * p5.cos(phi);
        let y = r * p5.sin(phi) * p5.sin(theta);
        let z = r * p5.sin(phi) * p5.cos(theta);
        p5.stroke(p5.map(phi, 0, 180, 0, 360), 100, 100);
        p5.vertex(x, y, z);
      }
      p5.endShape(p5.CLOSE);
    }
  }

  function sphericalSpiral(p5) {
    p5.beginShape();
    for (let theta = 0; theta < thetaMaxSlider.value() / 2; theta += 0.1) {
      let x = r * p5.cos(theta);
      let y = r * p5.sin(theta) * p5.sin(theta * densitySlider.value());
      let z = r * p5.sin(theta) * p5.cos(theta * densitySlider.value());
      p5.stroke(p5.map(theta, 0, 180, 0, 360), 100, 100);
      p5.vertex(x, y, z);
    }
    p5.endShape(p5.LINES);
  }

  function bullet(p5) {
    for (let phi = 0; phi < phiMaxSlider.value(); phi += 2) {
      p5.beginShape(p5.POINTS);
      for (let theta = 0; theta < thetaMaxSlider.value(); theta += 2) {
        let x =
          r * (1 + 0.2 * p5.sin(theta * 6) * p5.sin(phi * 5)) * p5.tan(phi);
        let y =
          r *
          (1 + 0.2 * p5.sin(theta * 6) * p5.sin(phi * 5)) *
          p5.tan(phi * 0.5) *
          p5.sin(theta);
        let z =
          r *
          (1 + 0.2 * p5.sin(theta * 6) * p5.sin(phi * 5)) *
          p5.tan(phi * 0.5) *
          p5.cos(theta);
        p5.stroke(p5.map(phi, 0, 180, 0, 360), 100, 100);
        p5.vertex(x, y, z);
      }
      p5.endShape();
    }
  }

  function flowerField(p5) {
    for (let phi = 0; phi < phiMaxSlider.value(); phi += 2) {
      p5.beginShape(p5.POINTS);
      for (let theta = 0; theta < thetaMaxSlider.value(); theta += 2) {
        let x =
          r * (1 + 0.2 * p5.sin(theta * 6) * p5.sin(phi * 5)) * p5.cos(phi);
        let y =
          r *
          (1 + 0.2 * p5.sin(theta * 6) * p5.sin(phi * 5)) *
          p5.tan(phi * 1) *
          p5.sin(theta);
        let z =
          r *
          (1 + 0.2 * p5.sin(theta * 6) * p5.sin(phi * 5)) *
          p5.tan(phi * 1) *
          p5.cos(theta);
        p5.stroke(p5.map(phi, 0, 180, 0, 360), 100, 100);
        p5.vertex(x, y, z);
      }
      p5.endShape();
    }
  }

  function explosion(p5) {
    for (let phi = 0; phi < phiMaxSlider.value(); phi += 2) {
      p5.beginShape(p5.POINTS);
      for (let theta = 0; theta < thetaMaxSlider.value(); theta += 2) {
        let x =
          r * (1 + 0.2 * p5.tan(theta * 6) * p5.sin(phi * 5)) * p5.cos(phi);
        let y =
          r *
          (1 + 0.2 * p5.tan(theta * 6) * p5.sin(phi * 5)) *
          p5.sin(phi) *
          p5.sin(theta);
        let z =
          r *
          (1 + 0.2 * p5.tan(theta * 6) * p5.sin(phi * 5)) *
          p5.sin(phi) *
          p5.cos(theta);
        p5.stroke(p5.map(phi, 0, 180, 0, 360), 100, 100);
        p5.vertex(x, y, z);
      }
      p5.endShape();
    }
  }

  function hourGlass(p5) {
    for (let phi = 0; phi < phiMaxSlider.value(); phi += 2) {
      p5.beginShape(p5.POINTS);
      for (let theta = 0; theta < thetaMaxSlider.value(); theta += 2) {
        let x =
          r * (1 + 0.2 * p5.tan(theta * 6) * p5.sin(phi * 5)) * p5.tan(phi);
        let y =
          r *
          (1 + 0.2 * p5.sin(theta * 6) * p5.sin(phi * 5)) *
          p5.tan(phi) *
          p5.sin(theta);
        let z =
          r *
          (1 + 0.2 * p5.sin(theta * 6) * p5.sin(phi * 5)) *
          p5.tan(phi) *
          p5.cos(theta);
        p5.stroke(p5.map(phi, 0, 180, 0, 360), 100, 100);
        p5.vertex(x, y, z);
      }
      p5.endShape();
    }
  }

  function universe(p5) {
    for (let phi = 0; phi < phiMaxSlider.value(); phi += 2) {
      p5.beginShape(p5.POINTS);
      for (let theta = 0; theta < thetaMaxSlider.value(); theta += 2) {
        let x =
          r * (1 + 0.2 * p5.sin(theta * 6) * p5.sin(phi * 5)) * p5.cos(phi);
        let y =
          r *
          (1 + 0.2 * p5.sin(theta * 6) * p5.sin(phi * 5)) *
          p5.sin(phi) *
          p5.tan(theta);
        let z =
          r *
          (1 + 0.2 * p5.sin(theta * 6) * p5.cos(phi * 5)) *
          p5.tan(phi) *
          p5.cos(theta);
        p5.stroke(p5.map(phi, 0, 180, 0, 360), 100, 100);
        p5.vertex(x, y, z);
      }
      p5.endShape();
    }
  }

  function bumpySphere(p5) {
    for (let phi = 0; phi < phiMaxSlider.value(); phi += 2) {
      p5.beginShape(p5.POINTS);
      for (let theta = 0; theta < thetaMaxSlider.value(); theta += 2) {
        let x =
          r * (1 + 0.2 * p5.sin(theta * 6) * p5.sin(phi * 5)) * p5.cos(phi);
        let y =
          r *
          (1 + 0.2 * p5.sin(theta * 6) * p5.sin(phi * 5)) *
          p5.sin(phi) *
          p5.sin(theta);
        let z =
          r *
          (1 + 0.2 * p5.sin(theta * 6) * p5.sin(phi * 5)) *
          p5.sin(phi) *
          p5.cos(theta);
        p5.stroke(p5.map(phi, 0, 180, 0, 360), 100, 100);
        p5.vertex(x, y, z);
      }
      p5.endShape();
    }
  }

  function sphericaLissajous(p5) {
    p5.beginShape();
    for (let theta = 0; theta < 360; theta += 0.2) {
      let x = r * p5.cos(theta * frequencySlider.value());
      let y =
        r *
        p5.sin(theta * frequencySlider.value()) *
        p5.sin(theta * frequencySlider2.value());
      let z =
        r *
        p5.sin(theta * frequencySlider.value()) *
        p5.cos(theta * frequencySlider2.value());
      p5.stroke(p5.map(theta, 0, 180, 0, 360), 100, 100);
      // p5.fill(30, 30, 10);
      p5.vertex(x, y, z);
    }
    p5.endShape(p5.LINES);
  }

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};
