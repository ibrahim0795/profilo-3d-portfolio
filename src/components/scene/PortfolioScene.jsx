/* eslint-disable react/no-unknown-property, react/prop-types */
import { Float, Stars, Text3D, Center } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';

function NeonRing({ radius = 2.5, rotation = [0, 0, 0], color = '#68e8ff' }) {
  return (
    <mesh rotation={rotation}>
      <torusGeometry args={[radius, 0.012, 16, 160]} />
      <meshBasicMaterial color={color} transparent opacity={0.75} />
    </mesh>
  );
}

function CoreIdentity() {
  const groupRef = useRef(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.18;
    groupRef.current.rotation.z = Math.sin(Date.now() * 0.00035) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.6}>
        <mesh>
          <icosahedronGeometry args={[1.15, 2]} />
          <meshStandardMaterial
            color="#07111f"
            emissive="#0bbddd"
            emissiveIntensity={0.42}
            metalness={0.78}
            roughness={0.18}
            wireframe
          />
        </mesh>
        <NeonRing rotation={[Math.PI / 2.6, 0, 0.2]} />
        <NeonRing radius={2.05} rotation={[0.25, Math.PI / 2.2, 0]} color="#5f7cff" />
        <NeonRing radius={1.55} rotation={[0.9, 0.4, Math.PI / 2]} color="#b8f6ff" />
      </Float>
    </group>
  );
}

function FloatingInitials() {
  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.45}>
      <Center position={[0, -0.12, 0.1]}>
        <Text3D
          font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
          size={0.72}
          height={0.06}
          curveSegments={8}
          bevelEnabled
          bevelSize={0.012}
          bevelThickness={0.018}
        >
          HARIS
          <meshStandardMaterial
            color="#eaf8ff"
            emissive="#68e8ff"
            emissiveIntensity={0.35}
            metalness={0.2}
            roughness={0.2}
          />
        </Text3D>
      </Center>
    </Float>
  );
}

function SceneContent() {
  return (
    <>
      <color attach="background" args={['#030712']} />
      <fog attach="fog" args={['#030712', 7, 18]} />
      <ambientLight intensity={0.42} />
      <pointLight position={[3.5, 2.5, 4]} color="#68e8ff" intensity={8} />
      <pointLight position={[-4, -1, -2]} color="#5f7cff" intensity={4} />
      <Stars
        radius={70}
        depth={35}
        count={1800}
        factor={4}
        saturation={0}
        fade
        speed={0.35}
      />
      <group position={[1.7, 0, -1.8]}>
        <CoreIdentity />
        <FloatingInitials />
      </group>
    </>
  );
}

function PortfolioScene() {
  return (
    <div className="scene-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.35, 6.2], fov: 42 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default PortfolioScene;
