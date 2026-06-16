/* ═══════════════════════════════════════════
   宿舍极简物品管理 - 纯原生 JavaScript 版本
   ═══════════════════════════════════════════ */

/* ===== SECTION 1: 全局常量与配置 ===== */

const CATEGORIES = [
  {
    id: 'clothing', name: '衣装', icon: 'Shirt', color: '#E16C5C',
    description: '衣物鞋帽配饰',
    fields: [
      { name: 'brand', label: '品牌', type: 'text', placeholder: '品牌/店铺' },
      { name: 'size', label: '尺码', type: 'text', placeholder: 'S/M/L/XL' },
      { name: 'color', label: '颜色', type: 'text', placeholder: '主要颜色' },
      { name: 'season', label: '季节', type: 'select', options: ['春秋', '夏季', '冬季', '四季'] },
      { name: 'care', label: '洗护方式', type: 'select', options: ['手洗', '机洗', '干洗', '不可水洗'] },
      { name: 'material', label: '材质', type: 'text', placeholder: '棉/涤纶/羊毛等' },
    ],
  },
  {
    id: 'food', name: '食饮', icon: 'Coffee', color: '#D4A054',
    description: '食品饮品调料',
    fields: [
      { name: 'expiry', label: '保质期', type: 'text', placeholder: '2025-12-31' },
      { name: 'quantity', label: '数量', type: 'number', placeholder: '剩余数量' },
      { name: 'threshold', label: '囤货阈值', type: 'number', placeholder: '低于此数提醒' },
      { name: 'storage', label: '储存方式', type: 'select', options: ['常温', '冷藏', '冷冻'] },
    ],
  },
  {
    id: 'books', name: '书籍', icon: 'BookOpen', color: '#5B8DB8',
    description: '教材课外书笔记本',
    fields: [
      { name: 'author', label: '作者', type: 'text', placeholder: '作者/编者' },
      { name: 'publisher', label: '出版社', type: 'text', placeholder: '出版社' },
      { name: 'isTextbook', label: '是否教材', type: 'switch' },
      { name: 'course', label: '相关课程', type: 'text', placeholder: '课程名称' },
    ],
  },
  {
    id: 'misc', name: '杂物', icon: 'Box', color: '#8B9EB7',
    description: '收纳箱文具药品',
    fields: [
      { name: 'specs', label: '规格', type: 'text', placeholder: '尺寸/容量/型号' },
      { name: 'quantity', label: '数量', type: 'number', placeholder: '数量' },
    ],
  },
  {
    id: 'rest', name: '休憩', icon: 'Bed', color: '#7BA088',
    description: '床品抱枕玩偶',
    fields: [
      { name: 'size', label: '尺寸', type: 'text', placeholder: '1.2m/1.5m等' },
      { name: 'material', label: '材质', type: 'text', placeholder: '棉/乳胶/记忆棉' },
      { name: 'washable', label: '可拆洗', type: 'switch' },
    ],
  },
  {
    id: 'electronics', name: '电子', icon: 'Smartphone', color: '#6B7DB3',
    description: '数码配件充电线',
    fields: [
      { name: 'brand', label: '品牌', type: 'text', placeholder: '品牌' },
      { name: 'model', label: '型号', type: 'text', placeholder: '型号/规格' },
      { name: 'warranty', label: '保修期', type: 'text', placeholder: '保修截止日期' },
    ],
  },
  {
    id: 'daily', name: '日用', icon: 'Sparkles', color: '#C4905A',
    description: '洗漱清洁纸巾',
    fields: [
      { name: 'quantity', label: '数量', type: 'number', placeholder: '剩余数量' },
      { name: 'threshold', label: '囤货阈值', type: 'number', placeholder: '低于此数提醒' },
      { name: 'specs', label: '规格', type: 'text', placeholder: '容量/尺寸/型号' },
    ],
  },
  {
    id: 'pending', name: '待处理', icon: 'Clock', color: '#B0A080',
    description: '闲置待转让丢弃',
    fields: [
      { name: 'originalPrice', label: '原价', type: 'number', placeholder: '购买原价' },
      { name: 'plan', label: '处理方式', type: 'select', options: ['转让', '捐赠', '丢弃', '维修'] },
      { name: 'buyer', label: '意向接手人', type: 'text', placeholder: '谁可能接手' },
    ],
  },
];

const STATUS_LABELS = { in_use: '在用', pending: '待处理', processed: '已处理' };
const STATUS_COLORS = { in_use: '#7BA088', pending: '#D4A054', processed: '#8B9EB7' };
const FREQUENCY_LABELS = { daily: '每日', weekly: '每周', monthly: '每月', seasonal: '换季', rarely: '极少' };

const TAB_ITEMS = [
  { id: 'features', label: '功能', icon: 'LayoutGrid' },
  { id: 'home', label: '首页', icon: 'Home' },
  { id: 'review', label: '复盘', icon: 'BarChart3' },
];

const HOME_VIEWS = [{ id: 'map', label: '地图' }, { id: 'table', label: '表格' }];

const ICONS = {
  Shirt: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>',
  Coffee: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6.01" y1="2" y2="2"/><line x1="10" x2="10.01" y1="2" y2="2"/><line x1="14" x2="14.01" y1="2" y2="2"/></svg>',
  BookOpen: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>',
  Box: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
  Bed: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>',
  Smartphone: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>',
  Sparkles: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>',
  Clock: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  LayoutGrid: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>',
  Home: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  BarChart3: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>',
  Search: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  Settings: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
  X: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  XLarge: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  ArrowLeft: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
  Plus: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
  ChevronRight: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
  ChevronRightSmall: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
  Camera: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/></svg>',
  Upload: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>',
  UploadSmall: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>',
  Download: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',
  MessageSquare: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  Trash2: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>',
  SlidersHorizontal: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 5H3"/><path d="M12 19H3"/><path d="M14 3v4"/><path d="M16 17v2"/><path d="M21 12h-8"/><path d="M21 19h-3"/><path d="M21 5h-5"/><path d="M8 10v4"/><path d="M17 10v2"/></svg>',
  MapPin: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  CheckCircle2: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
  Thermometer: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>',
  Archive: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>',
  Pencil: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>',
  PencilLine: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
};

const STORAGE_KEY = 'dorm_v3';
const OUTFITS_KEY = 'dorm_outfits';

/* ===== SECTION 2: Storage 层 ===== */

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [], floorPlans: [], lastSync: new Date().toISOString() };
    const parsed = JSON.parse(raw);
    return {
      items: parsed.items || [],
      floorPlans: parsed.floorPlans || [],
      lastSync: parsed.lastSync || new Date().toISOString(),
    };
  } catch { return { items: [], floorPlans: [], lastSync: new Date().toISOString() }; }
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, lastSync: new Date().toISOString() }));
  } catch (e) { console.error('Failed to save data:', e); }
}

function exportJSON() {
  const data = loadData();
  return JSON.stringify(data, null, 2);
}

function importJSON(json) {
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed.items)) return false;
    localStorage.setItem(STORAGE_KEY, json);
    return true;
  } catch { return false; }
}

function clearAll() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(OUTFITS_KEY);
}

