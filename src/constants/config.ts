enum Fonts {
  digital = 'digital-7',
}

const GlobalIndexes = {
  asia: {
    name: '亚洲',
    value: [
      {
        name: '红筹指数',
        value: '124.HSCCI',
      },
      {
        name: '国企指数',
        value: '100.HSCEI',
      },
      {
        name: '恒生指数',
        value: '100.HSI',
      },
      {
        name: '巴基斯坦卡拉奇',
        value: '100.KSE100',
      },
      {
        name: '斯里兰卡科伦坡',
        value: '100.CSEALL',
      },
      {
        name: '印度孟买SENSEX',
        value: '100.SENSEX',
      },
      {
        name: '富时马来西亚KLCI',
        value: '100.KLSE',
      },
      {
        name: '沪深300',
        value: '1.000300',
      },
      {
        name: '富时新加坡海峡时报',
        value: '100.STI',
      },
      {
        name: '泰国SET',
        value: '100.SET',
      },
      {
        name: '台湾加权',
        value: '100.TWII',
      },
      {
        name: '上证指数',
        value: '1.000001',
      },
      {
        name: '韩国KOSPI200',
        value: '100.KOSPI200',
      },
      {
        name: '韩国KOSPI',
        value: '100.KS11',
      },
      {
        name: '中小100',
        value: '0.399005',
      },
      {
        name: '越南胡志明',
        value: '100.VNINDEX',
      },
      {
        name: '印尼雅加达综合',
        value: '100.JKSE',
      },
      {
        name: '深证成指',
        value: '0.399001',
      },
      {
        name: '创业板指',
        value: '0.399006',
      },
      {
        name: '菲律宾马尼拉',
        value: '100.PSI',
      },
      {
        name: '日经225',
        value: '100.N225',
      },
    ],
  },
  europe: {
    name: '欧洲',
    value: [
      {
        name: 'OMX哥本哈根20',
        value: '100.OMXC20',
      },
      {
        name: '瑞士SMI',
        value: '100.SSMI',
      },
      {
        name: '富时意大利MIB',
        value: '100.MIB',
      },
      {
        name: '爱尔兰综合',
        value: '100.ISEQ',
      },
      {
        name: '英国富时100',
        value: '100.FTSE',
      },
      {
        name: '西班牙IBEX35',
        value: '100.IBEX',
      },
      {
        name: '荷兰AEX',
        value: '100.AEX',
      },
      {
        name: '比利时BFX',
        value: '100.BFX',
      },
      {
        name: '欧洲斯托克50',
        value: '100.SX5E',
      },
      {
        name: '芬兰赫尔辛基',
        value: '100.HEX',
      },
      {
        name: '法国CAC40',
        value: '100.FCHI',
      },
      {
        name: '葡萄牙PSI20',
        value: '100.PSI20',
      },
      {
        name: '希腊雅典ASE',
        value: '100.ASE',
      },
      {
        name: '德国DAX30',
        value: '100.GDAXI',
      },
      {
        name: '布拉格指数',
        value: '100.PX',
      },
      {
        name: '瑞典OMXSPI',
        value: '100.OMXSPI',
      },
      {
        name: '英国富时250',
        value: '100.MCX',
      },
      {
        name: '挪威OSEBX',
        value: '100.OSEBX',
      },
      {
        name: '奥地利ATX',
        value: '100.ATX',
      },
      {
        name: '富时AIM全股',
        value: '100.AXX',
      },
      {
        name: '冰岛ICEX',
        value: '100.ICEXI',
      },
      {
        name: '俄罗斯RTS',
        value: '100.RTS',
      },
      {
        name: '波兰WIG',
        value: '100.WIG',
      },
    ],
  },
  america: {
    name: '美洲',
    value: [
      {
        name: '巴西BOVESPA',
        value: '100.BVSP',
      },
      {
        name: '墨西哥BOLSA',
        value: '100.MXX',
      },
      {
        name: '道琼斯',
        value: '100.DJIA',
      },
      {
        name: '加拿大S&P/TSX',
        value: '100.TSX',
      },
      {
        name: '标普500',
        value: '100.SPX',
      },
      {
        name: '纳斯达克',
        value: '100.NDX',
      },
    ],
  },
  australia: {
    name: '澳洲',
    value: [
      {
        name: '澳大利亚普通股',
        value: '100.AORD',
      },
      {
        name: '澳大利亚标普200',
        value: '100.AS51',
      },
      {
        name: '新西兰50',
        value: '100.NZ50',
      },
    ],
  },
  extra: {
    name: '其他',
    value: [
      {
        name: '美元指数',
        value: '100.UDI',
      },
      {
        name: '路透CRB商品指数',
        value: '100.CRB',
      },
      {
        name: '波罗的海BDI指数',
        value: '100.BDI',
      },
    ],
  },
};

const BooksTemplates = [
  {
    label: '橙🍊风破浪',
    value: '#fe953a',
  },
  {
    label: '富得流🥝油',
    value: '#90c052',
  },
  {
    label: '桃🍑气满满',
    value: '#e4a5a3',
  },
  {
    label: '禁止焦🍌绿',
    // value: '#d5efc4',
    value: '#fcbc25',
  },
  {
    label: '莓🫐好时光',
    value: '#7758ad',
  },
  {
    label: '前程柿🍅锦',
    value: '#d0221b',
  },
  {
    label: '一椰🥥暴富',
    value: '#94532c',
  },
];

