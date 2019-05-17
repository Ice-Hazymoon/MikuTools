import keywords from './keywords';

module.exports = {
    mode: 'universal',
    env: {
        title: 'MikuTools',
        description: '一个轻量的工具集合',
        url:
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:3000'
                : 'https://miku.tools'
    },
    head: {
        title: `MikuTools - 一个轻量的工具集合`,
        meta: [
            {
                charset: 'utf-8'
            },
            {
                hid: 'viewport',
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'keywords',
                name: 'keywords',
                content: keywords
            },
            {
                hid: 'description',
                name: 'description',
                itemprop: 'description',
                content: '一个轻量的工具集合'
            },
            {
                hid: 'author',
                name: 'author',
                content: 'Ice-Hazymoon'
            },
            {
                name: 'HandheldFriendly',
                content: true
            },
            {
                property: 'og:site_name',
                content: 'MikuTools'
            },
            {
                name: 'mobile-web-app-capable',
                content: 'yes'
            },
            {
                name: 'apple-mobile-web-app-title',
                content: 'MikuTools'
            },
            {
                name: 'apple-mobile-web-app-status-bar-style',
                content: 'white'
            },
            {
                name: 'theme-color',
                content: '#ffffff'
            }
        ],
        link: [
            {
                rel: 'shortcut icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            }
        ]
    },
    loading: {
        color: '#00adb5',
        height: '4px'
    },
    css: [
        'normalize.css',
        '~styles/main.scss',
        'eva-icons/style/eva-icons.css'
    ],

    // styleResources: {
    //     // scss: []
    // },
    plugins: [
        './plugins/request.js',
        {
            src: './plugins/db.js',
            ssr: false
        },
        {
            src: './plugins/modal.js',
            ssr: false
        },
        {
            src: './components/UI/index.js'
        },
        {
            src: './plugins/shortid.js',
            ssr: false
        },
        {
            src: './plugins/vue-lazyload.js',
            ssr: false
        },
        {
            src: './plugins/vue-toasted.js',
            ssr: false
        },
        {
            src: '~/plugins/localStorage.js',
            ssr: false
        }
    ],
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        '@nuxtjs/style-resources',
        [
            '@nuxtjs/google-analytics',
            {
                id: 'UA-98634098-5'
            }
        ]
    ],
    axios: {
        progress: false
    },
    build: {
        postcss: {
            plugins: {
                'postcss-pxtorem': {
                    rootValue: 16,
                    propList: ['*'],
                    selectorBlackList: ['html'],
                    replace: false
                },
                autoprefixer: {}
            }
        }
    },
    manifest: {
        description: '收集实用的小工具',
        display: 'standalone',
        name: 'MikuTools',
        short_name: 'MikuTools',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        scope: '/',
        lang: 'zh-cn'
    },
    router: {
        prefetchLinks: false,
        middleware: ['getCurrentTool']
    }
};