function loadOutfits() {
  try {
    const raw = localStorage.getItem(OUTFITS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveOutfits(outfits) {
  localStorage.setItem(OUTFITS_KEY, JSON.stringify(outfits));
}

function exportWechatText() {
  const { items } = loadData();
  if (items.length === 0) return '暂无物品';
  const categoryNames = {
    clothing: '衣装', food: '食饮', books: '书籍', misc: '杂物',
    rest: '休憩', electronics: '电子', daily: '日用', pending: '待处理',
  };
  const statusMap = { in_use: '在用', pending: '待处理', processed: '已处理' };
  const lines = [`我的宿舍物品清单（共${items.length}件）`, ''];
  const byCategory = {};
  items.forEach((item) => {
    if (!byCategory[item.category]) byCategory[item.category] = [];
    byCategory[item.category].push(item);
  });
  for (const [catId, catItems] of Object.entries(byCategory)) {
    lines.push(`【${categoryNames[catId] || catId}】`);
    catItems.forEach((item, i) => {
      const price = item.originalPrice ? ` ¥${item.originalPrice}` : '';
      const status = item.status !== 'in_use' ? ` [${statusMap[item.status]}]` : '';
      lines.push(`${i + 1}. ${item.name}${price}${status}`);
    });
    lines.push('');
  }
  return lines.join('\n');
}

/* ===== SECTION 3: 种子数据 ===== */

const SEED_ITEMS = [
  { id: 'item_001', name: '优衣库基础白T', category: 'clothing', location: '', status: 'in_use', frequency: 'daily', note: '四季百搭', photos: [], brand: '优衣库', tags: ['基础款'], createdAt: '2024-09-01T00:00:00Z', updatedAt: '2024-09-01T00:00:00Z' },
  { id: 'item_002', name: '加绒卫衣（灰色）', category: 'clothing', location: '', status: 'in_use', frequency: 'weekly', note: '秋冬常穿', photos: [], brand: 'GU', tags: ['秋冬'], createdAt: '2024-10-15T00:00:00Z', updatedAt: '2024-10-15T00:00:00Z' },
  { id: 'item_003', name: '轻薄羽绒服', category: 'clothing', location: '', status: 'in_use', frequency: 'seasonal', note: '仅最冷时穿', photos: [], brand: '波司登', tags: ['冬季'], createdAt: '2024-11-01T00:00:00Z', updatedAt: '2024-11-01T00:00:00Z' },
  { id: 'item_004', name: '旧牛仔裤（已褪色）', category: 'clothing', location: '', status: 'pending', frequency: 'rarely', note: '考虑捐赠', photos: [], isSecondhand: true, originalPrice: 299, tags: ['待处理'], createdAt: '2023-03-01T00:00:00Z', updatedAt: '2025-01-10T00:00:00Z' },
  { id: 'item_005', name: '挂耳咖啡（Blendy）', category: 'food', location: '', status: 'in_use', frequency: 'daily', note: '剩8包', photos: [], quantity: 8, threshold: 3, tags: ['咖啡'], createdAt: '2025-01-01T00:00:00Z', updatedAt: '2025-01-05T00:00:00Z' },
  { id: 'item_006', name: '燕麦片（西麦）', category: 'food', location: '', status: 'in_use', frequency: 'weekly', note: '早餐常备', photos: [], quantity: 1, threshold: 1, tags: ['早餐'], createdAt: '2025-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
  { id: 'item_007', name: '方便面（红烧牛肉）', category: 'food', location: '', status: 'in_use', frequency: 'monthly', note: '囤货', photos: [], quantity: 5, threshold: 2, tags: ['囤货'], createdAt: '2025-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
  { id: 'item_008', name: '过期坚果礼盒', category: 'food', location: '', status: 'pending', frequency: 'rarely', note: '已过期，需丢弃', photos: [], tags: ['过期'], createdAt: '2024-01-01T00:00:00Z', updatedAt: '2025-01-15T00:00:00Z' },
  { id: 'item_009', name: '高等数学（上册）', category: 'books', location: '', status: 'in_use', frequency: 'daily', note: '教材，期末复习用', photos: [], tags: ['教材', '数学'], createdAt: '2024-09-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
  { id: 'item_010', name: '极简主义', category: 'books', location: '', status: 'in_use', frequency: 'monthly', note: '睡前读', photos: [], tags: ['极简'], createdAt: '2024-10-01T00:00:00Z', updatedAt: '2024-10-01T00:00:00Z' },
  { id: 'item_011', name: '旧笔记本（半用）', category: 'books', location: '', status: 'pending', frequency: 'rarely', note: '还剩半本，考虑用完', photos: [], tags: ['文具'], createdAt: '2024-06-01T00:00:00Z', updatedAt: '2025-01-10T00:00:00Z' },
  { id: 'item_012', name: '透明收纳箱（大号）', category: 'misc', location: '', status: 'in_use', frequency: 'weekly', note: '装换季衣物', photos: [], tags: ['收纳'], createdAt: '2024-09-01T00:00:00Z', updatedAt: '2024-09-01T00:00:00Z' },
  { id: 'item_013', name: '医药箱', category: 'misc', location: '', status: 'in_use', frequency: 'monthly', note: '常备药品', photos: [], tags: ['药品'], createdAt: '2024-09-01T00:00:00Z', updatedAt: '2024-12-01T00:00:00Z' },
  { id: 'item_014', name: '乳胶枕', category: 'rest', location: '', status: 'in_use', frequency: 'daily', note: '京东购入，支撑很好', photos: [], brand: '睡眠博士', tags: ['枕头'], createdAt: '2024-09-01T00:00:00Z', updatedAt: '2024-09-01T00:00:00Z' },
  { id: 'item_015', name: '薄毯子', category: 'rest', location: '', status: 'in_use', frequency: 'weekly', note: '春秋盖', photos: [], tags: ['被子'], createdAt: '2024-09-01T00:00:00Z', updatedAt: '2024-09-01T00:00:00Z' },
  { id: 'item_016', name: '65W氮化镓充电器', category: 'electronics', location: '', status: 'in_use', frequency: 'daily', note: '笔记本+手机通用', photos: [], brand: 'Anker', tags: ['充电'], createdAt: '2024-09-01T00:00:00Z', updatedAt: '2024-09-01T00:00:00Z' },
  { id: 'item_017', name: '蓝牙耳机（旧）', category: 'electronics', location: '', status: 'pending', frequency: 'rarely', note: '电池不行了，想换新的', photos: [], brand: '小米', isSecondhand: true, originalPrice: 199, tags: ['待换'], createdAt: '2023-06-01T00:00:00Z', updatedAt: '2025-01-10T00:00:00Z' },
  { id: 'item_018', name: '洗面奶（芙丽芳丝）', category: 'daily', location: '', status: 'in_use', frequency: 'daily', note: '还剩三分之一', photos: [], brand: '芙丽芳丝', quantity: 1, threshold: 1, tags: ['洗护'], createdAt: '2024-12-01T00:00:00Z', updatedAt: '2025-01-05T00:00:00Z' },
  { id: 'item_019', name: '抽纸（维达）', category: 'daily', location: '', status: 'in_use', frequency: 'weekly', note: '囤货区还有3包', photos: [], brand: '维达', quantity: 3, threshold: 2, tags: ['囤货'], createdAt: '2025-01-01T00:00:00Z', updatedAt: '2025-01-05T00:00:00Z' },
  { id: 'item_020', name: '洗衣液', category: 'daily', location: '', status: 'in_use', frequency: 'monthly', note: '还剩半瓶', photos: [], quantity: 1, threshold: 1, tags: ['清洁'], createdAt: '2024-11-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z' },
];

function seedIfEmpty() {
  const data = loadData();
  if (data.items.length === 0) {
    saveData({ items: SEED_ITEMS, floorPlans: [], lastSync: new Date().toISOString() });
  }
}

/* ===== SECTION 4: 工具函数 ===== */

function genId(p = 's') { return p + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5); }
function esc(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}
function getCatColor(catId) { return CATEGORIES.find(c => c.id === catId)?.color || '#999'; }
function getCatName(catId) { return CATEGORIES.find(c => c.id === catId)?.name || catId; }
function hasAlert(item) {
  return typeof item.threshold === 'number' && typeof item.quantity === 'number' && item.quantity <= item.threshold;
}
function formatMoney(n) { return n >= 10000 ? (n / 10000).toFixed(1) + 'w' : Math.round(n).toString(); }

/* ===== SECTION 5: 全局状态 ===== */

let _items = [];
let _floorPlans = [];
let _outfits = [];
let _activeTab = 'home';
let _homeView = 'map';
let _viewPath = [];
let _targetPlanId = null;
let _toastTimer = null;

function persist() {
  saveData({ items: _items, floorPlans: _floorPlans, lastSync: new Date().toISOString() });
  saveOutfits(_outfits);
}

/* ===== SECTION 6: 地图视图工具函数 ===== */

function getSpotByPath(rootSpots, path) {
  if (path.length === 0) return null;
  let spot = rootSpots.find(s => s.id === path[0]);
  for (let i = 1; i < path.length; i++) {
    if (!spot) return null;
    spot = spot.children.find(c => c.id === path[i]);
  }
  return spot || null;
}

function updateSpotTree(spots, path, updater) {
  if (path.length === 0) return spots;
  const [head, ...tail] = path;
  return spots.map(s => {
    if (s.id !== head) return s;
    if (tail.length === 0) return updater(s);
    return { ...s, children: updateSpotTree(s.children, tail, updater) };
  });
}

function removeSpotTree(spots, path) {
  if (path.length === 0) return spots;
  const [head, ...tail] = path;
  if (tail.length === 0) return spots.filter(s => s.id !== head);
  return spots.map(s => {
    if (s.id !== head) return s;
    return { ...s, children: removeSpotTree(s.children, tail) };
  });
}

function collectAllItemIds(spot) {
  const ids = [...spot.itemIds];
  for (const child of spot.children) ids.push(...collectAllItemIds(child));
  return ids;
}

function removeItemFromAllSpots(spots, itemId) {
  return spots.map(spot => {
    const newSpot = { ...spot, itemIds: spot.itemIds.filter(id => id !== itemId) };
    if (spot.children.length > 0) newSpot.children = removeItemFromAllSpots(spot.children, itemId);
    return newSpot;
  });
}

function updateSpotItemId(spots, targetId, itemId, add) {
  return spots.map(spot => {
    if (spot.id === targetId) {
      const hasItem = spot.itemIds.includes(itemId);
      if (add && !hasItem) return { ...spot, itemIds: [...spot.itemIds, itemId] };
      if (!add && hasItem) return { ...spot, itemIds: spot.itemIds.filter(id => id !== itemId) };
      return spot;
    }
    if (spot.children.length > 0) return { ...spot, children: updateSpotItemId(spot.children, targetId, itemId, add) };
    return spot;
  });
}

function updateSpotPhoto(spots, spotId, photo) {
  return spots.map(spot => {
    if (spot.id === spotId) return { ...spot, photo };
    if (spot.children.length > 0) return { ...spot, children: updateSpotPhoto(spot.children, spotId, photo) };
    return spot;
  });
}

function collectSpotsRecursive(spots, prefix, planId, result) {
  for (const spot of spots) {
    const path = prefix ? `${prefix} > ${spot.name}` : spot.name;
    result.push({ id: spot.id, name: spot.name, planId, path });
    if (spot.children.length > 0) collectSpotsRecursive(spot.children, path, planId, result);
  }
}

function collectAllSpotsForForm(floorPlans) {
  const result = [];
  for (const plan of floorPlans) collectSpotsRecursive(plan.spots, plan.name || '宿舍', plan.id, result);
  return result;
}

function collectAllSpotsList(spots, depth = 0) {
  const result = [];
  for (const spot of spots) {
    result.push({ spot, depth });
    if (spot.children.length > 0) result.push(...collectAllSpotsList(spot.children, depth + 1));
  }
  return result;
}

/* ===== SECTION 7: 主渲染引擎 ===== */

function renderApp() {
  const app = document.getElementById('app');
  app.innerHTML = '';

  // 主内容区
  const main = document.createElement('main');
  main.className = 'flex-1 overflow-y-auto no-scrollbar relative';
  main.id = 'main-content';

  // 底部导航
  const nav = document.createElement('nav');
  nav.className = 'shrink-0 h-16 bg-white border-t border-gray-100 flex items-center justify-around px-2 z-50';
  nav.id = 'bottom-nav';

  app.appendChild(main);
  app.appendChild(nav);

  renderNav();
  renderCurrentPage();
}

function renderNav() {
  const nav = document.getElementById('bottom-nav');
  nav.innerHTML = TAB_ITEMS.map(tab => `
    <button data-tab="${tab.id}" class="flex flex-col items-center justify-center gap-0.5 w-16 h-14 rounded-xl transition-all ${_activeTab === tab.id ? 'text-gray-900' : 'text-gray-400'}">
      ${ICONS[tab.icon]}
      <span class="text-[10px] font-medium">${tab.label}</span>
    </button>
  `).join('');

  nav.querySelectorAll('button[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      _activeTab = btn.dataset.tab;
      renderNav();
      renderCurrentPage();
    });
  });
}

function renderCurrentPage() {
  const main = document.getElementById('main-content');
  main.innerHTML = '';
  main.scrollTop = 0;

  switch (_activeTab) {
    case 'features': renderFeaturesPage(main); break;
    case 'home': renderHomePage(main); break;
    case 'review': renderReviewPage(main); break;
    default: renderHomePage(main);
  }
}

function showToast(message) {
  let toast = document.getElementById('toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-msg';
    toast.className = 'absolute bottom-24 left-1/2 -translate-x-1/2 z-[70] px-4 py-2 bg-gray-900 text-white text-sm rounded-xl shadow-lg animate-slide-in-bottom';
    document.getElementById('app').appendChild(toast);
  }
  toast.textContent = message;
  toast.style.display = 'block';
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => { toast.style.display = 'none'; }, 2000);
}


/* ===== SECTION 8: FeaturesPage ===== */

function renderFeaturesPage(container) {
  container.innerHTML = `
    <div class="flex flex-col gap-3 p-4" id="features-list">
      <div class="text-sm text-gray-500 mb-1">按功能分区管理物品</div>
      ${CATEGORIES.map(cat => {
        const count = _items.filter(i => i.category === cat.id).length;
        return `
        <button data-cat="${cat.id}" class="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-left active:scale-[0.98] transition-transform">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0" style="background-color: ${cat.color}">
            <div class="scale-75">${ICONS[cat.icon]}</div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-semibold text-gray-900">${cat.name}</div>
            <div class="text-xs text-gray-400 mt-0.5">${cat.description}</div>
          </div>
          <div class="flex items-center gap-2">
            ${count > 0 ? `<span class="text-xs text-gray-400">${count} 件</span>` : ''}
            ${ICONS.ChevronRight}
          </div>
        </button>`;
      }).join('')}
    </div>
  `;

  container.querySelectorAll('[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      const catId = btn.dataset.cat;
      const cat = CATEGORIES.find(c => c.id === catId);
      renderCategoryItemsPage(container, cat);
    });
  });
}

function renderCategoryItemsPage(container, category) {
  const catItems = _items.filter(i => i.category === category.id);
  container.innerHTML = `
    <div class="flex flex-col h-full relative" id="cat-items-page">
      <div class="shrink-0 flex items-center px-2 h-14 border-b border-gray-100 bg-white">
        <button id="cat-back" class="w-10 h-10 flex items-center justify-center text-gray-600 active:bg-gray-100 rounded-xl">
          ${ICONS.ArrowLeft}
        </button>
        <div class="flex items-center gap-2 ml-1">
          <div class="w-7 h-7 rounded-lg flex items-center justify-center text-white" style="background-color: ${category.color}">
            <div class="scale-[0.6]">${ICONS[category.icon]}</div>
          </div>
          <h2 class="text-base font-semibold text-gray-900">${category.name}</h2>
          <span class="text-xs text-gray-400">${catItems.length} 件</span>
        </div>
      </div>
      <div class="flex-1 overflow-y-auto no-scrollbar p-3">
        ${catItems.length === 0 ? `
          <div class="flex flex-col items-center justify-center py-20 text-center">
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-3" style="background-color: ${category.color}15">
              <div class="scale-[0.8]" style="color: ${category.color}">${ICONS[category.icon]}</div>
            </div>
            <div class="text-gray-900 font-medium mb-1">${category.name} 分区暂无物品</div>
            <div class="text-xs text-gray-400">点击右下角 + 添加</div>
          </div>
        ` : `
          <div class="space-y-2">
            ${catItems.map(item => renderItemCard(item, category.color)).join('')}
          </div>
        `}
      </div>
      <button id="cat-add-btn" data-catid="${category.id}" class="absolute right-3 bottom-4 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform z-40" style="background-color: ${category.color}">
        ${ICONS.Plus}
      </button>
    </div>
  `;

  document.getElementById('cat-back').addEventListener('click', () => renderFeaturesPage(container));
  document.getElementById('cat-add-btn').addEventListener('click', () => {
    openItemForm(null, category.id, '');
  });
  container.querySelectorAll('[data-edititem]').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = _items.find(i => i.id === btn.dataset.edititem);
      if (item) openItemForm(item);
    });
  });
}

function renderItemCard(item, catColor) {
  return `
    <button data-edititem="${item.id}" class="w-full bg-white rounded-xl p-3 border border-gray-100 flex items-center gap-3 text-left active:bg-gray-50 transition-colors">
      <div class="w-11 h-11 rounded-lg shrink-0 flex items-center justify-center overflow-hidden" style="background-color: ${item.photos.length > 0 ? 'transparent' : catColor + '15'}">
        ${item.photos.length > 0
          ? `<img src="${item.photos[0]}" alt="" class="w-full h-full object-cover" />`
          : `<div class="w-4 h-4 rounded-full" style="background-color: ${catColor}"></div>`
        }
      </div>
      <div class="flex-1 min-w-0">
        <div class="text-sm font-medium text-gray-900 truncate">${esc(item.name)}</div>
        <div class="flex items-center gap-1.5 mt-0.5">
          <span class="text-[10px] px-1.5 py-0.5 rounded-full" style="color: ${STATUS_COLORS[item.status]}; background-color: ${STATUS_COLORS[item.status]}15">${STATUS_LABELS[item.status]}</span>
          <span class="text-[10px] text-gray-400">${FREQUENCY_LABELS[item.frequency]}</span>
          ${typeof item.quantity === 'number' && item.quantity > 0 ? `<span class="text-[10px] text-gray-400">x${item.quantity}</span>` : ''}
        </div>
      </div>
      ${ICONS.ChevronRight}
    </button>
  `;
}

/* ===== SECTION 9: HomePage ===== */

function renderHomePage(container) {
  container.innerHTML = `
    <div class="flex flex-col h-full relative" id="home-page">
      <!-- 顶部栏 -->
      <div class="shrink-0 px-4 pt-3 pb-2 bg-white" id="home-header">
        <div class="flex items-center gap-3 mb-3">
          <h1 class="text-lg font-bold text-gray-900">宿舍物品管理</h1>
          <div class="flex-1"></div>
          <button id="btn-search" class="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 active:bg-gray-100">${ICONS.Search}</button>
          <button id="btn-settings" class="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 active:bg-gray-100">${ICONS.Settings}</button>
        </div>
        <div class="flex bg-gray-100 rounded-xl p-1">
          ${HOME_VIEWS.map(v => `
            <button data-view="${v.id}" class="flex-1 py-2 text-sm font-medium rounded-lg transition-all ${_homeView === v.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}">${v.label}</button>
          `).join('')}
        </div>
      </div>
      <!-- 内容区 -->
      <div class="flex-1 overflow-y-auto no-scrollbar relative" id="home-body"></div>
    </div>
  `;

  // 绑定分段器
  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', () => {
      _homeView = btn.dataset.view;
      renderHomePage(container);
    });
  });

  // 搜索
  document.getElementById('btn-search').addEventListener('click', () => showSearchOverlay(container));

  // 设置
  document.getElementById('btn-settings').addEventListener('click', () => showSettingsPanel(container));

  // 渲染内容
  const body = document.getElementById('home-body');
  if (_homeView === 'map') {
    renderMapView(body);
  } else {
    renderTableView(body);
  }
}

function showSearchOverlay(container) {
  const header = document.getElementById('home-header');
  header.innerHTML = `
    <div class="flex items-center gap-2">
      <div class="flex-1 flex items-center gap-2 bg-gray-100 rounded-xl px-3">
        ${ICONS.Search}
        <input type="text" id="search-input" autofocus placeholder="搜索物品名称..."
          class="flex-1 py-2 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none" />
        <button id="search-clear" class="hidden"><div class="scale-75">${ICONS.X}</div></button>
      </div>
      <button id="search-cancel" class="text-sm text-gray-500 px-1">取消</button>
    </div>
  `;

  const input = document.getElementById('search-input');
  const clearBtn = document.getElementById('search-clear');

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    clearBtn.classList.toggle('hidden', !q);
    const body = document.getElementById('home-body');
    renderTableView(body, q);
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.classList.add('hidden');
    const body = document.getElementById('home-body');
    renderTableView(body, '');
  });

  document.getElementById('search-cancel').addEventListener('click', () => renderHomePage(container));
}

