import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'
import { autoGenerateSidebar } from './utils/autoSidebar.mjs'

// 生成侧边栏
const sidebar = autoGenerateSidebar()

export default defineUserConfig({
    // 基础配置
    base: '/',
    title: 'my docs',
    description: 'my documentation from deepseek and other places',

    // 指定 bundler
    bundler: viteBundler(),

    // 指定主题
    theme: defaultTheme({
        logo: 'https://vuejs.org/images/logo.png',

        navbar: [
            { text: '首页', link: '/source/' },
            ...Object.keys(sidebar).filter(path => !path.includes('/image/')&&!path.includes('/source/'))
                .map(path => ({
                    text: path.split('/')[1].charAt(0).toUpperCase() + path.split('/')[1].slice(1),
                    link: path
                }))
        ],

        sidebar: sidebar,

        repo: 'https://github.com/huanhuan0812/source',
        docsDir: 'docs',
        editLinkText: '帮助改进此页面'
    }),

    // 插件配置
    plugins: [
        ['@vuepress/plugin-search', {
            locales: {
                '/': { placeholder: '搜索文档' }
            },
            hotKeys: ['s', '/'],
            maxSuggestions: 10
        }],
        ['@vuepress/plugin-shiki', {
            theme: 'github-light',
            langs: ['javascript', 'typescript', 'html', 'css', 'bash', 'json', 'cpp', 'java', 'md']
        }],
        ['@vuepress/plugin-copy-code', {
            showInMobile: true,
            duration: 2000
        }]
    ],

    // 不再需要 markdown.code 配置
})