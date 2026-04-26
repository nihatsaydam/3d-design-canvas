import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import * as THREE from "three";

function SculptModel() {
  // A stand-in sculpt: high-poly icosahedron with subtle deformation, like a clay bust block.
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.2, 6);
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const n = Math.sin(v.x * 2.5) * 0.05 + Math.cos(v.y * 3.1) * 0.04 + Math.sin(v.z * 2.0) * 0.05;
      v.multiplyScalar(1 + n);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial
        color="#c9c4bd"
        roughness={0.55}
        metalness={0.1}
        flatShading={false}
      />
    </mesh>
  );
}

export default function Viewport3D() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.3, 4], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#101010"]} />
      <fog attach="fog" args={["#0a0a0a", 8, 18]} />

      <ambientLight intensity={0.25} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-5, 2, -3]} intensity={0.6} color="#ff5050" />
      <directionalLight position={[0, -3, 2]} intensity={0.3} color="#7090ff" />

      <Suspense fallback={null}>
        <SculptModel />
        <ContactShadows position={[0, -1.4, 0]} opacity={0.6} scale={6} blur={2.4} far={3} />
        <Environment preset="studio" />
      </Suspense>

      <OrbitControls
        enablePan
        enableZoom
        minDistance={2}
        maxDistance={10}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}
