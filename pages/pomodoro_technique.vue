<template>
    <div class="pomodoro_technique">
        <nya-container title="番茄时钟">
            <nya-input v-model.trim="restTime" fullwidth type="number" label="休息时间（分钟）" autofocus placeholder="5" autocomplete="off" />
            <nya-input v-model.trim="workTime" fullwidth type="number" label="工作时长（分钟）" placeholder="25" autocomplete="off" />
            <nya-checkbox v-model="music" label="播放白噪音" />
            <nya-checkbox v-model="fullscreen" label="全屏" />
            <nya-checkbox v-model="auto" label="自动休息和开始下一个" />
            <br>
            <nya-select v-if="music" v-model="musicType" fullwidth :items="musicList" label="选择白噪音" />
            <div class="nya-btn" @click="start">
                开始专注
            </div>
        </nya-container>
        <nya-container title="番茄工作法">
            <blockquote>
                <p>番茄工作法是简单易行的时间管理方法，是由弗朗西斯科·西里洛于1992年创立的一种相对于GTD更微观的时间管理方法。</p>
                <p>使用番茄工作法，选择一个待完成的任务，将番茄时间设为25分钟，专注工作，中途不允许做任何与该任务无关的事，直到番茄时钟响起，然后在纸上画一个X短暂休息一下（5分钟就行），每4个番茄时段多休息一会儿。</p>
                <p>番茄工作法极大地提高了工作的效率，还会有意想不到的成就感。</p>
            </blockquote>
            <div class="nya-subtitle">
                番茄工作法有五个基本步骤：
            </div>
            <ol class="nya-list">
                <li>每天开始的时候规划今天要完成的几项任务，将任务逐项写在列表里（或记在软件的清单里）</li>
                <li>设定你的番茄钟（定时器、软件、闹钟等），时间是25分钟。</li>
                <li>开始完成第一项任务，直到番茄钟响铃或提醒（25分钟到）。</li>
                <li>停止工作，并在列表里该项任务后画个X。</li>
                <li>休息3~5分钟，活动、喝水、方便等等。</li>
                <li>开始下一个番茄钟，继续该任务。一直循环下去，直到完成该任务，并在列表里将该任务划掉。</li>
                <li>每四个番茄钟后，休息25分钟。</li>
            </ol>
            <hr>
            <div class="nya-subtitle">
                在某个番茄钟的过程里，如果突然想起要做什么事情：
            </div>
            <ol class="nya-list">
                <li>非得马上做不可的话，停止这个番茄钟并宣告它作废（哪怕还剩5分钟就结束了），去完成这件事情，之后再重新开始同一个番茄钟；</li>
                <li>不是必须马上去做的话，在列表里该项任务后面标记一个逗号（表示打扰），并将这件事记在另一个列表里（比如叫“计划外事件”），然后接着完成这个番茄钟。</li>
            </ol>
        </nya-container>
        <div v-if="showBox" ref="pbox" class="pomodoro-technique-box" :style="styles">
            <div class="music" :class="{ 'paused': audio.paused }" @click="audio.paused ? audio.play() : audio.pause()">
                <i class="eva eva-music"></i>
            </div>
            <nya-circle 
                :width="250"
                :radius="20"
                :progress="progress"
                bar-color="#ffffff"
                :font-size="50"
                font-color="#ffffff"
                background-color="rgba(255, 255, 255, 0.2)"
            >
                <div v-show="!$store.state.isMobile.any" class="cancel" @click="cancel">
                    取消
                </div>
                <div class="time" v-text="time"></div>
            </nya-circle>
            <div v-if="!auto && successful" class="p-btn" :style="{ transform: (!auto && successful) ? 'translateY(50px)' : '' }" @click="next">
                下一个
            </div>
            <div v-if="$store.state.isMobile.any" class="p-btn cancel" @click="cancel">
                取<span style="visibility: hidden;">占</span>消
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PomodoroTechnique',
    head() {
        return this.$store.state.currentTool.head;
    },
    data() {
        return {
            progress: 0,
            restTime: 5,
            workTime: 25,
            music: true,
            musicType: 'forest',
            musicList: {
                forest: '森林',
                ocean: '海边',
                provence: '自然'
            },
            auto: true,
            fullscreen: true,
            time: '00:00',
            showBox: false,
            interval: null,
            successful: false,
            audio: null
        };
    },
    computed: {
        styles() {
            return {
                'background-color': this.successful ? '#40cc40' : '#f65f54'
            };
        }
    },
    methods: {
        start() {
            this.playMusic();
            this.showBox = true;
            this.successful = false;
            this.launchFullscreen();
            let time = this.workTime * 60 - 0.1;
            let past = 0;
            let rest = false;
            const start = () => {
                if (time / 60 <= 0.1 && time % 60 <= 0.1) {
                    if (this.auto) {
                        this.progress = 0;
                        past = 0;
                        if (!rest) {
                            time = this.restTime * 60 - 0.1;
                        } else {
                            time = this.workTime * 60 - 0.1;
                        }
                        this.successful = !this.successful;
                        rest = !rest;
                    } else {
                        clearInterval(this.interval);
                        this.successful = true;
                        this.time = '成功';
                        this.progress = 100;
                        return false;
                    }
                }
                const minutes = parseInt(time / 60);
                const seconds = parseInt(time % 60);
                this.progress =
                    (past / ((rest ? this.restTime : this.workTime) * 60 - 1)) *
                    100;
                if (minutes === 0 && seconds === 0) this.progress = 100;
                this.time = `${minutes > 9 ? minutes : '0' + minutes}:${
                    seconds > 9 ? seconds : '0' + seconds
                }`;
                time -= 0.1;
                past += 0.1;
            };
            start();
            this.interval = setInterval(start, 100);
        },
        cancel() {
            clearInterval(this.interval);
            this.showBox = false;
            this.audio.pause();
        },
        next() {
            this.start();
        },
        playMusic() {
            if (this.music) {
                const audioSrc = {
                    forest: require('!file-loader!~/assets/audio/white-noise/preset_wakeup_forest.m4a'),
                    ocean: require('!file-loader!~/assets/audio/white-noise/preset_wakeup_ocean.m4a'),
                    provence: require('!file-loader!~/assets/audio/white-noise/preset_wakeup_provence.m4a')
                };
                this.audio = new Audio();
                this.audio.loop = true;
                this.audio.src = audioSrc[this.musicType];
                this.audio.play();
            }
        },
        launchFullscreen() {
            if (!this.fullscreen) return false;
            this.$nextTick(() => {
                const el = this.$refs.pbox;
                if (el.requestFullscreen) {
                    el.requestFullscreen();
                } else if (el.mozRequestFullScreen) {
                    el.mozRequestFullScreen();
                } else if (el.msRequestFullscreen) {
                    el.msRequestFullscreen();
                } else if (el.webkitRequestFullscreen) {
                    el.webkitRequestFullScreen();
                }
            });
        }
    },
    beforeRouteLeave(to, from, next) {
        clearInterval(this.interval);
        next();
    }
};
</script>