/* ===== HomePage - 表格视图 ===== */

function renderTableView(container, searchQuery = '', filterState = null) {
  let filtered = [..._items];
  if (searchQuery) filtered = filtered.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
  if (filterState) {
    if (filterState.categories.length) filtered = filtered.filter(i => filterState.categories.includes(i.category));
    if (filterState.statuses.length) filtered = filtered.filter(i => filterState.statuses.includes(i.status));
    if (filterState.frequencies.length) filtered = filtered.filter(i => filterState.frequencies.includes(i.frequency));
    if (filterState.isSecondhand === true) filtered = filtered.filter(i => i.isSecondhand);
    if (filterState.isSecondhand === false) filtered = filtered.filter(i => !i.isSecondhand);
    if (filterState.hasPhoto === true) filtered = filtered.filter(i => i.photos.length > 0);
    if (filterState.hasPhoto === false) filtered = filtered.filter(i => i.photos.length === 0);
    if (filterState.hasAlert === true) filtered = filtered.filter(i => hasAlert(i));
    if (filterState.hasAlert === false) filtered = filtered.filter(i => !hasAlert(i));
  }

  container.innerHTML = `
    <div class="p-4">
      ${!searchQuery ? renderFilterBar(filterState) : ''}
      ${(searchQuery || filterState) ? `<div class="text-xs text-gray-400 mb-2">共 ${filtered.length} 件物品${searchQuery ? ` · 搜索「${esc(searchQuery)}」` : ''}</div>` : ''}
      ${filtered.length === 0 ? renderEmptyTable(searchQuery, filterState) : `
        <div class="space-y-2">
          ${filtered.map(item => renderTableItemRow(item)).join('')}
        </div>
      `}
    </div>
  `;

  if (!searchQuery) bindFilterEvents(container, filterState);
  bindItemEditEvents(container);
}

function renderEmptyTable(searchQuery, filterState) {
  const hasFilter = filterState && (filterState.categories.length || filterState.statuses.length || filterState.frequencies.length || filterState.isSecondhand !== null || filterState.hasPhoto !== null || filterState.hasAlert !== null);
  return `
    <div class="flex flex-col items-center justify-center py-16 text-center">
      <div class="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center mb-3">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-gray-300"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
      </div>
      <div class="text-gray-400 text-sm">${searchQuery || hasFilter ? '无匹配物品' : '暂无物品'}</div>
      ${searchQuery || hasFilter ? `<button id="clear-filters-btn" class="text-xs text-gray-500 mt-2 underline">清除筛选条件</button>` : ''}
    </div>
  `;
}

function renderTableItemRow(item) {
  const catColor = getCatColor(item.category);
  return `
    <button data-edititem="${item.id}" class="w-full bg-white rounded-xl p-3 border border-gray-100 flex items-center gap-3 text-left active:bg-gray-50 transition-colors">
      <div class="w-12 h-12 rounded-lg shrink-0 flex items-center justify-center overflow-hidden" style="background-color: ${item.photos.length > 0 ? 'transparent' : catColor + '18'}">
        ${item.photos.length > 0
          ? `<img src="${item.photos[0]}" alt="" class="w-full h-full object-cover" />`
          : `<div class="w-5 h-5 rounded-full" style="background-color: ${catColor}"></div>`
        }
      </div>
      <div class="flex-1 min-w-0">
        <div class="text-sm font-medium text-gray-900 truncate">${esc(item.name)}</div>
        <div class="flex items-center gap-1.5 mt-1">
          <span class="text-[10px] px-1.5 py-0.5 rounded-full" style="color: ${STATUS_COLORS[item.status]}; background-color: ${STATUS_COLORS[item.status]}15">${STATUS_LABELS[item.status]}</span>
          <span class="text-[10px] text-gray-400">${FREQUENCY_LABELS[item.frequency]}</span>
          ${typeof item.quantity === 'number' && item.quantity > 0 ? `<span class="text-[10px] text-gray-400">x${item.quantity}</span>` : ''}
          ${item.isSecondhand ? '<span class="text-[10px] text-amber-500">转</span>' : ''}
          ${hasAlert(item) ? '<span class="text-[10px] text-red-400">&#9888;</span>' : ''}
        </div>
      </div>
      ${ICONS.ChevronRight}
    </button>
  `;
}

function bindItemEditEvents(container) {
  container.querySelectorAll('[data-edititem]').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = _items.find(i => i.id === btn.dataset.edititem);
      if (item) openItemForm(item);
    });
  });
}

function renderFilterBar(filterState) {
  if (!filterState) return '';
  let count = 0;
  count += filterState.categories.length;
  count += filterState.statuses.length;
  count += filterState.frequencies.length;
  if (filterState.hasPhoto !== null) count++;
  if (filterState.isSecondhand !== null) count++;
  if (filterState.hasAlert !== null) count++;

  const chips = [];
  filterState.categories.forEach(catId => {
    const cat = CATEGORIES.find(c => c.id === catId);
    if (cat) chips.push(`<span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium text-white shrink-0" style="background-color: ${cat.color}">${cat.name}<button data-rmcat="${catId}"><div class="scale-75">${ICONS.X}</div></button></span>`);
  });
  filterState.statuses.forEach(s => chips.push(`<span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium bg-gray-900 text-white shrink-0">${STATUS_LABELS[s]}<button data-rmstatus="${s}"><div class="scale-75">${ICONS.X}</div></button></span>`));
  filterState.frequencies.forEach(f => chips.push(`<span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium bg-gray-100 text-gray-600 shrink-0">${FREQUENCY_LABELS[f]}<button data-rmfreq="${f}"><div class="scale-75">${ICONS.X}</div></button></span>`));
  if (filterState.isSecondhand === true) chips.push(`<span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium bg-amber-100 text-amber-700 shrink-0">二手<button data-rmsecond><div class="scale-75">${ICONS.X}</div></button></span>`);
  if (filterState.hasAlert === true) chips.push(`<span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium bg-red-100 text-red-600 shrink-0">预警<button data-rmalert><div class="scale-75">${ICONS.X}</div></button></span>`);

  return `
    <div class="flex gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar items-center" id="filter-bar">
      <button id="btn-open-filter" class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap shrink-0 transition-all ${count > 0 ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600'}">
        ${ICONS.SlidersHorizontal} ${count > 0 ? `筛选 ${count}` : '筛选'}
      </button>
      ${chips.join('')}
    </div>
  `;
}

function bindFilterEvents(container, filterState) {
  if (!filterState) return;
  const btn = document.getElementById('btn-open-filter');
  if (btn) btn.addEventListener('click', () => showFilterPanel(container, filterState));

  container.querySelectorAll('[data-rmcat]').forEach(b => b.addEventListener('click', () => {
    filterState.categories = filterState.categories.filter(c => c !== b.dataset.rmcat);
    renderTableView(container, '', filterState);
  }));
  container.querySelectorAll('[data-rmstatus]').forEach(b => b.addEventListener('click', () => {
    filterState.statuses = filterState.statuses.filter(s => s !== b.dataset.rmstatus);
    renderTableView(container, '', filterState);
  }));
  container.querySelectorAll('[data-rmfreq]').forEach(b => b.addEventListener('click', () => {
    filterState.frequencies = filterState.frequencies.filter(f => f !== b.dataset.rmfreq);
    renderTableView(container, '', filterState);
  }));
  container.querySelectorAll('[data-rmsecond]').forEach(b => b.addEventListener('click', () => {
    filterState.isSecondhand = null; renderTableView(container, '', filterState);
  }));
  container.querySelectorAll('[data-rmalert]').forEach(b => b.addEventListener('click', () => {
    filterState.hasAlert = null; renderTableView(container, '', filterState);
  }));
  const clearBtn = document.getElementById('clear-filters-btn');
  if (clearBtn) clearBtn.addEventListener('click', () => renderTableView(container, '', null));
}

function showFilterPanel(container, currentFilters) {
  const filters = currentFilters || { categories: [], statuses: [], frequencies: [], hasPhoto: null, isSecondhand: null, hasAlert: null };
  let activeTab = 'categories';

  const overlay = document.createElement('div');
  overlay.className = 'absolute inset-0 z-[60] flex flex-col bg-white panel-enter';
  overlay.id = 'filter-panel';

  function renderPanel() {
    const tabs = [
      { id: 'categories', label: '分区' },
      { id: 'statuses', label: '状态' },
      { id: 'frequencies', label: '频率' },
      { id: 'more', label: '更多' },
    ];
    overlay.innerHTML = `
      <div class="shrink-0 flex items-center justify-between px-4 h-14 border-b border-gray-100">
        <button id="filter-reset" class="text-xs text-red-400 font-medium px-2 py-1">重置</button>
        <h2 class="text-base font-semibold text-gray-900">筛选</h2>
        <button id="filter-done" class="text-xs text-gray-900 font-medium px-2 py-1">完成</button>
      </div>
      <div class="shrink-0 flex gap-1 p-2 bg-gray-50 border-b border-gray-100">
        ${tabs.map(t => `<button data-ftab="${t.id}" class="flex-1 py-2 text-xs font-medium rounded-lg transition-all ${activeTab === t.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}">${t.label}</button>`).join('')}
      </div>
      <div class="flex-1 overflow-y-auto no-scrollbar p-4" id="filter-body"></div>
    `;

    const body = document.getElementById('filter-body');
    if (activeTab === 'categories') {
      body.innerHTML = `<div class="grid grid-cols-4 gap-3">${CATEGORIES.map(cat => `
        <button data-catf="${cat.id}" class="flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${filters.categories.includes(cat.id) ? 'text-white border-transparent' : 'bg-white text-gray-600 border-gray-100'}" style="${filters.categories.includes(cat.id) ? `background-color: ${cat.color}` : ''}">
          <span class="text-xs font-medium">${cat.name}</span>
        </button>
      `).join('')}</div>`;
      body.querySelectorAll('[data-catf]').forEach(b => b.addEventListener('click', () => {
        const id = b.dataset.catf;
        filters.categories = filters.categories.includes(id) ? filters.categories.filter(c => c !== id) : [...filters.categories, id];
        renderPanel();
      }));
    } else if (activeTab === 'statuses') {
      const opts = [{ value: 'in_use', label: '在用' }, { value: 'pending', label: '待处理' }, { value: 'processed', label: '已处理' }];
      body.innerHTML = `<div class="flex gap-3 flex-wrap">${opts.map(opt => `
        <button data-statf="${opt.value}" class="px-5 py-3 rounded-xl text-sm font-medium transition-all ${filters.statuses.includes(opt.value) ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200'}">${opt.label}</button>
      `).join('')}</div>`;
      body.querySelectorAll('[data-statf]').forEach(b => b.addEventListener('click', () => {
        const v = b.dataset.statf;
        filters.statuses = filters.statuses.includes(v) ? filters.statuses.filter(s => s !== v) : [...filters.statuses, v];
        renderPanel();
      }));
    } else if (activeTab === 'frequencies') {
      const opts = [{ value: 'daily', label: '每日' }, { value: 'weekly', label: '每周' }, { value: 'monthly', label: '每月' }, { value: 'seasonal', label: '换季' }, { value: 'rarely', label: '极少' }];
      body.innerHTML = `<div class="flex gap-3 flex-wrap">${opts.map(opt => `
        <button data-freqf="${opt.value}" class="px-5 py-3 rounded-xl text-sm font-medium transition-all ${filters.frequencies.includes(opt.value) ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200'}">${opt.label}</button>
      `).join('')}</div>`;
      body.querySelectorAll('[data-freqf]').forEach(b => b.addEventListener('click', () => {
        const v = b.dataset.freqf;
        filters.frequencies = filters.frequencies.includes(v) ? filters.frequencies.filter(f => f !== v) : [...filters.frequencies, v];
        renderPanel();
      }));
    } else if (activeTab === 'more') {
      body.innerHTML = `
        <div class="space-y-4">
          <div class="flex items-center justify-between py-2">
            <div><div class="text-sm text-gray-900">仅看二手物品</div><div class="text-xs text-gray-400">标记了可转让的物品</div></div>
            <button data-toggle="secondhand" class="w-12 h-7 rounded-full transition-colors relative ${filters.isSecondhand === true ? 'bg-gray-900' : 'bg-gray-200'}">
              <div class="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${filters.isSecondhand === true ? 'translate-x-5' : 'translate-x-0.5'}"></div>
            </button>
          </div>
          <div class="flex items-center justify-between py-2 border-t border-gray-50">
            <div><div class="text-sm text-gray-900">仅看有照片</div><div class="text-xs text-gray-400">上传过物品照片</div></div>
            <button data-toggle="hasphoto" class="w-12 h-7 rounded-full transition-colors relative ${filters.hasPhoto === true ? 'bg-gray-900' : 'bg-gray-200'}">
              <div class="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${filters.hasPhoto === true ? 'translate-x-5' : 'translate-x-0.5'}"></div>
            </button>
          </div>
          <div class="flex items-center justify-between py-2 border-t border-gray-50">
            <div><div class="text-sm text-gray-900">仅看囤货预警</div><div class="text-xs text-gray-400">数量低于阈值的日用品</div></div>
            <button data-toggle="hasalert" class="w-12 h-7 rounded-full transition-colors relative ${filters.hasAlert === true ? 'bg-gray-900' : 'bg-gray-200'}">
              <div class="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${filters.hasAlert === true ? 'translate-x-5' : 'translate-x-0.5'}"></div>
            </button>
          </div>
        </div>
      `;
      body.querySelectorAll('[data-toggle]').forEach(b => b.addEventListener('click', () => {
        const k = b.dataset.toggle;
        if (k === 'secondhand') filters.isSecondhand = filters.isSecondhand === true ? null : true;
        if (k === 'hasphoto') filters.hasPhoto = filters.hasPhoto === true ? null : true;
        if (k === 'hasalert') filters.hasAlert = filters.hasAlert === true ? null : true;
        renderPanel();
      }));
    }

    overlay.querySelectorAll('[data-ftab]').forEach(b => b.addEventListener('click', () => {
      activeTab = b.dataset.ftab;
      renderPanel();
    }));
    document.getElementById('filter-reset').addEventListener('click', () => {
      filters.categories = []; filters.statuses = []; filters.frequencies = [];
      filters.hasPhoto = null; filters.isSecondhand = null; filters.hasAlert = null;
      renderPanel();
    });
    document.getElementById('filter-done').addEventListener('click', () => {
      overlay.remove();
      const bodyEl = document.getElementById('home-body');
      renderTableView(bodyEl, '', filters);
    });
  }

  renderPanel();
  document.getElementById('home-page').appendChild(overlay);
}


