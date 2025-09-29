import { useFrame } from '@react-three/fiber';
import { useStore } from '@/lib/store';
let lastTick = 0;
const TICK_INTERVAL = 1000; // 1 second
export function GameLoop() {
  const gameTick = useStore((state) => state.gameTick);
  useFrame((state) => {
    const now = state.clock.getElapsedTime() * 1000;
    if (now - lastTick > TICK_INTERVAL) {
      gameTick();
      lastTick = now;
    }
  });
  return null;
}