<style lang="scss">
.pomodoro_technique {
    blockquote {
        margin-top: 0;
    }
    .nya-input {
        margin-bottom: 15px;
    }
    .nya-checkbox {
        margin-right: 15px;
    }
    .nya-btn,
    .nya-select {
        margin-top: 15px;
    }
    .nya-circle {
        transition: all 0.3s ease;
        .time {
            transition: all 0.3s ease;
        }
        .cancel {
            z-index: 1;
            cursor: pointer;
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            background-color: rgba($color: #ffffff, $alpha: 0.2);
            transition: all 0.3s ease;
            font-size: 40px;
            letter-spacing: 3px;
            &:hover {
                opacity: 1;
                & + .time {
                    opacity: 0;
                }
            }
        }
    }
    .pomodoro-technique-box {
        z-index: 1000;
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        .music {
            cursor: pointer;
            position: absolute;
            left: 20px;
            top: 20px;
            font-size: 35px;
            color: #ffffff;
            &.paused {
                opacity: 0.5;
            }
        }
        .info {
            color: #ffffff;
            margin-top: 20px;
            font-size: 18px;
            font-weight: bold;
        }
        .p-btn {
            position: absolute;
            top: calc(50vh + 160px);
            cursor: pointer;
            color: #ffffff;
            font-size: 18px;
            margin-top: 20px;
            border: 2px solid #ffffff;
            padding: 8px 0;
            border-radius: 20px;
            transition: all 0.3s ease;
            box-sizing: border-box;
            text-align: center;
            width: 110px;
            &:hover {
                background-color: rgba($color: #ffffff, $alpha: 0.2);
            }
        }
    }
}
</style>