/* ===== SECTION 10: MapView ===== */

function renderMapView(container) {
  const floorPlan = _floorPlans.find(fp => fp.id === _targetPlanId) || _floorPlans[0] || null;

  if (!floorPlan) {
    container.innerHTML = `
      <div class="flex flex-col items-center justify-center h-full p-8 text-center">
        <div class="w-24 h-24 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
          <div class="scale-75">${ICONS.Upload}</div>
        </div>
        <div class="text-gray-900 font-medium mb-1">上传宿舍平面图</div>
        <div class="text-xs text-gray-400 mb-4">支持 JPG/PNG</div>
        <button id="map-upload-first" class="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl active:opacity-80">选择图片</button>
      </div>
    `;
    document.getElementById('map-upload-first').addEventListener('click', () => triggerFileUpload(floorPlan, null));
    return;
  }

  // 当前视图的根 spots
  let currentSpots = floorPlan.spots;
  let parentSpot = null;
  if (_viewPath.length > 0) {
    let spot = floorPlan.spots.find(s => s.id === _viewPath[0]);
    for (let i = 1; i < _viewPath.length; i++) {
      if (!spot) break;
      spot = spot.children.find(c => c.id === _viewPath[i]);
    }
    if (spot) { parentSpot = spot; currentSpots = spot.children; }
  }

  // 面包屑
  const breadcrumb = [{ id: floorPlan.id, name: floorPlan.name }];
  let tempSpot;
  for (let i = 0; i < _viewPath.length; i++) {
    if (i === 0) tempSpot = floorPlan.spots.find(s => s.id === _viewPath[i]);
    else tempSpot = tempSpot?.children.find(c => c.id === _viewPath[i]);
    if (tempSpot) breadcrumb.push({ id: tempSpot.id, name: tempSpot.name });
  }

  // 当前视图平面图图片
  const currentImage = parentSpot?.photo || (_viewPath.length === 0 ? floorPlan.image : '');

  container.innerHTML = `
    <div class="flex flex-col h-full relative" id="map-container">
      <!-- 面包屑 -->
      <div class="shrink-0 flex items-center px-3 h-11 bg-white border-b border-gray-100 z-[70] overflow-x-auto no-scrollbar">
        ${_viewPath.length > 0 ? `<button id="map-back" class="w-7 h-7 flex items-center justify-center text-gray-500 shrink-0 active:bg-gray-100 rounded-lg mr-1">${ICONS.ArrowLeft}</button>` : ''}
        ${breadcrumb.map((crumb, i) => `
          <button data-crumbidx="${i}" class="flex items-center gap-1 text-xs shrink-0">
            ${i > 0 ? '<span class="text-gray-300 mx-0.5">/</span>' : ''}
            <span class="${i === breadcrumb.length - 1 ? 'text-gray-900 font-medium' : 'text-gray-400'}">${esc(crumb.name)}</span>
          </button>
        `).join('')}
      </div>

      <!-- 平面图区域 -->
      <div id="plan-area" class="shrink-0 relative bg-gray-100 overflow-hidden select-none ${_viewPath.length > 0 ? 'h-[35%]' : 'h-[45%]'}">
        ${currentImage ? `
          <img src="${currentImage}" alt="" class="w-full h-full object-contain" draggable="false" />
          ${currentSpots.map(spot => `
            <button data-spotid="${spot.id}" class="absolute z-10 -translate-x-1/2 -translate-y-1/2 active:scale-90 transition-transform"
              style="left: ${spot.x}%; top: ${spot.y}%">
              <div class="w-8 h-8 rounded-full bg-gray-900/80 backdrop-blur flex items-center justify-center text-white shadow-lg border border-white/20">
                <div class="scale-75">${ICONS.MapPin}</div>
              </div>
              <div class="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 bg-gray-900/80 backdrop-blur rounded text-[10px] text-white whitespace-nowrap">${esc(spot.name)}</div>
            </button>
          `).join('')}
          <div class="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/30 backdrop-blur rounded-full text-[9px] text-white">点击空白处添加收纳点 · 点击收纳点查看详情</div>
        ` : `
          <div class="flex flex-col items-center justify-center h-full p-6 text-center">
            <div class="scale-75 mb-2">${ICONS.Upload}</div>
            <div class="text-gray-900 font-medium text-sm mb-1">${_viewPath.length > 0 ? '上传空间实拍图' : '上传平面图'}</div>
            <div class="text-xs text-gray-400 mb-2">${_viewPath.length > 0 ? '如抽屉内部' : '支持 JPG/PNG'}</div>
            <button id="map-upload-empty" class="px-4 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg active:opacity-80">选择图片</button>
          </div>
        `}
      </div>

      <!-- 物品列表区 -->
      <div class="flex-1 overflow-y-auto no-scrollbar bg-gray-50">
        <div class="sticky top-0 bg-gray-50 px-4 py-2.5 flex items-center justify-between z-10">
          <span class="text-xs font-medium text-gray-500">${parentSpot ? parentSpot.name : floorPlan.name} · ${currentSpots.length} 个收纳点</span>
        </div>
        <div class="px-3 pb-3 space-y-2">
          ${currentSpots.map(spot => {
            const allIds = collectAllItemIds(spot);
            const allSpotItems = _items.filter(i => allIds.includes(i.id));
            return `
              <button data-spotrow="${spot.id}" class="w-full bg-white rounded-xl p-3 border border-gray-100 flex items-center gap-3 text-left active:bg-gray-50">
                <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  ${spot.photo ? `<img src="${spot.photo}" alt="" class="w-full h-full object-cover rounded-lg" />` : `<div class="scale-75">${ICONS.MapPin}</div>`}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium text-gray-900">${esc(spot.name)}</div>
                  <div class="text-[10px] text-gray-400 mt-0.5">
                    ${spot.children.length > 0 ? `${spot.children.length} 个子收纳点 · ` : ''}
                    ${allSpotItems.length} 件物品
                  </div>
                </div>
                ${ICONS.ChevronRight}
              </button>
            `;
          }).join('')}
          ${currentSpots.length === 0 ? `<div class="text-center py-8 text-gray-400 text-sm">暂无收纳点，点击平面图任意位置添加</div>` : ''}
        </div>
      </div>

      <!-- 底部操作栏 -->
      <div class="shrink-0 p-3 bg-white border-t border-gray-100">
        <button id="map-reupload" class="w-full py-2.5 bg-gray-50 text-gray-600 text-xs font-medium rounded-xl border border-gray-200 active:bg-gray-100 flex items-center justify-center gap-1.5">
          <div class="scale-75">${ICONS.UploadSmall}</div>${currentImage ? '重新上传' : '上传图片'}
        </button>
      </div>

      <!-- 悬浮 + 按钮 -->
      <button id="map-add-item" class="absolute right-4 bottom-20 w-12 h-12 bg-gray-900 text-white rounded-full shadow-lg flex items-center justify-center z-40 active:scale-90 transition-transform">
        ${ICONS.Plus}
      </button>
    </div>
  `;

  // 面包屑导航
  container.querySelectorAll('[data-crumbidx]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.crumbidx);
      _viewPath = _viewPath.slice(0, idx);
      renderMapView(container);
    });
  });

  // 返回按钮
  const backBtn = document.getElementById('map-back');
  if (backBtn) backBtn.addEventListener('click', () => {
    _viewPath = _viewPath.slice(0, -1);
    renderMapView(container);
  });

  // 平面图点击添加收纳点
  const planArea = document.getElementById('plan-area');
  planArea.addEventListener('click', (e) => {
    if (e.target.closest('[data-spotid]')) return;
    if (currentImage) {
      const rect = planArea.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      showAddSpotDialog(x, y, floorPlan, container);
    }
  });

  // 收纳点标记点击
  container.querySelectorAll('[data-spotid]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openSpotDetail(btn.dataset.spotid, container, floorPlan);
    });
  });

  // 列表行点击
  container.querySelectorAll('[data-spotrow]').forEach(btn => {
    btn.addEventListener('click', () => openSpotDetail(btn.dataset.spotrow, container, floorPlan));
  });

  // 上传按钮
  document.getElementById('map-reupload').addEventListener('click', () => triggerFileUpload(floorPlan, parentSpot));
  const uploadEmpty = document.getElementById('map-upload-empty');
  if (uploadEmpty) uploadEmpty.addEventListener('click', () => triggerFileUpload(floorPlan, parentSpot));

  // 添加物品
  document.getElementById('map-add-item').addEventListener('click', () => {
    const defaultSpot = currentSpots[0];
    openItemForm(null, null, defaultSpot?.id || '');
  });
}

function showAddSpotDialog(x, y, floorPlan, container) {
  const overlay = document.createElement('div');
  overlay.className = 'absolute inset-0 z-[60] flex items-end justify-center bg-black/30';
  overlay.innerHTML = `
    <div class="w-full bg-white rounded-t-2xl p-4 space-y-4 panel-enter">
      <div class="w-10 h-1 rounded-full bg-gray-200 mx-auto"></div>
      <h3 class="text-base font-semibold text-gray-900 text-center">添加收纳点</h3>
      <div class="text-xs text-gray-400 text-center">位置: ${x.toFixed(1)}%, ${y.toFixed(1)}%</div>
      <input type="text" id="spot-name-input" autofocus placeholder="如：衣柜上层"
        class="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400" />
      <div class="flex gap-3">
        <button id="spot-cancel" class="flex-1 py-3 bg-gray-100 text-gray-600 text-sm font-medium rounded-xl">取消</button>
        <button id="spot-save" class="flex-1 py-3 bg-gray-900 text-white text-sm font-medium rounded-xl disabled:opacity-30" disabled>保存</button>
      </div>
      <div class="h-2"></div>
    </div>
  `;
  document.getElementById('map-container').appendChild(overlay);

  const input = document.getElementById('spot-name-input');
  const saveBtn = document.getElementById('spot-save');

  input.addEventListener('input', () => { saveBtn.disabled = !input.value.trim(); });
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && input.value.trim()) saveSpot(); });

  function saveSpot() {
    const name = input.value.trim();
    if (!name) return;
    const newSpot = { id: genId(), name, x, y, itemIds: [], children: [] };
    if (_viewPath.length === 0) {
      floorPlan.spots = [...floorPlan.spots, newSpot];
    } else {
      floorPlan.spots = updateSpotTree(floorPlan.spots, _viewPath, s => ({ ...s, children: [...s.children, newSpot] }));
    }
    _floorPlans = _floorPlans.map(fp => fp.id === floorPlan.id ? floorPlan : fp);
    persist();
    overlay.remove();
    renderMapView(container);
  }

  saveBtn.addEventListener('click', saveSpot);
  document.getElementById('spot-cancel').addEventListener('click', () => overlay.remove());
}

function triggerFileUpload(floorPlan, parentSpot) {
  const input = document.createElement('input');
  input.type = 'file'; input.accept = 'image/*';
  input.onchange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !floorPlan) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result;
      if (!result) return;
      if (parentSpot && _viewPath.length > 0) {
        floorPlan.spots = updateSpotTree(floorPlan.spots, _viewPath, s => ({ ...s, photo: result }));
      } else {
        floorPlan.image = result;
      }
      _floorPlans = _floorPlans.map(fp => fp.id === floorPlan.id ? floorPlan : fp);
      persist();
      const container = document.getElementById('home-body');
      renderMapView(container);
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

/* ===== SECTION 11: 收纳点详情面板 ===== */

