/* eslint-disable react/no-unknown-property, react/prop-types */
import { Float, Stars, Text } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';

const cameraPositions = [
  [0, 0.35, 6.2],
  [-1.2, 0.55, 5.4],
  [1.2, 0.2, 4.8],
  [-0.8, -0.15, 5.1],
  [0.35, 0.6, 6.4],
];

const techBadges = [
  { label: 'HTML', angle: 0, color: '#ff7a59' },
  { label: 'CSS', angle: Math.PI / 4, color: '#68e8ff' },
  { label: 'JS', angle: Math.PI / 2, color: '#ffe66d' },
  { label: 'TS', angle: (Math.PI * 3) / 4, color: '#7df9ff' },
  { label: 'React', angle: Math.PI, color: '#b8f6ff' },
  { label: 'Next', angle: (Math.PI * 5) / 4, color: '#eaf8ff' },
  { label: 'Node', angle: (Math.PI * 3) / 2, color: '#8ef6c5' },
  { label: 'SQL', angle: (Math.PI * 7) / 4, color: '#8dd6ff' },
];

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')),
    );
  } catch {
    return false;
  }
}

function useSceneQuality() {
  const [quality, setQuality] = useState({ dpr: [1, 1.6], stars: 1800, mobile: false });

  useEffect(() => {
    const updateQuality = () => {
      const mobile = window.matchMedia('(max-width: 760px)').matches;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      setQuality({
        dpr: mobile || reducedMotion ? [1, 1.15] : [1, 1.6],
        stars: mobile || reducedMotion ? 850 : 1600,
        mobile,
      });
    };

    updateQuality();
    window.addEventListener('resize', updateQuality);
    return () => window.removeEventListener('resize', updateQuality);
  }, []);

  return quality;
}

function NeonRing({ radius = 2.5, rotation = [0, 0, 0], color = '#68e8ff' }) {
  return (
    <mesh rotation={rotation}>
      <torusGeometry args={[radius, 0.01, 12, 120]} />
      <meshBasicMaterial color={color} transparent opacity={0.72} />
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
          <icosahedronGeometry args={[1.15, 1]} />
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

function FloatingName() {
  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.45}>
      <Text
        position={[0, -0.12, 0.16]}
        fontSize={0.64}
        letterSpacing={0.04}
        anchorX="center"
        anchorY="middle"
        color="#eaf8ff"
      >
        IBRAHIM
        <meshStandardMaterial
          color="#eaf8ff"
          emissive="#68e8ff"
          emissiveIntensity={0.22}
          metalness={0.15}
          roughness={0.28}
        />
      </Text>
    </Float>
  );
}

function TechBadge({ badge, index }) {
  const badgeRef = useRef(null);
  const radius = 3.05;

  useFrame((state) => {
    if (!badgeRef.current) return;
    const time = state.clock.elapsedTime * 0.35;
    const angle = badge.angle + time;
    badgeRef.current.position.x = Math.cos(angle) * radius;
    badgeRef.current.position.z = Math.sin(angle) * 0.65;
    badgeRef.current.position.y = Math.sin(angle * 1.6 + index) * 0.35;
    badgeRef.current.lookAt(state.camera.position);
  });

  return (
    <group ref={badgeRef}>
      <mesh>
        <boxGeometry args={[0.82, 0.32, 0.035]} />
        <meshStandardMaterial
          color="#07111f"
          emissive={badge.color}
          emissiveIntensity={0.25}
          metalness={0.45}
          roughness={0.22}
          transparent
          opacity={0.82}
        />
      </mesh>
      <Text
        position={[0, -0.01, 0.04]}
        fontSize={0.13}
        color="#eaf8ff"
        anchorX="center"
        anchorY="middle"
      >
        {badge.label}
      </Text>
    </group>
  );
}

