import React from 'react';
import Sketch from 'react-p5';

const JellyfishAnimation = () => {
  let angle = 0;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.background(0);
  };

  const draw = (p5) => {
    p5.background(0, 20);

    p5.translate(p5.width / 2, p5.height / 2);
    let radius = 200;

    p5.stroke(0, 255, 255);
    p5.noFill();

    for (let i = 0; i < 50; i++) {
      let x = radius * p5.cos(angle + i * 0.1);
      let y = radius * p5.sin(angle + i * 0.1);
      p5.ellipse(x, y, 50, 50);
    }

    angle += 0.05;
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default JellyfishAnimation;