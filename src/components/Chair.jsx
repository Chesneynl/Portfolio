import { Html } from "@react-three/drei";

export default function Chair({
  nodes,
  color,
  materials,
  pillowColor,
  position,
}) {
  return (
    <group>
      <mesh>
        <Html
          scale={100}
          rotation={[Math.PI / 2, 0, 0]}
          position={[180, -350, 50]}
          transform
          occlude
        >
          <div className="annotation">
            6.550 $ <span style={{ fontSize: "1.5em" }}>🥲</span>
          </div>
        </Html>
      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Chair.geometry}
        material={materials.Material}
        position={position}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.95}
      >
        <meshStandardMaterial color={color} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Couch_legs001.geometry}
          material={materials.Table}
          position={[-0.39, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cushion002.geometry}
          material={materials.Material}
          position={[-0.39, 0.59, -0.08]}
          rotation={[1.15, 0, 0]}
          scale={[0.35, 0.13, 0.32]}
        >
          <meshStandardMaterial color={color} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pillow002.geometry}
          material={pillowColor}
          position={[-0.15, 0.47, 0.19]}
          rotation={[-2.67, -1.25, 2.51]}
        />
      </mesh>
    </group>
  );
}
