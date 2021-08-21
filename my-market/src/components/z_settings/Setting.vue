<template>
  <div class="settings_container">
    <div class="stock_limit_container">
      <div class="stock_limit_cell">
        <span class="stock_limit_tittle">库存警戒线设置</span>
      </div>
      <div
        :key="warningKey"
        class="stock_limit_cell"
        :class="{to_limit : limitFocus}">
        <input
          type="number"
          v-model="warningLine"
          class="stock_limit_input"
          name="stock_limit"
          @focus="limitFocus = true"
          @blur="limitFocus = false">
        <span class="setting_toLimit_i iconfont icon-xiangyou" @click="toEditLimit"></span>
      </div>
    </div>
  </div>
</template>

<script>
// import {checkNumber} from '../util/_util_inputs';
export default {
  data() {
    return {
      oldWarningKey: 0,
      warningKey: 0,
      // 控制警戒线的input的动效
      limitFocus: false,
      // 警戒线新旧值
      oldWarningLine: '0',
      warningLine: '0'
    }
  },
  watch: {
    warningLine: {
      immediate: true,
      handler(newval) {
        if (newval == '') {
          return;
        }
        let reg = /^\d+/;
        this.$data.warningLine = newval.match(reg)[0];
      }
    }
  },
  methods: {
    async toEditLimit() {
      // 判断值是否真的改变，改变则提交改变
      if (this.warningLine == '') {
        this.warningLine = this.oldWarningLine;
        return;
      }
      if (this.oldWarningLine == this.warningLine) {
        return;
      }
      let editObj = {};
      editObj.warningLine = this.warningLine;
      await this._axios.post('/warningLine/editWarningLine', editObj)
      this.warningKey += 1;
    },

    async toGetLimit() {
      await this._axios.post('/warningLine/getWarningLine').then(res => {
        if (res.data.msg == 'get failed') {
          return;
        }
        // 转为字符串，便于监测筛选字符
        this.warningLine = res.data.stock_limit + '';
      })
    }
  },

  beforeMount() {
    this.toGetLimit();
  },

  beforeUpdate() {
    if (this.oldWarningKey !== this.warningKey) {
      this.toGetLimit();
      this.oldWarningKey = this.warningKey;
    }
    
  },
}
</script>

<style lang="less" scoped>
@import url('../../assets/css/common.less');

.to_limit .setting_toLimit_i {
  cursor: pointer !important;
  opacity: 1 !important;
  right: 0px !important;
}

.settings_container {
  .stock_limit_container {
    display: flex;
    margin-top: 80px;
    .stock_limit_cell {
      position: relative;
      flex: 1;
      box-sizing: border-box;
      line-height: 40px;
      .stock_limit_tittle {
        font-size: 1.2em;
      }
      .stock_limit_input {
        background-color: #f4f6f9;
        font-size: 1.2em;
        box-sizing: border-box;
        border-radius: 4px;
        padding-right: 40px;
        text-align: center;
        width: 100%;
        height: 100%;
        border: 1px solid @lightgray;
        &:hover, &:focus {
          background-color: #fff;
          box-shadow: 0 1px 2px rgba(#000, 0.2);
        }
        // box-shadow: 0 1px 2px rgba(#000, 0.2);
      }
      .setting_toLimit_i {
        display: inline-block;
        width: 40px;
        height: 100%;
        cursor: default;
        position: absolute;
        font-size: 1.5em;
        right: -30px;
        top: 2px;
        opacity: 0;
        color: @lightblue;
        -webkit-transition: all .8s ease;
        transition: all .8s ease;
      }
    }
  }
}
</style>