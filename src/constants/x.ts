import {
  Dimensions,
  FlexStyle,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {customAlphabet} from 'nanoid/non-secure';
const F = 'F';
const f = (params: any) => {};
const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

const Strings = {
  mask: (s: string, keepLength: number, filledString?: string) => {
    if (s.length <= keepLength * 2) return s;
    const start = s.slice(0, keepLength);
    const end = s.slice(-keepLength);
    return `${start}${
      filledString || '*'.repeat(s.length - keepLength * 2)
    }${end}`;
  },
  renderUpOrDown: (n: number) => {
    return n > 0 ? '↗' : n < 0 ? '↘' : '';
  },
  /**
   * Youtube视频ID的生成规则
   * 64^11≈73.8×10^18 -> 约 73 亿亿种可能性
   * @param length
   * @returns
   */
  uuid: (length?: number) => {
    const charset = ['_', '-']
      .concat(
        Array.from(
          {length: 26},
          (_, i) =>
            `${String.fromCharCode(i + 65)}${String.fromCharCode(i + 97)}`,
        ),
      )
      .concat(Array.from({length: 10}, (_, i) => `${i}`))
      .join('');
    const id = customAlphabet(charset, length || 11);
    return id();
  },
};

const styles = StyleSheet.create({
  card: {
    // iOS 阴影
    shadowColor: '#333',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    // Android 阴影
    elevation: 1,
    backgroundColor: 'white',
    zIndex: 1,
  },
  fill: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});

const Touchable = {
  OPACITY: 0.8,
  hitlop: (n?: number) => {
    let _n = n || 12;
    return {top: _n, bottom: _n, left: _n, right: _n};
  },
};

const scale = (n: number) => {
  return (WIDTH / 375) * n;
  // return PixelRatio.roundToNearestPixel(n);
};

const Fonts = {
  NotoSansJP: 'NotoSansJP-Medium',
  NotoSerifJP: 'NotoSerifJP-Medium',
};

const Colors = {
  hex2Rgba: (hex: string, alpha?: number) => {
    // 去除 # 号
    hex = hex.replace('#', '');
    // 将 hex 转换为 rgba
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha || 1})`;
  },
  STOCK: (n: number) => {
    return n > 0 ? Color.RED : n < 0 ? Color.GREEN : '#ccc';
  },
};

const Color = {
  PAGE: '#eee',
  RED: '#f20c00',
  GREEN: '#0c8918',
  BLUE: '#177cb0',
};

const Time = {
  HHmmss: (seconds: number) => {
    let h = Math.floor(seconds / 60 / 60);
    let m = Math.floor((seconds / 60) % 60);
    let s = Math.floor(seconds % 60);
    const withZero = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    return `${withZero(m)}:${withZero(s)}`;
  },
};
const Styles = {
  FILL: styles.fill,
  rowCenter: (justifyContent?: FlexStyle['justifyContent']) => {
    return <StyleProp<ViewStyle>>{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: justifyContent ?? 'space-between',
    };
  },
  circle: (n: number, backgroundColor: string) => {
    return <StyleProp<ViewStyle>>{
      borderRadius: n / 2,
      height: n,
      width: n,
      backgroundColor,
    };
  },
  CARD: styles.card,
};

const Links = {
  previewPdf: (url: string) =>
    `https://mozilla.github.io/pdf.js/web/viewer.html?file=${url}`,
  stockDetail: (code: string) =>
    `https://wap.eastmoney.com/quote/stock/${code}.html`,
  fundDetail: (code: string) =>
    `https://h5.1234567.com.cn/app/fund-details/?fCode=${code}`,
  /**
   * 走势曲线
   * @param code 0.899050
   * @returns
   */
  previewStockChart: (code: string) =>
    `https://webquotepic.eastmoney.com/GetPic.aspx?imageType=r&type=&nid=${code}`,
};

