<template>
    <div class="image_editor">
        <div id="tui-image-editor"></div>
        <div v-if="loading" class="loading">
            <nya-loading />
            <div>编辑器加载中···</div>
        </div>
        <div v-if="hide" class="hide">
            <div>暂不支持该设备</div>
            <div>请等待后续支持</div>
        </div>
    </div>
</template>

<script>
const blackTheme = {
    'common.bi.image': '/icon.png',
    'common.bisize.width': '251px',
    'common.bisize.height': '21px',
    'common.backgroundImage': 'none',
    'common.backgroundColor': '#1e1e1e',
    'common.border': '0px',

    // header
    'header.backgroundImage': 'none',
    'header.backgroundColor': 'transparent',
    'header.border': '0px',

    // load button
    'loadButton.backgroundColor': '#fff',
    'loadButton.border': '1px solid #ddd',
    'loadButton.color': '#222',
    'loadButton.fontFamily': "'Noto Sans', sans-serif",
    'loadButton.fontSize': '12px',

    // download button
    'downloadButton.backgroundColor': '#fdba3b',
    'downloadButton.border': '1px solid #fdba3b',
    'downloadButton.color': '#fff',
    'downloadButton.fontFamily': "'Noto Sans', sans-serif",
    'downloadButton.fontSize': '12px',

    // main icons
    'menu.normalIcon.path': '/svg/icon-d.svg',
    'menu.normalIcon.name': 'icon-d',
    'menu.activeIcon.path': '/svg/icon-b.svg',
    'menu.activeIcon.name': 'icon-b',
    'menu.disabledIcon.path': '/svg/icon-a.svg',
    'menu.disabledIcon.name': 'icon-a',
    'menu.hoverIcon.path': '/svg/icon-c.svg',
    'menu.hoverIcon.name': 'icon-c',
    'menu.iconSize.width': '24px',
    'menu.iconSize.height': '24px',

    // submenu primary color
    'submenu.backgroundColor': '#1e1e1e',
    'submenu.partition.color': '#3c3c3c',

    // submenu icons
    'submenu.normalIcon.path': '/svg/icon-d.svg',
    'submenu.normalIcon.name': 'icon-d',
    'submenu.activeIcon.path': '/svg/icon-c.svg',
    'submenu.activeIcon.name': 'icon-c',
    'submenu.iconSize.width': '32px',
    'submenu.iconSize.height': '32px',

    // submenu labels
    'submenu.normalLabel.color': '#8a8a8a',
    'submenu.normalLabel.fontWeight': 'lighter',
    'submenu.activeLabel.color': '#fff',
    'submenu.activeLabel.fontWeight': 'lighter',

    // checkbox style
    'checkbox.border': '0px',
    'checkbox.backgroundColor': '#fff',

    // range style
    'range.pointer.color': '#fff',
    'range.bar.color': '#666',
    'range.subbar.color': '#d1d1d1',

    'range.disabledPointer.color': '#414141',
    'range.disabledBar.color': '#282828',
    'range.disabledSubbar.color': '#414141',

    'range.value.color': '#fff',
    'range.value.fontWeight': 'lighter',
    'range.value.fontSize': '11px',
    'range.value.border': '1px solid #353535',
    'range.value.backgroundColor': '#151515',
    'range.title.color': '#fff',
    'range.title.fontWeight': 'lighter',

    // colorpicker style
    'colorpicker.button.border': '1px solid #1e1e1e',
    'colorpicker.title.color': '#fff'
};
export default {
    name: 'ImageEditor',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            loading: false,
            instance: null,
            hide: false
        };
    },
    mounted() {
        if (window.innerWidth < 950) {
            this.hide = true;
        }
        if (document.querySelector('._tui_')) {
            this.initEdit();
        } else {
            this.initNode();
        }
    },
    methods: {
        createScript(src) {
            return new Promise((resolve, reject) => {
                let script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = src;
                document.body.appendChild(script);
                script.onload = resolve;
                script.onerror = reject;
            });
        },
        createStyle(src) {
            return new Promise((resolve, reject) => {
                let style = document.createElement('link');
                style.type = 'text/css';
                style.href = src;
                style.rel = 'stylesheet';
                document.body.appendChild(style);
                style.onload = resolve;
                style.onerror = reject;
            });
        },
        async initNode() {
            this.loading = true;
            try {
                await this.createScript(
                    'https://cdnjs.loli.net/ajax/libs/fabric.js/1.6.7/fabric.js'
                );
                await this.createScript(
                    'https://uicdn.toast.com/tui.code-snippet/v1.5.0/tui-code-snippet.min.js'
                );
                await this.createScript(
                    'https://cdnjs.loli.net/ajax/libs/FileSaver.js/1.3.3/FileSaver.min.js'
                );
                await this.createScript(
                    'https://uicdn.toast.com/tui-color-picker/v2.2.0/tui-color-picker.js'
                );
                await this.createScript(
                    'https://uicdn.toast.com/tui-image-editor/latest/tui-image-editor.js'
                );
                await this.createStyle(
                    'https://uicdn.toast.com/tui-image-editor/latest/tui-image-editor.css'
                );
                await this.createStyle(
                    'https://uicdn.toast.com/tui-color-picker/v2.2.0/tui-color-picker.css'
                );
                this.initEdit();
                this.loading = false;
                document.body.classList.add('_tui_');
            } catch (error) {
                this.$swal({
                    type: 'error',
                    title: '加载失败',
                    text: `ERROR: 编辑器加载失败，请检查网络链接或刷新后重试`
                });
            }
        },
        initEdit() {
            if (process.browser && !this.hide) {
                let tui = window.tui;
                this.instance = new tui.ImageEditor(
                    document.querySelector('#tui-image-editor'),
                    {
                        usageStatistics: false,
                        includeUI: {
                            loadImage: {
                                path: '/icon.png',
                                name: 'SampleImage'
                            },
                            // locale: locale_ru_RU,
                            theme: blackTheme, // or whiteTheme
                            initMenu: 'filter',
                            menuBarPosition: 'bottom'
                        },
                        cssMaxWidth: 700,
                        cssMaxHeight: 500
                    }
                );
            }
        }
    }
};
</script>

<style lang="scss">
.image_editor {
    width: 100%;
    height: 800px;
    margin-bottom: 20px;
    .hide {
        font-size: 30px;
        font-weight: bold;
        text-align: center;
        margin: 60px auto;
        line-height: 1.5;
    }
    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-top: 20px;
        .nya-loading {
            margin-bottom: 15px;
        }
    }
    .tui-colorpicker-palette-button {
        cursor: pointer;
        width: 16px;
        height: 16px;
    }
    .tui-image-editor-header-logo {
        display: none;
    }
    @media (max-width: 800px) {
        #tui-image-editor {
            display: none;
        }
    }
}
</style>
