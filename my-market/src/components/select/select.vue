<template>
  <div
    :class="{ select_show: focus} "
    class="select-container">
      <span
        class="select-open-i iconfont icon-hidden"
        :class="{'icon-zhankai': !choosedContent, 'icon-show': !choosedContent}"
        @click="handlerChange"></span>
        <span
        class="select-open-i iconfont icon-hidden"
        :class="{'icon-cha': choosedContent, 'icon-show': choosedContent}"
        @click="clearContent"></span>
      <input
        type="text"
        class="select-input"
        :style="selectInputStyle"
        @click="handlerChange">
      <div
        class="text-container"
        :class="{'no-content': !choosedContent}"
        @click="handlerChange">{{ choosedContent ? choosedContent : "请选择分类" }}</div>
      <ul
        :style="{width:width}"
        class="options-block">
        <li
          v-for="obj in optionList"
          :key="obj.value"
          :data-value="obj.value"
          class="option-cell"
          @click="optionChoosed">
            {{ obj.label }}
          </li>
      </ul>
  </div>
</template>


<script>
import {deepCloneObject} from '../util/util';
export default {
  props: {
    width: {
      type: String,
      default: '187px',
    },
    height: {
      default: '30px',
      type: String
    },
    // 渲染数据[{id,name}]
    optionList: {
      require: true,
      type: Array
    },
    // 首选项 接收 {id,name}属性的对象
    initOption: {
      require: true,
      type: Object
    }
  },
  computed: {
    selectInputStyle() {
      let [width, height] = [this.width, this.height];
      return {
        "width": width,
        "height": height
      }
    }
  },
  watch: {
    initOption: {
      immediate: true,
      handler(newval) {
        if ( JSON.stringify(newval) == "{}" ) {
          this.selectValue = null;
          this.choosedContent = '';
        }
        if( JSON.stringify(newval) !== "{}" ) {
          this.innerInitOption = deepCloneObject(newval);
          this.selectValue = this.innerInitOption.value;
          this.choosedContent = this.innerInitOption.label;
        }
      }
    },
    selectValue: {
      immediate: true,
      handler(newval) {
        if (newval) {
          this.$emit('handlerChoosed', newval)
        }
      }
    },
  },
  methods: {
    handlerChange() {
      this.focus = !this.focus;
    },
    clearContent() {
      this.focus = false;
      this.selectValue = null;
      this.choosedContent = ''
    },
    optionChoosed(e) {
      this.focus = !this.focus;
      this.choosedContent = e.target.textContent;
      this.selectValue = e.target.getAttribute('data-value');
    }
  },
  data() {
    return {
      focus: false,
      selectValue: null,
      choosedContent: '',
      innerInitOption: {}
    }
  },
}
</script>


<style lang="less" scoped>
@import '../../assets/css/common.less';
.icon-hidden {
  visibility: hidden;
}
.select_show .select-open-i {
  transform: rotate(-180deg);
}
.select_show .options-block {
  -webkit-transform: scaleY(1) !important;
  transform: scaleY(1) !important;
}


.select-container {
  line-height: 30px;
  position: relative;
  width: 187px;
  display: inline-block;
  box-sizing: border-box;
  .icon-show {
    visibility: visible;
  }
  .select-open-i {
    color: @basegray;
    cursor: pointer;
    position: absolute;
    right: 6px;
    top: 0;
    transition: all .4s ease;
  }
  .select-input {
    cursor: pointer;
    box-sizing: border-box;
    border: 1px solid #c5c5ca;
    border-radius: 4px;
    padding: 4px 0 4px 10px;
    color: transparent;
    text-shadow: 0 -1 0 #000;
    .no-touch();
  }
  .text-container {
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    padding-left: 10px;
  }
  .no-content {
    color: @lightgray;
  }
  .options-block {
    z-index: 2;
    position: absolute;
    top: 30px;
    height: 180px;
    overflow: auto;
    -webkit-transition: all .8s ease;
    transition: all .4s ease;
    -webkit-transform-origin: 50% 0%;
    transform-origin: 50% 0%;
    -webkit-transform: scaleY(0);
    transform: scaleY(0);
    .option-cell {
      background-color: #fff;
      text-align: left;
      padding: 3px 0px 3px 10px;
      -webkit-transition: all .8s ease;
      transition: all .3s ease;
      .no-touch();
      &:hover {
        background-color: #ccecff;
      }
    }
  }
}
</style>