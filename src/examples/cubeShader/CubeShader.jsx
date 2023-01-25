import React from "react";
import { Helmet } from "react-helmet";

function CubeShader() {
  console.log("hallo");
  return (
    <>
      <Helmet>
        <script
          type="text/javascript"
          src="src/examples/cubeShader/script.js"
        ></script>
      </Helmet>
    </>
  );
}

export default CubeShader;
