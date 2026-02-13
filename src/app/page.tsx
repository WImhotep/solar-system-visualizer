'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { ControlPanel } from '@/components/solar-system/ControlPanel';
import { InfoCard } from '@/components/solar-system/InfoCard';
import { Tutorial } from '@/components/solar-system/Tutorial';
import { PlanetSelector } from '@/components/solar-system/PlanetSelector';
import { CelestialBody, Moon as MoonType } from '@/data/celestial-bodies';

// 动态导入 SolarSystem 组件，避免 SSR 问题
const SolarSystem = dynamic(
  () => import('@/components/solar-system/SolarSystem').then((mod) => mod.SolarSystem),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-black">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-white text-lg">Loading Solar System...</p>
        </div>
      </div>
    )
  }
);

// 检查是否已经看过教程（在组件外部执行）
function getTutorialSeen(): boolean {
  if (typeof window === 'undefined') return true; // SSR 时默认已看过
  return localStorage.getItem('solar-system-tutorial-seen') === 'true';
}

export default function Home() {
  // 状态管理
  const [timeScale, setTimeScale] = useState(10);
  const [isPaused, setIsPaused] = useState(false);
  const [showOrbits, setShowOrbits] = useState(true);
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const [selectedBody, setSelectedBody] = useState<CelestialBody | null>(null);
  const [selectedMoon, setSelectedMoon] = useState<{ moon: MoonType; parent: CelestialBody } | null>(null);
  
  // 使用 useMemo 初始化 showTutorial，避免在 useEffect 中设置
  const [showTutorial, setShowTutorial] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !getTutorialSeen();
  });
  
  const [isMounted, setIsMounted] = useState(false);

  // 客户端挂载 - 使用 setTimeout 延迟设置状态
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // 处理教程完成
  const handleTutorialComplete = useCallback(() => {
    setShowTutorial(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('solar-system-tutorial-seen', 'true');
    }
  }, []);

  // 处理选择天体
  const handleSelectBody = useCallback((body: CelestialBody | null) => {
    setSelectedBody(body);
    setSelectedMoon(null);
  }, []);

  // 处理选择卫星
  const handleSelectMoon = useCallback((moon: { moon: MoonType; parent: CelestialBody } | null) => {
    setSelectedMoon(moon);
    setSelectedBody(null);
  }, []);

  // 处理重置视角
  const handleResetView = useCallback(() => {
    setSelectedBody(null);
    setSelectedMoon(null);
  }, []);

  // 显示帮助
  const handleHelpClick = useCallback(() => {
    setShowTutorial(true);
  }, []);

  // 关闭信息卡片
  const handleCloseInfo = useCallback(() => {
    setSelectedBody(null);
    setSelectedMoon(null);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-white text-lg">
            {language === 'zh' ? '正在加载太阳系...' : 'Loading Solar System...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="w-screen h-screen relative overflow-hidden">
      {/* 3D 太阳系场景 */}
      <SolarSystem
        timeScale={timeScale}
        isPaused={isPaused}
        showOrbits={showOrbits}
        showLabels={true}
        selectedBody={selectedBody}
        selectedMoon={selectedMoon}
        onSelectBody={handleSelectBody}
        onSelectMoon={handleSelectMoon}
        language={language}
      />

      {/* 控制面板 */}
      <ControlPanel
        timeScale={timeScale}
        isPaused={isPaused}
        showOrbits={showOrbits}
        language={language}
        onTimeScaleChange={setTimeScale}
        onPauseToggle={() => setIsPaused(!isPaused)}
        onOrbitsToggle={() => setShowOrbits(!showOrbits)}
        onLanguageToggle={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
        onHelpClick={handleHelpClick}
        onResetView={handleResetView}
      />

      {/* 行星选择器 */}
      <PlanetSelector
        language={language}
        selectedBody={selectedBody}
        selectedMoon={selectedMoon}
        onSelectBody={handleSelectBody}
        onSelectMoon={(moon, parent) => handleSelectMoon({ moon, parent })}
      />

      {/* 信息卡片 */}
      <InfoCard
        body={selectedBody}
        moon={selectedMoon}
        language={language}
        onClose={handleCloseInfo}
      />

      {/* 教程引导 */}
      {showTutorial && (
        <Tutorial
          language={language}
          onComplete={handleTutorialComplete}
        />
      )}

      {/* 底部版权信息 */}
      <footer className="absolute bottom-0 left-0 right-0 p-3 text-center text-xs text-white/50 bg-black/30">
        <div className="text-center">Copyleft by 王霞峰 2026.2.13</div>
        <div className="text-center">🌌 太阳系沙盒 - 3D模拟器 | 数据来源：NASA</div>
      </footer>
    </main>
  );
}
