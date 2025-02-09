import {z} from 'zod';

export interface RealTimePrice {
  /** 股票价格 * 1000 */
  f43?: number;
  /** 股票代号 */
  f57?: string;
  /** 股票名字 */
  f58?: string;
  /** 当前净值 */
  f60?: number;
  /** 成交量 */
  f47?: number;
  /** 成交额 */
  f48?: number;
  /** 精度 */
  f59?: number;
  /** 时间 */
  f86?: number;
  /** 几级市场 */
  f107?: number;
  /** 涨跌额 */
  f169?: number;
  /** 涨跌幅 */
  f170?: number;
  /** 详情接口或者图片趋势的时候用 */
  code?: string;
}

export interface RealtimeCount {
  /** 涨跌额 */
  f3: number;
  /** 股票代码 */
  f12: string;
  /** 涨 跌 平 */
  f104: number;
  f105: number;
  f106: number;
}

export interface SearchStockResult {
  code: string;
  innerCode: string;
  shortName: string;
  market: number; // ?.code
  pinyin: string;
  securityType: number[];
  securityTypeName: string; // 什么市场 沪A/深A
  smallType: number;
  status: number;
  flag: number;
  extSmallType: number;
}

export const UserSchema = z.object({
  id: z.string().default(""),
  name: z.string().default("请登录"),
  password: z.string().default(""),
  avatar: z.string().default("https://cctv3.net/i.gif"),
  createTime: z.string().default(() => new Date().toISOString()),
  updateTime: z.string().default(() => new Date().toISOString()),
});

export type User = z.infer<typeof UserSchema>;

export enum LoginInputAction {
  id,
  password,
}

export enum EnvKeys {
  HOST = 0,
}

export const PropertySchema = z.object({
  _id: z.string().default(''),
  id: z.string().default(''),
  wechat: z.string().default(''),
  alipay: z.string().default(''),
  unionpay: z.array(z.string()).default([]),
  cash: z.string().default(''),
  carpooling: z.array(z.string()).default([]),
  eastmoney: z.string().default(''),
  housefund: z.string().default(''),
  createTime: z.number().default(Date.now()),
  settleDate: z.number().default(Date.now()),
  updateTime: z.number().default(Date.now()),
  total: z.string().default('0'),
  userId: z.string().default(''),
});

export type Property = z.infer<typeof PropertySchema>;

export interface OtherCountryStock {
  f1: number;
  f2: number; // 净值
  f3: number; // 涨跌幅
  f4: number;
  f12: string; // 英文
  f13: number;
  f14: string; // 中文
  f152: number;
}

export interface PaginationProps {
  currentPage: number;
  pageSize: number;
}

export const JiraSchema = z.object({
  id: z.string().default(''),
  title: z.string().default(''),
  message: z.string().default(''),
  people: z.array(z.string()).default([]),
  version: z.string().default(''),
  complexity: z.number().default(0),
  completeDate: z.number().default(new Date().getTime()),
  updateTime: z.number().default(0),
  createTime: z.number().default(0),
  userId: z.string().default(''),
});

export type Jira = z.infer<typeof JiraSchema>;

export const PasswordSchema = z.object({
  id: z.string().default(''),
  title: z.string().default(''),
  message: z.string().default(''),
  name: z.string().default(''),
  password: z.string().default(''),
  platform: z.string().default(''),
  updateTime: z.number().default(0),
  createTime: z.number().default(0),
  link: z.string().default(''),
  userId: z.string().default(''),
});

export const ChapterSchema = z.object({
  id: z.string().default(''),
  seriesId: z.string().default(''),
  cctvGuid: z.string().default(''),
  cctvId: z.string().default(''),
  title: z.string().default(''),
  message: z.string().default(''),
  cover: z.string().default(''),
  brief: z.string().default(''),
  duration: z.string().default(''),
  m3u8: z.string().default(''),
  link: z.string().default(''),
  status: z.enum(["-1", "0", "1", "2"]).transform(Number).default('0'),
  focusTime: z.number().default(0),
  updateTime: z.number().default(0),
  createTime: z.number().default(0),
});

export const SeriesSchema = z.object({
  id: z.string().default(""),
  teacherId: z.string().default(""),
  title: z.string().default(""),
  message: z.string().default(""),
  cover: z.string().default(""),
  brief: z.string().default(""),
  debut: z.number().int().default(0),
  status: z.number().int().default(0),
  createTime: z.number().int().default(0),
  updateTime: z.number().int().default(0),
});

export const TeacherSchema = z.object({
  id: z.string().default(""),
  name: z.string().default(""),
  avatar: z.string().default(""),
  title: z.string().default(""),
  message: z.string().default(""),
  createTime: z.number().int().default(0),
  updateTime: z.number().int().default(0),
  status: z.number().int().default(0),
});

export type Teacher = z.infer<typeof TeacherSchema>;
export type Series = z.infer<typeof SeriesSchema>;
export type Chapter = z.infer<typeof ChapterSchema>;
export type Password = z.infer<typeof PasswordSchema>;
