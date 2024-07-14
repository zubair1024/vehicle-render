import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Text } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
  path: string;
}

const Model: React.FC<ModelProps> = ({ path }) => {
  const { scene } = useGLTF(path);
  const wheelRef = useRef<THREE.Mesh>(null!);

  // Adjust this to the correct name or index of the wheel in your model
  const wheel = scene.getObjectByName("FrontLeftWheel");
  if (wheel) {
    wheelRef.current = wheel as THREE.Mesh;
    wheelRef.current.material = new THREE.MeshStandardMaterial({
      color: "red",
    });
  }

  return <primitive object={scene} />;
};

const Marker: React.FC<{ position: THREE.Vector3 }> = ({ position }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.1, 10, 10]} />
      <sphereGeometry args={[0.1, 10, 10]} />
      <meshStandardMaterial
        color="red"
        transparent
        opacity={0.8}
      ></meshStandardMaterial>
      <Text
        position={[0, 0.2, 0]}
        fontSize={0.1}
        color="white"
        anchorX="left"
        anchorY="top-baseline"
      >
        Low Pressure
      </Text>
    </mesh>
  );
};

const App: React.FC = () => {
  const wheelPosition = new THREE.Vector3(1.5, 0, 1.8); // Adjust based on your model's wheel position

  return (
    <div className="w-screen h-screen bg-gradient-to-bl from-indigo-300 via-violet-700 to-sky-500">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [8, 2, 15], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <spotLight
          position={[10, 20, 10]}
          angle={0.5}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <Suspense fallback={null}>
          <Model path="/models/car.glb" />
          <Model path="/models/car.glb" />
          <Marker position={wheelPosition} />
          <Marker position={wheelPosition} />
          {/* Uncomment below lines to add truck and bus */}
          {/* <Model path="/models/truck.glb" />
          <Model path="/models/bus.glb" /> */}
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default App;
