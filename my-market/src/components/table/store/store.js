
const Store = function (table) {
  if(!table) {
    throw new Error('Table is required');
  }
  this.table = table;
  this.states = {
    // 列数组
    columns: [],
    // 排序后的数据
    data: [],

    // checkbox,id数组
    seletions: [],
    // 所有checkbox状态，接受三个值(normal, allchecked, noChecked)
    checkboxStates: 'normal',
    // // 控制懒加载展开
    // lazyTree: {},
    // treeData: [],
  }
}

Store.prototype.mutations = {
  handlerRowClick(row) {
    this.table.$emit('row-click', row);
  },

  handlerRowHoverEvent(row) {
    this.table.$emit('row-hover', row);
  },

}

Store.prototype.commit = function (name, ...args) {
  const mutations = this.mutations;
  if(mutations[name]) {
    mutations[name].apply(this, args);
  }else {
    throw new Error(`not found that ${name}`);
  }
}

export default Store