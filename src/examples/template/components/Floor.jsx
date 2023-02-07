export default function Floor() {
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
