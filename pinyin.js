import pinyin from 'pinyin';
const tools = require('./store/tools').state();

function group(arr) {
    let results = [];
    let result = [];
    function doExchange(arr, index) {
        for (let i = 0; i < arr[index].length; i++) {
            result[index] = arr[index][i];
            if (index != arr.length - 1) {
                doExchange(arr, index + 1);
            } else {
                results.push(result.join(''));
            }
        }
    }
    doExchange(arr, 0);
    return results;
}

let toolName = [];
tools
    .map(t => {
        return t.list;
    })
    .forEach(t => {
        t.forEach(n => {
            toolName.push(n.name);
        });
    });

const toolPinyin = {};
toolName.forEach(name => {
    toolPinyin[name] = {
        first: group(
            pinyin(name.replace(/\s/g, '').toLowerCase(), {
                style: pinyin.STYLE_FIRST_LETTER,
                heteronym: true
            })
        ),
        pinyin: group(
            pinyin(name.replace(/\s/g, '').toLowerCase(), {
                style: pinyin.STYLE_NORMAL,
                heteronym: true
            })
        )
    };
});

export default toolPinyin;
