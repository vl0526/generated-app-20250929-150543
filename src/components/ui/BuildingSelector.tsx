import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useStore } from '@/lib/store';
import { shallow } from 'zustand/shallow';
import { BUILDING_TYPES, BuildingType } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Coins } from 'lucide-react';
import { toast } from 'sonner';
export function BuildingSelector() {
  const { selectedBuildingType, setSelectedBuildingType, money } = useStore(
    (state) => ({
      selectedBuildingType: state.selectedBuildingType,
      setSelectedBuildingType: state.setSelectedBuildingType,
      money: state.resources.money,
    }),
    shallow
  );
  const handleSelect = (type: BuildingType) => {
    const canAfford = money >= BUILDING_TYPES[type].cost;
    if (!canAfford) {
      toast.error("Not enough money!", {
        description: `You need ${BUILDING_TYPES[type].cost} to build a ${BUILDING_TYPES[type].name}.`,
      });
      return;
    }
    if (selectedBuildingType === type) {
      setSelectedBuildingType(null); // Deselect if clicked again
    } else {
      setSelectedBuildingType(type);
    }
  };
  return (
    <motion.div
      initial={{ y: 150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.4 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-10 w-[90vw] max-w-2xl"
    >
      <Card className="glass-dark rounded-xl p-4 shadow-lg border-gray-700">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4">
            {Object.entries(BUILDING_TYPES).map(([type, details]) => {
              const isSelected = selectedBuildingType === type;
              const canAfford = money >= details.cost;
              return (
                <motion.div
                  key={type}
                  whileHover={{ scale: canAfford ? 1.05 : 1 }}
                  whileTap={{ scale: canAfford ? 0.95 : 1 }}
                  onClick={() => handleSelect(type as BuildingType)}
                  className={cn(
                    'flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out w-32 h-32 border-2',
                    isSelected
                      ? 'bg-amber-400/20 border-amber-400 shadow-glow'
                      : 'bg-gray-700/50 border-gray-600 hover:border-gray-500',
                    !canAfford && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  <div className="text-4xl mb-2" style={{ color: details.color }}>
                    {details.shape === 'box' ? '■' : '●'}
                  </div>
                  <p className="text-white font-semibold text-sm">{details.name}</p>
                  <div className="flex items-center text-amber-400 text-xs mt-1">
                    <Coins className="w-3 h-3 mr-1" />
                    <span>{details.cost}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
    </motion.div>
  );
}