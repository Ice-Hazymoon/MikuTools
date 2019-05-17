function getQueryStringArgs(url) {
    if (url && url.indexOf('?') > -1) {
        var arr = url.split('?');
        var qs = arr[1],
            args = {},
            items = qs.length ? qs.split('&') : [],
            item = null,
            name = null,
            value = null,
            i = 0,
            len = items.length;
        for (i = 0; i < len; i++) {
            item = items[i].split('=');
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            if (name.length) {
                args[name] = value;
            }
        }
        return args;
    }
    return {};
}

export default getQueryStringArgs;