function openSpotDetail(spotId, container, floorPlan) {
  const path = [..._viewPath, spotId];
  const spot = getSpotByPath(floorPlan.spots, path);
  if (!spot) return;

  const breadcrumbNames = [floorPlan.name, ...path.map((_, i) => {
    const s = getSpotByPath(floorPlan.spots, path.slice(0, i + 1));
    return s?.name || '';
  })].filter(Boolean);

  const spotItems = _items.filter(i => spot.itemIds.includes(i.id));
  const allIds = collectAllItemIds(spot);
  const allItems = _items.filter(i => allIds.includes(i.id));

  const panel = document.createElement('div');
  panel.className = 'absolute inset-0 z-[60] flex flex-col bg-gray-50 panel-enter';
  panel.id = 'spot-detail-panel';

  function renderDetail() {
    panel.innerHTML = `
      <div class="shrink-0 flex items-center justify-between px-4 h-14 bg-white border-b border-gray-100 z-[70]">
        <div class="flex items-center gap-2 min-w-0">
          <div class="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center text-white shrink-0">
            <div class="scale-75">${ICONS.MapPin}</div>
          </div>
          <div class="min-w-0">
            <h3 class="text-base font-semibold text-gray-900 leading-tight truncate">${esc(spot.name)}</h3>
            <div class="text-[10px] text-gray-400 truncate">${breadcrumbNames.join(' > ')}</div>
          </div>
        </div>
        <button id="spot-detail-close" class="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 shrink-0">${ICONS.XLarge}</button>
      </div>
      <div class="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
        <!-- 实拍图 -->
        <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
          ${spot.photo ? `
            <div class="bg-gray-100 max-h-[200px] flex items-center justify-center">
              <img src="${spot.photo}" alt="${esc(spot.name)}" class="max-h-[200px] w-auto object-contain" />
            </div>
          ` : `
            <div class="flex flex-col items-center justify-center py-8 text-center">
              <div class="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-2">
                <div class="scale-75">${ICONS.Camera}</div>
              </div>
              <div class="text-xs text-gray-400 mb-2">暂无实拍图</div>
              <button id="spot-upload-photo" class="px-4 py-1.5 bg-gray-900 text-white text-xs rounded-lg active:opacity-80">上传实拍图</button>
            </div>
          `}
        </div>

        <!-- 子收纳点 -->
        <div>
          <div class="text-xs font-medium text-gray-500 mb-2">子收纳点 ${spot.children.length > 0 ? `(${spot.children.length})` : ''}</div>
          <div class="space-y-2">
            ${spot.children.map(child => {
              const childIds = collectAllItemIds(child);
              const childItems = _items.filter(i => childIds.includes(i.id));
              return `
                <button data-childid="${child.id}" class="w-full p-3 bg-white rounded-xl border border-gray-100 flex items-center gap-3 active:bg-gray-50 text-left">
                  <div class="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center text-white shrink-0">
                    <div class="scale-75">${ICONS.MapPin}</div>
                  </div>
                  <div class="flex-1">
                    <div class="text-sm text-gray-900">${esc(child.name)}</div>
                    <div class="text-xs text-gray-400">${childItems.length} 件物品</div>
                  </div>
                  ${ICONS.ChevronRight}
                </button>
              `;
            }).join('')}
            <button id="add-child-spot" class="w-full p-3 rounded-xl flex items-center gap-3 border border-dashed border-gray-200 bg-white active:bg-gray-50">
              <div class="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">${ICONS.Plus}</div>
              <div class="text-sm text-gray-700">添加子收纳点</div>
            </button>
          </div>
        </div>

        <!-- 物品清单 -->
        <div>
          <div class="text-xs font-medium text-gray-500 mb-2">物品清单 (${spotItems.length})</div>
          ${spotItems.length === 0 ? `<div class="text-center py-6 text-gray-400 text-sm bg-white rounded-xl border border-gray-100">该收纳点暂无物品</div>` : `
            <div class="space-y-2">
              ${spotItems.map(item => {
                const catColor = getCatColor(item.category);
                return `
                  <button data-edititem="${item.id}" class="w-full bg-white rounded-xl p-3 border border-gray-100 flex items-center gap-3 text-left active:bg-gray-50">
                    <div class="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center overflow-hidden" style="background-color: ${item.photos.length > 0 ? 'transparent' : catColor + '18'}">
                      ${item.photos.length > 0 ? `<img src="${item.photos[0]}" alt="" class="w-full h-full object-cover rounded-lg" />` : `<div class="w-3 h-3 rounded-full" style="background-color: ${catColor}"></div>`}
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="text-sm text-gray-900 truncate">${esc(item.name)}</div>
                      <span class="text-[10px] px-1.5 py-0.5 rounded-full inline-block mt-0.5" style="color: ${STATUS_COLORS[item.status]}; background-color: ${STATUS_COLORS[item.status]}15">${STATUS_LABELS[item.status]}</span>
                    </div>
                    ${ICONS.ChevronRight}
                  </button>
                `;
              }).join('')}
            </div>
          `}
        </div>

        ${allItems.length > spotItems.length ? `
          <div>
            <div class="text-xs font-medium text-gray-500 mb-2">全部物品（含子收纳点）(${allItems.length})</div>
            <div class="space-y-2">
              ${allItems.map(item => `
                <button data-edititem="${item.id}" class="w-full bg-white rounded-xl p-3 border border-gray-100 flex items-center gap-3 text-left active:bg-gray-50 opacity-70">
                  <div class="w-3 h-3 rounded-full shrink-0" style="background-color: ${getCatColor(item.category)}"></div>
                  <div class="flex-1 min-w-0"><div class="text-sm text-gray-900 truncate">${esc(item.name)}</div></div>
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <button id="delete-spot" class="w-full py-3 bg-red-50 text-red-500 text-sm font-medium rounded-xl active:bg-red-100">删除收纳点</button>
        <div class="h-4"></div>
      </div>
    `;

    // 事件绑定
    document.getElementById('spot-detail-close').addEventListener('click', () => panel.remove());
    document.getElementById('spot-upload-photo')?.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file'; input.accept = 'image/*';
      input.onchange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          const result = ev.target?.result;
          if (result) {
            floorPlan.spots = updateSpotTree(floorPlan.spots, path, s => ({ ...s, photo: result }));
            _floorPlans = _floorPlans.map(fp => fp.id === floorPlan.id ? floorPlan : fp);
            persist();
            spot.photo = result;
            renderDetail();
          }
        };
        reader.readAsDataURL(file);
      };
      input.click();
    });

    document.querySelectorAll('[data-childid]').forEach(b => b.addEventListener('click', () => {
      panel.remove();
      _viewPath = [...path];
      const container = document.getElementById('home-body');
      renderMapView(container);
    }));

    document.getElementById('add-child-spot')?.addEventListener('click', () => {
      const planArea = document.getElementById('plan-area');
      if (!planArea) return;
      const rect = planArea.getBoundingClientRect();
      const cx = 50;
      const cy = 50;
      showAddSpotDialog(cx, cy, floorPlan, document.getElementById('home-body'));
      // 新收纳点添加到当前 spot 下
      const nameInput = document.getElementById('spot-name-input');
      if (nameInput) {
        const origSave = document.getElementById('spot-save');
        if (origSave) {
          const newClick = () => {
            const name = nameInput.value.trim();
            if (!name) return;
            const newSpot = { id: genId(), name, x: 50, y: 50, itemIds: [], children: [] };
            floorPlan.spots = updateSpotTree(floorPlan.spots, path, s => ({ ...s, children: [...s.children, newSpot] }));
            _floorPlans = _floorPlans.map(fp => fp.id === floorPlan.id ? floorPlan : fp);
            persist();
            document.querySelector('.absolute.inset-0.z-\[60\]')?.remove();
            renderDetail();
          };
          origSave.onclick = newClick;
        }
      }
    });

    bindItemEditEvents(panel);

    document.getElementById('delete-spot').addEventListener('click', () => {
      if (!confirm('确定删除这个收纳点及其所有子收纳点吗？')) return;
      floorPlan.spots = removeSpotTree(floorPlan.spots, path);
      _floorPlans = _floorPlans.map(fp => fp.id === floorPlan.id ? floorPlan : fp);
      persist();
      panel.remove();
      if (path.length <= _viewPath.length + 1) _viewPath = _viewPath.slice(0, path.length - 2);
      const container = document.getElementById('home-body');
      renderMapView(container);
    });
  }

  renderDetail();
  document.getElementById('map-container').appendChild(panel);
}


/* ===== SECTION 12: 设置面板 ===== */

function showSettingsPanel(container) {
  const panel = document.createElement('div');
  panel.className = 'absolute inset-0 z-[60] flex flex-col bg-white panel-enter';
  panel.id = 'settings-panel';

  let showClearConfirm = false;

  function renderSettings() {
    panel.innerHTML = `
      <div class="shrink-0 flex items-center justify-between px-4 h-14 border-b border-gray-100">
        <h2 class="text-base font-semibold text-gray-900">设置</h2>
        <button id="settings-close" class="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 active:bg-gray-100">${ICONS.X}</button>
      </div>
      <div class="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
        <!-- 数据管理 -->
        <section>
          <h3 class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 px-1">数据管理</h3>
          <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <button id="export-json" class="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors border-b border-gray-50">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0" style="background-color: #5B8DB8">${ICONS.Download}</div>
              <div class="flex-1 min-w-0">
                <div class="text-sm text-gray-900">导出 JSON 备份</div>
                <div class="text-xs text-gray-400">下载完整数据文件到本地</div>
              </div>
              ${ICONS.ChevronRight}
            </button>
            <button id="import-json-trigger" class="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors border-b border-gray-50">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0" style="background-color: #7BA088">${ICONS.UploadSmall}</div>
              <div class="flex-1 min-w-0">
                <div class="text-sm text-gray-900">从 JSON 导入</div>
                <div class="text-xs text-gray-400">恢复之前备份的数据</div>
              </div>
              ${ICONS.ChevronRight}
            </button>
            <input type="file" id="import-file" accept=".json,application/json" class="hidden" />
            <button id="export-wechat" class="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0" style="background-color: #D4A054">${ICONS.MessageSquare}</div>
              <div class="flex-1 min-w-0">
                <div class="text-sm text-gray-900">微信文本导出</div>
                <div class="text-xs text-gray-400">生成可粘贴到微信的清单</div>
              </div>
              ${ICONS.ChevronRight}
            </button>
          </div>
        </section>

        <!-- 危险操作 -->
        <section>
          <h3 class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 px-1">危险操作</h3>
          <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            ${!showClearConfirm ? `
              <button id="clear-all-trigger" class="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 bg-red-400">${ICONS.Trash2}</div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm text-red-500">清空所有数据</div>
                  <div class="text-xs text-gray-400">不可逆，请谨慎操作</div>
                </div>
                ${ICONS.ChevronRight}
              </button>
            ` : `
              <div class="p-4">
                <div class="text-sm text-gray-900 mb-1">确定要清空所有数据吗？</div>
                <div class="text-xs text-gray-400 mb-3">此操作不可恢复，所有物品、平面图将被删除</div>
                <div class="flex gap-3">
                  <button id="clear-cancel" class="flex-1 py-2.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-xl active:bg-gray-200">取消</button>
                  <button id="clear-confirm" class="flex-1 py-2.5 bg-red-500 text-white text-xs font-medium rounded-xl active:bg-red-600">确认清空</button>
                </div>
              </div>
            `}
          </div>
        </section>

        <!-- 关于 -->
        <section>
          <h3 class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 px-1">关于</h3>
          <div class="bg-white rounded-2xl border border-gray-100 p-4 text-center">
            <div class="text-sm text-gray-900 font-medium">宿舍极简物品管理</div>
            <div class="text-xs text-gray-400 mt-1">版本 3.0</div>
            <div class="text-xs text-gray-300 mt-2">让每一件东西都有明确功能</div>
          </div>
        </section>
      </div>
    `;

    document.getElementById('settings-close').addEventListener('click', () => panel.remove());
    document.getElementById('export-json').addEventListener('click', () => {
      const json = exportJSON();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dorm_backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('JSON 已导出');
    });
    document.getElementById('import-json-trigger').addEventListener('click', () => document.getElementById('import-file').click());
    document.getElementById('import-file').addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (importJSON(ev.target.result)) {
          const data = loadData();
          _items = data.items; _floorPlans = data.floorPlans;
          panel.remove();
          renderCurrentPage();
          showToast('数据已导入');
        } else { showToast('导入失败，文件格式不正确'); }
      };
      reader.readAsText(file);
      e.target.value = '';
    });
    document.getElementById('export-wechat').addEventListener('click', () => {
      navigator.clipboard?.writeText(exportWechatText()).then(() => showToast('已复制到剪贴板'));
    });
    document.getElementById('clear-all-trigger')?.addEventListener('click', () => { showClearConfirm = true; renderSettings(); });
    document.getElementById('clear-cancel')?.addEventListener('click', () => { showClearConfirm = false; renderSettings(); });
    document.getElementById('clear-confirm')?.addEventListener('click', () => {
      clearAll();
      _items = []; _floorPlans = []; _outfits = [];
      panel.remove();
      renderCurrentPage();
      showToast('所有数据已清空');
    });
  }

  renderSettings();
  document.getElementById('home-page').appendChild(panel);
}

/* ===== SECTION 13: ItemForm ===== */

function openItemForm(editingItem = null, defaultCategory = null, defaultSpotId = '') {
  const main = document.getElementById('main-content');
  const isEdit = !!editingItem;

  let category = defaultCategory || editingItem?.category || 'clothing';
  let name = editingItem?.name || '';
  let status = editingItem?.status || 'in_use';
  let frequency = editingItem?.frequency || 'weekly';
  let note = editingItem?.note || '';
  let photos = [...(editingItem?.photos || [])];
  let isSecondhand = editingItem?.isSecondhand || false;
  let originalPrice = editingItem?.originalPrice?.toString() || '';
  let purchasePhoto = editingItem?.purchasePhoto || '';
  let locationSpotId = editingItem?.location || defaultSpotId || '';
  let quantity = editingItem?.quantity?.toString() || '';
  let threshold = editingItem?.threshold?.toString() || '';
  let brand = editingItem?.brand || '';
  let dynamicFields = {};

  if (editingItem) {
    const cat = CATEGORIES.find(c => c.id === editingItem.category);
    cat?.fields.forEach(f => {
      const key = f.name;
      if (key in editingItem) dynamicFields[key] = String(editingItem[key] || '');
    });
  }

  function getCurrentCat() { return CATEGORIES.find(c => c.id === category); }

  function renderForm() {
    const cat = getCurrentCat();
    const allSpots = collectAllSpotsForForm(_floorPlans);

    main.innerHTML = `
      <div class="absolute inset-0 z-[70] flex flex-col bg-gray-50" id="item-form">
        <div class="shrink-0 flex items-center justify-between px-4 h-14 bg-white border-b border-gray-100">
          <button id="form-close" class="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 active:bg-gray-100">${ICONS.X}</button>
          <h2 class="text-base font-semibold text-gray-900">${isEdit ? '编辑物品' : '添加物品'}</h2>
          <button id="form-save" class="px-4 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg disabled:opacity-30 active:opacity-80" disabled>保存</button>
        </div>
        <div class="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
          <!-- 照片 -->
          <div>
            <label class="text-xs font-medium text-gray-500 mb-2 block">物品照片</label>
            <div class="flex gap-2 flex-wrap" id="photo-list">
              ${photos.map((p, i) => `
                <div class="w-20 h-20 rounded-xl overflow-hidden relative shrink-0">
                  <img src="${p}" alt="" class="w-full h-full object-cover" />
                  <button data-rmphoto="${i}" class="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center text-white"><div class="scale-75">${ICONS.X}</div></button>
                </div>
              `).join('')}
              <button id="add-photo" class="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 active:bg-gray-50 shrink-0">
                <div class="scale-75">${ICONS.Camera}</div>
                <span class="text-[10px]">拍照</span>
              </button>
              <input type="file" id="photo-input" accept="image/*" class="hidden" />
            </div>
          </div>

          <!-- 名称 -->
          <div>
            <label class="text-xs font-medium text-gray-500 mb-1.5 block">物品名称 <span class="text-red-400">*</span></label>
            <input type="text" id="form-name" value="${esc(name)}" placeholder="给物品起个名字"
              class="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400" />
          </div>

          <!-- 分区 -->
          <div>
            <label class="text-xs font-medium text-gray-500 mb-1.5 block">功能分区</label>
            <div class="grid grid-cols-4 gap-2">
              ${CATEGORIES.map(cat => `
                <button data-cat="${cat.id}" class="flex flex-col items-center gap-1 py-2.5 rounded-xl text-xs font-medium transition-all border ${category === cat.id ? 'text-white border-transparent' : 'bg-white text-gray-600 border-gray-100'}" style="${category === cat.id ? `background-color: ${cat.color}` : ''}">
                  <span>${cat.name}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- 收纳点 -->
          <div>
            <label class="text-xs font-medium text-gray-500 mb-1.5 block">所在位置</label>
            ${allSpots.length === 0 ? `<div class="px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm text-gray-400">暂无收纳点，请先在地图视图中添加</div>` : `
              <div class="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar">
                ${allSpots.map(spot => `
                  <button data-spot="${spot.id}" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${locationSpotId === spot.id ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border border-gray-100'}">
                    <div class="scale-75 ${locationSpotId === spot.id ? 'text-white' : 'text-gray-400'}">${ICONS.MapPin}</div>
                    <div class="flex-1 min-w-0">
                      <div class="text-sm truncate">${esc(spot.name)}</div>
                      <div class="text-[10px] truncate ${locationSpotId === spot.id ? 'text-gray-300' : 'text-gray-400'}">${spot.path}</div>
                    </div>
                    ${locationSpotId === spot.id ? `<div class="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><path d="M5 12l5 5L20 7" /></svg></div>` : ''}
                  </button>
                `).join('')}
              </div>
            `}
          </div>

          <!-- 状态 -->
          <div>
            <label class="text-xs font-medium text-gray-500 mb-1.5 block">使用状态</label>
            <div class="flex gap-2">
              ${[{value:'in_use',label:'在用'},{value:'pending',label:'待处理'},{value:'processed',label:'已处理'}].map(opt => `
                <button data-status="${opt.value}" class="flex-1 py-2 rounded-xl text-xs font-medium transition-all ${status === opt.value ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200'}">${opt.label}</button>
              `).join('')}
            </div>
          </div>

          <!-- 频率 -->
          <div>
            <label class="text-xs font-medium text-gray-500 mb-1.5 block">使用频率</label>
            <div class="flex gap-2 flex-wrap">
              ${[{value:'daily',label:'每日'},{value:'weekly',label:'每周'},{value:'monthly',label:'每月'},{value:'seasonal',label:'换季'},{value:'rarely',label:'极少'}].map(opt => `
                <button data-freq="${opt.value}" class="px-3 py-2 rounded-xl text-xs font-medium transition-all ${frequency === opt.value ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200'}">${opt.label}</button>
              `).join('')}
            </div>
          </div>

          <!-- 品牌 + 数量 -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs font-medium text-gray-500 mb-1.5 block">品牌</label>
              <input type="text" id="form-brand" value="${esc(brand)}" placeholder="品牌/店铺"
                class="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400" />
            </div>
            <div>
              <label class="text-xs font-medium text-gray-500 mb-1.5 block">数量</label>
              <input type="number" id="form-quantity" value="${esc(quantity)}" placeholder="数量"
                class="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400" />
            </div>
          </div>

          ${cat.fields.some(f => f.name === 'threshold') ? `
            <div>
              <label class="text-xs font-medium text-gray-500 mb-1.5 block">囤货阈值</label>
              <input type="number" id="form-threshold" value="${esc(threshold)}" placeholder="低于此数量提醒补货"
                class="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400" />
            </div>
          ` : ''}

          <!-- 动态分区字段 -->
          ${cat.fields.filter(f => !['quantity', 'threshold', 'brand'].includes(f.name)).map(field => `
            <div>
              <label class="text-xs font-medium text-gray-500 mb-1.5 block">${field.label}</label>
              ${field.type === 'select' ? `
                <select data-dyn="${field.name}" class="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-gray-400 appearance-none">
                  <option value="">请选择</option>
                  ${field.options?.map(opt => `<option value="${opt}" ${dynamicFields[field.name] === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                </select>
              ` : field.type === 'textarea' ? `
                <textarea data-dyn="${field.name}" placeholder="${field.placeholder}" rows="3"
                  class="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 resize-none">${esc(dynamicFields[field.name] || '')}</textarea>
              ` : field.type === 'switch' ? `
                <button data-dyntoggle="${field.name}" class="w-12 h-7 rounded-full transition-colors relative ${dynamicFields[field.name] === 'true' ? 'bg-gray-900' : 'bg-gray-200'}">
                  <div class="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${dynamicFields[field.name] === 'true' ? 'translate-x-5' : 'translate-x-0.5'}"></div>
                </button>
              ` : `
                <input type="${field.type}" data-dyn="${field.name}" value="${esc(dynamicFields[field.name] || '')}" placeholder="${field.placeholder}"
                  class="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400" />
              `}
            </div>
          `).join('')}

          <!-- 备注 -->
          <div>
            <label class="text-xs font-medium text-gray-500 mb-1.5 block">备注</label>
            <textarea id="form-note" placeholder="写点什么..." rows="3"
              class="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 resize-none">${esc(note)}</textarea>
          </div>

          <!-- 二手 -->
          <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <button id="toggle-secondhand" class="w-full flex items-center justify-between px-4 py-3.5 text-left">
              <div>
                <div class="text-sm text-gray-900">标记为二手/可转让</div>
                <div class="text-xs text-gray-400">记录原价和购买凭证，方便后续转卖</div>
              </div>
              <div class="w-12 h-7 rounded-full transition-colors relative shrink-0 ${isSecondhand ? 'bg-gray-900' : 'bg-gray-200'}">
                <div class="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${isSecondhand ? 'translate-x-5' : 'translate-x-0.5'}"></div>
              </div>
            </button>
            ${isSecondhand ? `
              <div class="px-4 pb-4 space-y-3 border-t border-gray-50 pt-3">
                <div>
                  <label class="text-xs font-medium text-gray-500 mb-1.5 block">原价（元）</label>
                  <input type="number" id="form-price" value="${esc(originalPrice)}" placeholder="购买时的价格"
                    class="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400" />
                </div>
                <div>
                  <label class="text-xs font-medium text-gray-500 mb-1.5 block">购买凭证</label>
                  ${purchasePhoto ? `
                    <div class="w-24 h-24 rounded-xl overflow-hidden relative">
                      <img src="${purchasePhoto}" alt="" class="w-full h-full object-cover" />
                      <button id="rm-purchase-photo" class="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center text-white"><div class="scale-75">${ICONS.X}</div></button>
                    </div>
                  ` : `
                    <button id="add-purchase-photo" class="w-full py-3 bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center gap-2 text-gray-400 active:bg-gray-100">
                      <div class="scale-75">${ICONS.Camera}</div><span class="text-xs">上传购买凭证</span>
                    </button>
                  `}
                  <input type="file" id="purchase-input" accept="image/*" class="hidden" />
                </div>
              </div>
            ` : ''}
          </div>
          <div class="h-4"></div>
        </div>
      </div>
    `;

    // 绑定所有事件
    bindFormEvents();
  }

  function bindFormEvents() {
    // 关闭
    document.getElementById('form-close').addEventListener('click', () => renderCurrentPage());

    // 名称输入验证
    const nameInput = document.getElementById('form-name');
    const saveBtn = document.getElementById('form-save');
    nameInput.addEventListener('input', () => { saveBtn.disabled = !nameInput.value.trim(); });
    saveBtn.disabled = !name;

    // 保存
    document.getElementById('form-save').addEventListener('click', () => {
      const finalName = document.getElementById('form-name').value.trim();
      if (!finalName) return;

      const now = new Date().toISOString();
      const cat = getCurrentCat();
      const dyn = {};
      cat.fields.forEach(f => {
        const el = document.querySelector(`[data-dyn="${f.name}"]`);
        if (el) dyn[f.name] = el.value;
      });

      const item = {
        id: editingItem?.id || genId('item'),
        name: finalName,
        category,
        location: locationSpotId,
        status,
        frequency,
        note: document.getElementById('form-note').value.trim() || undefined,
        photos,
        isSecondhand: isSecondhand || undefined,
        originalPrice: isSecondhand && originalPrice ? Number(originalPrice) : undefined,
        purchasePhoto: isSecondhand && purchasePhoto ? purchasePhoto : undefined,
        quantity: quantity ? Number(quantity) : undefined,
        threshold: threshold ? Number(threshold) : undefined,
        brand: brand.trim() || undefined,
        tags: editingItem?.tags || [],
        createdAt: editingItem?.createdAt || now,
        updatedAt: now,
        ...dyn,
      };

      // 保存物品
      const exists = _items.find(i => i.id === item.id);
      if (exists) _items = _items.map(i => i.id === item.id ? item : i);
      else _items = [item, ..._items];

      // 更新收纳点关联
      if (locationSpotId) {
        _floorPlans = _floorPlans.map(fp => {
          let newSpots = removeItemFromAllSpots(fp.spots, item.id);
          newSpots = updateSpotItemId(newSpots, locationSpotId, item.id, true);
          return { ...fp, spots: newSpots };
        });
      }

      persist();
      renderCurrentPage();
    });

    // 照片
    document.getElementById('add-photo').addEventListener('click', () => document.getElementById('photo-input').click());
    document.getElementById('photo-input').addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => { if (ev.target.result) { photos.push(ev.target.result); renderForm(); } };
      reader.readAsDataURL(file);
      e.target.value = '';
    });
    document.querySelectorAll('[data-rmphoto]').forEach(b => b.addEventListener('click', () => {
      photos.splice(parseInt(b.dataset.rmphoto), 1);
      renderForm();
    }));

    // 分区切换
    document.querySelectorAll('[data-cat]').forEach(b => b.addEventListener('click', () => {
      category = b.dataset.cat;
      renderForm();
    }));

    // 收纳点选择
    document.querySelectorAll('[data-spot]').forEach(b => b.addEventListener('click', () => {
      locationSpotId = b.dataset.spot;
      renderForm();
    }));

    // 状态
    document.querySelectorAll('[data-status]').forEach(b => b.addEventListener('click', () => { status = b.dataset.status; renderForm(); }));

    // 频率
    document.querySelectorAll('[data-freq]').forEach(b => b.addEventListener('click', () => { frequency = b.dataset.freq; renderForm(); }));

    // 动态字段
    document.querySelectorAll('[data-dyntoggle]').forEach(b => b.addEventListener('click', () => {
      dynamicFields[b.dataset.dyntoggle] = dynamicFields[b.dataset.dyntoggle] === 'true' ? '' : 'true';
      renderForm();
    }));

    // 品牌、数量、阈值
    const brandInput = document.getElementById('form-brand');
    if (brandInput) brandInput.addEventListener('input', () => { brand = brandInput.value; });
    const qtyInput = document.getElementById('form-quantity');
    if (qtyInput) qtyInput.addEventListener('input', () => { quantity = qtyInput.value; });
    const thInput = document.getElementById('form-threshold');
    if (thInput) thInput.addEventListener('input', () => { threshold = thInput.value; });

    // 二手开关
    document.getElementById('toggle-secondhand').addEventListener('click', () => {
      isSecondhand = !isSecondhand;
      renderForm();
    });

    // 购买凭证
    document.getElementById('add-purchase-photo')?.addEventListener('click', () => document.getElementById('purchase-input').click());
    document.getElementById('purchase-input')?.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => { if (ev.target.result) { purchasePhoto = ev.target.result; renderForm(); } };
      reader.readAsDataURL(file);
      e.target.value = '';
    });
    document.getElementById('rm-purchase-photo')?.addEventListener('click', () => { purchasePhoto = ''; renderForm(); });
    const priceInput = document.getElementById('form-price');
    if (priceInput) priceInput.addEventListener('input', () => { originalPrice = priceInput.value; });
  }

  renderForm();
}


/* ===== SECTION 14: ReviewPage ===== */

function renderReviewPage(container) {
  container.innerHTML = `
    <div class="flex flex-col gap-3 p-4 relative" id="review-page">
      <!-- 资产卡片 + 关注卡片 -->
      <div class="space-y-3">
        ${renderAssetCard()}
        ${renderAlertCard()}
      </div>

      <!-- 小卡片 -->
      <div class="grid grid-cols-3 gap-3">
        ${renderSmallCard(ICONS.Thermometer, '温度速查', '#D4A054', _outfits.length, 'temp')}
        ${renderSmallCard(ICONS.Archive, '已处理', '#8B9EB7', _items.filter(i => i.status === 'processed').length, 'history')}
        ${renderSmallCard(ICONS.MapPin, '收纳点', '#6B7DB3', _floorPlans.reduce((s, fp) => s + collectAllSpotsList(fp.spots).length, 0), 'spots')}
      </div>

      <!-- 概况 -->
      <div class="bg-white rounded-2xl border border-gray-100 p-4">
        <div class="text-xs font-medium text-gray-400 mb-3">物品概况</div>
        <div class="grid grid-cols-3 gap-2">
          <div class="text-center"><div class="text-lg font-bold text-gray-900">${_items.length}</div><div class="text-[10px] text-gray-400">总物品</div></div>
          <div class="text-center"><div class="text-lg font-bold text-green-600">${_items.filter(i => i.status === 'in_use').length}</div><div class="text-[10px] text-gray-400">在用</div></div>
          <div class="text-center"><div class="text-lg font-bold text-gray-400">${_items.filter(i => i.status === 'processed').length}</div><div class="text-[10px] text-gray-400">已处理</div></div>
        </div>
      </div>
    </div>
  `;

  // 资产卡片点击
  const assetCard = document.getElementById('asset-card');
  if (assetCard) assetCard.addEventListener('click', () => showAssetDetail(container));

  // 关注卡片点击
  const alertCard = document.getElementById('alert-card');
  if (alertCard) alertCard.addEventListener('click', () => showAlertDetail(container));

  // 小卡片点击
  container.querySelectorAll('[data-panel]').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.dataset.panel;
      if (panel === 'temp') showTempPanel(container);
      if (panel === 'history') showHistoryPanel(container);
      if (panel === 'spots') showSpotsPanel(container);
    });
  });
}