function TechOrbit({ mobile }) {
  const orbitRef = useRef(null);
  const visibleBadges = useMemo(() => (mobile ? techBadges.slice(0, 5) : techBadges), [mobile]);

  useFrame((_, delta) => {
    if (!orbitRef.current) return;
    orbitRef.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={orbitRef}>
      {visibleBadges.map((badge, index) => (
        <TechBadge badge={badge} index={index} key={badge.label} />
      ))}
    </group>
  );
}

function ProjectBeacon({ position, color = '#68e8ff', scale = 1 }) {
  return (
    <Float speed={1.2} rotationIntensity={0.28} floatIntensity={0.45}>
      <group position={position} scale={scale}>
        <mesh rotation={[0.2, 0.4, 0.1]}>
          <boxGeometry args={[1.35, 0.78, 0.035]} />
          <meshBasicMaterial color={color} transparent opacity={0.16} />
        </mesh>
        <mesh rotation={[0.2, 0.4, 0.1]} position={[0, 0, 0.03]}>
          <boxGeometry args={[1.05, 0.5, 0.025]} />
          <meshBasicMaterial color="#eaf8ff" transparent opacity={0.08} />
        </mesh>
        <NeonRing radius={0.78} rotation={[Math.PI / 2, 0, 0]} color={color} />
      </group>
    </Float>
  );
}

function ProjectConstellation({ mobile }) {
  if (mobile) return null;

  return (
    <group position={[-1.2, -0.65, -2.4]}>
      <ProjectBeacon position={[-1.6, 0.4, 0]} color="#68e8ff" scale={0.8} />
      <ProjectBeacon position={[0, -0.15, -0.4]} color="#5f7cff" scale={0.95} />
      <ProjectBeacon position={[1.65, 0.35, 0.2]} color="#b8f6ff" scale={0.75} />
    </group>
  );
}

function CameraRig({ mobile }) {
  const rigRef = useRef(null);
  const scrollRef = useRef(0);
  const { camera } = useThree();

  useEffect(() => {
    const updateScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);

    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, []);

  useFrame((_, delta) => {
    const progress = scrollRef.current;
    const scaled = progress * (cameraPositions.length - 1);
    const index = Math.min(Math.floor(scaled), cameraPositions.length - 2);
    const localProgress = scaled - index;
    const from = cameraPositions[index];
    const to = cameraPositions[index + 1];
    const mobileOffset = mobile ? 0.85 : 0;

    camera.position.x = lerp(camera.position.x, lerp(from[0], to[0], localProgress), delta * 3);
    camera.position.y = lerp(camera.position.y, lerp(from[1], to[1], localProgress), delta * 3);
    camera.position.z = lerp(camera.position.z, lerp(from[2], to[2], localProgress) + mobileOffset, delta * 3);
    camera.lookAt(0.35, 0, -1.8);

    if (rigRef.current) {
      rigRef.current.position.x = lerp(rigRef.current.position.x, 1.7 - progress * 2.6, delta * 2.2);
      rigRef.current.position.y = lerp(
        rigRef.current.position.y,
        Math.sin(progress * Math.PI * 2) * 0.4,
        delta * 2.2,
      );
      rigRef.current.rotation.y = lerp(rigRef.current.rotation.y, progress * Math.PI * 1.4, delta * 1.8);
    }
  });

  return (
    <group ref={rigRef} position={[1.7, 0, -1.8]}>
      <CoreIdentity />
      <FloatingName />
      <TechOrbit mobile={mobile} />
    </group>
  );
}

function SceneContent({ mobile, stars }) {
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
        count={stars}
        factor={4}
        saturation={0}
        fade
        speed={0.35}
      />
      <CameraRig mobile={mobile} />
      <ProjectConstellation mobile={mobile} />
    </>
  );
}

function WebGLFallback() {
  return (
    <div className="scene-fallback" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

function PortfolioScene() {
  const [webglReady, setWebglReady] = useState(null);
  const quality = useSceneQuality();

  useEffect(() => {
    setWebglReady(hasWebGL());
  }, []);

  if (webglReady === false) {
    return <WebGLFallback />;
  }

  if (webglReady === null) {
    return <WebGLFallback />;
  }

  return (
    <div className="scene-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.35, 6.2], fov: 42 }}
        dpr={quality.dpr}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <SceneContent mobile={quality.mobile} stars={quality.stars} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default PortfolioScene;
