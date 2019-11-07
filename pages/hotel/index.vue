<template>
  <div class="index">
    <hotelmap :hotemapdata="filterHotelInfo" />
    <!-- 酒店列表开始 -->
    <hotelItem :hotelInfo="filterHotelInfo" />
    <!-- 酒店列表结束 -->
    <!-- 分页功能开始 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
    <!-- 分页功能结束 -->
  </div>
</template>

<script>
import hotelmap from "@/components/hotel/HotelMap.vue";
import HotelItem from "@/components/hotel/HotelItem.vue";
export default {
  data() {
    return {
      // 从服务器获取的酒店信息
      hotelInfo: [],
      // 分页过滤后的酒店信息
      filterHotelInfo: [],

      // 分页模块的数据
      page: {
        // 当前页数
        currentPage: 1,
        // 当前页数量数组
        pageSizes: [2, 5, 10, 50],
        // 所有数据的总数
        total: 100,
        // 当前选中的页容量
        pageSize: 5
      }
    };
  },
  mounted() {
    // this.$axios.get("/hotels", { params: { city: 87 } }).then(res => {
    //   console.log(res);
    //   this.hotelInfo = res.data.data;
    //   this.page.total = res.data.data.length;
    // });
    setTimeout(() => {
      this.getHotelList(true);
    }, 1);
  },
  components: {
    hotelmap,
    HotelItem
  },
  methods: {
    // 子组件让列表刷新
    getHotelList1() {
      this.getHotelList();
      console.log(888);
    },
    getHotelList(isfrist) {
      if (isfrist) {
        this.$axios.get("/hotels", { params: { city: 87 } }).then(res => {
          this.hotelInfo = res.data.data;
          // 给分页模块的总数赋值
          this.page.total = res.data.data.length;
          // 把酒店的打分分数改造成数组
          this.hotelInfo.forEach(v => {
            v.starsArray = this.getHalfStar(v.stars);
          });
          // 第一次加载的时候给过滤数据一个默认数据
          // this.filterHotelInfo = this.hotelInfo;
          this.filterHotelInfo = this.hotelInfo.slice(
            (this.page.currentPage - 1) * this.page.pageSize,
            this.page.currentPage * this.page.pageSize
          );
          console.log(this.filterHotelInfo);
        });
      } else {
        this.filterHotelInfo = this.hotelInfo.slice(
          (this.page.currentPage - 1) * this.page.pageSize,
          this.page.currentPage * this.page.pageSize
        );
      }
    },
    // 把分数改造成数组
    getHalfStar(star) {
      let starArray = [];
      while (star > 0) {
        if (star >= 1) {
          starArray.push(1);
        } else {
          starArray.push(star % 1);
        }
        star--;
      }
      return starArray;
    },
    // 切换当前页容量数组
    handleSizeChange(val) {
      console.log(val);
      this.page.pageSize = val;
      // 刷新一下数据
      this.getHotelList();
    },
    // 切换页码
    handleCurrentChange(val) {
      console.log(val);
      this.page.currentPage = val;
      // 刷新一下数据
      this.getHotelList();
    }
  }
};
</script>

<style lang='less' scoped>
.index {
  width: 1000px;
  margin: 0 auto;
  .pagination {
    display: flex;
    justify-content: flex-end;
  }
}
</style>