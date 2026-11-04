#!/usr/bin/env python3
"""Translate catalog.json (Chinese) -> products.ts (English) for the LAMBERT site."""
import json, re, os

SRC = os.path.expanduser('~/workspace/goals/goal/hidden_files/catalog/catalog.json')
IMG_DIR = os.path.expanduser('~/workspace/lambert-site/public/images/products')
OUT = os.path.expanduser('~/workspace/lambert-site/src/data/products.ts')

SERIES_EN = {
    '厨房五金': 'Kitchen Hardware',
    '轻享衣柜五金': 'Wardrobe Hardware',
    '马德里兰伯特五金': 'Madrid Series',
}
SERIES_TAG = {
    '厨房五金': '',
    '轻享衣柜五金': 'Light Series',
    '马德里兰伯特五金': '',
}
CAT_EN = {
    '地柜拉篮': 'Base Cabinet Pull-Out Baskets',
    '高柜拉篮': 'Tall Cabinet Pull-Outs',
    '吊柜系列': 'Wall Cabinet Storage',
    '角柜拉篮': 'Corner Cabinet Systems',
    '衣柜收纳': 'Wardrobe Storage',
}

# (pattern, english) — longest patterns first; matched against the name core
CORE_MAP = [
    ('地柜倾斜双层碗碟抽', 'Tilt-Out Double-Tier Dish Drawer'),
    ('地柜连动拉篮', 'Linked Base Cabinet Pull-Out'),
    ('高柜超能收纳舱食品收纳四边篮', 'Tall Storage Pod · Food Basket'),
    ('高柜超能收纳舱工具收纳四边篮', 'Tall Storage Pod · Tool Basket'),
    ('高柜超能收纳舱碗盘四边篮', 'Tall Storage Pod · Dish Basket'),
    ('高柜超能收纳舱红酒收纳四边篮', 'Tall Storage Pod · Wine Basket'),
    ('高柜超能收纳舱酒杯架', 'Tall Storage Pod · Wine Glass Rack'),
    ('高柜超能收纳舱锅具四边篮', 'Tall Storage Pod · Cookware Basket'),
    ('星移阁-角柜旋转系统-触控板控制', 'Corner Rotating System · Touch Panel'),
    ('星移阁-角柜旋转系统', 'Corner Rotating System'),
    ('拾光衣杆座-可调节衣杆座', 'Adjustable Rail Socket'),
    ('拾光衣杆座', 'Rail Socket'),
    ('挂衣杆L型转角底座', 'Hanging Rail L-Corner Socket'),
    ('挂衣杆T型转角底座', 'Hanging Rail T-Corner Socket'),
    ('挂衣杆中通底座', 'Hanging Rail Centre Socket'),
    ('挂衣杆底座', 'Hanging Rail Socket'),
    ('挂衣杆挂杆', 'Hanging Rail Bar'),
    ('挂衣杆端头', 'Hanging Rail End Cap'),
    ('曙光地电动升降挂衣杆', 'Electric Pull-Down Hanging Rail'),
    ('马德里电动升降挂衣杆', 'Electric Pull-Down Hanging Rail · Madrid'),
    ('升降挂衣杆', 'Pull-Down Hanging Rail'),
    ('纵向抽拉挂衣杆', 'Front-Pull Hanging Rail'),
    ('灵动岛-双向缓冲抽拉装置', 'Motion Island · Dual Soft-Close Pull-Out'),
    ('灵动台-单向缓冲抽拉装置', 'Motion Platform · Soft-Close Pull-Out'),
    ('灵动旋转柜-全角度旋转装置', 'Rotating Cabinet · Full-Swivel Unit'),
    ('叠立方-衣柜皮质分隔立', 'Leather Wardrobe Divider'),
    ('二合一摇表密码抽', 'Watch Winder + Lock Drawer'),
    ('抽屉指纹锁', 'Drawer Fingerprint Lock'),
    ('碗盘收纳架套装-单层', 'Dish Rack Kit · Single Tier'),
    ('碗盘收纳架套装-双层', 'Dish Rack Kit · Double Tier'),
    ('碗盘锅具篮套装', 'Dish & Cookware Basket Kit'),
    ('双层综合调料抽', 'Double-Tier Seasoning Drawer'),
    ('家政柜挂件套装', 'Utility Cabinet Accessory Kit'),
    ('扉纳阁SE-半柜标配款', 'Cabinet System SE · Half-Height'),
    ('扉纳阁SE-高柜镜子款', 'Cabinet System SE · Tall with Mirror'),
    ('扉纳阁SE-高柜餐边款', 'Cabinet System SE · Tall Sideboard'),
    ('扉纳阁SE-高柜标配款', 'Cabinet System SE · Tall'),
    ('扉纳阁SE', 'Cabinet System SE'),
    ('扉纳阁-半柜标配款', 'Cabinet System · Half-Height'),
    ('扉纳阁-高柜镜子款', 'Cabinet System · Tall with Mirror'),
    ('扉纳阁-高柜餐边款', 'Cabinet System · Tall Sideboard'),
    ('扉纳阁-高柜标配款', 'Cabinet System · Tall'),
    ('扉纳阁', 'Cabinet System'),
    ('云栖包托配件', 'Handbag Holder Accessory'),
    ('云栖帽架配件', 'Hat Rack Accessory'),
    ('云栖包包托', 'Handbag Holder'),
    ('云栖帽子架', 'Hat Rack'),
    ('云栖卡槽', 'Slot Divider'),
    ('星树帽架-半柜款', 'Hat Tree · Half-Height'),
    ('星树帽架-高柜款', 'Hat Tree · Tall'),
    ('星树帽架', 'Hat Tree'),
    ('旋转全身镜', 'Rotating Full-Length Mirror'),
    ('隐装全身镜', 'Concealed Full-Length Mirror'),
    ('隐匣·轨道遮挡帘', 'Concealed Track Curtain'),
    ('隐藏式垃圾桶', 'Concealed Pull-Out Waste Bin'),
    ('隐藏式衣纳篮', 'Concealed Laundry Basket'),
    ('多宝阁收纳篮', 'Multi-Compartment Storage Basket'),
    ('大容量收纳篮', 'High-Capacity Storage Basket'),
    ('内衣收纳篮', 'Lingerie Storage Basket'),
    ('超薄收纳篮', 'Slim Storage Basket'),
    ('超薄工具抽', 'Slim Tool Drawer'),
    ('多功能挂钩架', 'Multi-Function Hook Rack'),
    ('摩天轮鞋架-红外感应控制', 'Rotating Shoe Carousel · Infrared Sensor'),
    ('摩天轮鞋架', 'Rotating Shoe Carousel'),
    ('旋转鞋架-马德里系列纤薄款', 'Slim Rotating Shoe Rack · Madrid'),
    ('旋转鞋架-曙光地系列纤薄款', 'Slim Rotating Shoe Rack'),
    ('吊柜升降篮', 'Wall Cabinet Pull-Down Basket'),
    ('吊柜收纳舱', 'Wall Cabinet Storage Pod'),
    ('飞蝶左开', 'Butterfly Corner Carousel · Left'),
    ('飞蝶右开', 'Butterfly Corner Carousel · Right'),
    ('小怪物左开', 'Magic Corner Unit · Left'),
    ('小怪物右开', 'Magic Corner Unit · Right'),
    ('调料拉篮', 'Seasoning Pull-Out Basket'),
    ('抚云裤架', 'Trouser Rack'),
    ('裤架', 'Trouser Rack'),
    ('门纳篮', 'Door-Mounted Basket'),
    ('连动拉篮', 'Linked Pull-Out Basket'),
    ('高身拉篮', 'Tall Pull-Out Basket'),
    ('方寸台', 'Compact Pull-Out Shelf'),
    ('平飞抽', 'Flat Pull-Out Drawer'),
    ('旋飞篮', 'Swivel Carousel Basket'),
    ('密码抽', 'Combination-Lock Drawer'),
]

