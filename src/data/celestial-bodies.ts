// 太阳系天体数据 - 双语教育版
// Solar System Celestial Bodies Data - Bilingual Educational Version

export interface BilingualText {
    zh: string;
    en: string;
  }
  
  export interface OrbitalParameters {
    semiMajorAxis: BilingualText; // 半长轴
    eccentricity: BilingualText; // 离心率
    orbitalPeriod: BilingualText; // 公转周期
    inclination: BilingualText; // 轨道倾角
    averageVelocity: BilingualText; // 平均轨道速度
  }
  
  export interface PhysicalCharacteristics {
    diameter: BilingualText; // 直径
    mass: BilingualText; // 质量
    surfaceGravity: BilingualText; // 表面重力
    escapeVelocity: BilingualText; // 逃逸速度
    rotationPeriod: BilingualText; // 自转周期
    axialTilt: BilingualText; // 轴倾角
  }
  
  export interface AtmosphericCharacteristics {
    composition: BilingualText; // 大气成分
    surfacePressure: BilingualText; // 表面气压
    temperature: BilingualText; // 温度
    features: BilingualText; // 特征
  }
  
  export interface Moon {
    id: string;
    name: BilingualText;
    diameter: number; // km
    orbitalRadius: number; // 相对于母星的倍数（用于渲染）
    orbitalPeriod: number; // 天
    color: string;
    description: BilingualText;
  }
  
  export interface CelestialBody {
    id: string;
    name: BilingualText;
    type: 'star' | 'planet' | 'dwarf-planet';
    color: string;
    emissive?: string;
    size: number; // 相对渲染大小
    orbitalRadius: number; // 相对轨道半径
    orbitalPeriod: number; // 地球年
    rotationPeriod: number; // 地球日
    axialTilt: number; // 度
    orbitalInclination: number; // 度
    orbitalEccentricity: number;
    hasRings?: boolean;
    ringColor?: string;
    ringInnerRadius?: number;
    ringOuterRadius?: number;
    moons: Moon[];
    description: BilingualText;
    orbitalParameters: OrbitalParameters;
    physicalCharacteristics: PhysicalCharacteristics;
    atmosphericCharacteristics: AtmosphericCharacteristics;
    interestingFacts: BilingualText[];
  }
  
  // 太阳 - The Sun
  export const sun: CelestialBody = {
    id: 'sun',
    name: { zh: '太阳', en: 'Sun' },
    type: 'star',
    color: '#FDB813',
    emissive: '#FDB813',
    size: 5,
    orbitalRadius: 0,
    orbitalPeriod: 0,
    rotationPeriod: 25.4,
    axialTilt: 7.25,
    orbitalInclination: 0,
    orbitalEccentricity: 0,
    moons: [],
    description: {
      zh: '太阳是太阳系的中心恒星，包含了太阳系99.86%的质量。它是一颗黄矮星，通过核聚变产生能量。',
      en: 'The Sun is the central star of the Solar System, containing 99.86% of the system\'s mass. It is a yellow dwarf star that generates energy through nuclear fusion.'
    },
    orbitalParameters: {
      semiMajorAxis: { zh: '银河系中心约2.6万光年', en: 'About 26,000 light-years from galactic center' },
      eccentricity: { zh: '不适用', en: 'Not applicable' },
      orbitalPeriod: { zh: '银河年约2.25亿年', en: 'Galactic year ~225 million years' },
      inclination: { zh: '相对银河平面约60°', en: 'About 60° relative to galactic plane' },
      averageVelocity: { zh: '约220 km/s（绕银河系）', en: 'About 220 km/s (around galaxy)' }
    },
    physicalCharacteristics: {
      diameter: { zh: '1,392,700 km（地球的109倍）', en: '1,392,700 km (109× Earth)' },
      mass: { zh: '1.989 × 10³⁰ kg（地球的333,000倍）', en: '1.989 × 10³⁰ kg (333,000× Earth)' },
      surfaceGravity: { zh: '274 m/s²（地球的28倍）', en: '274 m/s² (28× Earth)' },
      escapeVelocity: { zh: '617.7 km/s', en: '617.7 km/s' },
      rotationPeriod: { zh: '25.4天（赤道）到35天（极区）', en: '25.4 days (equator) to 35 days (poles)' },
      axialTilt: { zh: '7.25°', en: '7.25°' }
    },
    atmosphericCharacteristics: {
      composition: {
        zh: '氢 (~73%), 氦 (~25%), 其他元素 (~2%)',
        en: 'Hydrogen (~73%), Helium (~25%), Other elements (~2%)'
      },
      surfacePressure: { zh: '核心约2500亿个大气压', en: 'Core ~250 billion atmospheres' },
      temperature: {
        zh: '表面约5,500°C，核心约1500万°C',
        en: 'Surface ~5,500°C, Core ~15 million°C'
      },
      features: {
        zh: '光球层、色球层、日冕、太阳黑子、日珥、耀斑',
        en: 'Photosphere, chromosphere, corona, sunspots, prominences, solar flares'
      }
    },
    interestingFacts: [
      { zh: '太阳每秒将约400万吨物质转化为能量', en: 'The Sun converts ~4 million tons of matter into energy every second' },
      { zh: '光从太阳到达地球需要约8分20秒', en: 'Light takes about 8 minutes 20 seconds to reach Earth' },
      { zh: '太阳已经燃烧了约46亿年', en: 'The Sun has been burning for about 4.6 billion years' }
    ]
  };
  
  // 水星 - Mercury
  export const mercury: CelestialBody = {
    id: 'mercury',
    name: { zh: '水星', en: 'Mercury' },
    type: 'planet',
    color: '#B5B5B5',
    size: 0.4,
    orbitalRadius: 8,
    orbitalPeriod: 0.24,
    rotationPeriod: 58.6,
    axialTilt: 0.034,
    orbitalInclination: 7.0,
    orbitalEccentricity: 0.2056,
    moons: [],
    description: {
      zh: '水星是太阳系最小的行星，也是距离太阳最近的行星。它没有大气层保护，表面布满陨石坑。',
      en: 'Mercury is the smallest planet in the Solar System and the closest to the Sun. It has no atmosphere, and its surface is covered with craters.'
    },
    orbitalParameters: {
      semiMajorAxis: { zh: '57,909,050 km (0.387 AU)', en: '57,909,050 km (0.387 AU)' },
      eccentricity: { zh: '0.2056（太阳系最高）', en: '0.2056 (highest in Solar System)' },
      orbitalPeriod: { zh: '87.97 地球日', en: '87.97 Earth days' },
      inclination: { zh: '7.00°', en: '7.00°' },
      averageVelocity: { zh: '47.87 km/s（最快行星）', en: '47.87 km/s (fastest planet)' }
    },
    physicalCharacteristics: {
      diameter: { zh: '4,879 km', en: '4,879 km' },
      mass: { zh: '3.30 × 10²³ kg', en: '3.30 × 10²³ kg' },
      surfaceGravity: { zh: '3.7 m/s²', en: '3.7 m/s²' },
      escapeVelocity: { zh: '4.25 km/s', en: '4.25 km/s' },
      rotationPeriod: { zh: '58.6 地球日', en: '58.6 Earth days' },
      axialTilt: { zh: '0.034°', en: '0.034°' }
    },
    atmosphericCharacteristics: {
      composition: { zh: '几乎没有大气，微量氧、钠、氢', en: 'Almost no atmosphere, trace oxygen, sodium, hydrogen' },
      surfacePressure: { zh: '约 10⁻¹⁵ 巴', en: 'About 10⁻¹⁵ bar' },
      temperature: { zh: '-180°C 到 430°C', en: '-180°C to 430°C' },
      features: { zh: '无天气，温差极大', en: 'No weather, extreme temperature variation' }
    },
    interestingFacts: [
      { zh: '水星的一天比一年还长', en: 'A day on Mercury is longer than its year' },
      { zh: '水星表面有直径1550公里的卡洛里盆地', en: 'Caloris Basin on Mercury is 1,550 km in diameter' },
      { zh: '水星正在缓慢收缩', en: 'Mercury is slowly shrinking' }
    ]
  };
  
  // 金星 - Venus
  export const venus: CelestialBody = {
    id: 'venus',
    name: { zh: '金星', en: 'Venus' },
    type: 'planet',
    color: '#E6C229',
    size: 0.9,
    orbitalRadius: 12,
    orbitalPeriod: 0.62,
    rotationPeriod: -243, // 负数表示逆向自转
    axialTilt: 177.4, // 几乎倒转
    orbitalInclination: 3.4,
    orbitalEccentricity: 0.0067,
    moons: [],
    description: {
      zh: '金星是太阳系最热的行星，拥有浓厚的二氧化碳大气层造成极端温室效应。它是地球的"姊妹星"。',
      en: 'Venus is the hottest planet in the Solar System, with a thick CO2 atmosphere causing extreme greenhouse effect. It is Earth\'s "sister planet".'
    },
    orbitalParameters: {
      semiMajorAxis: { zh: '108,208,000 km (0.723 AU)', en: '108,208,000 km (0.723 AU)' },
      eccentricity: { zh: '0.0067（几乎圆形）', en: '0.0067 (nearly circular)' },
      orbitalPeriod: { zh: '224.7 地球日', en: '224.7 Earth days' },
      inclination: { zh: '3.39°', en: '3.39°' },
      averageVelocity: { zh: '35.02 km/s', en: '35.02 km/s' }
    },
    physicalCharacteristics: {
      diameter: { zh: '12,104 km', en: '12,104 km' },
      mass: { zh: '4.87 × 10²⁴ kg', en: '4.87 × 10²⁴ kg' },
      surfaceGravity: { zh: '8.87 m/s²', en: '8.87 m/s²' },
      escapeVelocity: { zh: '10.36 km/s', en: '10.36 km/s' },
      rotationPeriod: { zh: '243 地球日（逆向）', en: '243 Earth days (retrograde)' },
      axialTilt: { zh: '177.4°（几乎倒转）', en: '177.4° (almost upside down)' }
    },
    atmosphericCharacteristics: {
      composition: { zh: '二氧化碳 96.5%, 氮气 3.5%', en: 'Carbon dioxide 96.5%, Nitrogen 3.5%' },
      surfacePressure: { zh: '92 巴（地球的92倍）', en: '92 bar (92× Earth)' },
      temperature: { zh: '平均 464°C', en: 'Average 464°C' },
      features: { zh: '硫酸云、极端温室效应、超旋转大气', en: 'Sulfuric acid clouds, extreme greenhouse effect, super-rotating atmosphere' }
    },
    interestingFacts: [
      { zh: '金星是唯一逆向自转的行星', en: 'Venus is the only planet that rotates backwards' },
      { zh: '金星的一天比一年还长', en: 'A day on Venus is longer than its year' },
      { zh: '金星表面可以熔化铅', en: 'Venus surface can melt lead' }
    ]
  };
  
  // 地球 - Earth
  export const earth: CelestialBody = {
    id: 'earth',
    name: { zh: '地球', en: 'Earth' },
    type: 'planet',
    color: '#6B93D6',
    size: 1,
    orbitalRadius: 16,
    orbitalPeriod: 1,
    rotationPeriod: 1,
    axialTilt: 23.4,
    orbitalInclination: 0,
    orbitalEccentricity: 0.0167,
    moons: [
      {
        id: 'moon',
        name: { zh: '月球', en: 'Moon' },
        diameter: 3474,
        orbitalRadius: 2.5,
        orbitalPeriod: 27.3,
        color: '#CCCCCC',
        description: {
          zh: '月球是地球唯一的天然卫星，对地球的潮汐和生命有重要影响。',
          en: 'The Moon is Earth\'s only natural satellite, significantly influencing Earth\'s tides and life.'
        }
      }
    ],
    description: {
      zh: '地球是太阳系中唯一已知存在生命的行星，拥有液态水表面和含氧大气层。',
      en: 'Earth is the only known planet in the Solar System with life, featuring liquid water on its surface and an oxygen-rich atmosphere.'
    },
    orbitalParameters: {
      semiMajorAxis: { zh: '149,598,023 km (1 AU)', en: '149,598,023 km (1 AU)' },
      eccentricity: { zh: '0.0167', en: '0.0167' },
      orbitalPeriod: { zh: '365.256 天', en: '365.256 days' },
      inclination: { zh: '0°（参考平面）', en: '0° (reference plane)' },
      averageVelocity: { zh: '29.78 km/s', en: '29.78 km/s' }
    },
    physicalCharacteristics: {
      diameter: { zh: '12,742 km', en: '12,742 km' },
      mass: { zh: '5.97 × 10²⁴ kg', en: '5.97 × 10²⁴ kg' },
      surfaceGravity: { zh: '9.81 m/s²', en: '9.81 m/s²' },
      escapeVelocity: { zh: '11.19 km/s', en: '11.19 km/s' },
      rotationPeriod: { zh: '23小时56分4秒', en: '23h 56m 4s' },
      axialTilt: { zh: '23.44°', en: '23.44°' }
    },
    atmosphericCharacteristics: {
      composition: { zh: '氮气 78%, 氧气 21%, 氩 0.9%', en: 'Nitrogen 78%, Oxygen 21%, Argon 0.9%' },
      surfacePressure: { zh: '1.013 巴', en: '1.013 bar' },
      temperature: { zh: '平均 15°C', en: 'Average 15°C' },
      features: { zh: '水循环、四季变化、磁场保护', en: 'Water cycle, seasons, magnetic field protection' }
    },
    interestingFacts: [
      { zh: '地球是太阳系中密度最大的行星', en: 'Earth is the densest planet in the Solar System' },
      { zh: '地球表面71%被水覆盖', en: '71% of Earth\'s surface is covered by water' },
      { zh: '地球的磁场保护我们免受太阳风侵袭', en: 'Earth\'s magnetic field protects us from solar wind' }
    ]
  };
  
  // 火星 - Mars
  export const mars: CelestialBody = {
    id: 'mars',
    name: { zh: '火星', en: 'Mars' },
    type: 'planet',
    color: '#C1440E',
    size: 0.5,
    orbitalRadius: 22,
    orbitalPeriod: 1.88,
    rotationPeriod: 1.03,
    axialTilt: 25.2,
    orbitalInclination: 1.85,
    orbitalEccentricity: 0.0934,
    moons: [
      {
        id: 'phobos',
        name: { zh: '火卫一', en: 'Phobos' },
        diameter: 22,
        orbitalRadius: 1.5,
        orbitalPeriod: 0.32,
        color: '#8B7355',
        description: {
          zh: '火卫一是火星最大的卫星，形状不规则，正在缓慢向火星靠近。',
          en: 'Phobos is Mars\' largest moon, irregularly shaped, and slowly spiraling inward.'
        }
      },
      {
        id: 'deimos',
        name: { zh: '火卫二', en: 'Deimos' },
        diameter: 12,
        orbitalRadius: 2.2,
        orbitalPeriod: 1.26,
        color: '#A0522D',
        description: {
          zh: '火卫二是火星较小的卫星，表面相对光滑。',
          en: 'Deimos is Mars\' smaller moon with a relatively smooth surface.'
        }
      }
    ],
    description: {
      zh: '火星被称为"红色星球"，是人类最有可能殖民的行星。它有稀薄的大气层和太阳系最高的山峰。',
      en: 'Mars, the "Red Planet", is the most likely candidate for human colonization. It has a thin atmosphere and the tallest mountain in the Solar System.'
    },
    orbitalParameters: {
      semiMajorAxis: { zh: '227,943,824 km (1.524 AU)', en: '227,943,824 km (1.524 AU)' },
      eccentricity: { zh: '0.0934', en: '0.0934' },
      orbitalPeriod: { zh: '686.98 地球日', en: '686.98 Earth days' },
      inclination: { zh: '1.85°', en: '1.85°' },
      averageVelocity: { zh: '24.07 km/s', en: '24.07 km/s' }
    },
    physicalCharacteristics: {
      diameter: { zh: '6,779 km', en: '6,779 km' },
      mass: { zh: '6.42 × 10²³ kg', en: '6.42 × 10²³ kg' },
      surfaceGravity: { zh: '3.71 m/s²', en: '3.71 m/s²' },
      escapeVelocity: { zh: '5.03 km/s', en: '5.03 km/s' },
      rotationPeriod: { zh: '24小时37分', en: '24h 37m' },
      axialTilt: { zh: '25.19°', en: '25.19°' }
    },
    atmosphericCharacteristics: {
      composition: { zh: '二氧化碳 95.3%, 氮气 2.7%, 氩 1.6%', en: 'Carbon dioxide 95.3%, Nitrogen 2.7%, Argon 1.6%' },
      surfacePressure: { zh: '0.006 巴（地球的0.6%）', en: '0.006 bar (0.6% of Earth)' },
      temperature: { zh: '-87°C 到 -5°C', en: '-87°C to -5°C' },
      features: { zh: '沙尘暴、极地冰盖、季节变化', en: 'Dust storms, polar ice caps, seasons' }
    },
    interestingFacts: [
      { zh: '火星有太阳系最高的山峰——奥林匹斯山（21.9公里）', en: 'Mars has the tallest mountain in the Solar System - Olympus Mons (21.9 km)' },
      { zh: '火星的一天与地球几乎相同', en: 'A day on Mars is almost the same as Earth' },
      { zh: '火星曾经可能存在液态水', en: 'Mars may have once had liquid water' }
    ]
  };
  
  // 木星 - Jupiter
  export const jupiter: CelestialBody = {
    id: 'jupiter',
    name: { zh: '木星', en: 'Jupiter' },
    type: 'planet',
    color: '#D8CA9D',
    size: 2.5,
    orbitalRadius: 38,
    orbitalPeriod: 11.86,
    rotationPeriod: 0.41,
    axialTilt: 3.1,
    orbitalInclination: 1.3,
    orbitalEccentricity: 0.0489,
    moons: [
      {
        id: 'io',
        name: { zh: '木卫一（伊奥）', en: 'Io' },
        diameter: 3643,
        orbitalRadius: 2.8,
        orbitalPeriod: 1.77,
        color: '#FFFF00',
        description: {
          zh: '伊奥是太阳系火山活动最活跃的天体，表面布满活火山。',
          en: 'Io is the most volcanically active body in the Solar System.'
        }
      },
      {
        id: 'europa',
        name: { zh: '木卫二（欧罗巴）', en: 'Europa' },
        diameter: 3122,
        orbitalRadius: 4.0,
        orbitalPeriod: 3.55,
        color: '#F5F5DC',
        description: {
          zh: '欧罗巴表面是冰层，冰层下可能存在液态海洋，是寻找地外生命的热门目标。',
          en: 'Europa has an icy surface with a possible subsurface ocean, a prime target for finding extraterrestrial life.'
        }
      },
      {
        id: 'ganymede',
        name: { zh: '木卫三（盖尼米德）', en: 'Ganymede' },
        diameter: 5262,
        orbitalRadius: 5.5,
        orbitalPeriod: 7.15,
        color: '#A9A9A9',
        description: {
          zh: '盖尼米德是太阳系最大的卫星，比水星还大。',
          en: 'Ganymede is the largest moon in the Solar System, larger than Mercury.'
        }
      },
      {
        id: 'callisto',
        name: { zh: '木卫四（卡里斯托）', en: 'Callisto' },
        diameter: 4821,
        orbitalRadius: 7.0,
        orbitalPeriod: 16.69,
        color: '#696969',
        description: {
          zh: '卡里斯托是太阳系表面撞击坑最多的天体之一。',
          en: 'Callisto is one of the most heavily cratered objects in the Solar System.'
        }
      }
    ],
    description: {
      zh: '木星是太阳系最大的行星，是一颗气态巨行星，著名的大红斑是一个持续数百年的巨型风暴。',
      en: 'Jupiter is the largest planet in the Solar System. It is a gas giant, and the Great Red Spot is a giant storm that has lasted for centuries.'
    },
    orbitalParameters: {
      semiMajorAxis: { zh: '778,340,821 km (5.203 AU)', en: '778,340,821 km (5.203 AU)' },
      eccentricity: { zh: '0.0489', en: '0.0489' },
      orbitalPeriod: { zh: '11.86 地球年', en: '11.86 Earth years' },
      inclination: { zh: '1.31°', en: '1.31°' },
      averageVelocity: { zh: '13.07 km/s', en: '13.07 km/s' }
    },
    physicalCharacteristics: {
      diameter: { zh: '139,820 km（地球的11倍）', en: '139,820 km (11× Earth)' },
      mass: { zh: '1.90 × 10²⁷ kg（地球的318倍）', en: '1.90 × 10²⁷ kg (318× Earth)' },
      surfaceGravity: { zh: '24.79 m/s²', en: '24.79 m/s²' },
      escapeVelocity: { zh: '59.5 km/s', en: '59.5 km/s' },
      rotationPeriod: { zh: '9小时55分（最快）', en: '9h 55m (fastest)' },
      axialTilt: { zh: '3.13°', en: '3.13°' }
    },
    atmosphericCharacteristics: {
      composition: { zh: '氢气 90%, 氦气 10%', en: 'Hydrogen 90%, Helium 10%' },
      surfacePressure: { zh: '无确定表面', en: 'No defined surface' },
      temperature: { zh: '云顶 -145°C', en: 'Cloud tops -145°C' },
      features: { zh: '大红斑、条纹云带、极光', en: 'Great Red Spot, banded clouds, auroras' }
    },
    interestingFacts: [
      { zh: '木星有79颗已知卫星', en: 'Jupiter has 79 known moons' },
      { zh: '大红斑可以容纳三个地球', en: 'The Great Red Spot could fit three Earths' },
      { zh: '木星充当太阳系的"太空吸尘器"，保护内行星', en: 'Jupiter acts as a "space vacuum cleaner", protecting inner planets' }
    ]
  };
  
  // 土星 - Saturn
  export const saturn: CelestialBody = {
    id: 'saturn',
    name: { zh: '土星', en: 'Saturn' },
    type: 'planet',
    color: '#F4D59E',
    size: 2.2,
    orbitalRadius: 52,
    orbitalPeriod: 29.46,
    rotationPeriod: 0.44,
    axialTilt: 26.7,
    orbitalInclination: 2.49,
    orbitalEccentricity: 0.0565,
    hasRings: true,
    ringColor: '#C9B896',
    ringInnerRadius: 1.5,
    ringOuterRadius: 2.8,
    moons: [
      {
        id: 'titan',
        name: { zh: '土卫六（泰坦）', en: 'Titan' },
        diameter: 5150,
        orbitalRadius: 5.0,
        orbitalPeriod: 15.95,
        color: '#DAA520',
        description: {
          zh: '泰坦是太阳系第二大卫星，拥有浓厚大气层和液态甲烷湖泊。',
          en: 'Titan is the second-largest moon in the Solar System, with a thick atmosphere and liquid methane lakes.'
        }
      },
      {
        id: 'enceladus',
        name: { zh: '土卫二（恩克拉多斯）', en: 'Enceladus' },
        diameter: 504,
        orbitalRadius: 2.5,
        orbitalPeriod: 1.37,
        color: '#FFFFFF',
        description: {
          zh: '恩克拉多斯表面是纯净的冰层，有间歇泉喷射水蒸气，冰层下可能存在海洋。',
          en: 'Enceladus has a pure icy surface with geysers, possibly harboring a subsurface ocean.'
        }
      },
      {
        id: 'mimas',
        name: { zh: '土卫一（米玛斯）', en: 'Mimas' },
        diameter: 396,
        orbitalRadius: 1.8,
        orbitalPeriod: 0.94,
        color: '#DCDCDC',
        description: {
          zh: '米玛斯有一个巨大的撞击坑，使其看起来像"死星"。',
          en: 'Mimas has a giant crater making it look like the "Death Star".'
        }
      }
    ],
    description: {
      zh: '土星以其壮观的环系统闻名，主要由冰和岩石碎片组成。它是太阳系密度最低的行星。',
      en: 'Saturn is famous for its spectacular ring system, composed mainly of ice and rock. It is the least dense planet in the Solar System.'
    },
    orbitalParameters: {
      semiMajorAxis: { zh: '1,426,666,422 km (9.537 AU)', en: '1,426,666,422 km (9.537 AU)' },
      eccentricity: { zh: '0.0565', en: '0.0565' },
      orbitalPeriod: { zh: '29.46 地球年', en: '29.46 Earth years' },
      inclination: { zh: '2.49°', en: '2.49°' },
      averageVelocity: { zh: '9.68 km/s', en: '9.68 km/s' }
    },
    physicalCharacteristics: {
      diameter: { zh: '116,460 km', en: '116,460 km' },
      mass: { zh: '5.68 × 10²⁶ kg', en: '5.68 × 10²⁶ kg' },
      surfaceGravity: { zh: '10.44 m/s²', en: '10.44 m/s²' },
      escapeVelocity: { zh: '35.5 km/s', en: '35.5 km/s' },
      rotationPeriod: { zh: '10小时33分', en: '10h 33m' },
      axialTilt: { zh: '26.73°', en: '26.73°' }
    },
    atmosphericCharacteristics: {
      composition: { zh: '氢气 96%, 氦气 3%', en: 'Hydrogen 96%, Helium 3%' },
      surfacePressure: { zh: '无确定表面', en: 'No defined surface' },
      temperature: { zh: '云顶 -178°C', en: 'Cloud tops -178°C' },
      features: { zh: '六边形风暴、壮观环系统', en: 'Hexagonal storm, spectacular ring system' }
    },
    interestingFacts: [
      { zh: '土星密度比水还低，理论上能浮在水上', en: 'Saturn is less dense than water and would theoretically float' },
      { zh: '土星环宽度达28万公里，但厚度只有10米', en: 'Saturn\'s rings span 280,000 km but are only 10 meters thick' },
      { zh: '土星有83颗已知卫星', en: 'Saturn has 83 known moons' }
    ]
  };
  
  // 天王星 - Uranus
  export const uranus: CelestialBody = {
    id: 'uranus',
    name: { zh: '天王星', en: 'Uranus' },
    type: 'planet',
    color: '#AFDBF5',
    size: 1.6,
    orbitalRadius: 68,
    orbitalPeriod: 84.01,
    rotationPeriod: -0.72, // 逆向
    axialTilt: 97.8, // 几乎躺倒
    orbitalInclination: 0.77,
    orbitalEccentricity: 0.0457,
    hasRings: true,
    ringColor: '#4A5568',
    ringInnerRadius: 1.3,
    ringOuterRadius: 1.8,
    moons: [
      {
        id: 'miranda',
        name: { zh: '天卫五（米兰达）', en: 'Miranda' },
        diameter: 472,
        orbitalRadius: 1.8,
        orbitalPeriod: 1.41,
        color: '#D3D3D3',
        description: {
          zh: '米兰达表面有极端地形变化，可能是多次撞击后重组的结果。',
          en: 'Miranda has extreme surface features, possibly from multiple impacts and reassembly.'
        }
      },
      {
        id: 'ariel',
        name: { zh: '天卫一（艾瑞尔）', en: 'Ariel' },
        diameter: 1158,
        orbitalRadius: 2.5,
        orbitalPeriod: 2.52,
        color: '#C0C0C0',
        description: {
          zh: '艾瑞尔是天王星最亮的卫星，表面有峡谷和平原。',
          en: 'Ariel is the brightest of Uranus\'s moons, with canyons and plains.'
        }
      },
      {
        id: 'titania',
        name: { zh: '天卫三（泰坦妮亚）', en: 'Titania' },
        diameter: 1577,
        orbitalRadius: 3.5,
        orbitalPeriod: 8.71,
        color: '#A9A9A9',
        description: {
          zh: '泰坦妮亚是天王星最大的卫星，有巨大的峡谷和断层。',
          en: 'Titania is Uranus\'s largest moon, with huge canyons and faults.'
        }
      }
    ],
    description: {
      zh: '天王星是一颗冰巨星，最独特之处是其极端的轴倾角——几乎是"躺着"绕太阳公转。',
      en: 'Uranus is an ice giant, most notable for its extreme axial tilt—it essentially rolls around the Sun on its side.'
    },
    orbitalParameters: {
      semiMajorAxis: { zh: '2,870,658,186 km (19.19 AU)', en: '2,870,658,186 km (19.19 AU)' },
      eccentricity: { zh: '0.0457', en: '0.0457' },
      orbitalPeriod: { zh: '84.01 地球年', en: '84.01 Earth years' },
      inclination: { zh: '0.77°', en: '0.77°' },
      averageVelocity: { zh: '6.80 km/s', en: '6.80 km/s' }
    },
    physicalCharacteristics: {
      diameter: { zh: '50,724 km', en: '50,724 km' },
      mass: { zh: '8.68 × 10²⁵ kg', en: '8.68 × 10²⁵ kg' },
      surfaceGravity: { zh: '8.87 m/s²', en: '8.87 m/s²' },
      escapeVelocity: { zh: '21.3 km/s', en: '21.3 km/s' },
      rotationPeriod: { zh: '17小时14分（逆向）', en: '17h 14m (retrograde)' },
      axialTilt: { zh: '97.77°（几乎躺倒）', en: '97.77° (almost on its side)' }
    },
    atmosphericCharacteristics: {
      composition: { zh: '氢气 83%, 氦气 15%, 甲烷 2%', en: 'Hydrogen 83%, Helium 15%, Methane 2%' },
      surfacePressure: { zh: '无确定表面', en: 'No defined surface' },
      temperature: { zh: '云顶 -224°C（最冷）', en: 'Cloud tops -224°C (coldest)' },
      features: { zh: '甲烷赋予蓝绿色，暗淡的环', en: 'Methane gives blue-green color, faint rings' }
    },
    interestingFacts: [
      { zh: '天王星是第一颗用望远镜发现的行星', en: 'Uranus was the first planet discovered with a telescope' },
      { zh: '天王星的季节持续约21年', en: 'Seasons on Uranus last about 21 years each' },
      { zh: '天王星可能是与地球大小的天体撞击后"躺倒"的', en: 'Uranus may have been knocked on its side by an Earth-sized impact' }
    ]
  };
  
  // 海王星 - Neptune
  export const neptune: CelestialBody = {
    id: 'neptune',
    name: { zh: '海王星', en: 'Neptune' },
    type: 'planet',
    color: '#5B5DDF',
    size: 1.5,
    orbitalRadius: 84,
    orbitalPeriod: 164.8,
    rotationPeriod: 0.67,
    axialTilt: 28.3,
    orbitalInclination: 1.77,
    orbitalEccentricity: 0.0113,
    hasRings: true,
    ringColor: '#2D3748',
    ringInnerRadius: 1.2,
    ringOuterRadius: 1.6,
    moons: [
      {
        id: 'triton',
        name: { zh: '海卫一（特里顿）', en: 'Triton' },
        diameter: 2707,
        orbitalRadius: 2.5,
        orbitalPeriod: -5.88, // 逆向
        color: '#FFB6C1',
        description: {
          zh: '特里顿是太阳系唯一逆向公转的大卫星，可能是被海王星捕获的柯伊伯带天体。',
          en: 'Triton is the only large moon with retrograde orbit, possibly a captured Kuiper Belt object.'
        }
      },
      {
        id: 'nereid',
        name: { zh: '海卫二（涅瑞伊德）', en: 'Nereid' },
        diameter: 340,
        orbitalRadius: 4.0,
        orbitalPeriod: 360,
        color: '#B8B8B8',
        description: {
          zh: '涅瑞伊德有太阳系最偏心的轨道之一。',
          en: 'Nereid has one of the most eccentric orbits in the Solar System.'
        }
      }
    ],
    description: {
      zh: '海王星是太阳系最远的行星，有太阳系最强的风暴。它的发现是通过数学计算预测的。',
      en: 'Neptune is the farthest planet in the Solar System with the strongest winds. It was the first planet found through mathematical prediction.'
    },
    orbitalParameters: {
      semiMajorAxis: { zh: '4,498,396,441 km (30.07 AU)', en: '4,498,396,441 km (30.07 AU)' },
      eccentricity: { zh: '0.0113', en: '0.0113' },
      orbitalPeriod: { zh: '164.8 地球年', en: '164.8 Earth years' },
      inclination: { zh: '1.77°', en: '1.77°' },
      averageVelocity: { zh: '5.43 km/s', en: '5.43 km/s' }
    },
    physicalCharacteristics: {
      diameter: { zh: '49,528 km', en: '49,528 km' },
      mass: { zh: '1.02 × 10²⁶ kg', en: '1.02 × 10²⁶ kg' },
      surfaceGravity: { zh: '11.15 m/s²', en: '11.15 m/s²' },
      escapeVelocity: { zh: '23.5 km/s', en: '23.5 km/s' },
      rotationPeriod: { zh: '16小时6分', en: '16h 6m' },
      axialTilt: { zh: '28.32°', en: '28.32°' }
    },
    atmosphericCharacteristics: {
      composition: { zh: '氢气 80%, 氦气 19%, 甲烷 1%', en: 'Hydrogen 80%, Helium 19%, Methane 1%' },
      surfacePressure: { zh: '无确定表面', en: 'No defined surface' },
      temperature: { zh: '云顶 -214°C', en: 'Cloud tops -214°C' },
      features: { zh: '大暗斑、太阳系最快风速（2100 km/h）', en: 'Great Dark Spot, fastest winds in Solar System (2100 km/h)' }
    },
    interestingFacts: [
      { zh: '海王星的风速可达2100 km/h，是太阳系最快的', en: 'Neptune\'s winds can reach 2100 km/h, the fastest in the Solar System' },
      { zh: '海王星通过数学计算被发现', en: 'Neptune was discovered through mathematical prediction' },
      { zh: '海王星绕太阳一圈需要165年', en: 'Neptune takes 165 years to orbit the Sun' }
    ]
  };
  
  // 冥王星 - Pluto (矮行星)
  export const pluto: CelestialBody = {
    id: 'pluto',
    name: { zh: '冥王星', en: 'Pluto' },
    type: 'dwarf-planet',
    color: '#D2B48C',
    size: 0.25,
    orbitalRadius: 95,
    orbitalPeriod: 248,
    rotationPeriod: -6.39, // 逆向
    axialTilt: 122.5,
    orbitalInclination: 17.16,
    orbitalEccentricity: 0.2488, // 高离心率
    moons: [
      {
        id: 'charon',
        name: { zh: '冥卫一（卡戎）', en: 'Charon' },
        diameter: 1212,
        orbitalRadius: 2.0,
        orbitalPeriod: 6.39,
        color: '#A9A9A9',
        description: {
          zh: '卡戎与冥王星大小相近，它们实际上是双矮行星系统。',
          en: 'Charon is nearly half Pluto\'s size; they form a binary dwarf planet system.'
        }
      }
    ],
    description: {
      zh: '冥王星曾被认为是第九大行星，2006年被重新分类为矮行星。它有心脏形的氮冰平原。',
      en: 'Pluto was once considered the ninth planet, reclassified as a dwarf planet in 2006. It features a heart-shaped nitrogen ice plain.'
    },
    orbitalParameters: {
      semiMajorAxis: { zh: '5,906,380,000 km (39.48 AU)', en: '5,906,380,000 km (39.48 AU)' },
      eccentricity: { zh: '0.2488（高离心率）', en: '0.2488 (high eccentricity)' },
      orbitalPeriod: { zh: '248 地球年', en: '248 Earth years' },
      inclination: { zh: '17.16°（高倾角）', en: '17.16° (high inclination)' },
      averageVelocity: { zh: '4.67 km/s', en: '4.67 km/s' }
    },
    physicalCharacteristics: {
      diameter: { zh: '2,377 km', en: '2,377 km' },
      mass: { zh: '1.30 × 10²² kg', en: '1.30 × 10²² kg' },
      surfaceGravity: { zh: '0.62 m/s²', en: '0.62 m/s²' },
      escapeVelocity: { zh: '1.21 km/s', en: '1.21 km/s' },
      rotationPeriod: { zh: '6.39 地球日（逆向）', en: '6.39 Earth days (retrograde)' },
      axialTilt: { zh: '122.53°', en: '122.53°' }
    },
    atmosphericCharacteristics: {
      composition: { zh: '氮气、甲烷、一氧化碳', en: 'Nitrogen, methane, carbon monoxide' },
      surfacePressure: { zh: '约 10⁻⁵ 巴', en: 'About 10⁻⁵ bar' },
      temperature: { zh: '-230°C', en: '-230°C' },
      features: { zh: '心形平原（史波尼克平原）、山脉、冰火山', en: 'Heart-shaped plain (Sputnik Planitia), mountains, possible ice volcanoes' }
    },
    interestingFacts: [
      { zh: '冥王星的轨道有时比海王星更靠近太阳', en: 'Pluto\'s orbit sometimes brings it closer to the Sun than Neptune' },
      { zh: '新视野号探测器2015年首次飞掠冥王星', en: 'New Horizons spacecraft first flew by Pluto in 2015' },
      { zh: '冥王星有5颗已知卫星', en: 'Pluto has 5 known moons' }
    ]
  };
  
  // 小行星带
  export interface AsteroidBelt {
    id: string;
    name: BilingualText;
    description: BilingualText;
    innerRadius: number;
    outerRadius: number;
    asteroidCount: number;
  }
  
  export const asteroidBelt: AsteroidBelt = {
    id: 'asteroid-belt',
    name: { zh: '小行星带', en: 'Asteroid Belt' },
    description: {
      zh: '小行星带位于火星和木星之间，包含数百万颗小行星。最大的天体是谷神星。',
      en: 'The asteroid belt lies between Mars and Jupiter, containing millions of asteroids. The largest object is Ceres.'
    },
    innerRadius: 28,
    outerRadius: 34,
    asteroidCount: 500 // 渲染数量
  };
  
  // 所有天体集合
  export const allPlanets: CelestialBody[] = [
    mercury,
    venus,
    earth,
    mars,
    jupiter,
    saturn,
    uranus,
    neptune
  ];
  
  export const dwarfPlanets: CelestialBody[] = [pluto];
  
  export const allCelestialBodies: CelestialBody[] = [sun, ...allPlanets, ...dwarfPlanets];
  
  // 根据ID获取天体
  export function getCelestialBodyById(id: string): CelestialBody | undefined {
    return allCelestialBodies.find(body => body.id === id);
  }
  
  // 获取所有卫星
  export function getAllMoons(): { moon: Moon; parent: CelestialBody }[] {
    const moons: { moon: Moon; parent: CelestialBody }[] = [];
    allCelestialBodies.forEach(body => {
      body.moons.forEach(moon => {
        moons.push({ moon, parent: body });
      });
    });
    return moons;
  }
  