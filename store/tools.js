import pinyin from 'pinyin';

export const state = () => {
    const tools = [
        {
            title: '其他工具',
            icon: 'layers-outline',
            list: [
                {
                    name: '知乎免登陆查看',
                    path: '/tools/zhihu_viewall',
                    head: {
                        keywords: [
                            '知乎免登陆查看所有回答',
                            '知乎网页不登陆查看'
                        ],
                        description: '知乎免登陆查看所有回答'
                    },
                    hot: true
                },
                {
                    name: 'SSR配置解析',
                    path: '/tools/ssr_decode',
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
                    path: '/tools/relatives_name',
                    head: {
                        keywords: ['亲戚关系计算器'],
                        description: '在线亲戚关系计算器'
                    }
                },
                {
                    name: '二维码生成/解析',
                    path: '/tools/qrcode_generation',
                    head: {
                        keywords: ['在线二维码生成', '在线二维码内容解析'],
                        description: '二维码生成/解析'
                    }
                },
                {
                    name: '这是什么动漫',
                    path: '/tools/what_anime_is_this',
                    head: {
                        keywords: ['根据截图搜索动漫', 'whatanime'],
                        description: '根据截图搜索动漫'
                    }
                },
                {
                    name: '颜色处理',
                    path: '/tools/color',
                    head: {
                        keywords: ['hex转rgb', '颜色代码转换', '在线颜色选择'],
                        description: '在线图片选择'
                    }
                },
                {
                    name: '收款码合并',
                    path: '/tools/universal_pay',
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
                    path: '/tools/temperature_conversion',
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
                    path: '/tools/chinese_id',
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
                    name: '令和举牌生成',
                    path: '/tools/linghe',
                    head: {
                        keywords: ['令和举牌风格图片制作'],
                        description: '在线令和举牌风格图片制作'
                    }
                },
                {
                    name: 'ACG表情包制作',
                    path: '/tools/acg_meme',
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
                    path: '/tools/pornhub_logo',
                    head: {
                        keywords: ['PornHub 风格图片制作', 'PornHub Logo 制作'],
                        description: '在线 PornHub 风格图片制作'
                    }
                },
                {
                    name: 'YouTube 风格Logo',
                    path: '/tools/youtube_logo',
                    head: {
                        keywords: ['YouTube 风格图片制作', 'YouTube Logo 制作'],
                        description: '在线 YouTube 风格图片制作'
                    }
                },
                {
                    name: '视频转GIF',
                    path: '/tools/video2gif',
                    head: {
                        keywords: ['视频转换GIF图片'],
                        description: '在线视频转换GIF图片'
                    }
                },
                {
                    name: '微博生成器',
                    path: '/tools/meme-weibo',
                    head: {
                        keywords: ['微博生成器', '王思聪微博生成器'],
                        description: '在线微博生成器'
                    }
                },
                {
                    name: '抖音风格文字生成',
                    path: '/tools/douyin_text',
                    head: {
                        keywords: ['抖音风格文字生成', '抖音样式文字生成'],
                        description: '在线抖音风格文字生成'
                    }
                },
                {
                    name: '图片编辑',
                    path: '/tools/image_editor',
                    head: {
                        keywords: ['图片编辑器', '图片处理', '表情包制作'],
                        description: '在线图片编辑器'
                    }
                },
                {
                    name: '身份证加水印',
                    path: '/tools/watermark',
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
                    name: '数字转大写中文',
                    path: '/tools/number_to_zh',
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
                    path: '/tools/rich_text_editor',
                    head: {
                        keywords: ['富文本编辑器'],
                        description: '在线富文本编辑器'
                    }
                },
                {
                    name: 'Markdown编辑器',
                    path: '/tools/markdown',
                    head: {
                        keywords: ['Markdown编辑器'],
                        description: '在线Markdown编辑器'
                    }
                },
                {
                    name: '摩斯电码转换',
                    path: '/tools/morse',
                    head: {
                        keywords: ['摩斯电码转换', '中文摩斯电码转换'],
                        description: '在线摩斯电码转换'
                    }
                },
                {
                    name: '中英文加空格',
                    path: '/tools/text_autospace',
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
                    name: '文本加密解密',
                    path: '/tools/crypto',
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
                    name: 'Linux命令查询',
                    path: '/tools/linux_command',
                    head: {
                        keywords: ['Linux命令查询'],
                        description: '在线Linux命令查询'
                    }
                },
                {
                    name: '文本编码解码',
                    path: '/tools/encoding',
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
                    path: '/tools/crontab',
                    head: {
                        keywords: ['在线执行Cron表达式', '在线模拟Cron表达式'],
                        description: '在线执行Cron表达式'
                    }
                },
                {
                    name: '进制转换',
                    path: '/tools/hexconvert',
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
                    name: 'CIDR计算',
                    path: '/tools/cidr',
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
                    path: '/tools/ua_parser',
                    head: {
                        keywords: ['在线 UserAgent 解析'],
                        description: 'UserAgent 解析'
                    }
                },
                {
                    name: '前端CDN查询',
                    path: '/tools/cdnjs',
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
                    path: '/tools/json_editor',
                    head: {
                        keywords: ['在线JSON编辑器', 'JSON格式化', 'JSON压缩'],
                        description: '在线JSON编辑器'
                    }
                }
            ]
        },
        {
            title: '网站相关',
            icon: 'settings-2-outline',
            list: [
                {
                    name: '友情链接',
                    path: '/links'
                },
                {
                    name: '工具隐藏',
                    path: '/setting'
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
            if (tool.name) {
                const options = {
                    style: pinyin.STYLE_NORMAL
                };
                tool.pinyin = [].concat
                    .apply([], pinyin(tool.name, options))
                    .join('');
            }

            head.title = `${tool.head.title ? tool.head.title : tool.name} - ${
                process.env.title
            }`;
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
        });
    });

    return tools;
};
