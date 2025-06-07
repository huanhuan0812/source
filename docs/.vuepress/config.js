const { defineUserConfig } = require('vuepress')
const sidebar = require('./utils/autoSidebar')

module.exports = defineUserConfig({
    base: '/source/',
    title: '自动目录知识库',
    description: '自动检索所有子目录的 Markdown 文档',

    head: [
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],

    themeConfig: {
        logo: 'https://vuejs.org/images/logo.png',

        navbar: [
            { text: '首页', link: '/' },
            ...Object.keys(sidebar).map(path => ({
                text: path.split('/')[1].charAt(0).toUpperCase() + path.split('/')[1].slice(1),
                link: path
            }))
        ],

        sidebar,

        repo: 'https://github.com/huanhuan0812/vuepress-auto-docs',
        docsDir: 'docs',
        editLinkText: '帮助改进此页面'
    },

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
            langs: ['javascript', 'typescript', 'html', 'css', 'bash', 'json',"cpp","java","md"]
        }],
        ['@vuepress/plugin-copy-code', {
            showInMobile: true,
            duration: 2000
        }]
    ],

    markdown: {
        code: {
            lineNumbers: true
        }
    }
})