const COLORS = [
  {label: '粉红', value: '#ffb3a7'},
  {label: '妃色', value: '#ed5736'},
  {label: '品红', value: '#f00056'},
  {label: '桃红', value: '#f47983'},
  {label: '海棠红', value: '#db5a6b'},
  {label: '石榴红', value: '#f20c00'},
  {label: '樱桃色', value: '#c93756'},
  {label: '银红', value: '#f05654'},
  {label: '大红', value: '#ff2121'},
  {label: '绛紫', value: '#8c4356'},
  {label: '绯红', value: '#c83c23'},
  {label: '胭脂', value: '#9d2933'},
  {label: '朱红', value: '#ff4c00'},
  {label: '丹', value: '#ff4e20'},
  {label: '彤', value: '#f35336'},
  {label: '茜色', value: '#cb3a56'},
  {label: '火红', value: '#ff2d51'},
  {label: '赫赤', value: '#c91f37'},
  {label: '嫣红', value: '#ef7a82'},
  {label: '洋红', value: '#ff0097'},
  {label: '炎', value: '#ff3300'},
  {label: '赤', value: '#c3272b'},
  {label: '绾', value: '#a98175'},
  {label: '枣红', value: '#c32136'},
  {label: '檀', value: '#b36d61'},
  {label: '殷红', value: '#be002f'},
  {label: '酡红', value: '#dc3023'},
  {label: '酡颜', value: '#f9906f'},
  {label: '鹅黄', value: '#fff143'},
  {label: '鸭黄', value: '#faff72'},
  {label: '樱草色', value: '#eaff56'},
  {label: '杏黄', value: '#ffa631'},
  {label: '杏红', value: '#ff8c31'},
  {label: '橘黄', value: '#ff8936'},
  {label: '橙黄', value: '#ffa400'},
  {label: '橘红', value: '#ff7500'},
  {label: '姜黄', value: '#ffc773'},
  {label: '缃色', value: '#f0c239'},
  {label: '橙色', value: '#fa8c35'},
  {label: '茶色', value: '#b35c44'},
  {label: '驼色', value: '#a88462'},
  {label: '昏黄', value: '#c89b40'},
  {label: '栗色', value: '#60281e'},
  {label: '棕色', value: '#b25d25'},
  {label: '棕绿', value: '#827100'},
  {label: '棕黑', value: '#7c4b00'},
  {label: '棕红', value: '#9b4400'},
  {label: '棕黄', value: '#ae7000'},
  {label: '赭', value: '#9c5333'},
  {label: '赭色', value: '#955539'},
  {label: '琥珀', value: '#ca6924'},
  {label: '褐色', value: '#6e511e'},
  {label: '枯黄', value: '#d3b17d'},
  {label: '黄栌', value: '#e29c45'},
  {label: '秋色', value: '#896c39'},
  {label: '秋香色', value: '#d9b611'},
  {label: '嫩绿', value: '#bddd22'},
  {label: '柳黄', value: '#c9dd22'},
  {label: '柳绿', value: '#afdd22'},
  {label: '竹青', value: '#789262'},
  {label: '葱黄', value: '#a3d900'},
  {label: '葱绿', value: '#9ed900'},
  {label: '葱青', value: '#0eb83a'},
  {label: '葱倩', value: '#0eb840'},
  {label: '青葱', value: '#0aa344'},
  {label: '油绿', value: '#00bc12'},
  {label: '绿沈', value: '#0c8918'},
  {label: '碧色', value: '#1bd1a5'},
  {label: '碧绿', value: '#2add9c'},
  {label: '青碧', value: '#48c0a3'},
  {label: '翡翠色', value: '#3de1ad'},
  {label: '草绿', value: '#40de5a'},
  {label: '青色', value: '#00e09e'},
  {label: '青翠', value: '#00e079'},
  {label: '青白', value: '#c0ebd7'},
  {label: '鸭卵青', value: '#e0eee8'},
  {label: '蟹壳青', value: '#bbcdc5'},
  {label: '鸦青', value: '#424c50'},
  {label: '绿色', value: '#00e500'},
  {label: '豆绿', value: '#9ed048'},
  {label: '豆青', value: '#96ce54'},
  {label: '石青', value: '#7bcfa6'},
  {label: '玉色', value: '#2edfa3'},
  {label: '缥', value: '#7fecad'},
  {label: '艾绿', value: '#a4e2c6'},
  {label: '松柏绿', value: '#21a675'},
  {label: '松花绿', value: '#057748'},
  {label: '松花色', value: '#bce672'},
  {label: '蓝', value: '#44cef6'},
  {label: '靛青', value: '#177cb0'},
  {label: '靛蓝', value: '#065279'},
  {label: '碧蓝', value: '#3eede7'},
  {label: '蔚蓝', value: '#70f3ff'},
  {label: '宝蓝', value: '#4b5cc4'},
  {label: '蓝灰色', value: '#a1afc9'},
  {label: '藏青', value: '#2e4e7e'},
  {label: '藏蓝', value: '#3b2e7e'},
  {label: '黛', value: '#4a4266'},
  {label: '黛绿', value: '#426666'},
  {label: '黛蓝', value: '#425066'},
  {label: '黛紫', value: '#574266'},
  {label: '紫色', value: '#8d4bbb'},
  {label: '紫酱', value: '#815463'},
  {label: '酱紫', value: '#815476'},
  {label: '紫檀', value: '#4c221b'},
  {label: '绀青绀紫', value: '#003371'},
  {label: '紫棠', value: '#56004f'},
  {label: '青莲', value: '#801dae'},
  {label: '群青', value: '#4c8dae'},
  {label: '雪青', value: '#b0a4e3'},
  {label: '丁香色', value: '#cca4e3'},
  {label: '藕色', value: '#edd1d8'},
  {label: '藕荷色', value: '#e4c6d0'},
  {label: '苍色', value: '#75878a'},
  {label: '苍翠', value: '#519a73'},
  {label: '苍黄', value: '#a29b7c'},
  {label: '苍青', value: '#7397ab'},
  {label: '苍黑', value: '#395260'},
  {label: '苍白', value: '#d1d9e0'},
  {label: '水色', value: '#88ada6'},
  {label: '水红', value: '#f3d3e7'},
  {label: '水绿', value: '#d4f2e7'},
  {label: '水蓝', value: '#d2f0f4'},
  {label: '淡青', value: '#d3e0f3'},
  {label: '湖蓝', value: '#30dff3'},
  {label: '湖绿', value: '#25f8cb'},
  {label: '精白', value: '#ffffff'},
  {label: '象牙白', value: '#fffbf0'},
  {label: '雪白', value: '#f2fdff'},
  {label: '月白', value: '#d6ecf0'},
  {label: '缟', value: '#f2ecde'},
  {label: '素', value: '#e0f0e9'},
  {label: '荼白', value: '#f3f9f1'},
  {label: '霜色', value: '#e9f1f6'},
  {label: '花白', value: '#c2ccd0'},
  {label: '鱼肚白', value: '#fcefe8'},
  {label: '莹白', value: '#e3f9fd'},
  {label: '灰色', value: '#808080'},
  {label: '牙色', value: '#eedeb0'},
  {label: '铅白', value: '#f0f0f4'},
  {label: '玄色', value: '#622a1d'},
  {label: '玄青', value: '#3d3b4f'},
  {label: '乌色', value: '#725e82'},
  {label: '乌黑', value: '#392f41'},
  {label: '漆黑', value: '#161823'},
  {label: '墨色', value: '#50616d'},
  {label: '墨灰', value: '#758a99'},
  {label: '黑色', value: '#000000'},
  {label: '缁色', value: '#493131'},
  {label: '煤黑', value: '#312520'},
  {label: '黧', value: '#5d513c'},
  {label: '黎', value: '#75664d'},
  {label: '黝', value: '#6b6882'},
  {label: '黝黑', value: '#665757'},
  {label: '黯', value: '#41555d'},
  {label: '赤金', value: '#f2be45'},
  {label: '金色', value: '#eacd76'},
  {label: '银白', value: '#e9e7ef'},
  {label: '老银', value: '#bacac6'},
  {label: '乌金', value: '#a78e44'},
  {label: '铜绿', value: '#549688'},
];
const x = {
  F,
  f,
  HEIGHT,
  WIDTH,
  scale,
  Touchable,
  Fonts,
  Color,
  Styles,
  Time,
  Links,
  COLORS,
  Colors,
  Strings,
};

export default x;
