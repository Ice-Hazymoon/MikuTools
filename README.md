<p align="center"><img src="./static/icon.png"
        alt="Logo" width="128" height="128" style="max-width: 100%;"></p>
<h1 align="center">Miku Tools</h1>
<p align="center">一个轻量的工具集合</p>
<p align="center">
    <a href="https://github.com/Ice-Hazymoon/MikuTools/blob/master/LICENSE">
        <img src="https://img.shields.io/github/license/Ice-Hazymoon/MikuTools.svg" alt="MIT License" />
    </a>
    <a href="https://vuejs.org/">
        <img src="https://img.shields.io/badge/nuxt.js-v5.x-green.svg" alt="for Nuxt.js 5">
    </a>
    <a href="http://imiku.me/">
        <img src="https://badgen.net/badge/author/Ice-Hazymoon/f2a" alt="Author">
    </a>
    <a href="https://miku.tools/">
        <img src="https://img.shields.io/badge/%F0%9F%9A%80-open--in--browser-e10079.svg" alt="Live Demo">
    </a>
</p>

## 备用域名

如网站出现无法访问的情况，可尝试使用备用域名

> [http://tools.imiku.me](http://tools.imiku.me)

## 介绍

本项目是 [https://miku.tools](https://miku.tools) 的开源版本，保留了部分无需后端的功能。

> [https://miku.tools](https://miku.tools)

## 预览

![preview](./static/preview.png)

## 开发

```bash
yarn install
yarn dev
```

## 构建

```bash
yarn install
yarn generate
```

## 不会前端开发或不想安装相关环境

> 对于不会打包程序的同学，准备好了一份打包好开箱即用的版本

下载 [dist.7z](https://raw.githubusercontent.com/Ice-Hazymoon/MikuTools/master/dist.7z)，直接上传解压至虚拟主机或网站根目录即可使用

## 其他

Q: 后端什么时候开源？  
A: 因为本职不是后端，所以代码写的太垃圾（虽然前端也没好到哪去），无论安全性还是性能方面都有所欠缺，所以暂时不会开源。

Q: 我应该如何添加新功能？  
A: 参考 `/pages/*.vue` 中的文件新建页面，善用 **CTRL+F** 进行相关模块的查找，然后在 `/tools/index.js` 里添加相关的工具信息。对前端新人不太友好

Q: 我可以参与开发 MikuTools 吗？  
A: 当然可以，随时欢迎提交 PR，会视情况添加到 [MikuTools](https://miku.tools) 主站

Q: 我能给 MikuTools 提新功能吗？  
A: issues 区随时欢迎你。

Q: MikuTools 的主要技术栈是什么？  
A: Vue 全家桶 + [Nuxt.js](https://zh.nuxtjs.org/)

## 更新

本仓库仅供一个开源版本的备份，并不用于纪录提交纪录等，当[主站](https://miku.tools)更新到一定程度上的稳定版本时，才会重新更新该仓库

## 贡献者

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/Git-So"><img src="https://avatars0.githubusercontent.com/u/22292451?v=4" width="100px;" alt="Git-So"/><br /><sub><b>Git-So</b></sub></a><br /><a href="https://github.com/Ice-Hazymoon/MikuTools/commits?author=Git-So" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/KeJunMao"><img src="https://avatars0.githubusercontent.com/u/18414281?v=4" width="100px;" alt="KeJunMao"/><br /><sub><b>KeJunMao</b></sub></a><br /><a href="https://github.com/Ice-Hazymoon/MikuTools/commits?author=KeJunMao" title="Code">💻</a> <a href="#question-KeJunMao" title="Answering Questions">💬</a></td>
    <td align="center"><a href="https://github.com/tamshen"><img src="https://avatars0.githubusercontent.com/u/33705179?v=4" width="100px;" alt="tamshen"/><br /><sub><b>tamshen</b></sub></a><br /><a href="#design-tamshen" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/houko"><img src="https://avatars0.githubusercontent.com/u/12625278?v=4" width="100px;" alt="houko"/><br /><sub><b>houko</b></sub></a><br /><a href="#translation-houko" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/bougieL"><img src="https://avatars0.githubusercontent.com/u/36102904?v=4" width="100px;" alt="bougieL"/><br /><sub><b>bougieL</b></sub></a><br /><a href="https://github.com/Ice-Hazymoon/MikuTools/commits?author=bougieL" title="Code">💻</a> <a href="#ideas-bougieL" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
