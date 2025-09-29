import React from 'react';
import { MapControls, PerspectiveCamera } from '@react-three/drei';
import { useStore } from '@/lib/store';
import { Grid } from './Grid';
import { Building } from './Building';
import { GameLoop } from './GameLoop';
import { CAMERA_SETTINGS, GRID_SIZE, GRID_CELL_SIZE } from '@/lib/constants';
export function Scene() {
  const buildings = useStore((state) => state.buildings);
  const totalGridSize = GRID_SIZE * GRID_CELL_SIZE;
  return (
    <>
      <PerspectiveCamera makeDefault fov={CAMERA_SETTINGS.fov} position={CAMERA_SETTINGS.position} />
      <MapControls
        enableDamping
        dampingFactor={0.05}
        minDistance={10}
        maxDistance={80}
        maxPolarAngle={Math.PI / 2.2}
      />
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[20, 30, 20]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      <Grid />
      {buildings.map((building) => (
        <Building key={building.id} {...building} />
      ))}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        receiveShadow
      >
        <planeGeometry args={[totalGridSize, totalGridSize]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
      <GameLoop />
    </>
  );
}