import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from '@/components/game/Scene';
import { GameUI } from '@/components/ui/GameUI';
import { Loader } from '@react-three/drei';
import { Toaster } from '@/components/ui/sonner';
export function HomePage() {
  return (
    <div className="w-screen h-screen bg-[#1F2937]">
      <Canvas shadows>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <GameUI />
      <Loader
        containerStyles={{ backgroundColor: '#1F2937' }}
        innerStyles={{ backgroundColor: '#4B5563', width: '100px', height: '10px' }}
        barStyles={{ backgroundColor: '#FBBF24', height: '10px' }}
        dataStyles={{ color: '#F9FAFB' }}
      />
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}