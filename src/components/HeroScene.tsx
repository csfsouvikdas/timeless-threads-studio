import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/useMousePosition";

const FloatingBlob = ({ position, color, speed, distort, size }: {
  position: [number, number, number];
  color: string;
  speed: number;
  distort: number;
  size: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { normalized } = useMousePosition();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002 * speed;
      meshRef.current.rotation.y += 0.003 * speed;
      // React to cursor
      meshRef.current.position.x = position[0] + normalized.x * 0.3;
      meshRef.current.position.y = position[1] + normalized.y * 0.2;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={size}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.35}
          distort={distort}
          speed={2}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null!);
  const { normalized } = useMousePosition();

  const particles = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return positions;
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = normalized.x * 0.1;
      particlesRef.current.rotation.x = normalized.y * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#F7C5CC"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const HeroScene = () => {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <FloatingBlob position={[2, 1, 0]} color="#F7C5CC" speed={1.5} distort={0.4} size={0.8} />
        <FloatingBlob position={[-2.5, -0.5, -1]} color="#E8DEFF" speed={1} distort={0.3} size={1} />
        <FloatingBlob position={[0.5, -1.5, -0.5]} color="#F5ECD7" speed={1.2} distort={0.5} size={0.6} />
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default HeroScene;
