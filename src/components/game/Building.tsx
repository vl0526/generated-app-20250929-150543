import React from 'react';
import { motion } from 'framer-motion/three';
import { Outlines } from '@react-three/drei';
import { Building as BuildingProps, BUILDING_TYPES } from '@/lib/constants';
import { useStore } from '@/lib/store';
import { shallow } from 'zustand/shallow';
export function Building({ id, type, position }: BuildingProps) {
  const { selectedBuildingId, setSelectedBuildingId } = useStore(
    (state) => ({
      selectedBuildingId: state.selectedBuildingId,
      setSelectedBuildingId: state.setSelectedBuildingId,
    }),
    shallow
  );
  const buildingInfo = BUILDING_TYPES[type];
  const isSelected = selectedBuildingId === id;
  const handleClick = (e: any) => {
    e.stopPropagation();
    setSelectedBuildingId(id);
  };
  return (
    <motion.group
      position={position}
      initial={{ scale: 0, y: position[1] - buildingInfo.size[1] / 2 }}
      animate={{ scale: 1, y: position[1] }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
    >
      <mesh
        castShadow
        receiveShadow
        onClick={handleClick}
      >
        {buildingInfo.shape === 'box' && <boxGeometry args={buildingInfo.size} />}
        {buildingInfo.shape === 'cylinder' && <cylinderGeometry args={[buildingInfo.size[0], buildingInfo.size[0], buildingInfo.size[1], 16]} />}
        <meshStandardMaterial color={buildingInfo.color} />
        {isSelected && <Outlines thickness={0.05} color="#FBBF24" />}
      </mesh>
    </motion.group>
  );
}