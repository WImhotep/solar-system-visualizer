'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Globe, ChevronDown, Moon, Star, Asterisk } from 'lucide-react';
import {
  allPlanets,
  dwarfPlanets,
  sun,
  asteroidBelt,
  CelestialBody,
  Moon as MoonType
} from '@/data/celestial-bodies';

interface PlanetSelectorProps {
  language: 'zh' | 'en';
  selectedBody: CelestialBody | null;
  selectedMoon: { moon: MoonType; parent: CelestialBody } | null;
  onSelectBody: (body: CelestialBody) => void;
  onSelectMoon: (moon: MoonType, parent: CelestialBody) => void;
}

const texts = {
  zh: {
    title: '选择天体',
    sun: '太阳',
    planets: '行星',
    dwarfPlanets: '矮行星',
    moons: '卫星',
    asteroidBelt: '小行星带'
  },
  en: {
    title: 'Select Object',
    sun: 'Sun',
    planets: 'Planets',
    dwarfPlanets: 'Dwarf Planets',
    moons: 'Moons',
    asteroidBelt: 'Asteroid Belt'
  }
};

function getText(bilingual: { zh: string; en: string }, language: 'zh' | 'en'): string {
  return bilingual[language];
}

export function PlanetSelector({
  language,
  selectedBody,
  selectedMoon,
  onSelectBody,
  onSelectMoon
}: PlanetSelectorProps) {
  const t = texts[language];

  // 获取当前选中的名称
  const selectedName = selectedBody
    ? getText(selectedBody.name, language)
    : selectedMoon
    ? `${getText(selectedMoon.moon.name, language)} (${getText(selectedMoon.parent.name, language)})`
    : t.title;

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-background/95 backdrop-blur-sm min-w-[200px]">
            <Globe className="w-4 h-4 mr-2" />
            <span className="truncate">{selectedName}</span>
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 max-h-[400px]" align="center">
          <ScrollArea className="h-[350px]">
            {/* 太阳 */}
            <DropdownMenuLabel className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              {t.sun}
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onSelectBody(sun)}>
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: sun.color }}
              />
              {getText(sun.name, language)}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* 行星 */}
            <DropdownMenuLabel className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" />
              {t.planets}
            </DropdownMenuLabel>
            {allPlanets.map((planet) => (
              <DropdownMenuItem
                key={planet.id}
                onClick={() => onSelectBody(planet)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: planet.color }}
                  />
                  {getText(planet.name, language)}
                </div>
                {planet.moons.length > 0 && (
                  <span className="text-xs text-muted-foreground ml-2">
                    ({planet.moons.length})
                  </span>
                )}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            {/* 矮行星 */}
            <DropdownMenuLabel className="flex items-center gap-2">
              <Asterisk className="w-4 h-4 text-gray-500" />
              {t.dwarfPlanets}
            </DropdownMenuLabel>
            {dwarfPlanets.map((dwarf) => (
              <DropdownMenuItem
                key={dwarf.id}
                onClick={() => onSelectBody(dwarf)}
              >
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: dwarf.color }}
                />
                {getText(dwarf.name, language)}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            {/* 卫星 */}
            <DropdownMenuLabel className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-gray-400" />
              {t.moons}
            </DropdownMenuLabel>
            {[...allPlanets, ...dwarfPlanets].map((planet) =>
              planet.moons.map((moon) => (
                <DropdownMenuItem
                  key={moon.id}
                  onClick={() => onSelectMoon(moon, planet)}
                >
                  <div
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: moon.color }}
                  />
                  <span className="text-sm">
                    {getText(moon.name, language)}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    ({getText(planet.name, language)})
                  </span>
                </DropdownMenuItem>
              ))
            )}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
