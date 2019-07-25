export default ({ route }) => {
    if (process.browser) {
        // https://zz.bdstatic.com/linksubmit/push.js
        const r = `${window.location.origin}${route.path}`;
        const t = document.referrer;
        const i = new Image();
        let o = 'https://sp0.baidu.com/9_Q4simg2RQJ8t7jm9iCKT-xh_/s.gif';
        t
            ? ((o += '?r=' + encodeURIComponent(document.referrer)),
              r && (o += '&l=' + r))
            : r && (o += '?l=' + r);

        i.src = o;
    }
};