const CContinuedTradingIndexes = [
  {
    icon: require('../assets/images/other/beans.png'),
    label: '黄金',
    value: '118.AU9999',
  },
  {
    icon: require('../assets/images/other/cash_v10.png'),
    label: '中国10年期国债',
    value: '171.CN10Y',
  },
  {
    icon: require('../assets/images/other/cash_v30.png'),
    label: '中国30年期国债',
    value: '171.CN30Y',
  },
  {
    icon: require('../assets/images/other/cash_us.png'),
    label: '美元兑人民币汇率',
    value: '133.USDCNH',
  },
  {
    icon: require('../assets/images/other/cash_jp.png'),
    label: '人民币兑日元汇率',
    value: '120.JPYCNYC',
  },
];

const CIncomes = [
  {id: '', emoji: '🍲', label: '餐饮', value: '', icon: ''},
  {id: '', emoji: '🛍', label: '购物', value: '', icon: ''},
  {id: '', emoji: '🏪', label: '日用', value: '', icon: ''},
  {id: '', emoji: '🚎', label: '交通', value: '', icon: ''},
  {id: '', emoji: '🥗', label: '蔬菜', value: '', icon: ''},
  {id: '', emoji: '🍹', label: '饮品', value: '', icon: ''},
  {id: '', emoji: '🍭', label: '零食', value: '', icon: ''},
  {id: '', emoji: '👘', label: '服饰', value: '', icon: ''},
  {id: '', emoji: '🛵', label: '外卖', value: '', icon: ''},
  {id: '', emoji: '🧺', label: '买菜', value: '', icon: ''},
  {id: '', emoji: '🏓', label: '运动', value: '', icon: ''},
  {id: '', emoji: '🎳', label: '娱乐', value: '', icon: ''},
  {id: '', emoji: '📲', label: '话费', value: '', icon: ''},
  {id: '', emoji: '👠', label: '美容', value: '', icon: ''},
  {id: '', emoji: '🏘', label: '房租', value: '', icon: ''},
  {id: '', emoji: '🏚', label: '房贷', value: '', icon: ''},
  {id: '', emoji: '🛖', label: '住房', value: '', icon: ''},
  {id: '', emoji: '🍻', label: '社交', value: '', icon: ''},
  {id: '', emoji: '🎁', label: '礼物', value: '', icon: ''},
  {id: '', emoji: '🍇', label: '水果', value: '', icon: ''},
  {id: '', emoji: '🏝', label: '旅行', value: '', icon: ''},
  {id: '', emoji: '🍶', label: '烟酒', value: '', icon: ''},
  {id: '', emoji: '📦', label: '快递', value: '', icon: ''},
  {id: '', emoji: '🎟', label: '追星', value: '', icon: ''},
  {id: '', emoji: '🎮', label: '游戏', value: '', icon: ''},
  {id: '', emoji: '📸', label: '数码', value: '', icon: ''},
  {id: '', emoji: '🎞', label: '电影', value: '', icon: ''},
  {id: '', emoji: '🚚', label: '汽车', value: '', icon: ''},
  {id: '', emoji: '🏍', label: '摩托', value: '', icon: ''},
  {id: '', emoji: '⛽️', label: '加油', value: '', icon: ''},
  {id: '', emoji: '🏥', label: '医疗', value: '', icon: ''},
  {id: '', emoji: '🔬', label: '学习', value: '', icon: ''},
  {id: '', emoji: '📰', label: '书籍', value: '', icon: ''},
  {id: '', emoji: '🐠', label: '宠物', value: '', icon: ''},
  {id: '', emoji: '🌦', label: '水费', value: '', icon: ''},
  {id: '', emoji: '🌩', label: '电费', value: '', icon: ''},
  {id: '', emoji: '🔥', label: '燃气', value: '', icon: ''},
  {id: '', emoji: '🍼', label: '育儿', value: '', icon: ''},
  {id: '', emoji: '🧓', label: '长辈', value: '', icon: ''},
  {id: '', emoji: '⏳', label: '租赁', value: '', icon: ''},
  {id: '', emoji: '📠', label: '办公', value: '', icon: ''},
  {id: '', emoji: '🚧', label: '维修', value: '', icon: ''},
  {id: '', emoji: '🧧', label: '红包', value: '', icon: ''},
  {id: '', emoji: '🎰', label: '彩票', value: '', icon: ''},
  {id: '', emoji: '🕊', label: '捐赠', value: '', icon: ''},
  {id: '', emoji: '🎊', label: '礼金', value: '', icon: ''},
  {id: '', emoji: '💰', label: '转账', value: '', icon: ''},
  {id: '', emoji: '💳', label: '还款', value: '', icon: ''},
  {id: '', emoji: '💸', label: '借出', value: '', icon: ''},
  {id: '', emoji: '🎲', label: '麻将', value: '', icon: ''},
  {id: '', emoji: '🪙', label: '其他', value: '', icon: ''},
];

export {
  Fonts,
  GlobalIndexes,
  BooksTemplates,
  CContinuedTradingIndexes,
  CIncomes,
};
