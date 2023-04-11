import React, { useEffect, useState } from "react";
import { Text } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

const AnimatedText = animated(Text);

export default function Welcome() {
  const [visible, setVisible] = useState(false);

  const fadeProps = useSpring({
    opacity: visible ? 1 : 0,
    config: { duration: 5000 },
  });

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <animated.group>
      <AnimatedText
        material-props={fadeProps}
        // color={colorProps.color}
        font="/fonts/inter-bold.woff"
        anchorX="center"
        anchorY="middle"
        // color={springs.color}
        position={[0, 0, -1]}
      >
        Hi, i'm{"\n"}Chesney
      </AnimatedText>
    </animated.group>
  );
}
