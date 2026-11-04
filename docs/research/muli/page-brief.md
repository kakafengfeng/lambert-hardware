# MULI（木里木外）首页复刻简报

- 源站：https://www.muli.group/（中国高端定制家居品牌官网）
- 本地路由：`/`（模板首页直接替换）
- 组件：`src/components/sites/muli/`（SiteHeader/Hero/LacquerBanner/ProductCarousel/Manifesto/News/Stores/SiteFooter/BackToTop/Reveal）
- 素材：`public/sites/muli/`（图片 + hero.mp4/banner.mp4，均来自源站 CDN `wm.cdn.cn86.cn/mulimuwaiz`）
- 未克隆的子页面路由（页眉/页脚/卡片链接指向源站，已在交付中说明）

## 还原要点

- 页眉 absolute 非 sticky，hover 整条变米色 + logo/文字反色；导航 hover 展开全宽巨型下拉（scaleY）
- Hero 100vh 静音自动循环视频；大漆横幅为封面 + 播放按钮，点击播放
- 产品区为横向卡片 + 可拖拽细滚动条 + 自动播放
- 品牌宣言深棕底 #3f3025；新闻三栏 hover 放大；体验店全屏底图 + 10 城市
- 移动端 <lg：白色 fixed 顶栏 + 全屏滑入菜单（手风琴子菜单）
- 字体：源站 HarmonyOS Sans SC 的 CDN 已 503，本地用系统字体栈回退（与源站当前实际渲染一致）
- 动效：WOW 式滚动淡入用 IntersectionObserver 实现；Lenis 惯性滚动未复刻（改用原生滚动）

## 已知差异

- 宣言区三段文案为意译改写（非逐字复制）
- 抖音/视频号图标源站 CDN 404，改用 Lucide 图标代替
- 未复刻：cookie 提示条、/eventSend 行为埋点、站内搜索后端