FINISH_MAP = [
    ('--雅致轻享款(日光金)', 'Light Series · Champagne Gold'),
    ('--雅致轻享款(儒雅灰)', 'Light Series · Matte Grey'),
    ('-曙光地系列日光金', 'Champagne Gold'),
    ('-马德里轻享-儒雅灰', 'Madrid Light Series · Matte Grey'),
    ('-马德里-儒雅灰', 'Madrid · Matte Grey'),
    ('-儒雅灰', 'Matte Grey'),
    ('--马德里雅致', 'Madrid'),
    ('-马德里雅致', 'Madrid'),
    ('-马德里系列儒雅灰', 'Madrid · Matte Grey'),
    ('--马德里系列儒雅灰', 'Madrid · Matte Grey'),
    ('-马德里雅致儒雅灰', 'Madrid · Matte Grey'),
    ('-马德里雅致磨砂黑', 'Madrid · Matte Black'),
    ('-马德里二代系列儒雅灰', 'Madrid II · Matte Grey'),
    ('-马德里-雅致', 'Madrid'),
    ('-曙光地-日光金-去面板款', 'Champagne Gold · No Front Panel'),
    ('-曙光地-日光金', 'Champagne Gold'),
    ('--曙光地轻享款', 'Light Series'),
    ('-曙光地轻享款', 'Light Series'),
    ('-日光金', 'Champagne Gold'),
    ('（一套2个）', '(Set of 2)'),
    ('（双桶）-灰色', 'Double Bin · Grey'),
    ('（双桶）-白色', 'Double Bin · White'),
    ('（单桶）-白色', 'Single Bin · White'),
    ('（定制）', 'Custom Size'),
]

