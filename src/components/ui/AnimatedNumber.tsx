import React, { useEffect, useRef } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
interface AnimatedNumberProps {
  value: number;
}
export function AnimatedNumber({ value }: AnimatedNumberProps) {
  const motionValue = useMotionValue(value);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest).toLocaleString());
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.5,
      ease: 'easeOut',
    });
    return controls.stop;
  }, [value, motionValue]);
  return <motion.span ref={ref}>{rounded}</motion.span>;
}