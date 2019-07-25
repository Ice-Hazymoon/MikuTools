var standard = {
    /* Letters                               */
    A: '01' /* A                   */,
    B: '1000' /* B                   */,
    C: '1010' /* C                   */,
    D: '100' /* D                   */,
    E: '0' /* E                   */,
    F: '0010' /* F                   */,
    G: '110' /* G                   */,
    H: '0000' /* H                   */,
    I: '00' /* I                   */,
    J: '0111' /* J                   */,
    K: '101' /* K                   */,
    L: '0100' /* L                   */,
    M: '11' /* M                   */,
    N: '10' /* N                   */,
    O: '111' /* O                   */,
    P: '0110' /* P                   */,
    Q: '1101' /* Q                   */,
    R: '010' /* R                   */,
    S: '000' /* S                   */,
    T: '1' /* T                   */,
    U: '001' /* U                   */,
    V: '0001' /* V                   */,
    W: '011' /* W                   */,
    X: '1001' /* X                   */,
    Y: '1011' /* Y                   */,
    Z: '1100' /* Z                   */,
    /* Numbers                               */
    '0': '11111' /* 0                   */,
    '1': '01111' /* 1                   */,
    '2': '00111' /* 2                   */,
    '3': '00011' /* 3                   */,
    '4': '00001' /* 4                   */,
    '5': '00000' /* 5                   */,
    '6': '10000' /* 6                   */,
    '7': '11000' /* 7                   */,
    '8': '11100' /* 8                   */,
    '9': '11110' /* 9                   */,
    /* Punctuation                           */
    '.': '010101' /* Full stop           */,
    ',': '110011' /* Comma               */,
    '?': '001100' /* Question mark       */,
    "'": '011110' /* Apostrophe          */,
    '!': '101011' /* Exclamation mark    */,
    '/': '10010' /* Slash               */,
    '(': '10110' /* Left parenthesis    */,
    ')': '101101' /* Right parenthesis   */,
    '&': '01000' /* Ampersand           */,
    ':': '111000' /* Colon               */,
    ';': '101010' /* Semicolon           */,
    '=': '10001' /* Equal sign          */,
    '+': '01010' /* Plus sign           */,
    '-': '100001' /* Hyphen1minus        */,
    _: '001101' /* Low line            */,
    '"': '010010' /* Quotation mark      */,
    $: '0001001' /* Dollar sign         */,
    '@': '011010' /* At sign             */
};

var standardReverse = {};
for (var key in standard) {
    standardReverse[standard[key]] = key;
}

function defaultOption(option) {
    option = option || {};
    return [option.space || '/', option.short || '.', option.long || '-'];
}

function unicodeHexMorse(ch) {
    var r = [];
    for (var i = 0; i < ch.length; i++)
        r[i] = ('00' + ch.charCodeAt(i).toString(16)).slice(-4);
    r = r.join(''); // unicode 值
    r = parseInt(r, 16).toString(2); // 转二进制
    return r;
}
/**
 * encode: encode string to morse code.
 * - msg: strings need to be encode.
 * - option: encode option.
 *
 * Return the morse code.
 *
 * Usage
 * var option = {
 *  space: ' ',
 *  long: '-',
 *  short: '*'
 * };
 * xmorse.encode('I love you.', option);
 * Will get return with `** *-** --- ***- * -*-- --- **- *-*-*-`.
 *
 **/
function encode(msg, option) {
    option = defaultOption(option); // 默认参数
    var morse = []; // 最终的 morse 结果
    // 删除空格，转大写，分割为数组
    msg = msg
        .replace(/\s+/g, '')
        .toLocaleUpperCase()
        .split('');
    var ch, r;
    for (var i = 0, l = msg.length; i < l; i++) {
        ch = msg[i];
        r = standard[ch];
        if (!r) r = unicodeHexMorse(ch); // 找不到，说明是非标准的字符，使用 unicode。
        morse.push(r.replace(/0/g, option[1]).replace(/1/g, option[2]));
    }
    return morse.join(option[0]);
}

function morseHexUnicode(mor) {
    mor = parseInt(mor, 2); // 解析 2 进制数
    if (isNaN(mor)) return ''; // 解析失败，直接返回空字符串跳过
    return unescape('%u' + mor.toString(16)); // 转 16 进制 -> unicode -> unicode 转字符串
}
/**
 * decode: encode string to morse code.
 * - morse: morse code need to be decode.
 * - option: encode option.
 *
 * Return the decode string.
 *
 * Usage
 * var option = {
 *  space: ' ',
 *  long: '-',
 *  short: '*'
 * };
 * xmorse.decode('** *-** --- ***- * -*-- --- **- *-*-*-', option);
 * Will get return with `ILOVEYOU`.
 *
 **/
function decode(morse, option) {
    option = defaultOption(option);
    var msg = [];
    morse = morse.split(option[0]); // 分割为数组
    var mor, r;
    for (var i = 0, l = morse.length; i < l; i++) {
        mor = morse[i]
            .replace(/\s+/g, '') // 去除空格
            .replace(new RegExp('\\' + option[1], 'g'), '0')
            .replace(new RegExp('\\' + option[2], 'g'), '1'); // 转二进制;
        r = standardReverse[mor];
        if (!r) r = morseHexUnicode(mor); // 找不到，说明是非标准字符的 morse，使用 unicode 解析方式。
        msg.push(r);
    }
    return msg.join('');
}

export default {
    encode: encode,
    decode: decode
};
