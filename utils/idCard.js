import constellation from './constellation';
import dataAddress from './GB2260';
import chineseLunar from './chinese-lunar';
import dayjs from 'dayjs';
// 字典
var dict = {
    week: function(date) {
        var i = dayjs(date).day();
        var day = {
            0: '星期天',
            1: '星期一',
            2: '星期二',
            3: '星期三',
            4: '星期四',
            5: '星期五',
            6: '星期六'
        };
        return day[i];
    },
    zodiac_zh: function(year) {
        return chineseLunar.animalName(year);
    },
    zodiac: function(month, date) {
        try {
            if (month != undefined && date != undefined)
                return constellation(month, date);
            if (date == undefined && month != undefined) {
                if (month.length == 4)
                    return constellation(
                        month.substr(0, 2),
                        month.substr(2, 2)
                    );
                month = month.split(/\/|\\|-/);
                return constellation(month[0], month[1]);
            }
            return;
        } catch (err) {
            return '出错' + month + date;
        }
    }
};

// 计算最后一位应该是多少
function idCardEndNum(idCard) {
    idCard = idCard.toString();
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    var sum = 0;
    var ai = 0;
    var wi = 0;
    for (var i = 0; i < 17; i++) {
        ai = idCard[i];
        wi = factor[i];
        sum += ai * wi;
    }
    var last = parity[sum % 11];
    return last;
}

// 农历转换
function Nong(birthday) {
    var _birthday = birthday.split(/\/|\\|-/);
    _birthday =
        _birthday.slice(0, 4) +
        '/' +
        _birthday.slice(4, 6) +
        '/' +
        _birthday.slice(6, 8);
    let nong = new Date(_birthday);
    try {
        var lunar = chineseLunar.solarToLunar(nong);
    } catch (err) {
        return '时间错误';
    }
    return lunar.year + '/' + lunar.month + '/' + lunar.day;
}

function NongCn(date) {
    let nong = new Date(date);
    let lunar;
    try {
        lunar = chineseLunar.solarToLunar(nong);
    } catch (err) {
        return '时间错误';
    }
    return chineseLunar.format(lunar, 'YMD');
}

// 解析生日信息
function birthDay(idCard) {
    idCard = idCard.toString();
    var birthday, month, day, nong;
    let year = idCard.substr(6, 4);
    month = idCard.substr(10, 2);
    day = idCard.substr(12, 2);
    birthday = year + '/' + month + '/' + day;
    nong = Nong(birthday);
    let nongyear = nong.substr(0, 4);
    return {
        date: birthday,
        nong: nong,
        year: year,
        month: month,
        day: day,
        nongCn: NongCn(birthday),
        week: dict.week(birthday), // 星期几
        zodiac: dict.zodiac(month, day), // 星座
        zodiac_zh: dict.zodiac_zh(nongyear) // 生肖
    };
}

// 验证身份证号是否正确
function checkIdCard(idCard) {
    idCard = idCard.toString();
    if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard)) {
        if (idCard.length >= 18) {
            return idCardEndNum(idCard) == idCard[17].toUpperCase();
        } else {
            return false;
        }
    }
    return false;
}

// 补全身份证号
function repairIdCard(idCard) {
    idCard = idCard.toString();
    if (/(^\d{17}$)/.test(idCard)) return idCard + idCardEndNum(idCard);
    if (/(^\d{18}$)/.test(idCard))
        return idCard.slice(0, 17) + idCardEndNum(idCard);
}

// 15位转换18位
function num15to18(idCard) {
    idCard = idCard.toString();
    if (/(^\d{15}$)/.test(idCard))
        return repairIdCard(idCard.slice(0, 6) + '19' + idCard.slice(6, 15));
}

// 地址信息解析
function address(idCard) {
    idCard = idCard.toString();
    var addressId = idCard.slice(0, 6);
    var data = dataAddress[addressId];
    if (data == undefined) {
        return '未找到';
    }
    return data;
}

function age(idCard) {
    let date = birthDay(idCard).date;
    return dayjs().diff(dayjs(date), 'year');
}

// 性别解析
function sex(idCard) {
    idCard = idCard.toString();
    if (idCard[16] % 2) return '男';
    return '女';
}

function makeID() {
    const rand = (max, min) => {
        min = min || 1;
        return Math.round(Math.random() * (max - min)) + min;
    };
    const weight = t => Math.pow(2, t - 1) % 11;
    const str_pad = (str, len, chr, right) => {
        str = str.toString();
        len = len || 2;
        chr = chr || '0';
        right = right || false;
        if (str.length >= len) {
            return str;
        } else {
            for (var i = 0, j = len - str.length; i < j; i++) {
                if (right) {
                    str = str + chr;
                } else {
                    str = chr + str;
                }
            }
            return str;
        }
    };

    let addrKeys = Object.keys(dataAddress);
    let addr = addrKeys[rand(addrKeys.length)];

    //出生年
    var yr = str_pad(rand(99, 50), 2, '0');
    var mo = str_pad(rand(12, 1), 2, '0');
    var da = str_pad(rand(28, 1), 2, '0');

    yr = '19' + yr;
    var body = addr + yr + mo + da + str_pad(rand(999, 1), 3, '1');

    //位置加权
    var posWeight = [];
    for (var i = 18; i > 1; i--) {
        var wei = weight(i);
        posWeight[i] = wei;
    }

    //累加body部分与位置加权的积
    var bodySum = 0;
    var bodyArr = body.split('');
    for (var j = 0; j < bodyArr.length; j++) {
        bodySum += parseInt(bodyArr[j], 10) * posWeight[18 - j];
    }

    //得出校验码
    var checkBit = 12 - (bodySum % 11);
    if (checkBit == 10) {
        checkBit = 'X';
    } else if (checkBit > 10) {
        checkBit = checkBit % 11;
    }
    checkBit = typeof checkBit === 'number' ? checkBit.toString() : checkBit;

    return body + checkBit;
}

export default {
    endNum: idCardEndNum,
    birthDay: birthDay,
    checkIdCard: checkIdCard,
    repairIdCard: repairIdCard,
    num15to18: num15to18,
    sex: sex,
    address: address,
    nong: Nong,
    age: age,
    makeID: makeID,
    all: idCard => {
        return {
            endNum: idCardEndNum(idCard),
            birthDay: birthDay(idCard),
            checkIdCard: checkIdCard(idCard),
            address: address(idCard),
            sex: sex(idCard),
            age: age(idCard)
        };
    }
};
