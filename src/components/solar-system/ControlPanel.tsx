'use client';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Play,
  Pause,
  RotateCcw,
  Gauge,
  Orbit,
  Languages,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useState } from 'react';

interface ControlPanelProps {
  timeScale: number;
  isPaused: boolean;
  showOrbits: boolean;
  language: 'zh' | 'en';
  onTimeScaleChange: (scale: number) => void;
  onPauseToggle: () => void;
  onOrbitsToggle: () => void;
  onLanguageToggle: () => void;
  onHelpClick: () => void;
  onResetView: () => void;
}

const texts = {
  zh: {
    title: '控制面板',
    timeControl: '时间控制',
    play: '播放',
    pause: '暂停',
    speed: '速度',
    speed1x: '1x',
    speed10x: '10x',
    speed100x: '100x',
    speed1000x: '1000x',
    display: '显示选项',
    showOrbits: '显示轨道',
    language: '语言',
    chinese: '中文',
    english: 'English',
    help: '帮助',
    resetView: '重置视角'
  },
  en: {
    title: 'Control Panel',
    timeControl: 'Time Control',
    play: 'Play',
    pause: 'Pause',
    speed: 'Speed',
    speed1x: '1x',
    speed10x: '10x',
    speed100x: '100x',
    speed1000x: '1000x',
    display: 'Display Options',
    showOrbits: 'Show Orbits',
    language: 'Language',
    chinese: '中文',
    english: 'English',
    help: 'Help',
    resetView: 'Reset View'
  }
};

export function ControlPanel({
  timeScale,
  isPaused,
  showOrbits,
  language,
  onTimeScaleChange,
  onPauseToggle,
  onOrbitsToggle,
  onLanguageToggle,
  onHelpClick,
  onResetView
}: ControlPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const t = texts[language];

  const speedPresets = [
    { label: t.speed1x, value: 1 },
    { label: t.speed10x, value: 10 },
    { label: t.speed100x, value: 100 },
    { label: t.speed1000x, value: 1000 }
  ];

  return (
    <div className="absolute top-4 left-4 z-20">
      <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-lg overflow-hidden">
        {/* 标题栏 */}
        <div
          className="flex items-center justify-between px-4 py-2 bg-primary/10 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h2 className="font-semibold text-sm">{t.title}</h2>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>

        {/* 控制内容 */}
        {isExpanded && (
          <div className="p-4 space-y-4 min-w-[240px]">
            {/* 时间控制 */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">{t.timeControl}</Label>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={onPauseToggle}
                        className="w-10 h-10"
                      >
                        {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isPaused ? t.play : t.pause}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={onResetView}
                        className="w-10 h-10"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t.resetView}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* 速度控制 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-muted-foreground" />
                <Label className="text-xs font-medium text-muted-foreground">{t.speed}: {timeScale}x</Label>
              </div>
              <Slider
                value={[Math.log10(timeScale)]}
                onValueChange={(value) => onTimeScaleChange(Math.pow(10, value[0]))}
                min={0}
                max={3}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between gap-1">
                {speedPresets.map((preset) => (
                  <Button
                    key={preset.value}
                    variant={timeScale === preset.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onTimeScaleChange(preset.value)}
                    className="text-xs px-2 py-1 h-6"
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* 显示选项 */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">{t.display}</Label>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Orbit className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{t.showOrbits}</span>
                </div>
                <Switch checked={showOrbits} onCheckedChange={onOrbitsToggle} />
              </div>
            </div>

            {/* 语言切换 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-muted-foreground" />
                <Label className="text-xs font-medium text-muted-foreground">{t.language}</Label>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={language === 'zh' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => language !== 'zh' && onLanguageToggle()}
                  className="flex-1"
                >
                  {t.chinese}
                </Button>
                <Button
                  variant={language === 'en' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => language !== 'en' && onLanguageToggle()}
                  className="flex-1"
                >
                  {t.english}
                </Button>
              </div>
            </div>

            {/* 帮助按钮 */}
            <Button
              variant="outline"
              size="sm"
              onClick={onHelpClick}
              className="w-full"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              {t.help}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