function renderAssetCard() {
  const activeItems = _items.filter(i => i.status !== 'processed');
  const pricedItems = activeItems.filter(i => typeof i.originalPrice === 'number');
  const totalValue = pricedItems.reduce((sum, i) => sum + (i.originalPrice || 0), 0);
  const catValues = [];
  CATEGORIES.forEach(cat => {
    const v = activeItems.filter(i => i.category === cat.id).reduce((s, i) => s + (i.originalPrice || 0), 0);
    if (v > 0) catValues.push({ id: cat.id, name: cat.name, color: cat.color, value: v });
  });
  catValues.sort((a, b) => b.value - a.value);

  return `
    <button id="asset-card" class="w-full bg-white rounded-2xl border border-gray-100 overflow-hidden text-left active:scale-[0.98] transition-transform">
      <div class="p-4">
        <div class="flex items-baseline justify-between">
          <div>
            <div class="text-2xl font-bold text-gray-900">¥${formatMoney(totalValue)}</div>
            <div class="text-xs text-gray-400 mt-0.5">${pricedItems.length} 件标价物品</div>
          </div>
          ${ICONS.ChevronRight}
        </div>
        ${catValues.length > 0 && totalValue > 0 ? `
          <div class="flex gap-0.5 mt-3 h-1.5 rounded-full overflow-hidden">
            ${catValues.map(cv => `<div class="h-full" style="width: ${(cv.value / totalValue) * 100}%; background-color: ${cv.color}"></div>`).join('')}
          </div>
          <div class="flex flex-wrap gap-x-3 gap-y-1 mt-2">
            ${catValues.slice(0, 4).map(cv => `<div class="flex items-center gap-1"><div class="w-1.5 h-1.5 rounded-full" style="background-color: ${cv.color}"></div><span class="text-[10px] text-gray-500">${cv.name} ¥${formatMoney(cv.value)}</span></div>`).join('')}
          </div>
        ` : ''}
      </div>
    </button>
  `;
}

