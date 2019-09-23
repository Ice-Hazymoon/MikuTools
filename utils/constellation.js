// 计算星座
export default function(mon, day) {
    const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    mon = parseInt(mon);
    day = parseInt(day);

    const words = [
        '白羊座',
        '金牛座',
        '双子座',
        '巨蟹座',
        '狮子座',
        '处女座',
        '天秤座',
        '天蝎座',
        '射手座',
        '摩羯座',
        '水瓶座',
        '双鱼座'
    ];

    if (mon < 1 || mon > 12) {
        throw new Error('Invalid month.');
    }

    if (day < 1 || day > days[mon - 1]) {
        throw new Error('Invalid day.');
    }

    var val = mon * 100 + day;

    if (val >= 321 && val <= 419) {
        return words[0];
    } else if (val >= 420 && val <= 520) {
        return words[1];
    } else if (val >= 521 && val <= 621) {
        return words[2];
    } else if (val >= 622 && val <= 722) {
        return words[3];
    } else if (val >= 723 && val <= 822) {
        return words[4];
    } else if (val >= 823 && val <= 922) {
        return words[5];
    } else if (val >= 923 && val <= 1023) {
        return words[6];
    } else if (val >= 1024 && val <= 1122) {
        return words[7];
    } else if (val >= 1123 && val <= 1221) {
        return words[8];
    } else if (val >= 1222 || val <= 119) {
        return words[9];
    } else if (val >= 120 && val <= 218) {
        return words[10];
    } else if (val >= 219 && val <= 320) {
        return words[11];
    }
    return '';
}
