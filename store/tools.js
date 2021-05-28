export const state = () => {
    const tools = [
        {
            title: '其他工具',
            icon: 'layers-outline',
            list: [
                {
                    name: '屏幕录制',
                    path: '/screen_record',
                    head: {
                        keywords: ['屏幕录制', '在线录屏'],
                        description: '在网页上完成录屏'
                    }
                },
                {
                    name: '番茄时钟',
                    path: '/pomodoro_technique',
                    head: {
                        keywords: ['在线番茄时钟', '番茄工作法'],
                        description: '在线番茄时钟'
                    }
                },
                {
                    name: '人生小格',
                    path: '/lifecount',
                    head: {
                        keywords: [
                            '人生小格',
                            '人生进度条',
                            'lifecount',
                            '生命进度'
                        ],
                        description: '人生小格'
                    }
                },
                {
                    name: '随机数生成',
                    path: '/random',
                    head: {
                        keywords: ['在线随机数生成'],
                        description: '在线随机数生成'
                    }
                },
                {
                    name: '图片加包浆',
                    path: '/image_patina',
                    head: {
                        keywords: [
                            '图片做旧',
                            '表情包做旧',
                            '电子包浆',
                            '表情包包浆'
                        ],
                        description: '图片包浆'
                    }
                },
                {
                    name: 'LINE 贴纸下载',
                    path: '/line_sticker_download',
                    head: {
                        keywords: [
                            '怎么下载LINE表情包',
                            '怎么下载LINE贴纸',
                            '怎么保存LINE表情包',
                            'LINE表情包png'
                        ],
                        description: 'LINE贴纸在线下载'
                    }
                },
                {
                    name: '帮你百度',
                    path: '/search_help',
                    head: {
                        keywords: ['帮你百度', '怎么用百度', '怎么用谷歌'],
                        description: '帮你百度'
                    }
                },
                {
                    name: 'SS/R/V2ray 配置解析',
                    path: '/ssr_decode',
                    head: {
                        keywords: [
                            'SSR配置解密',
                            'SS配置解密',
                            'V2ray配置解密'
                        ],
                        description: '在线SSR配置解析'
                    }
                },
                {
                    name: '亲戚关系计算器',
                    path: '/relatives_name',
                    head: {
                        keywords: ['亲戚关系计算器'],
                        description: '在线亲戚关系计算器'
                    }
                },
                {
                    name: '二维码生成/解析',
                    path: '/qrcode_generation',
                    head: {
                        keywords: ['在线二维码生成', '在线二维码内容解析'],
                        description: '二维码生成/解析'
                    }
                },
                {
                    name: '这是什么动漫',
                    path: '/what_anime_is_this',
                    head: {
                        keywords: ['根据截图搜索动漫', 'whatanime'],
                        description: '根据截图搜索动漫'
                    }
                },
                {
                    name: '中国传统色',
                    path: '/china_colors',
                    head: {
                        keywords: ['中国传统色'],
                        description: '中国传统色'
                    }
                },
                {
                    name: '日本传统色',
                    path: '/japan_colors',
                    head: {
                        keywords: ['日本传统色', '日本の伝統色'],
                        description: '日本传统色'
                    }
                },
                {
                    name: '颜色处理',
                    path: '/color',
                    head: {
                        keywords: ['hex转rgb', '颜色代码转换', '在线颜色选择'],
                        description: '在线图片选择'
                    }
                },
                {
                    name: '收款码合并',
                    path: '/universal_pay',
                    head: {
                        keywords: [
                            '免费收款码合并',
                            '免费三码合一',
                            '支付宝收款码合并',
                            '微信收款码合并',
                            'QQ收款码合并'
                        ],
                        description: '在线免费收款码合并'
                    }
                },
                {
                    name: '温度单位转换',
                    path: '/temperature_conversion',
                    head: {
                        keywords: [
                            '温度单位转换',
                            '摄氏度单位转换',
                            '华氏度转单位换',
                            '开氏度单位转换',
                            '兰氏度单位转换',
                            '列氏度单位转换'
                        ],
                        description: '在线国际温度单位转换'
                    }
                },
                {
                    name: '身份证号码',
                    path: '/chinese_id',
                    head: {
                        keywords: [
                            '身份证号码查询',
                            '随机身份证号码生成',
                            '身份证信息查询'
                        ],
                        description: '身份证号码查询/生成'
                    }
                }
            ]
        },
        {
            title: '图片相关',
            icon: 'image-outline',
            list: [
                {
                    name: '九宫格切图',
                    path: '/img_jiugongge',
                    head: {
                        keywords: ['图片九宫格', '九宫格切图', '九宫格'],
                        description: '图片分割成九宫格'
                    }
                },
                {
                    name: 'Anime 4K',
                    path: '/anime4k',
                    head: {
                        keywords: ['anime'],
                        description: '3毫秒放大你老婆，支持视频/图片。'
                    }
                },
                {
                    name: 'Cyberpunk 2077 图片制作',
                    path: '/cyberpunk2077',
                    head: {
                        keywords: [
                            'Cyberpunk2077',
                            '赛博朋克2077',
                            'Cyberpunk 2077 meme'
                        ],
                        description: '在线Cyberpunk 2077风格图片制作'
                    }
                },
                {
                    name: '令和举牌生成',
                    path: '/linghe',
                    head: {
                        keywords: ['令和举牌风格图片制作'],
                        description: '在线令和举牌风格图片制作'
                    }
                },
                {
                    name: 'ACG 表情包制作',
                    path: '/acg_meme',
                    head: {
                        keywords: [
                            '动漫表情包制作',
                            '表情包制作',
                            '咋百度啊',
                            '啥玩意儿啊'
                        ],
                        description: '在线动漫表情包制作'
                    }
                },
                {
                    name: 'Pornhub 风格Logo',
                    path: '/pornhub_logo',
                    head: {
                        keywords: ['PornHub 风格图片制作', 'PornHub Logo 制作'],
                        description: '在线 PornHub 风格图片制作'
                    }
                },
                {
                    name: 'YouTube 风格Logo',
                    path: '/youtube_logo',
                    head: {
                        keywords: ['YouTube 风格图片制作', 'YouTube Logo 制作'],
                        description: '在线 YouTube 风格图片制作'
                    }
                },
                {
                    name: '视频转 GIF',
                    path: '/video2gif',
                    head: {
                        keywords: ['视频转换GIF图片'],
                        description: '在线视频转换GIF图片'
                    }
                },
                {
                    name: 'GIF 图片分解',
                    path: '/gif_splitter',
                    head: {
                        keywords: ['GIF图片分解'],
                        description: '在线分解GIF图片'
                    }
                },
                {
                    name: '微博生成器',
                    path: '/meme-weibo',
                    head: {
                        keywords: ['微博生成器', '王思聪微博生成器'],
                        description: '在线微博生成器'
                    }
                },
                {
                    name: '抖音风格文字生成',
                    path: '/douyin_text',
                    head: {
                        keywords: ['抖音风格文字生成', '抖音样式文字生成'],
                        description: '在线抖音风格文字生成'
                    }
                },
                {
                    name: '图片编辑',
                    path: '/image_editor',
                    head: {
                        keywords: ['图片编辑器', '图片处理', '表情包制作'],
                        description: '在线图片编辑器'
                    }
                },
                {
                    name: '身份证加水印',
                    path: '/watermark',
                    head: {
                        keywords: [
                            '身份证加水印',
                            '敏感信息加水印',
                            '图片加水印'
                        ],
                        description: '在线身份证加水印'
                    }
                }
            ]
        },
        {
            title: '文字处理',
            icon: 'text-outline',
            list: [
                {
                    name: '文本对比',
                    path: '/textdiff',
                    head: {
                        keywords: ['文本对比', '代码对比'],
                        description: '文本在线对比'
                    }
                },
                {
                    name: '文本去重',
                    path: '/remove_duplicate',
                    head: {
                        keywords: ['文本在线去重', '文本去除重复'],
                        description: '文本在线去重'
                    }
                },
                {
                    name: '数字转大写中文',
                    path: '/number_to_zh',
                    head: {
                        keywords: [
                            '数字转大写中文',
                            '中文金额转换',
                            '人民币转中文',
                            '中文转人民币'
                        ],
                        description: '在线人民币转中文'
                    }
                },
                {
                    name: '富文本编辑器',
                    path: '/rich_text_editor',
                    head: {
                        keywords: ['富文本编辑器'],
                        description: '在线富文本编辑器'
                    }
                },
                {
                    name: 'Markdown 编辑器',
                    path: '/markdown',
                    head: {
                        keywords: ['Markdown编辑器'],
                        description: '在线Markdown编辑器'
                    }
                },
                {
                    name: '摩斯电码转换',
                    path: '/morse',
                    head: {
                        keywords: ['摩斯电码转换', '中文摩斯电码转换'],
                        description: '在线摩斯电码转换'
                    }
                },
                {
                    name: '盲人摸象加解密',
                    path: '/sot1_encrypt',
                    head: {
                        keywords: ['盲人摸象', '转码', '加解密'],
                        description: '在线盲人摸象加解密'
                    }
                },
                {
                    name: '中英文加空格',
                    path: '/text_autospace',
                    head: {
                        keywords: ['中英文加空格'],
                        description: '在线中英文加空格'
                    }
                }
            ]
        },
        {
            title: '编程开发',
            icon: 'code-outline',
            list: [
                {
                    name: 'CSS 兼容性处理',
                    path: '/autoprefixer',
                    head: {
                        keywords: ['CSS兼容性处理', 'autoprefixer', 'postcss'],
                        description: '在线CSS兼容性处理'
                    }
                },
                {
                    name: '时间戳转换',
                    path: '/timestamp',
                    head: {
                        keywords: ['时间戳转换', '时间戳获取'],
                        description: '在线时间戳转换|格式化工具'
                    }
                },
                {
                    name: 'URL 格式化',
                    path: '/url_format',
                    head: {
                        keywords: ['URL 格式化', 'URL参数查看'],
                        description: '在线URL格式化'
                    }
                },
                {
                    name: '文本加密解密',
                    path: '/crypto',
                    head: {
                        keywords: [
                            '文本加密解密',
                            '文本哈希计算',
                            'MD5加密',
                            'AES',
                            'DES',
                            'HmacMD5',
                            'HmacSHA1',
                            'HmacSHA256',
                            'HmacSHA512',
                            'RC4',
                            'RC4Drop',
                            'RIPEMD160',
                            'Rabbit',
                            'SHA1',
                            'SHA256',
                            'SHA3',
                            'TripleDES'
                        ],
                        description: '在线文本哈希散列计算'
                    }
                },
                {
                    name: 'Linux 命令查询',
                    path: '/linux_command',
                    head: {
                        keywords: ['Linux命令查询'],
                        description: '在线Linux命令查询'
                    }
                },
                {
                    name: '文本编码解码',
                    path: '/encoding',
                    head: {
                        keywords: [
                            '文本编码解码',
                            '文本base64编码',
                            '社会主义核心价值观加密'
                        ],
                        description: '在线文本编码解码'
                    }
                },
                {
                    name: '执行 Cron 表达式',
                    path: '/crontab',
                    head: {
                        keywords: ['在线执行Cron表达式', '在线模拟Cron表达式'],
                        description: '在线执行Cron表达式'
                    }
                },
                {
                    name: '进制转换',
                    path: '/hexconvert',
                    head: {
                        keywords: [
                            '进制转换',
                            '二进制转换',
                            '八进制转换',
                            '十进制转换',
                            '十六进制转换',
                            '三十二进制转换'
                        ],
                        description: '在线进制转换'
                    }
                },
                {
                    name: 'CIDR 计算',
                    path: '/cidr',
                    head: {
                        keywords: [
                            'CIDR',
                            'IP',
                            '网络ID',
                            'IP地址',
                            '子网掩码',
                            '广播地址'
                        ],
                        description: '在线CIDR计算'
                    }
                },
                {
                    name: 'UserAgent 解析',
                    path: '/ua_parser',
                    head: {
                        keywords: ['在线 UserAgent 解析'],
                        description: 'UserAgent 解析'
                    }
                },
                {
                    name: '前端 CDN 查询',
                    path: '/cdnjs',
                    head: {
                        keywords: [
                            '前端CDN',
                            'CDNJS',
                            'BootCDN',
                            'CSS.NET',
                            'Baomitu CDN',
                            'Staticfile CDN'
                        ],
                        description: '前端CDN库查询'
                    }
                },
                {
                    name: 'JSON 编辑器',
                    path: '/json_editor',
                    head: {
                        keywords: ['在线JSON编辑器', 'JSON格式化', 'JSON压缩'],
                        description: '在线JSON编辑器'
                    }
                },
                {
                    name: '正则大全',
                    path: '/any_rule',
                    head: {
                        keywords: ['正则大全'],
                        description: '正则大全'
                    }
                }
            ]
        },
        {
            title: '网站相关',
            icon: 'settings-2-outline',
            list: [
                {
                    name: '网站设置',
                    path: '/setting'
                },
                {
                    name: '工具隐藏',
                    path: '/hide_tool'
                },
                {
                    name: '友情链接',
                    path: '/links'
                }
            ]
        }
    ];

    tools.forEach(i => {
        i.list.forEach(tool => {
            let head = {
                meta: []
            };
            if (!tool.head) {
                tool.head = head;
            }

            head.title = `${tool.head.title ? tool.head.title : tool.name} - ${
                process.env.title
            }`;
            if (tool.head.other) {
                head.meta = head.meta.concat(tool.head.other);
            }
            if (tool.head.keywords) {
                tool.head.keywords = tool.head.keywords.concat([
                    'MikuTools',
                    'Ice-Hazymoon',
                    '在线工具'
                ]);
                head.meta.push({
                    hid: 'keywords',
                    keywords: tool.head.keywords.join(',')
                });
            }
            if (tool.head.description) {
                head.meta.push({
                    hid: 'description',
                    description: tool.head.description
                });
            }
            tool.head = head;
            const pinyin = process.env.pinyin;
            if (pinyin) {
                tool.pinyin = pinyin[tool.name];
            }
        });
    });
    return tools;
};
