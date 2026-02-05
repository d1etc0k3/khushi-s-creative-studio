import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html } from "@react-three/drei";
import * as THREE from "three";

interface ModelViewerProps {
  modelPath: string;
}

function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground">Loading 3D Model...</span>
      </div>
    </Html>
  );
}

function PlaceholderModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const lastInteractionTime = useRef(Date.now());

  useFrame((state) => {
    if (!meshRef.current) return;

    // Auto-rotate when not interacting
    if (!isInteracting) {
      meshRef.current.rotation.y += 0.005;
    }

    // Subtle floating animation
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  useEffect(() => {
    const handlePointerDown = () => {
      setIsInteracting(true);
      lastInteractionTime.current = Date.now();
    };

    const handlePointerUp = () => {
      // Resume auto-rotate after 2 seconds of no interaction
      setTimeout(() => {
        if (Date.now() - lastInteractionTime.current >= 2000) {
          setIsInteracting(false);
        }
      }, 2000);
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  return (
    <mesh ref={meshRef} castShadow>
      {/* Placeholder geometric shape */}
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#8B5CF6"
        metalness={0.3}
        roughness={0.4}
        emissive="#8B5CF6"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

export function ModelViewer({ modelPath }: ModelViewerProps) {
  return (
    <div className="w-full h-full min-h-[400px] glass rounded-2xl overflow-hidden">
      <Canvas
        shadows
        camera={{ position: [3, 2, 5], fov: 45 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          {/* Lighting setup */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-5, 2, -5]} intensity={0.5} color="#A78BFA" />

          {/* Environment for reflections */}
          <Environment preset="studio" />

          {/* Model placeholder - in real app, load actual GLB */}
          <PlaceholderModel />

          {/* Ground shadow */}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />

          {/* Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={2}
            maxDistance={10}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>

      {/* Controls hint */}
      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground/60">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}
