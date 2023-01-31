import React from "react";
import { Helmet } from "react-helmet";

function RayMarching() {
  return (
    <>
      <Helmet>
        <script
          type="text/javascript"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/2666677/three.min.js"
        ></script>
        <script
          type="text/javascript"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/2666677/OrbitControls.js"
        ></script>
        <script
          type="text/javascript"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/2666677/MyShaderChunks.js"
        ></script>
        <script type="text/javascript" src="../libs/three-pp.js"></script>
        <script
          type="text/javascript"
          src="../src/examples/rayMarching/script.js"
        ></script>
      </Helmet>
      <div id="ray-marching-container" />
    </>
  );
}

export default RayMarching;
