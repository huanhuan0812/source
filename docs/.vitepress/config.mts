// .vitepress/config.mts
import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path, { posix } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { SearchPlugin } from 'vitepress-plugin-search'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..') // 项目根目录
const sourceDir = path.resolve(projectRoot, '') // 文档源目录（当前目录）

// 定义需要忽略的文件夹列表
const IGNORED_DIRS = ['.vitepress', 'node_modules', '.git', 'dist' , 'image' , 'public'];

// 定义侧边栏项的类型（支持嵌套）
interface SidebarItem {
  text: string
  link?: string
  items?: SidebarItem[]
  collapsed?: boolean
}

// 定义导航项的类型
interface NavItem {
  text: string
  link: string
  activeMatch?: string
}

// 检查是否应该忽略该目录
function shouldIgnoreDir(dirName: string): boolean {
  return IGNORED_DIRS.includes(dirName) || dirName.startsWith('.');
}

// 解析Markdown文件，获取Frontmatter中的title、order和hide
function parseFrontmatter(filePath: string): { 
  title: string | null; 
  order: number | null;
  hide: boolean;
} {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(content)
    return {
      title: data.title || null,
      order: typeof data.order === 'number' ? data.order : null,
      hide: data.hide === true ? true : false
    }
  } catch (error) {
    return { title: null, order: null, hide: false }
  }
}