def translate_name(cn):
    n = cn.strip()
    n = re.sub(r'^n(?=[\u4e00-\u9fff])', '', n)  # strip stray leading 'n'
    width = ''
    # width: "600mm", "600-700mm", "860×860" (no mm), then tier "8层", then stray digits
    m = re.match(r'^(\d+(?:[-–—]\d+)?)\s*mm', n)
    if not m:
        m = re.match(r'^(\d+\s*[×x]\s*\d+)', n)
    if m:
        width = m.group(1).replace(' ', '').replace('–', '-').replace('—', '-')
        if not width.endswith('mm'):
            width += 'mm'
        n = n[m.end():].strip()
        n = re.sub(r'^n(?=[\u4e00-\u9fff])', '', n)  # stray 'n' after width, e.g. 600mmn
    n = n.replace('兰伯特', '').replace('LAMBERT', '').strip(' -–—')
    finish = ''
    for pat, en in sorted(FINISH_MAP, key=lambda x: -len(x[0])):
        if pat in n:
            n = n.replace(pat, '')
            finish = (finish + ' · ' + en).strip(' ·') if finish else en
    n = n.strip(' -–—')
    # tier count like 8层/10层/12层/14层, or stray leading digits like 400灵动旋转柜
    tier = ''
    m2 = re.match(r'^(\d+)层', n)
    if m2:
        tier = m2.group(1) + '-Tier '
        n = n[m2.end():]
    else:
        m2b = re.match(r'^(\d+)(?=[\u4e00-\u9fff])', n)
        if m2b and not width:
            width = m2b.group(1) + 'mm'
            n = n[m2b.end():]
    core_en = None
    for pat, en in CORE_MAP:
        if n.startswith(pat):
            core_en = en
            rest = n[len(pat):].strip(' -–—')
            break
    if core_en is None:
        return None, f'UNTRANSLATED CORE: {n}'
    # parenthetical fit info e.g. 家政柜挂件套装（适用400-450mm宽柜体）
    fit = ''
    m3 = re.search(r'（适用(.+?)）', rest)
    if m3:
        fit = 'Fits ' + m3.group(1).replace('宽柜体', ' cabinets').replace('柜体', ' cabinets')
        rest = rest.replace(m3.group(0), '').strip()
    parts = [p for p in [width, 'LAMBERT', tier + core_en] if p]
    name = ' '.join(parts)
    extras = [e for e in [finish, fit, rest] if e]
    if extras:
        name += ' — ' + ' · '.join(extras)
    return name, ''

