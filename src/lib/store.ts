import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Building, BuildingType, BUILDING_TYPES, DEMOLISH_REFUND_PERCENTAGE } from '@/lib/constants';
import { v4 as uuidv4 } from 'uuid';
interface GameState {
  buildings: Building[];
  resources: {
    money: number;
    population: number;
  };
  selectedBuildingType: BuildingType | null;
  selectedBuildingId: string | null;
  addBuilding: (position: [number, number, number], type: BuildingType) => boolean;
  setSelectedBuildingType: (type: BuildingType | null) => void;
  setSelectedBuildingId: (id: string | null) => void;
  demolishBuilding: () => void;
  gameTick: () => void;
}
import { StateCreator } from 'zustand';

export const useStore = create<GameState>()(
  persist(
    (set, get): GameState => ({
      buildings: [],
      resources: {
        money: 2000,
        population: 0,
      },
      selectedBuildingType: null,
      selectedBuildingId: null,
      addBuilding: (position, type) => {
        const { resources } = get();
        const buildingInfo = BUILDING_TYPES[type];
        if (resources.money >= buildingInfo.cost) {
          const newBuilding: Building = {
            id: uuidv4(),
            position,
            type,
          };
          set((state) => ({
            buildings: [...state.buildings, newBuilding],
            resources: {
              ...state.resources,
              money: state.resources.money - buildingInfo.cost,
              population: state.resources.population + buildingInfo.populationBonus,
            },
            selectedBuildingType: null, // Deselect after placing
          }));
          return true;
        }
        return false;
      },
      setSelectedBuildingType: (type) => {
        set({ selectedBuildingType: type, selectedBuildingId: null });
      },
      setSelectedBuildingId: (id) => {
        set({ selectedBuildingId: id, selectedBuildingType: null });
      },
      demolishBuilding: () => {
        const { selectedBuildingId, buildings } = get();
        if (!selectedBuildingId) return;
        const buildingToDemolish = buildings.find(b => b.id === selectedBuildingId);
        if (!buildingToDemolish) return;
        const buildingInfo = BUILDING_TYPES[buildingToDemolish.type];
        const refundAmount = Math.floor(buildingInfo.cost * DEMOLISH_REFUND_PERCENTAGE);
        set(state => ({
          buildings: state.buildings.filter(b => b.id !== selectedBuildingId),
          resources: {
            ...state.resources,
            money: state.resources.money + refundAmount,
            population: state.resources.population - buildingInfo.populationBonus,
          },
          selectedBuildingId: null,
        }));
      },
      gameTick: () => {
        const { buildings } = get();
        let totalIncome = 0;
        buildings.forEach((building) => {
          totalIncome += BUILDING_TYPES[building.type].income;
        });
        set((state) => ({
          resources: {
            ...state.resources,
            money: state.resources.money + totalIncome,
          },
        }));
      },
    }),
    {
      name: 'edgescape-game-state', // name of the item in the storage (must be unique)
    }
  )
);