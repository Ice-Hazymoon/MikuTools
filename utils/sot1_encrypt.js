// 当前版本
const currVersion = 'v1';
const err = {
    ERROR_DECODE: '解码失败核对你的信息'
};

// 环码
const circleCode = function(code) {
    if (code > 255) {
        code = code % 255;
    } else if (code < 1) {
        while (code < 1) {
            code += 255;
        }
    }
    return code;
};

// sot1 v1 版本加解密方案
const sot1v1 = {
    encode(str, passwd = '') {
        let code = '';
        if (!str) return code;

        // 编码
        let strArray = encodeURIComponent(str).split('%');

        // 加密核心
        let isPasswd = !!passwd;
        let passwdTable = this.passwdTable(passwd); // 密码表
        let coreRunCount = 0; // code加密记数器
        let encodeCore = (code, isUsePasswd = true) => {
            let encryptCode = code;
            // 加密
            if (isUsePasswd && isPasswd) {
                let idx = coreRunCount % passwdTable.length;
                encryptCode = code + passwdTable[idx];
                coreRunCount++;
            }

            let codeNumber = parseInt(2800, 16) + circleCode(encryptCode);
            return String.fromCharCode(codeNumber);
        };

        // 字符处理
        strArray.forEach((subStr, key) => {
            if (!subStr) return;

            let subStrArray = subStr.split('');

            // 非开头字符前两位皆为已编码
            if (key > 0) {
                code += encodeCore(
                    parseInt(subStrArray.shift() + subStrArray.shift(), 16)
                );
            }

            // 字母数字以及部分符号转码
            subStrArray.forEach(char => {
                code += encodeCore(char.charCodeAt());
            });
        });

        // 添加 版本信息 和 加密信息
        let version = 1;
        let versionInfo = code[0].charCodeAt() - parseInt(2800, 16) + version;

        let enablePasswd = code[0].charCodeAt() - parseInt(2800, 16) - 1;
        let disablePasswd = code[0].charCodeAt() - parseInt(2800, 16) - 2;
        let isPasswdInfo = isPasswd ? enablePasswd : disablePasswd;

        let idx = code[0].charCodeAt() % code.length; // 版本信息加密信息添加位置
        code =
            code.slice(0, idx + 1) +
            encodeCore(versionInfo, false) +
            encodeCore(isPasswdInfo, false) +
            code.slice(idx + 1);

        return code;
    },

    decode(str, passwd = '') {
        let code = '';
        if (str.length < 3) return err.ERROR_DECODE;

        // 解密核心
        let isPasswd = !!passwd;
        let passwdTable = this.passwdTable(passwd); // 密码表
        let coreRunCount = 0; // code解密记数器
        let decodeCore = char => {
            let decryptCode = char.charCodeAt() - parseInt(2800, 16);
            // 解密
            if (isPasswd) {
                let idx = coreRunCount % passwdTable.length;
                decryptCode =
                    char.charCodeAt() - parseInt(2800, 16) - passwdTable[idx];
                coreRunCount++;
            }

            return circleCode(decryptCode).toString(16);
        };

        // 字符处理
        let strArray = str.split('');
        strArray.forEach(subStr => {
            if (!subStr) return;
            code += '%' + decodeCore(subStr);
        });

        // 转码
        let result = '';
        try {
            result = decodeURIComponent(code);
        } catch (error) {
            result = err.ERROR_DECODE;
        }

        return result;
    },
    passwdTable(passwd) {
        let passwdTable = [];
        if (!passwd) return passwdTable;

        // 生成密码表
        let tempPasswdBase64 = btoa(passwd).split('');
        let tempPasswdReverseBase64 = btoa(
            passwd
                .split('')
                .reverse()
                .join('')
        ).split('');
        tempPasswdBase64.forEach((subStr, key) => {
            let reverseBase64Code = tempPasswdReverseBase64[key].charCodeAt();
            passwdTable.push(
                Math.floor(
                    ((subStr.charCodeAt() + reverseBase64Code) %
                        (reverseBase64Code / 2)) *
                        2
                )
            );
        });

        return passwdTable;
    }
};

// sot1
const sot1 = {
    v1: sot1v1
};

const encode = function(str, passwd = '') {
    return sot1[currVersion].encode(str, passwd);
};

const decode = function(str, passwd = '') {
    let code = '';
    if (str.length < 3) return code;

    let strArray = str.split('');
    // 获取加密串信息
    let idx = strArray[0].charCodeAt() % (strArray.length - 2);
    if (idx + 2 >= strArray.length) return err.ERROR_DECODE; // 无法获取数据信息

    let version = circleCode(
        strArray[idx + 1].charCodeAt() - strArray[0].charCodeAt()
    );
    // 未找到解码版本
    if (!Object.prototype.hasOwnProperty.call(sot1, `v${version}`)) {
        return err.ERROR_DECODE;
    }

    let isUsePasswd =
        circleCode(strArray[0].charCodeAt() - strArray[idx + 2].charCodeAt()) ==
        1;
    let newStr = strArray
        .slice(0, idx + 1)
        .concat(strArray.slice(idx + 3))
        .join('');

    return sot1[`v${version}`].decode(newStr, isUsePasswd ? passwd : '');
};

export default {
    encode,
    decode
};
