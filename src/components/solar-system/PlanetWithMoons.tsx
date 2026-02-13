'use client';

import { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CelestialBody } from '@/data/celestial-bodies';

interface PlanetWithMoonsProps {
  planet: CelestialBody;
  timeScale: number;
  isPaused: boolean;
  showOrbits: boolean;
  isSelected: boolean;
  selectedMoonId?: string;
  onSelectPlanet: () => void;
  onSelectMoon: (moon: CelestialBody['moons'][0]) => void;
}

// 生成程序化行星纹理
function generatePlanetTexture(color: string, type: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // 基础颜色
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 256, 256);

  // 根据行星类型添加不同效果
  if (type === 'planet') {
    // 添加大气效果
    const gradient = ctx.createLinearGradient(0, 0, 256, 256);
    gradient.addColorStop(0, 'rgba(255,255,255,0.1)');
    gradient.addColorStop(0.5, 'rgba(0,0,0,0.1)');
    gradient.addColorStop(1, 'rgba(255,255,255,0.1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);

    // 添加表面纹理
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const size = Math.random() * 8 + 2;
      const alpha = Math.random() * 0.2;
      ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (type === 'dwarf-planet') {
    // 矮行星更暗淡
    ctx.fillStyle = 'rgba(50,50,50,0.3)';
    ctx.fillRect(0, 0, 256, 256);
  }

  return new THREE.CanvasTexture(canvas);
}

// 生成行星环纹理
function generateRingTexture(color: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  // 创建环的条纹效果
  for (let x = 0; x < 512; x++) {
    const alpha = Math.sin(x / 512 * Math.PI * 20) * 0.3 + 0.5;
    const brightness = Math.random() * 50 + 150;
    ctx.fillStyle = `rgba(${brightness}, ${brightness - 20}, ${brightness - 40}, ${alpha})`;
    ctx.fillRect(x, 0, 1, 64);
  }

  return new THREE.CanvasTexture(canvas);
}

// 生成月球纹理
function generateMoonTexture(color: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 128, 128);

  // 添加陨石坑
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * 128;
    const y = Math.random() * 128;
    const size = Math.random() * 8 + 2;
    ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.3})`;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  return new THREE.CanvasTexture(canvas);
}

// 单个卫星组件
function MoonMesh({
  moon,
  parentSize,
  parentPosition,
  timeScale,
  isPaused,
  isSelected,
  onClick
}: {
  moon: CelestialBody['moons'][0];
  parentSize: number;
  parentPosition: THREE.Vector3;
  timeScale: number;
  isPaused: boolean;
  isSelected: boolean;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitAngleRef = useRef(Math.random() * Math.PI * 2);

  // 卫星相对大小
  const moonSize = useMemo(() => {
    const baseSize = parentSize * 0.15;
    const diameterRatio = moon.diameter / 3000;
    return Math.max(0.08, Math.min(baseSize, diameterRatio * parentSize));
  }, [moon.diameter, parentSize]);

  const texture = useMemo(() => generateMoonTexture(moon.color), [moon.color]);

  // 轨道动画
  useFrame((_, delta) => {
    if (isPaused || !meshRef.current) return;

    const orbitalSpeed = (1 / Math.abs(moon.orbitalPeriod)) * 5 * timeScale;
    const direction = moon.orbitalPeriod < 0 ? -1 : 1;
    orbitAngleRef.current += delta * orbitalSpeed * direction;

    const orbitRadius = moon.orbitalRadius * parentSize * 0.5;
    meshRef.current.position.x = parentPosition.x + Math.cos(orbitAngleRef.current) * orbitRadius;
    meshRef.current.position.z = parentPosition.z + Math.sin(orbitAngleRef.current) * orbitRadius;

    meshRef.current.rotation.y += delta * 0.5 * timeScale;
  });

  // 初始位置
  const initialPosition = useMemo(() => {
    const angle = orbitAngleRef.current;
    const orbitRadius = moon.orbitalRadius * parentSize * 0.5;
    return new THREE.Vector3(
      parentPosition.x + Math.cos(angle) * orbitRadius,
      0,
      parentPosition.z + Math.sin(angle) * orbitRadius
    );
  }, [moon.orbitalRadius, parentSize, parentPosition]);

  return (
    <group>
      {/* 卫星轨道线 */}
      <mesh
        position={[parentPosition.x, 0, parentPosition.z]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry
          args={[
            moon.orbitalRadius * parentSize * 0.5 - 0.02,
            moon.orbitalRadius * parentSize * 0.5 + 0.02,
            64
          ]}
        />
        <meshBasicMaterial color="#445566" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* 卫星主体 */}
      <mesh ref={meshRef} position={initialPosition} onClick={onClick}>
        <sphereGeometry args={[moonSize, 16, 16]} />
        <meshStandardMaterial map={texture} roughness={0.9} metalness={0} />
      </mesh>

      {/* 选中指示器 */}
      {isSelected && (
        <mesh position={initialPosition} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[moonSize * 1.5, moonSize * 1.6, 32]} />
          <meshBasicMaterial color="#00ff00" transparent opacity={0.8} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}

export function PlanetWithMoons({
  planet,
  timeScale,
  isPaused,
  showOrbits,
  isSelected,
  selectedMoonId,
  onSelectPlanet,
  onSelectMoon
}: PlanetWithMoonsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const orbitAngleRef = useRef(Math.random() * Math.PI * 2);
  const rotationRef = useRef(0);

  // 生成纹理
  const texture = useMemo(() => generatePlanetTexture(planet.color, planet.type), [planet.color, planet.type]);
  const ringTexture = useMemo(() => {
    if (planet.hasRings) {
      return generateRingTexture(planet.ringColor || '#888888');
    }
    return null;
  }, [planet.hasRings, planet.ringColor]);

  // 轨道动画
  useFrame((_, delta) => {
    if (isPaused) return;

    // 公转
    const orbitalSpeed = (1 / planet.orbitalPeriod) * 0.5 * timeScale;
    orbitAngleRef.current += delta * orbitalSpeed;

    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(orbitAngleRef.current) * planet.orbitalRadius;
      groupRef.current.position.z = Math.sin(orbitAngleRef.current) * planet.orbitalRadius;
    }

    // 自转
    const rotationSpeed = (1 / Math.abs(planet.rotationPeriod)) * 10 * timeScale;
    const direction = planet.rotationPeriod < 0 ? -1 : 1;
    rotationRef.current += delta * rotationSpeed * direction;

    if (planetRef.current) {
      planetRef.current.rotation.y = rotationRef.current;
    }
  });

  // 初始位置
  const initialPosition = useMemo(() => {
    const angle = orbitAngleRef.current;
    return new THREE.Vector3(
      Math.cos(angle) * planet.orbitalRadius,
      0,
      Math.sin(angle) * planet.orbitalRadius
    );
  }, [planet.orbitalRadius]);

  return (
    <group>
      {/* 轨道线 */}
      {showOrbits && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[planet.orbitalRadius - 0.1, planet.orbitalRadius + 0.1, 128]} />
          <meshBasicMaterial color="#334455" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* 行星组 */}
      <group ref={groupRef} position={initialPosition}>
        {/* 行星主体 */}
        <mesh ref={planetRef} onClick={onSelectPlanet}>
          <sphereGeometry args={[planet.size, 32, 32]} />
          <meshStandardMaterial map={texture} roughness={0.8} metalness={0.1} />
        </mesh>

        {/* 行星环 */}
        {planet.hasRings && planet.ringInnerRadius && planet.ringOuterRadius && (
          <mesh rotation={[Math.PI / 2 + (planet.axialTilt * Math.PI / 180), 0, 0]}>
            <ringGeometry
              args={[
                planet.size * planet.ringInnerRadius,
                planet.size * planet.ringOuterRadius,
                64
              ]}
            />
            <meshBasicMaterial
              map={ringTexture!}
              transparent
              opacity={0.8}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}

        {/* 选中指示器 */}
        {isSelected && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[planet.size * 1.3, planet.size * 1.4, 64]} />
            <meshBasicMaterial color="#00ff00" transparent opacity={0.8} side={THREE.DoubleSide} />
          </mesh>
        )}

        {/* 卫星 */}
        {planet.moons.map((moon) => (
          <MoonMesh
            key={moon.id}
            moon={moon}
            parentSize={planet.size}
            parentPosition={new THREE.Vector3(0, 0, 0)}
            timeScale={timeScale}
            isPaused={isPaused}
            isSelected={selectedMoonId === moon.id}
            onClick={() => onSelectMoon(moon)}
          />
        ))}
      </group>
    </group>
  );
}
