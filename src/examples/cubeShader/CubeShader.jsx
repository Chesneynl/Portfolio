import React from "react";
import { Helmet } from "react-helmet";

function CubeShader() {
  console.log("hallo");
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
        <script
          type="text/javascript"
          src="src/examples/cubeShader/libs/three-pp.js"
        ></script>
        <script
          type="text/javascript"
          src="src/examples/cubeShader/script.js"
        ></script>
      </Helmet>
    </>
  );
}

export default CubeShader;