function renderAlertCard() {
  const alertItems = _items.filter(hasAlert);
  const pendingItems = _items.filter(i => i.status === 'pending' && !hasAlert(i));
  const total = alertItems.length + pendingItems.length;
  return `
    <button id="alert-card" class="w-full rounded-2xl border overflow-hidden text-left active:scale-[0.98] transition-transform ${total > 0 ? 'bg-red-50 border-red-100' : 'bg-white border-gray-100'}">
      <div class="p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="text-2xl font-bold ${total > 0 ? 'text-red-500' : 'text-gray-900'}">${total}</div>
            ${total > 0 ? '<div class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>' : ''}
          </div>
          ${ICONS.ChevronRight}
        </div>
        <div class="text-xs text-gray-400 mt-0.5">需要关注</div>
        <div class="mt-2 space-y-0.5">
          ${alertItems.length > 0 ? `<div class="text-xs text-red-500">${alertItems.length} 件库存不足</div>` : ''}
          ${pendingItems.length > 0 ? `<div class="text-xs text-amber-600">${pendingItems.length} 件待处理</div>` : ''}
          ${total === 0 ? '<div class="text-xs text-gray-400">一切正常</div>' : ''}
        </div>
      </div>
    </button>
  `;
}

function renderSmallCard(icon, title, color, count, panelId) {
  return `
    <button data-panel="${panelId}" class="flex flex-col items-center p-3 bg-white rounded-2xl border border-gray-100 active:scale-[0.98] transition-transform">
      <div class="w-9 h-9 rounded-xl flex items-center justify-center text-white mb-1.5" style="background-color: ${color}">
        <div class="scale-75">${icon}</div>
      </div>
      <div class="text-xs font-medium text-gray-900 text-center">${title}</div>
      <div class="text-[10px] text-gray-400">${count}</div>
    </button>
  `;
}

/* ===== 资产详情面板 ===== */

function showAssetDetail(container) {
  const activeItems = _items.filter(i => i.status !== 'processed');
  const pricedItems = activeItems.filter(i => typeof i.originalPrice === 'number');
  const totalValue = pricedItems.reduce((sum, i) => sum + (i.originalPrice || 0), 0);

  const panel = document.createElement('div');
  panel.className = 'absolute inset-0 z-[60] flex flex-col bg-white panel-enter';
  panel.innerHTML = `
    <div class="shrink-0 flex items-center justify-between px-4 h-14 border-b border-gray-100">
      <h2 class="text-base font-semibold text-gray-900">资产明细</h2>
      <button id="asset-close" class="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">${ICONS.XLarge}</button>
    </div>
    <div class="flex-1 overflow-y-auto no-scrollbar p-4">
      <div class="text-center mb-4">
        <div class="text-3xl font-bold text-gray-900">¥${formatMoney(totalValue)}</div>
        <div class="text-xs text-gray-400">${pricedItems.length} 件（已处理不计入）</div>
      </div>
      <div class="space-y-2">
        ${pricedItems.map(item => {
          const catColor = getCatColor(item.category);
          return `
            <button data-edititem="${item.id}" class="w-full bg-white rounded-xl p-3 border border-gray-100 flex items-center gap-3 text-left active:bg-gray-50">
              <div class="w-3 h-3 rounded-full shrink-0" style="background-color: ${catColor}"></div>
              <div class="flex-1 min-w-0">
                <div class="text-sm text-gray-900 truncate">${esc(item.name)}</div>
                ${item.brand ? `<div class="text-[10px] text-gray-400">${esc(item.brand)}</div>` : ''}
              </div>
              <div class="text-sm font-medium text-gray-900">¥${item.originalPrice}</div>
            </button>
          `;
        }).join('')}
      </div>
    </div>
  `;
  document.getElementById('asset-close').addEventListener('click', () => panel.remove());
  bindItemEditEvents(panel);
  container.appendChild(panel);
}

/* ===== 关注详情面板 ===== */

function showAlertDetail(container) {
  const alertItems = _items.filter(hasAlert);
  const pendingItems = _items.filter(i => i.status === 'pending' && !hasAlert(i));

  const panel = document.createElement('div');
  panel.className = 'absolute inset-0 z-[60] flex flex-col bg-white panel-enter';
  panel.innerHTML = `
    <div class="shrink-0 flex items-center justify-between px-4 h-14 border-b border-gray-100">
      <h2 class="text-base font-semibold text-gray-900">需要关注</h2>
      <button id="alert-detail-close" class="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">${ICONS.XLarge}</button>
    </div>
    <div class="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
      ${alertItems.length > 0 ? `
        <section>
          <h3 class="text-xs font-medium text-red-500 mb-2">库存不足 (${alertItems.length})</h3>
          <div class="space-y-2">
            ${alertItems.map(item => `
              <button data-edititem="${item.id}" class="w-full bg-red-50 rounded-xl p-3 flex items-center gap-3 text-left active:bg-red-100">
                <div class="w-3 h-3 rounded-full shrink-0" style="background-color: ${getCatColor(item.category)}"></div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm text-gray-900 truncate">${esc(item.name)}</div>
                  <div class="text-xs text-red-400 mt-0.5">还剩 ${item.quantity} 件 · 建议补货</div>
                </div>
                ${ICONS.ChevronRightSmall}
              </button>
            `).join('')}
          </div>
        </section>
      ` : ''}
      ${pendingItems.length > 0 ? `
        <section>
          <h3 class="text-xs font-medium text-amber-600 mb-2">待处理 (${pendingItems.length})</h3>
          <div class="space-y-2">
            ${pendingItems.map(item => `
              <button data-edititem="${item.id}" class="w-full bg-amber-50 rounded-xl p-3 flex items-center gap-3 text-left active:bg-amber-100">
                <div class="w-3 h-3 rounded-full shrink-0" style="background-color: ${getCatColor(item.category)}"></div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm text-gray-900 truncate">${esc(item.name)}</div>
                  <div class="text-xs text-gray-400 mt-0.5">${item.note || '点击编辑后改为已处理'}</div>
                </div>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full text-amber-600 bg-amber-100 shrink-0">${STATUS_LABELS[item.status]}</span>
              </button>
            `).join('')}
          </div>
        </section>
      ` : ''}
      ${alertItems.length === 0 && pendingItems.length === 0 ? `
        <div class="flex flex-col items-center justify-center py-16"><div class="scale-75 mb-3">${ICONS.CheckCircle2}</div><div class="text-gray-400 text-sm">一切正常</div></div>
      ` : ''}
    </div>
  `;
  document.getElementById('alert-detail-close').addEventListener('click', () => panel.remove());
  bindItemEditEvents(panel);
  container.appendChild(panel);
}

/* ===== 温度速查面板 ===== */

