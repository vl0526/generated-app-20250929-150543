import React, { useState, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useStore } from '@/lib/store';
import { GRID_SIZE, GRID_CELL_SIZE, BUILDING_TYPES } from '@/lib/constants';
export function Grid() {
  const selectedBuildingType = useStore((state) => state.selectedBuildingType);
  const addBuilding = useStore((state) => state.addBuilding);
  const [hoveredCell, setHoveredCell] = useState<[number, number, number] | null>(null);
  const ghostRef = useRef<THREE.Mesh>(null);
  const totalGridSize = GRID_SIZE * GRID_CELL_SIZE;
  const handlePointerMove = (event: any) => {
    if (!selectedBuildingType) {
      setHoveredCell(null);
      return;
    }
    const intersection = event.intersections.find((i: any) => i.object.name === 'groundPlane');
    if (intersection) {
      const { point } = intersection;
      const buildingInfo = BUILDING_TYPES[selectedBuildingType];
      const x = Math.floor(point.x / GRID_CELL_SIZE) * GRID_CELL_SIZE + GRID_CELL_SIZE / 2;
      const z = Math.floor(point.z / GRID_CELL_SIZE) * GRID_CELL_SIZE + GRID_CELL_SIZE / 2;
      const y = buildingInfo.size[1] / 2;
      setHoveredCell([x, y, z]);
    } else {
      setHoveredCell(null);
    }
  };
  const handlePointerOut = () => {
    setHoveredCell(null);
  };
  const handleClick = () => {
    if (hoveredCell && selectedBuildingType) {
      addBuilding(hoveredCell, selectedBuildingType);
    }
  };
  useFrame(() => {
    if (ghostRef.current) {
      ghostRef.current.visible = !!hoveredCell;
      if (hoveredCell) {
        ghostRef.current.position.set(...hoveredCell);
      }
    }
  });
  const GhostBuilding = () => {
    if (!selectedBuildingType) return null;
    const buildingInfo = BUILDING_TYPES[selectedBuildingType];
    return (
      <mesh ref={ghostRef}>
        {buildingInfo.shape === 'box' && <boxGeometry args={buildingInfo.size} />}
        {buildingInfo.shape === 'cylinder' && <cylinderGeometry args={[buildingInfo.size[0], buildingInfo.size[0], buildingInfo.size[1], 16]} />}
        <meshStandardMaterial color={buildingInfo.color} transparent opacity={0.5} />
      </mesh>
    );
  };
  return (
    <>
      <gridHelper args={[totalGridSize, GRID_SIZE, '#4B5563', '#4B5563']} position={[0, 0.01, 0]} />
      <mesh
        name="groundPlane"
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
        receiveShadow
      >
        <planeGeometry args={[totalGridSize, totalGridSize]} />
        <meshStandardMaterial color="#1F2937" transparent opacity={0} />
      </mesh>
      <GhostBuilding />
    </>
  );
}