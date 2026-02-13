'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { asteroidBelt } from '@/data/celestial-bodies';

interface AsteroidBeltProps {
  timeScale: number;
  isPaused: boolean;
}

// 生成小行星
function generateAsteroids(count: number, innerRadius: number, outerRadius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    // 在环带内随机分布
    const angle = Math.random() * Math.PI * 2;
    const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
    const height = (Math.random() - 0.5) * 2; // 略微偏离平面

    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = height;
    positions[i * 3 + 2] = Math.sin(angle) * radius;

    // 颜色变化（灰色调）
    const gray = 0.3 + Math.random() * 0.4;
    colors[i * 3] = gray;
    colors[i * 3 + 1] = gray * 0.9;
    colors[i * 3 + 2] = gray * 0.8;

    // 大小变化
    sizes[i] = 0.05 + Math.random() * 0.15;
  }

  return { positions, colors, sizes };
}

export function AsteroidBelt({ timeScale, isPaused }: AsteroidBeltProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const rotationRef = useRef(0);

  // 生成小行星数据
  const { positions, colors, sizes } = useMemo(() => {
    const result = generateAsteroids(
      asteroidBelt.asteroidCount,
      asteroidBelt.innerRadius,
      asteroidBelt.outerRadius
    );
    return {
      positions: result.positions,
      colors: result.colors,
      sizes: result.sizes
    };
  }, []);

  // 缓慢旋转
  useFrame((_, delta) => {
    if (isPaused) return;
    rotationRef.current += delta * 0.02 * timeScale;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = rotationRef.current;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={asteroidBelt.asteroidCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={asteroidBelt.asteroidCount}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={asteroidBelt.asteroidCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}
