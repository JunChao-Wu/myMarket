<template>
  <div class="checkbox-container">
    <label>
      <!-- <span class="inner-span"></span> -->
      <input
        type="checkbox"
        class="inner-input"
        :checked="isChecked"
        @change="handlerChange"
        @focus="focus=true"
        @blur="focus=false"/>
    </label>
  </div>
</template>

<script>
import './checkbox.css'
export default {
  name: "checkBox",
  props: {
    value: {
      type: Number
    },
    // 接受normal, allChecked, noChecked 三个参数来控制checkbox的选择状态
    checkboxStates: {
      require: true,
      type: String,
      default: 'normal'
    }
  },
  data() {
    return {
      isChecked: false,
      focus:  false,
      // checkbox,value
      seletion: Number
    }
  },
  computed: {
  },
  watch: {
    seletion: {
      immediate: true,
      handler(newVal) {
        if (newVal > 0) {
          this.$emit('getCheckboxSetion', newVal);
        }
        if (newVal == 0) {
          // this.store.states.checkboxStates = 'normal';
          // this.$emit('getCheckboxStates', 'normal');
        }
      }
    },
    checkboxStates: {
      immediate: true,
      handler(newVal) {
        if (newVal == 'allchecked') {
          this.isChecked = true;
        }else if (newVal == 'noChecked') {
          this.isChecked = false;
        }else {
          return;
        }
      }
    },
    isChecked: {
      immediate: false,
      handler(newVal) {
      /* 判断isChecked是否为真，真-删，假-添 */
        if (newVal) {
          this.seletion = this.value;
        }else {
          // this.deleteSeletion(this.seletions, this.value)
          this.seletion = 0;
          this.$emit('deleteSeletion', this.value)
        }
      }
    }
  },
  methods: {
    handlerChange(e) {
      this.isChecked = e.target.checked;
    },
  },
}
</script>