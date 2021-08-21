<template>
  <table class="table-list-main">
    <div class="hidden-init-column">
      <slot></slot>
    </div>
    <table-thead
      :store="store">
    </table-thead>
    <table-tbody
      :store="store">
    </table-tbody>
  </table>
</template>




<script>
import TableThead from './TableThead';
import TableTbody from './TableTbody';
import Store from './store/store.js';

export default {
  name: "ListTable",
  components: {
    TableThead,
    TableTbody
  },
  props: {
    dataSource: {
      type: Array,
      required: true
    },
    isClearCheckbox: {
      type: Boolean,
      required: true
    },
    lazyTree: {
      type: Object,
      default() {
        return {
          hasChildren: 'hasChildren',
          children: 'children'
        }
      }
    }
  },
  computed: {
    seletions() {
      return this.store.states.seletions;
    }
  },

  watch: {
    dataSource: {
      immediate: true,
      deep: true,
      handler(value) {
        this.store.states.data = value;
      }
    },

    seletions: {
      immediate: false,
      deep: true,
      handler(value) {
        if (value.length < 1) {
          this.store.states.checkboxStates = 'normal'
        }
        this.$emit('getCheckboxSeletions', value)
      }
    },

    isClearCheckbox: {
      immediate: true,
      handler(newval) {
        if ( newval ) {
          this.store.states.checkboxStates = 'noChecked';
          newval = !newval;
        }
      }
    },

    lazyTree: {
      immediate: true,
      handler(newval) {
        this.store.states.lazyTree = newval;
      }
    }
  },

  data() {
    let store = new Store(this);
    return {
      store,
    }
  },
  methods: {

  },
}
</script>

<style lang="less" scoped>
.table-list-main {
  margin-top: 30px;
  width: 100%;
}
</style>