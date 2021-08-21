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
    id: Number || String,
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
      // checkbox,id数组
      seletion: Number
    }
  },
  computed: {
    // checkboxStates() {
    //   return this.store.states.checkboxStates;
    // },
    // seletions() {
    //   return this.store.states.seletions;
    // }
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
          this.seletion = this.id;
        }else {
          // this.deleteSeletion(this.seletions, this.id)
          this.seletion = 0;
          this.$emit('deleteSeletion', this.id)
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