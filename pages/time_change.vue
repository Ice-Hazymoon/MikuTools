<template>
  <div class="time-converter">
    <nya-container title="时区转换器">
      <div class="input-group">
        <label for="time-input">输入时间 (年/月/日 00:00):</label>
        <nya-input
          type="datetime-local"
          id="time-input"
          v-model="inputTime"
          :label="`输入时间 (年/月/日 00:00)`"
          autocomplete="off"
        />
        <select v-model="inputFormat" class="nya-select">
          <option value="UTC">UTC (协调世界时)</option>
          <option value="GMT">GMT (格林威治标准时间)</option>
          <option value="CST">CST (中国标准时间 UTC+8)</option>
          <option value="EST">EST (美国东部标准时间 UTC-5)</option>
          <option value="PST">PST (美国太平洋标准时间 UTC-8)</option>
        </select>
      </div>
      <button type="button" class="nya-btn mt-15" @click="convertTime" :disabled="!isValidInput">转换</button>

      <nya-container v-if="convertedTime" title="转换结果">
        <pre>{{ convertedTime }}</pre>
        <div class="timezone-explanation">
          <p><strong>时区解释：</strong></p>
          <ul>
            <li><strong>UTC:</strong> 协调世界时，世界标准时间。</li>
            <li><strong>GMT:</strong> 格林威治标准时间，主要用于描述时区。</li>
            <li><strong>CST:</strong> 中国标准时间，UTC+8，适用于中国大陆及部分地区。</li>
            <li><strong>EST:</strong> 美国东部标准时间，UTC-5，适用于美国东部地区。</li>
            <li><strong>PST:</strong> 美国太平洋标准时间，UTC-8，适用于美国西部地区。</li>
          </ul>
        </div>
      </nya-container>
    </nya-container>
  </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  name: 'TimeConverter',
  data() {
    return {
      inputTime: '',
      inputFormat: 'UTC',
      convertedTime: null,
    };
  },
  computed: {
    isValidInput() {
      // 检查输入时间格式是否有效
      return this.inputTime && !isNaN(new Date(this.inputTime).getTime());
    }
  },
  methods: {
    convertTime() {
      let date;
      switch (this.inputFormat) {
        case 'UTC':
          date = new Date(this.inputTime + 'Z');
          break;
        case 'GMT':
          date = new Date(this.inputTime);
          break;
        case 'CST':
          date = new Date(this.inputTime);
          date = new Date(date.getTime() + 8 * 60 * 60 * 1000); // CST为UTC+8
          break;
        case 'EST':
          date = new Date(this.inputTime);
          date = new Date(date.getTime() - 5 * 60 * 60 * 1000); // EST为UTC-5
          break;
        case 'PST':
          date = new Date(this.inputTime);
          date = new Date(date.getTime() - 8 * 60 * 60 * 1000); // PST为UTC-8
          break;
        default:
          return;
      }

      this.convertedTime = {
        utc: dayjs(date).format('YYYY-MM-DD HH:mm:ss [UTC]'),
        gmt: dayjs(date).format('YYYY-MM-DD HH:mm:ss [GMT]'),
        cst: dayjs(date.getTime() + 8 * 60 * 60 * 1000).format('YYYY-MM-DD HH:mm:ss [CST]'),
        est: dayjs(date.getTime() + 5 * 60 * 60 * 1000).format('YYYY-MM-DD HH:mm:ss [EST]'),
        pst: dayjs(date.getTime() + 8 * 60 * 60 * 1000).format('YYYY-MM-DD HH:mm:ss [PST]'),
      };
    },
  },
};
</script>

<style lang="scss">
.time-converter {
  .input-group {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
  }

  .nya-select {
    margin-top: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  .nya-btn {
    width: 100%;
    padding: 10px;
    margin-top: 15px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #218838;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  .timezone-explanation {
    margin-top: 10px;
    font-size: 14px;
    line-height: 1.5;

    strong {
      color: #333;
    }
  }
}
</style>
