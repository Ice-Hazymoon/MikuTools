/* eslint-disable no-console */
import 'console.style';

const css =
    'background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);padding:5px 10px;margin: 20px auto;border-radius:5px;font-size:30px;text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);color:#fff;';
const link = console.style.wrap(
    'GitHub: https://github.com/Ice-Hazymoon/MikuTools',
    'font-size: 16px;font-style: italic;margin-bottom: 16px;font-weight: bold;'
);
console.style(`<css="${css}">MikuTools - 工具集合</css>${link}`);

console.style(
    `<css="font-size:20px;color:red;font-weight:bold;">请不要在此执行任何可疑代码，以免造成不可挽回的严重后果</css>`
);