function showTempPanel(container) {
  const panel = document.createElement('div');
  panel.className = 'absolute inset-0 z-[60] flex flex-col bg-white panel-enter';
  let temp = '';
  let mode = 'outfit';
  let showForm = false;
  let editingOutfit = null;

  function renderTemp() {
    const tempNum = temp ? Number(temp) : null;
    const isValidTemp = tempNum !== null && !isNaN(tempNum);
    const matchedOutfits = isValidTemp ? _outfits.filter(o => tempNum >= o.minTemp && tempNum <= o.maxTemp) : [];
    const clothingItems = _items.filter(i => i.category === 'clothing' && i.status === 'in_use');

    panel.innerHTML = `
      <div class="shrink-0 flex items-center justify-between px-4 h-14 border-b border-gray-100">
        <h2 class="text-base font-semibold text-gray-900">衣装温度速查</h2>
        <button id="temp-close" class="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">${ICONS.XLarge}</button>
      </div>
      <div class="flex-1 overflow-y-auto no-scrollbar p-4">
        <!-- 温度输入 -->
        <div class="flex items-center gap-3 mb-3">
          <input type="number" id="temp-input" value="${esc(temp)}" placeholder="输入当前温度"
            class="flex-1 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400" />
          <span class="text-sm text-gray-500">°C</span>
        </div>

        <!-- 套装/单件切换 -->
        <div class="flex bg-gray-100 rounded-xl p-1 mb-4">
          <button data-mode="outfit" class="flex-1 py-2 text-xs font-medium rounded-lg transition-all ${mode === 'outfit' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}">套装</button>
          <button data-mode="single" class="flex-1 py-2 text-xs font-medium rounded-lg transition-all ${mode === 'single' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}">单件</button>
        </div>

        ${isValidTemp ? `<div class="mb-4 px-3 py-2 bg-amber-50 rounded-lg text-xs text-amber-700">当前 ${temp}°C</div>` : ''}

        ${mode === 'outfit' ? renderOutfitSection(matchedOutfits, isValidTemp) : renderSingleSection(clothingItems)}
      </div>
    `;

    document.getElementById('temp-close').addEventListener('click', () => panel.remove());
    document.getElementById('temp-input').addEventListener('input', (e) => { temp = e.target.value; renderTemp(); });
    document.querySelectorAll('[data-mode]').forEach(b => b.addEventListener('click', () => { mode = b.dataset.mode; renderTemp(); }));

    // 套装事件
    bindOutfitEvents(panel);
  }

  function renderOutfitSection(matchedOutfits, isValidTemp) {
    if (_outfits.length === 0 && !showForm) {
      return `<div class="text-center py-8 text-gray-400 text-sm">暂无套装，点击右上角添加</div>
        <div class="mb-3 flex items-center justify-between">
          <span class="text-xs font-medium text-gray-500">全部套装 (0)</span>
          <button id="add-outfit" class="text-[10px] px-2 py-1 bg-gray-900 text-white rounded-lg flex items-center gap-1">${ICONS.Plus} 添加套装</button>
        </div>`;
    }

    if (showForm) return renderOutfitFormHTML(editingOutfit);

    const displayOutfits = isValidTemp ? matchedOutfits : _outfits;
    return `
      <div class="mb-3 flex items-center justify-between">
        <span class="text-xs font-medium text-gray-500">${isValidTemp ? `匹配套装 (${matchedOutfits.length})` : `全部套装 (${_outfits.length})`}</span>
        <button id="add-outfit" class="text-[10px] px-2 py-1 bg-gray-900 text-white rounded-lg flex items-center gap-1">${ICONS.Plus} 添加套装</button>
      </div>
      <div class="space-y-3">
        ${displayOutfits.map(outfit => renderOutfitCard(outfit)).join('')}
      </div>
    `;
  }

  function renderSingleSection(clothingItems) {
    if (clothingItems.length === 0) return `<div class="text-center py-8 text-gray-400 text-sm">没有在用衣装</div>`;
    return `
      <div class="grid grid-cols-2 gap-3">
        ${clothingItems.map(item => `
          <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
            ${item.photos.length > 0 ? `<div class="aspect-square bg-gray-100"><img src="${item.photos[0]}" alt="${esc(item.name)}" class="w-full h-full object-cover" /></div>`
              : `<div class="aspect-square bg-gray-50 flex items-center justify-center"><span class="text-xs text-gray-300">无照片</span></div>`}
            <div class="p-2">
              <div class="text-xs font-medium text-gray-900 truncate">${esc(item.name)}</div>
              ${item.note ? `<div class="text-[10px] text-gray-400 truncate">${esc(item.note)}</div>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderOutfitCard(outfit) {
    const outfitItems = outfit.itemIds.map(id => _items.find(i => i.id === id)).filter(Boolean);
    return `
      <div class="bg-white rounded-xl border border-gray-100 overflow-hidden">
        ${outfit.photo ? `
          <div class="aspect-[3/2] bg-gray-100 relative">
            <img src="${outfit.photo}" alt="${esc(outfit.name)}" class="w-full h-full object-cover" />
            <div class="absolute top-2 right-2 flex gap-1">
              <button data-editoutfit="${outfit.id}" class="w-7 h-7 bg-black/40 backdrop-blur rounded-full flex items-center justify-center text-white active:bg-black/60"><div class="scale-75">${ICONS.Pencil}</div></button>
              <button data-deloutfit="${outfit.id}" class="w-7 h-7 bg-black/40 backdrop-blur rounded-full flex items-center justify-center text-white active:bg-black/60"><div class="scale-75">${ICONS.Trash2}</div></button>
            </div>
          </div>
        ` : `
          <div class="aspect-[3/2] bg-gray-50 flex items-center justify-center relative">
            <span class="text-xs text-gray-300">无照片</span>
            <div class="absolute top-2 right-2 flex gap-1">
              <button data-editoutfit="${outfit.id}" class="w-7 h-7 bg-black/40 backdrop-blur rounded-full flex items-center justify-center text-white active:bg-black/60"><div class="scale-75">${ICONS.Pencil}</div></button>
              <button data-deloutfit="${outfit.id}" class="w-7 h-7 bg-black/40 backdrop-blur rounded-full flex items-center justify-center text-white active:bg-black/60"><div class="scale-75">${ICONS.Trash2}</div></button>
            </div>
          </div>
        `}
        <div class="p-3">
          <div class="flex items-center justify-between">
            <div class="text-sm font-medium text-gray-900">${esc(outfit.name)}</div>
            <div class="text-[10px] text-gray-400">${outfit.minTemp}~${outfit.maxTemp}°C</div>
          </div>
          ${outfit.note ? `<div class="text-xs text-gray-400 mt-1">${esc(outfit.note)}</div>` : ''}
          <div class="flex gap-1.5 mt-2 flex-wrap">
            ${outfitItems.map(item => `<span class="text-[10px] px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">${esc(item.name)}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderOutfitFormHTML(editOutfit) {
    const isEdit = !!editOutfit;
    const clothingItems = _items.filter(i => i.category === 'clothing');
    const selIds = editOutfit?.itemIds || [];
    const photo = editOutfit?.photo || '';

    return `
      <div class="absolute inset-0 z-[70] flex flex-col bg-white panel-enter">
        <div class="shrink-0 flex items-center justify-between px-4 h-14 border-b border-gray-100">
          <h2 class="text-base font-semibold text-gray-900">${isEdit ? '编辑套装' : '添加套装'}</h2>
          <button id="outfit-cancel" class="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">${ICONS.XLarge}</button>
        </div>
        <div class="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
          <!-- 照片 -->
          <div>
            <label class="text-xs font-medium text-gray-500 mb-1.5 block">套装照片</label>
            ${photo ? `
              <div class="relative w-full aspect-[3/2] rounded-xl overflow-hidden bg-gray-100">
                <img src="${photo}" alt="" class="w-full h-full object-cover" />
                <button id="rm-outfit-photo" class="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center text-white"><div class="scale-75">${ICONS.X}</div></button>
              </div>
            ` : `
              <button id="add-outfit-photo" class="w-full aspect-[3/2] rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 active:bg-gray-50">
                <div class="scale-75">${ICONS.Camera}</div><span class="text-xs">上传套装照片</span>
              </button>
            `}
            <input type="file" id="outfit-photo-input" accept="image/*" class="hidden" />
          </div>

          <div>
            <label class="text-xs font-medium text-gray-500 mb-1.5 block">套装名称</label>
            <input type="text" id="outfit-name" value="${esc(editOutfit?.name || '')}" placeholder="如：春秋通勤"
              class="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs font-medium text-gray-500 mb-1.5 block">最低温度 (°C)</label>
              <input type="number" id="outfit-mintemp" value="${editOutfit?.minTemp || ''}" placeholder="如：15"
                class="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400" />
            </div>
            <div>
              <label class="text-xs font-medium text-gray-500 mb-1.5 block">最高温度 (°C)</label>
              <input type="number" id="outfit-maxtemp" value="${editOutfit?.maxTemp || ''}" placeholder="如：25"
                class="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400" />
            </div>
          </div>
          <div>
            <label class="text-xs font-medium text-gray-500 mb-1.5 block">备注</label>
            <input type="text" id="outfit-note" value="${esc(editOutfit?.note || '')}" placeholder="可选"
              class="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400" />
          </div>
          <div>
            <label class="text-xs font-medium text-gray-500 mb-1.5 block">选择衣装 (<span id="sel-count">${selIds.length}</span>件)</label>
            <div class="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar">
              ${clothingItems.map(item => `
                <button data-outfititem="${item.id}" class="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all ${selIds.includes(item.id) ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-700'}">
                  ${item.photos.length > 0 ? `<img src="${item.photos[0]}" alt="" class="w-8 h-8 rounded-lg object-cover shrink-0" />` : `<div class="w-8 h-8 rounded-lg bg-gray-200 shrink-0"></div>`}
                  <span class="text-sm truncate flex-1">${esc(item.name)}</span>
                  ${selIds.includes(item.id) ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><path d="M5 12l5 5L20 7" /></svg>' : ''}
                </button>
              `).join('')}
            </div>
          </div>
          <button id="outfit-save" class="w-full py-3 bg-gray-900 text-white text-sm font-medium rounded-xl disabled:opacity-30 active:opacity-80" disabled>保存套装</button>
        </div>
      </div>
    `;
  }

  function bindOutfitEvents(panelEl) {
    // 添加套装
    document.getElementById('add-outfit')?.addEventListener('click', () => {
      editingOutfit = null;
      showForm = true;
      renderTemp();
      bindOutfitFormEvents(null);
    });

    // 编辑套装
    document.querySelectorAll('[data-editoutfit]').forEach(b => b.addEventListener('click', (e) => {
      e.stopPropagation();
      const outfit = _outfits.find(o => o.id === b.dataset.editoutfit);
      if (outfit) {
        editingOutfit = outfit;
        showForm = true;
        renderTemp();
        bindOutfitFormEvents(outfit);
      }
    }));

    // 删除套装
    document.querySelectorAll('[data-deloutfit]').forEach(b => b.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm('确定删除这个套装？')) {
        _outfits = _outfits.filter(o => o.id !== b.dataset.deloutfit);
        persist();
        renderTemp();
      }
    }));
  }

  function bindOutfitFormEvents(baseOutfit) {
    let selIds = [...(baseOutfit?.itemIds || [])];
    let photo = baseOutfit?.photo || '';

    const updateSaveBtn = () => {
      const name = document.getElementById('outfit-name').value.trim();
      const minT = document.getElementById('outfit-mintemp').value;
      const maxT = document.getElementById('outfit-maxtemp').value;
      document.getElementById('outfit-save').disabled = !name || !minT || !maxT || selIds.length === 0;
    };

    document.getElementById('outfit-name').addEventListener('input', updateSaveBtn);
    document.getElementById('outfit-mintemp').addEventListener('input', updateSaveBtn);
    document.getElementById('outfit-maxtemp').addEventListener('input', updateSaveBtn);
    updateSaveBtn();

    document.getElementById('outfit-cancel').addEventListener('click', () => {
      showForm = false;
      editingOutfit = null;
      renderTemp();
    });

    // 照片
    document.getElementById('add-outfit-photo')?.addEventListener('click', () => document.getElementById('outfit-photo-input').click());
    document.getElementById('outfit-photo-input').addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        photo = ev.target.result;
        // 重新渲染照片区域
        const container = document.getElementById('add-outfit-photo')?.parentElement || document.getElementById('rm-outfit-photo')?.parentElement;
        if (container) {
          container.innerHTML = `
            <div class="relative w-full aspect-[3/2] rounded-xl overflow-hidden bg-gray-100">
              <img src="${photo}" alt="" class="w-full h-full object-cover" />
              <button id="rm-outfit-photo" class="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center text-white"><div class="scale-75">${ICONS.X}</div></button>
            </div>
            <input type="file" id="outfit-photo-input" accept="image/*" class="hidden" />
          `;
          document.getElementById('outfit-photo-input').addEventListener('change', arguments.callee);
          document.getElementById('rm-outfit-photo').addEventListener('click', () => { photo = ''; bindOutfitFormEvents(baseOutfit); });
        }
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    });
    document.getElementById('rm-outfit-photo')?.addEventListener('click', () => { photo = ''; bindOutfitFormEvents(baseOutfit); });

    // 选择衣装
    document.querySelectorAll('[data-outfititem]').forEach(b => {
      b.addEventListener('click', () => {
        const id = b.dataset.outfititem;
        selIds = selIds.includes(id) ? selIds.filter(x => x !== id) : [...selIds, id];
        document.getElementById('sel-count').textContent = selIds.length;
        b.className = `w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all ${selIds.includes(id) ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-700'}`;
        b.querySelector('svg')?.remove();
        if (selIds.includes(id)) {
          b.insertAdjacentHTML('beforeend', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><path d="M5 12l5 5L20 7" /></svg>');
        }
        updateSaveBtn();
      });
    });

    // 保存
    document.getElementById('outfit-save').addEventListener('click', () => {
      const outfit = {
        id: baseOutfit?.id || genId('outfit'),
        name: document.getElementById('outfit-name').value.trim(),
        itemIds: selIds,
        minTemp: Number(document.getElementById('outfit-mintemp').value),
        maxTemp: Number(document.getElementById('outfit-maxtemp').value),
        note: document.getElementById('outfit-note').value.trim() || undefined,
        photo: photo || undefined,
      };
      if (baseOutfit) _outfits = _outfits.map(o => o.id === outfit.id ? outfit : o);
      else _outfits = [..._outfits, outfit];
      persist();
      showForm = false;
      editingOutfit = null;
      renderTemp();
    });
  }

  renderTemp();
  container.appendChild(panel);
}

/* ===== 已处理记录面板 ===== */

function showHistoryPanel(container) {
  const processedItems = _items.filter(i => i.status === 'processed').sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  const panel = document.createElement('div');
  panel.className = 'absolute inset-0 z-[60] flex flex-col bg-white panel-enter';
  panel.innerHTML = `
    <div class="shrink-0 flex items-center justify-between px-4 h-14 border-b border-gray-100">
      <h2 class="text-base font-semibold text-gray-900">已处理记录</h2>
      <button id="history-close" class="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">${ICONS.XLarge}</button>
    </div>
    <div class="flex-1 overflow-y-auto no-scrollbar p-4">
      ${processedItems.length === 0 ? `
        <div class="flex flex-col items-center justify-center py-16"><div class="scale-75 mb-3">${ICONS.Archive}</div><div class="text-gray-400 text-sm">暂无已处理记录</div></div>
      ` : `
        <div class="space-y-2">
          ${processedItems.map(item => `
            <button data-edititem="${item.id}" class="w-full bg-white rounded-xl p-3 border border-gray-100 flex items-center gap-3 text-left active:bg-gray-50">
              <div class="w-3 h-3 rounded-full shrink-0" style="background-color: ${getCatColor(item.category)}"></div>
              <div class="flex-1 min-w-0">
                <div class="text-sm text-gray-900">${esc(item.name)}</div>
                <div class="text-[10px] text-gray-400">${new Date(item.updatedAt).toLocaleDateString('zh-CN')} 处理</div>
              </div>
              ${item.originalPrice ? `<div class="text-xs text-gray-400">¥${item.originalPrice}</div>` : ''}
            </button>
          `).join('')}
        </div>
      `}
    </div>
  `;
  document.getElementById('history-close').addEventListener('click', () => panel.remove());
  bindItemEditEvents(panel);
  container.appendChild(panel);
}

/* ===== 收纳点清单面板 ===== */

function showSpotsPanel(container) {
  const panel = document.createElement('div');
  panel.className = 'absolute inset-0 z-[60] flex flex-col bg-white panel-enter';

  function renderSpots() {
    panel.innerHTML = `
      <div class="shrink-0 flex items-center justify-between px-4 h-14 border-b border-gray-100">
        <h2 class="text-base font-semibold text-gray-900">收纳点清单</h2>
        <button id="spots-close" class="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">${ICONS.XLarge}</button>
      </div>
      <div class="flex-1 overflow-y-auto no-scrollbar p-4">
        ${_floorPlans.length === 0 ? `
          <div class="flex flex-col items-center justify-center py-16"><div class="scale-75 mb-3">${ICONS.MapPin}</div><div class="text-gray-400 text-sm">暂无收纳点</div></div>
        ` : `
          <div class="space-y-4">
            ${_floorPlans.map(plan => {
              const allSpots = collectAllSpotsList(plan.spots);
              return `
                <div>
                  <button data-navplan="${plan.id}" class="w-full flex items-center gap-2 py-2.5 text-left active:bg-gray-50 rounded-lg px-2 -mx-2 mb-1">
                    <div class="scale-75 text-gray-400 shrink-0">${ICONS.MapPin}</div>
                    <span class="text-sm font-medium text-gray-900">${esc(plan.name)}</span>
                    <span class="text-[10px] text-gray-400">${allSpots.length} 个收纳点</span>
                    <div class="scale-75 text-gray-300 ml-auto">${ICONS.ChevronRightSmall}</div>
                  </button>
                  <div class="space-y-0.5">
                    ${allSpots.map(({ spot, depth }) => `
                      <div class="flex items-center gap-2 py-1.5" style="margin-left: ${depth * 16 + 12}px">
                        <div class="w-2 h-2 rounded-full bg-gray-300 shrink-0"></div>
                        <span class="text-xs text-gray-600">${esc(spot.name)}</span>
                        <span class="text-[10px] text-gray-400">${spot.itemIds.length} 件</span>
                        ${spot.children.length > 0 ? `<span class="text-[10px] text-gray-400">${spot.children.length} 个子收纳</span>` : ''}
                      </div>
                    `).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    `;

    document.getElementById('spots-close').addEventListener('click', () => panel.remove());
    document.querySelectorAll('[data-navplan]').forEach(b => b.addEventListener('click', () => {
      _targetPlanId = b.dataset.navplan;
      _activeTab = 'home';
      _homeView = 'map';
      panel.remove();
      renderApp();
    }));
  }

  renderSpots();
  container.appendChild(panel);
}

/* ===== SECTION 15: 应用初始化 ===== */

document.addEventListener('DOMContentLoaded', () => {
  seedIfEmpty();
  const data = loadData();
  _items = data.items;
  _floorPlans = data.floorPlans;
  _outfits = loadOutfits();

  renderApp();
});
