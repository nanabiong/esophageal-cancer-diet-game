window.RISK_CONFIG = {
  RISK_TAGS: {
    "不规律进食": { appear: 1, or: 1.779, logOR: 0.250, dimension: "rhythm" },
    "高盐饮食": { appear: 2, or: 1.547, logOR: 0.189, dimension: "sensory" },
    "加工肉类": { appear: 2, or: 1.410, logOR: 0.149, dimension: "specificity" },
    "快速进食": { appear: 3, or: 1.917, logOR: 0.283, dimension: "rhythm" },
    "霉变饮食": { appear: 1, or: 1.564, logOR: 0.194, dimension: "danger" },
    "热烫饮食": { appear: 3, or: 1.931, logOR: 0.286, dimension: "sensory" },
    "辛辣饮食": { appear: 4, or: 1.523, logOR: 0.183, dimension: "sensory" },
    "腌制饮食": { appear: 3, or: 1.462, logOR: 0.165, dimension: "specificity" },
    "饮酒": { appear: 1, or: 1.550, logOR: 0.190, dimension: "danger" },
    "高量饮酒": { appear: 1, or: 5.380, logOR: 0.731, dimension: "danger" },
    "硬质饮食": { appear: 2, or: 2.107, logOR: 0.324, dimension: "specificity" },
    "油炸饮食": { appear: 3, or: 1.574, logOR: 0.197, dimension: "sensory" }
  },

  RISK_MAX: {
    total: 3.141,
    sensory: 0.855,
    rhythm: 0.533,
    specificity: 0.638,
    danger: 1.115
  },

  OPTION_RISK_TAGS: {
    breakfast_overnightPizza: ["霉变饮食"],
    breakfast_baguetteCheese: ["硬质饮食"],
    breakfast_hotPorridge: ["热烫饮食"],
    breakfast_eggHamSandwich: ["加工肉类"],
    breakfast_cornEggMilk: [],

    breakfast_speed_fast: ["快速进食", "热烫饮食"],
    breakfast_speed_medium: ["快速进食"],
    breakfast_speed_slow: [],

    lunch_qingjiao_larou: ["腌制饮食"],
    lunch_koushuiji: ["辛辣饮食"],
    lunch_zhaxiao_rouwan: ["油炸饮食"],
    lunch_huobao_youyu: ["辛辣饮食", "高盐饮食"],
    lunch_jiang_niurou: ["高盐饮食"],
    lunch_xiaren_caixin: [],
    lunch_shaguo_zhou: ["热烫饮食"],
    lunch_hanbao_zhaji: ["油炸饮食"],
    lunch_paocai_niurou_xinlamian: ["腌制饮食", "辛辣饮食"],
    lunch_baimifan: [],

    lunch_place_canteen_table: ["快速进食"],
    lunch_place_coworkers: [],
    lunch_place_park_bench: [],
    lunch_place_office_desk: ["不规律进食"],

    hotpot_maodu: [],
    hotpot_sausage: ["腌制饮食"],
    hotpot_vegetable: [],
    hotpot_luncheonMeat: ["加工肉类"],
    hotpot_youtiao: ["油炸饮食"],
    hotpot_daiRouCuiGu: ["硬质饮食"],
    hotpot_beefSlices: [],

    hotpot_target_clear: [],
    hotpot_target_spicy: ["辛辣饮食"],

    drink_softDrink: [],
    drink_lowAlcohol: ["饮酒"],
    drink_highAlcohol: ["高量饮酒"],
    drink_lemonWater: []
  },

  RISK_LEVEL_THRESHOLDS: {
    lowMax: 33,
    highMin: 42
  },

  RISK_LEVEL_LABELS: {
    low: "低危",
    medium: "中危",
    high: "高危"
  },

  DIMENSION_ENDPOINT_THRESHOLDS: {
    sensory: 56,
    rhythm: 43,
    specificity: 51,
    danger: 17
  },

  DIMENSION_ENDPOINTS: {
    sensory: { high: "V", low: "L" },
    rhythm: { high: "D", low: "O" },
    specificity: { high: "K", low: "C" },
    danger: { high: "G", low: "A" }
  }
};
