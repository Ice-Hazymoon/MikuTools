<template>
    <div class="vfooter">
        <a title="QQ群" href="https://jq.qq.com/?_wv=1027&k=5aPVskX" target="_blank" rel="noopener noreferrer">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-QQ" />
            </svg>
        </a>

        <a title="Twitter" href="https://twitter.com/Ice_Hazymoon" target="_blank" rel="noopener noreferrer">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-twitter" />
            </svg>
        </a>
        
        <a title="GitHub" href="https://github.com/Ice-Hazymoon/MikuTools" target="_blank" rel="noopener noreferrer">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-github" />
            </svg>
        </a>
        
        <a title="Telegram" href="https://t.me/mikutools" target="_blank" rel="noopener noreferrer">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-telegram" />
            </svg>
        </a>
        
        <a title="微博" href="http://weibo.com/u/3983176694" target="_blank" rel="noopener noreferrer">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-weibo" />
            </svg>
        </a>
    </div>
</template>

<script>
if (process.browser) {
    require('../assets/fonts/iconfont/iconfont');
}
export default {
    name: 'Vfooter'
};
</script>

<style lang="scss">
.vfooter {
    margin: 20px auto;
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
        color: inherit;
    }
    .icon {
        cursor: pointer;
        $iconSize: 25px;
        width: $iconSize;
        height: $iconSize;
        margin: 0 7px;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        background-color: rgba($color: #fff, $alpha: 0.65);
        color: #222831;
        border-radius: 50%;
        padding: 5px;
        box-shadow: 8px 14px 38px rgba(39, 44, 49, 0.06),
            1px 3px 8px rgba(39, 44, 49, 0.03);
    }
}
</style>
