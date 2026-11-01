import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function CameraRig({ isSimulating }) {
  const { camera } = useThree();
  useFrame((state, delta) => {
    if (isSimulating) {
      camera.position.z -= delta * 2;
      if (camera.position.z < -10) camera.position.z = 8;
    } else {
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8, 0.05);
    }
  });
  return null;
}

// 🟢 রিয়েলিস্টিক রক্তকণিকা (চ্যাপ্টা গোলাকার)
function BloodCell({ position, speed }) {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.z += speed * delta * (state.isSimulating ? 2 : 1);
      if (meshRef.current.position.z > 10) {
        meshRef.current.position.z = -30;
        meshRef.current.position.x = (Math.random() - 0.5) * 6;
        meshRef.current.position.y = (Math.random() - 0.5) * 6;
      }
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={[1, 0.3, 1]}> {/* scale দিয়ে চ্যাপ্টা করা হলো */}
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshPhysicalMaterial color="#cc0000" roughness={0.4} metalness={0.1} clearcoat={1} clearcoatRoughness={0.1} />
    </mesh>
  );
}

// 🟢 রক্তনালী (টানেল)
function BloodVessel() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -10]}>
      <cylinderGeometry args={[4, 4, 50, 32, 1, true]} />
      <meshStandardMaterial color="#1a0000" side={THREE.BackSide} roughness={0.9} metalness={0.1} emissive="#330000" emissiveIntensity={0.5} />
    </mesh>
  );
}

export default function Scene3D({ isSimulating }) {
  const cells = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 40; i++) {
      temp.push({
        id: i,
        position: [ (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 40 - 10 ],
        speed: 1 + Math.random() * 2
      });
    }
    return temp;
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <CameraRig isSimulating={isSimulating} />
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#ff3333" distance={20} />
        <pointLight position={[0, 0, -15]} intensity={1.5} color="#00ffcc" distance={25} />
        
        <BloodVessel />
        
        {cells.map((cell) => (
          <BloodCell key={cell.id} position={cell.position} speed={cell.speed} />
        ))}
        
        {!isSimulating && <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />}
      </Canvas>
    </div>
  );
}