def translate_spec(cn):
    s = cn.strip()
    if not s: return ''
    s = s.replace('*', '×').replace('＜', '<').replace('＞', '>')
    s = re.sub(r'(\d+)mm柜体', r'Fits \1mm cabinets', s)
    s = re.sub(r'(?<![\d×x-])(\d{3,4})柜(?![\u4e00-\u9fff\w])', r'Fits \1mm cabinets', s)
    s = re.sub(r'^(\d+)层$', r'\1-Tier', s)
    s = re.sub(r'(\d+)mm长，(\d+)个挂钩', r'\1mm long · \2 hooks', s)
    s = s.replace('可自行裁切高度', 'height trimmable')
    s = re.sub(r'\bL(\d+)\s*[×x*]\s*W(\d+)\s*[×x*]\s*D(\d+)', r'L\1 × W\2 × D\3', s)
    s = re.sub(r'\bW(\d+)\s*[×x*]\s*H(\d+)\s*[×x*]\s*D(\d+)', r'W\1 × H\2 × D\3', s)
    s = s.replace('儒雅灰色', 'Matte Grey ·').replace('日光金色', 'Champagne Gold ·').replace('哑黑色', 'Matte Black ·')
    s = re.sub(r'(\d+)套/箱', r'\1 sets/carton', s)
    s = s.replace('一箱20根，', '20 pcs/carton · ').replace('每根长度3000mm', '3000mm each').replace('每根3000mm', '3000mm each')
    s = s.replace('单根，提供裁切服务', 'Sold per piece · cutting service available')
    s = re.sub(r'宽度(\d+)mm，厚度(\d+)mm，高度(\d+)mm', r'W\1 × T\2 × H\3mm', s)
    s = re.sub(r'高度(\d+)mm，宽度(\d+)mm', r'H\1 × W\2mm', s)
    s = re.sub(r'柜体净宽度：([\d\-–—]+)mm', r'Clear cabinet width: \1mm', s)
    s = re.sub(r'适配柜内宽度≤(\d+)mm', r'Fits cabinet interior width ≤\1mm', s)
    s = s.replace('卡槽可客户自行裁切宽度', 'slot trimmable by customer')
    s = re.sub(r'滑轨组件，滑轨长度(\d+)mm,铁板\+线性工业轨道', r'Slide assembly · \1mm slides · steel plate + linear track', s)
    s = re.sub(r'起订量≥(\d+)个', r'MOQ ≥ \1 pcs', s)
    s = s.replace('组件塑料直出处理', 'Components: direct plastic finish')
    s = s.replace('组件表面喷漆处理', 'Components: painted finish')
    s = s.replace('旋转180°打开，回旋转180°关闭。', 'Opens 180°, closes 180° ·')
    s = s.replace('可以360°无线旋转', '360° free rotation')
    s = s.replace('\n', ' · ')
    s = s.replace('一套底座共2个，顶侧装通用', 'Set of 2 sockets · universal top/side mount')
    s = re.sub(r'^\d+/米，', '', s)  # drop RMB per-metre pricing
    s = s.replace('不含底座，仅挂杆，', 'Rail only (no sockets) · ')
    s = s.replace('长度3000mm，可自行裁切', '3000mm · trimmable to length')
    s = s.replace('可自行裁切', 'trimmable to length')
    s = re.sub(r'适合([\d\-–—\s]+)mm宽柜体', r'Fits \1mm-wide cabinets', s)
    s = s.replace('（', '(').replace('）', ')')
    return s.strip(' ·')

