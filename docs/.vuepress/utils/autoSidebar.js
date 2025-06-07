const fs = require('fs')
const path = require('path')

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function getSidebarItems(dir, base = '') {
    const fullPath = path.join(__dirname, '../../', dir)
    if (!fs.existsSync(fullPath)) return []

    const items = []
    let files = []

    try {
        files = fs.readdirSync(fullPath)
            .filter(item => !item.startsWith('.')) // 过滤隐藏文件
            .sort((a, b) => {
                // 让 README.md 排在第一位
                if (a === 'README.md') return -1
                if (b === 'README.md') return 1
                return a.localeCompare(b)
            })
    } catch (err) {
        console.error(`Error reading directory ${fullPath}:`, err)
        return []
    }

    for (const item of files) {
        try {
            const itemPath = path.join(fullPath, item)
            const stat = fs.statSync(itemPath)
            const routePath = path.posix.join(base, item.replace(/\.md$/, ''))

            if (stat.isDirectory()) {
                const readmePath = path.join(itemPath, 'README.md')
                if (fs.existsSync(readmePath)) {
                    items.push({
                        text: capitalize(item),
                        link: `${routePath}/`,
                        collapsible: true,
                        children: getSidebarItems(`${dir}/${item}`, `${base}/${item}`)
                    })
                }
            } else if (item.endsWith('.md') && item !== 'README.md') {
                items.push({
                    text: capitalize(item.replace(/\.md$/, '').replace(/-/g, ' ')),
                    link: routePath
                })
            }
        } catch (err) {
            console.error(`Error processing item ${item}:`, err)
        }
    }

    return items
}

module.exports = function() {
    const rootDir = './docs'
    const sidebar = {}

    try {
        fs.readdirSync(rootDir).forEach(item => {
            try {
                const itemPath = path.join(rootDir, item)
                if (fs.statSync(itemPath).isDirectory() && item !== '.vuepress') {
                    sidebar[`/${item}/`] = getSidebarItems(item)
                }
            } catch (err) {
                console.error(`Error processing directory item ${item}:`, err)
            }
        })
    } catch (err) {
        console.error(`Error reading root directory ${rootDir}:`, err)
    }

    return sidebar
}