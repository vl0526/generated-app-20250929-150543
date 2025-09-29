import * as THREE from 'three';
export const GRID_SIZE = 20;
export const GRID_CELL_SIZE = 2;
export const DEMOLISH_REFUND_PERCENTAGE = 0.5;
export const BUILDING_TYPES = {
  residential: {
    name: 'Residential',
    cost: 100,
    size: [2, 2, 2] as [number, number, number],
    color: '#4B5563',
    income: 5,
    populationBonus: 10,
    shape: 'box' as const,
  },
  commercial: {
    name: 'Commercial',
    cost: 250,
    size: [2, 3, 2] as [number, number, number],
    color: '#FBBF24',
    income: 20,
    populationBonus: 0,
    shape: 'box' as const,
  },
  utility: {
    name: 'Utility',
    cost: 500,
    size: [1.25, 1.5, 1.25] as [number, number, number], // width, height, depth for cylinder radius
    color: '#9CA3AF',
    income: 0,
    populationBonus: 0,
    shape: 'cylinder' as const,
  },
};
export type BuildingType = keyof typeof BUILDING_TYPES;
export interface Building {
  id: string;
  position: [number, number, number];
  type: BuildingType;
}
export const CAMERA_SETTINGS = {
  position: [GRID_SIZE, GRID_SIZE, GRID_SIZE] as [number, number, number],
  fov: 50,
};