// 格式化文件名为标题
function formatFileNameToTitle(fileName: string): string {
  return fileName
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// 格式化目录名为标题
function formatDirNameToTitle(dirName: string): string {
  return dirName
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// 递归构建侧边栏树
function buildSidebarTree(dir: string, basePath: string = ''): SidebarItem[] {
  const items: SidebarItem[] = [];
  const dirItems: { path: string; item: SidebarItem }[] = [];
  
  if (!fs.existsSync(dir)) {
    return [];
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  // 首先检查当前目录是否有index.md，用于决定目录标题
  const indexFile = entries.find(e => !e.isDirectory() && e.name === 'index.md');
  let dirTitle: string | null = null;
  let dirOrder: number | null = null;
  let dirHide: boolean = false;
  
  if (indexFile) {
    const indexPath = path.join(dir, indexFile.name);
    const { title, order, hide } = parseFrontmatter(indexPath);
    dirTitle = title;
    dirOrder = order;
    dirHide = hide;
  }

  // 如果当前目录被标记为隐藏，则返回空数组
  if (dirHide) {
    console.log(`📁 隐藏目录: ${dir}`);
    return [];
  }

  // 处理所有子目录（递归）- 过滤掉需要忽略的目录
  const subDirs = entries.filter(e => e.isDirectory() && !shouldIgnoreDir(e.name));
  for (const subDir of subDirs) {
    const subDirPath = path.join(dir, subDir.name);
    const subDirRelativePath = basePath ? path.join(basePath, subDir.name) : subDir.name;
    
    // 递归构建子目录的侧边栏
    const subItems = buildSidebarTree(subDirPath, subDirRelativePath);
    
    if (subItems.length > 0) {
      // 检查子目录是否有index.md来确定标题
      const subDirIndexPath = path.join(subDirPath, 'index.md');
      let subDirTitle = formatDirNameToTitle(subDir.name);
      let subDirOrder = 999;
      let subDirHide = false;
      
      if (fs.existsSync(subDirIndexPath)) {
        const { title, order, hide } = parseFrontmatter(subDirIndexPath);
        if (title) subDirTitle = title;
        if (order !== null) subDirOrder = order;
        subDirHide = hide;
      }
      
      // 如果子目录本身没有被隐藏，才添加到侧边栏
      if (!subDirHide) {
        dirItems.push({
          path: subDir.name,
          item: {
            text: subDirTitle,
            items: subItems,
            collapsed: true,
          }
        });
      } else {
        console.log(`📁 隐藏子目录: ${subDirPath}`);
      }
    }
  }

  // 处理当前目录下的所有非index.md文件
  const files = entries.filter(e => 
    !e.isDirectory() && 
    e.name.endsWith('.md') && 
    e.name !== 'index.md'
  );

  for (const file of files) {
    const filePath = path.join(dir, file.name);
    const fileName = file.name.replace(/\.md$/, '');
    const { title, order, hide } = parseFrontmatter(filePath);
    
    // 如果文件被标记为隐藏，则跳过
    if (hide) {
      console.log(`📄 隐藏文件: ${filePath}`);
      continue;
    }
    
    const link = `/${basePath ? basePath + '/' : ''}${fileName}`;
    
    dirItems.push({
      path: fileName,
      item: {
        text: title || formatFileNameToTitle(fileName),
        link: link
      }
    });
  }

  // 按order和名称排序所有项
  dirItems.sort((a, b) => {
    // 获取每个项的order
    let orderA = 999;
    let orderB = 999;
    
    // 如果是目录项，尝试从index.md获取order
    if (a.item.items) {
      const indexPath = path.join(dir, a.path, 'index.md');
      if (fs.existsSync(indexPath)) {
        const { order } = parseFrontmatter(indexPath);
        if (order !== null) orderA = order;
      }
    } else {
      // 如果是文件，从文件本身获取order
      const filePath = path.join(dir, a.path + '.md');
      if (fs.existsSync(filePath)) {
        const { order } = parseFrontmatter(filePath);
        if (order !== null) orderA = order;
      }
    }
    
    if (b.item.items) {
      const indexPath = path.join(dir, b.path, 'index.md');
      if (fs.existsSync(indexPath)) {
        const { order } = parseFrontmatter(indexPath);
        if (order !== null) orderB = order;
      }
    } else {
      const filePath = path.join(dir, b.path + '.md');
      if (fs.existsSync(filePath)) {
        const { order } = parseFrontmatter(filePath);
        if (order !== null) orderB = order;
      }
    }
    
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return a.path.localeCompare(b.path);
  });

  return dirItems.map(item => item.item);
}

// 生成顶部导航栏
function generateNav(): NavItem[] {
  console.log(`\n=== 生成顶部导航栏 ===`);
  
  if (!fs.existsSync(sourceDir)) {
    console.warn(`⚠️ 目录不存在: ${sourceDir}`);
    return [];
  }

  const navItems: NavItem[] = [];
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
  
  // 添加固定的返回首页按钮
  navItems.push({
    text: '🏠 首页',
    link: '/',
    activeMatch: '^/$'  // 只在根路径时高亮
  });
  console.log(`✅ 添加固定的返回首页按钮`);
  
  // 只处理source目录下的一级子目录，过滤掉需要忽略的目录
  const topLevelDirs = entries.filter(e => 
    e.isDirectory() && !shouldIgnoreDir(e.name)
  );
  
  // 按目录名排序
  topLevelDirs.sort((a, b) => a.name.localeCompare(b.name));
  
  for (const dir of topLevelDirs) {
    const dirPath = path.join(sourceDir, dir.name);
    const indexPath = path.join(dirPath, 'index.md');
    
    // 检查目录是否被隐藏（通过index.md的hide字段）
    let dirHide = false;
    let dirTitle = formatDirNameToTitle(dir.name);
    
    if (fs.existsSync(indexPath)) {
      const { title, hide } = parseFrontmatter(indexPath);
      if (title) dirTitle = title;
      dirHide = hide;
    }
    
    // 如果目录被标记为隐藏，则不添加到导航栏
    if (dirHide) {
      console.log(`🚫 导航栏隐藏目录: ${dir.name}`);
      continue;
    }
    
    // 添加到导航栏
    navItems.push({
      text: dirTitle,
      link: `/${dir.name}/`,  // 链接到目录的index页面
      activeMatch: `^/${dir.name}/`  // 匹配当前目录下的所有路径
    });
    
    console.log(`✅ 添加导航项: ${dirTitle} -> /${dir.name}/`);
  }
  
  console.log(`✅ 生成了 ${navItems.length} 个导航项（包含固定的首页按钮）`);
  return navItems;
}

// 生成侧边栏配置
function generateSidebar(): Record<string, SidebarItem[]> {
  console.log(`\n=== 生成侧边栏树 ===`);
  console.log(`Source目录: ${sourceDir}`);

  if (!fs.existsSync(sourceDir)) {
    console.warn(`⚠️ 目录不存在: ${sourceDir}`);
    return {};
  }

  const sidebarConfig: Record<string, SidebarItem[]> = {};
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
  
  // 处理所有一级子目录，过滤掉需要忽略的目录
  const topLevelDirs = entries.filter(e => 
    e.isDirectory() && !shouldIgnoreDir(e.name)
  );
  
  for (const dir of topLevelDirs) {
    const dirPath = path.join(sourceDir, dir.name);
    const indexPath = path.join(dirPath, 'index.md');
    
    // 检查目录是否被隐藏
    let dirHide = false;
    let dirTitle = formatDirNameToTitle(dir.name);
    
    if (fs.existsSync(indexPath)) {
      const { title, hide } = parseFrontmatter(indexPath);
      if (title) dirTitle = title;
      dirHide = hide;
    }
    
    if (dirHide) {
      console.log(`🚫 侧边栏隐藏目录: ${dir.name}`);
      continue;
    }
    
    // 构建该目录的侧边栏树
    const items = buildSidebarTree(dirPath, dir.name);
    
    if (items.length > 0) {
      // 为该目录配置侧边栏
      sidebarConfig[`/${dir.name}/`] = [{
        text: dirTitle,
        items: items,
        collapsed: false,
      }];
      
      console.log(`✅ 为 /${dir.name}/ 生成了 ${items.length} 个侧边栏项目`);
    }
  }
  
  // 处理根目录（如果有文件）- 但忽略.vitepress等目录
  const rootItems = buildSidebarTree(sourceDir, '');
  if (rootItems.length > 0) {
    const rootIndexPath = path.join(sourceDir, 'index.md');
    let rootTitle = '首页';
    
    if (fs.existsSync(rootIndexPath)) {
      const { title } = parseFrontmatter(rootIndexPath);
      if (title) rootTitle = title;
    }
    
    sidebarConfig['/'] = [{
      text: rootTitle,
      items: rootItems,
      collapsed: false,
    }];
    
    console.log(`✅ 为根目录生成了 ${rootItems.length} 个侧边栏项目`);
  }
  
  return sidebarConfig;
}

const searchOptions = {
  previewLength: 62, // 搜索结果预览长度
  buttonLabel: '搜索',
  placeholder: '搜索文档',
  allow: [], // 允许搜索的文件，默认所有 .md 文件
  ignore: ['*.png','*.jpg','*.jpeg','*.gif','.vitepress/*'], // 忽略的文件
  tokenize: 'full', // 分词方式：'full' 或 'forward'
  cache: true, // 是否缓存搜索结果
  respect: 'title', // 尊重标题
  encode: false, // 是否编码
  weight: 100, // 权重
  encodeSpecialChars: true, // 是否编码特殊字符
  encodeSpecialCharsPattern: /[\x00-\x1F\x7F\u2000-\u200F\u2028-\u202F\u205F-\u206F\u3000\uFEFF\uFFFC]/g
}

export default defineConfig({
  base: '/source/',
  title: '知识库',
  
  // 添加搜索插件
  vite: {
    plugins: [
      SearchPlugin(searchOptions)
    ]
  },

  themeConfig: {
    nav: generateNav(),
    
    // 侧边栏配置 - 动态生成
    sidebar: generateSidebar(),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/huanhuan0812/source' }
    ]
  },

  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  }
})