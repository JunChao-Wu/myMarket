<template>
  <ul class="inner-pager-main" @click="pageClick">
    <li
      class="innerPage-btn"
      :class="{ current: innerCurrentPage === 1 }">{{ this.pageStart }}</li>
    <li class="ellipsis-left" v-if="showLeft">...</li>

    <li
      class="innerPage-btn"
      :class="{ current: innerCurrentPage === pager }"
      v-for="pager in pagerList"
      :key="pager">{{ pager }}</li>

    <li class="ellipsis-right" v-if="showRight">...</li>
    <li 
      class="innerPage-btn"
      :class="{ current: innerCurrentPage === this.pageTotal, show: this.pageTotal <= 1 }">{{ this.pageTotal }}</li>
  </ul>
</template>

<script>
import './innerPager.css';
export default {
  props: {
    innerCurrentPage: {
      type: Number
    },
    pageColumnSize: {
      type: Number
    },
    pageTotal: {
      type: Number
    }
  },
  data() {
    return {
      pageStart: 1,
      showLeft: false,
      showRight: false
    }
  },
  computed: {
    pagerList() {
      let pagerList = [];

        let currentPage = this.innerCurrentPage;
        let pageTotal = this.pageTotal;

        let pageColumnSize = this.pageColumnSize;
        let halfSize = (pageColumnSize - 1) / 2;

        let showLeft = false;
        let showRight = false;

        if(pageTotal > pageColumnSize) {
          if (currentPage > halfSize + 1) {
            showLeft = true;
          }
          if (currentPage < pageTotal - halfSize) {
            showRight = true;
          }
        }
        /* 有左无右 */
        /* 无左有右 */
        /* 有左有右 */
        /* 无左无右 */
        let setPage = 0;
        let pageStart = 0;
        let pageEnd = 0;
        if (showLeft && !showRight) {
          setPage = pageColumnSize - 2;
          pageStart = pageTotal - setPage;
          for(let i = pageStart; i < pageTotal; i ++) {
            pagerList.push(i);
          }
        }else if (!showLeft && showRight) {
          setPage = pageColumnSize - 2;
          pageEnd = 2 + setPage;
          for(let i = 2; i < pageEnd; i ++) {
            pagerList.push(i);
          }
        }else if (showLeft && showRight) {
          setPage = (pageColumnSize - 2 - 1) / 2;
          for(let i = currentPage - setPage; i <= currentPage + setPage; i ++) {
            pagerList.push(i);
          }
        }else {
          for(let i = 2; i < pageTotal; i ++) {
            pagerList.push(i);
          }
        }
        return pagerList;
    }

  },
  watch: {
    pagerList: {
      deep: true,
      immediate: true,
      handler() {
        let currentPage = this.innerCurrentPage;
        let pageTotal = this.pageTotal;

        let pageColumnSize = this.pageColumnSize;
        let halfSize = (pageColumnSize - 1) / 2;

        let sLeft = false;
        let sRight = false;

        if(pageTotal > pageColumnSize) {
          if (currentPage > halfSize + 1) {
            sLeft = true;
          }
          if (currentPage < pageTotal - halfSize) {
            sRight = true;
          }
        }
        this.showLeft = sLeft;
        this.showRight = sRight;
      }
    },

  },
  methods: {
    pageClick(e) {
      // console.log(e)
      // e.target.
      // e.target.textContent
      /* 判断数字li */
      /* 合法化page */
      /* 判断page是否改变，然后调用父组件的pageChange方法 */
      let target = e.target;
      if (target.className.indexOf('btn') == -1) {
        return;
      }

      let clickPage = Number(e.target.textContent);
      clickPage < 1 ? 1: clickPage;
      clickPage > this.pageTotal ? this.pageTotal : clickPage;

      if (clickPage == this.innerCurrentPage) {
        return;
      } else {
        // console.log("调用")
        this.$emit('change', clickPage);
      }
    }
  },
}

</script>