def translate_note(cn):
    s = cn.strip()
    if not s: return ''
    s = s.replace('期货，起订量1套，交期20-30天', 'Made to order · MOQ 1 set · Lead time 20–30 days')
    s = re.sub(r'起订量：(\d+)，交货期：([\d\-–—]+)天', r'MOQ: \1 · Lead time \2 days', s)
    s = s.replace('期货', 'Made to order')
    s = s.replace('起订量', 'MOQ ')
    s = s.replace('交期', 'Lead time ')
    s = s.replace('套', 'sets')
    return s

rows = json.load(open(SRC, encoding='utf-8'))
imgs = set(os.listdir(IMG_DIR))
out_rows = []
untranslated = []
for r in rows:
    model = r['产品型号'].strip()
    name_en, err = translate_name(r['产品名称'])
    if err:
        untranslated.append((model, r['产品名称']))
        name_en = r['产品名称']  # fallback, will fix
    img_file = f'{model}.webp'
    out_rows.append({
        'model': model,
        'series': SERIES_EN.get(r['系列'], r['系列']),
        'seriesTag': SERIES_TAG.get(r['系列'], ''),
        'category': CAT_EN.get(r['产品分类'], r['产品分类']),
        'name': name_en,
        'spec': translate_spec(r['规格']),
        'unit': {'套': 'set', '个': 'pc', '根': 'pc'}.get(r['单位'], r['单位']),
        'madeToOrder': bool(r['期货']),
        'note': translate_note(r['备注']),
        'image': f'/images/products/{img_file}' if img_file in imgs else None,
    })

print(f'{len(out_rows)} products, {sum(1 for r in out_rows if r["image"])} with images')
print(f'UNTRANSLATED: {len(untranslated)}')
for m, n in untranslated[:20]:
    print('  ', m, n)

def ts_str(s):
    return "'" + s.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n').replace('\r', '') + "'"

lines = [
    '// Auto-generated from catalog.json — do not edit by hand.',
    '// Prices are NEVER included in this file.',
    'export interface Product {',
    '  model: string;',
    '  series: string;',
    '  seriesTag: string;',
    '  category: string;',
    '  name: string;',
    '  spec: string;',
    '  unit: string;',
    '  madeToOrder: boolean;',
    '  note: string;',
    '  image: string | null;',
    '}',
    '',
    'export const PRODUCTS: Product[] = [',
]
for r in out_rows:
    lines.append('  {')
    for k in ['model','series','seriesTag','category','name','spec','unit','note']:
        lines.append(f'    {k}: {ts_str(r[k])},')
    lines.append(f"    madeToOrder: {'true' if r['madeToOrder'] else 'false'},")
    lines.append(f"    image: {ts_str(r['image']) if r['image'] else 'null'},")
    lines.append('  },')
lines.append('];')
lines.append('')
lines.append('export const SERIES = [')
lines.append("  { id: 'kitchen', name: 'Kitchen Hardware', count: 62, blurb: 'Pull-out baskets, dish drawers, corner carousels and pull-down systems engineered for modern kitchens.', image: '/images/products/11.02.0011.webp' },")
lines.append("  { id: 'wardrobe', name: 'Wardrobe Hardware', tag: 'Light Series', count: 188, blurb: 'Trouser racks, shoe carousels, hanging rails and storage baskets for fitted wardrobes.', image: '/images/products/05.08.2260.webp' },")
lines.append("  { id: 'madrid', name: 'Madrid Series', count: 16, blurb: 'Slim-profile wardrobe storage in matte grey — our signature Madrid line.', image: '/images/products/05.08.1260.webp' },")
lines.append('];')
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf-8').write('\n'.join(lines) + '\n')
print('wrote', OUT)
