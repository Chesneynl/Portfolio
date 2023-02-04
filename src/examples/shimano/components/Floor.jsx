import { useLoader } from "@react-three/fiber";
import img from "../textures/road.jpeg";

export default function Floor() {
  const texture = useLoader(THREE.TextureLoader, "textures/road.jpeg");
  console.log({ img });

  return (
    <mesh
      scale={20}
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.2, 0]}
    >
      <planeGeometry />

      <shadowMaterial transparent opacity={0.3} />
    </mesh>
  );
}
