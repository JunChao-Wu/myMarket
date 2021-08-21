
let columnIdSeed = 0;


export default {
  name: 'ListColumn',

  props: {
    type: String || 'default',
    label: String || "",
    prop: String,
    width: String,
    sortable: Boolean || false
  },
  data() {
    return {

    }
  },



  methods: {
    getColumns(defaults) {
      const options = {};
      let key;
      for(key in defaults) {
        options[key] = defaults[key];
      }
      return options;
    }

  },

  created() {
    
  },
  mounted() {
    
    let store = this.$parent.store;
    // console.log(columnIdSeed++, this)
    const columnsOptions = this.getColumns({
      type: this.type,
      label: this.label,
      prop: this.prop,
      width: this.width,
      sortable: this.sortable,
      columnKey: columnIdSeed ++
    });
    // console.log(store)
    store.states.columns.push(columnsOptions)
  },
  render(h) {
    // slots 也要渲染，需要计算合并表头
    return h('div', this.$slots.default);
  }
}