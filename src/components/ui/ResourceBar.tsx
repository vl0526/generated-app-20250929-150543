import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { shallow } from 'zustand/shallow';
import { AnimatedNumber } from './AnimatedNumber';
export function ResourceBar() {
  const { money, population } = useStore(
    (state) => state.resources,
    shallow
  );
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.2 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-10"
    >
      <Card className="glass-dark rounded-xl p-4 flex items-center gap-6 shadow-lg border-gray-700">
        <div className="flex items-center gap-2 text-amber-400">
          <Coins className="w-6 h-6" />
          <span className="text-lg font-bold text-white tabular-nums">
            <AnimatedNumber value={money} />
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <Users className="w-6 h-6" />
          <span className="text-lg font-bold text-white tabular-nums">
            <AnimatedNumber value={population} />
          </span>
        </div>
      </Card>
    </motion.div>
  );
}