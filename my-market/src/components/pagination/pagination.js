import'./pagination.css';
import innerPager from './innerPager.vue';
import { _typeOf } from '../util/util';

export default {
  name : "pagination",
  props: {
    total: {
      type: Number,
      validator: function (val) {
        return _typeOf(val) == 'Number' && val >= 0;
      }
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    // pageSizes: {
    //   type: Array,
    //   default() {
    //     return [10, 20, 30, 40, 50]
    //   }
    // }
  },
  data() {
    return {
      innerCurrentPage: 1,
      innerPageSize: 10,
      // pageSize: 10,
      pageColumnSize: 7
    }
  },
  computed: {
    countPage() {
      return Math.max(1, Math.ceil(this.total / this.innerPageSize));
    }
  },
  watch: {
    pageSize: {
      immediate: true,
      handler(newVal) {
        this.innerPageSize = Number(newVal);
      }
    },
    currentPage: {
      immediate: true,
      handler(newVal) {
        this.innerCurrentPage = this.getValidCurrentPage(newVal);
      }
    },

  },
  methods: {
    innerPageChange(val) {
      this.innerCurrentPage = this.getValidCurrentPage(val);
      this._emit();
    },
    getValidCurrentPage(newVal) {
      let valType = _typeOf(newVal);
      if(valType != 'Number') return 1;
      if(newVal < 1) return 1;
      if(newVal > this.countPage) return this.countPage;
      if(newVal >= 1 && newVal <= this.countPage) return newVal;
    },

    _prev() {
      let newCurrentPage = this.innerCurrentPage - 1;
      this.innerCurrentPage = this.getValidCurrentPage(newCurrentPage);
      this._emit()
    },

    _next() {
      let newCurrentPage = this.innerCurrentPage + 1;
      this.innerCurrentPage = this.getValidCurrentPage(newCurrentPage);
      this._emit()
    },

    _emit() {
      this.$nextTick(() => {
        let pageObj = {};
        pageObj.pageSize = this.innerPageSize;
        pageObj.currentPage = this.innerCurrentPage;
        this.$emit('current-change', pageObj)
      })
    }
  },

  render() {
    return (
      <div width="100%">
        <count-total></count-total>
        <prev></prev>
        <inner-pager
          innerCurrentPage={ this.innerCurrentPage }
          pageColumnSize={ this.pageColumnSize }
          pageTotal={ this.countPage }
          on-change={ this.innerPageChange }>
        </inner-pager>
        <next></next>
      </div>
    );
  },

  components: {
    innerPager,
    /* 显示总数 */
    countTotal: {
      render() {
        return (
          <span class="pagination_total">
            共有 { this.$parent.total } 条数据
          </span>
        )
      }
    },
    Prev: {
      render() {
        return (
          <button
            class="pagination_btn_prev"
            disable= { this.innerCurrentPage <= 1 }
            on-click={ this.$parent._prev }>
            <span>
              <i class="iconfont icon-houtui"></i>
            </span>
          </button>
        )
      },
    },
    Next: {
      render() {
        return (
          <button
            class="pagination_btn_next"
            disable={ this.$parent.innerCurrentPage >= this.countPage }
            on-click={ this.$parent._next }>
            <span>
              <i class="iconfont icon-qianjin"></i>
            </span>
          </button>
        );
      },
    },
  
  },

  created() {
    // this.innerPageSize = this.pageSize;
  },
}