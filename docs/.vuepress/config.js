module.exports = {
    theme: 'reco', // 使用的主题
    title: '沧海一粟', // 网站的标题，它将会被用作所有页面标题的前缀。
    description: '来说说你的故事', // 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中
    lange: 'zh-CN', // 语言
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
    base: '/', // 设置站点根路径，这是部署到github相关的配置
    // markdown 配置
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    // 主题配置
    themeConfig: {
        type: 'blog',
        // 搜索设置
        search: true,
        searchMaxSuggestions: 10, // 最大搜索结果数
        logo: '/logo.png',
        // 作者
        author: 'Amos',
        authorAvatar: '/logo.png',
        // 头部导航栏
        nav: [
            {
                text: '笔记本',
                icon: 'reco-document',
                items: [
                    { text: '基础知识', link: '/blog/basic/' },
                    { text: '计算机基础', link: '/blog/computerBasic/' },
                    { text: '编程思想', link: '/blog/codingThink/' },
                    { text: '库和框架', link: '/blog/frame/' },
                    { text: '工程', link: '/blog/engineering/' },
                    { text: '后端知识', link: '/blog/service/' },
                    { text: '领域知识', link: '/blog/field/' },
                    { text: '技术领域', link: '/blog/technology/' },
                    { text: '社区发展', link: '/blog/community/' },
                ]
            },
            { text: '时间轴', link: '/timeline/', icon: 'reco-date' },
            { text: 'GitHub', link: 'https://github.com/Amos-zH', icon: 'reco-github' },
        ],
        // 首页的友链展示
        friendLink: [
            {
                title: 'leetcode',
                desc: '伤脑筋',
                link: 'https://leetcode-cn.com/'
            },
            {
                title: 'vuepress-theme-reco',
                desc: 'A simple and beautiful vuepress Blog & Doc theme.',
                avatar: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
                link: 'https://vuepress-theme-reco.recoluan.com'
            },
        ],
        // 博客配置
        blogConfig: {
            category: {
                location: 2,     // 在导航栏菜单中所占的位置，默认2
                text: '模块' // 默认文案 “分类”
            },
            tag: {
                location: 3,     // 在导航栏菜单中所占的位置，默认3
                text: '标签'      // 默认文案 “标签”
            },
            socialLinks: [     // 信息栏展示社交信息
                { icon: 'reco-github', link: 'https://github.com/Amos-zH' },
                { icon: 'reco-csdn', link: 'https://blog.csdn.net/qq_38910842' },
                { icon: 'reco-juejin', link: 'https://juejin.cn/user/1855631356862839/posts' }
            ]
        },
        // 侧边栏配置
        sidebarDepth: 1,
        subSidebar: 'auto', // 博客右侧子侧边栏
        sidebar: {
            '/blog/': [
                {
                    title: '前端课程',
                    collapsable: true,
                    children: [
                        'class/class01',
                        'class/class02'
                    ]
                },
                {
                    title: '基础知识',
                    collapsable: true,
                    children: [
                        'basic/',
                        'basic/exam01'
                    ]
                },
                {
                    title: '计算机基础',
                    collapsable: true,
                    children: [
                        'computerBasic/',
                        'computerBasic/exam05'
                    ]
                }
            ]
        },
        // 备案
        record: 'ICP 备案文案',
        recordLink: 'ICP 备案指向链接',
        cyberSecurityRecord: '公安部备案文案',
        cyberSecurityLink: '公安部备案指向链接',
        // 项目开始时间，只填写年份
        startYear: '2020',
        // 最后更新时间
        lastUpdated: '上次更新'
    }
}