'use client';

import { useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

import { Sun } from './Sun';
import { PlanetWithMoons } from './PlanetWithMoons';
import { AsteroidBelt } from './AsteroidBelt';
import { StarField } from './StarField';
import {
  sun,
  allPlanets,
  dwarfPlanets,
  CelestialBody,
  Moon as MoonType
} from '@/data/celestial-bodies';

interface SolarSystemProps {
  timeScale: number;
  isPaused: boolean;
  showOrbits: boolean;
  showLabels: boolean;
  selectedBody: CelestialBody | null;
  selectedMoon: { moon: MoonType; parent: CelestialBody } | null;
  onSelectBody: (body: CelestialBody | null) => void;
  onSelectMoon: (moon: { moon: MoonType; parent: CelestialBody } | null) => void;
  language: 'zh' | 'en';
}

// 场景内部组件
function Scene({
  timeScale,
  isPaused,
  showOrbits,
  selectedBody,
  selectedMoon,
  onSelectBody,
  onSelectMoon
}: Omit<SolarSystemProps, 'showLabels' | 'language'>) {
  // 处理天体选择
  const handleSelectBody = useCallback((body: CelestialBody | null) => {
    onSelectBody(body);
    onSelectMoon(null);
  }, [onSelectBody, onSelectMoon]);

  // 处理卫星选择
  const handleSelectMoon = useCallback((moon: MoonType, parent: CelestialBody) => {
    onSelectBody(null);
    onSelectMoon({ moon, parent });
  }, [onSelectBody, onSelectMoon]);

  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={0.1} />

      {/* 星空背景 */}
      <StarField count={8000} radius={400} />

      {/* 太阳 */}
      <Sun
        onClick={() => handleSelectBody(sun)}
        isSelected={selectedBody?.id === 'sun'}
      />

      {/* 8大行星及其卫星 */}
      {allPlanets.map((planet) => (
        <PlanetWithMoons
          key={planet.id}
          planet={planet}
          timeScale={timeScale}
          isPaused={isPaused}
          showOrbits={showOrbits}
          isSelected={selectedBody?.id === planet.id}
          selectedMoonId={selectedMoon?.moon.id}
          onSelectPlanet={() => handleSelectBody(planet)}
          onSelectMoon={(moon) => handleSelectMoon(moon, planet)}
        />
      ))}

      {/* 矮行星及其卫星 */}
      {dwarfPlanets.map((dwarf) => (
        <PlanetWithMoons
          key={dwarf.id}
          planet={dwarf}
          timeScale={timeScale}
          isPaused={isPaused}
          showOrbits={showOrbits}
          isSelected={selectedBody?.id === dwarf.id}
          selectedMoonId={selectedMoon?.moon.id}
          onSelectPlanet={() => handleSelectBody(dwarf)}
          onSelectMoon={(moon) => handleSelectMoon(moon, dwarf)}
        />
      ))}

      {/* 小行星带 */}
      <AsteroidBelt timeScale={timeScale} isPaused={isPaused} />

      {/* 相机控制 */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={200}
        maxPolarAngle={Math.PI}
      />

      {/* 主相机 */}
      <PerspectiveCamera makeDefault position={[50, 30, 80]} fov={60} />
    </>
  );
}

export function SolarSystem(props: SolarSystemProps) {
  return (
    <div className="w-full h-full bg-black">
      <Canvas
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [50, 30, 80], fov: 60 }}
      >
        <Scene {...props} />
      </Canvas>
    </div>
  );
}
