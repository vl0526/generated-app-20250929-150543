import React from 'react';
import { ResourceBar } from './ResourceBar';
import { BuildingSelector } from './BuildingSelector';
import { BuildingInfoPanel } from './BuildingInfoPanel';
export function GameUI() {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <div className="relative w-full h-full">
        {/* UI components go here and will need pointer-events-auto */}
        <div className="pointer-events-auto">
          <ResourceBar />
          <BuildingSelector />
          <BuildingInfoPanel />
        </div>
      </div>
    </div>
  );
}