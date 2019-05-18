<p align="center"><img src="https://raw.githubusercontent.com/Ice-Hazymoon/MikuTools/master/static/icon.png"
        alt="Logo" width="128" height="128" style="max-width: 100%;"></p>
<h1 align="center">Miku Tools</h1>
<p align="center">一个轻量的工具集合</p>
<p align="center">
    <a href="https://vuejs.org/">
        <img src="https://img.shields.io/badge/nuxt.js-v5.x-green.svg" alt="for Nuxt.js 5">
    </a>
    <a href="http://imiku.me/">
        <img src="https://badgen.net/badge/author/Ice-Hazymoon/f2a" alt="Author">
    </a>
    <a href="https://mikutools.netlify.com/">
        <img src="https://img.shields.io/badge/%F0%9F%9A%80-open--in--browser-e10079.svg" alt="Live Demo">
    </a>
</p>

## 介绍

本项目是 [https://miku.tools](https://miku.tools) 的开源版本，保留了部分无需后端的功能。

> [https://miku.tools](https://miku.tools)

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

## 其他

Q: 后端什么时候开源？  
A: 因为本职不是后端，所以代码写的太垃圾（虽然前端也没好到哪去），无论安全性还是性能方面都有所欠缺，所以暂时不会开源。

Q: 我应该如何添加新功能？  
A: 可以参考 `/doc/template.vue` 中的模板，在 `/pages` 里添加页面即可，然后在 `/tools/index.js` 里添加相关的工具信息。

Q: 我可以参与开发 MikuTools 吗？  
A: 当然可以，随时欢迎提交PR，会视情况添加到 [MikuTools](https://miku.tools) 主站

Q: 我能给 MikuTools 提新功能吗？  
A: issues 区随时欢迎你。

Q: MikuTools的主要技术栈是什么？  
A: Vue全家桶 + [Nuxt.js](https://zh.nuxtjs.org/)
