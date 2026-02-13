'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  X,
  Globe,
  Orbit,
  Thermometer,
  Wind,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CelestialBody, Moon, BilingualText } from '@/data/celestial-bodies';

interface InfoCardProps {
  body: CelestialBody | null;
  moon: { moon: Moon; parent: CelestialBody } | null;
  language: 'zh' | 'en';
  onClose: () => void;
}

const texts = {
  zh: {
    orbitalParameters: '轨道参数',
    physicalCharacteristics: '物理特征',
    atmosphericCharacteristics: '大气特征',
    interestingFacts: '有趣事实',
    semiMajorAxis: '半长轴',
    eccentricity: '离心率',
    orbitalPeriod: '公转周期',
    inclination: '轨道倾角',
    averageVelocity: '平均速度',
    diameter: '直径',
    mass: '质量',
    surfaceGravity: '表面重力',
    escapeVelocity: '逃逸速度',
    rotationPeriod: '自转周期',
    axialTilt: '轴倾角',
    composition: '大气成分',
    surfacePressure: '表面气压',
    temperature: '温度',
    features: '特征',
    moonOf: '的卫星',
    close: '关闭',
    planet: '行星',
    dwarfPlanet: '矮行星',
    star: '恒星',
    moreInfo: '展开详情',
    lessInfo: '收起详情'
  },
  en: {
    orbitalParameters: 'Orbital Parameters',
    physicalCharacteristics: 'Physical Characteristics',
    atmosphericCharacteristics: 'Atmospheric Characteristics',
    interestingFacts: 'Interesting Facts',
    semiMajorAxis: 'Semi-major Axis',
    eccentricity: 'Eccentricity',
    orbitalPeriod: 'Orbital Period',
    inclination: 'Inclination',
    averageVelocity: 'Average Velocity',
    diameter: 'Diameter',
    mass: 'Mass',
    surfaceGravity: 'Surface Gravity',
    escapeVelocity: 'Escape Velocity',
    rotationPeriod: 'Rotation Period',
    axialTilt: 'Axial Tilt',
    composition: 'Composition',
    surfacePressure: 'Surface Pressure',
    temperature: 'Temperature',
    features: 'Features',
    moonOf: "'s Moon",
    close: 'Close',
    planet: 'Planet',
    dwarfPlanet: 'Dwarf Planet',
    star: 'Star',
    moreInfo: 'Show Details',
    lessInfo: 'Hide Details'
  }
};

// 获取类型标签
function getTypeBadge(type: CelestialBody['type'], language: 'zh' | 'en') {
  const t = texts[language];
  switch (type) {
    case 'star':
      return <Badge variant="default">{t.star}</Badge>;
    case 'planet':
      return <Badge variant="default">{t.planet}</Badge>;
    case 'dwarf-planet':
      return <Badge variant="secondary">{t.dwarfPlanet}</Badge>;
    default:
      return null;
  }
}

// 获取双语文本
function getText(bilingual: BilingualText, language: 'zh' | 'en'): string {
  return bilingual[language];
}

