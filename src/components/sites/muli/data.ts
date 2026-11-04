export const SOURCE = "https://www.muli.group";
const ASSET = "https://wm.cdn.cn86.cn/mulimuwaiz";

export interface SubLink {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children: SubLink[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "关于",
    href: `${SOURCE}/about`,
    children: [
      { label: "关于MULI", href: `${SOURCE}/about` },
      { label: "工厂", href: `${SOURCE}/factory` },
      { label: "合作设计师", href: `${SOURCE}/designer` },
    ],
  },
  {
    label: "品牌资讯",
    href: `${SOURCE}/news`,
    children: [
      { label: "品牌新闻", href: `${SOURCE}/news/pin-pai-zi-xun` },
      { label: "品牌活动", href: `${SOURCE}/news/activity` },
    ],
  },
  {
    label: "产品",
    href: `${SOURCE}/product`,
    children: [
      { label: "收纳", href: `${SOURCE}/product/shou-na` },
      { label: "门", href: `${SOURCE}/product/men` },
      { label: "护墙", href: `${SOURCE}/product/hu-qiang` },
      { label: "厨房", href: `${SOURCE}/product/chu-fang` },
      { label: "智能", href: `${SOURCE}/product/zhi-neng` },
      { label: "大漆艺术系列", href: `${SOURCE}/product/jia-ju` },
    ],
  },
  {
    label: "经典案例",
    href: `${SOURCE}/case`,
    children: [{ label: "落地项目", href: `${SOURCE}/case/1` }],
  },
  {
    label: "全国体验店",
    href: `${SOURCE}/album/quan-guo-ti-yan-dian`,
    children: [],
  },
  {
    label: "联系我们",
    href: `${SOURCE}/contact`,
    children: [],
  },
];

export const LANGS: SubLink[] = [
  { label: "中文", href: "https://www.muli.group/" },
  { label: "English", href: "https://en.muli.group/" },
  { label: "Español", href: "https://es.muli.group/" },
  { label: "Русский", href: "https://ru.muli.group/" },
  { label: "العربية", href: "https://ar.muli.group/" },
];

export interface Product {
  title: string;
  image: string;
  href: string;
}

export const PRODUCTS: Product[] = [
  { title: "收纳", image: `${ASSET}/2026/07/feeaeb1d1f4xmvro.jpg`, href: `${SOURCE}/product/shou-na` },
  { title: "门", image: `${ASSET}/2026/07/8f1762dd9bjp2gau.jpg`, href: `${SOURCE}/product/men` },
  { title: "护墙", image: `${ASSET}/2026/07/c281d54792ptddjh.jpg`, href: `${SOURCE}/product/hu-qiang` },
  { title: "厨房", image: `${ASSET}/2026/07/de3288d1eci2g42n.jpg`, href: `${SOURCE}/product/chu-fang` },
  { title: "智能", image: `${ASSET}/2026/07/2f58d7cf81xt151z.jpg`, href: `${SOURCE}/product/zhi-neng` },
  { title: "单品", image: `${ASSET}/2026/07/e443f556a0rylj18.jpg`, href: `${SOURCE}/product/jia-ju` },
];

export interface NewsItem {
  date: string;
  title: string;
  image: string;
  href: string;
}

export const NEWS: NewsItem[] = [
  {
    date: "2026-07-13",
    title: "木里木外十周年荣耀盛典",
    image: `${ASSET}/2026/07/ca505cd7adlpdvcn.jpg`,
    href: `${SOURCE}/news/mu-li-mu-wai-shi-zhou-nian-rong-yao-sheng-dian.html`,
  },
  {
    date: "2026-07-13",
    title: "木里木外·故宫·源邸 传奇揭幕",
    image: `${ASSET}/2026/07/a7dc677fd21qspzf.jpg`,
    href: `${SOURCE}/news/mu-li-mu-wai-gu-gong-yuan-di-chuan-qi-jie-mu.html`,
  },
  {
    date: "2026-07-13",
    title: "拾年树木 愈沙成洲 2026木里木外沙漠绿洲计划",
    image: `${ASSET}/2026/07/1b24ac2febwbsapk.jpg`,
    href: `${SOURCE}/news/shi-nian-shu-mu-yu-sha-cheng-zhou-2026-mu-li-mu-wai-sha-mo-lyu-zhou-ji-hua.html`,
  },
];

export const CITIES: string[] = [
  "北京",
  "上海",
  "佛山",
  "杭州",
  "无锡",
  "深圳",
  "青岛",
  "西安",
  "南京",
  "香港",
];

export interface SocialIcon {
  name: string;
  image?: string;
  lucide?: "music" | "play";
  href: string;
  qr?: string;
}

export const SOCIALS: SocialIcon[] = [
  { name: "Facebook", image: `${ASSET}/2026/06/d51a51acadwzvkz2.png`, href: `${SOURCE}` },
  { name: "Instagram", image: `${ASSET}/2026/06/65d1a77df2g647yt.png`, href: `${SOURCE}` },
  { name: "Pinterest", image: `${ASSET}/2026/06/afe66845d5ofdqyz.png`, href: `${SOURCE}` },
  { name: "微信", image: `${ASSET}/2026/06/e9451f322duwv7u3.png`, href: `${SOURCE}`, qr: `${ASSET}/2026/08/a6c6bfe565ogwhem.jpg` },
  { name: "小红书", image: `${ASSET}/2026/06/3f4b9e1251dtkzot.png`, href: `${SOURCE}` },
  { name: "抖音", lucide: "music", href: `${SOURCE}`, qr: `${ASSET}/2026/08/bd44205c9alt9g0f.jpg` },
  { name: "视频号", lucide: "play", href: `${SOURCE}`, qr: `${ASSET}/2026/08/44f15d84e2otapi5.jpg` },
];

export const CONTACT = {
  phone: "400 898 0928",
  email1: "pinpai@muli.group",
  email2: "investment@muli.group",
};
