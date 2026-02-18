import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface LightingConfig {
  ambientIntensity: number;
  ambientColor: string;
  directionalIntensity: number;
  directionalColor: string;
  directionalPosition: [number, number, number];
  pointLight1Intensity: number;
  pointLight1Color: string;
  pointLight1Position: [number, number, number];
  pointLight2Intensity: number;
  pointLight2Color: string;
  pointLight2Position: [number, number, number];
}

interface ModelViewerProps {
  modelPath: string;
  lighting?: LightingConfig;
  tabType?: "renders" | "mesh" | "wireframe";
  projectId?: string;
}

interface CameraConfig {
  position: [number, number, number];
  fov: number;
  minDistance: number;
  maxDistance: number;
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

function PlaceholderModel({ modelPath }: { modelPath: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const lastInteractionTime = useRef(Date.now());
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    if (groupRef.current && scene) {
      // Clear the group first
      while (groupRef.current.children.length > 0) {
        groupRef.current.remove(groupRef.current.children[0]);
      }

      // Reset group position and rotation to origin
      groupRef.current.position.set(0, 0, 0);
      groupRef.current.rotation.set(0, 0, 0);

      // Clone the scene and add it to the group
      const clonedScene = scene.clone();
      
      // Calculate bounding box to center the model
      const box = new THREE.Box3().expandByObject(clonedScene);
      const center = box.getCenter(new THREE.Vector3());
      
      // Center the model at the origin
      clonedScene.position.copy(center).multiplyScalar(-1);
      
      groupRef.current.add(clonedScene);
    }
  }, [scene, modelPath]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Rotate the model about its own axis
    groupRef.current.rotation.y += 0.005;
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

  return <group ref={groupRef} />;
}

export function ModelViewer({ modelPath, lighting, tabType = "renders", projectId }: ModelViewerProps) {
  // Default lighting config (neutral)
  const defaultLighting: LightingConfig = {
    ambientIntensity: 0.8,
    ambientColor: "#FFFFFF",
    directionalIntensity: 1.2,
    directionalColor: "#FFFFFF",
    directionalPosition: [5, 5, 5],
    pointLight1Intensity: 0.6,
    pointLight1Color: "#FFFFFF",
    pointLight1Position: [-5, 3, -5],
    pointLight2Intensity: 0.5,
    pointLight2Color: "#FFFFFF",
    pointLight2Position: [0, 2, 8],
  };

  // Camera configs per tab
  const baseCameraConfigs: Record<string, CameraConfig> = {
    renders: {
      position: [16, 8, 20],
      fov: 50,
      minDistance: 1,
      maxDistance: 50,
    },
    mesh: {
      position: [128, 100, 180],
      fov: 52,
      minDistance: 1,
      maxDistance: 500,
    },
    wireframe: {
      position: [128, 100, 180],
      fov: 52,
      minDistance: 1,
      maxDistance: 500,
    },
  };

  // Per-project overrides (only apply when projectId matches)
  const projectCameraOverrides: Record<string, Partial<Record<"renders" | "mesh" | "wireframe", CameraConfig>>> = {
    "project-3": {
      // Tighter, closer view for the car mesh
      mesh: {
      position: [16,8,20],
      fov: 15,
      minDistance: 1,
      maxDistance: 9,
    },
      wireframe: {
        position: [16,8,20],
        fov: 15,
        minDistance: 1,
        maxDistance: 9,
      },
      renders: {
        position: [16,8,20],
      fov: 15,
      minDistance: 1,
      maxDistance: 9,
      },
    },
  };

  const config = lighting || defaultLighting;
  const cameraConfig =
    projectCameraOverrides[projectId ?? ""]?.[tabType] ?? baseCameraConfigs[tabType];

  // Adjust lighting intensity for mesh tab
  const adjustedConfig: LightingConfig = {
    ...config,
    ambientIntensity: tabType === "mesh" ? config.ambientIntensity * 0.6 : config.ambientIntensity,
    directionalIntensity: tabType === "mesh" ? config.directionalIntensity * 0.6 : config.directionalIntensity,
    pointLight1Intensity: tabType === "mesh" ? config.pointLight1Intensity * 0.6 : config.pointLight1Intensity,
    pointLight2Intensity: tabType === "mesh" ? config.pointLight2Intensity * 0.6 : config.pointLight2Intensity,
  };

  // Use tabType as part of the key to reset canvas state when tab changes
  const canvasKey = `${modelPath}-${tabType}`;

  return (
    <div className="w-full h-full min-h-[400px] glass rounded-2xl overflow-hidden">
      <Canvas
        key={canvasKey}
        shadows
        camera={{ position: cameraConfig.position, fov: cameraConfig.fov }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={adjustedConfig.ambientIntensity} color={adjustedConfig.ambientColor} />
        <directionalLight
          position={adjustedConfig.directionalPosition}
          intensity={adjustedConfig.directionalIntensity}
          color={adjustedConfig.directionalColor}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={adjustedConfig.pointLight1Position} intensity={adjustedConfig.pointLight1Intensity} color={adjustedConfig.pointLight1Color} />
        <pointLight position={adjustedConfig.pointLight2Position} intensity={adjustedConfig.pointLight2Intensity} color={adjustedConfig.pointLight2Color} />

        {/* Load environment independently so it does not block first model paint. */}
        <Suspense fallback={null}>
          <Environment preset="sunset" />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <PlaceholderModel modelPath={modelPath} />
        </Suspense>

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
          minDistance={cameraConfig.minDistance}
          maxDistance={cameraConfig.maxDistance}
          autoRotate={false}
        />
      </Canvas>

      {/* Controls hint */}
      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground/60">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}