export function InfoCard({ body, moon, language, onClose }: InfoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = texts[language];

  if (!body && !moon) return null;

  // 卫星信息
  if (moon && !body) {
    return (
      <div className="absolute top-4 right-4 z-20 w-80">
        <Card className="bg-background/95 backdrop-blur-sm border-border shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">
                  {getText(moon.moon.name, language)}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {getText(moon.parent.name, language)} {t.moonOf}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {getText(moon.moon.description, language)}
            </p>
            <div className="mt-3 text-xs text-muted-foreground">
              <div>直径: {moon.moon.diameter.toLocaleString()} km</div>
              <div>公转周期: {moon.moon.orbitalPeriod} 天</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 天体信息
  if (body) {
    return (
      <div className="absolute top-4 right-4 z-20 w-96 max-h-[90vh]">
        <Card className="bg-background/95 backdrop-blur-sm border-border shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: body.color }}
                />
                <CardTitle className="text-xl">
                  {getText(body.name, language)}
                </CardTitle>
                {getTypeBadge(body.type, language)}
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground pt-2">
              {getText(body.description, language)}
            </p>
          </CardHeader>

          <CardContent className="pt-0">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 h-8">
                <TabsTrigger value="overview" className="text-xs">
                  <Globe className="w-3 h-3 mr-1" />
                  {language === 'zh' ? '概览' : 'Info'}
                </TabsTrigger>
                <TabsTrigger value="orbital" className="text-xs">
                  <Orbit className="w-3 h-3 mr-1" />
                  {language === 'zh' ? '轨道' : 'Orbit'}
                </TabsTrigger>
                <TabsTrigger value="physical" className="text-xs">
                  <Thermometer className="w-3 h-3 mr-1" />
                  {language === 'zh' ? '物理' : 'Physical'}
                </TabsTrigger>
                <TabsTrigger value="atmosphere" className="text-xs">
                  <Wind className="w-3 h-3 mr-1" />
                  {language === 'zh' ? '大气' : 'Atm'}
                </TabsTrigger>
              </TabsList>

              <ScrollArea className="h-[300px] mt-2">
                {/* 概览 */}
                <TabsContent value="overview" className="mt-2 space-y-3">
                  {/* 有趣事实 */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      {t.interestingFacts}
                    </div>
                    <ul className="space-y-1">
                      {body.interestingFacts.map((fact, index) => (
                        <li
                          key={index}
                          className="text-xs text-muted-foreground pl-6 relative before:content-['•'] before:absolute before:left-3"
                        >
                          {getText(fact, language)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 卫星列表 */}
                  {body.moons.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">
                        {language === 'zh' ? `卫星 (${body.moons.length})` : `Moons (${body.moons.length})`}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {body.moons.map((moon) => (
                          <Badge key={moon.id} variant="outline" className="text-xs">
                            {getText(moon.name, language)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* 轨道参数 */}
                <TabsContent value="orbital" className="mt-2 space-y-2">
                  {Object.entries({
                    [t.semiMajorAxis]: body.orbitalParameters.semiMajorAxis,
                    [t.eccentricity]: body.orbitalParameters.eccentricity,
                    [t.orbitalPeriod]: body.orbitalParameters.orbitalPeriod,
                    [t.inclination]: body.orbitalParameters.inclination,
                    [t.averageVelocity]: body.orbitalParameters.averageVelocity
                  }).map(([label, value]) => (
                    <div key={label} className="flex justify-between text-xs py-1 border-b border-border/50">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="text-right max-w-[60%]">{getText(value, language)}</span>
                    </div>
                  ))}
                </TabsContent>

                {/* 物理特征 */}
                <TabsContent value="physical" className="mt-2 space-y-2">
                  {Object.entries({
                    [t.diameter]: body.physicalCharacteristics.diameter,
                    [t.mass]: body.physicalCharacteristics.mass,
                    [t.surfaceGravity]: body.physicalCharacteristics.surfaceGravity,
                    [t.escapeVelocity]: body.physicalCharacteristics.escapeVelocity,
                    [t.rotationPeriod]: body.physicalCharacteristics.rotationPeriod,
                    [t.axialTilt]: body.physicalCharacteristics.axialTilt
                  }).map(([label, value]) => (
                    <div key={label} className="flex justify-between text-xs py-1 border-b border-border/50">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="text-right max-w-[60%]">{getText(value, language)}</span>
                    </div>
                  ))}
                </TabsContent>

                {/* 大气特征 */}
                <TabsContent value="atmosphere" className="mt-2 space-y-2">
                  {Object.entries({
                    [t.composition]: body.atmosphericCharacteristics.composition,
                    [t.surfacePressure]: body.atmosphericCharacteristics.surfacePressure,
                    [t.temperature]: body.atmosphericCharacteristics.temperature,
                    [t.features]: body.atmosphericCharacteristics.features
                  }).map(([label, value]) => (
                    <div key={label} className="space-y-1">
                      <span className="text-xs text-muted-foreground font-medium">{label}</span>
                      <p className="text-xs pl-2">{getText(value, language)}</p>
                    </div>
                  ))}
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
