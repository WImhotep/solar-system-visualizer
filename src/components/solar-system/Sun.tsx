'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { sun } from '@/data/celestial-bodies';

interface SunProps {
  onClick?: () => void;
  isSelected?: boolean;
}

export function Sun({ onClick, isSelected }: SunProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // 创建太阳纹理
  const sunTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // 基础颜色
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient.addColorStop(0, '#FFFFFF');
    gradient.addColorStop(0.2, '#FFF5E0');
    gradient.addColorStop(0.4, '#FFD700');
    gradient.addColorStop(0.6, '#FFA500');
    gradient.addColorStop(0.8, '#FF8C00');
    gradient.addColorStop(1, '#FF4500');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    // 添加噪点效果
    for (let i = 0; i < 5000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const size = Math.random() * 3;
      const alpha = Math.random() * 0.3;
      ctx.fillStyle = `rgba(255, 255, 200, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  // 自转动画
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
      glowRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* 太阳主体 */}
      <mesh ref={meshRef} onClick={onClick}>
        <sphereGeometry args={[sun.size, 64, 64]} />
        <meshStandardMaterial
          map={sunTexture}
          emissive={new THREE.Color(sun.emissive || sun.color)}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* 太阳光晕 */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[sun.size * 1.2, 32, 32]} />
        <meshBasicMaterial
          color={sun.color}
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      {/* 点光源 */}
      <pointLight
        color="#FFF5E0"
        intensity={500}
        distance={500}
        decay={2}
      />

      {/* 选中指示器 */}
      {isSelected && (
        <mesh>
          <ringGeometry args={[sun.size * 1.5, sun.size * 1.6, 64]} />
          <meshBasicMaterial color="#00ff00" transparent opacity={0.8} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}
