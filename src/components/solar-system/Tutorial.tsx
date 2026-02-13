'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  MousePointer2,
  RotateCcw,
  ZoomIn,
  Play,
  Orbit,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

interface TutorialProps {
  language: 'zh' | 'en';
  onComplete: () => void;
}

const tutorialSteps = {
  zh: [
    {
      title: '欢迎使用太阳系沙盒！',
      content: '这是一个交互式的3D太阳系模拟器，让你探索我们的宇宙邻居。',
      icon: '🌍'
    },
    {
      title: '旋转视角',
      content: '按住鼠标左键拖动可以旋转视角，从不同角度观察太阳系。',
      icon: <RotateCcw className="w-8 h-8 text-primary" />
    },
    {
      title: '缩放视图',
      content: '使用鼠标滚轮可以放大或缩小，查看细节或全景。',
      icon: <ZoomIn className="w-8 h-8 text-primary" />
    },
    {
      title: '选择天体',
      content: '点击任意天体（行星、卫星、太阳）可以查看详细信息卡片。',
      icon: <MousePointer2 className="w-8 h-8 text-primary" />
    },
    {
      title: '时间控制',
      content: '使用左侧控制面板调整时间速度，观察行星运动。可以暂停、播放或加速。',
      icon: <Play className="w-8 h-8 text-primary" />
    },
    {
      title: '轨道显示',
      content: '可以开关轨道线的显示，更清晰地观察行星运动轨迹。',
      icon: <Orbit className="w-8 h-8 text-primary" />
    },
    {
      title: '开始探索吧！',
      content: '现在你已经了解了基本操作，开始探索太阳系的奥秘吧！点击天体查看详细信息。',
      icon: '🚀'
    }
  ],
  en: [
    {
      title: 'Welcome to Solar System Sandbox!',
      content: 'This is an interactive 3D solar system simulator to explore our cosmic neighborhood.',
      icon: '🌍'
    },
    {
      title: 'Rotate View',
      content: 'Hold left mouse button and drag to rotate the view from different angles.',
      icon: <RotateCcw className="w-8 h-8 text-primary" />
    },
    {
      title: 'Zoom View',
      content: 'Use mouse wheel to zoom in or out, to see details or the big picture.',
      icon: <ZoomIn className="w-8 h-8 text-primary" />
    },
    {
      title: 'Select Objects',
      content: 'Click on any celestial body (planets, moons, Sun) to view detailed information.',
      icon: <MousePointer2 className="w-8 h-8 text-primary" />
    },
    {
      title: 'Time Control',
      content: 'Use the left control panel to adjust time speed. Pause, play, or speed up.',
      icon: <Play className="w-8 h-8 text-primary" />
    },
    {
      title: 'Orbit Display',
      content: 'Toggle orbit lines on/off to better observe planetary trajectories.',
      icon: <Orbit className="w-8 h-8 text-primary" />
    },
    {
      title: 'Start Exploring!',
      content: 'Now you know the basics. Start exploring the mysteries of our Solar System! Click on objects for details.',
      icon: '🚀'
    }
  ]
};

export function Tutorial({ language, onComplete }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const steps = tutorialSteps[language];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    onComplete();
  };

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'Escape') handleComplete();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep]);

  if (!isVisible) return null;

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-md mx-4 bg-background/95 shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-between items-center">
            <div className="w-10" />
            <div className="flex gap-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep
                      ? 'bg-primary'
                      : index < currentStep
                      ? 'bg-primary/50'
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <Button variant="ghost" size="icon" onClick={handleComplete}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <CardTitle className="text-xl mt-2">{step.title}</CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-4">
          <div className="flex justify-center py-4">
            {typeof step.icon === 'string' ? (
              <span className="text-5xl">{step.icon}</span>
            ) : (
              step.icon
            )}
          </div>

          <p className="text-muted-foreground">{step.content}</p>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {language === 'zh' ? '上一步' : 'Previous'}
            </Button>

            <Button onClick={handleNext}>
              {currentStep === steps.length - 1
                ? language === 'zh'
                  ? '开始探索'
                  : 'Start'
                : language === 'zh'
                  ? '下一步'
                  : 'Next'}
              {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            {language === 'zh'
              ? '提示：使用方向键导航，ESC 跳过教程'
              : 'Tip: Use arrow keys to navigate, ESC to skip'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
