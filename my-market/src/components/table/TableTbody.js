import '../util/util';
import './TableTbody.css';
import checkBox from '../checkbox/checkbox.vue';
// import { cloneData } from './store/util';


export default {
  name: 'ListTbody',
  props: {
    store: {
      required: true
    },
  },
  computed: {
    // lazyTree() {
    //   return this.store.states.lazyTree;
    // },
  },
  methods: {
    /* 删除id */
    deleteID(arr, target) {
      /* 找到元素index */
      /* 删除元素 */
      let targetIndex = 0;
      let len = arr.length;
      if (len <= 0) {
        return;
      }
      for(let i = len - 1; i >= 0; i--) {
        if(target == arr[i]) {
          targetIndex = i;
          break
        }
      }
      arr.splice(targetIndex, 1)
    },

    /* 接收checkbox传递过来的id，用于删除sletions内的id */
    deleteSeletion(val) {
      this.deleteID(this.store.states.seletions, val)
    },

    /* 接受checkb组件传递的seletion,id */
    getCheckboxSetion(val) {
      this.store.states.seletions.push(val);
    },

    /* table行row（一个数据对象）渲染函数 */
    rowRender(dataObj) {

      const columns = this.store.states.columns;
      // console.log(dataObj)
      return (        
          <tr
            key={dataObj.id}
            class="row_style">
            {
              columns.reduce((cells, column) => {
                return cells.concat(this.cellRender(dataObj, column))
              }, [])
            }
          </tr>
      )
    },

    /* table单元（一个数据对象内的一个（列）属性）渲染函数 */
    cellRender(dataObj, column) {
      /* 判断type,选择渲染 */
      let type = column.type;
      let prop = column.prop;
      let value = dataObj[prop];
      if(type == 'checkbox') {
        return (
          <td
            class="cell_style">
            <check-box
              id={value}
              ongetCheckboxSetion={this.getCheckboxSetion}
              ondeleteSeletion={this.deleteSeletion}></check-box>
          </td>
        )
      }else {
        return (
          <td
            class="cell_style">
            { value }
          </td>
        )
      }
    },


  },
  components: {
    checkBox
  },
  render () {
    return (
      <table width="100%">
        <colgroup>
          {
            this.store.states.columns.map(column => <col width={ column.width } />)
          }
        </colgroup>

          <tbody class="row-parent">
          {
              // console.log(this.store.states)
              this.store.states.data.reduce((rows, dataObj) => {
                return rows.concat(this.rowRender(dataObj))
              }, [])
          }
          </tbody>
          
      </table>
    );
  },
}