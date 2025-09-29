import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { BUILDING_TYPES, DEMOLISH_REFUND_PERCENTAGE } from '@/lib/constants';
import { X, Trash2, Coins, Users, Zap } from 'lucide-react';
import { shallow } from 'zustand/shallow';
import { toast } from 'sonner';
export function BuildingInfoPanel() {
  const { selectedBuildingId, buildings, setSelectedBuildingId, demolishBuilding } = useStore(
    (state) => ({
      selectedBuildingId: state.selectedBuildingId,
      buildings: state.buildings,
      setSelectedBuildingId: state.setSelectedBuildingId,
      demolishBuilding: state.demolishBuilding,
    }),
    shallow
  );
  const selectedBuilding = buildings.find((b) => b.id === selectedBuildingId);
  const handleDemolish = () => {
    if (selectedBuilding) {
      const buildingInfo = BUILDING_TYPES[selectedBuilding.type];
      const refundAmount = Math.floor(buildingInfo.cost * DEMOLISH_REFUND_PERCENTAGE);
      demolishBuilding();
      toast.success(`${buildingInfo.name} demolished.`, {
        description: `You received ${refundAmount} money back.`,
      });
    }
  };
  return (
    <AnimatePresence>
      {selectedBuilding && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="fixed top-1/2 right-4 -translate-y-1/2 z-10 w-[90vw] max-w-xs"
        >
          <Card className="glass-dark rounded-xl p-4 shadow-lg border-gray-700">
            <CardHeader className="flex-row items-center justify-between p-2">
              <CardTitle className="text-white text-lg">{BUILDING_TYPES[selectedBuilding.type].name}</CardTitle>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white h-8 w-8" onClick={() => setSelectedBuildingId(null)}>
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="p-2 text-gray-300 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2"><Coins className="w-4 h-4 text-amber-400" /> Income/sec:</span>
                <span className="font-bold text-white">{BUILDING_TYPES[selectedBuilding.type].income}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2"><Users className="w-4 h-4 text-blue-400" /> Population Bonus:</span>
                <span className="font-bold text-white">{BUILDING_TYPES[selectedBuilding.type].populationBonus}</span>
              </div>
               <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-gray-400" /> Type:</span>
                <span className="font-bold text-white capitalize">{selectedBuilding.type}</span>
              </div>
              <Button onClick={handleDemolish} variant="destructive" className="w-full mt-4 transition-all duration-200 hover:scale-105 active:scale-95">
                <Trash2 className="w-4 h-4 mr-2" />
                Demolish for {Math.floor(BUILDING_TYPES[selectedBuilding.type].cost * DEMOLISH_REFUND_PERCENTAGE)}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}